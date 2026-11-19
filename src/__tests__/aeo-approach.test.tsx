import { readFileSync } from 'fs';
import { join } from 'path';
import { render } from '@testing-library/react';
import App from '../App';
import { profile, faqEntries, SITE_URL } from '../data/profile';
import { principles, principleNames } from '../data/principles';
import { allStages, differenceCategories, evidenceGrades } from '../data/approach';

/**
 * The new principles / method / differences content must reach answer engines
 * through every machine-facing surface — JSON-LD, llms.txt, speakable — and
 * stay identical to what humans see. Each test here pins one of those copies
 * to the single source of truth in src/data.
 */
const ROOT = join(__dirname, '..', '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const llms = readFileSync(join(ROOT, 'public', 'llms.txt'), 'utf8').replace(/\s+/g, ' ');
/** Only the JSON-LD fields these tests read */
interface LdNode {
  '@type': string;
  '@id'?: string;
  name?: string;
  alternateName?: string[];
  url?: string;
  caption?: string;
  author?: unknown;
  creator?: unknown;
  speakable?: { cssSelector: string[] };
  hasDefinedTerm?: {
    '@type': string;
    name: string;
    description: string;
    inDefinedTermSet: { '@id': string };
  }[];
}
const graph: LdNode[] = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]
)['@graph'];
const nodeOfType = (t: string): LdNode => graph.find((n) => n["@type"] === t)!;
const answerTo = (q: RegExp) => faqEntries.find((e) => q.test(e.question))!.answer;

describe('Site name is the person', () => {
  test('WebSite.name is the entity name, keeping the playbook as an alternate name', () => {
    const ws = nodeOfType('WebSite');
    expect(ws.name).toBe(profile.name);
    expect(ws.alternateName).toContain('OrgDesign Playbook');
    expect(ws.url).toBe(`${SITE_URL}/`);
  });

  test('og:site_name agrees with WebSite.name', () => {
    expect(html).toContain(`<meta property="og:site_name" content="${profile.name}" />`);
  });
});

describe('Required / chosen / inherited as a DefinedTermSet', () => {
  const set = nodeOfType('DefinedTermSet');

  test('one term per category, name and definition verbatim from the data', () => {
    expect(set.hasDefinedTerm).toHaveLength(differenceCategories.length);
    const terms = set.hasDefinedTerm!;
    differenceCategories.forEach((c, i) => {
      const term = terms[i];
      expect(term['@type']).toBe('DefinedTerm');
      expect(term.name).toBe(c.label);
      expect(term.description).toBe(`${c.definition} ${c.action}.`);
      expect(term.inDefinedTermSet['@id']).toBe(set['@id']);
    });
  });

  test('points at the on-page section and the canonical host', () => {
    expect(set.url).toBe(`${SITE_URL}/#differences`);
    expect(set['@id']?.startsWith(`${SITE_URL}/`)).toBe(true);
  });

  test('claims no authorship: originality of the lens is not yet verified', () => {
    // Constraint 6 — never assert what has not been checked. Add author/creator
    // only once the operator confirms the lens is his own coinage.
    expect(set.author).toBeUndefined();
    expect(set.creator).toBeUndefined();
  });
});

describe('FAQ answers stay in step with the content they summarise', () => {
  test('the principles answer names all six principles', () => {
    const a = answerTo(/principles guide/).toLowerCase();
    principleNames.forEach((n) => expect(a).toContain(n.toLowerCase()));
  });

  test('the method answer names all six stages, in order', () => {
    const a = answerTo(/approach an organization design engagement/);
    const positions = allStages.map((s) => a.indexOf(s.name));
    positions.forEach((p) => expect(p).toBeGreaterThanOrEqual(0));
    expect([...positions].sort((x, y) => x - y)).toEqual(positions);
  });

  test('the differences answer carries every category and its response', () => {
    const a = answerTo(/required, chosen and inherited/).toLowerCase();
    ['required', 'chosen', 'inherited', 'stays local', 'keep it or align it', 'harmonised'].forEach(
      (s) => expect(a).toContain(s)
    );
  });
});

describe('Speakable regions resolve to real content', () => {
  test('the principles are a speakable region, and the selector matches six headings', () => {
    const selectors: string[] = nodeOfType('ProfilePage').speakable?.cssSelector ?? [];
    expect(selectors).toContain('#principles h3');
    render(<App />);
    selectors.forEach((sel) => expect(document.querySelectorAll(sel).length).toBeGreaterThan(0));
    expect(document.querySelectorAll('#principles h3')).toHaveLength(principles.length);
  });
});

describe('llms.txt carries the new content', () => {
  test('section index links every new section on the canonical host', () => {
    ['#principles', '#approach', '#differences', '#playbook'].forEach((a) =>
      expect(llms).toContain(`${SITE_URL}/${a}`)
    );
  });

  test('every principle, stage, evidence grade and difference category is stated', () => {
    principles.forEach((p) => expect(llms).toContain(p.title));
    allStages.forEach((s) => expect(llms).toContain(`Stage ${s.number} — ${s.name}`));
    evidenceGrades.forEach((g) => expect(llms).toContain(g.grade));
    differenceCategories.forEach((c) => expect(llms).toContain(c.definition));
  });
});

describe('Share card (Phase 4 gate, kept true after the refresh)', () => {
  const png = readFileSync(join(ROOT, 'public', 'og-image.png'));

  test('is a PNG of exactly 1200x630 and under 1 MB', () => {
    expect(png.subarray(1, 4).toString('ascii')).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
    expect(png.length).toBeLessThan(1024 * 1024);
  });

  test('alt text is identical across og, twitter and the ImageObject caption', () => {
    const og = html.match(/<meta property="og:image:alt" content="([^"]*)"/)![1];
    const tw = html.match(/<meta name="twitter:image:alt" content="([^"]*)"/)![1];
    expect(tw).toBe(og);
    expect(nodeOfType('ImageObject').caption).toBe(og);
    // and it describes what the card actually says
    expect(og).toContain(profile.name);
    expect(og).toMatch(/They need a system\./);
  });

  test('the card source mirrors the live design tokens', () => {
    const card = readFileSync(join(ROOT, 'scripts', 'og', 'card.html'), 'utf8');
    const css = readFileSync(join(ROOT, 'src', 'index.css'), 'utf8');
    const token = (name: string) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`))![1].toUpperCase();
    expect(card.toUpperCase()).toContain(`--PAPER:${token('paper')}`);
    expect(card.toUpperCase()).toContain(`--INK:${token('ink')}`);
    expect(card.toUpperCase()).toContain(`--PRIMARY:${token('primary')}`);
  });
});

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
  author?: { '@id': string };
  creator?: { '@id': string };
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

  test('names Eric Yim as author and creator of the lens', () => {
    // Confirmed by the operator 2026-11-19 as his own coinage. Points at the
    // Person node by @id so engines attach the terms to the entity.
    expect(set.author).toEqual({ '@id': `${SITE_URL}/#person` });
    expect(set.creator).toEqual({ '@id': `${SITE_URL}/#person` });
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
    ['required', 'chosen', 'inherited', 'stays local', 'keep it or align it', 'harmonized'].forEach(
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
    expect(og).toMatch(/I design organizations as systems that leaders can run\./);
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

describe('Headshot', () => {
  const pub = (p: string) => join(ROOT, 'public', p);

  test('every image the page and structured data reference exists', () => {
    for (const f of ['images/eric-yim-avatar.webp', 'images/eric-yim-portrait.webp', 'images/eric-yim.jpg']) {
      expect(() => readFileSync(pub(f))).not.toThrow();
    }
  });

  test('Person.image is the portrait, on the canonical host, with true dimensions', () => {
    const person = graph.find((n) => n['@type'] === 'Person') as LdNode & { image: { '@id': string } };
    // Person points at a top-level ImageObject by @id (a flat graph resolves everywhere)
    const portrait = graph.find((n) => n['@id'] === person.image['@id']) as LdNode & {
      url: string; width: number; height: number;
    };
    expect(portrait['@type']).toBe('ImageObject');
    expect(portrait.url).toBe(`${SITE_URL}/images/eric-yim.jpg`);
    const jpg = readFileSync(pub('images/eric-yim.jpg'));
    // read the JPEG SOF0/SOF2 frame for the real pixel size
    let i = 2, w = 0, h = 0;
    while (i < jpg.length) {
      if (jpg[i] !== 0xff) { i++; continue; }
      const marker = jpg[i + 1];
      if (marker >= 0xc0 && marker <= 0xc2) { h = jpg.readUInt16BE(i + 5); w = jpg.readUInt16BE(i + 7); break; }
      i += 2 + jpg.readUInt16BE(i + 2);
    }
    expect([w, h]).toEqual([portrait.width, portrait.height]);
    const profilePage = graph.find((n) => n['@type'] === 'ProfilePage') as LdNode & {
      primaryImageOfPage: { '@id': string };
    };
    expect(profilePage.primaryImageOfPage['@id']).toBe(person.image['@id']);
  });

  test('the About portrait renders with alt text and reserved dimensions', () => {
    render(<App />);
    const img = document.querySelector('#about img[src="/images/eric-yim-portrait.webp"]')!;
    expect(img).not.toBeNull();
    expect(img.getAttribute('alt')).toMatch(/Eric Yim/);
    expect(img.getAttribute('width')).toBe('640');
    expect(img.getAttribute('height')).toBe('800');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});

describe('Voice guard: the slop patterns removed on 2026-11-19 stay out', () => {
  // The no-ai-slop edit removed "X, not Y" contrasts, negative headings and em
  // dashes from the copy written for the new sections. These checks keep them
  // out of the data files that hold that copy.
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { principles: ps, principlesCopy: pc } = require('../data/principles');
  const ap = require('../data/approach');
  /* eslint-enable @typescript-eslint/no-require-imports */

  test('no principle title is a binary contrast or a negation', () => {
    ps.forEach((p: { title: string }) => {
      expect(p.title).not.toMatch(/, not /);
      expect(p.title).not.toMatch(/^Not /);
    });
  });

  test('the six principle titles do not all share one sentence shape', () => {
    const shapes = new Set(ps.map((p: { title: string }) => p.title.split(' ')[0]));
    expect(shapes.size).toBeGreaterThanOrEqual(5);
  });

  test('no em dashes in the new section copy', () => {
    const copy = JSON.stringify({ pc, ps, a: ap.approachCopy, d: ap.differencesCopy, e: ap.evidenceCopy, x: ap.exampleCopy });
    expect(copy).not.toContain('—');
  });

  test('headings state the point rather than negating something', () => {
    expect(ap.differencesCopy.heading).not.toMatch(/^Not /);
  });
});

describe('Self-hosted brand fonts', () => {
  const css = readFileSync(join(ROOT, 'src', 'index.css'), 'utf8');
  const fontFiles = [...css.matchAll(/url\('\/fonts\/([^']+\.woff2)'\)/g)].map((m) => m[1]);
  const preloads = [...html.matchAll(/<link rel="preload" href="\/fonts\/([^"]+\.woff2)" as="font" type="font\/woff2" crossorigin \/>/g)].map((m) => m[1]);

  test('every @font-face file exists in public/fonts', () => {
    expect(fontFiles.length).toBe(10);
    fontFiles.forEach((f) => expect(() => readFileSync(join(ROOT, 'public', 'fonts', f))).not.toThrow());
  });

  test('the four first-screen faces are preloaded, and each is a declared face', () => {
    expect(preloads.sort()).toEqual([
      'dm-sans-latin-400-normal.woff2', 'dm-sans-latin-600-normal.woff2',
      'playfair-display-latin-700-italic.woff2', 'playfair-display-latin-700-normal.woff2',
    ]);
    preloads.forEach((p) => expect(fontFiles).toContain(p));
  });

  test('the SIL Open Font License ships alongside the files', () => {
    for (const f of ['LICENSE-PlayfairDisplay-OFL.txt', 'LICENSE-DMSans-OFL.txt']) {
      expect(readFileSync(join(ROOT, 'public', 'fonts', f), 'utf8')).toMatch(/SIL OPEN FONT LICENSE/i);
    }
  });

  test('no Google Fonts request remains, in the page or the stylesheet', () => {
    for (const src of [html, css]) expect(src).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
  });
});

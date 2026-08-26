import { readFileSync } from 'fs';
import { join } from 'path';
import { profile, referenceArticles, faqEntries, SITE_URL } from '../data/profile';

const ROOT = join(__dirname, '..', '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const robots = readFileSync(join(ROOT, 'public', 'robots.txt'), 'utf8');
const llms = readFileSync(join(ROOT, 'public', 'llms.txt'), 'utf8');
const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8');

/** Parse the JSON-LD block out of index.html */
function getJsonLd(): Record<string, unknown> {
  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  if (!match) throw new Error('No JSON-LD block found in index.html');
  return JSON.parse(match[1]);
}

function nodeOfType(type: string): Record<string, any> {
  const graph = getJsonLd()['@graph'] as Record<string, any>[];
  const node = graph.find((n) => n['@type'] === type);
  if (!node) throw new Error(`No ${type} node in JSON-LD @graph`);
  return node;
}

describe('Structured data is valid', () => {
  test('index.html contains parseable JSON-LD', () => {
    expect(() => getJsonLd()).not.toThrow();
    expect(getJsonLd()['@context']).toBe('https://schema.org');
  });

  test('graph declares Person, ProfilePage, WebSite and FAQPage', () => {
    const types = (getJsonLd()['@graph'] as Record<string, any>[]).map(
      (n) => n['@type']
    );
    expect(types).toEqual(
      expect.arrayContaining(['Person', 'ProfilePage', 'WebSite', 'FAQPage'])
    );
  });

  test('every internal @id reference resolves to a node in the graph', () => {
    const graph = getJsonLd()['@graph'] as Record<string, any>[];
    const ids = new Set(graph.map((n) => n['@id']).filter(Boolean));
    const refs: string[] = [];
    const walk = (v: unknown) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === 'object') {
        const o = v as Record<string, unknown>;
        // A bare {"@id": "..."} object is a reference, not a definition
        if (Object.keys(o).length === 1 && typeof o['@id'] === 'string') {
          refs.push(o['@id'] as string);
        }
        Object.values(o).forEach(walk);
      }
    };
    walk(graph);
    expect(refs.length).toBeGreaterThan(0);
    refs.forEach((ref) => expect(ids).toContain(ref));
  });
});

describe('Backend JSON-LD is aligned with frontend profile data', () => {
  test('Person matches profile.ts identity', () => {
    const person = nodeOfType('Person');
    expect(person.name).toBe(profile.name);
    expect(person.jobTitle).toBe(profile.jobTitle);
    expect(person.description).toBe(profile.description);
  });

  test('Person.knowsAbout matches profile.knowsAbout exactly', () => {
    expect(nodeOfType('Person').knowsAbout).toEqual([...profile.knowsAbout]);
  });

  test('Person.sameAs contains every reference article URL', () => {
    const sameAs: string[] = nodeOfType('Person').sameAs;
    referenceArticles.forEach((a) => expect(sameAs).toContain(a.url));
    expect(sameAs).toHaveLength(referenceArticles.length);
  });

  test('subjectOf articles match reference titles and publishers', () => {
    const subjectOf: Record<string, any>[] = nodeOfType('Person').subjectOf;
    expect(subjectOf).toHaveLength(referenceArticles.length);
    referenceArticles.forEach((a) => {
      const entry = subjectOf.find((s) => s.url === a.url);
      expect(entry).toBeDefined();
      expect(entry!.name).toBe(a.title);
      expect(entry!.publisher.name).toBe(a.publisher);
    });
  });

  test('FAQPage questions and answers match faqEntries verbatim', () => {
    const mainEntity: Record<string, any>[] = nodeOfType('FAQPage').mainEntity;
    expect(mainEntity).toHaveLength(faqEntries.length);
    faqEntries.forEach((entry, i) => {
      expect(mainEntity[i].name).toBe(entry.question);
      expect(mainEntity[i].acceptedAnswer.text).toBe(entry.answer);
    });
  });

  test('meta description matches the canonical profile description', () => {
    const meta = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/);
    expect(meta).not.toBeNull();
    expect(meta![1].replace(/\s+/g, ' ').trim()).toBe(profile.description);
  });

  test('title and canonical are set (not the Vite placeholder)', () => {
    const title = html.match(/<title>([\s\S]*?)<\/title>/)![1];
    expect(title).toContain(profile.name);
    expect(title).toContain(profile.jobTitle);
    expect(title).not.toMatch(/temp-project/i);
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/" />`);
  });

  test('SITE_URL is used consistently across JSON-LD, robots and sitemap', () => {
    expect(nodeOfType('Person').url).toBe(`${SITE_URL}/`);
    expect(nodeOfType('WebSite').url).toBe(`${SITE_URL}/`);
    expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    expect(sitemap).toContain(`<loc>${SITE_URL}/</loc>`);
  });
});

describe('Crawler-facing files', () => {
  test('robots.txt permits the major AI and answer-engine crawlers', () => {
    ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot']
      .forEach((bot) => expect(robots).toContain(`User-agent: ${bot}`));
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m);
  });

  test('sitemap.xml uses the correct sitemaps.org namespace', () => {
    expect(sitemap).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
  });

  test('llms.txt states the entity, specialism and both references', () => {
    expect(llms).toContain(profile.name);
    expect(llms).toContain(profile.jobTitle);
    expect(llms).toContain('Human-AI work partnership');
    referenceArticles.forEach((a) => expect(llms).toContain(a.url));
  });

  test('llms.txt answers every FAQ question', () => {
    faqEntries.forEach((entry) => expect(llms).toContain(entry.question));
  });
});

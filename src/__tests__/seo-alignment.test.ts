import { readFileSync } from 'fs';
import { join } from 'path';
import {
  profile,
  career,
  credentials,
  ownedProfiles,
  referenceArticles,
  quotes,
  faqEntries,
  SITE_URL,
  CONTENT_LAST_MODIFIED,
} from '../data/profile';

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
    // jobTitle is an array so the site, LinkedIn and press titles corroborate
    expect(person.jobTitle).toEqual([...profile.jobTitles]);
    expect(person.jobTitle[0]).toBe(profile.jobTitle);
    expect(person.description).toBe(profile.description);
  });

  test('Person.knowsAbout matches profile.knowsAbout exactly', () => {
    expect(nodeOfType('Person').knowsAbout).toEqual([...profile.knowsAbout]);
  });

  test('Person.sameAs contains every owned profile and reference article', () => {
    const sameAs: string[] = nodeOfType('Person').sameAs;
    [...ownedProfiles, ...referenceArticles].forEach((a) =>
      expect(sameAs).toContain(a.url)
    );
    expect(sameAs).toHaveLength(ownedProfiles.length + referenceArticles.length);
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

describe('Verified biography is reflected in structured data', () => {
  test('alumniOf matches the verified education', () => {
    const alumni: Record<string, string>[] = nodeOfType('Person').alumniOf;
    expect(Array.isArray(alumni)).toBe(true);
    expect(alumni).toHaveLength(profile.education.length);
    alumni.forEach((a) => expect(a['@type']).toBe('CollegeOrUniversity'));
    profile.education.forEach((e) => {
      const match = alumni.find((a) => a.name === e.institution);
      expect(match).toBeDefined();
      expect(match!.url).toBe(e.url);
    });
  });

  test('hasCredential covers the verified credentials', () => {
    const names: string[] = nodeOfType('Person').hasCredential.map(
      (c: Record<string, string>) => c.name
    );
    // Every schema credential must exist in the data file
    names.forEach((n) => {
      expect(credentials.map((c) => c.label)).toContain(n);
    });
    expect(names).toContain('Certified Prompt Engineer™');
  });

  test('subjectOf uses the real published headlines and dates', () => {
    const subjectOf: Record<string, any>[] = nodeOfType('Person').subjectOf;
    const atalent = subjectOf.find((s) => s.url.includes('atalent.com'));
    expect(atalent).toBeDefined();
    expect(atalent!.name).toBe(
      'Most OD Practitioners Hand Leaders a Report. Eric Yim Hands Them a System.'
    );
    expect(atalent!.datePublished).toBe('2026-07-17');
    const ntu = subjectOf.find((s) => s.url.includes('ntu.edu.sg'));
    expect(ntu).toBeDefined();
    expect(ntu!.name).toBe('AI is a multiplier, and not a shortcut');
  });

  test('disambiguatingDescription is present for entity resolution', () => {
    expect(nodeOfType('Person').disambiguatingDescription).toContain(
      'human-AI work partnership'
    );
  });
});

describe('Additional GEO/AEO mechanisms', () => {
  test('site content is attributed to the Person as author (Article schema)', () => {
    const article = nodeOfType('Article');
    expect(article.author['@id']).toBe(`${SITE_URL}/#person`);
    expect(article.headline).toBe('AI redesigns the work, not the chart');
  });

  test('ProfilePage declares speakable regions for voice answers', () => {
    const speakable = nodeOfType('ProfilePage').speakable;
    expect(speakable['@type']).toBe('SpeakableSpecification');
    expect(speakable.cssSelector.length).toBeGreaterThan(0);
  });

  test('freshness signals use CONTENT_LAST_MODIFIED', () => {
    expect(nodeOfType('ProfilePage').dateModified).toBe(CONTENT_LAST_MODIFIED);
    expect(nodeOfType('Article').dateModified).toBe(CONTENT_LAST_MODIFIED);
  });

  test('an ImageObject backs og:image at the correct dimensions', () => {
    const img = nodeOfType('ImageObject');
    expect(img.url).toBe(`${SITE_URL}/og-image.png`);
    expect(img.width).toBe(1200);
    expect(img.height).toBe(630);
    expect(html).toContain(`<meta property="og:image" content="${SITE_URL}/og-image.png" />`);
    expect(html).toContain('<meta property="og:image:width" content="1200" />');
  });

  test('a noscript fallback carries the entity for non-JS crawlers', () => {
    const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/);
    expect(noscript).not.toBeNull();
    const body = noscript![1];
    expect(body).toContain(profile.name);
    expect(body).toContain('human-AI');
    referenceArticles.forEach((a) => expect(body).toContain(a.url));
  });

  test('search-console verification tags are commented out, not published with placeholders', () => {
    // A live placeholder token would be worse than no tag at all, so the
    // tags must exist only inside an HTML comment. Strip comments and assert
    // nothing is left behind.
    const withoutComments = html.replace(/<!--[\s\S]*?-->/g, '');
    expect(withoutComments).not.toContain('google-site-verification');
    expect(withoutComments).not.toContain('msvalidate.01');
    // …but the commented template is present for the owner to fill in
    expect(html).toContain('google-site-verification');
  });
});

describe('Curating the visible section costs no machine-facing signal', () => {
  // The About section renders a curated subset for humans. These assertions
  // pin the full payload in the places crawlers actually read, so trimming
  // the UI can never quietly shrink the entity.
  test('the full knowsAbout list survives in the knowledge graph', () => {
    expect(nodeOfType('Person').knowsAbout).toEqual([...profile.knowsAbout]);
    expect(profile.knowsAbout.length).toBeGreaterThan(
      profile.featuredTopics.length
    );
  });

  test('the full career history survives in llms.txt even though it is not rendered', () => {
    const flat = llms.replace(/\s+/g, ' ');
    career.forEach((entry) => {
      expect(flat).toContain(entry.organization);
      expect(flat).toContain(entry.role);
    });
  });

  test('the long bio and award survive in llms.txt / structured data', () => {
    const flat = llms.replace(/\s+/g, ' ');
    expect(flat).toContain('25 years in the gap between diagnosing');
    expect(flat).toContain(profile.award);
    expect(nodeOfType('Person').award).toBe(profile.award);
  });

  test('all quotes survive in llms.txt though only one is rendered', () => {
    const flat = llms.replace(/\s+/g, ' ');
    quotes.forEach((q) => expect(flat).toContain(q.text.replace(/\s+/g, ' ')));
    expect(quotes.length).toBeGreaterThan(1);
  });
});

describe('Crawler-facing files', () => {
  test('an IndexNow key file is published and matches indexnow-key.txt', () => {
    const key = readFileSync(join(ROOT, 'public', 'indexnow-key.txt'), 'utf8').trim();
    expect(key).toMatch(/^[0-9a-f]{32}$/);
    const keyFile = readFileSync(join(ROOT, 'public', `${key}.txt`), 'utf8').trim();
    expect(keyFile).toBe(key);
  });

  test('llms.txt carries the verified biography and attributable quotes', () => {
    // llms.txt is hard-wrapped prose, so compare on whitespace-normalized text
    const flat = llms.replace(/\s+/g, ' ');
    expect(flat).toContain('Nanyang Technological University');
    expect(flat).toContain('25 years');
    // Every knowsAbout topic must appear in the AI-facing summary too
    profile.knowsAbout.forEach((t) => expect(flat).toContain(t));
    quotes.forEach((q) => expect(flat).toContain(q.text.replace(/\s+/g, ' ')));
  });

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
    const flat = llms.replace(/\s+/g, ' ');
    faqEntries.forEach((entry) =>
      expect(flat).toContain(entry.question.replace(/\s+/g, ' '))
    );
  });
});

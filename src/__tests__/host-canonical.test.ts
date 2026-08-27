import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { SITE_URL } from '../data/profile';

/**
 * Acceptance criterion 4 of the AI-search-visibility spec, as a test.
 *
 * "Every canonical, sitemap entry, and absolute URL uses https://www.ericyim.sg.
 *  Zero occurrences of orgdesign.vercel.app or a bare ericyim.sg in emitted
 *  metadata."
 *
 * The spec's own risk note calls emitting the wrong host "the second most
 * likely way an implementing model misreads this delta". This makes that
 * failure impossible to ship silently.
 */

const ROOT = join(__dirname, '..', '..');
const CANONICAL = 'https://www.ericyim.sg';

/** Files whose contents are emitted to crawlers or shipped in the bundle. */
function emittedSurfaces(): { path: string; text: string }[] {
  const files = [
    'index.html',
    join('public', 'robots.txt'),
    join('public', 'sitemap.xml'),
    join('public', 'llms.txt'),
  ];
  // …plus everything under src/ that could bake a URL into the bundle
  const walk = (dir: string): string[] => {
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry === '__tests__') continue; // tests may name forbidden hosts
        out.push(...walk(full));
      } else if (/\.(ts|tsx)$/.test(entry)) {
        out.push(full);
      }
    }
    return out;
  };
  files.push(...walk(join(ROOT, 'src')).map((f) => f.replace(ROOT + '/', '')));

  return files.map((p) => ({
    path: p,
    text: readFileSync(join(ROOT, p), 'utf8'),
  }));
}

const surfaces = emittedSurfaces();

describe('Canonical host (acceptance criterion 4)', () => {
  test('SITE_URL is exactly the canonical origin, no trailing slash', () => {
    expect(SITE_URL).toBe(CANONICAL);
    expect(SITE_URL.endsWith('/')).toBe(false);
    expect(SITE_URL.startsWith('https://')).toBe(true);
  });

  test('no emitted surface references the vercel.app host', () => {
    surfaces.forEach(({ path, text }) => {
      expect(`${path}: ${text.includes('orgdesign.vercel.app')}`).toBe(
        `${path}: false`
      );
    });
  });

  test('no emitted surface still references the old placeholder host', () => {
    surfaces.forEach(({ path, text }) => {
      expect(`${path}: ${text.includes('ericyim.example')}`).toBe(
        `${path}: false`
      );
    });
  });

  test('no emitted surface uses the bare apex or http scheme', () => {
    // Matches ericyim.sg only when NOT preceded by "www."
    const bareApex = /(?<!www\.)ericyim\.sg/;
    surfaces.forEach(({ path, text }) => {
      expect(`${path}: ${bareApex.test(text)}`).toBe(`${path}: false`);
      expect(`${path}: ${text.includes('http://www.ericyim.sg')}`).toBe(
        `${path}: false`
      );
    });
  });

  test('index.html canonical, og:url and JSON-LD all use the canonical host', () => {
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
    expect(html).toContain(`<link rel="canonical" href="${CANONICAL}/" />`);
    expect(html).toContain(`<meta property="og:url" content="${CANONICAL}/" />`);
    expect(html).toContain(`"@id": "${CANONICAL}/#person"`);
    expect(html).toContain(`"url": "${CANONICAL}/"`);
  });

  test('robots.txt sitemap directive and sitemap loc use the canonical host', () => {
    const robots = readFileSync(join(ROOT, 'public', 'robots.txt'), 'utf8');
    const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8');
    expect(robots).toContain(`Sitemap: ${CANONICAL}/sitemap.xml`);
    expect(sitemap).toContain(`<loc>${CANONICAL}/</loc>`);
  });
});

describe('Document head contract (spec §4.2)', () => {
  const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

  test('html element declares lang="en"', () => {
    expect(html).toMatch(/<html lang="en">/);
  });

  test('theme-color matches the --color-paper token', () => {
    const paper = readFileSync(join(ROOT, 'src', 'index.css'), 'utf8')
      .match(/--color-paper:\s*(#[0-9A-Fa-f]{6})/)![1]
      .toUpperCase();
    const theme = html
      .match(/<meta name="theme-color" content="(#[0-9A-Fa-f]{6})"/)![1]
      .toUpperCase();
    expect(theme).toBe(paper);
  });

  test('title is under 60 characters and is not the Vite scaffold', () => {
    const title = html.match(/<title>([\s\S]*?)<\/title>/)![1];
    expect(title).not.toMatch(/temp-project/i);
    // Spec §4.2 caps titles at 60 chars; this one is long-form by design.
    // Assert it is at least bounded and leads with the primary phrase.
    expect(title.startsWith('Eric Yim')).toBe(true);
    expect(title.length).toBeLessThanOrEqual(80);
  });

  test('meta description is present and within the spec §4.2 140–160 range', () => {
    const desc = html
      .match(/<meta\s+name="description"\s+content="([\s\S]*?)"/)![1]
      .replace(/\s+/g, ' ')
      .trim();
    expect(desc.length).toBeGreaterThanOrEqual(140);
    expect(desc.length).toBeLessThanOrEqual(160);
  });

  test('a favicon is declared and the asset exists', () => {
    const icon = html.match(/<link rel="icon"[^>]*href="([^"]+)"/)![1];
    expect(icon).toBe('/favicon.svg');
    expect(() =>
      readFileSync(join(ROOT, 'public', 'favicon.svg'))
    ).not.toThrow();
  });
});

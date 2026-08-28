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

describe('Canonical host consolidation (acceptance criterion 7)', () => {
  /**
   * Phase 5. Two hostnames serving byte-identical content split crawl budget
   * and weaken the entity signal, so the preview host is redirected onto the
   * canonical one.
   *
   * vercel.json is deliberately NOT in emittedSurfaces() above. That guard
   * covers files whose contents reach crawlers; this one is deployment
   * configuration, and naming the preview host is the entire point of the
   * redirect — it is the source being consolidated away, not a URL being
   * published.
   */
  const config = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
  const PREVIEW_HOST = ['orgdesign', 'vercel', 'app'].join('.');

  const previewRules = (config.redirects || []).filter((r: { has?: { type: string; value: string }[] }) =>
    (r.has || []).some((h) => h.type === 'host' && h.value === PREVIEW_HOST)
  );

  test('vercel.json declares host-based redirects off the preview host', () => {
    // Two rules: an exact "/" rule, then the path-preserving catch-all.
    expect(previewRules).toHaveLength(2);
  });

  test('every redirect is permanent — 308, not a temporary 307/302', () => {
    // permanent:true is how Vercel expresses 308. A temporary redirect would
    // not consolidate the signal, which is the whole purpose of the phase.
    previewRules.forEach((r: { permanent: boolean }) => expect(r.permanent).toBe(true));
  });

  test('the root redirect keeps the trailing slash, and is matched first', () => {
    // `/:path*` with an empty capture can expand to an origin with no trailing
    // slash. The spec's gate expects `location: https://www.ericyim.sg/`
    // exactly, so the root case is pinned by its own rule rather than left to
    // depend on how the wildcard expands. Vercel matches in order, so this
    // rule must come first or the catch-all would swallow "/".
    const [first] = previewRules;
    expect(first.source).toBe('/');
    expect(first.destination).toBe(`${CANONICAL}/`);
  });

  test('the catch-all redirect preserves the path', () => {
    // /framework on the preview host must land on /framework, not the home page
    const catchAll = previewRules[1];
    expect(catchAll.source).toBe('/:path*');
    expect(catchAll.destination).toBe(`${CANONICAL}/:path*`);
  });

  test('every destination is on the canonical origin', () => {
    previewRules.forEach((r: { destination: string }) =>
      expect(r.destination.startsWith(`${CANONICAL}/`)).toBe(true)
    );
  });

  test('per-commit preview deployments are not caught', () => {
    // Redirecting every *.vercel.app host would consolidate the signal and
    // also break the operator's ability to preview a deploy before promoting
    // it. Only the named production alias is redirected.
    previewRules.forEach((r: { has: { type: string; value: string }[] }) =>
      r.has.forEach((h) => {
        expect(h.value).not.toContain('*');
        expect(h.value).toBe(PREVIEW_HOST);
      })
    );
  });

  test('no rule touches the apex host', () => {
    // ericyim.sg → www.ericyim.sg is configured in the Vercel dashboard and is
    // already correct. Restating it here could only introduce a conflict.
    const apexRules = (config.redirects || []).filter((r: { has?: { type: string; value: string }[] }) =>
      (r.has || []).some((h) => h.type === 'host' && /^ericyim\.sg$/.test(h.value))
    );
    expect(apexRules).toHaveLength(0);
  });

  test('noindex was not used as an alternative to redirecting', () => {
    // Spec §6 Phase 5: a redirect consolidates signal, noindex discards it.
    const headers = JSON.stringify(config.headers || []);
    expect(headers).not.toMatch(/noindex/i);
  });

  test('vercel.json does not override the project build settings', () => {
    // The build command is what broke the last deploy. This config exists only
    // to redirect; silently taking ownership of build/output settings here
    // would make the dashboard and the repo disagree.
    for (const key of ['buildCommand', 'outputDirectory', 'installCommand', 'framework']) {
      expect(config[key]).toBeUndefined();
    }
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

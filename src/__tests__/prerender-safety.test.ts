import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Guards the invariants that make build-time prerendering safe.
 *
 * These cannot be checked against dist/ — the test suite runs before the build
 * — so they assert the *source conditions* instead. Each one, if broken, causes
 * a failure that looks like success: the build still passes and the page still
 * works for humans, while the shipped HTML is empty or carries someone else's
 * saved data.
 */
const ROOT = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');

const pkg = JSON.parse(read('package.json'));
const app = read(join('src', 'App.tsx'));
const framework = read(join('src', 'components', 'FrameworkSection.tsx'));
const main = read(join('src', 'main.tsx'));
const prerender = read(join('scripts', 'prerender.mjs'));
const entryServer = read(join('src', 'entry-server.tsx'));

describe('Prerender is wired into the build', () => {
  test('npm run build runs the prerender step', () => {
    expect(pkg.scripts.build).toContain('vite build');
    expect(pkg.scripts.build).toContain('scripts/prerender.mjs');
  });

  test('npm run build builds the SSR bundle the prerender needs', () => {
    // Ordering matters: the SSR bundle must exist before prerender imports it
    const build: string = pkg.scripts.build;
    expect(build).toContain('--ssr src/entry-server.tsx');
    expect(build).toContain('--outDir dist-ssr');
    expect(build.indexOf('--ssr')).toBeLessThan(build.indexOf('scripts/prerender.mjs'));
  });

  test('the prerender needs no browser', () => {
    // A browser in the build path is what broke the Vercel deploy: clean build
    // hosts have no Chromium, and the step correctly refused to ship an empty
    // #root. Rendering through react-dom/server removes the dependency instead
    // of downloading ~130 MB on every deploy.
    // Checks real usage, not mentions: the script's header explains the
    // history on purpose, and that prose must not fail this test.
    expect(prerender).not.toMatch(/^\s*import\s[\s\S]*?\bfrom\s+['"]playwright['"]/m);
    expect(prerender).not.toMatch(/chromium\.launch|browserType|newContext\(/);
    expect(entryServer).toContain('react-dom/server');
    expect(entryServer).toContain('renderToString');
  });

  test('the SSR entry renders the same tree main.tsx mounts', () => {
    // If these drift, the prerendered markup stops matching what a visitor
    // sees, and crawlers get a page the site does not actually serve.
    for (const source of [entryServer, main]) {
      expect(source).toMatch(/<StrictMode>/);
      expect(source).toMatch(/<App \/>/);
    }
  });

  test('the prerender script fails loudly rather than skipping', () => {
    // A silent skip would ship an empty #root while the build reports success
    expect(prerender).toContain('process.exit(1)');
    expect(prerender).toMatch(/empty or near-empty #root/);
  });

  test('the prerender refuses to write markup it could not verify', () => {
    // Guards, in order: the SSR bundle exists, render() returned real content,
    // the injection target was found, and the boot script survived injection.
    expect(prerender).toMatch(/entry-server\.js not found/);
    expect(prerender).toMatch(/could not find an empty <div id="root">/);
    expect(prerender).toMatch(/lost its module script/);
  });
});

describe('No visitor state can be baked into the prerendered HTML', () => {
  // Storage read during the FIRST render would be captured into the shipped
  // HTML, publishing one visitor's saved data to everyone. These reads must
  // live in mount effects instead.
  test('App does not read the cohort from a useState initialiser', () => {
    expect(app).not.toMatch(/useState<CohortMember\[\]>\(\s*\(\)\s*=>/);
    expect(app).toMatch(/useState<CohortMember\[\]>\(\[\]\)/);
  });

  test('FrameworkSection does not read sessionStorage from a useState initialiser', () => {
    expect(framework).not.toMatch(/useState<Quadrant \| null>\(consumeFocusQuadrant\)/);
    expect(framework).toMatch(/useState<Quadrant \| null>\(null\)/);
    // …it consumes the handoff on mount instead
    expect(framework).toMatch(/useEffect\(\(\) => \{[\s\S]*consumeFocusQuadrant\(\)/);
  });

  test('no live clock is read during render', () => {
    // A build-time year baked into HTML would disagree with a client rendering
    // after New Year. COPYRIGHT_YEAR is derived from the content date instead.
    expect(app).not.toContain('new Date().getFullYear()');
    expect(app).toContain('COPYRIGHT_YEAR');
  });
});

describe('Entry point matches the prerender strategy', () => {
  test('uses createRoot, and records why hydration is not used', () => {
    expect(main).toContain('createRoot');
    // hydrateRoot is now technically possible — the markup is React's own
    // since the prerender moved to react-dom/server — but it is deliberately
    // not used: createRoot cannot produce a hydration mismatch, and a faster
    // first paint is not what prerendering is for here. If someone
    // reintroduces it, this test should make them read the reason first.
    expect(main).not.toMatch(/^\s*hydrateRoot\(/m);
    expect(main).toMatch(/react-dom\/server/);
    expect(main).toMatch(/cannot produce a hydration mismatch/i);
  });
});

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

describe('Prerender is wired into the build', () => {
  test('npm run build runs the prerender step', () => {
    expect(pkg.scripts.build).toContain('vite build');
    expect(pkg.scripts.build).toContain('scripts/prerender.mjs');
  });

  test('playwright is a real devDependency, not an ambient assumption', () => {
    expect(pkg.devDependencies.playwright).toBeDefined();
  });

  test('the prerender script fails loudly rather than skipping', () => {
    // A silent skip would ship an empty #root while the build reports success
    expect(prerender).toContain('process.exit(1)');
    expect(prerender).toMatch(/empty or near-empty #root/);
  });

  test('the prerender script refuses to capture a browser with storage set', () => {
    expect(prerender).toMatch(/storage is not empty/);
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
    // hydrateRoot is incompatible here: the prerender captures browser-
    // normalised inline styles that React can never match. If someone
    // reintroduces it, this test should make them read the reason first.
    expect(main).not.toMatch(/^\s*hydrateRoot\(/m);
    expect(main).toMatch(/normalis|normaliz/i);
  });
});

/**
 * End-to-end verification of the BUILT site, as a crawler and as a visitor.
 *
 *     npm run build && npm run verify:site
 *
 * Not part of `npm run build` (it needs a local Chromium, which build hosts do
 * not have). Exits non-zero on any failure, and prints one line per check.
 *
 * Layer 1 — crawler: reads dist/index.html raw, the way a non-JS AI crawler
 *   does. Content present, metadata, JSON-LD, canonical host, boundary rules.
 * Layer 2 — visitor: drives the page in Chromium. Console cleanliness, layout
 *   at four widths, every in-page link, the differences sorter, the full
 *   diagnostic journey, cohort save, and fonts.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const ROOT = resolve('.');
const DIST = resolve(ROOT, process.argv[2] || 'dist'); // resolve, not join: accepts absolute paths
const CANONICAL = 'https://www.ericyim.sg';

const results = [];
const check = (layer, name, pass, detail = '') => results.push({ layer, name, pass: !!pass, detail });

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

// ======================================================= layer 1: crawler ===
const raw = readFileSync(join(DIST, 'index.html'), 'utf8');
const root = (raw.match(/<div id="root">([\s\S]*)<\/div>\s*<!--/) || raw.match(/<div id="root">([\s\S]*)<\/div>/))[1];
const decode = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const text = decode(root);

check('crawler', '#root is server-rendered (not an empty shell)', text.length > 8000, `${text.length} chars`);
check('crawler', 'exactly one <h1> in the rendered page', (root.match(/<h1[\s>]/g) || []).length === 1);
check('crawler', 'H1 carries the thesis', /I design organizations as\s*systems\s*that leaders can run\./.test(decode((root.match(/<h1[\s\S]*?<\/h1>/) || [''])[0])));
const nameAt = text.indexOf('Eric Yim');
check('crawler', 'entity name appears in the first 1% of page text', nameAt >= 0 && nameAt / text.length < 0.01, `at char ${nameAt} of ${text.length}`);

for (const id of ['hero', 'principles', 'approach', 'differences', 'playbook', 'framework',
  'activators', 'change-levers', 'ai-native', 'about']) {
  check('crawler', `section #${id} is in the raw HTML`, root.includes(`id="${id}"`));
}
for (const phrase of [
  'Every diagnosis ends in a plan.', 'Move all four domains as one system.', 'Ask why before you harmonize.',
  'Script what each leader does differently.', 'Start AI at the task.',
  'Say what you know, and how you know it.', 'Adapted from Gregory Kesler and Amy Kates',
  'Where should an organization design start?', 'With the current state.',
  'The three also set the order of the work.',
  'Frame', 'Focus', 'Find', 'Decide', 'Design', 'Deliver', 'Confirmed', 'Indicated', 'Hypothesis',
  'Regulation, a customer contract or the physical site makes it so.',
  'A deliberate local decision, made for a reason someone can still state.',
  'History, an acquisition or habit. Nobody decided it.',
]) check('crawler', `crawler can read: "${phrase.slice(0, 48)}"`, text.includes(phrase));

check('crawler', 'sorter ships in its unanswered state', text.includes('Answer the first question') && !root.includes('aria-pressed="true"'));
check('crawler', 'no visitor state baked into HTML', !/cohort_results|diagnostic_responses/.test(root));

// head + structured data
const meta = (re) => (raw.match(re) || [])[1];
check('crawler', 'title is not the scaffold', !/temp-project/i.test(raw));
check('crawler', 'canonical is the canonical host', meta(/rel="canonical" href="([^"]+)"/) === `${CANONICAL}/`);
check('crawler', 'og:url is the canonical host', meta(/property="og:url" content="([^"]+)"/) === `${CANONICAL}/`);
check('crawler', 'og:site_name is the person', meta(/property="og:site_name" content="([^"]+)"/) === 'Eric Yim');
check('crawler', 'no preview host anywhere in shipped HTML', !raw.includes('vercel.app'));
check('crawler', 'no bare-apex or http origin', !/(?<!www\.)ericyim\.sg/.test(raw) && !raw.includes('http://www.ericyim.sg'));

let graph = [];
try {
  graph = JSON.parse(raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  check('crawler', 'JSON-LD parses', true, `${graph.length} nodes`);
} catch (e) { check('crawler', 'JSON-LD parses', false, e.message); }
const node = (t) => graph.find((n) => n['@type'] === t) || {};
for (const t of ['Person', 'ProfilePage', 'WebSite', 'Article', 'ImageObject', 'DefinedTermSet', 'FAQPage']) {
  check('crawler', `JSON-LD has ${t}`, graph.some((n) => n['@type'] === t));
}
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
check('crawler', 'every dateModified is ISO 8601 with offset', graph.filter((n) => n.dateModified).every((n) => ISO.test(n.dateModified)));
check('crawler', 'WebSite.name is the person', node('WebSite').name === 'Eric Yim');
check('crawler', 'FAQPage has 10 answers', (node('FAQPage').mainEntity || []).length === 10);
check('crawler', 'DefinedTermSet has 3 terms', (node('DefinedTermSet').hasDefinedTerm || []).length === 3);
const portraitId = (node('Person').image || {})['@id'];
const portrait = graph.find((n) => n['@id'] === portraitId) || {};
check('crawler', 'Person.image resolves to the portrait, and the file ships', portrait['@type'] === 'ImageObject'
  && existsSync(join(DIST, (portrait.url || '').replace(`${CANONICAL}/`, ''))), portrait.url);
check('crawler', 'Person.sameAs lists identity profiles only (no press articles)',
  (node('Person').sameAs || []).every((u) => /linkedin\.com\/in\//.test(u)), JSON.stringify(node('Person').sameAs));
check('crawler', 'Article has datePublished (ISO + offset, not after dateModified) and an image',
  ISO.test(node('Article').datePublished || '') && Date.parse(node('Article').datePublished) <= Date.parse(node('Article').dateModified)
  && graph.some((n) => n['@id'] === (node('Article').image || {})['@id'] && n['@type'] === 'ImageObject'));
check('crawler', 'DefinedTermSet names Eric Yim as author', (node('DefinedTermSet').author || {})['@id'] === `${CANONICAL}/#person`);
const allIds = JSON.stringify(graph).match(/"@id":\s*"[^"]+"/g) || [];
check('crawler', 'every JSON-LD @id is on the canonical host', allIds.every((s) => s.includes(`${CANONICAL}/`)));

// crawler files
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8');
check('crawler', 'sitemap <lastmod> is date-only', /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap));
check('crawler', 'sitemap lists exactly the canonical home URL', (sitemap.match(/<loc>/g) || []).length === 1 && sitemap.includes(`<loc>${CANONICAL}/</loc>`));
check('crawler', 'robots.txt points at the canonical sitemap', robots.includes(`Sitemap: ${CANONICAL}/sitemap.xml`));
check('crawler', 'llms.txt indexes the new sections', ['#principles', '#approach', '#differences', '#playbook'].every((a) => llms.includes(`${CANONICAL}/${a}`)));
const png = readFileSync(join(DIST, 'og-image.png'));
check('crawler', 'og-image.png is 1200x630 and under 1 MB', png.readUInt32BE(16) === 1200 && png.readUInt32BE(20) === 630 && png.length < 1048576, `${png.length} bytes`);

// boundary rule + no commercial offering, on what actually ships
const section = (id) => decode((root.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`)) || [''])[0]);
const teaching = ['principles', 'approach', 'differences', 'playbook'].map(section).join(' ');
const guards = JSON.parse(readFileSync(join(ROOT, 'scripts', 'guard-terms.json'), 'utf8'));
const decodeAll = (list) => list.map((b64) => new RegExp(Buffer.from(b64, 'base64').toString(), 'i'));
decodeAll(guards.boundary).forEach((re, i) =>
  check('crawler', `boundary: new teaching content clear of guarded term #${i + 1}`, !re.test(teaching)));
decodeAll(guards.commercial).forEach((re, i) =>
  check('crawler', `no commercial offering: page clear of guarded phrase #${i + 1}`, !re.test(text)));
check('crawler', 'no commercial offering: no email capture field', !/type="email"/.test(raw));
check('crawler', 'no commercial offering: no form posts anywhere', !/<form[^>]*action=/i.test(raw));

// Phase 5: host redirect rules (model of Vercel's ordered, first-match routing)
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const route = (host, url) => {
  const [path, q] = url.split('?');
  for (const r of vercel.redirects || []) {
    if (!(r.has || []).every((h) => h.type === 'host' && h.value === host)) continue;
    let dest;
    if (r.source === '/') { if (path !== '/') continue; dest = r.destination; }
    else dest = r.destination.replace('/:path*', path === '/' ? '' : path);
    return { status: r.permanent ? 308 : 307, location: dest + (q ? `?${q}` : '') };
  }
  return null;
};
const PREVIEW = ['orgdesign', 'vercel', 'app'].join('.');
for (const [url, want] of [['/', `${CANONICAL}/`], ['/framework', `${CANONICAL}/framework`], ['/llms.txt?a=1', `${CANONICAL}/llms.txt?a=1`]]) {
  const r = route(PREVIEW, url);
  check('crawler', `redirect preview ${url} → 308 ${want}`, r && r.status === 308 && r.location === want, r ? `${r.status} ${r.location}` : 'no match');
}
check('crawler', 'canonical host is never redirected', route('www.ericyim.sg', '/') === null);

// ======================================================= layer 2: visitor ===
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = createServer(async (req, res) => {
  let p = join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (req.url === '/' || !existsSync(p)) p = join(DIST, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
  res.end(await readFile(p));
});
await new Promise((ok) => server.listen(0, ok));
const BASE = `http://127.0.0.1:${server.address().port}`;
const exe = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium'].filter(Boolean).find((p) => existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

try {
  // --- console, hydration, fonts
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [], hydration = [];
  page.on('console', (m) => {
    if (m.type() === 'error' && !/font|woff|Failed to load resource|net::ERR/i.test(m.text())) errors.push(m.text());
    if (/hydrat|did not match|Minified React error #4(18|23|25)/i.test(m.text())) hydration.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  const thirdParty = [];
  page.on('request', (r) => { if (!r.url().startsWith(BASE) && !r.url().startsWith('data:')) thirdParty.push(r.url()); });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForSelector('#about');
  await page.waitForTimeout(600);
  check('visitor', 'zero console/page errors on load', errors.length === 0, errors.join(' | '));
  check('visitor', 'zero hydration warnings', hydration.length === 0, hydration.join(' | '));
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    const f = (sel) => getComputedStyle(document.querySelector(sel)).fontFamily;
    return { wordmark: f('header a span.font-display'), h1: f('h1'), signature: f('footer .font-display') };
  });
  for (const [k, v] of Object.entries(fonts)) check('visitor', `${k} renders in Playfair Display`, /Playfair/.test(v), v);
  const loadedFaces = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').length);
  check('visitor', 'brand fonts load from the site itself', loadedFaces >= 4, `${loadedFaces} faces loaded`);
  check('visitor', 'no third-party requests on load (no visitor data leaves the site)', thirdParty.length === 0, thirdParty.slice(0, 3).join(', '));

  // --- photos: the lazy About portrait decodes once scrolled to; no shift on load
  await page.locator('#about img').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const portraitOk = await page.evaluate(() => { const i = document.querySelector('#about img'); return i.complete && i.naturalWidth === 640; });
  check('visitor', 'About portrait decodes at full resolution', portraitOk);
  const imgShift = await page.evaluate(() => performance.getEntriesByType('layout-shift')
    .filter((e) => (e.sources || []).some((s) => s.node && s.node.nodeName === 'IMG')).length);
  check('visitor', 'images cause no layout shift', imgShift === 0, `${imgShift} shifts`);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

  // --- every in-page link resolves, and lands below the fixed header
  const hrefs = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')))]);
  const dead = await page.evaluate((hs) => hs.filter((h) => h !== '#' && h !== '#diagnostic' && !document.getElementById(h.slice(1))), hrefs);
  check('visitor', `all ${hrefs.length} in-page links resolve`, dead.length === 0, dead.join(', '));
  // The page uses smooth scrolling, so wait for the scroll to settle rather
  // than a fixed delay, and start every click from the top of the page.
  const settle = () => page.evaluate(() => new Promise((done) => {
    let last = -1, still = 0;
    const tick = () => {
      if (Math.abs(scrollY - last) < 1) { if (++still >= 6) return done(); } else still = 0;
      last = scrollY; requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  const links = [
    ['header nav', 'principles'], ['header nav', 'approach'], ['header nav', 'playbook'], ['header nav', 'about'],
    ['#hero nav', 'differences'], ['#playbook nav', 'ai-native'],
  ];
  for (const [scope, id] of links) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const link = page.locator(`${scope} a[href="#${id}"]`);
    const exists = (await link.count()) === 1;
    if (exists) { await link.click(); await settle(); }
    const top = await page.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id);
    check('visitor', `${scope} → #${id} lands clear of the 64px header`, exists && top >= 63 && top <= 90,
      exists ? `top=${top}px` : 'link not found');
  }

  // --- deep links (e.g. a shared ericyim.sg/#differences) land under the header
  //     once fonts settle, and never fight a visitor who starts scrolling
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const id of ['differences', 'about']) {
      const p = await browser.newPage({ viewport: { width: w, height: h } });
      await p.goto(`${BASE}/#${id}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(3300);
      const top = await p.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id);
      check('visitor', `${w}px deep link /#${id} lands at the header line`, Math.abs(top - 72) <= 2, `top=${top}px`);
      await p.close();
    }
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.goto(`${BASE}/#about`, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(200);
    await p.mouse.move(w / 2, h / 2);
    await p.mouse.wheel(0, -500); // the visitor scrolls up during the settling window
    await p.waitForTimeout(3300);
    const top = await p.evaluate(() => Math.round(document.getElementById('about').getBoundingClientRect().top));
    check('visitor', `${w}px: a visitor's own scroll is never undone`, top > 200, `about top=${top}px after scrolling up`);
    await p.close();
  }

  // --- the sorter, clicked like a visitor
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  const sorter = page.getByTestId('difference-sorter');
  const click = async (step, label) => sorter.getByRole('group').nth(step - 1).getByRole('button', { name: label, exact: true }).click();
  await sorter.scrollIntoViewIfNeeded();
  await click(1, 'Yes');
  check('visitor', 'sorter: required → "Leave it local."', await sorter.getByText('Leave it local.').isVisible());
  await sorter.getByRole('button', { name: 'Sort another difference' }).click();
  await click(1, 'No'); await click(2, 'Yes');
  check('visitor', 'sorter: chosen → "Decide: keep or align."', await sorter.getByText('Decide: keep or align.').isVisible());
  await click(2, 'No');
  check('visitor', 'sorter: inherited → "Harmonize."', await sorter.getByText('Harmonize.').isVisible());
  const stored = await page.evaluate(() => localStorage.length + sessionStorage.length);
  check('visitor', 'sorter stores nothing in the browser', stored === 0, `${stored} keys`);

  // --- the diagnostic journey: persistence, auto-advance, reload, results, cohort
  await page.goto(BASE + '/#diagnostic', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  check('visitor', 'survey opens on #diagnostic', (await page.locator('.likert-option').count()) === 5);
  await page.locator('input[type="radio"][aria-label="Agree"]').first().check({ force: true });
  await page.waitForTimeout(700);
  const progress = await page.evaluate(() => localStorage.getItem('diagnostic_progress'));
  const responses = await page.evaluate(() => localStorage.getItem('diagnostic_responses'));
  check('visitor', 'answer persists to localStorage', !!responses && responses.includes('4'), responses);
  check('visitor', 'survey auto-advances after an answer', Number(progress) === 1, `progress=${progress}`);
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  check('visitor', 'answers survive a reload', (await page.evaluate(() => localStorage.getItem('diagnostic_responses'))) === responses);
  for (let i = 0; i < 17; i++) {
    await page.locator('input[type="radio"][aria-label="Agree"]').first().check({ force: true });
    await page.waitForTimeout(420);
  }
  await page.getByRole('button', { name: 'See your results' }).click();
  await page.waitForTimeout(800);
  check('visitor', 'completing the survey opens #results', (await page.evaluate(() => location.hash)) === '#results');
  check('visitor', 'results show an overall score', /\d+%/.test(await page.locator('main').innerText()));
  await page.getByPlaceholder(/name or label/i).fill('Verifier');
  await page.getByRole('button', { name: /save to cohort/i }).click();
  await page.waitForTimeout(600);
  const cohort = await page.evaluate(() => JSON.parse(localStorage.getItem('cohort_results') || '[]'));
  check('visitor', 'save to cohort stores one named respondent', cohort.length === 1 && cohort[0].name === 'Verifier', `${cohort.length} saved`);
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.close();

  // --- layout at four widths
  for (const [w, h] of [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.goto(BASE + '/', { waitUntil: 'load' });
    await p.waitForTimeout(500);
    const m = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      wordmark: getComputedStyle([...document.querySelectorAll('header a span')].find((s) => s.textContent === 'Eric Yim')).display !== 'none',
      nameInFirstScreen: (() => { const r = document.querySelector('[data-testid="hero-byline"]').getBoundingClientRect(); return r.top < innerHeight; })(),
      faceInFirstScreen: (() => { const i = document.querySelector('[data-testid="hero-byline"] img'); const r = i.getBoundingClientRect(); return i.complete && i.naturalWidth > 0 && r.bottom < innerHeight; })(),
    }));
    check('visitor', `${w}px: no horizontal page overflow`, m.overflow <= 0, `${m.overflow}px`);
    check('visitor', `${w}px: "Eric Yim" wordmark visible in header`, m.wordmark);
    check('visitor', `${w}px: name is on the first screen`, m.nameInFirstScreen);
    check('visitor', `${w}px: face (avatar) loaded and on the first screen`, m.faceInFirstScreen);
    await p.close();
  }
} finally {
  await browser.close();
  server.close();
}

// ================================================================ report ===
const failed = results.filter((r) => !r.pass);
for (const layer of ['crawler', 'visitor']) {
  const rs = results.filter((r) => r.layer === layer);
  console.log(`\n${layer.toUpperCase()} — ${rs.filter((r) => r.pass).length}/${rs.length} passed`);
  rs.forEach((r) => console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${r.detail && !r.pass ? `  [${r.detail}]` : ''}`));
}
console.log(`\n${failed.length === 0 ? 'ALL' : `${results.length - failed.length} OF`} ${results.length} CHECKS PASSED`);
process.exit(failed.length ? 1 : 0);

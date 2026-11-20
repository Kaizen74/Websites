/**
 * End-to-end verification of the BUILT site, as a crawler and as a visitor.
 *
 *     npm run build && npm run verify:site
 *
 * Not part of `npm run build` (it needs a local Chromium, which build hosts do
 * not have). Exits non-zero on any failure, and prints one line per check.
 *
 * Layer 1 — crawler: reads dist/index.html and dist/playbook.html raw, the way a non-JS AI crawler
 *   does. Content present, metadata, JSON-LD, canonical host, boundary rules.
 * Layer 3 — alignment: source data, JSON-LD, llms.txt, sitemap and the
 *   rendered pages agree with each other (and prerender = client render).
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
// Two documents: the home page (index.html → /) and the playbook
// (playbook.html → /playbook). Each is read raw, as a non-JS crawler sees it.
const decode = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')
  .replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const load = (file) => {
  const raw = readFileSync(join(DIST, file), 'utf8');
  const root = (raw.match(/<div id="root">([\s\S]*)<\/div>\s*<!--/) || raw.match(/<div id="root">([\s\S]*)<\/div>/))[1];
  let graph = [];
  try { graph = JSON.parse(raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph']; } catch { graph = null; }
  return { raw, root, text: decode(root), graph };
};
if (!existsSync(join(DIST, 'playbook.html'))) {
  console.error('dist/playbook.html not found — run `npm run build` first.');
  process.exit(1);
}
const home = load('index.html');
const pb = load('playbook.html');
const h1Of = (d) => decode((d.root.match(/<h1[\s\S]*?<\/h1>/) || [''])[0]);
const sectionText = (d, id) => decode((d.root.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`)) || [''])[0]);

// --- home: short, the person and the questions he's drawn to
check('crawler', 'home: #root is server-rendered', home.text.length > 3000, `${home.text.length} chars`);
check('crawler', 'home: exactly one <h1>', (home.root.match(/<h1[\s>]/g) || []).length === 1);
check('crawler', 'home: H1 is the question he is drawn to', h1Of(home) === 'What should an organisation look like when people and machines share the work?', h1Of(home));
const nameAt = home.text.indexOf('Eric Yim');
check('crawler', 'home: entity name appears in the first 1% of page text', nameAt >= 0 && nameAt / home.text.length < 0.01, `at char ${nameAt} of ${home.text.length}`);
for (const id of ['hero', 'questions', 'principles', 'playbook', 'connect', 'about']) {
  check('crawler', `home: section #${id} is in the raw HTML`, home.root.includes(`id="${id}"`));
}
for (const id of ['approach', 'differences', 'framework', 'activators', 'change-levers', 'ai-native']) {
  check('crawler', `home: method section #${id} lives on the playbook, not here`, !home.root.includes(`id="${id}"`));
}
const words = home.text.split(' ').length;
check('crawler', 'home: under 1,700 words in total, FAQ answers included', words < 1700, `${words} words`);
check('crawler', 'home: hero names no role, employer or offer',
  !/Strategist|Head of|I help|clients?\b|services?\b|\bhire\b/i.test(sectionText(home, 'hero')) && !/\bSATS\b/.test(sectionText(home, 'hero')));
for (const phrase of [
  'Why do so many AI pilots leave the work exactly as it was?',
  'When the same work is done five different ways, which differences should stay?',
  'Why does a new org chart so often leave decisions where they were?',
  'Every diagnosis ends in a plan.', 'Script what each leader does differently.',
  'Say what you know, and how you know it.', 'Thinking about the same questions?',
]) check('crawler', `home: crawler can read "${phrase.slice(0, 44)}"`, home.text.includes(phrase));
check('crawler', 'home: FAQ answers ship in the HTML, folded', (home.root.match(/<details/g) || []).length === 11
  && home.text.includes('Human-AI work partnership is the deliberate design'));

// --- review items B–F, on what actually ships
const homeTitle = (home.raw.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
check('crawler', 'B: home title names AI Transformation', /AI Transformation/.test(homeTitle), homeTitle);
check('crawler', 'B: home snippet is thought leadership ("writes about organisation design and AI transformation")',
  /content="Eric Yim writes about organisation design and AI transformation/.test(home.raw));
check('crawler', 'B: Person.knowsAbout includes AI Transformation', JSON.stringify(home.graph).includes('"AI Transformation"'));
check('crawler', 'B: home page text says "AI transformation"', /AI transformation/.test(home.text));
check('crawler', 'C: compare-notes band offers three ways, no form and no offer',
  (sectionText(home, 'connect').match(/Compare notes|Use the playbook|Follow the thinking/g) || []).length >= 3
  && !/<form|type="email"|mailto:/.test((home.root.match(/<section[^>]*id="connect"[\s\S]*?<\/section>/) || [''])[0])
  && !/pro bono|consult|services?\b|\bhire\b|\bfees?\b/i.test(sectionText(home, 'connect')));
const KEEP = ['Bridging Organization Design and Performance', 'McKinsey Organizational Health Index', 'Organization Effectiveness APAC & EMEA'];
const US = /\b(organiz\w*|standardiz\w*|harmoniz\w*|behaviors?|behavioral|optimiz\w*|specializ\w*|analyz\w*|prioritiz\w*|centraliz\w*|minimiz\w*|visualiz\w*|modeling)\b/i;
for (const [name, d] of [['home', home], ['playbook', pb]]) {
  const t = KEEP.reduce((a, k) => a.split(k).join(''), d.text);
  check('crawler', `D: ${name} page text is in British spelling`, !US.test(t), (t.match(US) || [])[0]);
}
check('crawler', 'E: home page keeps playbook labels on the playbook',
  !/activator|T\.C\.C\.A\.R|AI-native|\bConfirmed\b|\bIndicated\b|\bHypothesis\b|evidence grade/i.test(
    ['hero', 'questions', 'principles', 'playbook', 'connect'].map((id) => sectionText(home, id)).join(' ')));
for (const q of ['Why do so many AI pilots leave the work exactly as it was?',
  'When the same work is done five different ways, which differences should stay?',
  'Why does a new org chart so often leave decisions where they were?']) {
  const qi = home.text.indexOf(q);
  const next = home.text.slice(qi + q.length, qi + q.length + 12).trim();
  check('crawler', `F: home answer follows "${q.slice(0, 36)}"`, qi >= 0 && /^(Most|Only|Because)/.test(next), next);
}

// --- playbook: the method in full
check('crawler', 'playbook: #root is server-rendered', pb.text.length > 8000, `${pb.text.length} chars`);
check('crawler', 'playbook: exactly one <h1>', (pb.root.match(/<h1[\s>]/g) || []).length === 1);
check('crawler', 'playbook: H1 names the playbook', h1Of(pb) === 'The OrgDesign Playbook', h1Of(pb));
for (const id of ['hero', 'principles', 'approach', 'differences', 'playbook', 'framework',
  'activators', 'change-levers', 'ai-native', 'diagnostic']) {
  check('crawler', `playbook: section #${id} is in the raw HTML`, pb.root.includes(`id="${id}"`));
}
for (const phrase of [
  'Every diagnosis ends in a plan.', 'Move all four domains as one system.', 'Ask why before you harmonise.',
  'Script what each leader does differently.', 'Start AI at the task.',
  'Say what you know, and how you know it.', 'Adapted from Gregory Kesler and Amy Kates',
  'Where should an organisation design start?', 'With the current state.',
  'The three also set the order of the work.',
  'Frame', 'Focus', 'Find', 'Decide', 'Design', 'Deliver', 'Confirmed', 'Indicated', 'Hypothesis',
  'Regulation, a customer contract or the physical site makes it so.',
  'A deliberate local decision, made for a reason someone can still state.',
  'History, an acquisition or habit. Nobody decided it.',
]) check('crawler', `playbook: crawler can read "${phrase.slice(0, 44)}"`, pb.text.includes(phrase));

// Phase 6: each question heading is followed directly by its answer in the raw HTML
for (const [q, a] of [
  ['Where should an organisation design start?', 'With the current state.'],
  ['How much should a leader trust a diagnostic finding?', 'As much as its evidence grade allows.'],
  ['Should you standardise how different parts of a business work?', 'Only once you know why each difference exists.'],
  ['What makes an organisation design work?', 'Structure, people, process and mindset move as one system'],
  ['What turns an organisation design into performance?', 'Five activators, adapted from Kesler and Kates:'],
  ['How do you make organisational change stick?', 'Pull three levers at once.'],
  ['How does AI change organisation design?', 'It moves the unit of design from the org chart to the task.'],
]) {
  const qi = pb.text.indexOf(q);
  const ai = pb.text.indexOf(a, qi);
  check('crawler', `playbook: answer follows "${q.slice(0, 40)}"`, qi >= 0 && ai >= 0 && ai - (qi + q.length) <= 2, `gap ${ai - (qi + q.length)}`);
}
check('crawler', 'playbook: sorter ships in its unanswered state', pb.text.includes('Answer the first question') && !pb.root.includes('aria-pressed="true"'));
for (const [name, d] of [['home', home], ['playbook', pb]]) {
  check('crawler', `${name}: no visitor state baked into HTML`, !/cohort_results|diagnostic_responses/.test(d.root));
}

// head + structured data
for (const [name, d, url] of [['home', home, `${CANONICAL}/`], ['playbook', pb, `${CANONICAL}/playbook`]]) {
  const meta = (re) => (d.raw.match(re) || [])[1];
  check('crawler', `${name}: title is not the scaffold`, !/temp-project/i.test(d.raw));
  check('crawler', `${name}: canonical is ${url}`, meta(/rel="canonical" href="([^"]+)"/) === url);
  check('crawler', `${name}: og:url is ${url}`, meta(/property="og:url" content="([^"]+)"/) === url);
  check('crawler', `${name}: og:site_name is the person`, meta(/property="og:site_name" content="([^"]+)"/) === 'Eric Yim');
  check('crawler', `${name}: no preview host anywhere in shipped HTML`, !d.raw.includes('vercel.app'));
  check('crawler', `${name}: no bare-apex or http origin`, !/(?<!www\.)ericyim\.sg/.test(d.raw) && !d.raw.includes('http://www.ericyim.sg'));
  check('crawler', `${name}: JSON-LD parses`, Array.isArray(d.graph), d.graph ? `${d.graph.length} nodes` : 'parse failed');
  const ids = JSON.stringify(d.graph || []).match(/"@id":\s*"[^"]+"/g) || [];
  check('crawler', `${name}: every JSON-LD @id is on the canonical host`, ids.every((s) => s.includes(`${CANONICAL}/`)));
  const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
  check('crawler', `${name}: every dateModified is ISO 8601 with offset`, (d.graph || []).filter((n) => n.dateModified).every((n) => ISO.test(n.dateModified)));
}
const graph = home.graph || [];
const pgraph = pb.graph || [];
const node = (t) => graph.find((n) => n['@type'] === t) || {};
const pnode = (t) => pgraph.find((n) => n['@type'] === t) || {};
for (const t of ['Person', 'ProfilePage', 'WebSite', 'ImageObject', 'FAQPage']) {
  check('crawler', `home JSON-LD has ${t}`, graph.some((n) => n['@type'] === t));
}
for (const t of ['WebPage', 'Article', 'DefinedTermSet', 'ImageObject']) {
  check('crawler', `playbook JSON-LD has ${t}`, pgraph.some((n) => n['@type'] === t));
}
check('crawler', 'home JSON-LD no longer claims the Article or DefinedTermSet', !graph.some((n) => ['Article', 'DefinedTermSet'].includes(n['@type'])));
check('crawler', 'playbook Person is the home page Person, by @id', pnode('Person')['@id'] === node('Person')['@id']);
const LI = 'https://www.linkedin.com/in/eric-yim-743910';
for (const [name, d, n] of [['home', home, node('Person')], ['playbook', pb, pnode('Person')]]) {
  check('crawler', `${name}: Person carries the LinkedIn identifier and sameAs (tells namesakes apart)`,
    (n.sameAs || []).includes(LI) && (n.identifier || []).some((i) => i.value === 'eric-yim-743910' && i.url === LI)
    && /Singapore-based organisation design and talent leader/.test(n.disambiguatingDescription || ''));
  check('crawler', `${name}: head links the LinkedIn profile with rel="me"`, d.raw.includes(`<link rel="me" href="${LI}" />`));
}
check('crawler', 'WebSite.name is the person', node('WebSite').name === 'Eric Yim');
check('crawler', 'FAQPage has 11 answers', (node('FAQPage').mainEntity || []).length === 11);
check('crawler', 'DefinedTermSet has 3 terms, at /playbook#differences', (pnode('DefinedTermSet').hasDefinedTerm || []).length === 3
  && pnode('DefinedTermSet').url === `${CANONICAL}/playbook#differences`);
const portraitId = (node('Person').image || {})['@id'];
const portrait = graph.find((n) => n['@id'] === portraitId) || {};
check('crawler', 'Person.image resolves to the portrait, and the file ships', portrait['@type'] === 'ImageObject'
  && existsSync(join(DIST, (portrait.url || '').replace(`${CANONICAL}/`, ''))), portrait.url);
check('crawler', 'Person.sameAs lists identity profiles only (no press articles)',
  (node('Person').sameAs || []).every((u) => /linkedin\.com\/in\//.test(u)), JSON.stringify(node('Person').sameAs));
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
check('crawler', 'Article has datePublished (ISO + offset, not after dateModified) and an image',
  ISO.test(pnode('Article').datePublished || '') && Date.parse(pnode('Article').datePublished) <= Date.parse(pnode('Article').dateModified)
  && pgraph.some((n) => n['@id'] === (pnode('Article').image || {})['@id'] && n['@type'] === 'ImageObject'));
check('crawler', 'DefinedTermSet names Eric Yim as author', (pnode('DefinedTermSet').author || {})['@id'] === `${CANONICAL}/#person`);
// crawler files
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8');
check('crawler', 'llms.txt opens by saying which Eric Yim it describes', llms.indexOf('## Which Eric Yim') > 0 && llms.indexOf('## Which Eric Yim') < llms.indexOf('## What this site covers'));
check('crawler', 'sitemap <lastmod> is date-only', /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap));
const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
check('crawler', 'sitemap lists exactly the two pages', locs.join(' ') === `${CANONICAL}/ ${CANONICAL}/playbook`, locs.join(' '));
check('crawler', 'robots.txt points at the canonical sitemap', robots.includes(`Sitemap: ${CANONICAL}/sitemap.xml`));
check('crawler', 'llms.txt indexes each section on the page that holds it',
  ['#principles', '#approach', '#differences', '#playbook', '#diagnostic'].every((a) => llms.includes(`${CANONICAL}/playbook${a}`))
  && ['#questions', '#about'].every((a) => llms.includes(`${CANONICAL}/${a}`))
  && !/ericyim\.sg\/#(approach|differences|framework|ai-native|diagnostic)\b/.test(llms));
const png = readFileSync(join(DIST, 'og-image.png'));
check('crawler', 'og-image.png is 1200x630 and under 1 MB', png.readUInt32BE(16) === 1200 && png.readUInt32BE(20) === 630 && png.length < 1048576, `${png.length} bytes`);

// boundary rule + no commercial offering, on what actually ships
const teaching = [
  ...['principles', 'approach', 'differences', 'playbook'].map((id) => sectionText(pb, id)),
  ...['hero', 'questions', 'principles', 'playbook', 'connect'].map((id) => sectionText(home, id)),
].join(' ');
const guards = JSON.parse(readFileSync(join(ROOT, 'scripts', 'guard-terms.json'), 'utf8'));
const decodeAll = (list) => list.map((b64) => new RegExp(Buffer.from(b64, 'base64').toString(), 'i'));
decodeAll(guards.boundary).forEach((re, i) =>
  check('crawler', `boundary: new teaching content clear of guarded term #${i + 1}`, !re.test(teaching)));
decodeAll(guards.commercial).forEach((re, i) =>
  check('crawler', `no commercial offering: both pages clear of guarded phrase #${i + 1}`, !re.test(home.text) && !re.test(pb.text)));
check('crawler', 'no commercial offering: no email capture field', !/type="email"/.test(home.raw + pb.raw));
check('crawler', 'no commercial offering: no form posts anywhere', !/<form[^>]*action=/i.test(home.raw + pb.raw));

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
check('crawler', 'Vercel serves playbook.html at /playbook (cleanUrls, no trailing slash)', vercel.cleanUrls === true && vercel.trailingSlash === false);

// ======================================================= layer 2: visitor ===
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml' };
// Serves dist the way Vercel does with cleanUrls: /playbook → playbook.html
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  let p = join(DIST, path);
  if (path === '/') p = join(DIST, 'index.html');
  else if (/^\/playbook\/?$/.test(path)) p = join(DIST, 'playbook.html');
  else if (!existsSync(p)) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
  res.end(await readFile(p));
});
await new Promise((ok) => server.listen(0, ok));
const BASE = `http://127.0.0.1:${server.address().port}`;
const exe = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium'].filter(Boolean).find((p) => existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

try {
  // --- console, hydration, fonts, third parties: both pages
  for (const path of ['/', '/playbook']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [], hydration = [], thirdParty = [];
    page.on('console', (m) => {
      if (m.type() === 'error' && !/font|woff|Failed to load resource|net::ERR/i.test(m.text())) errors.push(m.text());
      if (/hydrat|did not match|Minified React error #4(18|23|25)/i.test(m.text())) hydration.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('request', (r) => { if (!r.url().startsWith(BASE) && !r.url().startsWith('data:')) thirdParty.push(r.url()); });
    await page.goto(BASE + path, { waitUntil: 'load' });
    await page.waitForSelector('footer');
    await page.waitForTimeout(600);
    check('visitor', `${path}: zero console/page errors on load`, errors.length === 0, errors.join(' | '));
    check('visitor', `${path}: zero hydration warnings`, hydration.length === 0, hydration.join(' | '));
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      const f = (sel) => getComputedStyle(document.querySelector(sel)).fontFamily;
      return { wordmark: f('header a span.font-display'), h1: f('h1'), signature: f('footer .font-display') };
    });
    for (const [k, v] of Object.entries(fonts)) check('visitor', `${path}: ${k} renders in Playfair Display`, /Playfair/.test(v), v);
    const loadedFaces = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').length);
    check('visitor', `${path}: brand fonts load from the site itself`, loadedFaces >= 4, `${loadedFaces} faces loaded`);
    check('visitor', `${path}: no third-party requests on load`, thirdParty.length === 0, thirdParty.slice(0, 3).join(', '));
    // every heading on a dark band is readable (white), every other heading ink
    const unreadable = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].filter((h) => {
      const c = getComputedStyle(h).color;
      let el = h, bg = 'rgba(0, 0, 0, 0)';
      while (el && /rgba\(0, 0, 0, 0\)|transparent/.test(bg)) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
      return c === bg;
    }).map((h) => h.textContent));
    check('visitor', `${path}: no heading is drawn in its own background colour`, unreadable.length === 0, unreadable.join(' | '));
    await page.close();
  }

  // --- photos: the lazy About portrait decodes once scrolled to; no shift on load
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.locator('#about img').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const portraitOk = await page.evaluate(() => { const i = document.querySelector('#about img'); return i.complete && i.naturalWidth === 640; });
  check('visitor', 'About portrait decodes at full resolution', portraitOk);
  const imgShift = await page.evaluate(() => performance.getEntriesByType('layout-shift')
    .filter((e) => (e.sources || []).some((s) => s.node && s.node.nodeName === 'IMG')).length);
  check('visitor', 'images cause no layout shift', imgShift === 0, `${imgShift} shifts`);

  // --- the FAQ folds open like a visitor expects, and its answer is real text
  const faq = page.locator('#about details').first();
  await faq.locator('summary').click();
  check('visitor', 'About: a common question opens to show its answer', await faq.locator('p').isVisible());

  // --- every link resolves on the page it points to (in-page and cross-page)
  const HASH_VIEWS = ['#', '#diagnostic', '#survey', '#results', '#cohort'];
  const anchorsOn = {};
  for (const path of ['/', '/playbook']) {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + path, { waitUntil: 'load' });
    anchorsOn[path] = await p.evaluate(() => [...document.querySelectorAll('[id]')].map((e) => e.id));
    const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"], a[href^="/"]')].map((a) => a.getAttribute('href')))]);
    anchorsOn[`${path} hrefs`] = hrefs;
    await p.close();
  }
  for (const path of ['/', '/playbook']) {
    const hrefs = anchorsOn[`${path} hrefs`].filter((h) => !/\.(txt|xml|png|webp|jpg|svg)$/.test(h));
    const dead = hrefs.filter((h) => {
      const [target, hash = ''] = h.startsWith('#') ? [path, h.slice(1)] : h.split('#');
      if (!['/', '/playbook'].includes(target)) return true;
      if (!hash || HASH_VIEWS.includes(`#${hash}`)) return false;
      return !anchorsOn[target].includes(hash);
    });
    check('visitor', `${path}: all ${hrefs.length} links resolve on the page they point to`, dead.length === 0, dead.join(', '));
  }

  // The page uses smooth scrolling, so wait for the scroll to settle rather
  // than a fixed delay, and start every click from the top of the page.
  const settle = (pg) => pg.evaluate(() => new Promise((done) => {
    let last = -1, still = 0;
    const tick = () => {
      if (Math.abs(scrollY - last) < 1) { if (++still >= 6) return done(); } else still = 0;
      last = scrollY; requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
  for (const [path, scope, href, id] of [
    ['/', 'header nav', '/#questions', 'questions'], ['/', 'header nav', '/#about', 'about'],
    ['/', '#hero nav', '#principles', 'principles'], ['/', '#hero nav', '#connect', 'connect'],
    ['/playbook', '#hero nav', '#differences', 'differences'], ['/playbook', '#playbook nav', '#ai-native', 'ai-native'],
  ]) {
    await page.goto(BASE + path, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    const link = page.locator(`${scope} a[href="${href}"]`);
    const exists = (await link.count()) === 1;
    if (exists) { await link.click(); await settle(page); }
    const top = await page.evaluate((i) => Math.round(document.getElementById(i)?.getBoundingClientRect().top ?? -999), id);
    check('visitor', `${path} ${scope} → ${href} lands clear of the 64px header`, exists && top >= 63 && top <= 90,
      exists ? `top=${top}px` : 'link not found');
  }
  // cross-page: home → playbook section
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#questions a[href="/playbook#differences"]').click();
  await page.waitForURL('**/playbook#differences');
  await page.waitForTimeout(3300);
  check('visitor', 'home question → /playbook#differences lands at the section',
    Math.abs(await page.evaluate(() => Math.round(document.getElementById('differences').getBoundingClientRect().top)) - 72) <= 2);

  // --- deep links land under the header once fonts settle; links shared
  //     before the split (/#differences) forward to the playbook
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    for (const [url, id] of [['/playbook#differences', 'differences'], ['/#about', 'about'], ['/#differences', 'differences']]) {
      const p = await browser.newPage({ viewport: { width: w, height: h } });
      await p.goto(`${BASE}${url}`, { waitUntil: 'networkidle' });
      await p.waitForTimeout(3300);
      const where = await p.evaluate((i) => ({ path: location.pathname, top: Math.round(document.getElementById(i)?.getBoundingClientRect().top ?? -999) }), id);
      const wantPath = id === 'about' ? '/' : '/playbook';
      check('visitor', `${w}px deep link ${url} lands at #${id} on ${wantPath}`, where.path === wantPath && Math.abs(where.top - 72) <= 2, `${where.path} top=${where.top}px`);
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
  await page.goto(BASE + '/playbook', { waitUntil: 'load' });
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
  check('visitor', 'sorter: inherited → "Harmonise."', await sorter.getByText('Harmonise.').isVisible());
  const stored = await page.evaluate(() => localStorage.length + sessionStorage.length);
  check('visitor', 'sorter stores nothing in the browser', stored === 0, `${stored} keys`);

  // --- the diagnostic journey: from the home page's link, through to cohort
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.locator('#hero a', { hasText: 'Take the five-minute diagnostic' }).click();
  await page.waitForURL('**/playbook#diagnostic');
  await page.waitForTimeout(600);
  check('visitor', 'home diagnostic link opens the survey on the playbook page', (await page.locator('.likert-option').count()) === 5);
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

  // --- layout at four widths, both pages
  for (const [w, h] of [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
    for (const path of ['/', '/playbook']) {
      const p = await browser.newPage({ viewport: { width: w, height: h } });
      await p.goto(BASE + path, { waitUntil: 'load' });
      await p.waitForTimeout(500);
      const byline = path === '/' ? '[data-testid="hero-byline"]' : '[data-testid="playbook-byline"]';
      const m = await p.evaluate((sel) => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        wordmark: getComputedStyle([...document.querySelectorAll('header a span')].find((s) => s.textContent === 'Eric Yim')).display !== 'none',
        nameInFirstScreen: (() => { const r = document.querySelector(sel).getBoundingClientRect(); return r.top < innerHeight; })(),
        faceInFirstScreen: (() => { const i = document.querySelector(`${sel} img`); const r = i.getBoundingClientRect(); return i.complete && i.naturalWidth > 0 && r.bottom < innerHeight; })(),
      }), byline);
      check('visitor', `${w}px ${path}: no horizontal page overflow`, m.overflow <= 0, `${m.overflow}px`);
      check('visitor', `${w}px ${path}: "Eric Yim" wordmark visible in header`, m.wordmark);
      check('visitor', `${w}px ${path}: name is on the first screen`, m.nameInFirstScreen);
      check('visitor', `${w}px ${path}: face (avatar) loaded and on the first screen`, m.faceInFirstScreen);
      await p.close();
    }
  }

  // ===================================================== layer 3: alignment ===
  // Source data, structured data, llms.txt and the rendered pages must tell
  // the same story. Each check reads one surface against another.
  const pages = { '/': home, '/playbook': pb };
  const live = {};
  for (const path of Object.keys(pages)) {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
    live[path] = await p.evaluate((graphJson) => {
      const norm = (t) => t.replace(/\s+/g, ' ').trim();
      const graph = JSON.parse(graphJson);
      const speak = graph.flatMap((n) => (n.speakable ? n.speakable.cssSelector : []));
      return {
        text: norm(document.getElementById('root').textContent),
        ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
        speakable: speak.map((sel) => [sel, document.querySelectorAll(sel).length]),
      };
    }, JSON.stringify(pages[path].graph));
    await p.close();
  }
  const norm = (t) => t.replace(/\s+/g, ' ').trim();
  for (const path of Object.keys(pages)) {
    // decode() puts a space at every tag edge; compare with all whitespace removed
    const server = pages[path].text.replace(/\s+/g, '');
    const client = live[path].text.replace(/\s+/g, '');
    check('alignment', `${path}: prerendered HTML says exactly what the browser renders`, server === client,
      server === client ? '' : `server ${server.length} chars, client ${client.length} chars`);
    const dead = live[path].speakable.filter(([, n]) => n === 0).map(([sel]) => sel);
    check('alignment', `${path}: every speakable selector matches live content`, live[path].speakable.length > 0 && dead.length === 0, dead.join(', '));
  }
  // FAQPage answers must be visible content on the page that carries them
  const faqLd = node('FAQPage').mainEntity || [];
  const missingFaq = faqLd.filter((q) => !live['/'].text.includes(q.name) || !live['/'].text.includes(norm(q.acceptedAnswer.text)));
  check('alignment', `home: all ${faqLd.length} FAQPage questions and answers are on the page`, faqLd.length > 0 && missingFaq.length === 0, missingFaq.map((q) => q.name).join(' | '));
  const terms = pnode('DefinedTermSet').hasDefinedTerm || [];
  check('alignment', 'playbook: every DefinedTerm name and definition is on the page',
    terms.length === 3 && terms.every((t) => live['/playbook'].text.includes(t.name) && live['/playbook'].text.includes(t.description.split('. ')[0])));
  check('alignment', 'playbook: the Article headline is on the page', live['/playbook'].text.includes(pnode('Article').headline), pnode('Article').headline);
  check('alignment', 'home: Person.knowsAbout featured topics are on the page',
    ['Organisation Design', 'AI Transformation', 'Human-AI Work Partnership'].every((t) => live['/'].text.includes(t)));
  // every @id reference resolves to a node defined on one of the two pages
  const defined = new Set([...graph, ...pgraph].flatMap(function walk(n) {
    if (!n || typeof n !== 'object') return [];
    const own = n['@id'] && Object.keys(n).length > 1 ? [n['@id']] : [];
    return [...own, ...Object.values(n).flatMap((v) => (Array.isArray(v) ? v.flatMap(walk) : walk(v)))];
  }));
  const refs = JSON.stringify([graph, pgraph]).match(/\{"@id":"[^"]+"\}/g) || [];
  const dangling = [...new Set(refs.map((r) => JSON.parse(r)['@id']))].filter((id) => !defined.has(id));
  check('alignment', `every JSON-LD @id reference resolves (${refs.length} references)`, dangling.length === 0, dangling.join(', '));
  // every JSON-LD image and page URL on the site is served
  const siteUrls = [...new Set((JSON.stringify([graph, pgraph]).match(/https:\/\/www\.ericyim\.sg\/[^"#]*/g) || []))];
  const unserved = [];
  for (const u of siteUrls) {
    const r = await fetch(BASE + u.replace(CANONICAL, ''));
    if (r.status !== 200) unserved.push(`${u} → ${r.status}`);
  }
  check('alignment', `every site URL in the structured data is served (${siteUrls.length} URLs)`, unserved.length === 0, unserved.join(', '));
  // every llms.txt and sitemap link lands on a real page and, if it has one, a real anchor
  const siteLinks = [...new Set([...(llms.match(/https:\/\/www\.ericyim\.sg\/[^\s)>\]]*/g) || []), ...locs])];
  const broken = siteLinks.filter((u) => {
    const [path, hash] = u.replace(CANONICAL, '').split('#');
    const page = path === '' || path === '/' ? '/' : path;
    if (page.endsWith('.xml') || page.endsWith('.txt')) return false;
    if (!live[page]) return true;
    return hash ? !live[page].ids.includes(hash) && !['diagnostic'].includes(hash) : false;
  });
  check('alignment', `every llms.txt and sitemap link lands on a real page and section (${siteLinks.length} links)`, broken.length === 0, broken.join(', '));
  // canonical of each sitemap URL is itself, and the page answers 200
  for (const u of locs) {
    const r = await fetch(BASE + (u.replace(CANONICAL, '') || '/'));
    const body = await r.text();
    const canon = (body.match(/rel="canonical" href="([^"]+)"/) || [])[1];
    check('alignment', `sitemap ${u} serves 200 and declares itself canonical`, r.status === 200 && canon === u, `${r.status} ${canon}`);
  }
  // robots.txt lets the answer engines in and points at the sitemap
  for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot']) {
    check('alignment', `robots.txt allows ${bot}`, new RegExp(`User-agent: ${bot}\\s+Allow: /`).test(robots));
  }
} finally {
  await browser.close();
  server.close();
}

// ================================================================ report ===
const failed = results.filter((r) => !r.pass);
for (const layer of ['crawler', 'visitor', 'alignment']) {
  const rs = results.filter((r) => r.layer === layer);
  console.log(`\n${layer.toUpperCase()} — ${rs.filter((r) => r.pass).length}/${rs.length} passed`);
  rs.forEach((r) => console.log(`  ${r.pass ? '✓' : '✗'} ${r.name}${r.detail && !r.pass ? `  [${r.detail}]` : ''}`));
}
console.log(`\n${failed.length === 0 ? 'ALL' : `${results.length - failed.length} OF`} ${results.length} CHECKS PASSED`);
process.exit(failed.length ? 1 : 0);

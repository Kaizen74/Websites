/**
 * Build-time prerender.
 *
 * WHY THIS EXISTS
 * The site is a client-rendered SPA: the built index.html ships an empty
 * <div id="root"> and the content only exists after JavaScript runs. No major
 * AI crawler executes JavaScript, so without this step the site is invisible
 * to every AI search surface even though it renders fine for humans.
 *
 * WHY A HEADLESS BROWSER
 * The router-based pre-render options need a router; this repo has none
 * (navigation is hash-based view switching). A headless browser is the only
 * approach that applies. Playwright + Chromium are already used by this
 * repo's verification workflow, so no new toolchain is introduced.
 *
 * WHAT IT DOES
 * Serves dist/, loads the home route in a CLEAN browser context, waits for the
 * content to settle, and writes the rendered HTML back over dist/index.html.
 *
 * FAILURE POLICY: loud, never silent. A skipped prerender would ship an empty
 * #root while the build still reported success — the exact failure this step
 * exists to prevent. Any problem exits non-zero and fails the build.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const PORT = 4180;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function fail(message, err) {
  console.error(`\n[prerender] FAILED: ${message}`);
  if (err) console.error(err);
  console.error('[prerender] The build is intentionally failed rather than');
  console.error('[prerender] shipping an empty #root that looks like success.\n');
  process.exit(1);
}

if (!existsSync(join(DIST, 'index.html'))) {
  fail('dist/index.html not found — run vite build first.');
}

// --- static server over dist/ -------------------------------------------
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = join(DIST, urlPath === '/' ? 'index.html' : urlPath);
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }
    if (!existsSync(filePath)) {
      // SPA fallback
      filePath = join(DIST, 'index.html');
    }
    const body = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

await new Promise((ok, no) => {
  server.on('error', no);
  server.listen(PORT, ok);
}).catch((err) => fail(`could not start the static server on :${PORT}`, err));

// --- locate a Chromium ---------------------------------------------------
/**
 * Playwright pins an exact browser revision. If that revision is not the one
 * installed, launching fails even though a perfectly usable Chromium exists on
 * disk. Rather than make the operator diagnose that, look for one.
 */
function findInstalledChromium() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    join(process.env.HOME || '', '.cache', 'ms-playwright'),
  ].filter(Boolean);

  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root)) {
      if (!/^chromium/.test(dir)) continue;
      for (const rel of [
        ['chrome-linux', 'chrome'],
        ['chrome-linux', 'headless_shell'],
        ['chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'],
        ['chrome-win', 'chrome.exe'],
      ]) {
        const candidate = join(root, dir, ...rel);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return null;
}

// --- render -------------------------------------------------------------
let browser;
const explicit = process.env.PLAYWRIGHT_CHROMIUM;
try {
  browser = await chromium.launch(
    explicit ? { executablePath: explicit } : {}
  );
} catch (firstErr) {
  const found = explicit ? null : findInstalledChromium();
  if (found) {
    try {
      browser = await chromium.launch({ executablePath: found });
      console.log(`[prerender] using discovered Chromium: ${found}`);
    } catch (secondErr) {
      server.close();
      fail(`found a Chromium at ${found} but could not launch it.`, secondErr);
    }
  } else {
    server.close();
    fail(
      'could not launch Chromium. The build requires a headless browser.\n' +
        '           Fix with:  npx playwright install chromium\n' +
        '           Or point at an existing binary:  PLAYWRIGHT_CHROMIUM=/path/to/chrome npm run build',
      firstErr
    );
  }
}

try {
  // A CLEAN context: no storage seeded, so no visitor state can be baked into
  // the shipped HTML. This is what a first-time visitor and a crawler see.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));

  const response = await page.goto(`http://127.0.0.1:${PORT}/`, {
    waitUntil: 'load',
  });
  if (!response || !response.ok()) {
    throw new Error(`home route returned ${response ? response.status() : 'no response'}`);
  }

  // Wait for the last section to exist — proves the tree actually rendered
  await page.waitForSelector('#about', { timeout: 20000 });
  await page.waitForFunction(
    () => (document.querySelector('#root')?.textContent || '').length > 2000,
    { timeout: 20000 }
  );

  if (pageErrors.length) {
    throw new Error(`page errors during render:\n  - ${pageErrors.join('\n  - ')}`);
  }

  // Sanity: storage must be untouched, or we are about to bake state into HTML
  const dirty = await page.evaluate(() => ({
    local: Object.keys(localStorage).length,
    session: Object.keys(sessionStorage).length,
  }));
  if (dirty.local > 0 || dirty.session > 0) {
    throw new Error(
      `browser storage is not empty (local=${dirty.local}, session=${dirty.session}). ` +
        'Refusing to capture, since visitor state would be shipped in the HTML.'
    );
  }

  const html = await page.evaluate(
    () => '<!doctype html>\n' + document.documentElement.outerHTML
  );

  // Guard the output before writing it
  const rootContent = html.match(/<div id="root">([\s\S]*)<\/div>/);
  if (!rootContent || rootContent[1].trim().length < 2000) {
    throw new Error('captured HTML has an empty or near-empty #root');
  }
  if (!/<script type="module"/.test(html)) {
    throw new Error('captured HTML lost its module script — the app would never boot');
  }

  await writeFile(join(DIST, 'index.html'), html, 'utf8');

  const paragraphs = (html.match(/<p[\s>]/g) || []).length;
  const kb = Math.round(Buffer.byteLength(html) / 1024);
  console.log(
    `[prerender] wrote dist/index.html — ${kb} KB, ${paragraphs} <p> elements, #root populated`
  );
} catch (err) {
  fail(err.message, err.stack);
} finally {
  if (browser) await browser.close();
  server.close();
}

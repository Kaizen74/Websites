/**
 * Build-time prerender.
 *
 * WHY THIS EXISTS
 * The site is a client-rendered SPA: the built index.html ships an empty
 * <div id="root"> and the content only exists after JavaScript runs. No major
 * AI crawler executes JavaScript, so without this step the site is invisible
 * to every AI search surface even though it renders fine for humans.
 *
 * WHY NOT A HEADLESS BROWSER
 * This step originally drove Playwright + Chromium. That works locally, where
 * a Chromium happens to be installed, and fails on every clean build host —
 * including Vercel, where the deploy died with "Executable doesn't exist at
 * /vercel/.cache/ms-playwright/...". Downloading a browser during deploy would
 * add ~130 MB and a set of shared-library requirements to every build, for a
 * page whose content is fully determined by the source.
 *
 * react-dom/server renders the same tree in plain Node: no browser, no
 * download, no network, deterministic output. It is also strictly safer —
 * Node has no localStorage at all, so visitor state cannot be captured even by
 * accident, which the browser version had to actively check for.
 *
 * WHAT IT DOES
 * Imports the SSR bundle built from src/entry-server.tsx, renders the app to
 * a string, and injects it into the empty #root of dist/index.html.
 *
 * FAILURE POLICY: loud, never silent. A skipped prerender would ship an empty
 * #root while the build still reported success — the exact failure this step
 * exists to prevent. Any problem exits non-zero and fails the build.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(process.cwd());
const DIST = join(ROOT, 'dist');
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js');
const INDEX = join(DIST, 'index.html');

function fail(message, err) {
  console.error(`\n[prerender] FAILED: ${message}`);
  if (err) console.error(err);
  console.error('[prerender] The build is intentionally failed rather than');
  console.error('[prerender] shipping an empty #root that looks like success.\n');
  process.exit(1);
}

if (!existsSync(INDEX)) {
  fail('dist/index.html not found — run vite build first.');
}
if (!existsSync(SSR_ENTRY)) {
  fail(
    'dist-ssr/entry-server.js not found — the SSR bundle was not built.\n' +
      '           `npm run build` builds it; running this script alone does not.'
  );
}

// --- render --------------------------------------------------------------
let markup;
try {
  const { render } = await import(pathToFileURL(SSR_ENTRY).href);
  if (typeof render !== 'function') {
    throw new Error('the SSR bundle does not export a render() function');
  }
  markup = render();
} catch (err) {
  fail('could not server-render the app.', err);
}

if (typeof markup !== 'string' || markup.trim().length < 2000) {
  fail(
    `render() produced an empty or near-empty #root ` +
      `(${typeof markup === 'string' ? markup.trim().length : typeof markup} chars)`
  );
}

// --- inject --------------------------------------------------------------
let html = await readFile(INDEX, 'utf8');

// Match the empty root div vite emits. Anything else means the template
// changed shape and the injection target can no longer be trusted.
const ROOT_DIV = /<div id="root">\s*<\/div>/;
if (!ROOT_DIV.test(html)) {
  fail(
    'could not find an empty <div id="root"></div> in dist/index.html.\n' +
      '           Either index.html changed shape, or this build was already prerendered.'
  );
}

html = html.replace(ROOT_DIV, `<div id="root">${markup}</div>`);

// --- guard the output before writing it ----------------------------------
if (!/<script type="module"/.test(html)) {
  fail('output lost its module script — the app would never boot');
}
const rootContent = html.match(/<div id="root">([\s\S]*)<\/div>/);
if (!rootContent || rootContent[1].trim().length < 2000) {
  fail('output has an empty or near-empty #root');
}

await writeFile(INDEX, html, 'utf8');

const paragraphs = (html.match(/<p[\s>]/g) || []).length;
const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log(
  `[prerender] wrote dist/index.html — ${kb} KB, ${paragraphs} <p> elements, #root populated`
);

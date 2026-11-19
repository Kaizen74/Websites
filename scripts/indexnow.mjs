/**
 * Tell IndexNow-participating search engines (Bing, Yandex, Seznam, Naver…)
 * that the site's URLs changed, so they re-crawl promptly. Bing's index feeds
 * ChatGPT search and Copilot, so this shortens the lag before AI answers
 * reflect an update.
 *
 *     node scripts/indexnow.mjs --dry-run       # print the payload, send nothing
 *     node scripts/indexnow.mjs --verify-live   # check the live key file, then ping
 *
 * Runs automatically from .github/workflows/indexnow.yml after each successful
 * Production deployment. Needs Node 18+ (built-in fetch); no dependencies.
 *
 * Inputs come from the repo, never from arguments, so nothing off-site can be
 * pinged: the key from public/indexnow-key.txt, the URLs from
 * public/sitemap.xml, and every URL must be on the canonical host.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve('.');
const HOST = 'www.ericyim.sg';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const args = new Set(process.argv.slice(2));

function fail(message) {
  console.error(`[indexnow] FAILED: ${message}`);
  process.exit(1);
}

// --- key: one hex key, published at /<key>.txt with the key as its content
const key = readFileSync(join(ROOT, 'public', 'indexnow-key.txt'), 'utf8').trim();
if (!/^[a-f0-9]{8,128}$/i.test(key)) fail(`public/indexnow-key.txt is not a valid key (8–128 hex chars).`);
const keyFile = join(ROOT, 'public', `${key}.txt`);
if (!existsSync(keyFile)) fail(`public/${key}.txt is missing — the engines verify ownership through it.`);
if (readFileSync(keyFile, 'utf8').trim() !== key) fail(`public/${key}.txt does not contain the key.`);
const keyLocation = `${ORIGIN}/${key}.txt`;

// --- URLs: whatever the sitemap lists, and nothing off the canonical host
const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) fail('public/sitemap.xml lists no URLs.');
const offHost = urlList.filter((u) => !u.startsWith(`${ORIGIN}/`));
if (offHost.length) fail(`sitemap URLs off the canonical host: ${offHost.join(', ')}`);

const payload = { host: HOST, key, keyLocation, urlList };

if (args.has('--dry-run')) {
  console.log(`[indexnow] dry run — would POST to ${ENDPOINT}:`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

// --- optional: confirm the deployment is actually serving the key file.
// Pinging before it is live makes the engine reject the key (403).
if (args.has('--verify-live')) {
  let live = '';
  try {
    const r = await fetch(keyLocation, { redirect: 'follow' });
    live = r.ok ? (await r.text()).trim() : `HTTP ${r.status}`;
  } catch (e) {
    fail(`could not fetch ${keyLocation}: ${e.message}`);
  }
  if (live !== key) fail(`${keyLocation} returned "${live.slice(0, 60)}", not the key. Not pinging.`);
  console.log(`[indexnow] live key file verified at ${keyLocation}`);
}

// --- ping
let res;
try {
  res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
} catch (e) {
  fail(`could not reach ${ENDPOINT}: ${e.message}`);
}

// IndexNow: 200 OK and 202 Accepted are success; the rest name a cause
const MEANING = {
  400: 'bad request — malformed payload',
  403: 'key not valid — the key file is not reachable or does not match',
  422: 'URLs do not belong to the host, or the key does not match the scheme',
  429: 'too many requests — the engine is rate-limiting this host',
};
if (res.status === 200 || res.status === 202) {
  console.log(`[indexnow] ${res.status} — ${urlList.length} URL(s) submitted: ${urlList.join(', ')}`);
} else {
  fail(`${ENDPOINT} returned ${res.status}${MEANING[res.status] ? ` (${MEANING[res.status]})` : ''}.`);
}

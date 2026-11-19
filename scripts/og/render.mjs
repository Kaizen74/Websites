/**
 * Renders public/og-image.png from scripts/og/card.html.
 *
 * NOT part of `npm run build` — it needs a local Chromium, which build hosts
 * (Vercel) do not have. Run it by hand when the card's wording changes:
 *
 *     npm run og:render
 *
 * The card mirrors the design tokens in src/index.css and the hero thesis.
 * It refuses to write an image if the brand fonts failed to load: a card set
 * in fallback fonts is the defect this script exists to prevent.
 * Output is exactly 1200x630 (device scale 1), the size og:image declares.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const HTML = resolve('scripts/og/card.html');
const OUT = resolve('public/og-image.png');
const candidates = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium'].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));

const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle' });
const loaded = await page.evaluate(async () => {
  await document.fonts.ready;
  return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/"/g, '')} ${f.style} ${f.weight}`);
});
const need = ['Playfair Display normal 700', 'Playfair Display italic 700', 'DM Sans normal 600'];
const missing = need.filter((n) => !loaded.includes(n));
if (missing.length) {
  console.error(`[og] brand fonts did not load: ${missing.join(', ')}. Not writing the image.`);
  await browser.close();
  process.exit(1);
}
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`[og] wrote ${OUT}`);

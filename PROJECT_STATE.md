# PROJECT_STATE.md — OrgDesign Playbook

*The living state file for this project. If chat memory and this file disagree, this file wins.*

## What this project is

Eric Yim's personal site (www.ericyim.sg), built for awareness among senior
executives and founders. It leads with the person and his argument, and uses
the OrgDesign Playbook as the evidence: six principles, a six-stage method,
the required / chosen / inherited lens with an interactive sorter, then the
playbook (an integrated capability & change framework, five activators, a
three-lever change model with the T.C.C.A.R. lens, AI-native design) and an
18-question organizational health diagnostic with cohort mode.

**Binding constraints** (from the AI-search-visibility spec): no commercial
offering: no services, pricing, hiring call-to-action, email capture, and no
business or brand name other than Eric's own. Boundary rule: no employer data,
every example fictional and sector-neutral. No tool content: nothing technical
from Eric's own tools (names, screens, IDs, internal labels or mechanics); ideas
are written in plain language. Canonical host https://www.ericyim.sg only.
Guard patterns live base64-encoded in `scripts/guard-terms.json`; the repo is
public, so never write the guarded names in plain text in tracked files.

**Stack:** React 19 + TypeScript + Vite · Tailwind CSS v4 · Jest + React
Testing Library. No charting library (plain-div bars). Deploys as a static
`dist/` bundle (~248 KB, 76 KB gzipped).

## Current state (2026-11-19)

- **Page structure (Nov 2026 repositioning):** Header wordmark "Eric Yim"
  (visible at every width) → Hero (name eyebrow, thesis H1 "Leaders don't
  need another report. They need a system.", aTalent headline as linked proof,
  index card 01–05) → **01 Principles** (`#principles`, `src/data/principles.ts`)
  → **02 How I work** (`#approach`: six-stage HTML infographic + evidence
  grades, `src/data/approach.ts`) → **03 Required, chosen or inherited?**
  (`#differences`: definitions, two-question sorter with component state only,
  paper-vs-practice example that restacks into cards below md) → **04 The
  playbook** (`#playbook` intro + "In this playbook" index) → 4.1 Framework →
  4.2 Activators → 4.3 Change model → 4.4 AI-native → **05** diagnostic CTA →
  About (first-person note above the third-person entity text) → footer
  (LinkedIn `rel="me"`). Hero index numbers must match section eyebrows;
  `app-smoke.test.tsx` enforces numbering and order.
- **Headshot:** `public/images/` — `eric-yim-avatar.webp` (hero byline,
  56px, alt="" beside the visible name), `eric-yim-portrait.webp` (About,
  4:5, lazy), `eric-yim.jpg` (Person.image / ProfilePage primary image,
  1000×1333). Metadata stripped. All `<img>` carry width/height (no CLS).
- **Fonts are self-hosted** (`public/fonts`, OFL licences alongside): 10 Latin
  faces declared in `src/index.css`; the 4 first-screen faces are preloaded in
  `index.html`. Never reintroduce Google Fonts — the page makes zero
  third-party requests, and `verify-site` checks it.
- **Deep links** (`/#section`): App's mount effect re-aligns to 72px after font
  batches, `load` and short checkpoints for 3s, yielding immediately to real
  user input (wheel/touch/key/pointer). `verify-site` checks both.
- **Voice:** new copy follows the operator's voice (plain, imperative, no
  "X, not Y" slogans, no em dashes). `aeo-approach.test.tsx` has a voice guard.
  Spelling is US for consistency with the existing site and LinkedIn title.
- **Typography:** `.font-display` is defined explicitly in `src/index.css`
  (Tailwind never generated it because `--font-display` lives in `:root`, not
  `@theme`). Display numbers use lining figures. Fonts load from `index.html`
  with preconnect — never via `@import` in CSS (that chain delayed first paint).
- **Share card:** `public/og-image.png` is rendered from
  `scripts/og/card.html` by `npm run og:render` (local Chromium; refuses to
  write if brand fonts fail to load). 1200×630, tested.
- **Verification:** `npm run verify:site` (after a build) runs 115 crawler
  and visitor checks against `dist/`, including boundary and employment-gate
  scans. Needs a local Chromium, so it is not part of the Vercel build.

- **Visual system:** editorial consulting design — warm paper background
  (`#FAF7F3`), hairline borders, Playfair Display headings, DM Sans body,
  single red accent (`#C41E3A`). Tokens live in `src/index.css`.
- **Framework diagram:** four quarter-disc quadrants around a white
  Leadership circle, "Culture values" ink pill, hairline outer ring.
  Quadrant labels are centered in the readable band of each pie slice.
  The homepage panel defaults to an overarching narrative (FrameworkOverview:
  four domains, a leadership core, a culture-values ring); clicking a quadrant — or a domain row
  in the overview — swaps in that quadrant's detail with a "← Framework
  overview" back link. The homepage framework is a score-free educational
  view; score badges appear only on the results dashboard's own diagram.
- **Diagnostic:** 18 questions across 5 dimensions (structure 3, people 4,
  process 5, mindset 4, leadership 2), Likert 1–5, auto-advances ~280 ms
  after an answer, persists to localStorage, resumable.
- **Results:** giant score + status pill + readiness interpretation
  (bands: ≥80 build on strength · 65–79 conditionally ready · 50–64
  readiness sprint · <50 foundations first), plain-div dimension bars with
  legend, "Where to focus first" intervention plan (targeted intervention +
  timeframe for the two lowest dimensions, leadership-sequences-first rule
  that also fires whenever leadership < 50, deep links to the matching
  playbook modules), recommended activators, three next steps, "Save as
  PDF" print one-pager.
- **Cohort mode:** up to 20 respondents. Each result can be saved under a
  name ("Save to cohort" on results), the survey resets for the next
  person, and the cohort dashboard (#cohort) compares everyone: cohort
  average + overall range, per-dimension averages with min–max, a
  respondent × dimension heatmap table, a widest-divergence insight,
  cohort-level focus interventions, remove/clear members, JSON export and
  print. Stored in localStorage under `cohort_results`.
- **AI-native design (`#ai-native`, section 4.4):** static teaching content
  between the change model and the diagnostic CTA. Left column: the
  Organisation → Position → **Task** → Process descent (indented cards, Task
  emphasised) plus "gate the machine's judgement". Right column: the L0–L3
  ladder (hairline grid, L3 row tinted), the capability-vs-desire zone card,
  and the three-tier provenance strip. No state, no interactivity, no new
  tokens; all copy in `src/data/aiNative.ts`.
- **Discoverability (GEO/AEO):** the entity is defined once in
  `src/data/profile.ts` (Eric Yim · Organization Design Strategist ·
  human-AI work partnership) and surfaces three ways: static JSON-LD in
  `index.html` (Person / ProfilePage / WebSite / FAQPage, with `sameAs` +
  `subjectOf` citing the NTU and aTalent features), crawler files in
  `public/` (`robots.txt` allowing GPTBot/ClaudeBot/PerplexityBot/
  Google-Extended et al., `sitemap.xml`, `llms.txt`), and the visible
  **About the author** section (`#about`) carrying the same strings.
  `src/__tests__/seo-alignment.test.ts` fails if schema and data drift.
  Biography facts are sourced from the two published features (NTU, aTalent)
  and from the LinkedIn export, and include `alumniOf` (NTU 1998; University
  of North Texas 2022), the Certified Prompt Engineer™ credential, `worksFor`
  (SATS Ltd.), two awards (SHRI Singapore HR Awards 2025 Gold — Talent Management &
  Acquisition at SATS; Brandon Hall Silver 2018 at Shell), 25 years' tenure
  and three quotes. The graph also
  carries an `Article` authored by the Person (AI-native section), a
  `speakable` spec for voice answers, `dateModified` freshness, and an
  `ImageObject` backing a generated 1200×630 `og-image.png`. `public/` also
  ships an IndexNow key pair; a `<noscript>` block in `index.html` repeats the
  entity for non-JS crawlers.
  **Canonical host is set** (Phase 1): `https://www.ericyim.sg` in `SITE_URL`,
  `index.html`, `public/robots.txt` and `public/sitemap.xml`, enforced by
  `host-canonical.test.ts`. **Still to do on launch:** uncomment the two
  verification `<meta>` tags in `index.html` with real Google Search Console /
  Bing tokens and submit the sitemap in each console.
  **Off-site (cannot be done from this repo):** create a Wikidata item and add
  its QID to `sameAs`. LinkedIn is already in `sameAs`; resolve the
  `bit.ly/2RQceu7` personal link before adding it.
- **Prerendering (Phase 3):** `npm run build` builds the client, then an SSR
  bundle (`vite build --ssr src/entry-server.tsx --outDir dist-ssr`), then runs
  `scripts/prerender.mjs`. The script imports that bundle, renders the app to a
  string with `react-dom/server`, and injects it into the empty `#root` of
  `dist/index.html` — so crawlers that do not execute JavaScript get the full
  page (67 KB, 96 paragraphs) instead of an empty `#root`. **No browser is
  involved.** The earlier headless-Chromium version broke the Vercel deploy
  (clean build hosts have no Chromium) — see DECISIONS.md. It fails the build
  loudly rather than skipping: missing SSR bundle, empty render, missing
  injection target or a lost module script each exit non-zero. The app boots
  with `createRoot`, NOT `hydrateRoot`, deliberately. Storage reads must stay
  out of `useState` initialisers; `prerender-safety.test.ts` enforces this and
  that `entry-server.tsx` renders the same tree `main.tsx` mounts.
  `dist-ssr/` is a build artefact and is gitignored.
- **Footer:** specialism line + "Follow on LinkedIn" (`rel="me"`), then a personal brand sign-off — an
  "EY" monogram seal (Signature.tsx) with "Eric Yim" in Playfair italic, a
  red underline flourish, and a © attribution line.
- **About section is deliberately curated:** it renders the entity claim,
  current role, a one-line experience proof, a compact qualifications line,
  6 featured topics, the three profile/coverage links, one signature quote and
  the full Q&A. The career history, long bio, award, remaining quotes and the
  other 6 topics are intentionally NOT rendered — they stay in the JSON-LD and
  `public/llms.txt`, which is what crawlers read. `seo-alignment.test.ts` has a
  "curating costs no machine-facing signal" block enforcing this.
- **Entity consistency:** `src/__tests__/linkedin-consistency.test.ts` pins the
  LinkedIn profile as ground truth — name, headline, current role/employer
  (Global Head of OD and Talent, SATS Ltd.), location, both degrees, the
  Certified Prompt Engineer™ credential and both awards. It also
  forbids superseded strings and any published email address. Update it and
  `profile.ts` together whenever LinkedIn changes.
- **Canonical host consolidation (Phase 5):** `vercel.json` at the repo root
  308-redirects the `orgdesign.vercel.app` production alias onto
  `https://www.ericyim.sg`, path preserved. Two rules by design — an exact `/`
  rule first (so the root keeps its trailing slash) then the `/:path*`
  catch-all. Per-commit preview deployments are deliberately NOT caught, so
  previewing a deploy before promoting it still works. The apex
  `ericyim.sg` → `www` redirect stays in the Vercel dashboard and is not
  restated here. The config carries redirects only: it must never take
  ownership of `buildCommand`/`outputDirectory`, or the dashboard and the repo
  would disagree. All of this is pinned by `host-canonical.test.ts`.
  **Not yet verified against the live host** — the gate needs the deploy.
- **Schema freshness:** `CONTENT_LAST_MODIFIED_ISO` in `src/data/profile.ts`
  (`2026-08-27T00:00:00+08:00`) is the single source of truth. JSON-LD
  `dateModified` on both ProfilePage and Article uses it in full ISO 8601 with
  the `+08:00` offset — Search Console rejects a bare date there as an invalid
  datetime. `CONTENT_LAST_MODIFIED` is **derived** from it (`.slice(0, 10)`)
  and feeds the sitemap's `<lastmod>` and `COPYRIGHT_YEAR`; sitemap `<lastmod>`
  stays date-only by design and a test fails if the datetime form leaks there.
  Bump the ISO constant only — the date follows automatically.
- **Tests:** 253 passing across 18 suites (unit, integration, App smoke,
  SEO/structured-data alignment, LinkedIn consistency, the new sections and
  their AEO surfaces), plus `npm run verify:site` (137 end-to-end checks).
  **Build:** clean. **Lint:** 12 pre-existing errors (9 `no-explicit-any` in
  older tests, 3 `set-state-in-effect`), identical to main — do not add more.
- **Known issue (pre-existing):** `scripts/check-size.js` fails on
  `node_modules` (254MB vs 200MB limit). Not deployment-affecting — Vercel
  ships only `dist` (~320KB). See DECISIONS.md.

## How to resume

```bash
npm install        # once
./run_checks.sh    # tests + typecheck + build — all must pass before changes
npm run dev        # local dev server
```

Branch: `claude/build-orgdesign-playbook-gQv4T`. Commit + push after every
working increment.

## Done (chronology)

1. Phases 1–5: initial build — framework, activators, change levers,
   diagnostic, results dashboard, tests.
2. SATS-branded concentric-ring diagram iterations (superseded — see
   DECISIONS.md).
3. Diagnostic questions replaced with the calibrated 18-question set.
4. CADENCE lever: goal-setting alignment added; quadrant labels
   Habits / Cadence.
5. Full editorial redesign per `orgdesign-visual-design` skill: tokens,
   Header/Hero index card, quarter-disc diagram + side panel, activator
   accordion, three-column change model, T.C.C.A.R. tabs, auto-advancing
   survey, recharts-free results, ink CTA band, light footer.
6. Governance files added (this file, DECISIONS.md, GUIDE.md,
   run_checks.sh).

## Next (open)

- **Merge to main.** Vercel deploys `main`; nothing in this branch is live
  until it is merged.
- **Resolved 2026-11-19:** Kates & Kesler credited on 4.2 (test now requires
  it); required/chosen/inherited confirmed as his coinage (DefinedTermSet
  author + creator = Person; test requires it); headshot added; copy edited
  for voice. CLS fixed by self-hosting fonts (0.064 → 0.002).
- **Open:** British vs American spelling across the whole site (operator's
  own writing is British; site is US).
- **After deploy:** refresh the LinkedIn preview via Post Inspector; add the
  Search Console / Bing verification tokens and submit the sitemap.
- **Phase 6** (`SEO_PHASE6_PROPOSAL.md`): complete. Row 1 rejected; rows 2–8
  shipped as question headings, each followed directly by an answer of 40
  words or fewer.
- **IndexNow** pings after each successful Production deploy
  (`.github/workflows/indexnow.yml` → `scripts/indexnow.mjs --verify-live`).
  First real run is unverified: check the Actions tab after the next deploy.
  If the run never triggers, Vercel's environment name may differ from
  `Production`; it can always be run by hand (workflow_dispatch).
- **Operator to do:** Search Console + Bing verification tokens (still
  placeholders); add www.ericyim.sg to LinkedIn contact info and Featured.

- Optional: shareable results link (URL-encoded scores) for client
  conversations.
- Optional: multi-respondent mode — aggregate several people's diagnostics
  into one team view.

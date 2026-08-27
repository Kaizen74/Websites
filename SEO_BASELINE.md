# SEO_BASELINE.md — Phase 0 inventory and boundary audit

**Spec:** `SPEC_DELTA_ai-search-visibility_20260827_v2.md`
**Date:** 2026-08-27 · **Commit at time of audit:** `5cb5f81` · **Working tree:** clean
**Scope of this phase:** read-only inventory. No source file was modified.

> **Note on this document:** the boundary audit below necessarily quotes the
> strings it is flagging. This file is a repo document — it is not served, not
> in `dist/`, and not site content or metadata. Every string it names is
> already present in the repo and in the live site; naming them here adds no
> new exposure and is the only way to make the audit actionable.

---

## ⚠️ Read this before Phase 1

Two things in the spec do not match the repo as it stands. Both need your
decision, and one of them is material.

### A. The spec's starting premise is out of date

§0 says every AI crawler "currently sees this site as a blank page titled
*temp-project*". That was true when the spec was drafted; it is no longer
true. Work in recent sessions already shipped much of Phases 1, 2 and 4:

| Spec phase | Spec assumes | Actual state |
|---|---|---|
| 1 — Document head | `<title>temp-project</title>`, no meta | Real title, description, canonical, OG, Twitter card, favicon — **done** |
| 2 — Crawler directives | Files absent | `robots.txt`, `sitemap.xml`, `llms.txt` all exist — **done** |
| 4 — JSON-LD + OG image | Absent | `Person`/`ProfilePage`/`WebSite`/`FAQPage`/`Article`/`ImageObject` graph + 1200×630 `og-image.png` — **done** |
| 3 — Prerendering | Not done | **Not done.** `#root` is empty in built HTML. This remains the real gap |
| 5 — Host consolidation | Not done | **Not done.** No `vercel.json` exists |

**But** all of that was built against the placeholder host
`https://www.ericyim.example` — 28 occurrences. `ericyim.sg` appears **zero**
times. So Phase 1 is not "already done"; it is *done against the wrong host*
and needs a host swap, not a rewrite. (Good news: zero occurrences of
`orgdesign.vercel.app` anywhere, so acceptance criterion 4 has no legacy debt.)

### B. The boundary rule conflicts with content you directed me to add

This is the item that needs a real decision, not a code change.

Spec constraint 2 and §4.3 forbid employer names, employer-linked job titles,
`worksFor`, and `addressLocality` anywhere in content, metadata or structured
data. §4.3 further specifies `jobTitle` should be the generic
*"Organisational Development Practitioner"*.

The site currently contains all of those — because over the last several
sessions you supplied a LinkedIn export and an award screenshot and asked me
to reconcile the site against them. That work was done at your explicit
direction and is verified and accurate. It is now, under this spec, a
**50-hit boundary violation**.

I have not changed any of it. §6 Phase 0 says *"Do not fix them yet — report."*
Item 4 below is the full list. **Phase 1 should not start until you tell me
which way this resolves**, because the two directions produce opposite work:

1. **Spec wins** → strip employer names, drop `worksFor`/`addressLocality`,
   generalise `jobTitle`, rewrite two FAQ answers, rewrite `llms.txt`
   career/recognition sections, and retire the LinkedIn-consistency test that
   currently *enforces* the employer facts. Roughly a session of work, and it
   deliberately weakens the entity corroboration built over recent sessions.
2. **Recent work wins** → amend the spec's constraint 2 to permit
   publicly-verifiable employment already on your own public LinkedIn, and
   keep the current entity graph.

I am not able to pick for you: option 1 discards work you asked for, option 2
overrides a constraint you have just restated as non-negotiable. My read is
that the spec was drafted without sight of the recent sessions, but that is a
guess about intent, and this is exactly the kind of guess the spec's own rule 6
tells me not to make.

---

## 1. Toolchain

| Item | Version | Note |
|---|---|---|
| Build tool | **Vite 7.3.0** (`^7.2.4` declared) | Not Create React App — the §3 stop condition does **not** apply |
| React | **19.2.3** (`^19.2.0`) | |
| React DOM | 19.2.3 | |
| Router | **none** | No `react-router`, `wouter`, `remix` or `next` in the dependency tree. Navigation is hash-based view switching in `src/App.tsx` |
| Tailwind CSS | **4.1.18** | **Spec §9 assumed v3.** v4 is CSS-first (`@import "tailwindcss"` in `src/index.css`); there is a `tailwind.config.js` but the tokens live in CSS. No action needed for SEO, but the assumption is wrong and worth correcting in the spec |
| TypeScript | 5.9.3 | |
| Test runner | Jest 30.2.0 + React Testing Library | 145 tests, 14 suites, currently green |

**Consequence for §3:** the option table's first two rows are unavailable.
React Router v7 pre-rendering needs React Router; `vite-react-ssg` needs React
Router v6. With no router, only the third row applies. See item 7.

## 2. Routes / anchor sections

Single page. There are **no server routes** — one HTML document, six anchor
sections, and three JS-only views swapped by hash.

**Anchor sections** (all inside `<main>` on the home view):

| # | `id` | Heading | Level |
|---|---|---|---|
| — | `hero` | Navigate organizational transformation with confidence | H1 |
| 01 | `framework` | Integrated Organizational Capability and Change Framework | H2 |
| 02 | `activators` | What turns a design into performance | H2 |
| 03 | `change-levers` | The three C's of change | H2 |
| 04 | `ai-native` | AI redesigns the work, not the chart | H2 |
| — | `about` | Eric Yim | H2 |

Exactly **one H1** on the page; heading hierarchy is clean.

**JS-only views** (replace the whole page; not crawlable, not intended to be):
`#diagnostic` (survey), `#results`, `#cohort`. Per §5 these stay client-side.

**Sitemap consequence:** one URL. The current `public/sitemap.xml` already has
exactly one entry — correct per §6 Phase 2 ("do not pad it with anchor
fragments"), but it points at the placeholder host.

## 3. Per-section content, and whether it is in the served HTML

**Nothing below is in the served HTML.** Built `dist/index.html` is 16,545
bytes and contains `<div id="root"></div>` — empty. The only body prose is a
`<noscript>` fallback (3 `<p>` tags). Every heading and paragraph in this table
exists **only after JavaScript executes**.

| Section | H1/H2 | First paragraph (truncated) | In served HTML? |
|---|---|---|---|
| `hero` | Navigate organizational transformation with confidence | "Assess organizational health, understand the frameworks that connect design to performance…" | **No** |
| `framework` | Integrated Organizational Capability and Change Framework | "A holistic view of organizational design across four interconnected dimensions around a leadership core…" | **No** |
| `activators` | What turns a design into performance | "These five activators bridge organization design and results — the right connections, the right conversations…" | **No** |
| `change-levers` | The three C's of change | "An operating system for driving organizational change — moving from awareness to embedding new behaviors…" | **No** |
| `ai-native` | AI redesigns the work, not the chart | "Structure follows work — and work is now shared with machines. Three moves make an AI-era design defensible…" | **No** |
| `about` | Eric Yim | "Global Head of OD and Talent, SATS Ltd. · Singapore" | **No** |

What *is* in the served HTML today: `<title>`, meta description, canonical,
OG/Twitter tags, the full JSON-LD graph, and the `<noscript>` entity fallback.
So a non-JS crawler currently gets the *entity* but none of the *content* —
which is precisely the gap Phase 3 closes.

## 4. Boundary audit

Grep terms: employer names (`SATS`, `Shell`, `Cargill`, `L'Oréal`, `Mizuho`,
`Civil Service College`), named individuals, internal organisational figures,
legacy `--color-sats-*` tokens.

### 4a. Employer names — served surface (50 hits)

**`index.html`** (7) — lines 73, 80, 96, 97, 250, 258, 292–293
`worksFor.name`, `disambiguatingDescription`, both `award` entries, two FAQ
answer bodies, and the `<noscript>` fallback.

**`public/llms.txt`** (20) — lines 13, 22–23, 35, 37, 39, 59–60, 65–71,
120–123, 127–130. Entity block, biography, Recognition section, the full
seven-row Career list, and two Answer bodies.

**`src/data/profile.ts`** (14) — lines 69 (`worksFor`), 85
(`experienceSummary`), 88 (`bio`), 116–117 (`awards`), 156–186 (`career`
array), 288 and 293 (two FAQ answers).

**`src/components/AboutAuthor.tsx`** — renders `profile.worksFor` and
`profile.featuredRole` (no literal employer string in the file; the value
arrives from `profile.ts`).

### 4b. Employer names — repo, not served
`src/__tests__/linkedin-consistency.test.ts` (6 hits). This file *asserts* the
employer facts as ground truth — if direction 1 is chosen, this test must be
retired, not merely edited.

### 4c. Schema fields the spec says to omit
| Field | Spec §4.3 | Current |
|---|---|---|
| `worksFor` | "**omitted**, not guessed" | Present — `Organization`, `SATS Ltd.` (`index.html:71–74`) |
| `address` / `addressLocality` | "**omitted**" | Present — `homeLocation.address.addressLocality: Singapore` (`index.html:75–78`) |
| `jobTitle` | Generic: "Organisational Development Practitioner" | Array of three, two of which are employer-linked: `Global Head of OD and Talent`, `Global OD, OE and Talent Leader` (`index.html:66–70`) |

### 4d. Internal organisational data
**None found.** The headcount and country-count figures visible in the LinkedIn
export ("60,000 employees across 27 countries") were never copied into the
site. Clean.

### 4e. Legacy `--color-sats-*` tokens
**None. Already purged.** No `--color-sats-*`, `soft-salmon`,
`canvas-light-grey`, or `accent-coral` remains in `src/`, `index.html`, or
`public/`. This item of the audit is closed.

### 4f. Other named individuals
Two hits, both **third-party intellectual attribution**, not personnel:
- `src/components/ChangeLevers.tsx:117` — "Patrick Lencioni's five dysfunctions model"
- `src/data/interventions.ts:39` — same, in a code comment

I read these as outside the intent of constraint 2 (which targets employer
data and colleagues). Crediting a published author is normal scholarly
practice and removing it would be worse. **Flagging, not recommending removal**
— your call.

### 4g. Commit history
- **2 commit subjects** contain an employer name: `0370fdc`
  ("…from 'SATS People Values' to 'Culture Values'") and `c4a9c92`
  ("Update framework colors to SATS branding…").
- **13 commit-body lines** across recent commits reference employers.

Both subjects are already-pushed public history. Rewriting them means a
force-push over shared history. My recommendation is to **accept the existing
history and apply the rule going forward** — the cost and risk of rewriting
outweigh the benefit, and the strings are already public. Your call.

### 4h. Commercial surface (constraint 1 / spec (a))
**Clean.** No pricing, service list, contact form, email capture, newsletter,
"book a call", or commercial CTA anywhere in `src/`, `index.html`, or
`public/`. The only CTAs are "Start diagnostic" and "Save as PDF" — both
in-product tool actions, not commercial. No change needed; noting it so the
gate is evidenced rather than assumed.

## 5. Components touching `localStorage` / `window` / `document`

Split by whether the call happens **during render** (breaks a prerender build)
or inside an effect/handler (safe).

### Render-time — will crash or mismatch under prerender (must be guarded)

| File:line | Call | Why it breaks |
|---|---|---|
| `src/App.tsx:30` | `useState<CohortMember[]>(() => loadCohort())` | Lazy initialiser runs during render; `loadCohort()` reads `localStorage`. **ReferenceError in Node.** |
| `src/components/FrameworkSection.tsx:31` | `useState<Quadrant \| null>(consumeFocusQuadrant)` | Same pattern; reads *and writes* `sessionStorage` during render |
| `src/App.tsx:305` | `© {new Date().getFullYear()}` | Build-time year baked into HTML; hydration mismatch across a New Year boundary |
| `src/components/ResultsDashboard.tsx:145` | `new Date(...).toLocaleDateString()` | Locale/timezone-dependent output differs between Node and browser. Results view is not prerendered, so **low risk** — listed for completeness |

Both `loadCohort()` and `consumeFocusQuadrant()` already wrap their access in
`try/catch`, so they may degrade gracefully rather than crash — but the
`useState` initialiser still executes server-side and will at minimum produce
an empty-vs-populated hydration mismatch. Treat both as must-fix.

### Effect/handler-time — safe as-is
`src/App.tsx` (35, 53, 66–67, 74–79, 87, 92–94, 101, 106, 122, 128–130, 137,
145, 153, 244) · `src/hooks/useDiagnostic.ts` (all `localStorage` access is
inside `useEffect`/`useCallback`) · `src/components/ExportButton.tsx` ·
`src/components/CohortDashboard.tsx` · `src/components/DiagnosticSurvey.tsx:64`
(`window.setTimeout` inside the answer handler — this is the ~280 ms
auto-advance named in §5's regression list) · `src/components/ResultsDashboard.tsx:20,119`.

## 6. `vercel.json`

**Does not exist.** Phase 5 will create it. Nothing to preserve or merge.

## 7. Recommended prerendering option

**Recommendation: headless-browser prerender at build time** — §3's third
option. It is not a preference; it is the only one of the three that applies.

Rows 1 and 2 of the §3 table both require React Router, and this repo has no
router at all (item 1). Navigation is `window.location.hash` plus conditional
rendering in `App.tsx`, so there is no route manifest for a router-based
pre-renderer to enumerate.

Within that option I recommend driving the existing **Playwright + Chromium**
already proven in this repo's verification workflow, rather than adding
Puppeteer. Playwright is present, Chromium is pre-installed at
`/opt/pw-browsers/`, and the same harness already screenshots and asserts
against the built bundle — so the marginal cost is a build script, not a new
toolchain. Concretely: `vite build`, serve `dist/`, load `/`, wait for
`#about` to exist, capture `document.documentElement.outerHTML`, write it back
over `dist/index.html`. Single page, single capture.

**Most likely way it breaks:** the two render-time storage reads in item 5.
Chromium *has* `localStorage`, so the prerender itself will succeed and
silently capture the **empty-state** HTML — no cohort, framework panel showing
the default overview. That is the correct output. The failure surfaces one
step later, at hydration: a returning visitor with a saved cohort renders a
different tree than the captured HTML, and React logs a hydration mismatch and
discards the server markup. It will look like "it works, but the console has
warnings" — which is exactly the kind of failure that gets shipped. Guard both
`useState` initialisers behind a mounted check *before* wiring the prerender,
not after.

Second-most-likely: capturing HTML that includes state the crawler should not
see. The capture must run against a clean browser context with no storage
seeded, or a stray localStorage entry from a previous test run gets baked into
the shipped HTML.

---

## Phase 0 gate

- [x] `SEO_BASELINE.md` exists and answers all seven questions
- [x] Boundary audit included (item 4), reported not fixed
- [x] Prerendering option recommended with reason and failure mode (item 7)
- [x] **No source file modified** — `git status` shows only this new file
- [ ] **Operator approval — blocked on decision B above before Phase 1**

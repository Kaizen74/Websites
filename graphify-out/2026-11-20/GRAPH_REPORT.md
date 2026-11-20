# Graph Report - Websites  (2026-11-20)

## Corpus Check
- 94 files · ~62,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .woff2 10, (none) 1, .xml 1)

## Summary
- 604 nodes · 1215 edges · 40 communities (25 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c086fe3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ping
- index.ts
- profile.ts
- constants.ts
- compilerOptions
- approach.ts
- scripts
- compilerOptions
- App.tsx
- AiNativeSection.tsx
- indexnow.mjs
- GUIDE.md — What the OrgDesign Playbook does and how to run it
- prerender.mjs
- eslint.config.js
- PROJECT_STATE.md — OrgDesign Playbook
- render.mjs
- verify-site.mjs
- Phase 6 — Answer-shaped content proposal
- App.tsx
- devDependencies
- React + TypeScript + Vite
- package.json
- decode
- @vitejs/plugin-react
- tsconfig.json
- CLAUDE.md
- .claude/CLAUDE.md
- @testing-library/jest-dom
- DECISIONS.md
- jest@^30.2.0
- jest-environment-jsdom@^30.2.0
- postcss@^8.5.6
- @testing-library/user-event@^14.6.1
- ts-jest@^29.4.6
- run_checks.sh
- SEO_BASELINE.md — Phase 0 inventory and boundary audit
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `App()` - 32 edges
2. `SECTION_IDS` - 22 edges
3. `compilerOptions` - 20 edges
4. `compilerOptions` - 18 edges
5. `react` - 16 edges
6. `scripts` - 15 edges
7. `LikertValue` - 14 edges
8. `DiagnosticResults` - 13 edges
9. `ResultsDashboard()` - 13 edges
10. `getScoreColor()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `consumeFocusQuadrant()`  [INFERRED]
  SEO_BASELINE.md → src/components/FrameworkSection.tsx
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `loadCohort()`  [INFERRED]
  SEO_BASELINE.md → src/utils/cohort.ts
- `Current state (2026-11-20)` --references--> `pageFromPath()`  [INFERRED]
  PROJECT_STATE.md → src/constants.ts
- `App()` --calls--> `AboutAuthor()`  [EXTRACTED]
  src/App.tsx → src/components/AboutAuthor.tsx
- `App()` --calls--> `ActivatorsSection()`  [EXTRACTED]
  src/App.tsx → src/components/ActivatorsSection.tsx

## Import Cycles
- None detected.

## Communities (40 total, 15 thin omitted)

### Community 0 - "ping"
Cohesion: 0.12
Nodes (16): jobs, ping, name, on, deployment_status, workflow_dispatch, permissions, contents (+8 more)

### Community 1 - "index.ts"
Cohesion: 0.15
Nodes (19): FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains, FrameworkOverview(), FrameworkOverviewProps, consumeFocusQuadrant() (+11 more)

### Community 2 - "profile.ts"
Cohesion: 0.05
Nodes (47): nodeModulesSize, AboutAuthor(), MICRO_LABEL, MonogramSeal(), Signature(), SiteFooter(), career, CareerEntry (+39 more)

### Community 3 - "constants.ts"
Cohesion: 0.06
Nodes (82): CohortDashboard(), CohortDashboardProps, DIMENSIONS, ScoreCell(), statusColor, statusTint, DiagnosticSurvey(), DiagnosticSurveyProps (+74 more)

### Community 4 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "approach.ts"
Cohesion: 0.08
Nodes (41): Approach(), MICRO_LABEL, Differences(), KindChip(), MICRO_LABEL, YesNo(), YesNoProps, PageAnswer (+33 more)

### Community 6 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build:nossg, dev, lint, og:render, prerender, preview (+7 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "App.tsx"
Cohesion: 0.27
Nodes (8): ActivatorCard(), ActivatorCardProps, SignalColumn(), SignalColumnProps, ActivatorsSection(), ActivatorsSectionProps, activators, Activator

### Community 9 - "AiNativeSection.tsx"
Cohesion: 0.23
Nodes (12): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, MoveHeading(), OVERLINE_STYLE, aiLevels, descentSteps, scoringZones (+4 more)

### Community 10 - "indexnow.mjs"
Cohesion: 0.18
Nodes (9): args, key, keyFile, MEANING, offHost, payload, ROOT, sitemap (+1 more)

### Community 11 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.18
Nodes (10): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), Earlier changes (2026-08-13), GUIDE.md — What ericyim.sg does and how to run it, How to change the LinkedIn preview image, How to check nothing is broken, How to run it on your computer (+2 more)

### Community 12 - "prerender.mjs"
Cohesion: 0.29
Nodes (4): DIST, PAGES, ROOT, SSR_ENTRY

### Community 13 - "eslint.config.js"
Cohesion: 0.15
Nodes (12): eslint@^9.39.1, @eslint/js@^9.39.1, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.4.24, globals@^16.5.0, typescript-eslint@^8.46.4, eslint, @eslint/js (+4 more)

### Community 14 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.25
Nodes (7): Current state (2026-11-20), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is, pageFromPath()

### Community 15 - "render.mjs"
Cohesion: 0.20
Nodes (6): candidates, executablePath, HTML, missing, need, OUT

### Community 16 - "verify-site.mjs"
Cohesion: 0.08
Nodes (18): DIST, exe, failed, guards, home, llms, locs, MIME (+10 more)

### Community 17 - "Phase 6 — Answer-shaped content proposal"
Cohesion: 0.22
Nodes (8): Decision log, Deliberately unchanged, How to approve, Phase 6 — Answer-shaped content proposal, Points to weigh on specific rows, The proposal, What approval touches, Why do this

### Community 18 - "App.tsx"
Cohesion: 0.07
Nodes (49): dependencies, lucide-react@^0.562.0, react@^19.2.0, react-dom@^19.2.0, lucide-react, react, react-dom, App() (+41 more)

### Community 19 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, autoprefixer@^10.4.23, playwright@^1.62.1, tailwindcss@^4.1.18, @testing-library/react@^16.3.1, @types/jest@^30.0.0, @types/node@^24.10.1, @types/react@^19.2.5 (+7 more)

### Community 20 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 21 - "package.json"
Cohesion: 0.13
Nodes (14): identity-obj-proxy@^3.0.0, @tailwindcss/postcss@^4.1.18, @types/react-dom@^19.2.3, typescript@~5.9.3, vite@^7.2.4, name, private, type (+6 more)

### Community 22 - "decode"
Cohesion: 0.40
Nodes (5): decode(), h1Of(), load(), sectionText(), teaching

### Community 58 - "SEO_BASELINE.md — Phase 0 inventory and boundary audit"
Cohesion: 0.08
Nodes (23): 1. Toolchain, 2. Routes / anchor sections, 3. Per-section content, and whether it is in the served HTML, 4. Boundary audit, 4a. Employer names — served surface (50 hits), 4b. Employer names — repo, not served, 4c. Schema fields the spec says to omit, 4d. Internal organisational data (+15 more)

### Community 60 - "vercel.json"
Cohesion: 0.50
Nodes (3): cleanUrls, redirects, trailingSlash

## Knowledge Gaps
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `index.ts`, `constants.ts`, `approach.ts`, `App.tsx`, `package.json`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Should `ping` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `playwright` connect `devDependencies` to `verify-site.mjs`, `package.json`, `render.mjs`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `profile.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05096153846153846 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react` connect `devDependencies` to `index.ts`, `profile.ts`, `constants.ts`, `approach.ts`, `AiNativeSection.tsx`, `App.tsx`, `package.json`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055078416728902166 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
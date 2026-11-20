# Graph Report - Websites  (2026-11-20)

## Corpus Check
- 95 files · ~65,170 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .woff2 10, (none) 1, .xml 1)

## Summary
- 617 nodes · 1243 edges · 31 communities (23 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `11f5e3a5`
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
- prerender-safety.test.ts
- indexnow.mjs
- GUIDE.md — What the OrgDesign Playbook does and how to run it
- PROJECT_STATE.md — OrgDesign Playbook
- render.mjs
- verify-site.mjs
- Phase 6 — Answer-shaped content proposal
- App.tsx
- cohort.ts
- React + TypeScript + Vite
- package.json
- decode
- tsconfig.json
- CLAUDE.md
- .claude/CLAUDE.md
- DECISIONS.md
- run_checks.sh
- SEO_BASELINE.md — Phase 0 inventory and boundary audit
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `App()` - 33 edges
2. `SECTION_IDS` - 22 edges
3. `compilerOptions` - 20 edges
4. `compilerOptions` - 18 edges
5. `react` - 16 edges
6. `scripts` - 15 edges
7. `LikertValue` - 14 edges
8. `ResultsDashboard()` - 13 edges
9. `DiagnosticResults` - 13 edges
10. `getScoreColor()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `consumeFocusQuadrant()`  [INFERRED]
  SEO_BASELINE.md → src/components/FrameworkSection.tsx
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `loadCohort()`  [INFERRED]
  SEO_BASELINE.md → src/utils/cohort.ts
- `Current state (2026-11-20)` --references--> `pageFromPath()`  [INFERRED]
  PROJECT_STATE.md → src/constants.ts
- `DimensionChartProps` --references--> `DimensionScores`  [EXTRACTED]
  src/components/DimensionChart.tsx → src/types/index.ts
- `App()` --calls--> `AboutAuthor()`  [EXTRACTED]
  src/App.tsx → src/components/AboutAuthor.tsx

## Import Cycles
- None detected.

## Communities (31 total, 8 thin omitted)

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
Cohesion: 0.08
Nodes (51): DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor, DimensionChart(), DimensionChartProps, fillColor, ExportButton(), ExportButtonProps (+43 more)

### Community 4 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "approach.ts"
Cohesion: 0.06
Nodes (52): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, MoveHeading(), OVERLINE_STYLE, MICRO_LABEL, Differences(), KindChip() (+44 more)

### Community 6 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build:nossg, dev, lint, og:render, prerender, preview (+7 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "App.tsx"
Cohesion: 0.18
Nodes (12): dependencies, lucide-react@^0.562.0, react@^19.2.0, lucide-react, react, ActivatorCard(), ActivatorCardProps, SignalColumn() (+4 more)

### Community 9 - "prerender-safety.test.ts"
Cohesion: 0.20
Nodes (8): app, entryServer, footer, framework, main, pkg, prerender, ROOT

### Community 10 - "indexnow.mjs"
Cohesion: 0.18
Nodes (9): args, key, keyFile, MEANING, offHost, payload, ROOT, sitemap (+1 more)

### Community 11 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.18
Nodes (10): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), Earlier changes (2026-08-13), GUIDE.md — What ericyim.sg does and how to run it, How to change the LinkedIn preview image, How to check nothing is broken, How to run it on your computer (+2 more)

### Community 14 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.25
Nodes (7): Current state (2026-11-20), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is, pageFromPath()

### Community 15 - "render.mjs"
Cohesion: 0.13
Nodes (10): candidates, executablePath, HTML, missing, need, OUT, DIST, PAGES (+2 more)

### Community 16 - "verify-site.mjs"
Cohesion: 0.08
Nodes (19): DIST, exe, failed, guards, home, KEEP, llms, locs (+11 more)

### Community 17 - "Phase 6 — Answer-shaped content proposal"
Cohesion: 0.22
Nodes (8): Decision log, Deliberately unchanged, How to approve, Phase 6 — Answer-shaped content proposal, Points to weigh on specific rows, The proposal, What approval touches, Why do this

### Community 18 - "App.tsx"
Cohesion: 0.08
Nodes (50): react-dom@^19.2.0, react-dom, App(), AppProps, AppView, ActivatorsSection(), Approach(), ChangeLevers() (+42 more)

### Community 19 - "cohort.ts"
Cohesion: 0.12
Nodes (29): @testing-library/react, CohortDashboard(), CohortDashboardProps, DIMENSIONS, ScoreCell(), statusColor, statusTint, MAX_COHORT_SIZE (+21 more)

### Community 20 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 21 - "package.json"
Cohesion: 0.05
Nodes (54): devDependencies, autoprefixer@^10.4.23, eslint@^9.39.1, @eslint/js@^9.39.1, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.4.24, globals@^16.5.0, identity-obj-proxy@^3.0.0 (+46 more)

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
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `index.ts`, `constants.ts`, `approach.ts`, `App.tsx`, `cohort.ts`, `package.json`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Should `ping` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react` connect `cohort.ts` to `index.ts`, `profile.ts`, `constants.ts`, `approach.ts`, `App.tsx`, `package.json`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Should `profile.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05268065268065268 - nodes in this community are weakly interconnected._
- **Why does `playwright` connect `package.json` to `verify-site.mjs`, `render.mjs`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07688828584350972 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
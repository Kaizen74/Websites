# Graph Report - Websites  (2026-11-19)

## Corpus Check
- 84 files · ~55,178 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .woff2 10, (none) 1, .xml 1)

## Summary
- 553 nodes · 1064 edges · 29 communities (20 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `764bacaa`
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
- package.json
- PROJECT_STATE.md — OrgDesign Playbook
- render.mjs
- verify-site.mjs
- Phase 6 — Answer-shaped content proposal
- React + TypeScript + Vite
- tsconfig.json
- CLAUDE.md
- .claude/CLAUDE.md
- DECISIONS.md
- run_checks.sh
- SEO_BASELINE.md — Phase 0 inventory and boundary audit
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `App()` - 27 edges
2. `compilerOptions` - 20 edges
3. `compilerOptions` - 18 edges
4. `SECTION_IDS` - 17 edges
5. `react` - 16 edges
6. `scripts` - 15 edges
7. `LikertValue` - 14 edges
8. `DiagnosticResults` - 13 edges
9. `ResultsDashboard()` - 13 edges
10. `getScoreColor()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `loadCohort()`  [INFERRED]
  SEO_BASELINE.md → src/utils/cohort.ts
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `consumeFocusQuadrant()`  [INFERRED]
  SEO_BASELINE.md → src/components/FrameworkSection.tsx
- `CohortDashboardProps` --references--> `CohortMember`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/types/index.ts
- `DimensionChartProps` --references--> `DimensionScores`  [EXTRACTED]
  src/components/DimensionChart.tsx → src/types/index.ts
- `ExportButtonProps` --references--> `DiagnosticResults`  [EXTRACTED]
  src/components/ExportButton.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (29 total, 9 thin omitted)

### Community 0 - "ping"
Cohesion: 0.12
Nodes (16): jobs, ping, name, on, deployment_status, workflow_dispatch, permissions, contents (+8 more)

### Community 1 - "index.ts"
Cohesion: 0.15
Nodes (19): FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains, FrameworkOverview(), FrameworkOverviewProps, consumeFocusQuadrant() (+11 more)

### Community 2 - "profile.ts"
Cohesion: 0.06
Nodes (39): nodeModulesSize, AboutAuthor(), MICRO_LABEL, career, CareerEntry, CONTENT_LAST_MODIFIED, CONTENT_LAST_MODIFIED_ISO, COPYRIGHT_YEAR (+31 more)

### Community 3 - "constants.ts"
Cohesion: 0.07
Nodes (65): CohortDashboard(), DIMENSIONS, ScoreCell(), statusColor, statusTint, DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor (+57 more)

### Community 4 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "approach.ts"
Cohesion: 0.09
Nodes (36): @testing-library/react@^16.3.1, @testing-library/react, MICRO_LABEL, Differences(), KindChip(), MICRO_LABEL, YesNo(), YesNoProps (+28 more)

### Community 6 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build:nossg, dev, lint, og:render, prerender, preview (+7 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "App.tsx"
Cohesion: 0.06
Nodes (52): dependencies, lucide-react@^0.562.0, react@^19.2.0, react-dom@^19.2.0, lucide-react, react, react-dom, App() (+44 more)

### Community 9 - "AiNativeSection.tsx"
Cohesion: 0.21
Nodes (14): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, MoveHeading(), OVERLINE_STYLE, aiLevels, descentSteps, provenanceTiers (+6 more)

### Community 10 - "indexnow.mjs"
Cohesion: 0.18
Nodes (9): args, key, keyFile, MEANING, offHost, payload, ROOT, sitemap (+1 more)

### Community 11 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.18
Nodes (10): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), Earlier changes (2026-08-13), GUIDE.md — What ericyim.sg does and how to run it, How to change the LinkedIn preview image, How to check nothing is broken, How to run it on your computer (+2 more)

### Community 12 - "prerender.mjs"
Cohesion: 0.22
Nodes (6): DIST, INDEX, kb, ROOT, rootContent, SSR_ENTRY

### Community 13 - "package.json"
Cohesion: 0.05
Nodes (53): devDependencies, autoprefixer@^10.4.23, eslint@^9.39.1, @eslint/js@^9.39.1, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.4.24, globals@^16.5.0, identity-obj-proxy@^3.0.0 (+45 more)

### Community 14 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.29
Nodes (6): Current state (2026-11-19), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is

### Community 15 - "render.mjs"
Cohesion: 0.22
Nodes (6): candidates, executablePath, HTML, missing, need, OUT

### Community 16 - "verify-site.mjs"
Cohesion: 0.08
Nodes (20): decode(), DIST, exe, failed, graph, llms, MIME, nameAt (+12 more)

### Community 17 - "Phase 6 — Answer-shaped content proposal"
Cohesion: 0.25
Nodes (7): Deliberately unchanged, How to approve, Phase 6 — Answer-shaped content proposal, Points to weigh on specific rows, The proposal, What approval touches, Why do this

### Community 20 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 58 - "SEO_BASELINE.md — Phase 0 inventory and boundary audit"
Cohesion: 0.08
Nodes (23): 1. Toolchain, 2. Routes / anchor sections, 3. Per-section content, and whether it is in the served HTML, 4. Boundary audit, 4a. Employer names — served surface (50 hits), 4b. Employer names — repo, not served, 4c. Schema fields the spec says to omit, 4d. Internal organisational data (+15 more)

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `index.ts`, `approach.ts`, `constants.ts`, `package.json`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Should `ping` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `playwright` connect `package.json` to `verify-site.mjs`, `render.mjs`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `profile.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react` connect `approach.ts` to `index.ts`, `profile.ts`, `constants.ts`, `App.tsx`, `AiNativeSection.tsx`, `package.json`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06712564543889846 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
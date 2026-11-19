# Graph Report - Websites  (2026-11-19)

## Corpus Check
- 81 files · ~49,481 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .xml 1, .css 1)

## Summary
- 517 nodes · 1028 edges · 25 communities (16 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `616675ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- index.ts
- profile.ts
- constants.ts
- compilerOptions
- approach.ts
- scripts
- compilerOptions
- App.tsx
- AiNativeSection.tsx
- GUIDE.md — What the OrgDesign Playbook does and how to run it
- package.json
- PROJECT_STATE.md — OrgDesign Playbook
- verify-site.mjs
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
8. `ResultsDashboard()` - 13 edges
9. `DiagnosticResults` - 13 edges
10. `getScoreColor()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `consumeFocusQuadrant()`  [INFERRED]
  SEO_BASELINE.md → src/components/FrameworkSection.tsx
- `Render-time — will crash or mismatch under prerender (must be guarded)` --references--> `loadCohort()`  [INFERRED]
  SEO_BASELINE.md → src/utils/cohort.ts
- `App()` --calls--> `AboutAuthor()`  [EXTRACTED]
  src/App.tsx → src/components/AboutAuthor.tsx
- `App()` --calls--> `AiNativeSection()`  [EXTRACTED]
  src/App.tsx → src/components/AiNativeSection.tsx
- `App()` --calls--> `CohortDashboard()`  [EXTRACTED]
  src/App.tsx → src/components/CohortDashboard.tsx

## Import Cycles
- None detected.

## Communities (25 total, 9 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.08
Nodes (45): CohortDashboard(), CohortDashboardProps, DIMENSIONS, ScoreCell(), statusColor, statusTint, DimensionChart(), DimensionChartProps (+37 more)

### Community 1 - "index.ts"
Cohesion: 0.15
Nodes (19): FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains, FrameworkOverview(), FrameworkOverviewProps, consumeFocusQuadrant() (+11 more)

### Community 2 - "profile.ts"
Cohesion: 0.06
Nodes (40): nodeModulesSize, AboutAuthor(), MICRO_LABEL, principleNames, career, CareerEntry, CONTENT_LAST_MODIFIED, CONTENT_LAST_MODIFIED_ISO (+32 more)

### Community 3 - "constants.ts"
Cohesion: 0.11
Nodes (34): DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor, QuestionCard(), QuestionCardProps, DIMENSION_LABELS, LIKERT_OPTIONS, QUADRANT_COLORS (+26 more)

### Community 4 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "approach.ts"
Cohesion: 0.09
Nodes (33): MICRO_LABEL, Differences(), KindChip(), MICRO_LABEL, YesNo(), YesNoProps, Principles(), allStages (+25 more)

### Community 6 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build:nossg, dev, lint, og:render, prerender, preview (+7 more)

### Community 7 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 8 - "App.tsx"
Cohesion: 0.08
Nodes (38): dependencies, lucide-react@^0.562.0, react@^19.2.0, react-dom@^19.2.0, lucide-react, react, react-dom, App() (+30 more)

### Community 9 - "AiNativeSection.tsx"
Cohesion: 0.21
Nodes (14): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, MoveHeading(), OVERLINE_STYLE, aiLevels, descentSteps, provenanceTiers (+6 more)

### Community 11 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.18
Nodes (10): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), Earlier changes (2026-08-13), GUIDE.md — What ericyim.sg does and how to run it, How to change the LinkedIn preview image, How to check nothing is broken, How to run it on your computer (+2 more)

### Community 13 - "package.json"
Cohesion: 0.05
Nodes (55): devDependencies, autoprefixer@^10.4.23, eslint@^9.39.1, @eslint/js@^9.39.1, eslint-plugin-react-hooks@^7.0.1, eslint-plugin-react-refresh@^0.4.24, globals@^16.5.0, identity-obj-proxy@^3.0.0 (+47 more)

### Community 14 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.29
Nodes (6): Current state (2026-11-19), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is

### Community 16 - "verify-site.mjs"
Cohesion: 0.05
Nodes (32): candidates, executablePath, HTML, missing, need, OUT, DIST, INDEX (+24 more)

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

- **Why does `react` connect `App.tsx` to `App.tsx`, `index.ts`, `constants.ts`, `approach.ts`, `package.json`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08176100628930817 - nodes in this community are weakly interconnected._
- **Why does `playwright` connect `package.json` to `verify-site.mjs`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Should `profile.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05909090909090909 - nodes in this community are weakly interconnected._
- **Why does `@testing-library/react` connect `package.json` to `App.tsx`, `index.ts`, `profile.ts`, `constants.ts`, `approach.ts`, `App.tsx`, `AiNativeSection.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11378353376503238 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
# Graph Report - Websites  (2026-08-27)

## Corpus Check
- 81 files · ~49,756 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 492 nodes · 807 edges · 61 communities (29 shown, 32 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6f2397c4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- index.ts
- profile.ts
- constants.ts
- compilerOptions
- What You Must Do When Invoked
- scripts
- compilerOptions
- ActivatorsSection.tsx
- AiNativeSection.tsx
- graphify reference: extra exports and benchmark
- GUIDE.md — What the OrgDesign Playbook does and how to run it
- prerender-safety.test.ts
- devDependencies
- PROJECT_STATE.md — OrgDesign Playbook
- graphify reference: query, path, explain
- prerender.mjs
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- React + TypeScript + Vite
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- check-size.js
- tsconfig.json
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- DECISIONS.md
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- eslint
- identity-obj-proxy
- jest
- jest-environment-jsdom
- playwright
- postcss
- tailwindcss
- @tailwindcss/postcss
- @testing-library/jest-dom
- @testing-library/react
- ts-jest
- @types/jest
- @types/node
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- vite
- @vitejs/plugin-react
- run_checks.sh
- SEO_BASELINE.md — Phase 0 inventory and boundary audit
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `LikertValue` - 14 edges
4. `scripts` - 13 edges
5. `SECTION_IDS` - 13 edges
6. `DiagnosticResults` - 13 edges
7. `getScoreColor()` - 13 edges
8. `Quadrant` - 12 edges
9. `What You Must Do When Invoked` - 12 edges
10. `Dimension` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ScoreCell()` --calls--> `getScoreColor()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts
- `CohortDashboardProps` --references--> `CohortMember`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/types/index.ts
- `CohortDashboard()` --calls--> `getScoreColor()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts
- `CohortDashboard()` --calls--> `getScoreLabel()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts
- `DiagnosticSurveyProps` --references--> `useDiagnostic()`  [EXTRACTED]
  src/components/DiagnosticSurvey.tsx → src/hooks/useDiagnostic.ts

## Import Cycles
- None detected.

## Communities (61 total, 32 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.08
Nodes (37): App(), AppView, CohortDashboard(), CohortDashboardProps, DIMENSIONS, ScoreCell(), statusColor, statusTint (+29 more)

### Community 1 - "index.ts"
Cohesion: 0.09
Nodes (35): ChangeLevers(), displayTitle(), phaseLabels, FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains (+27 more)

### Community 2 - "profile.ts"
Cohesion: 0.10
Nodes (29): AboutAuthor(), MICRO_LABEL, career, CareerEntry, CONTENT_LAST_MODIFIED, CredentialEntry, credentials, faqEntries (+21 more)

### Community 3 - "constants.ts"
Cohesion: 0.09
Nodes (40): DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor, DimensionChart(), DimensionChartProps, fillColor, ExportButton(), ExportButtonProps (+32 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (27): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly (+19 more)

### Community 5 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 6 - "scripts"
Cohesion: 0.08
Nodes (24): lucide-react, dependencies, lucide-react, react, react-dom, name, private, scripts (+16 more)

### Community 7 - "compilerOptions"
Cohesion: 0.09
Nodes (22): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+14 more)

### Community 8 - "ActivatorsSection.tsx"
Cohesion: 0.17
Nodes (10): ActivatorCard(), ActivatorCardProps, SignalColumnProps, ActivatorsSection(), ActivatorsSectionProps, Hero(), IndexRow, indexRows (+2 more)

### Community 9 - "AiNativeSection.tsx"
Cohesion: 0.20
Nodes (13): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, OVERLINE_STYLE, aiLevels, descentSteps, provenanceTiers, scoringZones (+5 more)

### Community 10 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 11 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.22
Nodes (8): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), GUIDE.md — What the OrgDesign Playbook does and how to run it, How to check nothing is broken, How to run it on your computer, What changed most recently (2026-08-13), What the app does

### Community 12 - "prerender-safety.test.ts"
Cohesion: 0.22
Nodes (7): app, entryServer, framework, main, pkg, prerender, ROOT

### Community 13 - "devDependencies"
Cohesion: 0.29
Nodes (7): autoprefixer, globals, devDependencies, autoprefixer, globals, @testing-library/user-event, @testing-library/user-event

### Community 14 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.29
Nodes (6): Current state (2026-07-08), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is

### Community 15 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 16 - "prerender.mjs"
Cohesion: 0.25
Nodes (6): DIST, INDEX, kb, ROOT, rootContent, SSR_ENTRY

### Community 17 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 18 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 19 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 20 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 58 - "SEO_BASELINE.md — Phase 0 inventory and boundary audit"
Cohesion: 0.08
Nodes (23): 1. Toolchain, 2. Routes / anchor sections, 3. Per-section content, and whether it is in the served HTML, 4. Boundary audit, 4a. Employer names — served surface (50 hits), 4b. Employer names — repo, not served, 4c. Schema fields the spec says to omit, 4d. Internal organisational data (+15 more)

## Knowledge Gaps
- **227 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+222 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint`, `identity-obj-proxy`, `jest`, `jest-environment-jsdom`, `playwright`, `postcss`, `tailwindcss`, `@tailwindcss/postcss`, `@testing-library/jest-dom`, `@testing-library/react`, `ts-jest`, `@types/jest`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`, `typescript-eslint`, `vite`, `@vitejs/plugin-react`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `Quadrant` connect `index.ts` to `constants.ts`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08244897959183674 - nodes in this community are weakly interconnected._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08502415458937199 - nodes in this community are weakly interconnected._
- **Should `profile.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0990990990990991 - nodes in this community are weakly interconnected._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09361393323657474 - nodes in this community are weakly interconnected._
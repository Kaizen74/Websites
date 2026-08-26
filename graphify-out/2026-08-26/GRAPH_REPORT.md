# Graph Report - Websites  (2026-08-26)

## Corpus Check
- 73 files · ~35,350 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 423 nodes · 722 edges · 36 communities (27 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70d1fbdc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- index.ts
- App.tsx
- constants.ts
- ChangeLevers.tsx
- compilerOptions
- scripts
- compilerOptions
- AiNativeSection.tsx
- check-size.js
- tsconfig.json
- run_checks.sh
- What You Must Do When Invoked
- graphify reference: extra exports and benchmark
- GUIDE.md — What the OrgDesign Playbook does and how to run it
- PROJECT_STATE.md — OrgDesign Playbook
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- React + TypeScript + Vite
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- DECISIONS.md
- ResultsDashboard.tsx
- seo-alignment.test.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `LikertValue` - 14 edges
4. `SECTION_IDS` - 13 edges
5. `DiagnosticResults` - 13 edges
6. `getScoreColor()` - 13 edges
7. `Quadrant` - 12 edges
8. `What You Must Do When Invoked` - 12 edges
9. `scripts` - 11 edges
10. `Dimension` - 10 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `mapToActivators()`  [EXTRACTED]
  src/App.tsx → src/utils/scoring.ts
- `CohortDashboardProps` --references--> `CohortMember`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/types/index.ts
- `ScoreCell()` --calls--> `getScoreColor()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts
- `CohortDashboard()` --calls--> `getScoreColor()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts
- `CohortDashboard()` --calls--> `getScoreLabel()`  [EXTRACTED]
  src/components/CohortDashboard.tsx → src/utils/scoring.ts

## Import Cycles
- None detected.

## Communities (36 total, 9 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (49): autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, identity-obj-proxy, jest (+41 more)

### Community 1 - "index.ts"
Cohesion: 0.09
Nodes (32): FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains, FrameworkOverview(), FrameworkOverviewProps, consumeFocusQuadrant() (+24 more)

### Community 2 - "App.tsx"
Cohesion: 0.09
Nodes (35): App(), AppView, CohortDashboard(), CohortDashboardProps, DIMENSIONS, statusColor, statusTint, Header() (+27 more)

### Community 3 - "constants.ts"
Cohesion: 0.18
Nodes (16): DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor, QuestionCard(), QuestionCardProps, DIMENSION_LABELS, LIKERT_OPTIONS, QUADRANT_COLORS (+8 more)

### Community 4 - "ChangeLevers.tsx"
Cohesion: 0.13
Nodes (14): ActivatorCard(), ActivatorCardProps, SignalColumnProps, ActivatorsSection(), ActivatorsSectionProps, ChangeLevers(), displayTitle(), phaseLabels (+6 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (27): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly (+19 more)

### Community 6 - "scripts"
Cohesion: 0.09
Nodes (22): lucide-react, dependencies, lucide-react, react, react-dom, name, private, scripts (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.09
Nodes (22): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+14 more)

### Community 8 - "AiNativeSection.tsx"
Cohesion: 0.20
Nodes (13): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, OVERLINE_STYLE, aiLevels, descentSteps, provenanceTiers, scoringZones (+5 more)

### Community 19 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 20 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 21 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.22
Nodes (8): Being found by Google and AI assistants, Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), GUIDE.md — What the OrgDesign Playbook does and how to run it, How to check nothing is broken, How to run it on your computer, What changed most recently (2026-08-13), What the app does

### Community 22 - "PROJECT_STATE.md — OrgDesign Playbook"
Cohesion: 0.29
Nodes (6): Current state (2026-07-08), Done (chronology), How to resume, Next (open), PROJECT_STATE.md — OrgDesign Playbook, What this project is

### Community 23 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 24 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 25 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 26 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 27 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 34 - "ResultsDashboard.tsx"
Cohesion: 0.14
Nodes (24): ScoreCell(), DimensionChart(), DimensionChartProps, fillColor, ExportButton(), ExportButtonProps, interpretation(), QUADRANT_DIMENSIONS (+16 more)

### Community 35 - "seo-alignment.test.ts"
Cohesion: 0.20
Nodes (14): AboutAuthor(), faqEntries, FaqEntry, profile, ReferenceArticle, referenceArticles, SITE_URL, getJsonLd() (+6 more)

## Knowledge Gaps
- **181 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+176 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `SECTION_IDS` connect `App.tsx` to `index.ts`, `ResultsDashboard.tsx`, `constants.ts`, `seo-alignment.test.ts`, `ChangeLevers.tsx`, `AiNativeSection.tsx`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _181 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09291521486643438 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09468599033816426 - nodes in this community are weakly interconnected._
- **Should `ChangeLevers.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12987012987012986 - nodes in this community are weakly interconnected._
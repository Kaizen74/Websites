# Graph Report - Websites  (2026-08-26)

## Corpus Check
- 69 files · ~31,875 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 403 nodes · 686 edges · 34 communities (25 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0b1500c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- FrameworkSection.tsx
- App.tsx
- constants.ts
- SECTION_IDS
- compilerOptions
- scripts
- compilerOptions
- index.ts
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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `compilerOptions` - 18 edges
3. `LikertValue` - 14 edges
4. `DiagnosticResults` - 13 edges
5. `getScoreColor()` - 13 edges
6. `SECTION_IDS` - 12 edges
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
- `DiagnosticSurveyProps` --references--> `useDiagnostic()`  [EXTRACTED]
  src/components/DiagnosticSurvey.tsx → src/hooks/useDiagnostic.ts
- `DimensionChartProps` --references--> `DimensionScores`  [EXTRACTED]
  src/components/DimensionChart.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (34 total, 9 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (49): autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, identity-obj-proxy, jest (+41 more)

### Community 1 - "FrameworkSection.tsx"
Cohesion: 0.14
Nodes (19): FrameworkDiagram(), QuadrantSpec, quadrantSpecs, scoreTextClass, domains, FrameworkOverview(), FrameworkOverviewProps, consumeFocusQuadrant() (+11 more)

### Community 2 - "App.tsx"
Cohesion: 0.08
Nodes (46): App(), AppView, CohortDashboard(), CohortDashboardProps, DIMENSIONS, ScoreCell(), statusColor, statusTint (+38 more)

### Community 3 - "constants.ts"
Cohesion: 0.14
Nodes (25): DiagnosticSurvey(), DiagnosticSurveyProps, dimensionColor, QuestionCard(), QuestionCardProps, DIMENSION_LABELS, LIKERT_OPTIONS, QUADRANT_COLORS (+17 more)

### Community 4 - "SECTION_IDS"
Cohesion: 0.12
Nodes (14): ActivatorCard(), ActivatorCardProps, SignalColumnProps, ActivatorsSection(), ActivatorsSectionProps, Header(), NavItem, navItems (+6 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (26): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly (+18 more)

### Community 6 - "scripts"
Cohesion: 0.09
Nodes (22): lucide-react, dependencies, lucide-react, react, react-dom, name, private, scripts (+14 more)

### Community 7 - "compilerOptions"
Cohesion: 0.09
Nodes (22): ES2023, node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module (+14 more)

### Community 8 - "index.ts"
Cohesion: 0.09
Nodes (30): AiNativeSection(), indentClasses, MICRO_LABEL_STYLE, OVERLINE_STYLE, ChangeLevers(), displayTitle(), phaseLabels, TCCARAssessment() (+22 more)

### Community 19 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 20 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 21 - "GUIDE.md — What the OrgDesign Playbook does and how to run it"
Cohesion: 0.25
Nodes (7): Cohort mode (comparing a team's answers), Earlier changes (2026-07-08), GUIDE.md — What the OrgDesign Playbook does and how to run it, How to check nothing is broken, How to run it on your computer, What changed most recently (2026-08-13), What the app does

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

## Knowledge Gaps
- **172 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+167 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `Quadrant` connect `FrameworkSection.tsx` to `index.ts`, `App.tsx`, `constants.ts`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _172 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `FrameworkSection.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13666666666666666 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08065458796025717 - nodes in this community are weakly interconnected._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14260249554367202 - nodes in this community are weakly interconnected._
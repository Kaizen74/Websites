# PROJECT_STATE.md — OrgDesign Playbook

*The living state file for this project. If chat memory and this file disagree, this file wins.*

## What this project is

A single-page React web playbook for organizational design consultants:
an integrated capability & change framework, the five Kates-Kesler
activators, a three-lever change model with the T.C.C.A.R. team-health
lens, and an 18-question organizational health diagnostic with scored
results and recommended interventions.

**Stack:** React 18 + TypeScript + Vite · Tailwind CSS v4 · Jest + React
Testing Library. No charting library (plain-div bars). Deploys as a static
`dist/` bundle (~248 KB, 76 KB gzipped).

## Current state (2026-07-08)

- **Visual system:** editorial consulting design — warm paper background
  (`#FAF7F3`), hairline borders, Playfair Display headings, DM Sans body,
  single red accent (`#C41E3A`). Tokens live in `src/index.css`.
- **Framework diagram:** four quarter-disc quadrants around a white
  Leadership circle, "Culture values" ink pill, hairline outer ring.
  Clicking a quadrant swaps the side detail panel (no modal). The homepage
  framework is a score-free educational view; score badges appear only on
  the results dashboard's own copy of the diagram.
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
- **Tests:** 76 passing across 10 suites (unit, integration, App smoke),
  plus a Playwright browser E2E script (26 checks) covering the full
  two-respondent cohort journey and the score-free homepage framework.
  **Build:** clean, no warnings.

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

- Optional: shareable results link (URL-encoded scores) for client
  conversations.
- Optional: multi-respondent mode — aggregate several people's diagnostics
  into one team view.

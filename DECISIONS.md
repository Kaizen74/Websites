# DECISIONS.md — OrgDesign Playbook

One line of reasoning per decision, newest first.

| Date | Decision | Why |
|---|---|---|
| 2026-07-08 | Replaced the SATS concentric-ring SVG diagram with four quarter-discs + side panel | The `orgdesign-visual-design` skill (authored after the ring iterations — it references the current "Culture values" pill) explicitly prescribes the simpler, crisper build; labels stay legible at every size |
| 2026-07-08 | Removed `recharts`; dimension chart is plain divs | Only one consumer; drops 350 KB from the bundle and kills the container-size test warnings |
| 2026-07-08 | Survey auto-advances 280 ms after an answer (guarded), except the last question | Fewer clicks per question; guard prevents double-advance when the user clicks Next first |
| 2026-07-08 | Results interpretation uses readiness bands (≥80 / 65–79 / 50–64 / <50) | Calibrated to the change-readiness-rubric skill's verdict bands; turns a score into an action posture |
| 2026-07-08 | Next-steps copy encodes "max two interventions, named business owner, re-measure" | From change-readiness intervention-map sequencing rules and Prosci sponsorship research |
| 2026-07-08 | Hero cites "3× outperformance" and "sponsorship as strongest predictor" without vendor names | Grounded in McKinsey OHI and Prosci benchmark findings; kept as plain claims to stay evergreen |
| 2026-07-08 | Folded PROJECT_STATUS.md into PROJECT_STATE.md | resilient-build skill prescribes one canonical state file; two status files drift |
| 2026-07-08 | Kept `questionNumber`/`totalQuestions` as optional no-op props on QuestionCard | Progress line moved to the survey header; props kept so existing call sites/tests don't break |
| Earlier | 18 diagnostic questions with uneven per-dimension counts (3/4/5/4/2) | User-supplied calibrated question set replaced the original 4×5 grid |
| Earlier | Scores: healthy ≥70, developing 50–69, needs attention <50 | Consistent thresholds across diagram, bars, and results |

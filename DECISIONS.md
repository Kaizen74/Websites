# DECISIONS.md — OrgDesign Playbook

One line of reasoning per decision, newest first.

| Date | Decision | Why |
|---|---|---|
| 2026-07-09 | Homepage FrameworkSection no longer accepts/shows diagnostic scores | It is an educational explainer; stale localStorage results were painting score badges onto the quadrants and side-panel title, conflating "explore the model" with "your results." Scores live only on the results dashboard's own diagram |
| 2026-07-09 | Cohort mode stores up to 20 named responses in localStorage (no backend) | Stays a static, zero-infrastructure app; a facilitator passes one device/browser around, which fits the workshop use case |
| 2026-07-09 | Replaced the no-op localStorage mock in tests with a real in-memory Storage | The jest.fn() stub silently hid every persistence bug — round-trips were never actually tested; found while testing cohort saves |
| 2026-07-09 | Leadership-first warning now also fires whenever leadership < 50 (not only bottom-two) | Browser E2E caught ties slipping past the bottom-two slice; rubric hard-override says weak leadership must always be addressed |
| 2026-07-09 | Removed Kates-Kesler naming from all visual labels (kept in docs/README only) | User request; UI copy is now framework-neutral |
| 2026-07-09 | Cohort dashboard shows a "widest divergence" insight (max min–max spread) | Disagreement between respondents is itself diagnostic — surfaces where to have the alignment conversation |
| 2026-07-08 | Results now prescribe one targeted intervention (+ timeframe) per weak dimension | change-readiness-rubric: "a readiness score without an intervention plan is half a deliverable"; content adapted from its intervention map |
| 2026-07-08 | Leadership-sequences-first note when leadership is among the weakest dimensions | Intervention-map sequencing rule #1; consistent with Prosci's sponsorship-is-#1 finding |
| 2026-07-08 | Deep link results → framework via one-shot sessionStorage key + hash nav | Survives the view remount without new routing machinery; falls back gracefully to the default quadrant |
| 2026-07-08 | "Save as PDF" = print stylesheet + window.print(), not a PDF library | Zero dependencies; browsers' print-to-PDF is universal, and consultants get a clean one-pager |
| 2026-07-08 | Added prefers-reduced-motion overrides | Accessibility: animation/auto-scroll suppressed for users who request it |
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

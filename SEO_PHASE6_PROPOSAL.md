# Phase 6 — Answer-shaped content proposal

**Status:** IN REVIEW. Rows 1 and 2 decided and shipped (see the log at the
end). Rows 3–8 await approval; nothing from them is on the site.
**Spec:** `SPEC_DELTA_ai-search-visibility_20260827_v2.md` §6 Phase 6 — "the H2 is the
question a reader would actually type and the first sentence beneath it answers
that question completely in under 40 words … zero content changes without
row-by-row approval."
**Date:** 2026-11-19

## Why do this

Answer engines (ChatGPT, Perplexity, Gemini, Copilot) retrieve a passage, not
a page. A passage whose heading matches the question someone typed, and whose
first sentence answers it outright, is the easiest one for them to lift and
cite. Today the site's headings are editorial labels ("Six stages, one evidence
trail"). They read well but match nothing anyone searches for.

What stays the same: every section keeps its numbered eyebrow (`01 · How I
think`, `4.3 · The change model` …), so the editorial voice and the route through
the page are unchanged. Only the H2 under the eyebrow becomes a question, and a
new opening sentence is added under it. The existing lede paragraphs stay.

Expected effect, stated honestly: low risk, a moderate likely gain in how
often the site is quoted, and **not measurable yet** because there is no
baseline of what the engines say today. Taking that baseline before shipping
these changes would let you see the effect.

## The proposal

Every opening sentence is 40 words or fewer (count in brackets), restates
content already on the page, introduces no new claim, and was checked against
the no-AI-slop rules.

| # | Section | Current heading | Proposed heading | Proposed opening sentence |
|---|---|---|---|---|
| 1 | 01 · How I think (`#principles`) | Six principles behind the work | ~~What principles should guide organization design?~~ **REJECTED: heading kept** | (none: a list of beliefs doesn't need to be a query) |
| 2 | 02 · How I work (`#approach`) | Six stages, one evidence trail | **APPROVED (revised):** Where should an organization design start? | With the current state. I map where the organization and its operating system create and lose value, and why its parts work differently, before deciding which of the four domains to move, in what order and when. **(37)** |
| 3 | 02 · evidence grades (H3) | How sure are we? | How much should a leader trust a diagnostic finding? | As much as its evidence grade allows. Decide on confirmed findings, decide with care on indicated ones and say so, and never decide on a hypothesis alone. **(27)** |
| 4 | 03 · Required, chosen or inherited? (`#differences`) | Why the same work gets done differently | Should you standardize how different parts of a business work? | Only once you know why each difference exists. Required differences stay local, chosen ones need a decision to keep or align, and inherited ones, which nobody decided, should be harmonized. **(30)** |
| 5 | 4.1 · The framework (`#framework`) | Integrated Organizational Capability and Change Framework | What makes an organization design work? | Structure, people, process and mindset change together around a leadership core, expressed through the organization's culture values. I map those four domains in the Integrated Organizational Capability and Change Framework. **(30)** |
| 6 | 4.2 · The five activators (`#activators`) | What turns a design into performance | What turns an organization design into performance? | Five activators, adapted from Kesler and Kates: value-adding layers, innovation and execution networks, the business handshake, governance and decision rights, and matrix-ready leaders. **(23)** |
| 7 | 4.3 · The change model (`#change-levers`) | The three C's of change | How do you make organizational change stick? | Pull three levers at once. Communicate a future people can picture, co-create the design with the people who will run it, and set a cadence of rituals that reinforce the new behaviors. **(32)** |
| 8 | 4.4 · AI-native design (`#ai-native`) | AI redesigns the work, not the chart | How does AI change organization design? | It moves the unit of design from the org chart to the task. Each task goes on a ladder from manual to reinvention, and a person reviews every machine judgement before it reaches a decision-maker. **(35)** |

## Points to weigh on specific rows

- **Row 4 is the most valuable.** "Should you standardize…?" is the question an
  executive actually asks, and the answer introduces your coined terms in the
  same breath. That is how a coined lens gets cited.
- **Row 5 trades a name for a question.** The framework's full name currently
  carries H2 weight. The proposal keeps the name in the opening sentence, where
  engines still read it, but it would no longer be a heading. If you would
  rather keep the name as the H2, reject this row.
- **Row 6 is a one-word change.** The current heading is already nearly a
  question; this only makes the subject explicit.
- **Row 8 changes the visible heading only.** "AI redesigns the work, not the
  chart" is used in seven places, including the Article headline in the
  structured data and an FAQ answer. I recommend those stay as they are: it is a
  quotable line attached to your name. The proposed heading also matches an
  existing FAQ question word for word, which reinforces the pairing rather than
  duplicating it.

## Deliberately unchanged

| Section | Heading | Why it stays |
|---|---|---|
| Hero | (no H2) | The H1 thesis is the brand line, not an answer to a query |
| 04 · The playbook (`#playbook`) | The frameworks behind the work | A signpost to four sections; no one searches for it |
| 05 · The diagnostic (CTA band) | Ready to assess your organization? | A call to action, already a question |
| About (`#about`) | Eric Yim | The entity name anchors "who is Eric Yim"; its subheadings are already question-and-answer |
| Principle titles, stage names | e.g. "Start AI at the task." | Statements by design; each sits under a question heading if row 1 or 2 is approved |

## What approval touches

For each approved row I would change the heading and add the opening sentence,
then update everything that repeats the heading so nothing drifts:

| Row | Files beyond the section itself |
|---|---|
| 1, 2, 3, 4 | `src/data/principles.ts` or `src/data/approach.ts`; `public/llms.txt` |
| 5 | `src/components/FrameworkSection.tsx`, `app-smoke.test.tsx`, `public/llms.txt` |
| 6 | `src/components/ActivatorsSection.tsx` |
| 7 | `src/components/ChangeLevers.tsx`, `app-smoke.test.tsx` |
| 8 | `src/data/aiNative.ts`, `app-smoke.test.tsx`, `ai-native.test.tsx` (Article headline, FAQ and `llms.txt` untouched, per the note above) |

The hero index card's descriptions ("Six principles behind the work", "Six
stages, one evidence trail") would stay as they are: they label the route, they
are not section headings. Each change ships with the full gate: tests, build,
`npm run verify:site`, screenshots, and lint at its baseline.

## Decision log

**2026-11-19: rows 1 and 2, plus two related edits, approved and shipped.**

- **Row 1 rejected.** The question version read weaker than "Six principles
  behind the work", and the six principles don't all answer a "where to start"
  question.
- **Row 2 revised and approved.** Eric's framing: understanding the current
  state is the value proposition. It shows where the organization and its
  operating system create and lose value, and sets the foundation for later
  design choices; required, chosen and inherited explain the differences; and
  that decides which domains move, in what order and when. The six stages
  under this heading are the method for exactly that, so the question lives
  here rather than on row 1.
- **Principle 2 reworded** to remove a contradiction the new framing exposed:
  "move together, or they don't move at all" now reads "Move all four domains
  as one system … They all have to move, though not all at once. The current
  state tells you which to move first and how fast."
- **Sequencing line added** under the three definitions in `#differences`:
  "The three also set the order of the work. Required differences mark what
  the design can't change, inherited ones are where harmonizing starts, and
  chosen ones wait for a leadership decision." Confirmed by Eric as how he
  describes it.

Mirrored into `llms.txt` and the structured-data FAQ answer; tests pin all
four.

## How to approve

Reply with one line per row: **Approve**, **Edit: <your wording>**, or
**Reject**. For example: `3 Approve · 4 Approve · 5 Reject · 6 Approve · 7 Edit: How do you
make a change stick? · 8 Approve`. Rows 1 and 2 are already decided.

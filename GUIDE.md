# GUIDE.md — What the OrgDesign Playbook does and how to run it

*Written for a non-technical reader.*

## What the app does

It is a one-page consulting playbook with four parts, listed in the card on
the opening screen:

1. **The framework** — a circular diagram of the four organizational
   dimensions (Structure, People, Process, Mindset) around a Leadership
   core. Click any quadrant and the panel beside it shows that quadrant's
   components, ready-to-use playbook modules, and the diagnostic questions
   that measure it.
2. **The five activators** — the Kates-Kesler levers that turn an org
   design into performance. Click a row to see key principles, healthy
   signals, and dysfunction signals side by side.
3. **The change model** — Communicate / Co-create / Cadence, each with its
   goal, method, and tool, plus the T.C.C.A.R. team-health lens (click the
   five tabs).
4. **The diagnostic** — 18 statements you rate from 1 (strongly disagree)
   to 5 (strongly agree). It advances automatically after each answer and
   saves as you go, so you can close the tab and come back. At the end you
   get a scored snapshot: overall health, a per-dimension breakdown, where
   to focus first, and which activators to work on. You can download the
   results as a file ("Export JSON") or retake the diagnostic.

## How to run it on your computer

1. Open a terminal in the project folder.
2. `npm install` — one-time setup; downloads what the app needs.
3. `npm run dev` — starts the app; open the printed address
   (usually http://localhost:5173) in your browser.

## How to check nothing is broken

Run `./run_checks.sh`. Success looks like: "ALL CHECKS PASSED".
It runs the 47 automated tests, checks the code compiles, and builds the
deployable version.

## What changed most recently (2026-07-08)

The whole site moved to a calmer, print-like look: warm paper background,
thin borders instead of shadows, serif headlines, one red accent. The
framework circle was redrawn so labels are always readable, the quadrant
details now appear beside the diagram instead of a pop-up, the survey
advances by itself after you answer, and the results page explains what
your score means and what to do next. The app also got much lighter, so it
loads faster.

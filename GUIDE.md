# GUIDE.md — What the OrgDesign Playbook does and how to run it

*Written for a non-technical reader.*

## What the app does

It is a one-page consulting playbook with four parts, listed in the card on
the opening screen:

1. **The framework** — a circular diagram of the four organizational
   dimensions (Structure, People, Process, Mindset) around a Leadership
   core. The panel beside it opens with the big-picture story of how the
   framework fits together; click any quadrant (or a row in the overview)
   to see that dimension's components, ready-to-use playbook modules, and
   the diagnostic questions that measure it, with a link back to the
   overview.
2. **The five activators** — the Kates-Kesler levers that turn an org
   design into performance. Click a row to see key principles, healthy
   signals, and dysfunction signals side by side.
3. **The change model** — Communicate / Co-create / Cadence, each with its
   goal, method, and tool, plus the T.C.C.A.R. team-health lens (click the
   five tabs).
4. **AI-native design** — a read-only explainer on what AI changes about
   org design: descend from the org chart to the *task* (where AI actually
   attaches), place every task on a four-level ladder from Manual to
   Reinvention, and gate every machine judgement before it reaches a
   decision-maker. Nothing to click — it is reference material.
5. **The diagnostic** — 18 statements you rate from 1 (strongly disagree)
   to 5 (strongly agree). It advances automatically after each answer and
   saves as you go, so you can close the tab and come back. "Reset survey"
   (top right) clears all answers and starts from question 1. At the end
   you get a scored snapshot: overall health, a per-dimension breakdown,
   where to focus first, and which activators to work on. You can download
   the results as a file ("Export JSON"), save them as a PDF, or retake
   the diagnostic.

## Cohort mode (comparing a team's answers)

Running the diagnostic with a group (up to 20 people)? After each person
finishes, type their name in the "Cohort mode" box on the results page and
click **Save to cohort**, then **Start next respondent** to hand over a
fresh survey. Once at least one response is saved, **View cohort
dashboard** shows the group side by side: the cohort average, each
dimension's average and range, a colored comparison table of every
respondent, where opinions diverge most, and what the group should tackle
first. You can remove individual responses, clear the whole cohort, export
everything as a file, or save the dashboard as a PDF.

## How to run it on your computer

1. Open a terminal in the project folder.
2. `npm install` — one-time setup; downloads what the app needs.
3. `npm run dev` — starts the app; open the printed address
   (usually http://localhost:5173) in your browser.

## How to check nothing is broken

Run `./run_checks.sh`. Success looks like: "ALL CHECKS PASSED".
It runs the 47 automated tests, checks the code compiles, and builds the
deployable version.

## Being found by Google and AI assistants

The site now tells search engines and AI assistants (ChatGPT, Claude,
Perplexity, Google AI) who you are: **Eric Yim, organization design
strategist specializing in human-AI work partnership**. That identity, your
areas of expertise, and the NTU and aTalent articles about you are written
into the page in a machine-readable form, and repeated in an **About the
author** section near the bottom that human visitors can read too. There is
also a plain-text summary at `/llms.txt` written specifically for AI
assistants, and a `/robots.txt` that explicitly welcomes their crawlers.

Your background is now on the site as published fact, taken from the two
articles: Nanyang Business School 1998, the prompt-engineering certificate,
25 years in the field, and three quotes with the publication credited. The
site also has a shareable preview card (the image that appears when someone
posts your link), and a plain-text file that tells search engines to re-check
the site the moment you publish.

**Two things to do when you go live:**

1. The site does not yet know its own web address. Open
   `src/data/profile.ts`, change `SITE_URL` to your real domain, then make the
   same change in `index.html`, `public/robots.txt` and `public/sitemap.xml`.
   If you miss one, `./run_checks.sh` will tell you.
2. Register the site with Google and Bing. Sign up for Google Search Console
   and Bing Webmaster Tools, each gives you a verification code; paste them
   into the two commented-out lines near the top of `index.html`, remove the
   `<!--` and `-->` around them, then submit `yourdomain.com/sitemap.xml` in
   both. This is what actually gets your pages indexed.

Your LinkedIn profile is now linked from the site and registered as an
official "this is the same person" signal, and the site repeats the same
facts LinkedIn does — current role at SATS, both degrees, the prompt
engineering certification, the Brandon Hall award and your career history.
That agreement matters: when Google or an AI assistant sees the same facts on
your site, on LinkedIn and in the two articles, it treats you as one
well-established person rather than several uncertain ones. There is an
automatic check that fails the build if the site ever drifts from what your
LinkedIn says.

**Note:** your email address appears in the LinkedIn export but is
deliberately *not* published on the site — public pages get scraped for
spam. Tell me if you would rather have a contact link.

**Things only you can do, off the website:** create a Wikidata entry for
yourself (wikidata.org — it needs independent coverage, which your two
articles help support), and tell me where your `bit.ly/2RQceu7` personal link
points so it can be added properly (I left it out rather than link somewhere
I could not check).

## What changed most recently (2026-08-13)

Added a new reference section, **AI-native design**, between the change
model and the diagnostic. It answers the question executives ask first —
what does AI actually change about org design — in three moves: descend to
the task, place every task on a Manual→Assisted→Enabled→Reinvention ladder,
and gate the machine's judgement before it reaches a decision-maker. It also
separates what AI *can* do from what people *want* automated, and labels
every claim by how trustworthy its source is. It is pure reading material:
nothing to click, and it does not change your diagnostic or scores. The
sections are now numbered 01–05, with the diagnostic last.

## Earlier changes (2026-07-08)

The whole site moved to a calmer, print-like look: warm paper background,
thin borders instead of shadows, serif headlines, one red accent. The
framework circle was redrawn so labels are always readable, the quadrant
details now appear beside the diagram instead of a pop-up, the survey
advances by itself after you answer, and the results page explains what
your score means and what to do next. The app also got much lighter, so it
loads faster.

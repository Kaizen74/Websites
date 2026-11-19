# GUIDE.md — What ericyim.sg does and how to run it

*Written for a non-technical reader.*

## What the site does

It is your personal site, built to make senior executives and founders
remember two things: who you are, and how you think. A visitor reads it top
to bottom as an argument:

- **Opening screen** — your photo and name, your thesis ("I design
  organizations as systems that leaders can run."), and the aTalent headline
  about your work as proof. The card on the right lists the five stops below.
- **01 · How I think** — six principles behind your work. Each one links to
  the part of the page that puts it to work.
- **02 · How I work** — your six-stage method (Frame, Focus, Find, Dial,
  Design, Deliver) drawn as a diagram, plus the three evidence grades
  (Confirmed, Indicated, Hypothesis).
- **03 · Required, chosen or inherited?** — your lens for differences between
  markets, sites or acquired teams. Visitors can try it: two yes/no questions
  sort any difference and tell them what to do about it. Nothing they click is
  saved or sent anywhere. A made-up software company shows the lens applied
  ("paper versus practice").
- **04 · The playbook** — the four tools below, numbered 4.1 to 4.4.
- **05 · The diagnostic** — the 18-question health check.
- **About** — a short note in your own voice, then your background and the
  common questions people (and AI assistants) ask about you.

Every example on the site is invented and deliberately set outside your
employer's industry, and nothing on the page offers services, prices or a way
to hire you. Your method appears as plain ideas only: nothing technical from your
own tools (names, screens, codes or internal mechanics) is on the site.

The playbook sections:

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
It runs the automated tests, checks the code compiles, and builds the
deployable version.

For a deeper check, run `npm run verify:site` after that. It opens the built
site in a real browser and checks 115 things the way a visitor and an AI
crawler would: every link, the sorter, the whole diagnostic, the layout on a
phone and a laptop, the search-engine data, and that nothing commercial or
employer-specific has slipped in. Success looks like "ALL 115 CHECKS PASSED".
(It needs a browser on the machine, so it runs on your computer or in a Claude
session, not on Vercel.)

## How to change the LinkedIn preview image

The image people see when your link is shared is `public/og-image.png`. To
change its wording, edit `scripts/og/card.html`, then run `npm run og:render`.
It refuses to save the image if your brand fonts fail to load, so you can
never ship a card in the wrong typeface. After it is live, paste your URL into
LinkedIn's Post Inspector (linkedin.com/post-inspector) so LinkedIn fetches the
new image instead of its cached copy.

## Being found by Google and AI assistants

The site now tells search engines and AI assistants (ChatGPT, Claude,
Perplexity, Google AI) who you are: **Eric Yim, organization design
strategist specializing in human-AI work partnership**. That identity, your
areas of expertise, and the NTU and aTalent articles about you are written
into the page in a machine-readable form, and repeated in an **About**
section near the bottom that human visitors can read too. There is
also a plain-text summary at `/llms.txt` written specifically for AI
assistants, and a `/robots.txt` that explicitly welcomes their crawlers.

Your background is now on the site as published fact, taken from the two
articles and your LinkedIn: NTU 1998, University of North Texas 2022, the
Certified Prompt Engineer™ credential, 25 years in the field, and quotes with
the publication credited. The
site also has a shareable preview card (the image that appears when someone
posts your link), and a plain-text file that tells search engines to re-check
the site the moment you publish.

**One thing still to do:** register the site with Google and Bing. Sign up
for Google Search Console and Bing Webmaster Tools; each gives you a
verification code. Paste them into the two commented-out lines near the top
of `index.html`, remove the `<!--` and `-->` around them, then submit
`https://www.ericyim.sg/sitemap.xml` in both. This is what actually gets your
pages indexed. (The site's own address, www.ericyim.sg, is already set
everywhere.)

Since November 2026, Google and AI assistants also get your six principles,
your six-stage method and the required/chosen/inherited lens in machine-
readable form, with three new questions and answers about your approach. Search
results now show the site name as "Eric Yim" rather than "OrgDesign Playbook".

The About section is deliberately kept short and elegant: your name, role,
one line of experience, your qualifications, six topics, the three links and
the questions. Your full career history, the longer biography, the Brandon
Hall and SHRI awards and the other quotes are still on the site — just not shown on
screen. They live in the machine-readable parts that Google and AI assistants
read, so you get the full credibility without a cluttered page.

Your LinkedIn profile is now linked from the site and registered as an
official "this is the same person" signal, and the site repeats the same
facts LinkedIn does — current role at SATS, both degrees, the prompt
engineering certification, both awards (including the SHRI Gold for Talent
Management & Acquisition at SATS) and your career history.
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

## What changed most recently (2026-11-19)

The site was reorganised around you. Before, a visitor reached your name
about eight screens down on a laptop (thirteen on a phone) and the phone
header showed no name at all. Now your name and your thesis are the first
thing anyone sees, followed by your principles, your method and an
interactive version of your required/chosen/inherited lens. The playbook and
diagnostic are unchanged apart from their numbering (now 4.1–4.4 and 05).

A long-standing typography fault was fixed along the way: your name in the
header and your signature at the bottom had been showing in the plain body
font instead of the serif brand font. Both are now correct, and so are the
numbers on the results page.

The page loads slightly faster than before despite carrying about 70% more
readable content, and the LinkedIn preview image was redrawn in the brand
fonts with your thesis on it.

**Your four decisions, now done (2026-11-19, later the same day):**

1. The five activators now carry a credit line to Gregory Kesler and Amy
   Kates.
2. Required, chosen and inherited are marked as your own coinage: the site
   says "I call the three reasons…", and Google and AI assistants are told you
   are the author.
3. Your headshot is on the site: a small photo next to your name at the top,
   a larger portrait beside your mission quote in About, and on the LinkedIn
   preview image. It is also registered as your official photo in the
   machine-readable data. The photo's hidden file details were removed.
4. The wording was edited to sound like you rather than like AI: no "not X,
   but Y" slogans, no dramatic colons, plain sentences in the style of your
   own workflow notes. One choice to flag: the page uses American spelling
   ("organization", "harmonize") to match the rest of the site and your
   LinkedIn title. Your own writing uses British spelling; say the word and
   the whole site can switch.

**Two fixes found along the way.** Links that jump to a section (for example
someone sharing ericyim.sg/#differences) were landing slightly off on phones;
they now land exactly under the header and never fight you if you start
scrolling. And the brand fonts are now served from your own site instead of
Google's, which removed the last visible jump on slow connections and means
visitors' browsers no longer contact Google at all.

## Earlier changes (2026-08-13)

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

// Copy for the home page (/). Single source of truth for Hero, Questions,
// the home principles, the playbook bridge and the connect band; llms.txt and
// the tests read it from here.
//
// Written around what Eric is drawn to, not who he works for or with: he is
// employed, so nothing here describes a service, a client or an offer. The
// home page invites conversation and points to the free playbook.
import { PAGE_PATHS, SECTION_IDS, playbookHref } from '../constants';

export const heroCopy = {
  byline: 'Organization design and AI · Singapore',
  /** H1, split so the design can set one word in italic red */
  headingBefore: 'What should an organization look like when people and machines ',
  headingEmphasis: 'share',
  headingAfter: ' the work?',
  lede:
    'It’s the question I keep coming back to after 25 years in organizational development. My short answer: AI redesigns the work, not the chart. This site is where I work out the longer one, in the open and free to use.',
};

/** The H1 as plain text, for tests, llms.txt and the share card */
export const heroHeading = `${heroCopy.headingBefore}${heroCopy.headingEmphasis}${heroCopy.headingAfter}`;

export interface HomeIndexRow {
  number: string;
  title: string;
  description: string;
  href: string;
}

/** The hero's numbered index card. Numbers match each home section's eyebrow. */
export const homeIndexRows: HomeIndexRow[] = [
  {
    number: '01',
    title: 'What I’m exploring',
    description: 'Three questions I keep coming back to',
    href: `#${SECTION_IDS.questions}`,
  },
  {
    number: '02',
    title: 'How I think',
    description: 'Three principles I hold to',
    href: `#${SECTION_IDS.principles}`,
  },
  {
    number: '03',
    title: 'The playbook',
    description: 'The method in full, free to use',
    href: PAGE_PATHS.playbook,
  },
  {
    number: '04',
    title: 'Compare notes',
    description: 'Thinking about the same questions?',
    href: `#${SECTION_IDS.connect}`,
  },
];

export interface ExploringQuestion {
  question: string;
  body: string;
  href: string;
  linkLabel: string;
}

export const questionsCopy = {
  eyebrow: '01 · What I’m exploring',
  heading: 'Three questions I keep coming back to',
  lede:
    'They come up in almost every organization that takes AI seriously. Here is where my thinking stands, with a link to the detail behind each.',
};

export const exploringQuestions: ExploringQuestion[] = [
  {
    question: 'Why do so many AI pilots leave the work exactly as it was?',
    body:
      'Most start from a tool and look for somewhere to use it. I’d start from the task: break each role into tasks, decide how much of each a machine should do, and keep a person accountable for every judgement that reaches a decision.',
    href: playbookHref(SECTION_IDS.aiNative),
    linkLabel: 'How AI changes the design',
  },
  {
    question: 'When the same work is done five different ways, which differences should stay?',
    body:
      'Growth and acquisitions leave every business with local variations. Some are required, some were chosen and some were simply inherited. Asking which is which, before standardizing anything, is the most useful habit I know.',
    href: playbookHref(SECTION_IDS.differences),
    linkLabel: 'Sort a difference in two questions',
  },
  {
    question: 'Why does a new org chart so often leave decisions where they were?',
    body:
      'Boxes move faster than behavior. Structure, people, process and mindset have to move as one system, and each leader needs to know the specific thing they will do differently on Monday.',
    href: playbookHref(SECTION_IDS.framework),
    linkLabel: 'See the four domains',
  },
];

/** The home page shows three of the six principles; the playbook has all six */
export const homePrinciplesCopy = {
  eyebrow: '02 · How I think',
  heading: 'Three principles I hold to',
  lede: 'Three of the six behind the playbook.',
  numbers: ['01', '04', '06'],
  allLabel: 'Read all six principles',
  allHref: playbookHref(SECTION_IDS.principles),
};

export const playbookBridgeCopy = {
  eyebrow: '03 · The playbook',
  heading: 'The frameworks behind the work',
  lede:
    'Everything above, worked through in detail: six principles, a six-stage method, the required, chosen or inherited lens, four models and an 18-question diagnostic. Free to use.',
  cta: 'Open the playbook',
  href: PAGE_PATHS.playbook,
};

export const connectCopy = {
  eyebrow: '04 · Compare notes',
  heading: 'Thinking about the same questions?',
  body:
    'I’m always glad to compare notes with executives and founders working out how AI changes their organization, and to share what I’ve learned. A message on LinkedIn is the best way to reach me.',
  cta: 'Message me on LinkedIn',
};

/** The playbook page's own intro (its H1) */
export const playbookPageCopy = {
  eyebrow: 'The playbook',
  heading: 'The OrgDesign Playbook',
  lede:
    'How I think about designing and changing organizations, written down so anyone can use it: six principles, a six-stage method, a lens for deciding what to standardize, four models and an 18-question diagnostic.',
  byline: 'By Eric Yim',
};

/**
 * The playbook's route, 01–05. Numbers match each playbook section's eyebrow
 * (01 · How I think … 05 · The diagnostic); 4.1–4.4 sit under row 04. Shown
 * on the playbook page's index card (as #anchors) and on the home page's
 * bridge (as /playbook#anchors).
 */
export const playbookIndexRows: (Omit<HomeIndexRow, 'href'> & { id: string })[] = [
  { number: '01', title: 'How I think', description: 'Six principles behind the work', id: SECTION_IDS.principles },
  { number: '02', title: 'How I work', description: 'Six stages, one evidence trail', id: SECTION_IDS.approach },
  {
    number: '03',
    title: 'Required, chosen or inherited?',
    description: 'Sort any difference in two questions',
    id: SECTION_IDS.differences,
  },
  {
    number: '04',
    title: 'The playbook',
    description: 'Framework, activators, change model, AI-native design',
    id: SECTION_IDS.playbook,
  },
  {
    number: '05',
    title: 'The diagnostic',
    description: '18 questions, scored across five dimensions, saved locally',
    id: SECTION_IDS.diagnostic,
  },
];

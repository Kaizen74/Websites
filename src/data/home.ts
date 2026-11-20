// Copy for the home page (/). Single source of truth for Hero, Questions,
// the home principles, the playbook bridge and the connect band; llms.txt and
// the tests read it from here.
//
// Written around what Eric is drawn to, not who he works for or with: he is
// employed, so nothing here describes a service, a client or an offer. The
// home page invites conversation and points to the free playbook.
import { PAGE_PATHS, SECTION_IDS, playbookHref } from '../constants';

export const heroCopy = {
  byline: 'Organisation design · AI transformation · Singapore',
  /** H1, split so the design can set one word in italic red */
  headingBefore: 'What should an organisation look like when people and machines ',
  headingEmphasis: 'share',
  headingAfter: ' the work?',
  lede:
    'It’s the question I keep coming back to after 25 years in organisational development. My short answer: AI redesigns the work, not the chart. This site is where I work out the longer one, in the open and free to use.',
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
    'They come up in almost every organisation going through an AI transformation. Here is where my thinking stands, with a link to the detail behind each.',
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
      'Only the ones that are required, or chosen for a reason someone can still state. Growth and acquisitions leave plenty of differences that were simply inherited. Asking which is which before standardising anything is the most useful habit I know.',
    href: playbookHref(SECTION_IDS.differences),
    linkLabel: 'Sort a difference in two questions',
  },
  {
    question: 'Why does a new org chart so often leave decisions where they were?',
    body:
      'Because boxes move faster than behaviour. Structure, people, process and mindset have to move as one system, and each leader needs to know the specific thing they will do differently on Monday.',
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
    'Everything above, worked through in detail and free to use: how I think, how I work, how to decide what to standardise, four models for design and change, and a five-minute diagnostic.',
  cta: 'Open the playbook',
  href: PAGE_PATHS.playbook,
};

export interface ConnectWay {
  title: string;
  body: string;
  label: string;
  /** 'linkedin' resolves to the owned LinkedIn profile at render time */
  href: string;
}

/**
 * Home 04 · Compare notes. Knowledge sharing only: a conversation, the free
 * playbook, and following new thinking. Deliberately no consulting, pro bono,
 * speaking or any other offer: he is employed, and those need his employer's
 * agreement first.
 */
export const connectCopy = {
  eyebrow: '04 · Compare notes',
  heading: 'Thinking about the same questions?',
  body: 'This site exists to share ideas. Three ways to take them further.',
  ways: [
    {
      title: 'Compare notes',
      body: 'Working through the same questions in your organisation? Send me a message. I enjoy the conversation and I’ll share what I’ve learned.',
      label: 'Message me on LinkedIn',
      href: 'linkedin',
    },
    {
      title: 'Use the playbook',
      body: 'Everything on this site is free to use with your team. If it helps, I’d like to hear how it went.',
      label: 'Open the playbook',
      href: PAGE_PATHS.playbook,
    },
    {
      title: 'Follow the thinking',
      body: 'Follow along on LinkedIn for new thinking as it takes shape, and push back where you see it differently.',
      label: 'Follow on LinkedIn',
      href: 'linkedin',
    },
  ] as ConnectWay[],
};

/** The playbook page's own intro (its H1) */
export const playbookPageCopy = {
  eyebrow: 'The playbook',
  heading: 'The OrgDesign Playbook',
  lede:
    'How I think about designing and changing organisations, written down so anyone can use it: six principles, a six-stage method, a lens for deciding what to standardise, four models and an 18-question diagnostic.',
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
  { number: '02', title: 'How I work', description: 'Six stages, from first question to proof it worked', id: SECTION_IDS.approach },
  {
    number: '03',
    title: 'Required, chosen or inherited?',
    description: 'Sort any difference in two questions',
    id: SECTION_IDS.differences,
  },
  {
    number: '04',
    title: 'The playbook',
    description: 'How the parts fit, what makes a design perform, how change sticks, and AI',
    id: SECTION_IDS.playbook,
  },
  {
    number: '05',
    title: 'The diagnostic',
    description: 'Five minutes, 18 questions, a read on where to start',
    id: SECTION_IDS.diagnostic,
  },
];

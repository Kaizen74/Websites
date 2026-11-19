// How Eric Yim works: the six-stage arc, the evidence grades, and the
// required / chosen / inherited lens for differences.
//
// Single source of truth for Approach.tsx, Differences.tsx, the matching FAQ
// entries and DefinedTermSet in index.html, and public/llms.txt.
//
// BOUNDARY RULE: every example here is fictional and deliberately set in a
// neutral sector (a software company selling in three made-up markets). No
// employer, no real organization, no app or product names, no figures.

// ---------------------------------------------------------------- stages ---

export interface Stage {
  number: string;
  name: string;
  question: string;
  produces: string;
}

export interface StageGroup {
  label: string;
  stages: Stage[];
}

export const approachCopy = {
  eyebrow: '02 · How I work',
  // Phase 6, row 2 (approved 2026-11-19): the heading is the question a reader
  // types; `answer` is the first sentence under it and answers it in full.
  heading: 'Where should an organization design start?',
  answer:
    'With the current state. I map where the organization and its operating system create and lose value, and why its parts work differently, before deciding which of the four domains to move, in what order and when.',
  lede:
    'I run every engagement the same way. The first three stages establish what is true. In the last three, leaders decide what to change, install it and check that it worked.',
  stageZeroNote:
    'Framing comes first because without agreed criteria, every unit argues that its own way is right.',
};

export const stageGroups: StageGroup[] = [
  {
    label: 'Find out what’s true',
    stages: [
      {
        number: '1',
        name: 'Frame',
        question: 'What are we building, and how will we judge the design?',
        produces: 'Agreed criteria for judging the design, set before the debate starts',
      },
      {
        number: '2',
        name: 'Focus',
        question: 'Where must the model change, and where does it matter most?',
        produces: 'Where capability is weak where the money is made',
      },
      {
        number: '3',
        name: 'Find',
        question: 'How does the work really run, and who really decides?',
        produces: 'A clear picture of how the work really runs and who really decides',
      },
    ],
  },
  {
    label: 'Change it, and prove it',
    stages: [
      {
        number: '4',
        name: 'Decide',
        question: 'What should be one way everywhere, and how much should AI do?',
        produces: 'A call on every difference and every task',
      },
      {
        number: '5',
        name: 'Design',
        question: 'Which structure, roles and system do we install together?',
        produces: 'Options compared against the criteria agreed at the start',
      },
      {
        number: '6',
        name: 'Deliver',
        question: 'Is it lifting capability, cycle by cycle?',
        produces: 'A regular check that capability is rising and that earlier calls were right',
      },
    ],
  },
];

export const allStages: Stage[] = stageGroups.flatMap((g) => g.stages);

// -------------------------------------------------------- evidence grades ---

export interface EvidenceGrade {
  grade: string;
  means: string;
  useItTo: string;
}

export const evidenceCopy = {
  heading: 'How much should a leader trust a diagnostic finding?',
  answer:
    'As much as its evidence grade allows. Decide on confirmed findings, decide with care on indicated ones and say so, and never decide on a hypothesis alone.',
  lede: 'I grade every finding one of three ways, and use it only for what its grade allows.',
  note:
    '“We don’t know yet” is a valid answer. A guess says something false with confidence.',
};

export const evidenceGrades: EvidenceGrade[] = [
  { grade: 'Confirmed', means: 'Verified at source', useItTo: 'Decide' },
  { grade: 'Indicated', means: 'Supported, not yet verified', useItTo: 'Decide with care, and say so' },
  { grade: 'Hypothesis', means: 'Still to test', useItTo: 'Never decide on this alone' },
];

// ---------------------------------------------- required / chosen / inherited ---

export type DifferenceKind = 'required' | 'chosen' | 'inherited';

export interface DifferenceCategory {
  kind: DifferenceKind;
  label: string;
  definition: string;
  action: string;
  /** Token colour for the uppercase label; the one accent red marks "act on this" */
  labelColor: string;
}

export const differencesCopy = {
  eyebrow: '03 · Required, chosen or inherited?',
  heading: 'Should you standardize how different parts of a business work?',
  answer:
    'Only once you know why each difference exists. Required differences stay local, chosen ones need a decision to keep or align, and inherited ones, which nobody decided, should be harmonized.',
  lede:
    'As a business grows across markets, sites and acquisitions, the same work ends up done in different ways. Before harmonizing anything, I sort each difference by why it exists. I call the three reasons required, chosen and inherited, and each one leads to a different decision.',
  // How the lens sets the order of the work (operator-confirmed 2026-11-19)
  sequencing:
    'The three also set the order of the work. Required differences mark what the design can’t change, inherited ones are where harmonizing starts, and chosen ones wait for a leadership decision.',
  sorterHeading: 'Sort a difference in two questions',
  sorterLede:
    'Think of one thing your organization does differently in two places, then answer for it.',
};

export const differenceCategories: DifferenceCategory[] = [
  {
    kind: 'required',
    label: 'Required',
    definition: 'Regulation, a customer contract or the physical site makes it so.',
    action: 'Leave it local',
    labelColor: 'var(--color-ink)',
  },
  {
    kind: 'chosen',
    label: 'Chosen',
    definition: 'A deliberate local decision, made for a reason someone can still state.',
    action: 'Decide: keep or align',
    labelColor: 'var(--quad-people)',
  },
  {
    kind: 'inherited',
    label: 'Inherited',
    definition: 'History, an acquisition or habit. Nobody decided it.',
    action: 'Harmonize',
    labelColor: 'var(--color-primary)',
  },
];

export const categoryOf = (kind: DifferenceKind): DifferenceCategory =>
  differenceCategories.find((c) => c.kind === kind)!;

/**
 * The whole sorting logic. Two questions, three outcomes:
 *   required by regulation, contract or site?  yes → required
 *   decided on purpose, for a reason still stated?  yes → chosen, no → inherited
 */
export const sorterQuestions = {
  required: 'Is it required by regulation, a customer contract or the physical site?',
  chosen: 'Did someone decide it on purpose, for a reason they can still state today?',
};

export function classifyDifference(
  isRequired: boolean,
  isDeliberate: boolean | null
): DifferenceKind | null {
  if (isRequired) return 'required';
  if (isDeliberate === null) return null;
  return isDeliberate ? 'chosen' : 'inherited';
}

// ------------------------------------------------ worked example: paper vs practice ---

export interface DecisionRow {
  decision: string;
  onPaper: string;
  /** Who actually decides, per market, in the order of `exampleMarkets` */
  inPractice: string[];
  /** Index of each market whose practice departs from paper */
  drifted: number[];
  kind: DifferenceKind;
  why: string;
}

export const exampleCopy = {
  heading: 'Paper versus practice',
  lede:
    'A fictional software company sells in three markets. Here is who decides three things on paper, and who actually does.',
  verdict:
    'Harmonize the discount authority. Decide whether the local customer-success team should become the model. Leave data residency alone.',
  disclaimer: 'Illustrative and fictional: the company, markets and decisions are made up.',
};

export const exampleMarkets = ['Market A', 'Market B', 'Market C'];

export const exampleDecisions: DecisionRow[] = [
  {
    decision: 'Approve a discount above 20%',
    onPaper: 'Head of Sales',
    inPractice: ['Finance director', 'Head of Sales', 'Country manager'],
    drifted: [0, 2],
    kind: 'inherited',
    why: 'An acquired team kept its own rule',
  },
  {
    decision: 'Where customer data is stored',
    onPaper: 'Group cloud region',
    inPractice: ['Group cloud region', 'In-country', 'Group cloud region'],
    drifted: [1],
    kind: 'required',
    why: 'Data-residency law in Market B',
  },
  {
    decision: 'Who runs customer success',
    onPaper: 'Group team',
    inPractice: ['Group team', 'Group team', 'Local team'],
    drifted: [2],
    kind: 'chosen',
    why: 'Built for a large-account segment',
  },
];

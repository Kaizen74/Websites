// The six principles behind Eric Yim's work.
//
// Single source of truth. Rendered by Principles.tsx, summarised in the
// "What principles guide Eric Yim's work?" FAQ (profile.ts + JSON-LD) and in
// public/llms.txt. `principles.test.ts` fails if those copies drift.
//
// Each principle links to the section of the page that puts it to work, so the
// playbook below reads as evidence for the argument rather than a set of tools.

export interface Principle {
  number: string;
  title: string;
  body: string;
  /** Anchor of the section that proves the principle */
  href: string;
  linkLabel: string;
}

export const principlesCopy = {
  eyebrow: '01 · How I think',
  heading: 'Six principles behind the work',
  lede:
    'Every diagnosis, design and plan I make starts from these six. Each one links to where I apply it below.',
};

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Every diagnosis ends in a plan.',
    body:
      'A finding is only useful if it names the decision, the owner and the first move. I don’t consider the work done until that plan is running.',
    href: '#diagnostic',
    linkLabel: 'See it in the diagnostic',
  },
  {
    number: '02',
    title: 'Move all four domains as one system.',
    body:
      'Structure, people, process and mindset are held together by leadership. They all have to move, though not all at once. The current state tells you which to move first and how fast.',
    href: '#framework',
    linkLabel: 'See it in the framework',
  },
  {
    number: '03',
    title: 'Ask why before you harmonize.',
    body:
      'When two parts of a business work differently, find out why first. Some differences are required, some were chosen and some were inherited. Each needs a different decision.',
    href: '#differences',
    linkLabel: 'Sort a difference',
  },
  {
    number: '04',
    title: 'Script what each leader does differently.',
    body:
      'People usually know the why. They need the specific move each leader makes, the moment that makes it stick and the rhythm that keeps it going.',
    href: '#change-levers',
    linkLabel: 'See it in the change model',
  },
  {
    number: '05',
    title: 'Start AI at the task.',
    body:
      'Break each role into tasks. Decide which are automated, which are assisted and which stay human, and have a person make the final call on anything a model recommends.',
    href: '#ai-native',
    linkLabel: 'See it in AI-native design',
  },
  {
    number: '06',
    title: 'Say what you know, and how you know it.',
    body:
      'Grade every finding as confirmed, indicated or a hypothesis. Admitting a gap is honest; a guess becomes a false finding.',
    href: '#approach',
    linkLabel: 'See how I grade evidence',
  },
];

/** Principle titles without their closing full stop, for prose summaries */
export const principleNames = principles.map((p) => p.title.replace(/\.$/, ''));

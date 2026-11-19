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
    'Every diagnosis, design and plan on this site is built on these. Each one links to the part of the playbook that puts it to work.',
};

export const principles: Principle[] = [
  {
    number: '01',
    title: 'A system, not a report.',
    body:
      'A diagnosis is only worth what it hands leaders next: the decision, the owner and the first move. The work ends in a plan that runs, not a deck that sits.',
    href: '#diagnostic',
    linkLabel: 'See it in the diagnostic',
  },
  {
    number: '02',
    title: 'One system, not four fixes.',
    body:
      'Structure, people, process and mindset move together, held by leadership, or they don’t move at all. A new chart on its own is a reorganization, not a redesign.',
    href: '#framework',
    linkLabel: 'See it in the framework',
  },
  {
    number: '03',
    title: 'Not every difference is a problem.',
    body:
      'When two parts of a business work differently, ask why before you harmonise. Some differences are required, some were chosen and some were simply inherited, and each calls for a different decision.',
    href: '#differences',
    linkLabel: 'Sort a difference',
  },
  {
    number: '04',
    title: 'Change is a behaviour, not an announcement.',
    body:
      'People usually know the why. What’s missing is the specific move each leader makes, the moment that makes it stick and the rhythm that keeps it going.',
    href: '#change-levers',
    linkLabel: 'See it in the change model',
  },
  {
    number: '05',
    title: 'AI redesigns the work, not the chart.',
    body:
      'Go down to the task. Decide what is automated, assisted or kept human, and let a person, not a model, make the final call.',
    href: '#ai-native',
    linkLabel: 'See it in AI-native design',
  },
  {
    number: '06',
    title: 'Say what you know, and how you know it.',
    body:
      'Separate what is confirmed from what is indicated and what is still a hypothesis. A gap marked “not scored” is honest; a guessed score becomes a false finding.',
    href: '#approach',
    linkLabel: 'See the evidence rules',
  },
];

/** Principle titles without their closing full stop, for prose summaries */
export const principleNames = principles.map((p) => p.title.replace(/\.$/, ''));

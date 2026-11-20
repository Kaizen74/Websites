import type {
  DescentStep,
  AiLevel,
  ScoringZone,
} from '../types';

// All copy for the AI-native design section lives here — none inline in the
// component. Static teaching content: no scores, no state, no interactivity.

export const sectionCopy = {
  eyebrow: '4.4 · AI-native design',
  // Phase 6 row 8: the visible heading is the reader's question. Eric's line
  // "AI redesigns the work, not the chart" stays as the Article headline in
  // the structured data and opens the matching FAQ answer.
  heading: 'How does AI change organisation design?',
  tagline: 'AI redesigns the work, not the chart',
  answer:
    'It moves the unit of design from the org chart to the task. Each task goes on a ladder from manual to reinvented, and a person reviews every machine judgement before it reaches a decision-maker.',
  lede:
    // Opens with the tagline: it is the Article's headline in the playbook
    // page's structured data, so it must be visible on that page.
    'AI redesigns the work, not the chart. Structure follows work, and work is now shared with machines. Three moves follow from that.',
  moveOneOverline: 'Move one',
  moveOneHeading: 'Start from the task',
  descentNote:
    'What you learn at the task level adds up to decisions about layers, functions and cost.',
  moveTwoOverline: 'Move two',
  moveTwoHeading: 'Place every task on the ladder',
  moveThreeOverline: 'Move three',
  moveThreeHeading: "Check the machine's judgement",
  gateBodyBefore: 'Every AI recommendation should show where it came from and how sure it is. A person reviews ',
  gateBodyEmphasis: 'anything uncertain',
  gateBodyAfter: ' before it reaches a decision-maker.',
  gateFootnote: 'Build that review into the process from the start.',
  ladderHeaders: {
    level: 'Level',
    task: 'What happens to the task',
    cost: 'What it costs the organisation',
  },
  zoneHeading: 'Capability is only half the question',
  zoneSource:
    'Zones adapted from Stanford’s WORKBank study of what workers want automated and what AI can do (Shao et al., 2025).',
} as const;

export const descentSteps: DescentStep[] = [
  {
    label: 'Organisation',
    line: 'Layers and spans: where accountability sits',
  },
  {
    label: 'Position',
    line: 'Grade, cost and reporting line',
  },
  {
    label: 'Task',
    leadIn: 'Where AI actually fits',
    line: ', done by a person, a machine or both',
    emphasis: true,
  },
  {
    label: 'Process',
    line: 'How those tasks join up into end-to-end work',
  },
];

export const aiLevels: AiLevel[] = [
  {
    code: '1',
    name: 'Manual',
    ruleWidth: 12,
    ruleColor: '#D8CFC2',
    task: 'People do it end to end. Judgement, presence or skill is the point.',
    cost: 'Nothing. Protect it, and stop treating it as behind.',
  },
  {
    code: '2',
    name: 'Assisted',
    ruleWidth: 36,
    ruleColor: 'var(--quad-mindset)',
    task: 'The same task, done faster: drafting, summarising, searching, first-pass analysis.',
    cost: 'New tools and habits. No change to structure.',
  },
  {
    code: '3',
    name: 'Automated',
    ruleWidth: 66,
    ruleColor: 'var(--quad-people)',
    task: 'The machine does the task. A person sets the goal and handles exceptions.',
    cost: 'Roles are rewritten and spans widen. People supervise instead of doing.',
  },
  {
    code: '4',
    name: 'Reinvented',
    ruleWidth: 96,
    ruleColor: 'var(--color-primary)',
    task: 'The task disappears in its current form, and the process is redrawn around the result.',
    cost: 'An operating-model decision. Layers, hand-offs and decision rights all move.',
    emphasis: true,
  },
];

export const scoringZones: ScoringZone[] = [
  {
    label: 'Green zone',
    labelColor: 'var(--color-score-green)',
    line: 'Wanted and feasible. Start here.',
  },
  {
    label: 'Red zone',
    labelColor: 'var(--color-score-red)',
    line: 'Feasible but resisted. Treat it as a change problem.',
  },
  {
    label: 'R&D frontier',
    labelColor: 'var(--color-score-amber)',
    line: 'Wanted, not yet possible. Watch and pilot.',
  },
  {
    label: 'Low priority',
    labelColor: 'var(--color-faint)',
    line: 'Neither wanted nor feasible. Leave it alone.',
  },
];

export default { descentSteps, aiLevels, scoringZones };

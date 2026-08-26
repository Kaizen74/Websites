import type {
  DescentStep,
  AiLevel,
  ScoringZone,
  ProvenanceTier,
} from '../types';

// All copy for the AI-native design section lives here — none inline in the
// component. Static teaching content: no scores, no state, no interactivity.

export const sectionCopy = {
  eyebrow: '04 · AI-native design',
  heading: 'AI redesigns the work, not the chart',
  lede:
    'Structure follows work — and work is now shared with machines. Three moves make an AI-era design defensible: descend to the task, place every task on the ladder, and let no machine judgement reach a decision-maker unreviewed.',
  moveOneOverline: 'Move one',
  moveOneHeading: 'Descend to the task',
  descentNote:
    'Findings roll back up the org graph and across value streams — that is how a task-level insight becomes a layer, function and P&L conversation.',
  moveTwoOverline: 'Move two',
  moveTwoHeading: 'Place every task on the ladder',
  moveThreeOverline: 'Move three',
  moveThreeHeading: "Gate the machine's judgement",
  gateBodyBefore: 'Every score and mapping carries a source and a confidence value. Low confidence is routed to human review by ',
  gateBodyEmphasis: 'score, not by source label',
  gateBodyAfter: ' — and approvals become the house standard.',
  gateFootnote:
    'Human-in-the-loop is a workflow with a gate, not a disclaimer at the back of the deck.',
  ladderHeaders: {
    level: 'Level',
    task: 'What happens to the task',
    cost: 'What it costs the organisation',
  },
  zoneHeading: 'Capability is only half the question',
  zoneFootnote:
    'Physical work carries no software-agent overlay — it surfaces as a separate robotics and equipment lever, so the analysis never quietly automates a ramp.',
  provenanceOverline: 'Provenance — every claim carries its source',
} as const;

export const descentSteps: DescentStep[] = [
  {
    label: 'Organisation',
    line: 'Layers, spans, anchor layer — where accountability sits',
  },
  {
    label: 'Position',
    line: 'Grade, cost, reporting line — what HR systems can move',
  },
  {
    label: 'Task',
    leadIn: 'Where AI attaches',
    line: ' — scored and reassigned between human and machine',
    emphasis: true,
  },
  {
    label: 'Process',
    line: 'The value stream those tasks assemble into, across every box',
  },
];

export const aiLevels: AiLevel[] = [
  {
    code: 'L0',
    name: 'Manual',
    ruleWidth: 12,
    ruleColor: '#D8CFC2',
    task: 'Human end to end. Judgement, presence or dexterity is the point.',
    cost: 'Nothing. Protect it — and stop counting it as a laggard.',
  },
  {
    code: 'L1',
    name: 'Assisted',
    ruleWidth: 36,
    ruleColor: 'var(--quad-mindset)',
    task: 'Same task, faster — drafting, summarising, retrieval, first-pass analysis.',
    cost: 'Tools and habits. No structural change; quiet productivity gains.',
  },
  {
    code: 'L2',
    name: 'Enabled',
    ruleWidth: 66,
    ruleColor: 'var(--quad-people)',
    task: 'The machine runs the task; the human sets intent and handles exceptions.',
    cost: 'Roles are rewritten and spans widen. Supervision replaces execution.',
  },
  {
    code: 'L3',
    name: 'Reinvention',
    ruleWidth: 96,
    ruleColor: 'var(--color-primary)',
    task: 'The task stops existing in its current form; the process is redrawn around the outcome.',
    cost: 'An operating-model decision — layers, hand-offs and decision rights move.',
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
    line: 'Feasible but resisted. A change problem, not a build problem.',
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

export const provenanceTiers: ProvenanceTier[] = [
  {
    label: 'Regulator-backed',
    labelColor: 'var(--color-score-green)',
    line: 'National skills frameworks. Quotable to a regulator or a union.',
  },
  {
    label: 'Research-backed',
    labelColor: 'var(--color-score-amber)',
    line: 'Published task and agency datasets. Foreign preference data stays a hypothesis until tested locally.',
  },
  {
    label: 'Model-inferred',
    labelColor: 'var(--color-primary)',
    line: 'Useful, fast — and never decision-facing until a human signs it.',
  },
];

export default { descentSteps, aiLevels, scoringZones, provenanceTiers };

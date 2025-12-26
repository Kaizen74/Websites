import type { ChangeLever, QuadrantDetail } from '../types';

export const changeLevers: ChangeLever[] = [
  {
    id: 1,
    title: 'COMMUNICATE',
    goal: "Move from 'telling' to 'visualizing'",
    method: 'Destination Postcard - visual blueprints that paint the future state',
    tool: 'Transformation Portal (single source of truth)',
    description:
      'Create compelling narratives and visual representations of the desired future state. Use storytelling and imagery to help people see themselves in the new organization.',
  },
  {
    id: 2,
    title: 'CO-CREATE',
    goal: 'Enlist stakeholders to reduce resistance',
    method: 'Scenario-Based Sprints - stress-test designs before go-live',
    description:
      'Engage employees at all levels in designing the new organization. Use rapid prototyping and iteration to test ideas. Align with Agile Change Management principles.',
  },
  {
    id: 3,
    title: 'CADENCE',
    goal: 'Embed new behaviors into daily rhythm',
    method: 'T.C.C.A.R. Integration (Trust, Conflict, Commitment, Accountability, Results)',
    tool: 'Flash Pulse Checks after key meetings',
    description:
      'Establish regular rhythms and rituals that reinforce desired behaviors. Use quick feedback loops to maintain momentum and course-correct as needed.',
  },
];

export const quadrantDetails: QuadrantDetail[] = [
  {
    id: 'structure',
    title: 'Structure & Accountabilities',
    items: [
      'Roles & Responsibilities',
      'Spans, Layers & Reporting Lines',
      'Decision Rights / FOAL',
    ],
    color: '#C41E3A',
  },
  {
    id: 'people',
    title: 'People & Skills',
    items: ['Workforce Size & Location', 'Diversity', 'Knowledge & Skills'],
    color: '#4A5568',
  },
  {
    id: 'process',
    title: 'Process & Systems',
    items: [
      'Performance Management',
      'Workflows & Handoffs',
      'Data & Digital Tools',
      'Cadence / Routine',
    ],
    color: '#2D3748',
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    items: ['Ways of Working', 'Comms & Engagement', 'Leadership', 'Habits'],
    color: '#718096',
  },
];

// Map dimension scores to recommended activators
export const dimensionToActivators: Record<string, string[]> = {
  structure: ['Unique Value-Adding Layers', 'Power, Governance & Decision-Making'],
  people: ['Matrix-Ready Leaders'],
  process: ['The Business Handshake', 'Innovation & Execution Networks'],
  mindset: ['Innovation & Execution Networks', 'Matrix-Ready Leaders'],
  leadership: ['Matrix-Ready Leaders', 'Power, Governance & Decision-Making'],
};

export default { changeLevers, quadrantDetails, dimensionToActivators };

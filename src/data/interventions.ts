import type { ChangeLever, QuadrantDetail, TCCARItem, PlaybookModule } from '../types';

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
    goal: 'Align goals and embed new behaviors into daily rhythm',
    method: 'Goal-setting alignment; T.C.C.A.R. Integration (Trust, Conflict, Commitment, Accountability, Results)',
    tool: 'Flash Pulse Checks after key meetings',
    description:
      'Establish regular rhythms and rituals that reinforce desired behaviors. Use quick feedback loops to maintain momentum and course-correct as needed.',
  },
];

// T.C.C.A.R. Framework Data (Lencioni's 5 Dysfunctions adapted for org design)
export const tccarItems: TCCARItem[] = [
  {
    id: 'trust',
    title: 'Trust',
    description: 'Vulnerability-based trust where team members feel safe to be honest and authentic',
    healthyBehaviors: [
      'Open sharing of mistakes and learning',
      'Asking for help without fear',
      'Giving benefit of the doubt',
      'Constructive feedback is welcomed',
    ],
    dysfunctionSigns: [
      'Hiding weaknesses from one another',
      'Hesitating to ask for or offer help',
      'Holding grudges and suspicion',
      'Dreading meetings and avoiding interaction',
    ],
  },
  {
    id: 'conflict',
    title: 'Conflict',
    description: 'Healthy, productive debate focused on concepts and ideas, not personalities',
    healthyBehaviors: [
      'Lively, interesting meetings',
      'All ideas are considered',
      'Quick resolution of real problems',
      'Minimal politics and hidden agendas',
    ],
    dysfunctionSigns: [
      'Boring meetings with artificial harmony',
      'Back-channel discussions and politics',
      'Ignoring controversial topics',
      'Personal attacks disguised as debates',
    ],
  },
  {
    id: 'commitment',
    title: 'Commitment',
    description: 'Clear decisions with buy-in, even when perfect agreement is not possible',
    healthyBehaviors: [
      'Clarity on direction and priorities',
      'Alignment across teams and levels',
      'Ability to change direction quickly',
      'Learning from mistakes without blame',
    ],
    dysfunctionSigns: [
      'Ambiguity about direction and priorities',
      'Revisiting decisions repeatedly',
      'Second-guessing among team members',
      'Delayed action due to analysis paralysis',
    ],
  },
  {
    id: 'accountability',
    title: 'Accountability',
    description: 'Team members hold each other to high standards and call out behavior issues',
    healthyBehaviors: [
      'Poor performers feel pressure to improve',
      'Quick identification of potential problems',
      'Respect among high-performing colleagues',
      'Avoidance of excessive bureaucracy',
    ],
    dysfunctionSigns: [
      'Resentment among team members',
      'Missed deadlines and deliverables',
      'Placing burden on leader as sole source of discipline',
      'Mediocrity becomes acceptable',
    ],
  },
  {
    id: 'results',
    title: 'Results',
    description: 'Collective focus on outcomes over individual ego, career advancement, or department goals',
    healthyBehaviors: [
      'Retention of achievement-oriented employees',
      'Individual ego minimized',
      'Team celebrates collective wins',
      'Rarely fails to achieve objectives',
    ],
    dysfunctionSigns: [
      'Stagnation and failure to grow',
      'Loss of achievement-oriented employees',
      'Encouragement of individual achievement over team',
      'Easily distracted from key objectives',
    ],
  },
];

// Playbook Modules per Quadrant
export const playbookModules: PlaybookModule[] = [
  // Structure Quadrant
  {
    id: 'structure-roles',
    quadrant: 'structure',
    title: 'Role Clarity & RACI',
    description: 'Define clear roles, responsibilities, and decision rights across the organization',
    interventions: [
      'RACI matrix development',
      'Job architecture design',
      'Responsibility charting workshops',
    ],
    tools: ['RACI Template', 'Role Definition Cards', 'Decision Rights Matrix'],
  },
  {
    id: 'structure-layers',
    quadrant: 'structure',
    title: 'Spans & Layers Optimization',
    description: 'Right-size reporting relationships for agility and effectiveness',
    interventions: [
      'Span of control analysis',
      'Delayering assessment',
      'Manager effectiveness audit',
    ],
    tools: ['Span Calculator', 'Org Chart Analyzer', 'Layers Benchmark Tool'],
  },
  // People Quadrant
  {
    id: 'people-skills',
    quadrant: 'people',
    title: 'Skills & Capability Building',
    description: 'Develop the competencies needed for the future organization',
    interventions: [
      'Skills gap analysis',
      'Learning pathway design',
      'Talent marketplace implementation',
    ],
    tools: ['Skills Matrix', 'Capability Framework', 'Learning Journey Map'],
  },
  {
    id: 'people-workforce',
    quadrant: 'people',
    title: 'Workforce Planning',
    description: 'Strategic planning for workforce size, location, and composition',
    interventions: [
      'Demand forecasting',
      'Location strategy',
      'Contingent workforce optimization',
    ],
    tools: ['Workforce Model', 'Location Scorecard', 'Talent Flow Analysis'],
  },
  // Process Quadrant
  {
    id: 'process-workflows',
    quadrant: 'process',
    title: 'Workflow & Handoff Design',
    description: 'Streamline cross-functional processes and eliminate friction points',
    interventions: [
      'Process mapping and redesign',
      'Handoff optimization',
      'Automation opportunity identification',
    ],
    tools: ['Process Canvas', 'Handoff Checklist', 'Automation Readiness Assessment'],
  },
  {
    id: 'process-performance',
    quadrant: 'process',
    title: 'Performance Management',
    description: 'Align individual performance with organizational objectives',
    interventions: [
      'OKR implementation',
      'Continuous feedback systems',
      'Performance calibration',
    ],
    tools: ['OKR Template', 'Feedback Framework', 'Calibration Guide'],
  },
  // Mindset Quadrant
  {
    id: 'mindset-culture',
    quadrant: 'mindset',
    title: 'Culture & Ways of Working',
    description: 'Shape behaviors and norms that support the desired organization',
    interventions: [
      'Culture diagnostic and design',
      'Behavioral norm setting',
      'Ritual and ceremony design',
    ],
    tools: ['Culture Canvas', 'Behavior Cards', 'Ritual Playbook'],
  },
  {
    id: 'mindset-leadership',
    quadrant: 'mindset',
    title: 'Leadership Development',
    description: 'Build leaders who can navigate and drive organizational change',
    interventions: [
      'Leadership assessment',
      'Executive coaching',
      'Transition planning',
    ],
    tools: ['Leadership 360', 'Coaching Framework', 'Transition Roadmap'],
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
    items: ['Ways of Working', 'Comms & Engagement', 'Routines'],
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

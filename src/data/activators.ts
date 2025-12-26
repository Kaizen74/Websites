import type { Activator } from '../types';

export const activators: Activator[] = [
  {
    id: 1,
    title: 'Unique Value-Adding Layers',
    tagline: 'Each level makes a distinct contribution',
    principles: [
      'Minimum layers for speed and delegation',
      "Clear 'anchor layer' for P&L decisions",
      "Defined 'docking stations' for global-local interaction",
      'Each layer adds unique value rather than duplicating work',
      'Spans of control optimized for decision speed',
    ],
    healthySignals: [
      'Decisions made without excessive escalation',
      'Clear accountability at each level',
      'Information flows quickly up and down',
      'Managers spend time on strategic work, not approvals',
    ],
    dysfunctionSignals: [
      "'Manager of managers' with 1-2 reports",
      'Multiple approval layers for routine decisions',
      'Unclear which level owns what decisions',
      'Bottlenecks at specific organizational layers',
    ],
  },
  {
    id: 2,
    title: 'Innovation & Execution Networks',
    tagline: 'Best ideas move fast across boundaries',
    principles: [
      'Center-led coordination (not centralized)',
      'Hub-and-spoke capability sharing',
      'Lift-and-shift mechanisms for scaling',
      'Communities of practice across silos',
      'Innovation pipelines connected to execution',
    ],
    healthySignals: [
      'Ideas scale from local to global naturally',
      'Best practices shared proactively',
      'Cross-functional teams form easily',
      'Innovation happens at all levels',
    ],
    dysfunctionSignals: [
      'Siloed operations, duplicated effort',
      'Good ideas die in local units',
      '"Not invented here" syndrome',
      'Centers disconnect from market reality',
    ],
  },
  {
    id: 3,
    title: 'The Business Handshake',
    tagline: 'Interlocked plans with shared accountability',
    principles: [
      'Joint planning between global and regional teams',
      'Performance visibility (single source of truth)',
      'Co-owned business results',
      'Clear escalation paths when plans diverge',
      'Regular rhythm of alignment meetings',
    ],
    healthySignals: [
      'Global and local share accountability',
      'Plans cascade clearly with buy-in',
      'Performance data trusted by all',
      'Conflicts resolved at appropriate levels',
    ],
    dysfunctionSignals: [
      "Plans don't cascade; 'not my problem' culture",
      'Finger-pointing when results miss',
      'Multiple versions of truth',
      'HQ dictates without local input',
    ],
  },
  {
    id: 4,
    title: 'Power, Governance & Decision-Making',
    tagline: 'Right balance between agility and leverage',
    principles: [
      'Effective governance forums',
      'Clear decision rights for matrix relationships',
      'Delegation through formal and cultural mechanisms',
      'RACI/FOAL frameworks actually used',
      'Balance between global scale and local speed',
    ],
    healthySignals: [
      'Decisions at appropriate levels',
      'Governance adds value, not bureaucracy',
      'Matrix relationships work smoothly',
      'Power balanced across dimensions',
    ],
    dysfunctionSignals: [
      'Everything escalates to ExCo',
      'Decision rights unclear in the matrix',
      'Governance forums become rubber stamps',
      'Power concentrated or fragmented',
    ],
  },
  {
    id: 5,
    title: 'Matrix-Ready Leaders',
    tagline: 'Leaders who thrive in complexity',
    principles: [
      'Learning agility, trust-building, influence',
      'Development through experience',
      'Executive engagement modeling behaviors',
      'Comfort with ambiguity and shared power',
      'Collaborative mindset over territorial control',
    ],
    healthySignals: [
      'Leaders navigate ambiguity, build trust',
      'Influence works across reporting lines',
      'Executives model collaborative behaviors',
      'Leaders develop other matrix-ready leaders',
    ],
    dysfunctionSignals: [
      'Functional fiefdoms, say-do gap',
      'Leaders hoard information and power',
      'Command-and-control in a matrix',
      'Leaders avoid shared accountability',
    ],
  },
];

export default activators;

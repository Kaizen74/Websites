import type { DiagnosticQuestion } from '../types';

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // STRUCTURE AND ACCOUNTABILITIES (3 questions)
  {
    id: 'S1',
    dimension: 'structure',
    text: 'Critical work deliverables are completed on time without requiring frequent workarounds or escalations',
  },
  {
    id: 'S2',
    dimension: 'structure',
    text: 'Important decisions are made at the right organizational level— they are neither bottlenecked at the top nor fragmented at the bottom',
  },
  {
    id: 'S3',
    dimension: 'structure',
    text: 'Frontline and middle managers make important decisions within their areas without routinely seeking senior approval first',
  },

  // PEOPLE AND SKILLS (4 questions)
  {
    id: 'P1',
    dimension: 'people',
    text: 'We have identified the critical skills needed to execute on our strategy',
  },
  {
    id: 'P2',
    dimension: 'people',
    text: 'We can pursue strategic opportunities without being constrained by lack of necessary skills or expertise',
  },
  {
    id: 'P3',
    dimension: 'people',
    text: 'Cross-functional skills (e.g. leadership, collaboration, influence, stakeholder management etc) are systematically developed across the organization',
  },
  {
    id: 'P4',
    dimension: 'people',
    text: 'We retain our best performers and have strong succession depth for critical roles',
  },

  // PROCESSES & SYSTEMS (5 questions)
  {
    id: 'PR1',
    dimension: 'process',
    text: 'We spend most of our time executing planned work rather than firefighting and dealing with exceptions',
  },
  {
    id: 'PR2',
    dimension: 'process',
    text: "Our systems and digital tools adequately support people's work, so they don't need to create informal workarounds or parallel processes",
  },
  {
    id: 'PR3',
    dimension: 'process',
    text: 'Handoffs between teams or functions are smooth, with clear expectations and minimal friction',
  },
  {
    id: 'PR4',
    dimension: 'process',
    text: 'Individual performance goals are systematically developed from team priorities, which are translated from organizational strategy',
  },
  {
    id: 'PR5',
    dimension: 'process',
    text: 'Meetings are well organized with clear cadence, agendas and outcomes',
  },

  // MINDSET & BEHAVIORS (4 questions)
  {
    id: 'M1',
    dimension: 'mindset',
    text: "Leaders' day-to-day behaviours and priorities demonstrate the people values we publicly state",
  },
  {
    id: 'M2',
    dimension: 'mindset',
    text: 'People who demonstrate our stated people values receive visible recognition from leadership',
  },
  {
    id: 'M3',
    dimension: 'mindset',
    text: 'When there is disagreement on an issue, we discuss them openly and constructively',
  },
  {
    id: 'M4',
    dimension: 'mindset',
    text: 'People regularly volunteer for challenging assignments, propose improvements, and persist through obstacles rather than doing the minimum required',
  },

  // LEADERSHIP (2 questions)
  {
    id: 'L1',
    dimension: 'leadership',
    text: 'Senior leaders regularly and consistently communicate organizational strategy and priorities across all levels of the organization',
  },
  {
    id: 'L2',
    dimension: 'leadership',
    text: 'Leaders at all levels actively translate organizational strategy into specific, relevant goals and priorities for their teams',
  },
];

export default diagnosticQuestions;

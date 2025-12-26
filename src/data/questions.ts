import type { DiagnosticQuestion } from '../types';

export const diagnosticQuestions: DiagnosticQuestion[] = [
  // STRUCTURE (4 questions)
  {
    id: 'S1.2',
    dimension: 'structure',
    text: 'When problems arise, it is clear who owns the resolution.',
  },
  {
    id: 'S2.1',
    dimension: 'structure',
    text: 'We are vigilant about removing unnecessary organizational layers that slow decision-making.',
  },
  {
    id: 'S3.2',
    dimension: 'structure',
    text: 'Employees clearly understand which decisions they can make autonomously vs. those requiring approval.',
  },
  {
    id: 'S3.4',
    dimension: 'structure',
    text: "When multiple people are involved in a decision, it's clear who has final say.",
  },

  // PEOPLE (4 questions)
  {
    id: 'P1.5',
    dimension: 'people',
    text: 'High performers are clearly differentiated and rewarded appropriately.',
  },
  {
    id: 'P2.1',
    dimension: 'people',
    text: 'We have identified the critical skills needed to execute our strategy.',
  },
  {
    id: 'P2.5',
    dimension: 'people',
    text: 'Cross-functional skills (collaboration, influence, stakeholder management) are systematically developed.',
  },
  {
    id: 'P3.2',
    dimension: 'people',
    text: 'All employees feel a genuine sense of belonging and inclusion.',
  },

  // PROCESS (4 questions)
  {
    id: 'PR1.2',
    dimension: 'process',
    text: 'Handoffs between teams or functions are smooth, with clear expectations and minimal friction.',
  },
  {
    id: 'PR2.2',
    dimension: 'process',
    text: 'Meetings are well-organized with clear agendas and outcomes.',
  },
  {
    id: 'PR3.2',
    dimension: 'process',
    text: 'Critical data is accessible, accurate, and timely when needed for decision-making.',
  },
  {
    id: 'PR3.4',
    dimension: 'process',
    text: "The systems I use work well together (I don't have to re-enter data in multiple places).",
  },

  // MINDSET (4 questions)
  {
    id: 'M1.2',
    dimension: 'mindset',
    text: 'Cross-functional collaboration happens naturally without excessive coordination overhead.',
  },
  {
    id: 'M1.4',
    dimension: 'mindset',
    text: 'I feel comfortable suggesting new ways of doing things.',
  },
  {
    id: 'M2.2',
    dimension: 'mindset',
    text: 'Two-way communication is encouraged; employees feel heard when they raise concerns.',
  },
  {
    id: 'M3.1',
    dimension: 'mindset',
    text: 'Exemplary contributions and behaviors are recognized and celebrated.',
  },

  // LEADERSHIP (4 questions)
  {
    id: 'L1.1',
    dimension: 'leadership',
    text: 'The top leadership team communicates a clear and compelling company vision.',
  },
  {
    id: 'L2.2',
    dimension: 'leadership',
    text: 'Leaders motivate and develop their teams effectively.',
  },
  {
    id: 'L2.5',
    dimension: 'leadership',
    text: 'When facing uncertainty, leaders still make timely decisions and move forward.',
  },
  {
    id: 'L3.3',
    dimension: 'leadership',
    text: 'Leaders create an environment of psychological safety where people can speak up.',
  },
];

export default diagnosticQuestions;

// Answer-shaped headings for playbook sections 4.1 to 4.3 (Phase 6 rows 5–7,
// approved 2026-11-19). Each heading is the question a reader types; each
// answer is the first sentence under it and answers it in full, in 40 words
// or fewer. The numbered eyebrows above them are unchanged.

export interface SectionAnswer {
  heading: string;
  answer: string;
}

export const frameworkAnswer: SectionAnswer = {
  heading: 'What makes an organization design work?',
  // "move as one system" rather than the proposal's "change together", to match
  // principle 2 as reworded the same day ("not all at once")
  answer:
    'Structure, people, process and mindset move as one system around a leadership core, expressed through the organization’s culture values. I map those four domains in the Integrated Organizational Capability and Change Framework.',
};

export const activatorsAnswer: SectionAnswer = {
  heading: 'What turns an organization design into performance?',
  answer:
    'Five activators, adapted from Kesler and Kates: value-adding layers, innovation and execution networks, the business handshake, governance and decision rights, and matrix-ready leaders.',
};

export const changeAnswer: SectionAnswer = {
  heading: 'How do you make organizational change stick?',
  answer:
    'Pull three levers at once. Communicate a future people can picture, co-create the design with the people who will run it, and set a cadence of rituals that reinforce the new behaviors.',
};

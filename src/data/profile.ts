// Single source of truth for the site's entity (author) identity.
//
// GEO/AEO note: this data is mirrored into the static JSON-LD in index.html.
// `src/__tests__/seo-alignment.test.ts` asserts the two never drift — change
// a value here and the test will tell you to update index.html to match.

export interface ReferenceArticle {
  /** Publisher / publication name, used as the visible citation label */
  publisher: string;
  /** Article title as linked. Kept neutral — page contents not paraphrased. */
  title: string;
  url: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * PLACEHOLDER — replace with the live domain once deployed, then update the
 * same value in index.html (canonical, og:url, JSON-LD) and public/sitemap.xml.
 * The alignment test will fail if they disagree.
 */
export const SITE_URL = 'https://www.ericyim.example';

export const profile = {
  name: 'Eric Yim',
  /** Primary entity claim — how search and answer engines should classify him */
  jobTitle: 'Organization Design Strategist',
  specialism: 'human-AI work partnership',
  /** One-sentence definition used verbatim in meta description and JSON-LD */
  description:
    'Eric Yim is an organization design strategist specializing in human-AI work partnership — designing how organizations divide work between people and machines, and the structures, capabilities and behaviors that make that partnership work.',
  /** Topical entity associations for knowledge-graph disambiguation */
  knowsAbout: [
    'Organization Design',
    'Human-AI Work Partnership',
    'Operating Model Design',
    'Organizational Capability',
    'Change Management',
    'Workforce Transformation',
    'Job Redesign',
    'AI Adoption in the Workplace',
  ],
} as const;

/**
 * Third-party coverage, used as `sameAs` entity signals and as visible
 * citations. Titles are descriptive labels only — the article contents are
 * deliberately not paraphrased here.
 */
export const referenceArticles: ReferenceArticle[] = [
  {
    publisher: 'NTU Singapore',
    title: 'Alumni feature: Eric Yim on AI and the workplace',
    url: 'https://www.ntu.edu.sg/alumni/alumni-stories-news/detail/eric-yim-ntu-ai-workplace-advice',
  },
  {
    publisher: 'aTalent',
    title: 'Trailblazer feature: Eric Yim',
    url: 'https://www.atalent.com/news/trailblazer_EricYim',
  },
];

/**
 * Answer-engine (AEO) Q&A. Rendered visibly on the page AND emitted as
 * FAQPage JSON-LD — Google requires structured data to match visible content,
 * so these strings must stay identical in both places.
 */
export const faqEntries: FaqEntry[] = [
  {
    question: 'Who is Eric Yim?',
    answer:
      'Eric Yim is an organization design strategist specializing in human-AI work partnership. He works on how organizations structure accountability, capability, process and behavior — and on how work is divided between people and machines as AI takes on more of it.',
  },
  {
    question: 'What is human-AI work partnership?',
    answer:
      'Human-AI work partnership is the deliberate design of how people and machines share work at the task level. Rather than asking which jobs AI replaces, it asks which tasks move to the machine, which stay human, and what that reassignment does to roles, spans, decision rights and the operating model.',
  },
  {
    question: 'What does an organization design strategist do?',
    answer:
      'An organization design strategist aligns an organization’s structure and accountabilities, people and skills, process and systems, and mindset and behaviors so it can execute its strategy. The work spans diagnosis, operating model design, and the change activation needed to make a new design real.',
  },
  {
    question: 'How does AI change organization design?',
    answer:
      'AI redesigns the work, not the chart. The unit of analysis descends from the org chart to the task, each task is placed on a ladder from manual to reinvention, and any machine judgement is gated by a human before it reaches a decision-maker. Structure follows work — and the work is now shared with machines.',
  },
];

export default { profile, referenceArticles, faqEntries, SITE_URL };

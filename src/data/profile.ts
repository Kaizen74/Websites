// Single source of truth for the site's entity (author) identity.
//
// GEO/AEO note: this data is mirrored into the static JSON-LD in index.html.
// `src/__tests__/seo-alignment.test.ts` asserts the two never drift — change
// a value here and the test will tell you to update index.html to match.
//
// PROVENANCE: every biographical fact below is sourced from one of the two
// published features listed in `referenceArticles`. Nothing is inferred.

export interface ReferenceArticle {
  publisher: string;
  title: string;
  url: string;
  /** ISO date, where the article states one */
  datePublished?: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SourcedQuote {
  text: string;
  /** Publisher of the article the quote is taken from */
  source: string;
}

export interface CredentialEntry {
  label: string;
  detail: string;
}

/**
 * PLACEHOLDER — replace with the live domain once deployed, then update the
 * same value in index.html (canonical, og:url, JSON-LD) and public/sitemap.xml.
 * The alignment test will fail if they disagree.
 */
export const SITE_URL = 'https://www.ericyim.example';

/** Bump when the entity content changes — feeds schema freshness signals. */
export const CONTENT_LAST_MODIFIED = '2026-08-26';

export const profile = {
  name: 'Eric Yim',
  /** Primary entity claim — how search and answer engines should classify him */
  jobTitle: 'Organization Design Strategist',
  specialism: 'human-AI work partnership',
  /** Verified: aTalent states "Global Head of OD and Talent" */
  featuredRole: 'Global Head of OD and Talent',
  /** One-sentence definition used verbatim in meta description and JSON-LD */
  description:
    'Eric Yim is an organization design strategist specializing in human-AI work partnership — designing how organizations divide work between people and machines, and the structures, capabilities and behaviors that make that partnership work.',
  /** Longer bio. Every clause is sourced from the two features below. */
  bio:
    'Eric Yim has spent 25 years in the gap between diagnosing an organization and redesigning it. He graduated from Nanyang Business School in 1998 specializing in financial analysis, began in corporate banking, and moved into organizational development through knowledge management in the public sector — an unusual route that gave him a systems view of organizations. Today he works at the intersection of organizational development and AI adoption in the workplace, focusing on end-to-end organization design across structure, process, capability and culture.',
  alumniOf: {
    name: 'Nanyang Business School, Nanyang Technological University',
    shortName: 'Nanyang Technological University',
    url: 'https://www.ntu.edu.sg/',
    year: '1998',
  },
  /** Topical entity associations for knowledge-graph disambiguation */
  knowsAbout: [
    'Organization Design',
    'Human-AI Work Partnership',
    'Organizational Development',
    'Operating Model Design',
    'Organizational Capability',
    'Change Management',
    'Workforce Transformation',
    'Job Redesign',
    'AI Adoption in the Workplace',
    'Strategy Execution',
  ],
} as const;

/** Verified credentials — sourced, not inferred. */
export const credentials: CredentialEntry[] = [
  {
    label: 'Nanyang Business School, NTU · 1998',
    detail: 'Graduated with a specialization in financial analysis.',
  },
  {
    label: 'Certificate in Prompt Engineering',
    detail: 'Applied to organizational development practice.',
  },
  {
    label: '25 years in organizational development',
    detail: 'Working between diagnosis and organizational redesign.',
  },
];

/**
 * Third-party coverage, used as `sameAs` / `subjectOf` entity signals and as
 * visible citations. Titles and dates are as published.
 */
export const referenceArticles: ReferenceArticle[] = [
  {
    publisher: 'NTU Singapore',
    title: 'AI is a multiplier, and not a shortcut',
    url: 'https://www.ntu.edu.sg/alumni/alumni-stories-news/detail/eric-yim-ntu-ai-workplace-advice',
  },
  {
    publisher: 'aTalent',
    title:
      'Most OD Practitioners Hand Leaders a Report. Eric Yim Hands Them a System.',
    url: 'https://www.atalent.com/news/trailblazer_EricYim',
    datePublished: '2026-07-17',
  },
];

/**
 * Quotable, attributable statements. Answer engines preferentially surface
 * short attributed quotes, so these are rendered visibly with their source.
 */
export const quotes: SourcedQuote[] = [
  {
    text: 'My life mission is to build effective organisations.',
    source: 'aTalent',
  },
  {
    text: 'Zero multiplied by any number is still zero.',
    source: 'NTU Singapore',
  },
  {
    text: 'The point that we should be striving towards is discerning the right time and place to use AI.',
    source: 'NTU Singapore',
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
      'Eric Yim is an organization design strategist specializing in human-AI work partnership. He has spent 25 years working between organizational diagnosis and redesign, and works at the intersection of organizational development and AI adoption in the workplace.',
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
  {
    question: 'What is Eric Yim’s background?',
    answer:
      'Eric Yim graduated from Nanyang Business School in 1998 with a specialization in financial analysis and began his career in corporate banking. He moved into organizational development through knowledge management in the public sector, which gave him a systems view of organizations as living systems rather than org charts.',
  },
  {
    question: 'Why does Eric Yim say AI is a multiplier and not a shortcut?',
    answer:
      'Because a multiplier amplifies whatever expertise already exists — and zero multiplied by any number is still zero. AI is most valuable to people with deep domain expertise to amplify, not to those merely quickest to adopt the tools. The discipline is discerning the right time and place to use AI.',
  },
];

export default {
  profile,
  credentials,
  referenceArticles,
  quotes,
  faqEntries,
  SITE_URL,
  CONTENT_LAST_MODIFIED,
};

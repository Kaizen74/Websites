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

export interface CareerEntry {
  organization: string;
  role: string;
  period: string;
}

/**
 * Canonical host. Per the AI-search-visibility spec §4.1 this is the ONLY
 * absolute origin the site may emit: https scheme, www subdomain, no trailing
 * slash on the origin. The preview host and the bare apex are both forbidden —
 * see `host-canonical.test.ts`, which enumerates them and fails if any appears
 * in an emitted surface. Mirrored in index.html (canonical, og:url, JSON-LD),
 * public/robots.txt and public/sitemap.xml; `seo-alignment.test.ts` fails if
 * those copies disagree with this constant.
 */
export const SITE_URL = 'https://www.ericyim.sg';

/** Bump when the entity content changes — feeds schema freshness signals. */
export const CONTENT_LAST_MODIFIED = '2026-08-27';

export const profile = {
  name: 'Eric Yim',
  /** Primary entity claim — how search and answer engines should classify him */
  jobTitle: 'Organization Design Strategist',
  /**
   * Every title this person is described by across sources. Emitted as a
   * schema.org jobTitle array so entity-resolution engines see the site,
   * LinkedIn and the press features as ONE consistent entity rather than a
   * conflict. Order matters: the positioning claim leads.
   */
  jobTitles: [
    'Organization Design Strategist',
    'Global Head of OD and Talent',
    'Global OD, OE and Talent Leader',
  ],
  specialism: 'human-AI work partnership',
  /** Verified: LinkedIn + aTalent */
  featuredRole: 'Global Head of OD and Talent',
  /** Verified: LinkedIn — current employer since December 2024 */
  worksFor: 'SATS Ltd.',
  /** Verified: LinkedIn */
  location: 'Singapore',
  /** Verified: LinkedIn summary, in his own words */
  linkedInSummary:
    'Global OD and Talent leader experienced in building effective organisations and leading people with AI transformation.',
  /**
   * SERP snippet. Spec §4.2 caps this at 140–160 characters — search results
   * truncate around 155, so the longer `description` below would be cut
   * mid-sentence. Deliberately separate: this is the snippet, `description`
   * is the entity definition. Length is enforced by host-canonical.test.ts.
   */
  metaDescription:
    'Eric Yim is an organization design strategist specializing in human-AI work partnership: how organizations divide work between people and machines.',
  /** Full entity definition — used in JSON-LD and the visible About section */
  description:
    'Eric Yim is an organization design strategist specializing in human-AI work partnership — designing how organizations divide work between people and machines, and the structures, capabilities and behaviors that make that partnership work.',
  /**
   * One-line experience proof shown in the curated About section. The full
   * `bio` and `career` below remain the machine-facing record (llms.txt and
   * the consistency guard) — they are deliberately not rendered, to keep the
   * visible section elegant without weakening the entity.
   */
  experienceSummary:
    '25 years in organizational development — across Shell, Cargill, L’Oréal and the Singapore public sector.',
  /** Longer bio. Every clause is sourced from the two features below. */
  bio:
    'Eric Yim has spent 25 years in the gap between diagnosing an organization and redesigning it. He graduated from Nanyang Technological University in 1998 specializing in financial analysis, began in corporate banking, and moved into organizational development through the public sector — an unusual route that gave him a systems view of organizations. He has since led organization development and effectiveness work at L’Oréal, Shell and Cargill across Asia-Pacific, EMEA and the Middle East, and is now Global Head of OD and Talent at SATS Ltd. in Singapore, working at the intersection of organizational development and AI adoption in the workplace.',
  alumniOf: {
    name: 'Nanyang Technological University Singapore',
    shortName: 'Nanyang Technological University',
    url: 'https://www.ntu.edu.sg/',
    year: '1998',
  },
  /** All institutions, verified from LinkedIn education */
  education: [
    {
      institution: 'Nanyang Technological University Singapore',
      url: 'https://www.ntu.edu.sg/',
      qualification: 'Bachelor of Business — Financial Analysis',
      period: '1995–1998',
    },
    {
      institution: 'University of North Texas',
      url: 'https://www.unt.edu/',
      qualification: 'Business and Organisation Anthropology',
      period: '2020–2022',
    },
  ],
  /**
   * Awards, most recent first. Verified from LinkedIn. Each names the awarding
   * programme, tier, category, year and the organization the work was done in
   * — accurate attribution matters more than a bigger-sounding claim.
   */
  awards: [
    'SHRI Singapore HR Awards 2025 — Gold, Talent Management & Acquisition (SATS Ltd.)',
    'Global Brandon Hall Silver Excellence for Blended Learning (2018, Shell Business Operations)',
  ],
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
    'Leadership Development',
    'Diversity and Inclusion',
  ],
  /**
   * The subset shown as chips in the About section. `knowsAbout` above stays
   * complete for the knowledge graph and llms.txt; this keeps the visible
   * section from becoming a tag cloud. Must be a subset — enforced by test.
   */
  featuredTopics: [
    'Organization Design',
    'Human-AI Work Partnership',
    'Operating Model Design',
    'Change Management',
    'Job Redesign',
    'AI Adoption in the Workplace',
  ],
} as const;

/**
 * Career track, verified from LinkedIn. Establishes the depth behind the
 * entity claim and corroborates the press features (corporate banking start;
 * public-sector route into OD).
 */
export const career: CareerEntry[] = [
  {
    organization: 'SATS Ltd.',
    role: 'Global Head of OD and Talent',
    period: 'Dec 2024 – present',
  },
  {
    organization: 'Shell',
    role: 'Global Head of OD and Learning, Shell Lubricants',
    period: '2021 – 2024',
  },
  {
    organization: 'Shell',
    role: 'Head of OD and Learning, Qatar Shell',
    period: '2019 – 2021',
  },
  {
    organization: 'Shell',
    role: 'Global Head of OD & Learning, Shell Business Operations',
    period: '2015 – 2019',
  },
  {
    organization: 'Cargill',
    role: 'Senior Consultant, Organization Effectiveness APAC & EMEA',
    period: '2011 – 2015',
  },
  {
    organization: 'Civil Service College',
    role: 'Consulting Manager',
    period: '2000 – 2006',
  },
  {
    organization: 'Mizuho',
    role: 'Relationship Manager, Corporate Banking',
    period: '1997 – 2000',
  },
];

/**
 * Owned profiles elsewhere on the web. These are `sameAs` identity signals:
 * they tell entity-resolution engines that the site, LinkedIn and the press
 * coverage all describe one person.
 */
export const ownedProfiles: ReferenceArticle[] = [
  {
    publisher: 'LinkedIn',
    title: 'Eric Yim — Global OD, OE and Talent Leader',
    url: 'https://www.linkedin.com/in/eric-yim-743910',
  },
];

/** Verified credentials — sourced, not inferred. */
export const credentials: CredentialEntry[] = [
  {
    label: 'Nanyang Technological University · 1998',
    detail: 'Bachelor of Business, specializing in financial analysis.',
  },
  {
    label: 'University of North Texas · 2022',
    detail: 'Business and Organisation Anthropology.',
  },
  {
    label: 'Certified Prompt Engineer™',
    detail: 'Applied to organizational development practice.',
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
      'Eric Yim graduated from Nanyang Technological University in 1998 with a Bachelor of Business specializing in financial analysis, and began his career in corporate banking at Mizuho. He moved into organizational development through the Civil Service College, then held organization development and effectiveness roles at L’Oréal, Shell and Cargill before becoming Global Head of OD and Talent at SATS Ltd.',
  },
  {
    question: 'Where does Eric Yim work?',
    answer:
      'Eric Yim is Global Head of OD and Talent at SATS Ltd. in Singapore, which he joined in December 2024. He previously spent over nine years at Shell in global and regional organizational development leadership roles, and four years at Cargill in organization effectiveness consulting.',
  },
  {
    question: 'Why does Eric Yim say AI is a multiplier and not a shortcut?',
    answer:
      'Because a multiplier amplifies whatever expertise already exists — and zero multiplied by any number is still zero. AI is most valuable to people with deep domain expertise to amplify, not to those merely quickest to adopt the tools. The discipline is discerning the right time and place to use AI.',
  },
];

export default {
  profile,
  career,
  credentials,
  ownedProfiles,
  referenceArticles,
  quotes,
  faqEntries,
  SITE_URL,
  CONTENT_LAST_MODIFIED,
};

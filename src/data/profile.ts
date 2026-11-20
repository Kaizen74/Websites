// Single source of truth for the site's entity (author) identity.
//
// GEO/AEO note: this data is mirrored into the static JSON-LD in index.html.
// `src/__tests__/seo-alignment.test.ts` asserts the two never drift — change
// a value here and the test will tell you to update index.html to match.
//
// PROVENANCE: every biographical fact below is sourced from one of the two
// published features listed in `referenceArticles`. Nothing is inferred.

import { principleNames } from './principles';

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

/**
 * Bump when the entity content changes — feeds schema freshness signals.
 *
 * Full ISO 8601 with an explicit UTC offset. Google parses `dateModified` on
 * ProfilePage as a *datetime*, and a bare `YYYY-MM-DD` carries no time and no
 * offset, so it cannot be resolved to an instant — Search Console reports
 * "Invalid datetime value" for it. Singapore is UTC+08:00.
 *
 * The time component is a convention, not a claim: content freshness is
 * tracked at day resolution here, so this is midnight SGT on that day rather
 * than an invented clock time (spec constraint 6 — never guess a value).
 */
export const CONTENT_LAST_MODIFIED_ISO = '2026-11-19T00:00:00+08:00';

/**
 * Date-only form, derived so the two can never disagree.
 * Sitemaps use W3C Datetime, where a plain date is the correct and conventional
 * form for <lastmod> — that surface must NOT gain a time component.
 */
export const CONTENT_LAST_MODIFIED = CONTENT_LAST_MODIFIED_ISO.slice(0, 10);

/**
 * Copyright year, derived from the content date rather than `new Date()`.
 * A live clock read during render is a hydration hazard: the prerendered HTML
 * bakes in the build-time year, and a client rendering across a New Year
 * boundary would mismatch it. Derived here so server and client always agree.
 */
export const COPYRIGHT_YEAR = CONTENT_LAST_MODIFIED.slice(0, 4);

export const profile = {
  name: 'Eric Yim',
  /** Primary entity claim — how search and answer engines should classify him */
  jobTitle: 'Organisation Design Strategist',
  /**
   * Every title this person is described by across sources. Emitted as a
   * schema.org jobTitle array so entity-resolution engines see the site,
   * LinkedIn and the press features as ONE consistent entity rather than a
   * conflict. Order matters: the positioning claim leads.
   */
  jobTitles: [
    'Organisation Design Strategist',
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
    'Eric Yim writes about organisation design and AI transformation from Singapore: how organisations should change when people and machines share the work.',
  /**
   * Tells this Eric Yim apart from others who share the name (an answer
   * engine has cited a namesake's LinkedIn post). Only facts already public
   * on this site and his LinkedIn: no new employer detail. Emitted as
   * Person.disambiguatingDescription and as the llms.txt identity note.
   */
  disambiguatingDescription:
    'The Singapore-based organisation design and talent leader who writes about AI transformation and human-AI work partnership; Global Head of OD and Talent at SATS Ltd., with 25 years in organisational development across Shell, Cargill and the Singapore public sector; Nanyang Technological University, 1998; LinkedIn: eric-yim-743910.',
  /** The LinkedIn public profile ID: a stable identifier no namesake shares */
  linkedInId: 'eric-yim-743910',
  /** Full entity definition — used in JSON-LD and the visible About section */
  description:
    'Eric Yim is a Singapore-based organisation design strategist who writes about AI transformation and human-AI work partnership: how organisations divide work between people and machines, and the structures, capabilities and behaviours that make that partnership work.',
  /**
   * One-line experience proof shown in the curated About section. The full
   * `bio` and `career` below remain the machine-facing record (llms.txt and
   * the consistency guard) — they are deliberately not rendered, to keep the
   * visible section elegant without weakening the entity.
   */
  /**
   * First-person note for human readers, shown above the third-person entity
   * definition. Facts are sourced (banking → public sector route: NTU feature
   * and bio; anthropology: University of North Texas, 2022). The closing line
   * is voice, not a factual claim.
   */
  firstPersonNote:
    'I came to organisation design through corporate banking and the public sector, and later studied business and organisational anthropology. That route left me with a habit I still rely on. I look at how the work really runs before I look at the org chart.',
  experienceSummary:
    '25 years in organisational development, across Shell, Cargill, L’Oréal and the Singapore public sector.',
  /** Longer bio. Every clause is sourced from the two features below. */
  bio:
    'Eric Yim has spent 25 years in the gap between diagnosing an organisation and redesigning it. He graduated from Nanyang Technological University in 1998 specialising in financial analysis, began in corporate banking, and moved into organisational development through the public sector, an unusual route that gave him a systems view of organisations. He has since led organisation development and effectiveness work at L’Oréal, Shell and Cargill across Asia-Pacific, EMEA and the Middle East, and is now Global Head of OD and Talent at SATS Ltd. in Singapore, working at the intersection of organisational development and AI adoption in the workplace.',
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
   * programme, tier, category, year and the organisation the work was done in
   * — accurate attribution matters more than a bigger-sounding claim.
   */
  awards: [
    'SHRI Singapore HR Awards 2025 — Gold, Talent Management & Acquisition (SATS Ltd.)',
    'Global Brandon Hall Silver Excellence for Blended Learning (2018, Shell Business Operations)',
  ],
  /** Topical entity associations for knowledge-graph disambiguation */
  knowsAbout: [
    'Organisation Design',
    // His own words on LinkedIn: "leading people with AI transformation"
    'AI Transformation',
    'Human-AI Work Partnership',
    'Organisational Development',
    'Operating Model Design',
    'Organisational Capability',
    'Change Management',
    'Workforce Transformation',
    'Job Redesign',
    'AI Adoption in the Workplace',
    'Strategy Execution',
    'Leadership Development',
    'Diversity and Inclusion',
    // US spelling of the first topic, so a search in either spelling matches
    'Organization Design',
  ],
  /**
   * The subset shown as chips in the About section. `knowsAbout` above stays
   * complete for the knowledge graph and llms.txt; this keeps the visible
   * section from becoming a tag cloud. Must be a subset — enforced by test.
   */
  featuredTopics: [
    'Organisation Design',
    'AI Transformation',
    'Human-AI Work Partnership',
    'Operating Model Design',
    'Change Management',
    'Job Redesign',
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
    detail: 'Bachelor of Business, specialising in financial analysis.',
  },
  {
    label: 'University of North Texas · 2022',
    detail: 'Business and Organisation Anthropology.',
  },
  {
    label: 'Certified Prompt Engineer™',
    detail: 'Applied to organisational development practice.',
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
      'Eric Yim is a Singapore-based organisation design strategist who writes about AI transformation and human-AI work partnership. He has spent 25 years working between organisational diagnosis and redesign, and works where organisational development meets AI adoption in the workplace.',
  },
  {
    question: 'What is human-AI work partnership?',
    answer:
      'Human-AI work partnership is the deliberate design of how people and machines share work at the task level. It asks which tasks move to the machine, which stay human, and what that reassignment does to roles, spans, decision rights and the operating model.',
  },
  {
    question: 'What does an organisation design strategist do?',
    answer:
      'An organisation design strategist aligns an organisation’s structure and accountabilities, people and skills, process and systems, and mindset and behaviours so it can execute its strategy. The work spans diagnosis, operating model design, and the change activation needed to make a new design real.',
  },
  {
    question: 'How does AI change organisation design?',
    answer:
      'AI redesigns the work, not the chart. It moves the unit of design from the org chart to the task. Each task goes on a ladder from manual to reinvented, and a person reviews every machine judgement before it reaches a decision-maker. Structure follows work, and work is now shared with machines.',
  },
  {
    question: 'How does Eric Yim think about AI transformation?',
    answer:
      'As organisation design work. The tools matter less than how work, roles and decisions are redesigned around them. He starts from the task, asks why units work differently before standardising anything, and keeps a person accountable for every machine judgement that reaches a decision.',
  },
  {
    question: 'What is Eric Yim’s background?',
    answer:
      'Eric Yim graduated from Nanyang Technological University in 1998 with a Bachelor of Business specialising in financial analysis, and began his career in corporate banking at Mizuho. He moved into organisational development through the Civil Service College, then held organisation development and effectiveness roles at L’Oréal, Shell and Cargill before becoming Global Head of OD and Talent at SATS Ltd.',
  },
  {
    question: 'Where does Eric Yim work?',
    answer:
      'Eric Yim is Global Head of OD and Talent at SATS Ltd. in Singapore, which he joined in December 2024. He previously spent over nine years at Shell in global and regional organisational development leadership roles, and four years at Cargill in organisation effectiveness consulting.',
  },
  {
    question: 'Why does Eric Yim say AI is a multiplier and not a shortcut?',
    answer:
      'Because a multiplier amplifies whatever expertise already exists, and zero multiplied by any number is still zero. AI adds most for people with deep domain expertise to amplify. Being quickest to adopt the tools counts for less. The discipline is discerning the right time and place to use AI.',
  },
  {
    question: 'What principles guide Eric Yim’s work?',
    // Built from src/data/principles.ts so the answer cannot drift from the page
    answer: `Eric Yim works from six principles: ${principleList()}. Each one maps to a part of his organisational design playbook.`,
  },
  {
    question: 'How does Eric Yim approach an organisation design engagement?',
    answer:
      'Eric Yim works in six stages: Frame, Focus, Find, Decide, Design and Deliver. The first three establish what is true: the criteria the design will be judged on, where capability is weak where the money is made, and how the work really runs and who really decides. In the last three, leaders decide what should be one way everywhere and how much AI should do, compare structure, role and system options against the agreed criteria, and check regularly that capability is rising.',
  },
  {
    question: 'What are required, chosen and inherited differences?',
    answer:
      'Required, chosen and inherited are Eric Yim’s three labels for why the same work ends up done differently across markets, sites or acquired units. A required difference is imposed by regulation, a customer contract or the physical site, so it stays local. A chosen difference was a deliberate local decision, so leaders decide whether to keep it or align it. An inherited difference came from history, an acquisition or habit and nobody decided it, so it should be harmonised. Two questions sort any difference: is it required, and was it decided on purpose?',
  },
];

/** "every diagnosis ends in a plan; …; and say what you know, and how you know it" */
function principleList(): string {
  const names = principleNames.map((n) => (n.startsWith('AI ') ? n : n[0].toLowerCase() + n.slice(1)));
  return `${names.slice(0, -1).join('; ')}; and ${names[names.length - 1]}`;
}

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
  CONTENT_LAST_MODIFIED_ISO,
};

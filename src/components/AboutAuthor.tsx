import { SECTION_IDS } from '../constants';
import {
  profile,
  credentials,
  ownedProfiles,
  referenceArticles,
  quotes,
  faqEntries,
} from '../data/profile';

const MICRO_LABEL = {
  fontSize: 11,
  letterSpacing: '.16em',
} as const;

/**
 * Author credibility + entity section (E-E-A-T / GEO / AEO).
 *
 * Deliberately curated: the full career history, complete topic list, long
 * bio and remaining quotes live in the structured data and /llms.txt, which
 * is what search and answer engines actually consume. Only the facts a human
 * reader needs are rendered here.
 *
 * The Q&A block is the exception — FAQPage markup must match visible page
 * content, so every schema question is rendered. Static; no interactivity.
 */
export function AboutAuthor() {
  const signatureQuote = quotes[0];

  return (
    <section
      id={SECTION_IDS.about}
      className="py-24"
      style={{
        background: 'var(--color-bg-white)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
          {/* ---------- Identity (sticky, as in the framework section) ---------- */}
          <div className="lg:sticky" style={{ top: 96 }}>
            <p className="eyebrow mb-4">About the author</p>
            <h2
              className="font-display font-bold text-[var(--color-ink)] mb-2"
              style={{ fontSize: 'clamp(28px, 3.6vw, 36px)', lineHeight: 1.15 }}
            >
              {profile.name}
            </h2>
            <p
              className="text-[var(--color-primary)] font-semibold"
              style={{ fontSize: 15 }}
            >
              {profile.jobTitle}
            </p>
            <p className="text-[var(--color-faint)] mb-5" style={{ fontSize: 13.5 }}>
              {profile.featuredRole}, {profile.worksFor} · {profile.location}
            </p>

            <p
              className="text-[var(--color-secondary)]"
              style={{ fontSize: 15, lineHeight: 1.65, textWrap: 'pretty' }}
            >
              {profile.description}
            </p>
            <p
              className="text-[var(--color-secondary)] mt-3"
              style={{ fontSize: 14, lineHeight: 1.6, textWrap: 'pretty' }}
            >
              {profile.experienceSummary}
            </p>

            {/* Qualifications, as one quiet line rather than a stacked list */}
            <p
              className="text-[var(--color-faint)] mt-4"
              style={{ fontSize: 12.5, lineHeight: 1.6 }}
            >
              {credentials.map((c) => c.label).join(' · ')}
            </p>

            {/* Featured topics — the full set stays in the knowledge graph */}
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0 mt-7">
              {profile.featuredTopics.map((topic) => (
                <li
                  key={topic}
                  className="text-[13px] text-[var(--color-ink)] px-3 py-1.5 rounded-full"
                  style={{ border: '1px solid var(--color-hairline)' }}
                >
                  {topic}
                </li>
              ))}
            </ul>

            {/* Profiles and coverage — the credibility proof */}
            <p
              className="uppercase font-semibold text-[var(--color-faint)] mt-8 mb-1"
              style={MICRO_LABEL}
            >
              Profiles &amp; coverage
            </p>
            <ul
              className="list-none p-0 m-0"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
            >
              {[...ownedProfiles, ...referenceArticles].map((article) => (
                <li
                  key={article.url}
                  style={{ borderBottom: '1px solid var(--color-hairline)' }}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener me"
                    className="flex items-baseline gap-3 py-3 group"
                  >
                    <span
                      className="uppercase font-semibold text-[var(--color-faint)] flex-shrink-0"
                      style={{ fontSize: 11, letterSpacing: '.14em', width: 92 }}
                    >
                      {article.publisher}
                    </span>
                    <span
                      className="flex-1 text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ fontSize: 13.5, lineHeight: 1.45 }}
                    >
                      {article.title} <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Signature quote + Q&A ---------- */}
          <div>
            <figure className="m-0 mb-12">
              <blockquote
                className="m-0 font-display italic text-[var(--color-ink)]"
                style={{ fontSize: 26, lineHeight: 1.4, textWrap: 'pretty' }}
              >
                “{signatureQuote.text}”
              </blockquote>
              <figcaption
                className="uppercase font-semibold text-[var(--color-faint)] mt-3"
                style={{ fontSize: 11, letterSpacing: '.14em' }}
              >
                {signatureQuote.source}
              </figcaption>
            </figure>

            <p
              className="uppercase font-semibold text-[var(--color-faint)] mb-5"
              style={MICRO_LABEL}
            >
              Common questions
            </p>
            <div style={{ borderTop: '1px solid var(--color-hairline)' }}>
              {faqEntries.map((entry) => (
                <div
                  key={entry.question}
                  className="py-5"
                  style={{ borderBottom: '1px solid var(--color-hairline)' }}
                >
                  <h3
                    className="font-display font-bold text-[var(--color-ink)] mb-1.5"
                    style={{ fontSize: 19, lineHeight: 1.25 }}
                  >
                    {entry.question}
                  </h3>
                  <p
                    className="text-[var(--color-secondary)]"
                    style={{ fontSize: 14.5, lineHeight: 1.6, textWrap: 'pretty' }}
                  >
                    {entry.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAuthor;

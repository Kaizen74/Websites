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
            <p className="eyebrow mb-4">About</p>
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

            {/* In his own voice first; the third-person entity text follows */}
            <p
              className="font-display text-[var(--color-ink)] mb-4"
              style={{ fontSize: 17, lineHeight: 1.5, fontStyle: 'italic', textWrap: 'pretty' }}
            >
              {profile.firstPersonNote}
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

          {/* ---------- Portrait + signature quote, then Q&A ---------- */}
          <div>
            <div className="grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-8 items-center mb-12">
              {/* width/height reserve the 4:5 box before the image loads: no layout shift */}
              <img
                src="/images/eric-yim-portrait.webp"
                width={640}
                height={800}
                alt="Eric Yim, organisation design strategist"
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
                style={{ maxWidth: 260, borderRadius: 2, border: '1px solid var(--color-hairline)' }}
              />
            <figure className="m-0">
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
            </div>

            <p
              className="uppercase font-semibold text-[var(--color-faint)] mb-5"
              style={MICRO_LABEL}
            >
              Common questions
            </p>
            <div style={{ borderTop: '1px solid var(--color-hairline)' }}>
              {/* Disclosure panels keep the page short; every answer stays in the
                  HTML, so crawlers and the FAQPage markup still see it */}
              {faqEntries.map((entry) => (
                <details
                  key={entry.question}
                  className="faq-item group"
                  style={{ borderBottom: '1px solid var(--color-hairline)' }}
                >
                  <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none">
                    <h3
                      className="font-display font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ fontSize: 19, lineHeight: 1.25 }}
                    >
                      {entry.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="faq-marker font-display text-[var(--color-primary)] flex-shrink-0"
                      style={{ fontSize: 22, lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="text-[var(--color-secondary)] pb-5"
                    style={{ fontSize: 14.5, lineHeight: 1.6, textWrap: 'pretty' }}
                  >
                    {entry.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAuthor;

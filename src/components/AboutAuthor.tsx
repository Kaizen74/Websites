import { SECTION_IDS } from '../constants';
import { profile, referenceArticles, faqEntries } from '../data/profile';

/**
 * Author credibility + entity section (E-E-A-T / GEO / AEO).
 *
 * The visible counterpart of the JSON-LD in index.html: the entity statement,
 * expertise, third-party coverage and Q&A rendered here use the same strings
 * as the structured data, because search engines require structured data to
 * match on-page content. Static content — no state, no interactivity.
 */
export function AboutAuthor() {
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
        <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-14 items-start">
          {/* Identity */}
          <div>
            <p className="eyebrow mb-4">About the author</p>
            <h2
              className="font-display font-bold text-[var(--color-ink)] mb-2"
              style={{ fontSize: 'clamp(28px, 3.6vw, 36px)', lineHeight: 1.15 }}
            >
              {profile.name}
            </h2>
            <p
              className="text-[var(--color-primary)] font-semibold mb-4"
              style={{ fontSize: 15 }}
            >
              {profile.jobTitle}
            </p>
            <p
              className="text-[var(--color-secondary)]"
              style={{ fontSize: 15, lineHeight: 1.65, textWrap: 'pretty' }}
            >
              {profile.description}
            </p>

            {/* Expertise — topical entity associations */}
            <p
              className="uppercase font-semibold text-[var(--color-faint)] mt-8 mb-3"
              style={{ fontSize: 11, letterSpacing: '.16em' }}
            >
              Areas of expertise
            </p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {profile.knowsAbout.map((topic) => (
                <li
                  key={topic}
                  className="text-[13px] text-[var(--color-ink)] px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--color-bg-white)',
                    border: '1px solid var(--color-hairline)',
                  }}
                >
                  {topic}
                </li>
              ))}
            </ul>

            {/* Third-party coverage — credibility signals */}
            <p
              className="uppercase font-semibold text-[var(--color-faint)] mt-8 mb-3"
              style={{ fontSize: 11, letterSpacing: '.16em' }}
            >
              Featured in
            </p>
            <ul className="list-none p-0 m-0">
              {referenceArticles.map((article, i) => (
                <li
                  key={article.url}
                  style={{
                    borderTop: '1px solid var(--color-hairline)',
                    borderBottom:
                      i === referenceArticles.length - 1
                        ? '1px solid var(--color-hairline)'
                        : undefined,
                  }}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener me"
                    className="block py-3 group"
                  >
                    <span
                      className="block uppercase font-semibold text-[var(--color-faint)]"
                      style={{ fontSize: 11, letterSpacing: '.14em' }}
                    >
                      {article.publisher}
                    </span>
                    <span
                      className="block text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ fontSize: 14, lineHeight: 1.5 }}
                    >
                      {article.title} <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Q&A — visible counterpart of the FAQPage structured data */}
          <div>
            <p
              className="uppercase font-semibold text-[var(--color-faint)] mb-6"
              style={{ fontSize: 11, letterSpacing: '.16em' }}
            >
              Common questions
            </p>
            <div style={{ borderTop: '1px solid var(--color-hairline)' }}>
              {faqEntries.map((entry) => (
                <div
                  key={entry.question}
                  className="py-6"
                  style={{ borderBottom: '1px solid var(--color-hairline)' }}
                >
                  <h3
                    className="font-display font-bold text-[var(--color-ink)] mb-2"
                    style={{ fontSize: 20, lineHeight: 1.25 }}
                  >
                    {entry.question}
                  </h3>
                  <p
                    className="text-[var(--color-secondary)]"
                    style={{ fontSize: 15, lineHeight: 1.65, textWrap: 'pretty' }}
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

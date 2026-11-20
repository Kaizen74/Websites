import { PAGE_PATHS, SECTION_IDS } from '../constants';
import { playbookIndexRows, playbookPageCopy } from '../data/home';
import { IndexCard } from './IndexCard';

/**
 * The playbook page's intro and its H1. The numbered card is the route
 * through the page, 01–05, matching each section's eyebrow.
 */
export function PlaybookHero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="pt-16"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          <div className="animate-slide-up">
            <p className="eyebrow mb-4">{playbookPageCopy.eyebrow}</p>
            <h1
              className="font-display font-bold text-[var(--color-ink)] mb-6"
              style={{
                fontSize: 'clamp(38px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-.5px',
                textWrap: 'balance',
              }}
            >
              {playbookPageCopy.heading}
            </h1>
            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-7"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              {playbookPageCopy.lede}
            </p>

            {/* Byline back to the person: the home page is about him */}
            <a
              href={PAGE_PATHS.home}
              className="flex items-center gap-3 mb-9 group"
              data-testid="playbook-byline"
            >
              <img
                src="/images/eric-yim-avatar.webp"
                width={40}
                height={40}
                alt=""
                className="rounded-full flex-shrink-0"
                style={{ border: '1px solid var(--color-hairline)' }}
              />
              <span className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 group-hover:text-[var(--color-primary)]">
                {playbookPageCopy.byline}
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-6">
              <a href={`#${SECTION_IDS.principles}`} className="btn btn-primary">
                Read the principles →
              </a>
              <a
                href={`#${SECTION_IDS.diagnostic}`}
                className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                Take the five-minute diagnostic
              </a>
            </div>
          </div>

          <IndexCard
            label="On this page"
            rows={playbookIndexRows.map((r) => ({ ...r, href: `#${r.id}` }))}
          />
        </div>
      </div>
    </section>
  );
}

export default PlaybookHero;

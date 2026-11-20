import { PAGE_PATHS, SECTION_IDS, playbookHref } from '../constants';
import { profile } from '../data/profile';
import { heroCopy, homeIndexRows } from '../data/home';
import { IndexCard } from './IndexCard';

/**
 * Home hero. Leads with the question Eric is drawn to, not with a role or a
 * service: he is employed, and the page is for executives and founders who
 * may want to compare notes. The face and name come first; the numbered index
 * card on the right is the route through this page.
 */
export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="pt-16"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          <div className="animate-slide-up">
            {/* Byline: a face and a name before the question */}
            <div className="flex items-center gap-4 mb-7" data-testid="hero-byline">
              <img
                src="/images/eric-yim-avatar.webp"
                width={56}
                height={56}
                alt=""
                className="rounded-full flex-shrink-0"
                style={{ border: '1px solid var(--color-hairline)' }}
              />
              <div>
                <p
                  className="font-display font-bold text-[var(--color-ink)]"
                  style={{ fontSize: 19, lineHeight: 1.2 }}
                >
                  {profile.name}
                </p>
                <p className="eyebrow mt-1">{heroCopy.byline}</p>
              </div>
            </div>
            <h1
              className="font-display font-bold text-[var(--color-ink)] mb-6"
              style={{
                fontSize: 'clamp(38px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-.5px',
                textWrap: 'balance',
              }}
            >
              {heroCopy.headingBefore}
              <em className="text-[var(--color-primary)]">{heroCopy.headingEmphasis}</em>
              {heroCopy.headingAfter}
            </h1>

            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-9"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              {heroCopy.lede}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href={PAGE_PATHS.playbook} className="btn btn-primary">
                Explore the playbook →
              </a>
              <a
                href={playbookHref(SECTION_IDS.diagnostic)}
                className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                Take the five-minute diagnostic
              </a>
            </div>
          </div>

          <IndexCard label="On this page" rows={homeIndexRows} />
        </div>
      </div>
    </section>
  );
}

export default Hero;

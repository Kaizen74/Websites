import { SECTION_IDS } from '../constants';

interface IndexRow {
  number: string;
  title: string;
  description: string;
  href: string;
}

const indexRows: IndexRow[] = [
  {
    number: '01',
    title: 'The framework',
    description: 'Four interconnected dimensions around a leadership core',
    href: `#${SECTION_IDS.framework}`,
  },
  {
    number: '02',
    title: 'The five activators',
    description: 'What turns an org design into performance',
    href: `#${SECTION_IDS.activators}`,
  },
  {
    number: '03',
    title: 'The change model',
    description: 'Communicate, Co-create, Cadence — plus the T.C.C.A.R. lens',
    href: `#${SECTION_IDS.changeLevers}`,
  },
  {
    number: '04',
    title: 'The diagnostic',
    description: '18 questions, scored across five dimensions, saved locally',
    href: `#${SECTION_IDS.diagnostic}`,
  },
];

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="pt-16"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          {/* Left: editorial intro */}
          <div className="animate-slide-up">
            <p className="eyebrow mb-5">A playbook for organizational design</p>
            <h1
              className="font-display font-bold text-[var(--color-ink)] mb-6"
              style={{
                fontSize: 'clamp(38px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-.5px',
                textWrap: 'balance',
              }}
            >
              Navigate organizational{' '}
              <em className="text-[var(--color-primary)]">transformation</em>{' '}
              with confidence
            </h1>

            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-4"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              Assess organizational health, understand the frameworks that
              connect design to performance, and prescribe evidence-based
              interventions.
            </p>
            <p
              className="text-sm leading-relaxed text-[var(--color-faint)] mb-9"
              style={{ maxWidth: 560 }}
            >
              Healthy organizations are roughly three times more likely to
              outperform their peers — and effective sponsorship is the single
              strongest predictor that a change will land.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href={`#${SECTION_IDS.diagnostic}`} className="btn btn-primary">
                Start the diagnostic →
              </a>
              <a
                href={`#${SECTION_IDS.framework}`}
                className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                Explore the framework
              </a>
            </div>
          </div>

          {/* Right: numbered index card */}
          <div className="card animate-slide-up">
            <p
              className="text-[11px] uppercase font-semibold text-[var(--color-faint)] px-6 pt-5 pb-3"
              style={{ letterSpacing: '.16em' }}
            >
              In this playbook
            </p>
            <nav>
              {indexRows.map((row, i) => (
                <a
                  key={row.number}
                  href={row.href}
                  className="flex items-center gap-5 px-6 py-4 group transition-colors hover:bg-[var(--color-hover-wash)]"
                  style={{
                    borderTop: i === 0 ? '1px solid var(--color-hairline)' : undefined,
                    borderBottom: i < indexRows.length - 1 ? '1px solid var(--color-hairline)' : undefined,
                  }}
                >
                  <span className="font-display text-lg font-semibold text-[var(--color-primary)]">
                    {row.number}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[19px] font-semibold text-[var(--color-ink)]">
                      {row.title}
                    </span>
                    <span className="block text-[13px] text-[var(--color-faint)] mt-0.5">
                      {row.description}
                    </span>
                  </span>
                  <span className="text-[var(--color-faint)] group-hover:text-[var(--color-primary)] transition-colors">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

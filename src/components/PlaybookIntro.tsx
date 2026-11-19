import { SECTION_IDS } from '../constants';

interface IndexRow {
  number: string;
  title: string;
  description: string;
  href: string;
}

/** Sub-sections of the playbook. Numbers match each section's eyebrow. */
const playbookRows: IndexRow[] = [
  {
    number: '4.1',
    title: 'The framework',
    description: 'Four interconnected dimensions around a leadership core',
    href: `#${SECTION_IDS.framework}`,
  },
  {
    number: '4.2',
    title: 'The five activators',
    description: 'What turns an org design into performance',
    href: `#${SECTION_IDS.activators}`,
  },
  {
    number: '4.3',
    title: 'The change model',
    description: 'Communicate, Co-create, Cadence — plus the T.C.C.A.R. lens',
    href: `#${SECTION_IDS.changeLevers}`,
  },
  {
    number: '4.4',
    title: 'AI-native design',
    description: "What AI changes — and what it doesn't",
    href: `#${SECTION_IDS.aiNative}`,
  },
];

/**
 * 04 · The playbook — the bridge from the argument (principles, method) to the
 * reference material that evidences it. Static: safe to server-render.
 */
export function PlaybookIntro() {
  return (
    <section
      id={SECTION_IDS.playbook}
      className="pt-24 pb-4"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-4">04 · The playbook</p>
            <h2
              className="font-display font-bold text-[var(--color-ink)] mb-4"
              style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
            >
              The frameworks behind the work
            </h2>
            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-7"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              Four tools I use to design and change organizations, free to
              explore. Start anywhere: each one stands on its own.
            </p>
            <a
              href={`#${SECTION_IDS.framework}`}
              className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
            >
              Explore the framework →
            </a>
          </div>

          <div className="card">
            <p
              className="text-[11.5px] uppercase font-semibold text-[var(--color-faint)] px-6 pt-5 pb-3"
              style={{ letterSpacing: '.16em' }}
            >
              In this playbook
            </p>
            <nav aria-label="In this playbook">
              {playbookRows.map((row, i) => (
                <a
                  key={row.number}
                  href={row.href}
                  className="flex items-center gap-5 px-6 py-4 group transition-colors hover:bg-[var(--color-hover-wash)]"
                  style={{
                    borderTop: i === 0 ? '1px solid var(--color-hairline)' : undefined,
                    borderBottom: i < playbookRows.length - 1 ? '1px solid var(--color-hairline)' : undefined,
                  }}
                >
                  <span
                    className="font-display text-lg font-semibold text-[var(--color-primary)]"
                    style={{ minWidth: 30 }}
                  >
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

export default PlaybookIntro;

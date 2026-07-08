import { changeLevers } from '../data/interventions';
import { SECTION_IDS } from '../constants';
import { TCCARAssessment } from './TCCARAssessment';

const phaseLabels: Record<number, string> = {
  1: 'Narrative',
  2: 'Engagement',
  3: 'Reinforcement',
};

/** Title-case display for lever titles stored as ALL-CAPS */
function displayTitle(title: string): string {
  return title
    .toLowerCase()
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-');
}

export function ChangeLevers() {
  return (
    <section
      id={SECTION_IDS.changeLevers}
      className="py-24"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">03 · The change model</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            The three C's of change
          </h2>
          <p className="text-[17px] leading-[1.65] text-[var(--color-secondary)]" style={{ maxWidth: 640 }}>
            An operating system for driving organizational change — moving from
            awareness to embedding new behaviors. Each lever activates all four
            framework dimensions at once; they are not sequential phases.
          </p>
        </div>

        {/* Three hairline columns */}
        <div className="grid md:grid-cols-3 mb-20">
          {changeLevers.map((lever, index) => (
            <div
              key={lever.id}
              className="py-2 md:px-8"
              style={{
                borderLeft: index > 0 ? '1px solid var(--color-hairline)' : undefined,
                paddingLeft: index === 0 ? 0 : undefined,
              }}
            >
              <p
                className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-3"
                style={{ letterSpacing: '.16em' }}
              >
                {lever.id} · {phaseLabels[lever.id]}
              </p>
              <h3 className="font-display font-bold text-[27px] text-[var(--color-ink)] mb-3">
                {displayTitle(lever.title)}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-secondary)] mb-5">
                {lever.description}
              </p>

              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-[var(--color-secondary)]">
                  <span
                    className="text-[11px] uppercase font-semibold text-[var(--color-primary)] mr-2"
                    style={{ letterSpacing: '.12em' }}
                  >
                    Goal
                  </span>
                  {lever.goal}
                </p>
                <p className="text-[var(--color-secondary)]">
                  <span
                    className="text-[11px] uppercase font-semibold text-[var(--color-primary)] mr-2"
                    style={{ letterSpacing: '.12em' }}
                  >
                    Method
                  </span>
                  {lever.method}
                </p>
                {lever.tool && (
                  <p className="text-[var(--color-secondary)]">
                    <span
                      className="text-[11px] uppercase font-semibold text-[var(--color-primary)] mr-2"
                      style={{ letterSpacing: '.12em' }}
                    >
                      Tool
                    </span>
                    {lever.tool}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* T.C.C.A.R. — always visible */}
        <div style={{ borderTop: '1px solid var(--color-hairline)' }} className="pt-16">
          <div className="mb-10" style={{ maxWidth: 760 }}>
            <p
              className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-3"
              style={{ letterSpacing: '.16em' }}
            >
              Cadence tool
            </p>
            <h3 className="font-display font-bold text-[28px] text-[var(--color-ink)] mb-3">
              The T.C.C.A.R. team health lens
            </h3>
            <p className="text-[15px] leading-relaxed text-[var(--color-secondary)]" style={{ maxWidth: 640 }}>
              Trust, Conflict, Commitment, Accountability, Results — based on
              Patrick Lencioni's five dysfunctions model, adapted for
              organizational design. Sustainable cadence depends on which of
              these five foundations your team can rely on.
            </p>
          </div>

          <TCCARAssessment />
        </div>
      </div>
    </section>
  );
}

export default ChangeLevers;

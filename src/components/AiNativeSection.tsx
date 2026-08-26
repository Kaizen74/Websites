import { SECTION_IDS } from '../constants';
import {
  sectionCopy,
  descentSteps,
  aiLevels,
  scoringZones,
  provenanceTiers,
} from '../data/aiNative';

// Progressive indent for the descent cards — flat below lg.
// Literal class strings so Tailwind's scanner picks them up.
const indentClasses = ['lg:ml-0', 'lg:ml-[22px]', 'lg:ml-[44px]', 'lg:ml-[66px]'];

const OVERLINE_STYLE = {
  fontSize: 11,
  letterSpacing: '.16em',
  color: 'var(--color-faint)',
} as const;

const MICRO_LABEL_STYLE = {
  fontSize: 11,
  letterSpacing: '.14em',
} as const;

function MoveHeading({ overline, heading }: { overline: string; heading: string }) {
  return (
    <>
      <p className="uppercase font-semibold mb-2" style={OVERLINE_STYLE}>
        {overline}
      </p>
      <h3
        className="font-display font-bold text-[var(--color-ink)]"
        style={{ fontSize: 23, lineHeight: 1.2 }}
      >
        {heading}
      </h3>
    </>
  );
}

export function AiNativeSection() {
  return (
    <section
      id={SECTION_IDS.aiNative}
      className="py-24"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-[46px]" style={{ maxWidth: 700 }}>
          <p className="eyebrow mb-4">{sectionCopy.eyebrow}</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{
              fontSize: 'clamp(30px, 4vw, 40px)',
              lineHeight: 1.15,
              textWrap: 'balance',
            }}
          >
            {sectionCopy.heading}
          </h2>
          <p
            className="text-[var(--color-secondary)]"
            style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 640, textWrap: 'pretty' }}
          >
            {sectionCopy.lede}
          </p>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-14 items-start">
          {/* ---------- Left column ---------- */}
          <div className="grid gap-[34px]">
            {/* Move one — descend to the task */}
            <div>
              <MoveHeading
                overline={sectionCopy.moveOneOverline}
                heading={sectionCopy.moveOneHeading}
              />

              <div className="mt-5 grid gap-2">
                {descentSteps.map((step, i) => (
                  <div
                    key={step.label}
                    className={indentClasses[i]}
                    style={{
                      background: step.emphasis
                        ? 'var(--color-red-tint)'
                        : 'var(--color-bg-white)',
                      border: `1px solid ${
                        step.emphasis ? 'var(--color-primary)' : 'var(--color-hairline)'
                      }`,
                      borderRadius: 2,
                      padding: '13px 16px',
                    }}
                  >
                    <p
                      className="font-display font-bold"
                      style={{
                        fontSize: 17,
                        color: step.emphasis
                          ? 'var(--color-primary)'
                          : 'var(--color-ink)',
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        lineHeight: 1.45,
                        marginTop: 8,
                        color: step.emphasis
                          ? 'var(--color-ink)'
                          : 'var(--color-secondary)',
                      }}
                    >
                      {step.leadIn && (
                        <span style={{ fontWeight: 600 }}>{step.leadIn}</span>
                      )}
                      {step.line}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="mt-4 text-[var(--color-faint)]"
                style={{ fontSize: 13, lineHeight: 1.5 }}
              >
                Findings roll back <em>up</em> the org graph and <em>across</em> value
                streams — that is how a task-level insight becomes a layer, function and
                P&amp;L conversation.
              </p>
            </div>

            {/* Move three — gate the machine's judgement */}
            <div
              style={{
                borderTop: '1px solid var(--color-hairline)',
                paddingTop: 30,
              }}
            >
              <MoveHeading
                overline={sectionCopy.moveThreeOverline}
                heading={sectionCopy.moveThreeHeading}
              />
              <p
                className="mt-4 text-[var(--color-secondary)]"
                style={{ fontSize: 14, lineHeight: 1.6, textWrap: 'pretty' }}
              >
                {sectionCopy.gateBodyBefore}
                <strong style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                  {sectionCopy.gateBodyEmphasis}
                </strong>
                {sectionCopy.gateBodyAfter}
              </p>
              <p
                className="mt-4 text-[var(--color-faint)]"
                style={{ fontSize: 13, lineHeight: 1.5 }}
              >
                {sectionCopy.gateFootnote}
              </p>
            </div>
          </div>

          {/* ---------- Right column ---------- */}
          <div className="grid gap-[30px]">
            {/* Move two — the ladder */}
            <div>
              <MoveHeading
                overline={sectionCopy.moveTwoOverline}
                heading={sectionCopy.moveTwoHeading}
              />

              <div
                className="mt-5 grid gap-px"
                style={{
                  background: 'var(--color-hairline)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 2,
                }}
              >
                {/* Header row — hidden where the cells stack */}
                <div
                  className="hidden md:grid md:grid-cols-[132px_1fr_1fr] gap-5"
                  style={{
                    background: 'var(--color-bg-white)',
                    padding: '11px 18px',
                  }}
                >
                  <span
                    className="uppercase font-semibold text-[var(--color-faint)]"
                    style={MICRO_LABEL_STYLE}
                  >
                    {sectionCopy.ladderHeaders.level}
                  </span>
                  <span
                    className="uppercase font-semibold text-[var(--color-faint)]"
                    style={MICRO_LABEL_STYLE}
                  >
                    {sectionCopy.ladderHeaders.task}
                  </span>
                  <span
                    className="uppercase font-semibold text-[var(--color-faint)]"
                    style={MICRO_LABEL_STYLE}
                  >
                    {sectionCopy.ladderHeaders.cost}
                  </span>
                </div>

                {aiLevels.map((level) => (
                  <div
                    key={level.code}
                    className="grid md:grid-cols-[132px_1fr_1fr] gap-2 md:gap-5 items-start"
                    style={{
                      background: level.emphasis
                        ? 'var(--color-red-tint)'
                        : 'var(--color-bg-white)',
                      padding: '15px 18px',
                    }}
                  >
                    {/* Level cell */}
                    <div>
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: 18,
                          color: level.emphasis
                            ? 'var(--color-primary)'
                            : 'var(--color-ink)',
                        }}
                      >
                        {level.code}
                      </span>{' '}
                      <span
                        style={{
                          fontSize: 12.5,
                          color: level.emphasis
                            ? 'var(--color-primary)'
                            : 'var(--color-faint)',
                        }}
                      >
                        {level.name}
                      </span>
                      <div
                        aria-hidden="true"
                        style={{
                          height: 3,
                          marginTop: 7,
                          width: level.ruleWidth,
                          maxWidth: '100%',
                          background: level.ruleColor,
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: level.emphasis
                          ? 'var(--color-ink)'
                          : 'var(--color-secondary)',
                      }}
                    >
                      {level.task}
                    </p>
                    <p
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.5,
                        color: level.emphasis
                          ? 'var(--color-ink)'
                          : 'var(--color-secondary)',
                      }}
                    >
                      {level.cost}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone card */}
            <div
              style={{
                background: 'var(--color-bg-white)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 2,
                padding: '18px 22px 20px',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-[14px]">
                <h4
                  className="font-display font-bold text-[var(--color-ink)] flex-shrink-0"
                  style={{ fontSize: 18 }}
                >
                  {sectionCopy.zoneHeading}
                </h4>
                <p
                  className="text-[var(--color-secondary)]"
                  style={{ fontSize: 13, lineHeight: 1.5 }}
                >
                  What AI <em>can</em> do, and whether the people doing the work{' '}
                  <em>want</em> it automated — scored separately, never collapsed.
                </p>
              </div>

              <div
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
                style={{
                  background: 'var(--color-hairline)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 2,
                }}
              >
                {scoringZones.map((zone) => (
                  <div
                    key={zone.label}
                    style={{
                      background: 'var(--color-bg-white)',
                      padding: '12px 14px',
                    }}
                  >
                    <p
                      className="uppercase font-semibold"
                      style={{ ...MICRO_LABEL_STYLE, color: zone.labelColor }}
                    >
                      {zone.label}
                    </p>
                    <p
                      className="mt-1.5 text-[var(--color-secondary)]"
                      style={{ fontSize: 12.5, lineHeight: 1.45 }}
                    >
                      {zone.line}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="mt-4 text-[var(--color-faint)]"
                style={{ fontSize: 12.5, lineHeight: 1.5 }}
              >
                {sectionCopy.zoneFootnote}
              </p>
            </div>

            {/* Provenance strip */}
            <div
              style={{
                borderTop: '1px solid var(--color-hairline)',
                paddingTop: 30,
              }}
            >
              <p
                className="uppercase font-semibold mb-4"
                style={OVERLINE_STYLE}
              >
                {sectionCopy.provenanceOverline}
              </p>
              <div className="grid gap-6 md:grid-cols-3 md:gap-0">
                {provenanceTiers.map((tier, i) => (
                  <div
                    key={tier.label}
                    className={i > 0 ? 'md:border-l md:pl-[26px]' : 'md:pr-[26px]'}
                    style={
                      i > 0
                        ? { borderColor: 'var(--color-hairline)' }
                        : undefined
                    }
                  >
                    <p
                      className="uppercase font-semibold"
                      style={{ ...MICRO_LABEL_STYLE, color: tier.labelColor }}
                    >
                      {tier.label}
                    </p>
                    <p
                      className="mt-1.5 text-[var(--color-secondary)]"
                      style={{ fontSize: 13, lineHeight: 1.5 }}
                    >
                      {tier.line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiNativeSection;

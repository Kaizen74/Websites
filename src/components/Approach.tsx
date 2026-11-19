import type { CSSProperties } from 'react';
import { SECTION_IDS } from '../constants';
import {
  approachCopy,
  stageGroups,
  evidenceCopy,
  evidenceGrades,
} from '../data/approach';

const MICRO_LABEL: CSSProperties = {
  fontSize: 11.5,
  letterSpacing: '.14em',
  fontWeight: 600,
  textTransform: 'uppercase',
};

/**
 * 02 · How I work — the six-stage arc as an HTML infographic (crawlable text,
 * not an image), followed by the three evidence grades.
 * Static content: safe to server-render.
 */
export function Approach() {
  return (
    <section
      id={SECTION_IDS.approach}
      className="py-24"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">{approachCopy.eyebrow}</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {approachCopy.heading}
          </h2>
          {/* The answer comes first, in ink, so it is the passage engines lift */}
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-ink)] mb-3"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {approachCopy.answer}
          </p>
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-secondary)]"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {approachCopy.lede}
          </p>
        </div>

        {/* ---------- The arc: two halves of three stages ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6">
          {stageGroups.map((group) => (
            <div key={group.label} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-[var(--color-faint)] flex-shrink-0" style={MICRO_LABEL}>
                  {group.label}
                </p>
                <span
                  aria-hidden="true"
                  className="flex-1"
                  style={{ height: 1, background: 'var(--color-hairline)' }}
                />
              </div>
              <ol
                className="grid grid-cols-1 sm:grid-cols-3 gap-px flex-1"
                style={{
                  background: 'var(--color-hairline)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 2,
                }}
              >
                {group.stages.map((stage) => (
                  <li
                    key={stage.number}
                    className="flex flex-col"
                    style={{ background: 'var(--color-bg-white)', padding: '20px 18px 18px' }}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className="font-display font-bold text-[var(--color-primary)]"
                        style={{ fontSize: 28, lineHeight: 1 }}
                      >
                        {stage.number}
                      </span>
                      <h3
                        className="font-display font-bold text-[var(--color-ink)]"
                        style={{ fontSize: 21, lineHeight: 1.15 }}
                      >
                        {stage.name}
                      </h3>
                    </div>
                    {/* Shared minimum height (four lines) so every "Produces"
                        rule sits at the same height across all six stages */}
                    <p
                      className="mt-3 text-[var(--color-secondary)] sm:min-h-[6.2em]"
                      style={{ fontSize: 14, lineHeight: 1.55, textWrap: 'pretty' }}
                    >
                      {stage.question}
                    </p>
                    <div
                      className="mt-4 pt-3"
                      style={{ borderTop: '1px solid var(--color-hairline)' }}
                    >
                      <p className="text-[var(--color-faint)]" style={MICRO_LABEL}>
                        Produces
                      </p>
                      <p
                        className="mt-1 text-[var(--color-ink)]"
                        style={{ fontSize: 13.5, lineHeight: 1.5, textWrap: 'pretty' }}
                      >
                        {stage.produces}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p
          className="mt-5 text-[var(--color-faint)]"
          style={{ fontSize: 13.5, lineHeight: 1.55, maxWidth: 640 }}
        >
          {approachCopy.stageZeroNote}
        </p>

        {/* ---------- Evidence grades ---------- */}
        <div className="mt-20 grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-start">
          <div>
            <h3
              className="font-display font-bold text-[var(--color-ink)] mb-3"
              style={{ fontSize: 26, lineHeight: 1.2 }}
            >
              {evidenceCopy.heading}
            </h3>
            <p
              className="text-[var(--color-ink)] mb-3"
              style={{ fontSize: 15.5, lineHeight: 1.6, textWrap: 'pretty' }}
            >
              {evidenceCopy.answer}
            </p>
            <p
              className="text-[var(--color-secondary)]"
              style={{ fontSize: 15.5, lineHeight: 1.6, textWrap: 'pretty' }}
            >
              {evidenceCopy.lede}
            </p>
            <p
              className="mt-4 text-[var(--color-faint)]"
              style={{ fontSize: 13.5, lineHeight: 1.55, textWrap: 'pretty' }}
            >
              {evidenceCopy.note}
            </p>
          </div>

          <table
            className="w-full"
            style={{
              background: 'var(--color-bg-white)',
              border: '1px solid var(--color-hairline)',
              borderCollapse: 'collapse',
              fontSize: 14.5,
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-ink)' }}>
                {['Grade', 'What it means', 'Use it to'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="text-left text-[var(--color-faint)]"
                    style={{ ...MICRO_LABEL, padding: '12px 16px' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evidenceGrades.map((g, i) => (
                <tr
                  key={g.grade}
                  style={{
                    borderBottom:
                      i < evidenceGrades.length - 1 ? '1px solid var(--color-hairline)' : undefined,
                  }}
                >
                  <th
                    scope="row"
                    className="text-left font-display font-bold text-[var(--color-ink)]"
                    style={{ padding: '14px 16px', fontSize: 16 }}
                  >
                    {g.grade}
                  </th>
                  <td className="text-[var(--color-secondary)]" style={{ padding: '14px 16px' }}>
                    {g.means}
                  </td>
                  <td className="text-[var(--color-ink)]" style={{ padding: '14px 16px' }}>
                    {g.useItTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Approach;

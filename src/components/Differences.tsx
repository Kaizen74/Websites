import { useState } from 'react';
import type { CSSProperties } from 'react';
import { SECTION_IDS } from '../constants';
import {
  differencesCopy,
  differenceCategories,
  categoryOf,
  classifyDifference,
  sorterQuestions,
  exampleCopy,
  exampleMarkets,
  exampleDecisions,
} from '../data/approach';
import type { DifferenceKind } from '../data/approach';

const MICRO_LABEL: CSSProperties = {
  fontSize: 11.5,
  letterSpacing: '.14em',
  fontWeight: 600,
  textTransform: 'uppercase',
};

/** Below md a data cell is a label/value row; from md up it is a normal table cell */
const CELL =
  'flex md:table-cell justify-between items-start gap-4 px-[14px] py-1.5 md:py-[14px] ' +
  "before:content-[attr(data-label)] md:before:content-none before:flex-shrink-0 " +
  'before:text-[11.5px] before:uppercase before:tracking-[.14em] before:font-semibold ' +
  'before:text-[var(--color-faint)] before:pt-0.5';

function KindChip({ kind }: { kind: DifferenceKind }) {
  const c = categoryOf(kind);
  return (
    <span
      className="inline-block whitespace-nowrap"
      style={{
        ...MICRO_LABEL,
        fontSize: 11.5,
        color: c.labelColor,
        border: '1px solid currentColor',
        borderRadius: 999,
        padding: '2px 9px',
      }}
    >
      {c.label}
    </span>
  );
}

interface YesNoProps {
  question: string;
  value: boolean | null;
  onAnswer: (v: boolean) => void;
  step: number;
}

function YesNo({ question, value, onAnswer, step }: YesNoProps) {
  return (
    <fieldset className="mb-6">
      <legend
        className="text-[var(--color-ink)] mb-3"
        style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}
      >
        <span className="font-display font-bold text-[var(--color-primary)] mr-2">{step}</span>
        {question}
      </legend>
      <div className="flex gap-3">
        {[true, false].map((answer) => {
          const selected = value === answer;
          return (
            <button
              key={String(answer)}
              type="button"
              aria-pressed={selected}
              onClick={() => onAnswer(answer)}
              className="btn btn-secondary"
              style={{
                minWidth: 88,
                padding: '10px 18px',
                background: selected ? 'var(--color-red-tint)' : 'var(--color-bg-white)',
                borderColor: selected ? 'var(--color-primary)' : 'var(--color-hairline)',
                color: selected ? 'var(--color-primary)' : 'var(--color-ink)',
              }}
            >
              {answer ? 'Yes' : 'No'}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * 03 · Required, chosen or inherited? — define the three kinds, let the
 * visitor sort a difference of their own, then show the lens applied to a
 * fictional company. Sorter state is component-local: nothing is stored or
 * sent anywhere, and the server render shows the unanswered state.
 */
export function Differences() {
  const [isRequired, setIsRequired] = useState<boolean | null>(null);
  const [isDeliberate, setIsDeliberate] = useState<boolean | null>(null);

  const answerRequired = (v: boolean) => {
    setIsRequired(v);
    setIsDeliberate(null);
  };
  const reset = () => {
    setIsRequired(null);
    setIsDeliberate(null);
  };

  const kind = isRequired === null ? null : classifyDifference(isRequired, isDeliberate);
  const result = kind ? categoryOf(kind) : null;

  return (
    <section
      id={SECTION_IDS.differences}
      className="py-24"
      style={{
        background: 'var(--color-bg-white)',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">{differencesCopy.eyebrow}</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {differencesCopy.heading}
          </h2>
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-secondary)]"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {differencesCopy.lede}
          </p>
        </div>

        {/* ---------- The three kinds ---------- */}
        <dl
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{
            background: 'var(--color-hairline)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 2,
          }}
        >
          {differenceCategories.map((c) => (
            <div key={c.kind} style={{ background: 'var(--color-bg-white)', padding: '24px 24px 22px' }}>
              <dt style={{ ...MICRO_LABEL, color: c.labelColor }}>{c.label}</dt>
              <dd className="mt-3">
                <p
                  className="text-[var(--color-secondary)]"
                  style={{ fontSize: 15, lineHeight: 1.6, textWrap: 'pretty' }}
                >
                  {c.definition}
                </p>
                <p
                  className="mt-4 font-display font-bold text-[var(--color-ink)]"
                  style={{ fontSize: 19 }}
                >
                  → {c.action}
                </p>
              </dd>
            </div>
          ))}
        </dl>
        <p
          className="mt-6 text-[var(--color-ink)]"
          style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 760, textWrap: 'pretty' }}
        >
          {differencesCopy.sequencing}
        </p>

        {/* ---------- The sorter ---------- */}
        <div className="mt-20 grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-start">
          <div>
            <h3
              className="font-display font-bold text-[var(--color-ink)] mb-3"
              style={{ fontSize: 26, lineHeight: 1.2 }}
            >
              {differencesCopy.sorterHeading}
            </h3>
            <p
              className="text-[var(--color-secondary)]"
              style={{ fontSize: 15.5, lineHeight: 1.6, textWrap: 'pretty' }}
            >
              {differencesCopy.sorterLede}
            </p>
          </div>

          <div
            className="card"
            style={{ padding: '26px 26px 24px', borderRadius: 2 }}
            data-testid="difference-sorter"
          >
            <YesNo
              step={1}
              question={sorterQuestions.required}
              value={isRequired}
              onAnswer={answerRequired}
            />
            {isRequired === false && (
              <YesNo
                step={2}
                question={sorterQuestions.chosen}
                value={isDeliberate}
                onAnswer={setIsDeliberate}
              />
            )}

            <div
              aria-live="polite"
              className="pt-5"
              style={{ borderTop: '1px solid var(--color-hairline)', minHeight: 92 }}
            >
              {result ? (
                <>
                  <p style={{ ...MICRO_LABEL, color: result.labelColor }}>{result.label}</p>
                  <p
                    className="mt-2 font-display font-bold text-[var(--color-ink)]"
                    style={{ fontSize: 22, lineHeight: 1.25 }}
                  >
                    {result.action}.
                  </p>
                  <p
                    className="mt-1 text-[var(--color-secondary)]"
                    style={{ fontSize: 14.5, lineHeight: 1.55 }}
                  >
                    {result.definition}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 text-[13.5px] font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
                  >
                    Sort another difference
                  </button>
                </>
              ) : (
                <p className="text-[var(--color-faint)]" style={{ fontSize: 14.5, lineHeight: 1.55 }}>
                  Answer {isRequired === false ? 'the second question' : 'the first question'} to
                  see what to do with it.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ---------- Worked example: paper versus practice ---------- */}
        <div className="mt-20">
          <div className="mb-6" style={{ maxWidth: 680 }}>
            <h3
              className="font-display font-bold text-[var(--color-ink)] mb-3"
              style={{ fontSize: 26, lineHeight: 1.2 }}
            >
              {exampleCopy.heading}
            </h3>
            <p
              className="text-[var(--color-secondary)]"
              style={{ fontSize: 15.5, lineHeight: 1.6, textWrap: 'pretty' }}
            >
              {exampleCopy.lede}
            </p>
          </div>

          {/* One table, two layouts: a real table from md up; below md each row
              restacks into a labelled card (labels come from data-label via CSS),
              so phones see every column without sideways scrolling and crawlers
              never get the text twice. */}
          <div className="md:overflow-x-auto" style={{ border: '1px solid var(--color-hairline)', borderRadius: 2 }}>
            <table className="w-full md:min-w-[760px]" style={{ borderCollapse: 'collapse', fontSize: 14 }}>
              <thead className="hidden md:table-header-group">
                <tr style={{ borderBottom: '1px solid var(--color-ink)' }}>
                  {['Decision', 'On paper', ...exampleMarkets, 'Why it differs'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-left text-[var(--color-faint)]"
                      style={{ ...MICRO_LABEL, padding: '12px 14px' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exampleDecisions.map((row, i) => (
                  <tr
                    key={row.decision}
                    className="block md:table-row py-2 md:py-0"
                    style={{
                      borderBottom:
                        i < exampleDecisions.length - 1 ? '1px solid var(--color-hairline)' : undefined,
                    }}
                  >
                    <th
                      scope="row"
                      className="block md:table-cell text-left font-semibold text-[var(--color-ink)]"
                      style={{ padding: '12px 14px', verticalAlign: 'top' }}
                    >
                      {row.decision}
                    </th>
                    <td
                      data-label="On paper"
                      className={CELL}
                      style={{ verticalAlign: 'top', color: 'var(--color-secondary)' }}
                    >
                      {row.onPaper}
                    </td>
                    {row.inPractice.map((who, m) => {
                      const drifted = row.drifted.includes(m);
                      return (
                        <td
                          key={exampleMarkets[m]}
                          data-label={exampleMarkets[m]}
                          className={CELL}
                          style={{
                            verticalAlign: 'top',
                            color: drifted ? 'var(--color-primary)' : 'var(--color-secondary)',
                            fontWeight: drifted ? 600 : 400,
                          }}
                        >
                          {who}
                        </td>
                      );
                    })}
                    <td
                      data-label="Why it differs"
                      className={`${CELL} pb-3`}
                      style={{ verticalAlign: 'top' }}
                    >
                      <span className="text-right md:text-left">
                        <KindChip kind={row.kind} />
                        <span className="block mt-1.5 text-[var(--color-secondary)]" style={{ fontSize: 13 }}>
                          {row.why}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[var(--color-faint)]" style={{ fontSize: 12.5 }}>
            Red marks practice that departs from paper. {exampleCopy.disclaimer}
          </p>

          <p
            className="mt-8 font-display text-[var(--color-ink)]"
            style={{ fontSize: 19, lineHeight: 1.45, fontStyle: 'italic', maxWidth: 760 }}
          >
            The call: {exampleCopy.verdict}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Differences;

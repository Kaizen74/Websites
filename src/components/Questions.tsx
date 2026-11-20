import { SECTION_IDS } from '../constants';
import { questionsCopy, exploringQuestions } from '../data/home';

/**
 * Home 01 · What I'm exploring — three questions Eric keeps coming back to,
 * each with where his thinking stands and a link into the playbook. Framed as
 * ideas, never as problems he solves for anyone.
 */
export function Questions() {
  return (
    <section
      id={SECTION_IDS.questions}
      className="py-24"
      style={{
        background: 'var(--color-bg-white)',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">{questionsCopy.eyebrow}</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {questionsCopy.heading}
          </h2>
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-secondary)]"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {questionsCopy.lede}
          </p>
        </div>

        <ol
          className="grid grid-cols-1 lg:grid-cols-3 gap-px list-none p-0 m-0"
          style={{
            background: 'var(--color-hairline)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 2,
          }}
        >
          {exploringQuestions.map((q) => (
            <li
              key={q.question}
              className="flex flex-col"
              style={{ background: 'var(--color-bg-white)', padding: '28px 28px 26px' }}
            >
              <h3
                className="font-display font-bold text-[var(--color-ink)] mb-4"
                style={{ fontSize: 23, lineHeight: 1.25, textWrap: 'balance' }}
              >
                {q.question}
              </h3>
              <p
                className="text-[var(--color-secondary)] flex-1"
                style={{ fontSize: 15, lineHeight: 1.6, textWrap: 'pretty' }}
              >
                {q.body}
              </p>
              <a
                href={q.href}
                className="mt-5 text-[13.5px] font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                {q.linkLabel} →
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Questions;

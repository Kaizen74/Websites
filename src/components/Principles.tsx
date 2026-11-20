import { PAGE_PATHS, SECTION_IDS } from '../constants';
import { principles, principlesCopy } from '../data/principles';
import { homePrinciplesCopy } from '../data/home';

interface PrinciplesProps {
  /** 'full': all six, on the playbook page. 'home': three, linking to the rest. */
  variant?: 'full' | 'home';
}

/**
 * How I think. On the playbook page (01) all six principles, each linking to
 * the section that applies it. On the home page (02) three of them, with their
 * links pointing into the playbook.
 * Static content: no state, no browser globals, safe to server-render.
 */
export function Principles({ variant = 'full' }: PrinciplesProps) {
  const home = variant === 'home';
  const copy = home ? homePrinciplesCopy : principlesCopy;
  const shown = home
    ? principles.filter((p) => homePrinciplesCopy.numbers.includes(p.number))
    : principles;
  // On the home page the anchors live on the playbook page
  const hrefFor = (href: string) => (home ? `${PAGE_PATHS.playbook}${href}` : href);
  return (
    <section
      id={SECTION_IDS.principles}
      className="py-24"
      style={
        home
          ? { background: 'var(--color-paper)' }
          : {
              background: 'var(--color-bg-white)',
              borderTop: '1px solid var(--color-hairline)',
              borderBottom: '1px solid var(--color-hairline)',
            }
      }
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">{copy.eyebrow}</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {copy.heading}
          </h2>
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-secondary)]"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {copy.lede}
          </p>
        </div>

        {/* Hairline grid: the 1px gaps show the hairline colour beneath */}
        <ol
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{
            background: 'var(--color-hairline)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 2,
          }}
        >
          {shown.map((p) => (
            <li
              key={p.number}
              className="flex flex-col"
              style={{ background: 'var(--color-bg-white)', padding: '28px 28px 26px' }}
            >
              <span
                className="font-display font-semibold text-[var(--color-primary)]"
                style={{ fontSize: 17 }}
              >
                {p.number}
              </span>
              <h3
                className="font-display font-bold text-[var(--color-ink)] mt-3 mb-3"
                style={{ fontSize: 23, lineHeight: 1.2, textWrap: 'balance' }}
              >
                {p.title}
              </h3>
              <p
                className="text-[var(--color-secondary)] flex-1"
                style={{ fontSize: 15, lineHeight: 1.6, textWrap: 'pretty' }}
              >
                {home ? (p.plainBody ?? p.body) : p.body}
              </p>
              <a
                href={hrefFor(p.href)}
                className="mt-5 text-[13.5px] font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
              >
                {p.linkLabel} →
              </a>
            </li>
          ))}
        </ol>
        {home && (
          <a
            href={homePrinciplesCopy.allHref}
            className="inline-block mt-8 text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
          >
            {homePrinciplesCopy.allLabel} →
          </a>
        )}
      </div>
    </section>
  );
}

export default Principles;

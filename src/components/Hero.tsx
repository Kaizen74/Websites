import { SECTION_IDS } from '../constants';
import { profile, referenceArticles } from '../data/profile';

interface IndexRow {
  number: string;
  title: string;
  description: string;
  href: string;
}

/**
 * The visitor's route through the site. Numbers match each section's eyebrow
 * (01 · How I think … 05 · The diagnostic) — keep them in sync. The playbook's
 * own sections are numbered 4.1–4.4 underneath row 04.
 */
const indexRows: IndexRow[] = [
  {
    number: '01',
    title: 'How I think',
    description: 'Six principles behind the work',
    href: `#${SECTION_IDS.principles}`,
  },
  {
    number: '02',
    title: 'How I work',
    description: 'Six stages, one evidence trail',
    href: `#${SECTION_IDS.approach}`,
  },
  {
    number: '03',
    title: 'Required, chosen or inherited?',
    description: 'Sort any difference in two questions',
    href: `#${SECTION_IDS.differences}`,
  },
  {
    number: '04',
    title: 'The playbook',
    description: 'Framework, activators, change model, AI-native design',
    href: `#${SECTION_IDS.playbook}`,
  },
  {
    number: '05',
    title: 'The diagnostic',
    description: '18 questions, scored across five dimensions, saved locally',
    href: `#${SECTION_IDS.diagnostic}`,
  },
];

/** Third-party proof: the aTalent feature's own headline about Eric's practice */
const proof = referenceArticles.find((a) => a.publisher === 'aTalent')!;

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="pt-16"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          {/* Left: who, the thesis, the proof */}
          <div className="animate-slide-up">
            <p className="eyebrow mb-5">
              {profile.name} · {profile.jobTitle} · {profile.location}
            </p>
            <h1
              className="font-display font-bold text-[var(--color-ink)] mb-6"
              style={{
                fontSize: 'clamp(38px, 5vw, 56px)',
                lineHeight: 1.1,
                letterSpacing: '-.5px',
                textWrap: 'balance',
              }}
            >
              Leaders don’t need another report. They need a{' '}
              <em className="text-[var(--color-primary)]">system</em>.
            </h1>

            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-7"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              For 25 years I’ve worked in the gap between diagnosing an
              organization and redesigning it — and, increasingly, deciding
              which work belongs to people and which to machines.
            </p>

            <figure
              className="mb-9 pl-4"
              style={{ borderLeft: '1px solid var(--color-hairline)', maxWidth: 520 }}
            >
              <blockquote
                className="font-display text-[var(--color-ink)]"
                style={{ fontSize: 17, lineHeight: 1.45, fontStyle: 'italic' }}
              >
                “{proof.title}”
              </blockquote>
              <figcaption className="mt-2 text-[13px] text-[var(--color-faint)]">
                <a
                  href={proof.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--color-primary)]"
                >
                  {proof.publisher}
                  {proof.datePublished ? `, ${proof.datePublished.slice(0, 4)}` : ''}
                </a>
              </figcaption>
            </figure>

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

          {/* Right: numbered index card */}
          <div className="card animate-slide-up">
            <p
              className="text-[11.5px] uppercase font-semibold text-[var(--color-faint)] px-6 pt-5 pb-3"
              style={{ letterSpacing: '.16em' }}
            >
              On this site
            </p>
            <nav aria-label="On this site">
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

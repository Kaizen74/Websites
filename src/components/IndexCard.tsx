export interface IndexCardRow {
  number: string;
  title: string;
  description: string;
  href: string;
}

interface IndexCardProps {
  /** Shown above the rows, and the nav's accessible name */
  label: string;
  rows: IndexCardRow[];
  /** Width reserved for the number column (4.1-style numbers need more) */
  numberWidth?: number;
}

/**
 * The numbered index card from the design system: a white card, hairline
 * rows, a red serif number, title and description, and an arrow. Used in both
 * heroes, the home page's playbook bridge and the playbook's own sub-index.
 */
export function IndexCard({ label, rows, numberWidth }: IndexCardProps) {
  return (
    <div className="card animate-slide-up">
      <p
        className="text-[11.5px] uppercase font-semibold text-[var(--color-faint)] px-6 pt-5 pb-3"
        style={{ letterSpacing: '.16em' }}
      >
        {label}
      </p>
      <nav aria-label={label}>
        {rows.map((row, i) => (
          <a
            key={row.number}
            href={row.href}
            className="flex items-center gap-5 px-6 py-4 group transition-colors hover:bg-[var(--color-hover-wash)]"
            style={{
              borderTop: i === 0 ? '1px solid var(--color-hairline)' : undefined,
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-hairline)' : undefined,
            }}
          >
            <span
              className="font-display text-lg font-semibold text-[var(--color-primary)]"
              style={numberWidth ? { minWidth: numberWidth } : undefined}
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
  );
}

export default IndexCard;

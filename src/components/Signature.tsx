/**
 * Personal brand signature for the site footer.
 * A designed monogram seal + signature-style name treatment in the
 * editorial system — not a reproduction of a real handwritten signature.
 */

function MonogramSeal() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      {/* Hairline ring */}
      <circle cx="24" cy="24" r="23" fill="none" stroke="var(--color-hairline)" strokeWidth="1" />
      {/* Inner ink ring */}
      <circle cx="24" cy="24" r="19" fill="none" stroke="var(--color-ink)" strokeWidth="1.25" />
      {/* Continuous-improvement accent arc (echoes the framework motif) */}
      <path
        d="M 24 3 A 21 21 0 0 1 43 17"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* EY monogram */}
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize="18"
        fill="var(--color-ink)"
        letterSpacing="0.5"
      >
        EY
      </text>
    </svg>
  );
}

export function Signature() {
  return (
    <div className="flex items-center gap-4" data-testid="signature">
      <MonogramSeal />
      <div>
        <p
          className="text-[10px] uppercase font-semibold text-[var(--color-faint)] mb-0.5"
          style={{ letterSpacing: '.18em' }}
        >
          Designed &amp; built by
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className="font-display italic text-[var(--color-ink)] leading-none"
            style={{ fontSize: 26 }}
          >
            Eric Yim
          </span>
        </div>
        {/* Hand-style underline flourish under the name */}
        <svg
          width="132"
          height="9"
          viewBox="0 0 132 9"
          aria-hidden="true"
          className="mt-1"
          preserveAspectRatio="none"
        >
          <path
            d="M1 6 C 24 2, 54 2, 82 5 S 116 8, 131 3"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Signature;

interface FrameworkLogoProps {
  size?: number;
  className?: string;
}

/**
 * Simplified framework logo for header/favicon use
 * Shows concentric rings with leadership center
 */
export function FrameworkLogo({ size = 40, className = '' }: FrameworkLogoProps) {
  const centerX = 20;
  const centerY = 20;

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      aria-label="OrgDesign Framework Logo"
    >
      {/* Outer dashed ring */}
      <circle
        cx={centerX}
        cy={centerY}
        r="18"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Gray middle ring */}
      <circle
        cx={centerX}
        cy={centerY}
        r="14"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.5"
      />

      {/* Inner coral ring (quadrants area) */}
      <circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="var(--color-accent-coral, #E8A5A5)"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* Quadrant divider lines */}
      <line x1={centerX} y1={centerY - 10} x2={centerX} y2={centerY + 10} stroke="white" strokeWidth="1" />
      <line x1={centerX - 10} y1={centerY} x2={centerX + 10} y2={centerY} stroke="white" strokeWidth="1" />

      {/* Center leadership circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r="5"
        fill="white"
        stroke="var(--color-accent-coral, #E8A5A5)"
        strokeWidth="1.5"
      />

      {/* Circular arrows indicator */}
      <path
        d="M 17 17 A 4 4 0 0 1 23 17"
        fill="none"
        stroke="var(--color-primary, #C41E3A)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M 23 23 A 4 4 0 0 1 17 23"
        fill="none"
        stroke="var(--color-primary, #C41E3A)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default FrameworkLogo;

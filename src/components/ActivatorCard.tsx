import { useState } from 'react';
import type { Activator } from '../types';

interface ActivatorCardProps {
  activator: Activator;
  isExpanded?: boolean;
  onToggle?: () => void;
  isPriority?: boolean;
}

interface SignalColumnProps {
  label: string;
  labelColor: string;
  glyph: string;
  glyphColor: string;
  items: string[];
}

function SignalColumn({ label, labelColor, glyph, glyphColor, items }: SignalColumnProps) {
  return (
    <div>
      <p
        className="text-[11px] uppercase font-semibold mb-3"
        style={{ letterSpacing: '.16em', color: labelColor }}
      >
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-secondary)]">
            <span className="font-bold" style={{ color: glyphColor }}>
              {glyph}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ActivatorCard({
  activator,
  isExpanded = false,
  onToggle,
  isPriority = false,
}: ActivatorCardProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const expanded = onToggle ? isExpanded : isOpen;

  return (
    <div
      data-testid="activator-card"
      style={{ borderBottom: '1px solid var(--color-hairline)' }}
    >
      {/* Row header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-6 py-6 text-left transition-colors hover:bg-[var(--color-hover-wash)]"
        aria-expanded={expanded}
      >
        <span
          className="font-display font-bold flex-shrink-0 text-center"
          style={{ width: 72, fontSize: 44, lineHeight: 1, color: 'var(--color-placeholder)' }}
        >
          {activator.id}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-3">
            <span className="font-display font-bold text-[23px] text-[var(--color-ink)]">
              {activator.title}
            </span>
            {isPriority && (
              <span
                className="text-[11px] uppercase font-semibold text-[var(--color-primary)]"
                style={{ letterSpacing: '.14em' }}
              >
                Priority
              </span>
            )}
          </span>
          <span className="block text-sm text-[var(--color-faint)] mt-1">
            {activator.tagline}
          </span>
        </span>
        <span
          className="text-2xl font-light text-[var(--color-primary)] flex-shrink-0 pr-2"
          aria-hidden="true"
        >
          {expanded ? '–' : '+'}
        </span>
      </button>

      {/* Expanded body: three columns */}
      {expanded && (
        <div className="pb-8 animate-fade-in" style={{ paddingLeft: 96 }}>
          <div className="grid md:grid-cols-3 gap-8 pr-4">
            <SignalColumn
              label="Key principles"
              labelColor="var(--color-primary)"
              glyph="·"
              glyphColor="var(--color-primary)"
              items={activator.principles}
            />
            <SignalColumn
              label="Healthy signals"
              labelColor="var(--color-score-green)"
              glyph="✓"
              glyphColor="var(--color-score-green)"
              items={activator.healthySignals}
            />
            <SignalColumn
              label="Dysfunction signals"
              labelColor="var(--color-score-red)"
              glyph="×"
              glyphColor="var(--color-score-red)"
              items={activator.dysfunctionSignals}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivatorCard;

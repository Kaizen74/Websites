import { useState } from 'react';
import { tccarItems } from '../data/interventions';
import type { TCCARDimension } from '../types';

export function TCCARAssessment() {
  const [activeDimension, setActiveDimension] = useState<TCCARDimension>('trust');

  const activeItem = tccarItems.find((item) => item.id === activeDimension)!;

  return (
    <div>
      {/* Tab strip */}
      <div
        className="flex flex-wrap gap-x-8 gap-y-2 mb-8"
        style={{ borderBottom: '1px solid var(--color-hairline)' }}
        role="tablist"
        aria-label="T.C.C.A.R. dimensions"
      >
        {tccarItems.map((item) => {
          const isActive = item.id === activeDimension;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveDimension(item.id)}
              className="pb-3 text-[15px] font-medium transition-colors"
              style={{
                color: isActive ? 'var(--color-ink)' : 'var(--color-faint)',
                borderBottom: isActive
                  ? '2px solid var(--color-primary)'
                  : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Description as serif italic pull-quote */}
      <p
        className="font-display italic text-[var(--color-ink)] mb-8"
        style={{ fontSize: 22, lineHeight: 1.5, maxWidth: 680 }}
      >
        {activeItem.description}
      </p>

      {/* Two columns: healthy / warning */}
      <div className="grid md:grid-cols-2 gap-10 animate-fade-in" key={activeDimension}>
        <div>
          <p
            className="text-[11px] uppercase font-semibold mb-3"
            style={{ letterSpacing: '.16em', color: 'var(--color-score-green)' }}
          >
            Healthy behaviors
          </p>
          <ul className="space-y-2">
            {activeItem.healthyBehaviors.map((behavior, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-secondary)]">
                <span className="font-bold" style={{ color: 'var(--color-score-green)' }}>
                  ✓
                </span>
                {behavior}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            className="text-[11px] uppercase font-semibold mb-3"
            style={{ letterSpacing: '.16em', color: 'var(--color-score-red)' }}
          >
            Warning signs
          </p>
          <ul className="space-y-2">
            {activeItem.dysfunctionSigns.map((sign, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-secondary)]">
                <span className="font-bold" style={{ color: 'var(--color-score-red)' }}>
                  ×
                </span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-[var(--color-faint)] mt-8">
        <strong className="text-[var(--color-ink)]">Quick check:</strong> which
        dimension does your team struggle with most? Start there — trust is the
        foundation the other four are built on.
      </p>
    </div>
  );
}

export default TCCARAssessment;

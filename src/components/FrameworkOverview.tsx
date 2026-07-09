import type { Quadrant } from '../types';
import { QUADRANT_LABELS } from '../constants';

interface FrameworkOverviewProps {
  onExploreQuadrant: (quadrant: Quadrant) => void;
}

const domains: { id: Quadrant; gloss: string; color: string }[] = [
  { id: 'structure', gloss: 'sets who owns what', color: 'var(--quad-structure)' },
  { id: 'people', gloss: 'whether you have the capability to deliver', color: 'var(--quad-people)' },
  { id: 'process', gloss: 'how work actually flows', color: 'var(--quad-process)' },
  { id: 'mindset', gloss: 'whether any of it becomes real day to day', color: 'var(--quad-mindset)' },
];

/**
 * Default panel shown before any quadrant is selected — the overarching
 * narrative of the framework, grounded in the IOMA integrated-activation
 * model: four interdependent domains, a leadership core, a culture-values
 * ring, activated together rather than in sequence.
 */
export function FrameworkOverview({ onExploreQuadrant }: FrameworkOverviewProps) {
  return (
    <div className="card p-8 animate-fade-in" data-testid="framework-overview">
      <p
        className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-3"
        style={{ letterSpacing: '.16em' }}
      >
        The overarching idea
      </p>
      <h3 className="font-display font-bold text-[26px] leading-tight text-[var(--color-ink)] mb-4">
        One integrated system, not four separate fixes
      </h3>

      <p className="text-[15px] leading-relaxed text-[var(--color-secondary)] mb-4">
        Most transformations stall because they treat organizational design as a
        sequence of isolated moves — a new structure here, a training program
        there, a values poster on the wall. This framework treats capability as a
        single integrated system: four interdependent domains, held together by
        leadership and expressed through the organization's culture values.
      </p>

      {/* The four domains */}
      <div className="mb-5" style={{ borderTop: '1px solid var(--color-hairline)' }}>
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onExploreQuadrant(domain.id)}
            className="w-full flex items-baseline gap-3 py-3 text-left transition-colors hover:bg-[var(--color-hover-wash)]"
            style={{ borderBottom: '1px solid var(--color-hairline)' }}
          >
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: domain.color, transform: 'translateY(2px)' }}
            />
            <span className="text-[15px] text-[var(--color-secondary)] flex-1">
              <strong className="text-[var(--color-ink)] font-semibold">
                {QUADRANT_LABELS[domain.id]}
              </strong>{' '}
              — {domain.gloss}.
            </span>
            <span className="text-[var(--color-faint)] text-sm">→</span>
          </button>
        ))}
      </div>

      <p className="text-[15px] leading-relaxed text-[var(--color-secondary)] mb-4">
        <strong className="text-[var(--color-ink)] font-semibold">Leadership</strong>{' '}
        sits at the center as the integrating force — aligning the four domains
        rather than optimizing any one in isolation.{' '}
        <strong className="text-[var(--color-ink)] font-semibold">Culture values</strong>{' '}
        form the outer ring: the shared beliefs every domain operates within.
      </p>

      <p className="text-[15px] leading-relaxed text-[var(--color-secondary)]">
        Change lands only when all four move together — which is why the change
        model activates every domain at once instead of running them as phases.
        Select a quadrant to explore its components, playbook modules, and the
        diagnostic questions that measure it — or take the diagnostic to see how
        your organization scores across the whole system.
      </p>
    </div>
  );
}

export default FrameworkOverview;

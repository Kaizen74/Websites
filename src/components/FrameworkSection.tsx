import { useState } from 'react';
import { FrameworkDiagram } from './FrameworkDiagram';
import { QuadrantDetail } from './QuadrantDetail';
import { FrameworkOverview } from './FrameworkOverview';
import type { Quadrant } from '../types';
import { SECTION_IDS, STORAGE_KEYS } from '../constants';

const QUADRANTS: Quadrant[] = ['structure', 'people', 'process', 'mindset'];

/**
 * One-shot handoff from the results page's "View playbook modules" links.
 * Returns a quadrant to open directly, or null to show the overview.
 */
function consumeFocusQuadrant(): Quadrant | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.focusQuadrant);
    if (stored && (QUADRANTS as string[]).includes(stored)) {
      sessionStorage.removeItem(STORAGE_KEYS.focusQuadrant);
      return stored as Quadrant;
    }
  } catch {
    // sessionStorage unavailable — fall through to default
  }
  return null;
}

export function FrameworkSection() {
  // The homepage framework is an educational explainer — never scored.
  // Default state shows the overarching narrative; clicking a quadrant
  // (or a deep link from results) swaps in that quadrant's detail.
  const [activeQuadrant, setActiveQuadrant] = useState<Quadrant | null>(consumeFocusQuadrant);

  const handleQuadrantClick = (quadrant: Quadrant) => {
    setActiveQuadrant(quadrant);
  };

  return (
    <section
      id={SECTION_IDS.framework}
      className="py-24"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">01 · The framework</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            Integrated Organizational Capability and Change Framework
          </h2>
          <p className="text-[17px] leading-[1.65] text-[var(--color-secondary)]" style={{ maxWidth: 640 }}>
            A holistic view of organizational design across four interconnected
            dimensions around a leadership core. Start with the overview, then
            select any quadrant to explore its components, playbook modules, and
            diagnostic questions.
          </p>
        </div>

        {/* Diagram + side panel */}
        <div className="grid lg:grid-cols-[460px_1fr] gap-10 lg:gap-14 items-start">
          <div className="lg:sticky" style={{ top: 96 }}>
            <FrameworkDiagram
              onQuadrantClick={handleQuadrantClick}
              activeQuadrant={activeQuadrant}
            />
          </div>

          {activeQuadrant === null ? (
            <FrameworkOverview onExploreQuadrant={setActiveQuadrant} />
          ) : (
            <div>
              <button
                onClick={() => setActiveQuadrant(null)}
                className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] mb-4"
              >
                ← Framework overview
              </button>
              <QuadrantDetail quadrant={activeQuadrant} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FrameworkSection;

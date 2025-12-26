import { useState } from 'react';
import { Target } from 'lucide-react';
import { FrameworkDiagram } from './FrameworkDiagram';
import { QuadrantDetail } from './QuadrantDetail';
import type { Quadrant, DimensionScores } from '../types';
import { SECTION_IDS } from '../constants';

interface FrameworkSectionProps {
  scores?: Partial<DimensionScores>;
}

export function FrameworkSection({ scores }: FrameworkSectionProps) {
  const [activeQuadrant, setActiveQuadrant] = useState<Quadrant | null>(null);

  const handleQuadrantClick = (quadrant: Quadrant) => {
    setActiveQuadrant(quadrant);
  };

  const handleCloseDetail = () => {
    setActiveQuadrant(null);
  };

  return (
    <section id={SECTION_IDS.framework} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
            <Target className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            The Organizational Design Framework
          </h2>
          <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto">
            A holistic view of organizational design across four interconnected dimensions.
            Click any quadrant to explore its components and diagnostic questions.
          </p>
        </div>

        {/* Framework Diagram */}
        <div className="relative">
          <FrameworkDiagram
            scores={scores}
            onQuadrantClick={handleQuadrantClick}
            activeQuadrant={activeQuadrant}
          />

          {/* Instructions */}
          <p className="text-center text-sm text-[var(--color-secondary)] mt-8">
            Click on any quadrant to view details and related diagnostic questions
          </p>
        </div>

        {/* Quadrant Detail Modal */}
        {activeQuadrant && (
          <QuadrantDetail
            quadrant={activeQuadrant}
            onClose={handleCloseDetail}
            score={scores?.[activeQuadrant]}
          />
        )}
      </div>
    </section>
  );
}

export default FrameworkSection;

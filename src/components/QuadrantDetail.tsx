import type { Quadrant } from '../types';
import { quadrantDetails } from '../data/interventions';
import { diagnosticQuestions } from '../data/questions';
import { PlaybookModules } from './PlaybookModules';

interface QuadrantDetailProps {
  quadrant: Quadrant;
  score?: number;
}

/**
 * Inline detail panel rendered beside the framework diagram
 * (side panel, not a modal — swaps content when a quadrant is clicked).
 */
export function QuadrantDetail({ quadrant, score }: QuadrantDetailProps) {
  const detail = quadrantDetails.find((q) => q.id === quadrant);
  const questions = diagnosticQuestions.filter((q) => q.dimension === quadrant);

  if (!detail) return null;

  return (
    <div className="card p-8 animate-fade-in" data-testid="quadrant-detail-panel">
      {/* Title */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: detail.color }}
        />
        <h3 className="font-display font-bold text-[26px] text-[var(--color-ink)]">
          {detail.title}
        </h3>
        {score !== undefined && (
          <span className="ml-auto text-sm font-bold text-[var(--color-secondary)]">
            {score}%
          </span>
        )}
      </div>
      {detail.summary && (
        <p className="text-[15px] leading-relaxed text-[var(--color-secondary)] mt-2 mb-6">
          {detail.summary}
        </p>
      )}

      {/* Key components as hairline pill chips */}
      <p
        className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-3"
        style={{ letterSpacing: '.16em' }}
      >
        Key components
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {detail.items.map((item) => (
          <span
            key={item}
            className="text-[13px] text-[var(--color-ink)] px-3 py-1.5 rounded-full bg-white"
            style={{ border: '1px solid var(--color-hairline)' }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Playbook modules */}
      <PlaybookModules quadrant={quadrant} />

      {/* Diagnostic lens */}
      <p
        className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mt-8 mb-1"
        style={{ letterSpacing: '.16em' }}
      >
        Diagnostic lens
      </p>
      <div>
        {questions.map((question, i) => (
          <div
            key={question.id}
            className="flex items-start gap-4 py-3"
            style={{
              borderTop: i === 0 ? 'none' : '1px solid var(--color-hairline)',
            }}
          >
            <span className="text-xs font-mono text-[var(--color-faint)] mt-0.5">
              {question.id}
            </span>
            <p className="text-sm leading-relaxed text-[var(--color-secondary)] flex-1">
              {question.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuadrantDetail;

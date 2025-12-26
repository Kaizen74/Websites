import { X } from 'lucide-react';
import type { Quadrant } from '../types';
import { quadrantDetails } from '../data/interventions';
import { diagnosticQuestions } from '../data/questions';

interface QuadrantDetailProps {
  quadrant: Quadrant;
  onClose: () => void;
  score?: number;
}

export function QuadrantDetail({ quadrant, onClose, score }: QuadrantDetailProps) {
  const detail = quadrantDetails.find((q) => q.id === quadrant);
  const questions = diagnosticQuestions.filter((q) => q.dimension === quadrant);

  if (!detail) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="quadrant-detail-panel"
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-6 text-white"
          style={{ backgroundColor: detail.color }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold">{detail.title}</h2>
              {score !== undefined && (
                <p className="text-white/80 mt-1">
                  Current Score: <span className="font-bold">{score}%</span>
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Key Components */}
          <div className="mb-8">
            <h3 className="font-semibold text-[var(--color-charcoal)] mb-4">
              Key Components
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {detail.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: detail.color }}
                  />
                  <span className="text-[var(--color-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Diagnostic Questions */}
          <div>
            <h3 className="font-semibold text-[var(--color-charcoal)] mb-4">
              Related Diagnostic Questions
            </h3>
            <div className="space-y-3">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-[var(--color-secondary)] bg-gray-100 px-2 py-1 rounded">
                      {question.id}
                    </span>
                    <p className="text-[var(--color-charcoal)] flex-1">
                      {question.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuadrantDetail;

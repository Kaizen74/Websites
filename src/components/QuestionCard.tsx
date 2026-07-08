import type { DiagnosticQuestion, LikertValue } from '../types';
import { LIKERT_OPTIONS } from '../constants';

interface QuestionCardProps {
  question: DiagnosticQuestion;
  currentAnswer: LikertValue | undefined;
  onAnswer: (value: LikertValue) => void;
  /** Accepted for backward compatibility; the survey renders progress itself */
  questionNumber?: number;
  totalQuestions?: number;
}

export function QuestionCard({ question, currentAnswer, onAnswer }: QuestionCardProps) {
  return (
    <div className="card p-6 sm:p-10 animate-fade-in">
      {/* Question Text */}
      <h3
        className="font-display font-semibold text-[var(--color-ink)] mb-9"
        style={{ fontSize: 25, lineHeight: 1.4, textWrap: 'pretty' }}
      >
        {question.text}
      </h3>

      {/* Likert Scale: 5-column grid */}
      <div
        className="grid grid-cols-5 gap-2 sm:gap-3"
        role="radiogroup"
        aria-label="Answer scale"
      >
        {LIKERT_OPTIONS.map((option) => {
          const selected = currentAnswer === option.value;
          return (
            <label
              key={option.value}
              className={`likert-option flex-col justify-center gap-1 text-center ${
                selected ? 'selected' : ''
              }`}
              style={{ padding: '14px 6px' }}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={selected}
                onChange={() => onAnswer(option.value as LikertValue)}
                className="sr-only"
                aria-label={option.label}
              />
              <span
                className="font-display font-semibold"
                style={{
                  fontSize: 21,
                  color: selected ? 'var(--color-primary)' : 'var(--color-ink)',
                }}
              >
                {option.value}
              </span>
              <span
                className="leading-tight"
                style={{
                  fontSize: 11.5,
                  color: selected ? 'var(--color-ink)' : 'var(--color-faint)',
                }}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;

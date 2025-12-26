import type { DiagnosticQuestion, LikertValue } from '../types';
import { LIKERT_OPTIONS, DIMENSION_LABELS } from '../constants';

interface QuestionCardProps {
  question: DiagnosticQuestion;
  currentAnswer: LikertValue | undefined;
  onAnswer: (value: LikertValue) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[var(--color-secondary)]">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span
          className="text-xs font-medium px-3 py-1 rounded-full"
          style={{
            backgroundColor:
              question.dimension === 'structure'
                ? '#FEE2E2'
                : question.dimension === 'people'
                ? '#E5E7EB'
                : question.dimension === 'process'
                ? '#E5E7EB'
                : question.dimension === 'mindset'
                ? '#F3F4F6'
                : '#FEF3C7',
            color:
              question.dimension === 'structure'
                ? '#991B1B'
                : question.dimension === 'leadership'
                ? '#92400E'
                : '#374151',
          }}
        >
          {DIMENSION_LABELS[question.dimension]}
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-charcoal)] mb-8 leading-relaxed">
        {question.text}
      </h3>

      {/* Likert Scale Options */}
      <div className="space-y-3">
        {LIKERT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`likert-option ${currentAnswer === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={currentAnswer === option.value}
              onChange={() => onAnswer(option.value as LikertValue)}
              className="sr-only"
              aria-label={option.label}
            />
            <span
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                currentAnswer === option.value
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                  : 'border-gray-300'
              }`}
            >
              {currentAnswer === option.value && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            <span
              className={`text-base ${
                currentAnswer === option.value
                  ? 'text-[var(--color-charcoal)] font-medium'
                  : 'text-[var(--color-secondary)]'
              }`}
            >
              {option.label}
            </span>
            <span className="ml-auto text-sm text-[var(--color-slate)]">
              {option.value}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;

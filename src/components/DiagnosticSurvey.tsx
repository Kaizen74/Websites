import { useEffect, useRef } from 'react';
import { QuestionCard } from './QuestionCard';
import { useDiagnostic } from '../hooks/useDiagnostic';
import { SECTION_IDS, DIMENSION_LABELS } from '../constants';
import type { LikertValue, Dimension } from '../types';

interface DiagnosticSurveyProps {
  onComplete?: (results: ReturnType<ReturnType<typeof useDiagnostic>['calculateResults']>) => void;
}

const dimensionColor: Record<Dimension, string> = {
  structure: 'var(--quad-structure)',
  people: 'var(--quad-people)',
  process: 'var(--quad-process)',
  mindset: 'var(--quad-mindset)',
  leadership: 'var(--quad-leadership)',
};

const AUTO_ADVANCE_MS = 280;

export function DiagnosticSurvey({ onComplete }: DiagnosticSurveyProps) {
  const {
    currentQuestion,
    totalQuestions,
    responses,
    isComplete,
    results,
    currentQuestionData,
    progress,
    answerQuestion,
    goToNext,
    goToPrevious,
    resetSurvey,
  } = useDiagnostic();

  // Refs so the auto-advance timer sees the latest state and only fires
  // if the user hasn't already navigated away from the answered question
  const currentQuestionRef = useRef(currentQuestion);
  const goToNextRef = useRef(goToNext);
  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
    goToNextRef.current = goToNext;
  });

  // Handle completion
  if (isComplete && results) {
    onComplete?.(results);
    return null; // Parent will show results
  }

  if (!currentQuestionData) {
    return null;
  }

  const currentAnswer = responses.get(currentQuestionData.id);
  const canGoNext = currentAnswer !== undefined;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleAnswer = (value: LikertValue) => {
    answerQuestion(value);
    // Auto-advance after a beat, except on the last question
    if (!isLastQuestion) {
      const answeredIndex = currentQuestion;
      window.setTimeout(() => {
        if (currentQuestionRef.current === answeredIndex) {
          goToNextRef.current();
        }
      }, AUTO_ADVANCE_MS);
    }
  };

  return (
    <section
      id={SECTION_IDS.diagnostic}
      className="py-16 min-h-screen"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <a
            href={`#${SECTION_IDS.hero}`}
            className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          >
            ← Back to playbook
          </a>
          <button
            onClick={resetSurvey}
            className="text-sm font-medium text-[var(--color-faint)] hover:text-[var(--color-primary)]"
          >
            Start over
          </button>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="eyebrow mb-4">04 · The diagnostic</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: 1.15 }}
          >
            Organizational health diagnostic
          </h2>
          <p className="text-[15px] text-[var(--color-secondary)]">
            Answer each statement honestly for an accurate read of your organization.
          </p>
        </div>

        {/* Progress row + bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-ink)]">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
              <span
                aria-hidden="true"
                className="inline-block"
                style={{
                  width: 9,
                  height: 9,
                  background: dimensionColor[currentQuestionData.dimension],
                }}
              />
              {DIMENSION_LABELS[currentQuestionData.dimension]}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestionData}
          currentAnswer={currentAnswer}
          onAnswer={handleAnswer}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="text-sm font-medium transition-colors disabled:cursor-not-allowed"
            style={{
              color: currentQuestion === 0 ? 'var(--color-placeholder)' : 'var(--color-secondary)',
            }}
          >
            ← Back
          </button>

          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className="btn btn-primary"
            style={
              !canGoNext
                ? { background: 'var(--color-placeholder)', cursor: 'not-allowed' }
                : undefined
            }
          >
            {isLastQuestion ? 'See your results' : 'Next →'}
          </button>
        </div>

        <p className="text-center text-[13px] text-[var(--color-faint)] mt-8">
          Your answers save automatically — you can leave and come back.
        </p>
      </div>
    </section>
  );
}

export default DiagnosticSurvey;

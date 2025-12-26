import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { useDiagnostic } from '../hooks/useDiagnostic';
import { SECTION_IDS } from '../constants';

interface DiagnosticSurveyProps {
  onComplete?: (results: ReturnType<ReturnType<typeof useDiagnostic>['calculateResults']>) => void;
}

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

  return (
    <section id={SECTION_IDS.diagnostic} className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            Organizational Health Diagnostic
          </h2>
          <p className="text-[var(--color-secondary)]">
            Answer each question honestly to get an accurate assessment
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-secondary)]">
              Progress
            </span>
            <span className="text-sm font-medium text-[var(--color-charcoal)]">
              {Math.round(progress)}%
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
          onAnswer={answerQuestion}
          questionNumber={currentQuestion + 1}
          totalQuestions={totalQuestions}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-charcoal)] hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={resetSurvey}
              className="flex items-center gap-2 px-4 py-2 text-[var(--color-secondary)] hover:text-[var(--color-charcoal)] hover:bg-gray-100 rounded-lg transition-colors"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                canGoNext
                  ? 'btn btn-primary'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLastQuestion ? 'View Results' : 'Next'}
              {!isLastQuestion && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Question Indicators */}
        <div className="flex justify-center gap-1 mt-8 flex-wrap">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const isCurrent = i === currentQuestion;
            const isAnswered = i < responses.size;

            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-[var(--color-primary)] scale-125'
                    : isAnswered
                    ? 'bg-[var(--color-primary)] opacity-50'
                    : 'bg-gray-300'
                }`}
                title={`Question ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DiagnosticSurvey;

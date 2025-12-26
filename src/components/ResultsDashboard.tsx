import { Award, RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
import { FrameworkDiagram } from './FrameworkDiagram';
import { DimensionChart } from './DimensionChart';
import { ExportButton } from './ExportButton';
import { ActivatorCard } from './ActivatorCard';
import { activators } from '../data/activators';
import type { DiagnosticResults } from '../types';
import { SECTION_IDS, DIMENSION_LABELS } from '../constants';
import { getScoreLabel, getScoreColor, mapToActivators } from '../utils/scoring';

interface ResultsDashboardProps {
  results: DiagnosticResults;
  onReset: () => void;
}

export function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  const { dimensionScores, overallScore } = results;
  const priorityActivators = mapToActivators(dimensionScores);
  const overallLabel = getScoreLabel(overallScore);
  const overallColor = getScoreColor(overallScore);

  // Find lowest scoring dimensions
  const sortedDimensions = Object.entries(dimensionScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2);

  const colorClasses = {
    green: 'text-green-600 bg-green-50',
    amber: 'text-amber-600 bg-amber-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <section id={SECTION_IDS.results} className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
            <Award className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            Diagnostic Results
          </h2>
          <p className="text-[var(--color-secondary)]">
            Completed on {new Date(results.completedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-medium text-[var(--color-secondary)] mb-2">
                Overall Score
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-display font-bold text-[var(--color-charcoal)]">
                  {overallScore}%
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[overallColor]}`}
                >
                  {overallLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ExportButton results={results} />
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 text-[var(--color-secondary)] hover:text-[var(--color-charcoal)] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Retake
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Framework Diagram */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-bold text-[var(--color-charcoal)] mb-6">
              Framework Overview
            </h3>
            <FrameworkDiagram scores={dimensionScores} />
          </div>

          {/* Dimension Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-display font-bold text-[var(--color-charcoal)] mb-6">
              Dimension Breakdown
            </h3>
            <DimensionChart scores={dimensionScores} />

            {/* Dimension Details */}
            <div className="mt-6 space-y-3">
              {Object.entries(dimensionScores).map(([dimension, score]) => (
                <div
                  key={dimension}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-[var(--color-charcoal)] font-medium">
                    {DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-sm font-medium ${
                        colorClasses[getScoreColor(score)]
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Areas */}
        {sortedDimensions.length > 0 && sortedDimensions[0][1] < 70 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  Priority Areas for Improvement
                </h3>
                <p className="text-amber-700 mb-4">
                  Based on your scores, consider focusing on these dimensions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sortedDimensions.map(([dimension, score]) => (
                    <span
                      key={dimension}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-amber-800 border border-amber-300"
                    >
                      {DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]} ({score}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Activators */}
        {priorityActivators.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-[var(--color-primary)]" />
              <h3 className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
                Recommended Activators
              </h3>
            </div>
            <p className="text-[var(--color-secondary)] mb-6">
              Based on your diagnostic results, focus on these activators to drive improvement:
            </p>
            <div className="space-y-4">
              {activators
                .filter((a) => priorityActivators.includes(a.title))
                .map((activator) => (
                  <ActivatorCard
                    key={activator.id}
                    activator={activator}
                    isPriority={true}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Action Items */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            Next Steps
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </span>
              <span className="text-[var(--color-secondary)]">
                Review the priority areas and discuss findings with key stakeholders
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </span>
              <span className="text-[var(--color-secondary)]">
                Deep-dive into recommended activators and develop an action plan
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </span>
              <span className="text-[var(--color-secondary)]">
                Export results and schedule follow-up diagnostic in 3-6 months
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ResultsDashboard;

import { FrameworkDiagram } from './FrameworkDiagram';
import { DimensionChart } from './DimensionChart';
import { ExportButton } from './ExportButton';
import { activators } from '../data/activators';
import type { DiagnosticResults } from '../types';
import { SECTION_IDS, DIMENSION_LABELS } from '../constants';
import { getScoreLabel, getScoreColor, mapToActivators } from '../utils/scoring';

interface ResultsDashboardProps {
  results: DiagnosticResults;
  onReset: () => void;
}

const statusColor = {
  green: 'var(--color-score-green)',
  amber: 'var(--color-score-amber)',
  red: 'var(--color-score-red)',
};

/**
 * Readiness interpretation, adapted from change-readiness band guidance:
 * proceed / proceed-with-interventions / readiness sprint / foundations first.
 */
function interpretation(overall: number, weakestLabel: string): string {
  if (overall >= 80) {
    return `A strong foundation — protect what got you here, and use ${weakestLabel} as your stretch dimension.`;
  }
  if (overall >= 65) {
    return `Conditionally ready for change — proceed, with named interventions on ${weakestLabel} sequenced before or alongside launch.`;
  }
  if (overall >= 50) {
    return `At risk — run a focused readiness sprint on ${weakestLabel} before launching major change.`;
  }
  return `Foundations first — fix the fundamentals, starting with ${weakestLabel}, and re-measure in 8–12 weeks before any large-scale launch.`;
}

export function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  const { dimensionScores, overallScore } = results;
  const priorityActivators = mapToActivators(dimensionScores);
  const overallLabel = getScoreLabel(overallScore);
  const overallColor = getScoreColor(overallScore);

  // Two lowest-scoring dimensions
  const sortedDimensions = Object.entries(dimensionScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2);
  const weakestLabel =
    DIMENSION_LABELS[sortedDimensions[0][0] as keyof typeof DIMENSION_LABELS];

  return (
    <section
      id={SECTION_IDS.results}
      className="py-16 min-h-screen"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <a
            href={`#${SECTION_IDS.hero}`}
            className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          >
            ← Back to playbook
          </a>
          <div className="flex items-center gap-3">
            <ExportButton results={results} />
            <button
              onClick={onReset}
              className="text-sm font-medium px-5 py-2.5 text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
              style={{ border: '1px solid var(--color-hairline)', borderRadius: 2 }}
            >
              Retake diagnostic
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-4">Diagnostic results</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-2"
            style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', lineHeight: 1.12 }}
          >
            Your organizational health snapshot
          </h2>
          <p className="text-sm text-[var(--color-faint)]">
            Completed on {new Date(results.completedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Overall score card */}
        <div className="card p-8 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <span
              className="font-display font-bold text-[var(--color-ink)] leading-none"
              style={{ fontSize: 76 }}
            >
              {overallScore}%
            </span>
            <div>
              <span
                className="inline-block text-[12px] uppercase font-semibold px-3 py-1 rounded-full mb-3"
                style={{
                  letterSpacing: '.12em',
                  color: statusColor[overallColor],
                  border: `1px solid ${statusColor[overallColor]}`,
                }}
              >
                {overallLabel}
              </span>
              <p
                className="text-[15px] leading-relaxed text-[var(--color-secondary)]"
                style={{ maxWidth: 560 }}
              >
                {interpretation(overallScore, weakestLabel)}
              </p>
            </div>
          </div>
        </div>

        {/* Diagram + dimension bars */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="card p-8">
            <h3 className="font-display font-bold text-xl text-[var(--color-ink)] mb-8">
              Framework overview
            </h3>
            <FrameworkDiagram scores={dimensionScores} />
          </div>

          <div className="card p-8">
            <h3 className="font-display font-bold text-xl text-[var(--color-ink)] mb-6">
              Dimension breakdown
            </h3>
            <DimensionChart scores={dimensionScores} />
          </div>
        </div>

        {/* Where to focus first */}
        {sortedDimensions.length > 0 && sortedDimensions[0][1] < 70 && (
          <div className="card p-8 mb-12">
            <p
              className="text-[11px] uppercase font-semibold mb-3"
              style={{ letterSpacing: '.16em', color: 'var(--color-score-amber)' }}
            >
              Where to focus first
            </p>
            <p className="text-[15px] text-[var(--color-secondary)] mb-4">
              Your two lowest-scoring dimensions. Targeted beats comprehensive —
              never run more than two interventions at once in the same population.
            </p>
            <div className="flex flex-wrap gap-2">
              {sortedDimensions.map(([dimension, score]) => (
                <span
                  key={dimension}
                  className="text-[13px] font-medium text-[var(--color-ink)] px-3 py-1.5 rounded-full bg-white"
                  style={{ border: '1px solid var(--color-hairline)' }}
                >
                  {DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]} · {score}%
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended activators */}
        {priorityActivators.length > 0 && (
          <div className="mb-16">
            <h3 className="font-display font-bold text-2xl text-[var(--color-ink)] mb-2">
              Recommended activators
            </h3>
            <p className="text-[15px] text-[var(--color-secondary)] mb-6" style={{ maxWidth: 640 }}>
              Based on your lowest dimensions, these Kates-Kesler activators are
              where design work will pay back fastest.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {activators
                .filter((a) => priorityActivators.includes(a.title))
                .map((activator) => (
                  <div
                    key={activator.id}
                    className="card p-6"
                    style={{ borderTop: '2px solid var(--color-primary)' }}
                  >
                    <p
                      className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-2"
                      style={{ letterSpacing: '.14em' }}
                    >
                      Activator 0{activator.id}
                    </p>
                    <h4 className="font-display font-bold text-[19px] text-[var(--color-ink)]">
                      {activator.title}
                    </h4>
                    <p className="text-[13px] text-[var(--color-faint)] mt-1 mb-4">
                      {activator.tagline}
                    </p>
                    <ul className="space-y-1.5">
                      {activator.principles.slice(0, 3).map((principle, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] text-[var(--color-secondary)]"
                        >
                          <span className="text-[var(--color-primary)] font-bold">·</span>
                          {principle}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div>
          <h3 className="font-display font-bold text-2xl text-[var(--color-ink)] mb-8">
            Next steps
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: '1',
                text: 'Share these results with the leaders who own the weakest dimensions — alignment at the top comes before any intervention.',
              },
              {
                n: '2',
                text: 'Pick at most two interventions from the recommended activators and name a business owner and a 30-day first move for each.',
              },
              {
                n: '3',
                text: 'Export the results as your baseline and re-run the diagnostic in 3–6 months — readiness is re-measured, not assumed.',
              },
            ].map((step) => (
              <div key={step.n}>
                <span
                  className="block font-display font-bold leading-none mb-3"
                  style={{ fontSize: 56, color: 'var(--color-placeholder)' }}
                >
                  {step.n}
                </span>
                <p className="text-sm leading-relaxed text-[var(--color-secondary)]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsDashboard;

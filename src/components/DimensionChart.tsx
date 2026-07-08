import type { DimensionScores } from '../types';
import { DIMENSION_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface DimensionChartProps {
  scores: DimensionScores;
}

const fillColor = {
  green: 'var(--color-score-green)',
  amber: 'var(--color-score-amber)',
  red: 'var(--color-score-red)',
};

/** Plain-div horizontal bars — no charting dependency */
export function DimensionChart({ scores }: DimensionChartProps) {
  return (
    <div>
      <div className="space-y-5">
        {Object.entries(scores).map(([dimension, score]) => (
          <div key={dimension}>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--color-ink)]">
                {DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: fillColor[getScoreColor(score)] }}
              >
                {score}%
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 6, background: '#EFE9E1' }}
              role="img"
              aria-label={`${DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]}: ${score}%`}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${Math.max(0, Math.min(100, score))}%`,
                  background: fillColor[getScoreColor(score)],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <p className="text-xs text-[var(--color-faint)] mt-6">
        <span style={{ color: 'var(--color-score-green)' }}>●</span> Healthy ≥ 70
        <span className="mx-2">·</span>
        <span style={{ color: 'var(--color-score-amber)' }}>●</span> Developing 50–69
        <span className="mx-2">·</span>
        <span style={{ color: 'var(--color-score-red)' }}>●</span> Needs attention &lt; 50
      </p>
    </div>
  );
}

export default DimensionChart;

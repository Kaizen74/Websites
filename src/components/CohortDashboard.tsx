import { useState } from 'react';
import type { CohortMember, Dimension } from '../types';
import { SECTION_IDS, DIMENSION_LABELS, MAX_COHORT_SIZE } from '../constants';
import { dimensionInterventions } from '../data/interventions';
import {
  cohortDimensionStats,
  cohortOverallAverage,
} from '../utils/cohort';
import { getScoreColor, getScoreLabel } from '../utils/scoring';

interface CohortDashboardProps {
  members: CohortMember[];
  onRemoveMember: (id: string) => void;
  onClearCohort: () => void;
  onAddRespondent: () => void;
}

const DIMENSIONS: Dimension[] = ['structure', 'people', 'process', 'mindset', 'leadership'];

const statusColor = {
  green: 'var(--color-score-green)',
  amber: 'var(--color-score-amber)',
  red: 'var(--color-score-red)',
};

const statusTint = {
  green: '#EAF3EF',
  amber: '#F7EFE2',
  red: '#F7E8E8',
};

function ScoreCell({ score }: { score: number }) {
  const color = getScoreColor(score);
  return (
    <td
      className="px-3 py-2.5 text-center text-sm font-semibold"
      style={{
        color: statusColor[color],
        background: statusTint[color],
        border: '1px solid var(--color-hairline)',
      }}
    >
      {score}%
    </td>
  );
}

export function CohortDashboard({
  members,
  onRemoveMember,
  onClearCohort,
  onAddRespondent,
}: CohortDashboardProps) {
  const [confirmingClear, setConfirmingClear] = useState(false);

  const stats = cohortDimensionStats(members);
  const overallAverage = cohortOverallAverage(members);
  const overallColor = getScoreColor(overallAverage);
  const overallScores = members.map((m) => m.results.overallScore);
  const overallMin = Math.min(...overallScores);
  const overallMax = Math.max(...overallScores);

  // Two lowest cohort-average dimensions
  const sortedDimensions = DIMENSIONS.map((d) => [d, stats[d].average] as const).sort(
    ([, a], [, b]) => a - b
  );
  const focusDimensions = sortedDimensions.slice(0, 2);

  // Dimension where perceptions diverge most
  const widestSpread = DIMENSIONS.map(
    (d) => [d, stats[d].max - stats[d].min] as const
  ).sort(([, a], [, b]) => b - a)[0];

  const handleExport = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      respondents: members.length,
      overallAverage,
      dimensionStats: stats,
      members: members.map((m) => ({
        name: m.name,
        completedAt: m.results.completedAt,
        overallScore: m.results.overallScore,
        dimensionScores: m.results.dimensionScores,
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cohort-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="py-16 min-h-screen"
      style={{ background: 'var(--color-paper)' }}
      data-testid="cohort-dashboard"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-12">
          <a
            href={`#${SECTION_IDS.hero}`}
            className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)]"
          >
            ← Back to playbook
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="text-sm font-medium px-5 py-2.5"
              style={{ border: '1px solid var(--color-ink)', borderRadius: 2, color: 'var(--color-ink)' }}
            >
              Export cohort JSON
            </button>
            <button
              onClick={() => window.print()}
              className="text-sm font-medium px-5 py-2.5 text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
              style={{ border: '1px solid var(--color-hairline)', borderRadius: 2 }}
            >
              Save as PDF
            </button>
            {confirmingClear ? (
              <span className="flex items-center gap-2 text-sm">
                <span className="text-[var(--color-secondary)]">Delete all {members.length} responses?</span>
                <button
                  onClick={() => {
                    setConfirmingClear(false);
                    onClearCohort();
                  }}
                  className="font-semibold text-[var(--color-score-red)]"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setConfirmingClear(false)}
                  className="font-medium text-[var(--color-secondary)]"
                >
                  Cancel
                </button>
              </span>
            ) : (
              <button
                onClick={() => setConfirmingClear(true)}
                className="text-sm font-medium px-5 py-2.5 text-[var(--color-secondary)] hover:text-[var(--color-score-red)]"
                style={{ border: '1px solid var(--color-hairline)', borderRadius: 2 }}
              >
                Clear cohort
              </button>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-4">Cohort results</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-2"
            style={{ fontSize: 'clamp(32px, 4.5vw, 44px)', lineHeight: 1.12 }}
          >
            Cohort comparison dashboard
          </h2>
          <p className="text-sm text-[var(--color-faint)]">
            {members.length} of {MAX_COHORT_SIZE} respondents
          </p>
        </div>

        {/* Summary card */}
        <div className="card p-8 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <span
              className="font-display font-bold text-[var(--color-ink)] leading-none"
              style={{ fontSize: 76 }}
            >
              {overallAverage}%
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
                Cohort average · {getScoreLabel(overallAverage)}
              </span>
              <p className="text-[15px] leading-relaxed text-[var(--color-secondary)]" style={{ maxWidth: 560 }}>
                Individual overall scores range from {overallMin}% to {overallMax}%.
                {members.length >= 2 && widestSpread[1] > 0 && (
                  <>
                    {' '}Perceptions diverge most on{' '}
                    <strong className="text-[var(--color-ink)]">
                      {DIMENSION_LABELS[widestSpread[0]]}
                    </strong>{' '}
                    ({widestSpread[1]}-point spread) — worth a conversation before acting.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Dimension averages with range */}
        <div className="card p-8 mb-8">
          <h3 className="font-display font-bold text-xl text-[var(--color-ink)] mb-6">
            Dimension averages across the cohort
          </h3>
          <div className="space-y-5">
            {DIMENSIONS.map((dimension) => {
              const { average, min, max } = stats[dimension];
              const color = statusColor[getScoreColor(average)];
              return (
                <div key={dimension}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-sm font-medium text-[var(--color-ink)]">
                      {DIMENSION_LABELS[dimension]}
                    </span>
                    <span className="text-sm">
                      <span className="font-bold" style={{ color }}>
                        {average}%
                      </span>
                      {members.length >= 2 && (
                        <span className="text-[var(--color-faint)]"> · range {min}–{max}</span>
                      )}
                    </span>
                  </div>
                  <div
                    className="relative w-full rounded-full overflow-hidden"
                    style={{ height: 6, background: '#EFE9E1' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${average}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[var(--color-faint)] mt-6">
            <span style={{ color: 'var(--color-score-green)' }}>●</span> Healthy ≥ 70
            <span className="mx-2">·</span>
            <span style={{ color: 'var(--color-score-amber)' }}>●</span> Developing 50–69
            <span className="mx-2">·</span>
            <span style={{ color: 'var(--color-score-red)' }}>●</span> Needs attention &lt; 50
          </p>
        </div>

        {/* Respondent heatmap */}
        <div className="card p-8 mb-8" style={{ overflowX: 'auto' }}>
          <h3 className="font-display font-bold text-xl text-[var(--color-ink)] mb-6">
            Response comparison
          </h3>
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 720 }}>
            <thead>
              <tr>
                <th
                  className="px-3 py-2.5 text-left text-[11px] uppercase font-semibold text-[var(--color-faint)]"
                  style={{ letterSpacing: '.1em', border: '1px solid var(--color-hairline)' }}
                >
                  Respondent
                </th>
                {DIMENSIONS.map((dimension) => (
                  <th
                    key={dimension}
                    className="px-3 py-2.5 text-center text-[11px] uppercase font-semibold text-[var(--color-faint)]"
                    style={{ letterSpacing: '.06em', border: '1px solid var(--color-hairline)' }}
                  >
                    {DIMENSION_LABELS[dimension].split(' ')[0]}
                  </th>
                ))}
                <th
                  className="px-3 py-2.5 text-center text-[11px] uppercase font-semibold text-[var(--color-ink)]"
                  style={{ letterSpacing: '.1em', border: '1px solid var(--color-hairline)' }}
                >
                  Overall
                </th>
                <th className="no-print" style={{ border: 'none', width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td
                    className="px-3 py-2.5 text-sm font-medium text-[var(--color-ink)]"
                    style={{ border: '1px solid var(--color-hairline)' }}
                  >
                    {member.name}
                  </td>
                  {DIMENSIONS.map((dimension) => (
                    <ScoreCell
                      key={dimension}
                      score={member.results.dimensionScores[dimension]}
                    />
                  ))}
                  <ScoreCell score={member.results.overallScore} />
                  <td className="no-print text-center" style={{ border: 'none' }}>
                    <button
                      onClick={() => onRemoveMember(member.id)}
                      aria-label={`Remove ${member.name}`}
                      className="text-[var(--color-faint)] hover:text-[var(--color-score-red)] px-2"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cohort focus areas */}
        <div className="card p-8 mb-12">
          <p
            className="text-[11px] uppercase font-semibold mb-3"
            style={{ letterSpacing: '.16em', color: 'var(--color-score-amber)' }}
          >
            Where the cohort should focus first
          </p>
          <div>
            {focusDimensions.map(([dimension, average], i) => {
              const intervention = dimensionInterventions[dimension];
              return (
                <div
                  key={dimension}
                  className="py-4 grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8"
                  style={{
                    borderTop: i === 0 ? '1px solid var(--color-hairline)' : undefined,
                    borderBottom: '1px solid var(--color-hairline)',
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">
                      {DIMENSION_LABELS[dimension]}
                    </p>
                    <p
                      className="text-sm font-bold mt-0.5"
                      style={{ color: statusColor[getScoreColor(average)] }}
                    >
                      {average}% avg
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="font-display font-semibold text-[18px] text-[var(--color-ink)]">
                        {intervention.title}
                      </h4>
                      <span
                        className="text-[11px] uppercase font-semibold text-[var(--color-faint)]"
                        style={{ letterSpacing: '.1em' }}
                      >
                        {intervention.timeframe}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-secondary)] mt-1.5">
                      {intervention.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add respondent */}
        <div className="no-print text-center">
          {members.length < MAX_COHORT_SIZE ? (
            <button onClick={onAddRespondent} className="btn btn-primary">
              Add next respondent
            </button>
          ) : (
            <p className="text-sm text-[var(--color-faint)]">
              Cohort is full ({MAX_COHORT_SIZE} respondents). Remove a response to add another.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CohortDashboard;

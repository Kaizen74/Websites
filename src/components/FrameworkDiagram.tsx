import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

// Configurable outer ring label
const OUTER_RING_LABEL = 'Culture values';

interface QuadrantSpec {
  id: Quadrant;
  lines: [string, string];
  /** border-radius that rounds the OUTER corner into a quarter disc */
  radius: string;
  /** label placement toward the outer corner */
  labelPosition: React.CSSProperties;
  textAlign: 'left' | 'right';
  color: string;
}

const quadrantSpecs: QuadrantSpec[] = [
  {
    id: 'structure',
    lines: ['Structure &', 'Accountabilities'],
    radius: '100% 0 0 0',
    labelPosition: { top: '26%', left: '15%' },
    textAlign: 'left',
    color: 'var(--quad-structure)',
  },
  {
    id: 'people',
    lines: ['People &', 'Skills'],
    radius: '0 100% 0 0',
    labelPosition: { top: '26%', right: '15%' },
    textAlign: 'right',
    color: 'var(--quad-people)',
  },
  {
    id: 'mindset',
    lines: ['Mindset &', 'Behaviors'],
    radius: '0 0 0 100%',
    labelPosition: { bottom: '26%', left: '15%' },
    textAlign: 'left',
    color: 'var(--quad-mindset)',
  },
  {
    id: 'process',
    lines: ['Process &', 'Systems'],
    radius: '0 0 100% 0',
    labelPosition: { bottom: '26%', right: '15%' },
    textAlign: 'right',
    color: 'var(--quad-process)',
  },
];

const scoreTextClass = { green: 'score-green', amber: 'score-amber', red: 'score-red' };

export function FrameworkDiagram({
  scores,
  onQuadrantClick,
  activeQuadrant,
}: FrameworkDiagramProps) {
  const handleQuadrantClick = (quadrant: Quadrant) => {
    onQuadrantClick?.(quadrant);
  };

  const leadershipScore = scores?.leadership;

  return (
    <div className="relative w-full max-w-md mx-auto pt-8" data-testid="framework-diagram">
      <div className="relative" style={{ aspectRatio: '1 / 1' }}>
        {/* Thin hairline outer ring */}
        <div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{ inset: -16, border: '1px solid var(--color-hairline)' }}
        />

        {/* Ink pill label */}
        <div
          className="absolute left-1/2 z-10"
          style={{ top: -30, transform: 'translateX(-50%)' }}
        >
          <span
            className="uppercase font-semibold px-4 py-1.5 rounded-full whitespace-nowrap"
            style={{
              background: 'var(--color-ink)',
              color: '#fff',
              fontSize: 11,
              letterSpacing: '.14em',
            }}
          >
            {OUTER_RING_LABEL}
          </span>
        </div>

        {/* Quarter-disc quadrants, 4px paper gaps */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
          {quadrantSpecs.map((spec) => {
            const score = scores?.[spec.id];
            const isActive = activeQuadrant === spec.id;

            return (
              <div
                key={spec.id}
                data-testid={`quadrant-${spec.id}`}
                role="button"
                tabIndex={0}
                aria-label={`${QUADRANT_LABELS[spec.id]}${
                  score !== undefined ? ` - Score: ${score}%` : ''
                }`}
                onClick={() => handleQuadrantClick(spec.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuadrantClick(spec.id);
                  }
                }}
                className="relative cursor-pointer transition-[filter] duration-150 hover:brightness-[1.07]"
                style={{
                  background: spec.color,
                  borderRadius: spec.radius,
                  boxShadow: isActive
                    ? 'inset 0 0 0 3px rgba(255,255,255,.55)'
                    : undefined,
                }}
              >
                <div
                  className="absolute pointer-events-none"
                  style={{ ...spec.labelPosition, textAlign: spec.textAlign }}
                >
                  <span
                    className="block text-white font-semibold"
                    style={{ fontSize: 13, lineHeight: 1.35 }}
                  >
                    {spec.lines[0]}
                    <br />
                    {spec.lines[1]}
                  </span>
                  {score !== undefined && (
                    <span
                      className={`inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white text-xs font-bold ${
                        scoreTextClass[getScoreColor(score)]
                      }`}
                    >
                      {score}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Leadership circle */}
        <div
          className="absolute left-1/2 top-1/2 flex flex-col items-center justify-center rounded-full bg-white"
          style={{
            width: '37%',
            height: '37%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid var(--color-hairline)',
          }}
        >
          <span className="font-display font-bold text-[var(--color-ink)]" style={{ fontSize: 17 }}>
            Leadership
          </span>
          {leadershipScore !== undefined && (
            <span
              className={`text-sm font-bold mt-0.5 ${scoreTextClass[getScoreColor(leadershipScore)]}`}
            >
              {leadershipScore}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FrameworkDiagram;

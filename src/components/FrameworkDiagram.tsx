import { useState } from 'react';
import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface QuadrantData {
  id: Quadrant;
  title: string;
  items: string[];
  position: {
    path: string;
    labelX: number;
    labelY: number;
  };
  baseColor: string;
}

const quadrants: QuadrantData[] = [
  {
    id: 'structure',
    title: 'Structure & Accountabilities',
    items: ['Roles & Responsibilities', 'Spans, Layers & Reporting Lines', 'Decision Rights / FOAL'],
    position: {
      path: 'M 200 200 L 200 50 A 150 150 0 0 1 350 200 Z',
      labelX: 275,
      labelY: 125,
    },
    baseColor: '#C41E3A',
  },
  {
    id: 'people',
    title: 'People & Skills',
    items: ['Workforce Size & Location', 'Diversity', 'Knowledge & Skills'],
    position: {
      path: 'M 200 200 L 350 200 A 150 150 0 0 1 200 350 Z',
      labelX: 275,
      labelY: 275,
    },
    baseColor: '#4A5568',
  },
  {
    id: 'process',
    title: 'Process & Systems',
    items: ['Performance Management', 'Workflows & Handoffs', 'Data & Digital Tools', 'Cadence / Routine'],
    position: {
      path: 'M 200 200 L 200 350 A 150 150 0 0 1 50 200 Z',
      labelX: 125,
      labelY: 275,
    },
    baseColor: '#2D3748',
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    items: ['Ways of Working', 'Comms & Engagement', 'Leadership', 'Habits'],
    position: {
      path: 'M 200 200 L 50 200 A 150 150 0 0 1 200 50 Z',
      labelX: 125,
      labelY: 125,
    },
    baseColor: '#718096',
  },
];

function getQuadrantColor(score: number | undefined, baseColor: string): string {
  if (score === undefined) return baseColor;
  const scoreColor = getScoreColor(score);
  switch (scoreColor) {
    case 'green':
      return '#10B981';
    case 'amber':
      return '#F59E0B';
    case 'red':
      return '#EF4444';
    default:
      return baseColor;
  }
}

export function FrameworkDiagram({
  scores,
  onQuadrantClick,
  activeQuadrant,
}: FrameworkDiagramProps) {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<Quadrant | null>(null);

  const handleQuadrantClick = (quadrant: Quadrant) => {
    onQuadrantClick?.(quadrant);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" data-testid="framework-diagram">
      {/* Outer Ring Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-sm font-medium text-[var(--color-secondary)] bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          Values-Driven Design
        </span>
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {/* Outer circle */}
        <circle
          cx="200"
          cy="200"
          r="175"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Quadrants */}
        {quadrants.map((quadrant) => {
          const score = scores?.[quadrant.id];
          const isHovered = hoveredQuadrant === quadrant.id;
          const isActive = activeQuadrant === quadrant.id;
          const color = getQuadrantColor(score, quadrant.baseColor);

          return (
            <g
              key={quadrant.id}
              data-testid={`quadrant-${quadrant.id}`}
              className={`quadrant cursor-pointer transition-all duration-200 ${
                score !== undefined ? `score-${getScoreColor(score)}` : ''
              }`}
              role="button"
              tabIndex={0}
              aria-label={`${QUADRANT_LABELS[quadrant.id]}${score !== undefined ? ` - Score: ${score}%` : ''}`}
              onClick={() => handleQuadrantClick(quadrant.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleQuadrantClick(quadrant.id);
                }
              }}
              onMouseEnter={() => setHoveredQuadrant(quadrant.id)}
              onMouseLeave={() => setHoveredQuadrant(null)}
              style={{
                transform: isHovered || isActive ? 'scale(1.02)' : 'scale(1)',
                transformOrigin: `${quadrant.position.labelX}px ${quadrant.position.labelY}px`,
              }}
            >
              <path
                d={quadrant.position.path}
                fill={color}
                fillOpacity={isHovered || isActive ? 0.9 : 0.8}
                stroke="white"
                strokeWidth="3"
              />

              {/* Quadrant Label */}
              <text
                x={quadrant.position.labelX}
                y={quadrant.position.labelY - 10}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                className="pointer-events-none"
              >
                {quadrant.title.split(' & ')[0]}
              </text>
              <text
                x={quadrant.position.labelX}
                y={quadrant.position.labelY + 6}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="pointer-events-none"
              >
                {quadrant.title.split(' & ')[1] ? `& ${quadrant.title.split(' & ')[1]}` : ''}
              </text>

              {/* Score Badge */}
              {score !== undefined && (
                <g>
                  <circle
                    cx={quadrant.position.labelX}
                    cy={quadrant.position.labelY + 30}
                    r="20"
                    fill="white"
                    fillOpacity="0.95"
                  />
                  <text
                    x={quadrant.position.labelX}
                    y={quadrant.position.labelY + 35}
                    textAnchor="middle"
                    fill={color}
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {score}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center Circle */}
        <circle cx="200" cy="200" r="40" fill="white" stroke="#E2E8F0" strokeWidth="2" />

        {/* Center Arrows (continuous improvement) */}
        <g fill="none" stroke="#C41E3A" strokeWidth="2">
          <path d="M 185 190 A 20 20 0 0 1 215 190" />
          <path d="M 215 210 A 20 20 0 0 1 185 210" />
          <polygon points="185,188 180,195 190,193" fill="#C41E3A" />
          <polygon points="215,212 220,205 210,207" fill="#C41E3A" />
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredQuadrant && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white shadow-lg rounded-lg p-4 w-64 pointer-events-none z-10 animate-fade-in">
          <h4 className="font-semibold text-[var(--color-charcoal)] mb-2">
            {QUADRANT_LABELS[hoveredQuadrant]}
          </h4>
          <ul className="text-sm text-[var(--color-secondary)] space-y-1">
            {quadrants.find((q) => q.id === hoveredQuadrant)?.items.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
          {scores?.[hoveredQuadrant] !== undefined && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-sm font-medium">
                Score: {scores[hoveredQuadrant]}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FrameworkDiagram;

import { useState } from 'react';
import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface QuadrantData {
  id: Quadrant;
  title: string;
  shortTitle: string;
  items: string[];
  angle: number; // Starting angle in degrees (0 = right, 90 = bottom)
  labelAngle: number; // Angle for the label position
}

// Configurable outer ring label
const OUTER_RING_LABEL = 'SATS People Values';

const quadrants: QuadrantData[] = [
  {
    id: 'structure',
    title: 'Structure & Accountabilities',
    shortTitle: 'Structure',
    items: ['Roles & Responsibilities', 'Spans, Layers & Reporting Lines', 'Decision Rights / FOAL'],
    angle: 270, // Top-right quadrant
    labelAngle: 315,
  },
  {
    id: 'people',
    title: 'People & Skills',
    shortTitle: 'People',
    items: ['Workforce Size & Location', 'Diversity', 'Knowledge & Skills'],
    angle: 0, // Bottom-right quadrant
    labelAngle: 45,
  },
  {
    id: 'process',
    title: 'Process & Systems',
    shortTitle: 'Process',
    items: ['Performance Management', 'Workflows & Handoffs', 'Data & Digital Tools', 'Cadence / Routine'],
    angle: 90, // Bottom-left quadrant
    labelAngle: 135,
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    shortTitle: 'Mindset',
    items: ['Ways of Working', 'Comms & Engagement', 'Leadership', 'Habits'],
    angle: 180, // Top-left quadrant
    labelAngle: 225,
  },
];

// Create SVG arc path for a quadrant
function createArcPath(
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1Outer = centerX + outerRadius * Math.cos(startRad);
  const y1Outer = centerY + outerRadius * Math.sin(startRad);
  const x2Outer = centerX + outerRadius * Math.cos(endRad);
  const y2Outer = centerY + outerRadius * Math.sin(endRad);

  const x1Inner = centerX + innerRadius * Math.cos(endRad);
  const y1Inner = centerY + innerRadius * Math.sin(endRad);
  const x2Inner = centerX + innerRadius * Math.cos(startRad);
  const y2Inner = centerY + innerRadius * Math.sin(startRad);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${x1Outer} ${y1Outer}
          A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}
          L ${x1Inner} ${y1Inner}
          A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}
          Z`;
}

// Get position for label on the gray ring
function getLabelPosition(centerX: number, centerY: number, radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad),
  };
}

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

  const centerX = 200;
  const centerY = 200;
  const outerRingRadius = 180;
  const grayRingOuterRadius = 155;
  const grayRingInnerRadius = 125;
  const coralRingOuterRadius = 120;
  const coralRingInnerRadius = 55;
  const leadershipRadius = 50;

  // Default coral color for quadrants
  const coralColor = 'var(--color-accent-coral)';

  return (
    <div className="relative w-full max-w-lg mx-auto" data-testid="framework-diagram">
      {/* Outer Ring Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-sm font-semibold text-[var(--color-primary)] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[var(--color-accent-coral)]">
          {OUTER_RING_LABEL}
        </span>
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {/* Outer decorative ring (dashed) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRingRadius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Gray middle ring background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={grayRingOuterRadius}
          fill="#F1F5F9"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={grayRingInnerRadius}
          fill="white"
        />

        {/* Quadrant divider lines on gray ring */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = centerX + grayRingInnerRadius * Math.cos(rad);
          const y1 = centerY + grayRingInnerRadius * Math.sin(rad);
          const x2 = centerX + grayRingOuterRadius * Math.cos(rad);
          const y2 = centerY + grayRingOuterRadius * Math.sin(rad);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}

        {/* Gray ring quadrant labels */}
        {quadrants.map((quadrant) => {
          const pos = getLabelPosition(centerX, centerY, (grayRingOuterRadius + grayRingInnerRadius) / 2, quadrant.labelAngle);
          return (
            <text
              key={`label-${quadrant.id}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#64748B"
              fontSize="11"
              fontWeight="600"
              className="pointer-events-none"
            >
              {quadrant.shortTitle}
            </text>
          );
        })}

        {/* Coral inner quadrants */}
        {quadrants.map((quadrant) => {
          const score = scores?.[quadrant.id];
          const isHovered = hoveredQuadrant === quadrant.id;
          const isActive = activeQuadrant === quadrant.id;
          const color = getQuadrantColor(score, coralColor);
          const startAngle = quadrant.angle;
          const endAngle = startAngle + 90;

          const path = createArcPath(
            centerX,
            centerY,
            coralRingInnerRadius,
            coralRingOuterRadius,
            startAngle,
            endAngle
          );

          // Position for score badge
          const midAngle = startAngle + 45;
          const badgeRadius = (coralRingOuterRadius + coralRingInnerRadius) / 2;
          const badgePos = getLabelPosition(centerX, centerY, badgeRadius, midAngle);

          return (
            <g
              key={quadrant.id}
              data-testid={`quadrant-${quadrant.id}`}
              className="cursor-pointer transition-all duration-200"
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
            >
              <path
                d={path}
                fill={color}
                fillOpacity={isHovered || isActive ? 0.95 : 0.85}
                stroke="white"
                strokeWidth="2"
                style={{
                  transform: isHovered || isActive ? 'scale(1.03)' : 'scale(1)',
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transition: 'transform 0.2s ease-out, fill-opacity 0.2s ease-out',
                }}
              />

              {/* Score Badge */}
              {score !== undefined && (
                <g>
                  <circle
                    cx={badgePos.x}
                    cy={badgePos.y}
                    r="16"
                    fill="white"
                    fillOpacity="0.95"
                    stroke={color}
                    strokeWidth="1"
                  />
                  <text
                    x={badgePos.x}
                    y={badgePos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={color}
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {score}%
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Quadrant divider lines on coral ring */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = centerX + coralRingInnerRadius * Math.cos(rad);
          const y1 = centerY + coralRingInnerRadius * Math.sin(rad);
          const x2 = centerX + coralRingOuterRadius * Math.cos(rad);
          const y2 = centerY + coralRingOuterRadius * Math.sin(rad);
          return (
            <line
              key={`coral-line-${angle}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Center Leadership Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={leadershipRadius}
          fill="white"
          stroke="var(--color-accent-coral)"
          strokeWidth="3"
        />

        {/* Leadership text */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-primary)"
          fontSize="10"
          fontWeight="700"
        >
          LEADERSHIP
        </text>
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--color-charcoal)"
          fontSize="8"
          fontWeight="500"
        >
          Integration Hub
        </text>

        {/* Circular arrows around leadership (continuous improvement) */}
        <g fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round">
          {/* Top-left arrow arc */}
          <path d="M 178 178 A 28 28 0 0 1 222 178" />
          {/* Bottom-right arrow arc */}
          <path d="M 222 222 A 28 28 0 0 1 178 222" />
          {/* Arrow heads */}
          <polygon points="176,180 182,173 183,183" fill="var(--color-primary)" stroke="none" />
          <polygon points="224,220 218,227 217,217" fill="var(--color-primary)" stroke="none" />
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredQuadrant && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white shadow-lg rounded-lg p-4 w-64 pointer-events-none z-10 animate-fade-in border border-[var(--color-accent-coral-light)]">
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

      {/* Framework Legend */}
      <div className="mt-6 text-center text-sm text-[var(--color-secondary)]">
        <p className="font-medium text-[var(--color-charcoal)]">Integrated Org Capability & Change Framework</p>
        <p className="text-xs mt-1">Click any quadrant to explore playbook modules</p>
      </div>
    </div>
  );
}

export default FrameworkDiagram;

import { useState } from 'react';
import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface QuadrantData {
  id: Quadrant;
  title: string;
  items: string[];
  startAngle: number;
  labelRotation: number;
  itemsPosition: { x: number; y: number };
}

// Configurable outer ring label
const OUTER_RING_LABEL = 'SATS People Values';

// Quadrants positioned to match reference image:
// TOP-LEFT: Structure, TOP-RIGHT: People, BOTTOM-RIGHT: Process, BOTTOM-LEFT: Mindset
const quadrants: QuadrantData[] = [
  {
    id: 'structure',
    title: 'Structure & Accountabilities',
    items: ['Roles &', 'Responsibilities', '', 'Spans, Layers &', 'Reporting Lines', '', 'Decision Rights'],
    startAngle: 180, // Top-left quadrant (180-270 degrees)
    labelRotation: -45,
    itemsPosition: { x: 115, y: 115 },
  },
  {
    id: 'people',
    title: 'People & Skills',
    items: ['Workforce Size', '& Distribution', '', 'Diversity', '', 'Knowledge &', 'Skills'],
    startAngle: 270, // Top-right quadrant (270-360 degrees)
    labelRotation: 45,
    itemsPosition: { x: 285, y: 115 },
  },
  {
    id: 'process',
    title: 'Process & Systems',
    items: ['Performance Mgmt', '', 'Workflows &', 'Handoffs', '', 'Data & Digital Tools', '', 'Cadence / Routine'],
    startAngle: 0, // Bottom-right quadrant (0-90 degrees)
    labelRotation: 135,
    itemsPosition: { x: 285, y: 285 },
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    items: ['Ways of Working', '', 'Comms &', 'Engagement', '', 'Routines'],
    startAngle: 90, // Bottom-left quadrant (90-180 degrees)
    labelRotation: -135,
    itemsPosition: { x: 115, y: 285 },
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

  return `M ${x1Outer} ${y1Outer}
          A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}
          L ${x1Inner} ${y1Inner}
          A ${innerRadius} ${innerRadius} 0 0 0 ${x2Inner} ${y2Inner}
          Z`;
}

// Get position on circle
function getPointOnCircle(centerX: number, centerY: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
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
  const grayRingOuterRadius = 160;
  const grayRingInnerRadius = 125;
  const coralRingOuterRadius = 120;
  const coralRingInnerRadius = 50;
  const leadershipRadius = 45;
  const labelRadius = (grayRingOuterRadius + grayRingInnerRadius) / 2;

  const coralColor = '#E8A5A5';
  const grayColor = '#6B7280';

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
          fill={grayColor}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={grayRingInnerRadius}
          fill="white"
        />

        {/* Quadrant divider lines on gray ring */}
        {[0, 90, 180, 270].map((angle) => {
          const inner = getPointOnCircle(centerX, centerY, grayRingInnerRadius, angle);
          const outer = getPointOnCircle(centerX, centerY, grayRingOuterRadius, angle);
          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Curved text labels on gray ring */}
        {quadrants.map((quadrant) => {
          const midAngle = quadrant.startAngle + 45;
          const pos = getPointOnCircle(centerX, centerY, labelRadius, midAngle);

          // Determine text rotation for readability
          let textRotation = midAngle;
          // For bottom half, flip text so it's not upside down
          if (midAngle > 90 && midAngle < 270) {
            textRotation = midAngle + 180;
          }

          return (
            <text
              key={`label-${quadrant.id}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="9"
              fontWeight="600"
              transform={`rotate(${textRotation}, ${pos.x}, ${pos.y})`}
              className="pointer-events-none"
            >
              {quadrant.title}
            </text>
          );
        })}

        {/* Coral inner quadrants */}
        {quadrants.map((quadrant) => {
          const score = scores?.[quadrant.id];
          const isHovered = hoveredQuadrant === quadrant.id;
          const isActive = activeQuadrant === quadrant.id;
          const color = getQuadrantColor(score, coralColor);
          const startAngle = quadrant.startAngle;
          const endAngle = startAngle + 90;

          const path = createArcPath(
            centerX,
            centerY,
            coralRingInnerRadius,
            coralRingOuterRadius,
            startAngle,
            endAngle
          );

          return (
            <g
              key={quadrant.id}
              data-testid={`quadrant-${quadrant.id}`}
              className="cursor-pointer"
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
                fillOpacity={isHovered || isActive ? 1 : 0.9}
                stroke="white"
                strokeWidth="2"
                style={{
                  transform: isHovered || isActive ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transition: 'transform 0.2s ease-out, fill-opacity 0.2s ease-out',
                }}
              />

              {/* Items text within coral quadrant - always visible */}
              <text
                x={quadrant.itemsPosition.x}
                y={quadrant.itemsPosition.y - 25}
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontWeight="500"
                className="pointer-events-none"
              >
                {quadrant.items.map((item, i) => (
                  <tspan
                    key={i}
                    x={quadrant.itemsPosition.x}
                    dy={i === 0 ? 0 : item === '' ? 5 : 9}
                  >
                    {item}
                  </tspan>
                ))}
              </text>

              {/* Score Badge - overlay when score exists */}
              {score !== undefined && (
                <g>
                  <circle
                    cx={quadrant.itemsPosition.x}
                    cy={quadrant.itemsPosition.y}
                    r="22"
                    fill="white"
                    fillOpacity="0.95"
                    stroke={color}
                    strokeWidth="2"
                  />
                  <text
                    x={quadrant.itemsPosition.x}
                    y={quadrant.itemsPosition.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
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

        {/* Quadrant divider lines on coral ring */}
        {[0, 90, 180, 270].map((angle) => {
          const inner = getPointOnCircle(centerX, centerY, coralRingInnerRadius, angle);
          const outer = getPointOnCircle(centerX, centerY, coralRingOuterRadius, angle);
          return (
            <line
              key={`coral-line-${angle}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
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
          stroke={coralColor}
          strokeWidth="2"
        />

        {/* Leadership text */}
        <text
          x={centerX}
          y={centerY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1F2937"
          fontSize="11"
          fontWeight="700"
        >
          Leadership
        </text>

        {/* Circular arrows around leadership */}
        <g fill="none" stroke={grayColor} strokeWidth="2" strokeLinecap="round">
          <path d="M 177 188 A 27 27 0 0 1 223 188" />
          <path d="M 223 212 A 27 27 0 0 1 177 212" />
          <polygon points="175,190 180,183 182,193" fill={grayColor} stroke="none" />
          <polygon points="225,210 220,217 218,207" fill={grayColor} stroke="none" />
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredQuadrant && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white shadow-lg rounded-lg p-4 w-64 pointer-events-none z-10 animate-fade-in border border-[var(--color-accent-coral-light)]">
          <h4 className="font-semibold text-[var(--color-charcoal)] mb-2">
            {QUADRANT_LABELS[hoveredQuadrant]}
          </h4>
          <ul className="text-sm text-[var(--color-secondary)] space-y-1">
            {quadrants.find((q) => q.id === hoveredQuadrant)?.items.filter(item => item !== '').map((item, i) => (
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

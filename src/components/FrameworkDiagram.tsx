import { useState } from 'react';
import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface QuadrantData {
  id: Quadrant;
  title: string;
  items: string[];
  angle: number; // Starting angle in degrees (0 = right, 90 = bottom)
  labelAngle: number; // Angle for the label position
  itemsPosition: { x: number; y: number }; // Center position for items text
}

// Configurable outer ring label
const OUTER_RING_LABEL = 'SATS People Values';

const quadrants: QuadrantData[] = [
  {
    id: 'structure',
    title: 'Structure & Accountabilities',
    items: ['Roles &', 'Responsibilities', '', 'Spans, Layers &', 'Reporting Lines', '', 'Decision Rights'],
    angle: 270, // Top-right quadrant
    labelAngle: 315,
    itemsPosition: { x: 290, y: 115 },
  },
  {
    id: 'people',
    title: 'People & Skills',
    items: ['Workforce Size', '& Distribution', '', 'Diversity', '', 'Knowledge &', 'Skills'],
    angle: 0, // Bottom-right quadrant
    labelAngle: 45,
    itemsPosition: { x: 290, y: 285 },
  },
  {
    id: 'process',
    title: 'Process & Systems',
    items: ['Performance Mgmt', '', 'Workflows &', 'Handoffs', '', 'Data & Digital Tools', '', 'Cadence / Routine'],
    angle: 90, // Bottom-left quadrant
    labelAngle: 135,
    itemsPosition: { x: 110, y: 285 },
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    items: ['Ways of Working', '', 'Comms &', 'Engagement', '', 'Routines'],
    angle: 180, // Top-left quadrant
    labelAngle: 225,
    itemsPosition: { x: 110, y: 115 },
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

// Create arc path for curved text
function createTextArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweep = endAngle > startAngle ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
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

  // Radius for curved text on gray ring
  const textRadius = (grayRingOuterRadius + grayRingInnerRadius) / 2;

  // Default coral color for quadrants
  const coralColor = '#E8A5A5';

  return (
    <div className="relative w-full max-w-lg mx-auto" data-testid="framework-diagram">
      {/* Outer Ring Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center">
        <span className="text-sm font-semibold text-[var(--color-primary)] bg-white px-4 py-1.5 rounded-full shadow-sm border border-[var(--color-accent-coral)]">
          {OUTER_RING_LABEL}
        </span>
      </div>

      <svg viewBox="0 0 400 400" className="w-full h-auto">
        <defs>
          {/* Arc paths for curved text - clockwise direction for top labels */}
          <path
            id="arcStructure"
            d={createTextArcPath(centerX, centerY, textRadius, 280, 350)}
            fill="none"
          />
          <path
            id="arcPeople"
            d={createTextArcPath(centerX, centerY, textRadius, 10, 80)}
            fill="none"
          />
          {/* Bottom labels need reverse direction */}
          <path
            id="arcProcess"
            d={createTextArcPath(centerX, centerY, textRadius, 170, 100)}
            fill="none"
          />
          <path
            id="arcMindset"
            d={createTextArcPath(centerX, centerY, textRadius, 260, 190)}
            fill="none"
          />
        </defs>

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
          fill="#6B7280"
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
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Curved text labels on gray ring */}
        <text fill="white" fontSize="10" fontWeight="600" className="pointer-events-none">
          <textPath href="#arcStructure" startOffset="50%" textAnchor="middle">
            Structure & Accountabilities
          </textPath>
        </text>
        <text fill="white" fontSize="10" fontWeight="600" className="pointer-events-none">
          <textPath href="#arcPeople" startOffset="50%" textAnchor="middle">
            People & Skills
          </textPath>
        </text>
        <text fill="white" fontSize="10" fontWeight="600" className="pointer-events-none">
          <textPath href="#arcProcess" startOffset="50%" textAnchor="middle">
            Process & Systems
          </textPath>
        </text>
        <text fill="white" fontSize="10" fontWeight="600" className="pointer-events-none">
          <textPath href="#arcMindset" startOffset="50%" textAnchor="middle">
            Mindset & Behaviors
          </textPath>
        </text>

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
                  transform: isHovered || isActive ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: `${centerX}px ${centerY}px`,
                  transition: 'transform 0.2s ease-out, fill-opacity 0.2s ease-out',
                }}
              />

              {/* Items text within coral quadrant */}
              {score === undefined && (
                <text
                  x={quadrant.itemsPosition.x}
                  y={quadrant.itemsPosition.y}
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
                      dy={i === 0 ? 0 : item === '' ? 4 : 9}
                    >
                      {item}
                    </tspan>
                  ))}
                </text>
              )}

              {/* Score Badge */}
              {score !== undefined && (
                <g>
                  <circle
                    cx={quadrant.itemsPosition.x}
                    cy={quadrant.itemsPosition.y}
                    r="20"
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
                    fontSize="12"
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
          stroke="white"
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

        {/* Circular arrows around leadership (continuous improvement) */}
        <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          {/* Top arc */}
          <path d="M 178 185 A 25 25 0 0 1 222 185" />
          {/* Bottom arc */}
          <path d="M 222 215 A 25 25 0 0 1 178 215" />
          {/* Arrow heads */}
          <polygon points="176,187 181,180 183,190" fill="white" stroke="none" />
          <polygon points="224,213 219,220 217,210" fill="white" stroke="none" />
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

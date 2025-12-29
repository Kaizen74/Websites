import { useState } from 'react';
import type { Quadrant, FrameworkDiagramProps } from '../types';
import { QUADRANT_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface QuadrantData {
  id: Quadrant;
  title: string;
  items: string[];
  startAngle: number;
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
    itemsPosition: { x: 145, y: 145 },
  },
  {
    id: 'people',
    title: 'People & Skills',
    items: ['Workforce Size', '& Distribution', '', 'Diversity', '', 'Knowledge &', 'Skills'],
    startAngle: 270, // Top-right quadrant (270-360 degrees)
    itemsPosition: { x: 255, y: 145 },
  },
  {
    id: 'process',
    title: 'Process & Systems',
    items: ['Performance Mgmt', '', 'Workflows &', 'Handoffs', '', 'Data & Digital Tools', '', 'Cadence'],
    startAngle: 0, // Bottom-right quadrant (0-90 degrees)
    itemsPosition: { x: 255, y: 255 },
  },
  {
    id: 'mindset',
    title: 'Mindset & Behaviors',
    items: ['Ways of Working', '', 'Comms &', 'Engagement', '', 'Habits'],
    startAngle: 90, // Bottom-left quadrant (90-180 degrees)
    itemsPosition: { x: 145, y: 255 },
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

// Create arc path for text (for textPath)
function createTextArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  clockwise: boolean = true
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const sweepFlag = clockwise ? 1 : 0;
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
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
  const outerRingOuterRadius = 190;
  const outerRingInnerRadius = 165;
  const grayRingOuterRadius = 160;
  const grayRingInnerRadius = 125;
  const coralRingOuterRadius = 120;
  const coralRingInnerRadius = 50;
  const leadershipRadius = 45;
  const labelRadius = (grayRingOuterRadius + grayRingInnerRadius) / 2;

  // Color palette matching reference
  const satsVibrantRed = '#FF2E36'; // Outer ring
  const softSalmon = '#FF9EA2'; // Inner coral quadrants
  const charcoalGrey = '#636466'; // Middle ring for quadrant labels

  return (
    <div className="relative w-full max-w-lg mx-auto" data-testid="framework-diagram">
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        <defs>
          {/* Arc path for outer ring text (top arc - positioned lower/centered in red ring) */}
          <path
            id="outerRingTextPath"
            d={createTextArcPath(centerX, centerY, outerRingInnerRadius + 8, 215, 325, true)}
            fill="none"
          />
          {/* Arc paths for quadrant labels - wider arcs to fit full text */}
          <path
            id="structureLabelPath"
            d={createTextArcPath(centerX, centerY, labelRadius, 190, 260, true)}
            fill="none"
          />
          <path
            id="peopleLabelPath"
            d={createTextArcPath(centerX, centerY, labelRadius, 280, 350, true)}
            fill="none"
          />
          <path
            id="processLabelPath"
            d={createTextArcPath(centerX, centerY, labelRadius, 80, 10, false)}
            fill="none"
          />
          <path
            id="mindsetLabelPath"
            d={createTextArcPath(centerX, centerY, labelRadius, 170, 100, false)}
            fill="none"
          />
        </defs>

        {/* Outer solid red ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRingOuterRadius}
          fill={satsVibrantRed}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRingInnerRadius}
          fill="white"
        />

        {/* SATS People Values curved text on outer ring */}
        <text
          fill="white"
          fontSize="22"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="2"
        >
          <textPath
            href="#outerRingTextPath"
            startOffset="50%"
            textAnchor="middle"
          >
            {OUTER_RING_LABEL}
          </textPath>
        </text>

        {/* Charcoal Grey middle ring background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={grayRingOuterRadius}
          fill={charcoalGrey}
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
              strokeWidth="3"
            />
          );
        })}

        {/* Curved text labels on gray ring */}
        <text fill="white" fontSize="12" fontWeight="600" fontStyle="italic">
          <textPath href="#structureLabelPath" startOffset="50%" textAnchor="middle">
            Structure & Accountabilities
          </textPath>
        </text>
        <text fill="white" fontSize="12" fontWeight="600" fontStyle="italic">
          <textPath href="#peopleLabelPath" startOffset="50%" textAnchor="middle">
            People & Skills
          </textPath>
        </text>
        <text fill="white" fontSize="12" fontWeight="600" fontStyle="italic">
          <textPath href="#processLabelPath" startOffset="50%" textAnchor="middle">
            Process & Systems
          </textPath>
        </text>
        <text fill="white" fontSize="12" fontWeight="600" fontStyle="italic">
          <textPath href="#mindsetLabelPath" startOffset="50%" textAnchor="middle">
            Mindset & Behaviors
          </textPath>
        </text>

        {/* Coral inner quadrants */}
        {quadrants.map((quadrant) => {
          const score = scores?.[quadrant.id];
          const isHovered = hoveredQuadrant === quadrant.id;
          const isActive = activeQuadrant === quadrant.id;
          const color = getQuadrantColor(score, softSalmon);
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
                fillOpacity={isHovered || isActive ? 1 : 0.95}
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
                y={quadrant.itemsPosition.y - 15}
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="600"
                className="pointer-events-none"
              >
                {quadrant.items.map((item, i) => (
                  <tspan
                    key={i}
                    x={quadrant.itemsPosition.x}
                    dy={i === 0 ? 0 : item === '' ? 3 : 10}
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
          stroke={softSalmon}
          strokeWidth="2"
        />

        {/* Leadership text */}
        <text
          x={centerX}
          y={centerY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1F2937"
          fontSize="12"
          fontWeight="700"
        >
          Leadership
        </text>

        {/* Circular arrows around leadership - white color to match reference */}
        <g fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <path d="M 175 188 A 30 30 0 0 1 225 188" />
          <path d="M 225 212 A 30 30 0 0 1 175 212" />
          <polygon points="173,191 179,182 182,194" fill="white" stroke="none" />
          <polygon points="227,209 221,218 218,206" fill="white" stroke="none" />
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredQuadrant && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-white shadow-lg rounded-lg p-4 w-64 pointer-events-none z-10 animate-fade-in border-2 border-[#FF9EA2]">
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

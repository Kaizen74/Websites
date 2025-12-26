import { useState } from 'react';
import { MessageSquare, Users, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { changeLevers } from '../data/interventions';
import { SECTION_IDS } from '../constants';
import { TCCARAssessment } from './TCCARAssessment';

const iconMap: Record<number, React.ReactNode> = {
  1: <MessageSquare className="w-8 h-8" />,
  2: <Users className="w-8 h-8" />,
  3: <Clock className="w-8 h-8" />,
};

const colorMap: Record<number, { bg: string; text: string; border: string; accent: string }> = {
  1: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-100' },
  2: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', accent: 'bg-purple-100' },
  3: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'bg-emerald-100' },
};

const phaseLabels: Record<number, string> = {
  1: 'Narrative',
  2: 'Engagement',
  3: 'Reinforcement',
};

export function ChangeLevers() {
  const [showTCCAR, setShowTCCAR] = useState(false);
  const [expandedLever, setExpandedLever] = useState<number | null>(null);

  return (
    <section id={SECTION_IDS.changeLevers} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            The 3 C's of Change
          </h2>
          <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto">
            A powerful operating system for driving organizational change,
            moving from awareness to embedding new behaviors.
          </p>
        </div>

        {/* Change Lever Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {changeLevers.map((lever) => {
            const colors = colorMap[lever.id];
            const icon = iconMap[lever.id];
            const isExpanded = expandedLever === lever.id;

            return (
              <div
                key={lever.id}
                className={`card p-6 border-t-4 ${colors.border} hover:translate-y-[-4px] transition-transform`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${colors.bg} ${colors.text} mb-4`}
                >
                  {icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-[var(--color-charcoal)] mb-2">
                  {lever.title}
                </h3>

                {/* Phase Label */}
                <p className={`inline-block text-xs font-semibold ${colors.text} ${colors.accent} px-2 py-1 rounded-full mb-4`}>
                  {phaseLabels[lever.id]}
                </p>

                {/* Goal */}
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[var(--color-charcoal)]">Goal: </span>
                  <span className="text-sm text-[var(--color-secondary)]">{lever.goal}</span>
                </div>

                {/* Method */}
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[var(--color-charcoal)]">Method: </span>
                  <span className="text-sm text-[var(--color-secondary)]">{lever.method}</span>
                </div>

                {/* Tool (if exists) */}
                {lever.tool && (
                  <div className={`${colors.bg} ${colors.text} rounded-lg p-3 text-sm mb-4`}>
                    <span className="font-medium">Tool: </span>
                    {lever.tool}
                  </div>
                )}

                {/* Expand button for description */}
                <button
                  onClick={() => setExpandedLever(isExpanded ? null : lever.id)}
                  className={`flex items-center gap-1 text-sm ${colors.text} hover:underline mt-2`}
                >
                  {isExpanded ? 'Show less' : 'Learn more'}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded description */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                    <p className="text-sm text-[var(--color-secondary)]">{lever.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connection Flow */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 text-[var(--color-secondary)]">
            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold shadow-sm">
              1
            </span>
            <span className="text-2xl text-gray-300">→</span>
            <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shadow-sm">
              2
            </span>
            <span className="text-2xl text-gray-300">→</span>
            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shadow-sm">
              3
            </span>
          </div>
          <p className="text-sm text-[var(--color-secondary)] mt-4 max-w-md mx-auto">
            Each lever builds on the previous: clear communication enables co-creation,
            which establishes the foundation for sustained behavioral change.
          </p>
        </div>

        {/* T.C.C.A.R. Section */}
        <div className="border-t border-gray-100 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-[var(--color-charcoal)] mb-2">
              Cadence Tool: T.C.C.A.R. Framework
            </h3>
            <p className="text-[var(--color-secondary)] max-w-xl mx-auto">
              The T.C.C.A.R. model helps teams build the foundation for sustainable change
              by addressing the five key dimensions of team effectiveness.
            </p>
          </div>

          <button
            onClick={() => setShowTCCAR(!showTCCAR)}
            className={`mx-auto flex items-center gap-2 btn ${showTCCAR ? 'btn-secondary' : 'btn-primary'}`}
          >
            {showTCCAR ? 'Hide' : 'Explore'} T.C.C.A.R. Framework
            {showTCCAR ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTCCAR && (
            <div className="mt-8 animate-slide-up">
              <TCCARAssessment />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ChangeLevers;

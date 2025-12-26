import { MessageSquare, Users, Clock } from 'lucide-react';
import { changeLevers } from '../data/interventions';
import { SECTION_IDS } from '../constants';

const iconMap: Record<number, React.ReactNode> = {
  1: <MessageSquare className="w-8 h-8" />,
  2: <Users className="w-8 h-8" />,
  3: <Clock className="w-8 h-8" />,
};

const colorMap: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  2: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  3: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

export function ChangeLevers() {
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
        <div className="grid md:grid-cols-3 gap-6">
          {changeLevers.map((lever, index) => {
            const colors = colorMap[lever.id];
            const icon = iconMap[lever.id];

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

                {/* Subtitle */}
                <p className="text-sm text-[var(--color-secondary)] italic mb-4">
                  {lever.id === 1 ? 'Narrative' : lever.id === 2 ? 'Engagement' : 'Reinforcement'}
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
                  <div className={`${colors.bg} ${colors.text} rounded-lg p-3 text-sm`}>
                    <span className="font-medium">Tool: </span>
                    {lever.tool}
                  </div>
                )}

                {/* Connection line (visual) */}
                {index < changeLevers.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* Connection Description */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-[var(--color-secondary)]">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <span className="text-2xl">→</span>
            <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <span className="text-2xl">→</span>
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
              3
            </span>
          </div>
          <p className="text-sm text-[var(--color-secondary)] mt-4 max-w-md mx-auto">
            Each lever builds on the previous: clear communication enables co-creation,
            which establishes the foundation for sustained behavioral change.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChangeLevers;

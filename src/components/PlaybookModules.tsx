import { useState } from 'react';
import { ChevronDown, ChevronUp, Wrench, Lightbulb } from 'lucide-react';
import { playbookModules } from '../data/interventions';
import type { Quadrant } from '../types';
import { QUADRANT_LABELS } from '../constants';

interface PlaybookModulesProps {
  quadrant: Quadrant;
}

const quadrantColors: Record<Quadrant, { bg: string; text: string; border: string; accent: string }> = {
  structure: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', accent: 'bg-red-100' },
  people: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', accent: 'bg-slate-100' },
  process: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', accent: 'bg-gray-100' },
  mindset: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-100' },
};

export function PlaybookModules({ quadrant }: PlaybookModulesProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules = playbookModules.filter((m) => m.quadrant === quadrant);
  const colors = quadrantColors[quadrant];

  if (modules.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <h4 className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
        Playbook Modules for {QUADRANT_LABELS[quadrant]}
      </h4>

      <div className="space-y-3">
        {modules.map((module) => {
          const isExpanded = expandedModule === module.id;

          return (
            <div
              key={module.id}
              className={`border rounded-lg overflow-hidden ${colors.border} transition-all duration-200 ${isExpanded ? 'shadow-md' : ''}`}
            >
              <button
                onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                className={`w-full flex items-center justify-between p-4 text-left ${colors.bg} hover:brightness-95 transition-all`}
              >
                <div>
                  <span className={`font-semibold ${colors.text}`}>{module.title}</span>
                  <p className="text-sm text-[var(--color-secondary)] mt-1">{module.description}</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className={`w-5 h-5 ${colors.text} flex-shrink-0 ml-2`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${colors.text} flex-shrink-0 ml-2`} />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 bg-white animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Interventions */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
                        <span className="text-sm font-semibold text-[var(--color-charcoal)]">
                          Interventions
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {module.interventions.map((intervention, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--color-secondary)]"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.accent} mt-1.5 flex-shrink-0`} />
                            {intervention}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-[var(--color-primary)]" />
                        <span className="text-sm font-semibold text-[var(--color-charcoal)]">
                          Tools & Templates
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {module.tools.map((tool, i) => (
                          <li
                            key={i}
                            className={`inline-block text-xs font-medium ${colors.text} ${colors.accent} px-2 py-1 rounded mr-2 mb-2`}
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlaybookModules;

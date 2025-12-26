import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import { tccarItems } from '../data/interventions';
import type { TCCARDimension } from '../types';

const dimensionColors: Record<TCCARDimension, { bg: string; border: string; text: string; icon: string }> = {
  trust: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-500' },
  conflict: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-500' },
  commitment: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-500' },
  accountability: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'text-emerald-500' },
  results: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-500' },
};

export function TCCARAssessment() {
  const [expandedDimension, setExpandedDimension] = useState<TCCARDimension | null>(null);

  const toggleDimension = (id: TCCARDimension) => {
    setExpandedDimension(expandedDimension === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-display font-bold text-[var(--color-charcoal)] mb-2">
          T.C.C.A.R. Team Health Framework
        </h3>
        <p className="text-sm text-[var(--color-secondary)]">
          Based on Patrick Lencioni's 5 Dysfunctions model, adapted for organizational design.
          Click each dimension to explore healthy behaviors and warning signs.
        </p>
      </div>

      {/* TCCAR Pyramid Visual */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xs">
          {tccarItems.slice().reverse().map((item, index) => {
            const colors = dimensionColors[item.id];
            const width = 100 - (index * 15);
            const isExpanded = expandedDimension === item.id;

            return (
              <button
                key={item.id}
                onClick={() => toggleDimension(item.id)}
                className={`w-full mb-1 py-2 px-4 rounded text-center font-medium text-sm transition-all duration-200 ${colors.bg} ${colors.border} border ${colors.text} hover:scale-[1.02] ${isExpanded ? 'ring-2 ring-offset-1 ring-[var(--color-primary)]' : ''}`}
                style={{ width: `${width}%`, marginLeft: `${(100 - width) / 2}%` }}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dimension Details */}
      <div className="space-y-3">
        {tccarItems.map((item) => {
          const colors = dimensionColors[item.id];
          const isExpanded = expandedDimension === item.id;

          return (
            <div
              key={item.id}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${colors.border} ${isExpanded ? 'shadow-md' : ''}`}
            >
              <button
                onClick={() => toggleDimension(item.id)}
                className={`w-full flex items-center justify-between p-4 text-left ${colors.bg} hover:brightness-95 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {item.title.charAt(0)}
                  </span>
                  <span className={`font-semibold ${colors.text}`}>{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className={`w-5 h-5 ${colors.icon}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${colors.icon}`} />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 bg-white animate-fade-in">
                  <p className="text-sm text-[var(--color-secondary)] mb-4">
                    {item.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Healthy Behaviors */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Healthy Signs</span>
                      </div>
                      <ul className="space-y-1">
                        {item.healthyBehaviors.map((behavior, i) => (
                          <li key={i} className="text-xs text-green-700 flex items-start gap-1">
                            <span className="mt-1">•</span>
                            <span>{behavior}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dysfunction Signs */}
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-700">Warning Signs</span>
                      </div>
                      <ul className="space-y-1">
                        {item.dysfunctionSigns.map((sign, i) => (
                          <li key={i} className="text-xs text-red-700 flex items-start gap-1">
                            <span className="mt-1">•</span>
                            <span>{sign}</span>
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

      {/* Quick Assessment Prompt */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-[var(--color-secondary)] text-center">
          <strong className="text-[var(--color-charcoal)]">Quick Check:</strong> Which dimension
          does your team struggle with most? Start there and work your way up the pyramid.
        </p>
      </div>
    </div>
  );
}

export default TCCARAssessment;

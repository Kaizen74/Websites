import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import type { Activator } from '../types';

interface ActivatorCardProps {
  activator: Activator;
  isExpanded?: boolean;
  onToggle?: () => void;
  isPriority?: boolean;
}

export function ActivatorCard({
  activator,
  isExpanded = false,
  onToggle,
  isPriority = false,
}: ActivatorCardProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const expanded = onToggle ? isExpanded : isOpen;

  return (
    <div
      className={`card overflow-hidden transition-all duration-300 ${
        isPriority ? 'ring-2 ring-[var(--color-primary)] ring-opacity-50' : ''
      }`}
      data-testid="activator-card"
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-semibold text-[var(--color-primary)] bg-red-50 px-2 py-0.5 rounded">
              {activator.id}
            </span>
            {isPriority && (
              <span className="text-xs font-medium text-white bg-[var(--color-primary)] px-2 py-0.5 rounded">
                Priority
              </span>
            )}
          </div>
          <h3 className="text-xl font-display font-bold text-[var(--color-charcoal)]">
            {activator.title}
          </h3>
          <p className="text-[var(--color-secondary)] mt-1">{activator.tagline}</p>
        </div>
        <div className="ml-4 text-[var(--color-secondary)]">
          {expanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="border-t border-gray-100 pt-6">
            {/* Principles */}
            <div className="mb-6">
              <h4 className="font-semibold text-[var(--color-charcoal)] mb-3">
                Key Principles
              </h4>
              <ul className="space-y-2">
                {activator.principles.map((principle, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2 flex-shrink-0" />
                    <span className="text-[var(--color-secondary)]">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Healthy Signals */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Healthy Signals</h4>
                </div>
                <ul className="space-y-2">
                  {activator.healthySignals.map((signal, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span className="text-green-700">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dysfunction Signals */}
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Dysfunction Signals</h4>
                </div>
                <ul className="space-y-2">
                  {activator.dysfunctionSignals.map((signal, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                      <span className="text-red-700">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivatorCard;

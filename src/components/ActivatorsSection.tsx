import { useState } from 'react';
import { Layers } from 'lucide-react';
import { ActivatorCard } from './ActivatorCard';
import { activators } from '../data/activators';
import { SECTION_IDS } from '../constants';

interface ActivatorsSectionProps {
  priorityActivators?: string[];
}

export function ActivatorsSection({ priorityActivators = [] }: ActivatorsSectionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id={SECTION_IDS.activators} className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)] bg-opacity-10 mb-4">
            <Layers className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-charcoal)] mb-4">
            The Five Activators
          </h2>
          <p className="text-lg text-[var(--color-secondary)] max-w-2xl mx-auto">
            Based on the Kates-Kesler framework, these five activators are critical
            for successful organizational design and transformation.
          </p>
        </div>

        {/* Activator Cards */}
        <div className="space-y-4">
          {activators.map((activator) => (
            <ActivatorCard
              key={activator.id}
              activator={activator}
              isExpanded={expandedId === activator.id}
              onToggle={() => handleToggle(activator.id)}
              isPriority={priorityActivators.includes(activator.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ActivatorsSection;

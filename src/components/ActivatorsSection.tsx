import { useState } from 'react';
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
    <section
      id={SECTION_IDS.activators}
      className="py-24"
      style={{
        background: 'var(--color-bg-white)',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14" style={{ maxWidth: 760 }}>
          <p className="eyebrow mb-4">02 · The five activators</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            What turns a design into performance
          </h2>
          <p className="text-[17px] leading-[1.65] text-[var(--color-secondary)]" style={{ maxWidth: 640 }}>
            Based on the Kates-Kesler framework, these five activators bridge
            organization design and results — the right connections, the right
            conversations, and the right know-how.
          </p>
        </div>

        {/* Hairline-divided accordion list */}
        <div style={{ borderTop: '1px solid var(--color-hairline)' }}>
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

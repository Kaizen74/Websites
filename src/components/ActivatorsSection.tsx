import { useState } from 'react';
import { ActivatorCard } from './ActivatorCard';
import { activators } from '../data/activators';
import { SECTION_IDS } from '../constants';
import { activatorsAnswer } from '../data/playbookAnswers';

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
          <p className="eyebrow mb-4">4.2 · The five activators</p>
          <h2
            className="font-display font-bold text-[var(--color-ink)] mb-4"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {activatorsAnswer.heading}
          </h2>
          <p
            className="text-[17px] leading-[1.65] text-[var(--color-ink)] mb-3"
            style={{ maxWidth: 640, textWrap: 'pretty' }}
          >
            {activatorsAnswer.answer}
          </p>
          <p className="text-[17px] leading-[1.65] text-[var(--color-secondary)]" style={{ maxWidth: 640 }}>
            They connect a design to results through the right connections, the
            right conversations and the right know-how.
          </p>
          <p className="mt-3 text-[13px] text-[var(--color-faint)]" style={{ maxWidth: 640 }}>
            Adapted from Gregory Kesler and Amy Kates,{' '}
            <cite>Bridging Organization Design and Performance</cite>.
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

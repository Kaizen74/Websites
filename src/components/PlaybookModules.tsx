import { playbookModules } from '../data/interventions';
import type { Quadrant } from '../types';

interface PlaybookModulesProps {
  quadrant: Quadrant;
}

/** Playbook modules as white hairline cards — always expanded, no accordion */
export function PlaybookModules({ quadrant }: PlaybookModulesProps) {
  const modules = playbookModules.filter((m) => m.quadrant === quadrant);

  if (modules.length === 0) {
    return null;
  }

  return (
    <div>
      <p
        className="text-[11px] uppercase font-semibold text-[var(--color-faint)] mb-3"
        style={{ letterSpacing: '.16em' }}
      >
        Playbook modules
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div key={module.id} className="card p-5">
            <h4 className="font-display font-semibold text-[17px] text-[var(--color-ink)]">
              {module.title}
            </h4>
            <p className="text-[13px] leading-relaxed text-[var(--color-secondary)] mt-1 mb-3">
              {module.description}
            </p>
            <ul className="space-y-1.5 mb-4">
              {module.interventions.map((intervention, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[13px] text-[var(--color-secondary)]"
                >
                  <span className="text-[var(--color-primary)] font-bold leading-[1.4]">·</span>
                  {intervention}
                </li>
              ))}
            </ul>
            <p
              className="text-[11px] uppercase font-medium text-[var(--color-faint)]"
              style={{ letterSpacing: '.08em' }}
            >
              {module.tools.join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaybookModules;

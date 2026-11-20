import { SECTION_IDS, playbookHref } from '../constants';
import { playbookBridgeCopy, playbookIndexRows } from '../data/home';
import { IndexCard } from './IndexCard';

/** Home 03 · The playbook — one short pitch for the free method, and its contents */
export function PlaybookBridge() {
  return (
    <section
      id={SECTION_IDS.playbook}
      className="py-24"
      style={{
        background: 'var(--color-bg-white)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-4">{playbookBridgeCopy.eyebrow}</p>
            <h2
              className="font-display font-bold text-[var(--color-ink)] mb-4"
              style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
            >
              {playbookBridgeCopy.heading}
            </h2>
            <p
              className="text-[17px] leading-[1.65] text-[var(--color-secondary)] mb-8"
              style={{ maxWidth: 560, textWrap: 'pretty' }}
            >
              {playbookBridgeCopy.lede}
            </p>
            <a href={playbookBridgeCopy.href} className="btn btn-primary">
              {playbookBridgeCopy.cta} →
            </a>
          </div>

          <IndexCard
            label="In the playbook"
            rows={playbookIndexRows.map((r) => ({ ...r, href: playbookHref(r.id) }))}
          />
        </div>
      </div>
    </section>
  );
}

export default PlaybookBridge;

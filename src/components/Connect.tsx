import { SECTION_IDS } from '../constants';
import { connectCopy } from '../data/home';
import { ownedProfiles } from '../data/profile';

const LINKEDIN = ownedProfiles[0].url;

/**
 * Home 04 · Compare notes — the page's one dark band. Three ways to take the
 * ideas further, all of them knowledge sharing: a conversation, the free
 * playbook, following new thinking. No form, no email capture, no offer.
 */
export function Connect() {
  return (
    <section
      id={SECTION_IDS.connect}
      className="py-24"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto mb-12" style={{ maxWidth: 640 }}>
          <p className="eyebrow mb-4" style={{ color: 'var(--color-red-on-dark)' }}>
            {connectCopy.eyebrow}
          </p>
          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(30px, 4vw, 40px)', lineHeight: 1.15 }}
          >
            {connectCopy.heading}
          </h2>
          <p
            className="text-[17px] leading-[1.65]"
            style={{ color: 'rgba(255,255,255,.72)', textWrap: 'pretty' }}
          >
            {connectCopy.body}
          </p>
        </div>

        {/* Hairline grid on ink: the 1px gaps show the faint rule beneath */}
        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-px list-none p-0 m-0"
          style={{
            background: 'rgba(255,255,255,.14)',
            border: '1px solid rgba(255,255,255,.14)',
            borderRadius: 2,
          }}
        >
          {connectCopy.ways.map((way) => {
            const external = way.href === 'linkedin';
            return (
              <li
                key={way.title}
                className="flex flex-col"
                style={{ background: 'var(--color-ink)', padding: '28px 28px 26px' }}
              >
                <h3
                  className="font-display font-bold text-white mb-3"
                  style={{ fontSize: 22, lineHeight: 1.2 }}
                >
                  {way.title}
                </h3>
                <p
                  className="flex-1"
                  style={{ color: 'rgba(255,255,255,.72)', fontSize: 15, lineHeight: 1.6, textWrap: 'pretty' }}
                >
                  {way.body}
                </p>
                <a
                  href={external ? LINKEDIN : way.href}
                  {...(external
                    ? // rel="me" ties this site and the profile together as one identity
                      { target: '_blank', rel: 'me noopener noreferrer' }
                    : {})}
                  className="mt-5 text-[13.5px] font-medium underline underline-offset-4 hover:text-white transition-colors"
                  style={{ color: 'var(--color-red-on-dark)' }}
                >
                  {way.label} {external ? '↗' : '→'}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Connect;

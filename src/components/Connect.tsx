import { SECTION_IDS } from '../constants';
import { connectCopy } from '../data/home';
import { ownedProfiles } from '../data/profile';

/**
 * Home 04 · Compare notes — the page's one dark band. An invitation to
 * exchange ideas through LinkedIn: no form, no email capture, no offer.
 */
export function Connect() {
  return (
    <section
      id={SECTION_IDS.connect}
      className="py-24"
      style={{ background: 'var(--color-ink)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          className="text-[16px] leading-relaxed mb-9 mx-auto"
          style={{ color: 'rgba(255,255,255,.72)', maxWidth: 560, textWrap: 'pretty' }}
        >
          {connectCopy.body}
        </p>
        {/* rel="me" ties this site and the profile together as one identity */}
        <a
          href={ownedProfiles[0].url}
          target="_blank"
          rel="me noopener noreferrer"
          className="btn btn-primary text-lg px-8 py-4"
        >
          {connectCopy.cta} ↗
        </a>
      </div>
    </section>
  );
}

export default Connect;

import { Signature } from './Signature';
import { COPYRIGHT_YEAR, ownedProfiles } from '../data/profile';

/** Footer — hairline on paper. Shared by both pages. */
export function SiteFooter() {
  return (
    <footer
      className="py-12"
      style={{
        background: 'var(--color-paper)',
        borderTop: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-[var(--color-faint)] text-center sm:text-left">
            Organization design · Human-AI work partnership · Singapore
          </span>
          {/* rel="me" ties this site and the profile together as one identity */}
          <a
            href={ownedProfiles[0].url}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-sm font-medium text-[var(--color-ink)] underline underline-offset-4 hover:text-[var(--color-primary)]"
          >
            Follow on LinkedIn ↗
          </a>
        </div>

        {/* Personal brand sign-off */}
        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: '1px solid var(--color-hairline)' }}
        >
          <Signature />
          <span className="text-xs text-[var(--color-faint)] text-center sm:text-right">
            © {COPYRIGHT_YEAR} Eric Yim · All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;

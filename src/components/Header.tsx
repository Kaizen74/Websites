import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SECTION_IDS } from '../constants';

interface NavItem {
  label: string;
  href: string;
}

/** Follows the visitor's route: belief → method → reference → who */
const navItems: NavItem[] = [
  { label: 'Principles', href: `#${SECTION_IDS.principles}` },
  { label: 'How I work', href: `#${SECTION_IDS.approach}` },
  { label: 'Playbook', href: `#${SECTION_IDS.playbook}` },
  { label: 'About', href: `#${SECTION_IDS.about}` },
];

/** 2×2 mini-grid mark using the four quadrant colors */
function QuadrantMark() {
  return (
    <span
      aria-hidden="true"
      className="grid grid-cols-2 gap-[2px] flex-shrink-0"
      style={{ width: 18, height: 18 }}
    >
      <span style={{ background: 'var(--quad-structure)' }} />
      <span style={{ background: 'var(--quad-people)' }} />
      <span style={{ background: 'var(--quad-mindset)' }} />
      <span style={{ background: 'var(--quad-process)' }} />
    </span>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{
        background: 'rgba(250,247,243,.92)',
        borderBottom: '1px solid var(--color-hairline)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          {/* Wordmark is the person: visible at every width, including phones */}
          <a
            href={`#${SECTION_IDS.hero}`}
            className="flex items-center gap-3 text-[var(--color-ink)]"
          >
            <QuadrantMark />
            <span className="font-display font-bold text-lg">Eric Yim</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`#${SECTION_IDS.diagnostic}`}
              className="btn btn-primary text-sm"
              style={{ padding: '10px 20px' }}
            >
              Start diagnostic
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--color-ink)]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 animate-fade-in"
            style={{ borderTop: '1px solid var(--color-hairline)' }}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium py-2 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`#${SECTION_IDS.diagnostic}`}
                onClick={handleNavClick}
                className="btn btn-primary text-center mt-2"
              >
                Start diagnostic
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

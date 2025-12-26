import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SECTION_IDS } from '../constants';
import { FrameworkLogo } from './FrameworkLogo';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Framework', href: `#${SECTION_IDS.framework}` },
  { label: 'Activators', href: `#${SECTION_IDS.activators}` },
  { label: 'Change Levers', href: `#${SECTION_IDS.changeLevers}` },
  { label: 'Diagnostic', href: `#${SECTION_IDS.diagnostic}` },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href={`#${SECTION_IDS.hero}`}
            className="flex items-center gap-2 text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors"
          >
            <FrameworkLogo size={36} />
            <span className="font-display font-bold text-xl hidden sm:block">
              OrgDesign Playbook
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`#${SECTION_IDS.diagnostic}`}
              className="btn btn-primary text-sm"
            >
              Start Diagnostic
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[var(--color-charcoal)] hover:text-[var(--color-primary)]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
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
                Start Diagnostic
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

import { render, screen, within } from '@testing-library/react';
import { Hero } from '../components/Hero';
import { ActivatorsSection } from '../components/ActivatorsSection';
import { ChangeLevers } from '../components/ChangeLevers';
import { PlaybookIntro } from '../components/PlaybookIntro';
import { PlaybookHero } from '../components/PlaybookHero';
import { heroHeading } from '../data/home';

describe('Static Content', () => {
  test('Hero leads with a face, a name and the question he is drawn to', () => {
    render(<Hero />);
    // The H1 is the question he keeps coming back to, not a role or a service
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe(heroHeading);
    expect(h1.textContent).toBe(
      'What should an organisation look like when people and machines share the work?'
    );
    // The visitor sees a face and a name above the fold
    const byline = screen.getByTestId('hero-byline');
    expect(byline.textContent).toContain('Eric Yim');
    expect(byline.textContent).toContain('Organisation design · AI transformation · Singapore');
    const avatar = byline.querySelector('img')!;
    expect(avatar.getAttribute('src')).toBe('/images/eric-yim-avatar.webp');
    // fixed dimensions reserve space before the image loads: no layout shift
    expect(avatar.getAttribute('width')).toBe('56');
    expect(avatar.getAttribute('height')).toBe('56');
    // decorative beside the visible name, so screen readers don't hear it twice
    expect(avatar.getAttribute('alt')).toBe('');
  });

  test('Hero says nothing about a current role, employer or offer', () => {
    render(<Hero />);
    const text = document.body.textContent!;
    expect(text).not.toMatch(/Strategist|Head of|SATS|I help|clients?\b|services?\b|hire/i);
  });

  test('Hero CTAs lead to the playbook first, the diagnostic second', () => {
    render(<Hero />);
    expect(screen.getByText(/Explore the playbook/i).closest('a')!.getAttribute('href')).toBe('/playbook');
    expect(
      screen.getByText(/Take the five-minute diagnostic/i).closest('a')!.getAttribute('href')
    ).toBe('/playbook#diagnostic');
  });

  test('Hero index card lists the home route 01-04', () => {
    render(<Hero />);
    const nav = screen.getByRole('navigation', { name: 'On this page' });
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#questions', '#principles', '/playbook', '#connect']);
  });

  test('Playbook hero index card lists the playbook route 01-05, in sync with section ids', () => {
    render(<PlaybookHero />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('The OrgDesign Playbook');
    const nav = screen.getByRole('navigation', { name: 'On this page' });
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#principles', '#approach', '#differences', '#playbook', '#diagnostic']);
    expect(screen.getByTestId('playbook-byline').getAttribute('href')).toBe('/');
  });

  test('All 5 activators render', () => {
    render(<ActivatorsSection />);
    const activatorCards = screen.getAllByTestId('activator-card');
    expect(activatorCards).toHaveLength(5);
  });

  test('All 3 Change Levers render', () => {
    render(<ChangeLevers />);
    // The answer under the heading names all three, so match the lever titles exactly
    expect(screen.getAllByText(/COMMUNICATE/i).length).toBeGreaterThan(1);
    expect(screen.getAllByText(/CO-CREATE/i).length).toBeGreaterThan(1);
    // Use getAllByText since "CADENCE" appears in both the lever title and TCCAR section
    const cadenceElements = screen.getAllByText(/CADENCE/i);
    expect(cadenceElements.length).toBeGreaterThan(0);
  });

  test('Playbook intro keeps the playbook index and its framework link', () => {
    render(<PlaybookIntro />);
    expect(screen.getByText(/In this playbook/i)).toBeTruthy();
    expect(screen.getByText(/Explore the framework/i)).toBeTruthy();
    const nav = screen.getByRole('navigation', { name: 'In this playbook' });
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#framework', '#activators', '#change-levers', '#ai-native']);
  });

  test('Activators have correct titles', () => {
    render(<ActivatorsSection />);
    // Scope to the cards: the answer under the heading names the activators too
    const cards = screen.getAllByTestId('activator-card').map((c) => within(c));
    const has = (re: RegExp) => cards.some((c) => c.queryByText(re));
    expect(has(/Unique Value-Adding Layers/i)).toBe(true);
    expect(has(/Innovation & Execution Networks/i)).toBe(true);
    expect(has(/The Business Handshake/i)).toBe(true);
    expect(has(/Power, Governance & Decision-Making/i)).toBe(true);
    expect(has(/Matrix-Ready Leaders/i)).toBe(true);
  });
});

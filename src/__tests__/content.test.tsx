import { render, screen, within } from '@testing-library/react';
import { Hero } from '../components/Hero';
import { ActivatorsSection } from '../components/ActivatorsSection';
import { ChangeLevers } from '../components/ChangeLevers';
import { PlaybookIntro } from '../components/PlaybookIntro';

describe('Static Content', () => {
  test('Hero leads with the person and the thesis', () => {
    render(<Hero />);
    // The H1 is the argument, not a generic tagline
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/I design organizations as systems that leaders\s+can run\./);
    // The visitor sees a face and a name above the fold
    const byline = screen.getByTestId('hero-byline');
    expect(byline.textContent).toContain('Eric Yim');
    expect(byline.textContent).toContain('Organization Design Strategist · Singapore');
    const avatar = byline.querySelector('img')!;
    expect(avatar.getAttribute('src')).toBe('/images/eric-yim-avatar.webp');
    // fixed dimensions reserve space before the image loads: no layout shift
    expect(avatar.getAttribute('width')).toBe('56');
    expect(avatar.getAttribute('height')).toBe('56');
    // decorative beside the visible name, so screen readers don't hear it twice
    expect(avatar.getAttribute('alt')).toBe('');
    // Third-party proof, linked to its source
    const proof = screen.getByText(/Hands Them a System/);
    expect(proof).toBeTruthy();
    expect(document.querySelector('a[href*="atalent.com"]')).not.toBeNull();
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

  test('Hero CTAs lead to the principles first, the diagnostic second', () => {
    render(<Hero />);
    expect(screen.getByText(/Read the principles/i).closest('a')!.getAttribute('href')).toBe('#principles');
    expect(
      screen.getByText(/Take the five-minute diagnostic/i).closest('a')!.getAttribute('href')
    ).toBe('#diagnostic');
  });

  test('Hero index card lists the visitor route 01-05, in sync with section ids', () => {
    render(<Hero />);
    const nav = screen.getByRole('navigation', { name: 'On this site' });
    const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#principles', '#approach', '#differences', '#playbook', '#diagnostic']);
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

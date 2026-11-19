import { render, screen } from '@testing-library/react';
import { Hero } from '../components/Hero';
import { ActivatorsSection } from '../components/ActivatorsSection';
import { ChangeLevers } from '../components/ChangeLevers';
import { PlaybookIntro } from '../components/PlaybookIntro';

describe('Static Content', () => {
  test('Hero leads with the person and the thesis', () => {
    render(<Hero />);
    // The H1 is the argument, not a generic tagline
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Leaders don.t need another report\. They need a system\./);
    // The visitor learns whose site this is above the fold
    expect(screen.getByText(/Eric Yim · Organization Design Strategist · Singapore/)).toBeTruthy();
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
    expect(screen.getByText(/COMMUNICATE/i)).toBeTruthy();
    expect(screen.getByText(/CO-CREATE/i)).toBeTruthy();
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
    expect(screen.getByText(/Unique Value-Adding Layers/i)).toBeTruthy();
    expect(screen.getByText(/Innovation & Execution Networks/i)).toBeTruthy();
    expect(screen.getByText(/The Business Handshake/i)).toBeTruthy();
    expect(screen.getByText(/Power, Governance & Decision-Making/i)).toBeTruthy();
    expect(screen.getByText(/Matrix-Ready Leaders/i)).toBeTruthy();
  });
});

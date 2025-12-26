import { render, screen } from '@testing-library/react';
import { Hero } from '../components/Hero';
import { ActivatorsSection } from '../components/ActivatorsSection';
import { ChangeLevers } from '../components/ChangeLevers';

describe('Static Content', () => {
  test('Hero section renders headline', () => {
    render(<Hero />);
    expect(screen.getByText(/Navigate Organizational/i)).toBeTruthy();
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

  test('Hero CTAs are present', () => {
    render(<Hero />);
    expect(screen.getByText(/Explore Framework/i)).toBeTruthy();
    const diagnosticButtons = screen.getAllByText(/Start Diagnostic/i);
    expect(diagnosticButtons.length).toBeGreaterThan(0);
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

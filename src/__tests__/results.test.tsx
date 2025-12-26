import { render, screen } from '@testing-library/react';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { DimensionChart } from '../components/DimensionChart';
import type { DiagnosticResults, LikertValue } from '../types';

describe('Results Dashboard', () => {
  const mockResults: DiagnosticResults = {
    dimensionScores: {
      structure: 75,
      people: 60,
      process: 45,
      mindset: 80,
      leadership: 70,
    },
    overallScore: 66,
    responses: new Map<string, LikertValue>(),
    completedAt: new Date().toISOString(),
  };

  const mockOnReset = jest.fn();

  test('Dashboard displays overall score', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    expect(screen.getByText(/66%/i)).toBeTruthy();
  });

  test('Dashboard displays dimension labels', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    const structureElements = screen.getAllByText(/Structure/i);
    expect(structureElements.length).toBeGreaterThan(0);
  });

  test('Framework diagram is rendered in results', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    expect(screen.getByTestId('framework-diagram')).toBeTruthy();
  });

  test('Export button is present', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    const exportElements = screen.getAllByText(/Export/i);
    expect(exportElements.length).toBeGreaterThan(0);
  });

  test('Retake button is present', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    expect(screen.getByText(/Retake/i)).toBeTruthy();
  });

  test('Priority areas are shown for low scores', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    expect(screen.getByText(/Priority Areas for Improvement/i)).toBeTruthy();
  });

  test('Next steps section is present', () => {
    render(<ResultsDashboard results={mockResults} onReset={mockOnReset} />);
    expect(screen.getByText(/Next Steps/i)).toBeTruthy();
  });
});

describe('DimensionChart', () => {
  const mockScores = {
    structure: 75,
    people: 60,
    process: 45,
    mindset: 80,
    leadership: 70,
  };

  test('DimensionChart renders without crashing', () => {
    render(<DimensionChart scores={mockScores} />);
    // Chart should render without errors
    expect(true).toBe(true);
  });
});

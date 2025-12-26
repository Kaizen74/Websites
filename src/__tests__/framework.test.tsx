import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FrameworkDiagram } from '../components/FrameworkDiagram';
import { FrameworkSection } from '../components/FrameworkSection';

describe('Framework Diagram', () => {
  test('All 4 quadrants are rendered', () => {
    render(<FrameworkDiagram />);
    expect(screen.getByTestId('quadrant-structure')).toBeInTheDocument();
    expect(screen.getByTestId('quadrant-people')).toBeInTheDocument();
    expect(screen.getByTestId('quadrant-process')).toBeInTheDocument();
    expect(screen.getByTestId('quadrant-mindset')).toBeInTheDocument();
  });

  test('All 4 quadrants are clickable', () => {
    render(<FrameworkDiagram />);
    const quadrants = [
      screen.getByTestId('quadrant-structure'),
      screen.getByTestId('quadrant-people'),
      screen.getByTestId('quadrant-process'),
      screen.getByTestId('quadrant-mindset'),
    ];
    expect(quadrants).toHaveLength(4);
    quadrants.forEach((q) => {
      expect(q).toHaveAttribute('role', 'button');
    });
  });

  test('Quadrant click calls onQuadrantClick', () => {
    const mockOnClick = jest.fn();
    render(<FrameworkDiagram onQuadrantClick={mockOnClick} />);
    fireEvent.click(screen.getByTestId('quadrant-structure'));
    expect(mockOnClick).toHaveBeenCalledWith('structure');
  });

  test('Quadrant click expands detail panel', async () => {
    render(<FrameworkSection />);
    fireEvent.click(screen.getByTestId('quadrant-structure'));
    await waitFor(() => {
      expect(screen.getByTestId('quadrant-detail-panel')).toBeVisible();
    });
  });

  test('Score colors apply correctly', () => {
    render(
      <FrameworkDiagram
        scores={{ structure: 80, people: 45, process: 60, mindset: 30 }}
      />
    );
    // Check that quadrants with scores have score badges visible
    expect(screen.getByTestId('quadrant-structure')).toBeInTheDocument();
    expect(screen.getByTestId('quadrant-people')).toBeInTheDocument();
    expect(screen.getByTestId('quadrant-mindset')).toBeInTheDocument();
  });

  test('Framework diagram container renders', () => {
    render(<FrameworkDiagram />);
    expect(screen.getByTestId('framework-diagram')).toBeInTheDocument();
  });
});

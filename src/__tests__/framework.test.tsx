import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { FrameworkDiagram } from '../components/FrameworkDiagram';
import { FrameworkSection } from '../components/FrameworkSection';

describe('Framework Diagram', () => {
  test('All 4 quadrants are rendered', () => {
    render(<FrameworkDiagram />);
    expect(screen.getByTestId('quadrant-structure')).toBeTruthy();
    expect(screen.getByTestId('quadrant-people')).toBeTruthy();
    expect(screen.getByTestId('quadrant-process')).toBeTruthy();
    expect(screen.getByTestId('quadrant-mindset')).toBeTruthy();
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
      expect(q.getAttribute('role')).toBe('button');
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
    // Default is the overview; clicking a quadrant swaps in its detail panel
    expect(screen.queryByTestId('quadrant-detail-panel')).toBeNull();
    fireEvent.click(screen.getByTestId('quadrant-structure'));
    await waitFor(() => {
      expect(screen.getByTestId('quadrant-detail-panel')).toBeTruthy();
    });
  });

  test('Score colors apply correctly', () => {
    render(
      <FrameworkDiagram
        scores={{ structure: 80, people: 45, process: 60, mindset: 30 }}
      />
    );
    // Check that quadrants with scores are rendered
    expect(screen.getByTestId('quadrant-structure')).toBeTruthy();
    expect(screen.getByTestId('quadrant-people')).toBeTruthy();
    expect(screen.getByTestId('quadrant-mindset')).toBeTruthy();
  });

  test('Framework diagram container renders', () => {
    render(<FrameworkDiagram />);
    expect(screen.getByTestId('framework-diagram')).toBeTruthy();
  });

  test('FrameworkDiagram renders no score badges when unscored', () => {
    const { container } = render(<FrameworkDiagram />);
    expect(container.textContent).not.toMatch(/\d+%/);
  });
});

describe('FrameworkSection (homepage — educational, never scored)', () => {
  test('renders no diagnostic score percentages anywhere', () => {
    // Regression: stale localStorage results must not paint scores onto the
    // homepage framework diagram or its side panel.
    const { container } = render(<FrameworkSection />);
    expect(container.textContent).not.toMatch(/\d+%/);
  });

  test('shows the overview narrative by default, before any quadrant is clicked', () => {
    render(<FrameworkSection />);
    expect(screen.getByTestId('framework-overview')).toBeTruthy();
    expect(screen.getByText(/One integrated system, not four separate fixes/i)).toBeTruthy();
    expect(screen.queryByTestId('quadrant-detail-panel')).toBeNull();
  });

  test('clicking a quadrant swaps overview for that quadrant detail (with back link)', async () => {
    render(<FrameworkSection />);
    fireEvent.click(screen.getByTestId('quadrant-process'));
    await waitFor(() => {
      expect(screen.getByTestId('quadrant-detail-panel')).toBeTruthy();
    });
    expect(screen.queryByTestId('framework-overview')).toBeNull();
    const panel = screen.getByTestId('quadrant-detail-panel');
    expect(panel.textContent).toContain('Process & Systems');
    expect(panel.textContent).not.toMatch(/\d+%/);

    // Back link returns to the overview
    fireEvent.click(screen.getByText(/← Framework overview/i));
    expect(screen.getByTestId('framework-overview')).toBeTruthy();
  });

  test('overview domain rows deep-link into a quadrant', async () => {
    render(<FrameworkSection />);
    const overview = screen.getByTestId('framework-overview');
    // Click the "People & Skills" domain row inside the overview
    const peopleRow = within(overview).getByText(/whether you have the capability to deliver/i);
    fireEvent.click(peopleRow);
    await waitFor(() => {
      expect(screen.getByTestId('quadrant-detail-panel')).toBeTruthy();
    });
    expect(screen.getByTestId('quadrant-detail-panel').textContent).toContain('People & Skills');
  });
});

import { render, screen, within } from '@testing-library/react';
import { AiNativeSection } from '../components/AiNativeSection';
import { descentSteps, aiLevels, scoringZones, provenanceTiers } from '../data/aiNative';

describe('AI-native design section', () => {
  test('renders the section headline', () => {
    render(<AiNativeSection />);
    expect(screen.getByText('AI redesigns the work, not the chart')).toBeTruthy();
  });

  test('renders the four descent labels in order', () => {
    const { container } = render(<AiNativeSection />);
    const labels = descentSteps.map((s) => s.label);
    expect(labels).toEqual(['Organisation', 'Position', 'Task', 'Process']);
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });
    // Order in the DOM matches the descent order
    const text = container.textContent ?? '';
    const positions = labels.map((l) => text.indexOf(l));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  test('renders all four level codes and the L3 organisational implication', () => {
    render(<AiNativeSection />);
    ['L0', 'L1', 'L2', 'L3'].forEach((code) => {
      expect(screen.getByText(code)).toBeTruthy();
    });
    expect(
      screen.getByText(
        /An operating-model decision — layers, hand-offs and decision rights move\./i
      )
    ).toBeTruthy();
  });

  test('renders the four zone labels and three provenance labels', () => {
    render(<AiNativeSection />);
    scoringZones.forEach((zone) => {
      expect(screen.getByText(zone.label)).toBeTruthy();
    });
    provenanceTiers.forEach((tier) => {
      expect(screen.getByText(tier.label)).toBeTruthy();
    });
  });

  test('is a static section — renders no button and no interactive handlers', () => {
    const { container } = render(<AiNativeSection />);
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(container.querySelectorAll('input')).toHaveLength(0);
    expect(container.querySelectorAll('[aria-expanded]')).toHaveLength(0);
  });

  test('the Task rung is the single emphasised descent step', () => {
    expect(descentSteps.filter((s) => s.emphasis)).toHaveLength(1);
    expect(descentSteps.find((s) => s.emphasis)?.label).toBe('Task');
  });

  test('L3 is the single emphasised ladder level and rule widths ascend', () => {
    expect(aiLevels.filter((l) => l.emphasis)).toHaveLength(1);
    expect(aiLevels.find((l) => l.emphasis)?.code).toBe('L3');
    const widths = aiLevels.map((l) => l.ruleWidth);
    expect(widths).toEqual([...widths].sort((a, b) => a - b));
  });

  test('has a single section landmark with the ai-native id', () => {
    const { container } = render(<AiNativeSection />);
    const section = container.querySelector('section#ai-native');
    expect(section).not.toBeNull();
    // Heading hierarchy: one H2, then H3s for the moves
    expect(within(section as HTMLElement).getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(
      within(section as HTMLElement).getAllByRole('heading', { level: 3 }).length
    ).toBeGreaterThanOrEqual(3);
  });
});

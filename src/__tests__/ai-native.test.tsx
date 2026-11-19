import { render, screen, within } from '@testing-library/react';
import { AiNativeSection } from '../components/AiNativeSection';
import { descentSteps, aiLevels, scoringZones } from '../data/aiNative';

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

  test('renders the four ladder levels and what the top level implies', () => {
    render(<AiNativeSection />);
    expect(aiLevels.map((l) => l.name)).toEqual(['Manual', 'Assisted', 'Automated', 'Reinvented']);
    aiLevels.forEach((l) => expect(screen.getByText(l.name)).toBeTruthy());
    expect(
      screen.getByText(/An operating-model decision\. Layers, hand-offs and decision rights all move\./)
    ).toBeTruthy();
  });

  test('renders the four zone labels with their research credit', () => {
    const { container } = render(<AiNativeSection />);
    scoringZones.forEach((zone) => {
      expect(screen.getByText(zone.label)).toBeTruthy();
    });
    expect(container.textContent).toMatch(/Stanford.s WORKBank study/);
  });

  test('describes ideas, not the inner workings of any tool', () => {
    // Removed 2026-11-19 at Eric's request: technical detail from his own
    // tool suite (level codes, confidence routing, source-credibility tiers,
    // graph roll-ups, agent overlays) had leaked into this section.
    const { container } = render(<AiNativeSection />);
    const text = container.textContent ?? '';
    [/\bL[0-3]\b/, /provenance/i, /org graph/i, /routed to human review/i, /confidence value/i,
     /software-agent/i, /anchor layer/i, /Regulator-backed|Research-backed|Model-inferred/i,
     /scored separately, never collapsed/i, /value streams?/i].forEach((re) =>
      expect(text).not.toMatch(re)
    );
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

  test('the top level is the single emphasised ladder level and rule widths ascend', () => {
    expect(aiLevels.filter((l) => l.emphasis)).toHaveLength(1);
    expect(aiLevels.find((l) => l.emphasis)?.name).toBe('Reinvented');
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

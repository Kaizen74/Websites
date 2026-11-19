import { render, screen, fireEvent, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { Principles } from '../components/Principles';
import { Approach } from '../components/Approach';
import { Differences } from '../components/Differences';
import { principles, principlesCopy } from '../data/principles';
import * as approach from '../data/approach';
import {
  allStages,
  evidenceGrades,
  differenceCategories,
  classifyDifference,
  exampleDecisions,
  exampleMarkets,
} from '../data/approach';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.hash = '';
});

describe('01 · How I think — principles', () => {
  test('renders all six principles with their numbered headings', () => {
    render(<Principles />);
    expect(screen.getByText(principlesCopy.heading)).toBeTruthy();
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(principles.map((p) => p.title));
  });

  test('every principle links to a section that exists on the home page', () => {
    render(<App />);
    principles.forEach((p) => {
      const id = p.href.replace('#', '');
      // the diagnostic is reached through the CTA band rather than a section id
      if (id === 'diagnostic') return;
      expect(document.getElementById(id)).not.toBeNull();
    });
  });
});

describe('02 · How I work — the six stages', () => {
  test('six stages numbered 0-5 in order: Frame → Deliver', () => {
    expect(allStages.map((s) => s.number)).toEqual(['0', '1', '2', '3', '4', '5']);
    expect(allStages.map((s) => s.name)).toEqual(['Frame', 'Focus', 'Find', 'Dial', 'Design', 'Deliver']);
  });

  test('every stage renders its question and what it produces', () => {
    render(<Approach />);
    allStages.forEach((s) => {
      expect(screen.getByText(s.question)).toBeTruthy();
      expect(screen.getByText(s.produces)).toBeTruthy();
    });
  });

  test('three evidence grades render as a table', () => {
    render(<Approach />);
    const table = screen.getByRole('table');
    evidenceGrades.forEach((g) => {
      expect(within(table).getByText(g.grade)).toBeTruthy();
      expect(within(table).getByText(g.useItTo)).toBeTruthy();
    });
  });
});

describe('03 · Required, chosen or inherited? — the logic', () => {
  test('classification truth table', () => {
    expect(classifyDifference(true, null)).toBe('required');
    expect(classifyDifference(true, true)).toBe('required');
    expect(classifyDifference(true, false)).toBe('required');
    expect(classifyDifference(false, true)).toBe('chosen');
    expect(classifyDifference(false, false)).toBe('inherited');
    expect(classifyDifference(false, null)).toBeNull();
  });

  test('each kind maps to exactly one action', () => {
    const actions = Object.fromEntries(differenceCategories.map((c) => [c.kind, c.action]));
    expect(actions).toEqual({
      required: 'Leave it local',
      chosen: 'Decide: keep or align',
      inherited: 'Harmonize',
    });
  });

  test('worked example rows are internally consistent', () => {
    exampleDecisions.forEach((row) => {
      expect(row.inPractice).toHaveLength(exampleMarkets.length);
      // a "drifted" market really does differ from what the paper says
      row.drifted.forEach((m) => expect(row.inPractice[m]).not.toBe(row.onPaper));
      row.inPractice.forEach((who, m) => {
        if (!row.drifted.includes(m)) expect(who).toBe(row.onPaper);
      });
    });
    // the example demonstrates all three kinds
    expect(new Set(exampleDecisions.map((r) => r.kind))).toEqual(
      new Set(['required', 'chosen', 'inherited'])
    );
  });
});

describe('03 · the sorter, as a visitor uses it', () => {
  const sorter = () => screen.getByTestId('difference-sorter');
  const answer = (step: number, label: 'Yes' | 'No') => {
    const groups = within(sorter()).getAllByRole('group');
    fireEvent.click(within(groups[step - 1]).getByRole('button', { name: label }));
  };

  test('starts unanswered, with only the first question', () => {
    render(<Differences />);
    expect(within(sorter()).getAllByRole('group')).toHaveLength(1);
    expect(within(sorter()).getByText(/Answer the first question/)).toBeTruthy();
  });

  test('Yes to the first question → Required, leave it local', () => {
    render(<Differences />);
    answer(1, 'Yes');
    expect(within(sorter()).getAllByRole('group')).toHaveLength(1);
    expect(within(sorter()).getByText('Leave it local.')).toBeTruthy();
  });

  test('No, then Yes → Chosen; No, then No → Inherited', () => {
    render(<Differences />);
    answer(1, 'No');
    expect(within(sorter()).getAllByRole('group')).toHaveLength(2);
    answer(2, 'Yes');
    expect(within(sorter()).getByText('Decide: keep or align.')).toBeTruthy();
    answer(2, 'No');
    expect(within(sorter()).getByText('Harmonize.')).toBeTruthy();
  });

  test('changing the first answer clears the second', () => {
    render(<Differences />);
    answer(1, 'No');
    answer(2, 'No');
    answer(1, 'Yes');
    expect(within(sorter()).getByText('Leave it local.')).toBeTruthy();
    answer(1, 'No');
    expect(within(sorter()).getByText(/Answer the second question/)).toBeTruthy();
  });

  test('"Sort another difference" resets to the start', () => {
    render(<Differences />);
    answer(1, 'Yes');
    fireEvent.click(within(sorter()).getByRole('button', { name: 'Sort another difference' }));
    expect(within(sorter()).getByText(/Answer the first question/)).toBeTruthy();
  });

  test('answer buttons expose their pressed state to assistive tech', () => {
    render(<Differences />);
    answer(1, 'No');
    const first = within(sorter()).getAllByRole('group')[0];
    expect(within(first).getByRole('button', { name: 'No' }).getAttribute('aria-pressed')).toBe('true');
    expect(within(first).getByRole('button', { name: 'Yes' }).getAttribute('aria-pressed')).toBe('false');
  });

  test('the sorter stores nothing: no localStorage or sessionStorage writes', () => {
    const local = jest.spyOn(Storage.prototype, 'setItem');
    render(<Differences />);
    answer(1, 'No');
    answer(2, 'No');
    expect(local).not.toHaveBeenCalled();
    local.mockRestore();
  });
});

describe('New sections are safe to prerender', () => {
  test('server-render to a string with no browser globals touched', () => {
    for (const C of [Principles, Approach, Differences]) {
      const html = renderToString(<C />);
      expect(html.length).toBeGreaterThan(1500);
    }
  });

  test('the server render carries the full crawlable teaching content', () => {
    const html = renderToString(<Differences />)
      .replace(/<!-- -->/g, '')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&amp;/g, '&');
    differenceCategories.forEach((c) => {
      expect(html).toContain(c.definition);
      expect(html).toContain(c.action);
    });
    // and the sorter's unanswered state, never a pre-selected answer
    expect(html).toContain('Answer the first question');
    expect(html).not.toContain('aria-pressed="true"');
  });
});

describe('Boundary rule: the new teaching content stays employer-neutral', () => {
  // Words that would place an example in a specific employer's sector, or that
  // read as a commercial offering. All examples must stay generic and fictional.
  const FORBIDDEN = [
    /\bSATS\b/, /\bIOMA\b/, /\bAdvisory\b/i, /\bEXCO\b/,
    /\bramp\b/i, /\bcargo\b/i, /\bcatering\b/i, /\bload (controller|plan)/i,
    /\bgateway\b/i, /\bairline/i, /\baviation\b/i, /\bhub services\b/i,
    /\bpricing\b/i, /\bbook a call\b/i, /\bwork with me\b/i, /\bhire me\b/i,
  ];
  const corpus = JSON.stringify({ principles, principlesCopy, approach });

  test.each(FORBIDDEN.map((r) => [r.source, r]))('no "%s"', (_label, pattern) => {
    expect(corpus).not.toMatch(pattern as RegExp);
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { CohortDashboard } from '../components/CohortDashboard';
import { ResultsDashboard } from '../components/ResultsDashboard';
import {
  loadCohort,
  addCohortMember,
  removeCohortMember,
  clearCohort,
  cohortDimensionStats,
  cohortOverallAverage,
} from '../utils/cohort';
import { STORAGE_KEYS, MAX_COHORT_SIZE } from '../constants';
import type { DiagnosticResults, DimensionScores, LikertValue } from '../types';

function makeResults(scores: DimensionScores, overall: number): DiagnosticResults {
  return {
    dimensionScores: scores,
    overallScore: overall,
    responses: new Map<string, LikertValue>([
      ['S1', 4],
      ['P1', 3],
    ]),
    completedAt: new Date().toISOString(),
  };
}

const scoresA: DimensionScores = {
  structure: 60,
  people: 70,
  process: 40,
  mindset: 80,
  leadership: 50,
};
const scoresB: DimensionScores = {
  structure: 80,
  people: 50,
  process: 60,
  mindset: 60,
  leadership: 90,
};

beforeEach(() => {
  localStorage.clear();
});

describe('Cohort data layer', () => {
  test('saves and reloads a member with responses intact (storage round-trip)', () => {
    const outcome = addCohortMember('Alice', makeResults(scoresA, 60));
    expect(outcome.ok).toBe(true);

    const cohort = loadCohort();
    expect(cohort).toHaveLength(1);
    expect(cohort[0].name).toBe('Alice');
    expect(cohort[0].results.dimensionScores).toEqual(scoresA);
    expect(cohort[0].results.responses).toBeInstanceOf(Map);
    expect(cohort[0].results.responses.get('S1')).toBe(4);
  });

  test('rejects empty or whitespace-only names', () => {
    expect(addCohortMember('', makeResults(scoresA, 60))).toEqual({
      ok: false,
      reason: 'empty-name',
    });
    expect(addCohortMember('   ', makeResults(scoresA, 60))).toEqual({
      ok: false,
      reason: 'empty-name',
    });
    expect(loadCohort()).toHaveLength(0);
  });

  test(`enforces the ${MAX_COHORT_SIZE}-respondent maximum`, () => {
    for (let i = 0; i < MAX_COHORT_SIZE; i++) {
      expect(addCohortMember(`Member ${i + 1}`, makeResults(scoresA, 60)).ok).toBe(true);
    }
    const overflow = addCohortMember('One too many', makeResults(scoresB, 68));
    expect(overflow).toEqual({ ok: false, reason: 'full' });
    expect(loadCohort()).toHaveLength(MAX_COHORT_SIZE);
  });

  test('removes a member by id and clears the cohort', () => {
    addCohortMember('Alice', makeResults(scoresA, 60));
    addCohortMember('Bob', makeResults(scoresB, 68));
    const [alice] = loadCohort();

    const remaining = removeCohortMember(alice.id);
    expect(remaining).toHaveLength(1);
    expect(remaining[0].name).toBe('Bob');

    clearCohort();
    expect(loadCohort()).toHaveLength(0);
  });

  test('returns an empty cohort on corrupt stored data', () => {
    localStorage.setItem(STORAGE_KEYS.cohort, 'not-json{{{');
    expect(loadCohort()).toEqual([]);
    localStorage.setItem(STORAGE_KEYS.cohort, JSON.stringify({ nope: true }));
    expect(loadCohort()).toEqual([]);
  });

  test('computes per-dimension stats and overall average', () => {
    addCohortMember('Alice', makeResults(scoresA, 60));
    addCohortMember('Bob', makeResults(scoresB, 68));
    const cohort = loadCohort();

    const stats = cohortDimensionStats(cohort);
    expect(stats.structure).toEqual({ average: 70, min: 60, max: 80 });
    expect(stats.process).toEqual({ average: 50, min: 40, max: 60 });
    expect(stats.leadership).toEqual({ average: 70, min: 50, max: 90 });

    expect(cohortOverallAverage(cohort)).toBe(64);
  });
});

describe('CohortDashboard', () => {
  const noop = jest.fn();

  function renderDashboard() {
    addCohortMember('Alice', makeResults(scoresA, 60));
    addCohortMember('Bob', makeResults(scoresB, 68));
    const members = loadCohort();
    const onRemove = jest.fn();
    render(
      <CohortDashboard
        members={members}
        onRemoveMember={onRemove}
        onClearCohort={noop}
        onAddRespondent={noop}
      />
    );
    return { members, onRemove };
  }

  test('renders respondents, count, and cohort average', () => {
    renderDashboard();
    expect(screen.getByTestId('cohort-dashboard')).toBeTruthy();
    expect(screen.getByText(/Cohort comparison dashboard/i)).toBeTruthy();
    expect(screen.getByText(/2 of 20 respondents/i)).toBeTruthy();
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
    expect(screen.getByText('64%')).toBeTruthy(); // cohort average headline
  });

  test('surfaces the widest-divergence insight', () => {
    renderDashboard();
    // Leadership has the widest spread (50 vs 90)
    expect(screen.getByText(/Perceptions diverge most on/i)).toBeTruthy();
    expect(screen.getByText(/40-point spread/i)).toBeTruthy();
  });

  test('remove button calls the handler with the member id', () => {
    const { members, onRemove } = renderDashboard();
    fireEvent.click(screen.getByLabelText('Remove Alice'));
    expect(onRemove).toHaveBeenCalledWith(members[0].id);
  });

  test('prescribes interventions for the weakest cohort dimensions', () => {
    renderDashboard();
    // process (avg 50) is the cohort's lowest dimension
    expect(screen.getByText(/Where the cohort should focus first/i)).toBeTruthy();
    expect(screen.getByText(/Interface & bottleneck relief/i)).toBeTruthy();
  });
});

describe('ResultsDashboard cohort integration', () => {
  test('saves a named respondent through the cohort card', () => {
    const onSave = jest.fn().mockReturnValue({ ok: true });
    render(
      <ResultsDashboard
        results={makeResults(scoresA, 60)}
        onReset={jest.fn()}
        cohortSize={0}
        onSaveToCohort={onSave}
        onViewCohort={jest.fn()}
        onNextRespondent={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Respondent name or label/i), {
      target: { value: 'Alice' },
    });
    fireEvent.click(screen.getByText('Save to cohort'));

    expect(onSave).toHaveBeenCalledWith('Alice');
    expect(screen.getByText(/Saved “Alice” to the cohort/i)).toBeTruthy();
    expect(screen.getByText(/Start next respondent/i)).toBeTruthy();
  });

  test('shows the full-cohort message when at capacity', () => {
    const onSave = jest.fn().mockReturnValue({ ok: false, reason: 'full' });
    render(
      <ResultsDashboard
        results={makeResults(scoresA, 60)}
        onReset={jest.fn()}
        cohortSize={MAX_COHORT_SIZE}
        onSaveToCohort={onSave}
      />
    );

    fireEvent.change(screen.getByLabelText(/Respondent name or label/i), {
      target: { value: 'One more' },
    });
    fireEvent.click(screen.getByText('Save to cohort'));
    expect(screen.getByText(/cohort is full/i)).toBeTruthy();
  });

  test('cohort card is hidden when no cohort handler is provided (back-compat)', () => {
    render(<ResultsDashboard results={makeResults(scoresA, 60)} onReset={jest.fn()} />);
    expect(screen.queryByText('Save to cohort')).toBeNull();
  });
});

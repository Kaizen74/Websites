import { render, screen } from '@testing-library/react';
import App from '../App';
import { addCohortMember } from '../utils/cohort';
import { STORAGE_KEYS, SECTION_IDS } from '../constants';
import type { DiagnosticResults, DimensionScores, LikertValue } from '../types';

function makeResults(scores: DimensionScores, overall: number): DiagnosticResults {
  return {
    dimensionScores: scores,
    overallScore: overall,
    responses: new Map<string, LikertValue>([['S1', 4]]),
    completedAt: new Date().toISOString(),
  };
}

const scores: DimensionScores = {
  structure: 60,
  people: 70,
  process: 40,
  mindset: 80,
  leadership: 50,
};

beforeEach(() => {
  localStorage.clear();
  window.location.hash = '';
});

afterEach(() => {
  window.location.hash = '';
});

describe('App smoke tests', () => {
  test('renders the home playbook with all sections', () => {
    render(<App />);
    expect(screen.getByText(/In this playbook/i)).toBeTruthy();
    expect(
      screen.getByText(/Integrated Organizational Capability and Change Framework/i)
    ).toBeTruthy();
    expect(screen.getByText(/The three C's of change/i)).toBeTruthy();
    // No framework-attribution label anywhere on the page
    expect(screen.queryByText(/Kates/i)).toBeNull();
    expect(screen.queryByText(/Kesler/i)).toBeNull();
  });

  test('homepage framework stays score-free even with saved results', () => {
    // Regression for the reported bug: stale diagnostic results in
    // localStorage were painting score badges onto the homepage framework.
    localStorage.setItem(
      STORAGE_KEYS.results,
      JSON.stringify({
        dimensionScores: scores,
        overallScore: 62,
        responses: { S1: 4 },
        completedAt: new Date().toISOString(),
      })
    );
    render(<App />);
    const framework = document.getElementById(SECTION_IDS.framework);
    expect(framework).not.toBeNull();
    expect(framework!.textContent).not.toMatch(/\d+%/);
  });

  test('#cohort hash without a saved cohort falls back to home', () => {
    window.location.hash = '#cohort';
    render(<App />);
    expect(screen.queryByTestId('cohort-dashboard')).toBeNull();
    expect(screen.getByText(/In this playbook/i)).toBeTruthy();
  });

  test('#cohort hash with a saved cohort opens the cohort dashboard', () => {
    addCohortMember('Alice', makeResults(scores, 60));
    addCohortMember('Bob', makeResults(scores, 72));
    window.location.hash = '#cohort';

    render(<App />);
    expect(screen.getByTestId('cohort-dashboard')).toBeTruthy();
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
  });

  test('home CTA links to the cohort dashboard when a cohort exists', () => {
    addCohortMember('Alice', makeResults(scores, 60));
    render(<App />);
    expect(screen.getByText(/View cohort dashboard \(1\)/i)).toBeTruthy();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DiagnosticSurvey } from '../components/DiagnosticSurvey';
import { QuestionCard } from '../components/QuestionCard';
import { diagnosticQuestions } from '../data/questions';
import { calculateScore, mapToActivators } from '../utils/scoring';
import type { LikertValue } from '../types';

describe('Diagnostic Survey', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('All 18 questions load from data file', () => {
    expect(diagnosticQuestions).toHaveLength(18);
    expect(diagnosticQuestions.filter((q) => q.dimension === 'structure')).toHaveLength(3);
    expect(diagnosticQuestions.filter((q) => q.dimension === 'people')).toHaveLength(4);
    expect(diagnosticQuestions.filter((q) => q.dimension === 'process')).toHaveLength(5);
    expect(diagnosticQuestions.filter((q) => q.dimension === 'mindset')).toHaveLength(4);
    expect(diagnosticQuestions.filter((q) => q.dimension === 'leadership')).toHaveLength(2);
  });

  test('All question IDs are unique', () => {
    const ids = diagnosticQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('QuestionCard renders with correct question number', () => {
    const question = diagnosticQuestions[0];
    render(
      <QuestionCard
        question={question}
        currentAnswer={undefined}
        onAnswer={() => {}}
        questionNumber={1}
        totalQuestions={18}
      />
    );
    expect(screen.getByText(/Question 1 of 18/i)).toBeTruthy();
  });

  test('Survey shows first question initially', () => {
    render(<DiagnosticSurvey />);
    expect(screen.getByText(/Question 1 of 18/i)).toBeTruthy();
  });

  test('Survey progresses through questions', async () => {
    render(<DiagnosticSurvey />);
    expect(screen.getByText(/Question 1 of 18/i)).toBeTruthy();

    // Select "Neutral" answer using the radio input's aria-label
    fireEvent.click(screen.getByLabelText('Neutral'));
    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(screen.getByText(/Question 2 of 18/i)).toBeTruthy();
    });
  });

  test('Likert scale has 5 options', () => {
    const question = diagnosticQuestions[0];
    render(
      <QuestionCard
        question={question}
        currentAnswer={undefined}
        onAnswer={() => {}}
        questionNumber={1}
        totalQuestions={18}
      />
    );
    expect(screen.getByText(/Strongly Disagree/i)).toBeTruthy();
    const disagreeElements = screen.getAllByText(/Disagree/i);
    expect(disagreeElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Neutral/i)).toBeTruthy();
    const agreeElements = screen.getAllByText(/Agree/i);
    expect(agreeElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Strongly Agree/i)).toBeTruthy();
  });
});

// SCORING VALIDATION - Critical!
describe('Scoring Logic', () => {
  test('calculateScore returns correct percentage', () => {
    const responses = new Map<string, LikertValue>([
      ['S1', 5],
      ['S2', 4],
      ['S3', 3],
    ]);
    const score = calculateScore(responses, 'structure');
    // (5+4+3) / (3*5) * 100 = 12/15 * 100 = 80
    expect(score).toBe(80);
  });

  test('calculateScore returns 0 for no responses', () => {
    const responses = new Map<string, LikertValue>();
    const score = calculateScore(responses, 'structure');
    expect(score).toBe(0);
  });

  test('mapToActivators returns correct recommendations', () => {
    const scores = { structure: 55, people: 75, process: 45, mindset: 80, leadership: 50 };
    const activators = mapToActivators(scores);
    expect(activators).toContain('Unique Value-Adding Layers');
    expect(activators).toContain('The Business Handshake');
    expect(activators).toContain('Matrix-Ready Leaders');
  });

  test('mapToActivators returns empty for all healthy scores', () => {
    const scores = { structure: 80, people: 75, process: 70, mindset: 85, leadership: 90 };
    const activators = mapToActivators(scores);
    expect(activators).toHaveLength(0);
  });
});

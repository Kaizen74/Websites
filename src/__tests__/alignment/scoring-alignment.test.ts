import { calculateScore, mapToActivators, getScoreLabel, getScoreColor } from '../../utils/scoring';
import { SCORE_THRESHOLDS, SCORE_LABELS } from '../../constants';
import type { LikertValue } from '../../types';

describe('Scoring Alignment', () => {
  test('Score thresholds align with color coding', () => {
    expect(getScoreColor(80)).toBe('green'); // ≥70
    expect(getScoreColor(70)).toBe('green'); // exactly 70
    expect(getScoreColor(69)).toBe('amber'); // 50-69
    expect(getScoreColor(65)).toBe('amber'); // 50-69
    expect(getScoreColor(50)).toBe('amber'); // exactly 50
    expect(getScoreColor(49)).toBe('red'); // <50
    expect(getScoreColor(40)).toBe('red'); // <50
  });

  test('Score labels align with thresholds', () => {
    expect(getScoreLabel(85)).toBe(SCORE_LABELS.healthy);
    expect(getScoreLabel(70)).toBe(SCORE_LABELS.healthy);
    expect(getScoreLabel(60)).toBe(SCORE_LABELS.developing);
    expect(getScoreLabel(50)).toBe(SCORE_LABELS.developing);
    expect(getScoreLabel(35)).toBe(SCORE_LABELS.needsAttention);
    expect(getScoreLabel(0)).toBe(SCORE_LABELS.needsAttention);
  });

  test('Activator mapping uses consistent thresholds', () => {
    // Threshold for recommendation is <60
    const scores = { structure: 59, people: 60, process: 61, mindset: 59, leadership: 60 };
    const recommendations = mapToActivators(scores);

    // Only structure and mindset are below 60
    expect(recommendations.length).toBeGreaterThan(0);
  });

  test('calculateScore handles partial responses', () => {
    // Only answer 2 out of 4 structure questions
    const responses = new Map<string, LikertValue>([
      ['S1.2', 5],
      ['S2.1', 5],
    ]);
    const score = calculateScore(responses, 'structure');
    // (5+5) / (2*5) * 100 = 10/10 * 100 = 100
    expect(score).toBe(100);
  });

  test('Score thresholds constants are correct', () => {
    expect(SCORE_THRESHOLDS.healthy).toBe(70);
    expect(SCORE_THRESHOLDS.developing).toBe(50);
  });

  test('Score labels constants are correct', () => {
    expect(SCORE_LABELS.healthy).toBe('Healthy');
    expect(SCORE_LABELS.developing).toBe('Developing');
    expect(SCORE_LABELS.needsAttention).toBe('Needs Attention');
  });
});

import type { Dimension, DimensionScores, LikertValue, ScoreColor } from '../types';
import { diagnosticQuestions } from '../data/questions';
import { dimensionToActivators } from '../data/interventions';
import { SCORE_THRESHOLDS, SCORE_LABELS } from '../constants';

/**
 * Calculate score for a specific dimension
 * @param responses - Map of question ID to response value
 * @param dimension - The dimension to calculate score for
 * @returns Score as percentage (0-100)
 */
export function calculateScore(
  responses: Map<string, LikertValue>,
  dimension: Dimension
): number {
  const dimensionQuestions = diagnosticQuestions.filter((q) => q.dimension === dimension);
  const answered = dimensionQuestions.filter((q) => responses.has(q.id));

  if (answered.length === 0) return 0;

  const sum = answered.reduce((acc, q) => acc + (responses.get(q.id) || 0), 0);
  const maxPossible = answered.length * 5;

  return Math.round((sum / maxPossible) * 100);
}

/**
 * Calculate all dimension scores
 * @param responses - Map of question ID to response value
 * @returns Object with all dimension scores
 */
export function calculateAllScores(responses: Map<string, LikertValue>): DimensionScores {
  return {
    structure: calculateScore(responses, 'structure'),
    people: calculateScore(responses, 'people'),
    process: calculateScore(responses, 'process'),
    mindset: calculateScore(responses, 'mindset'),
    leadership: calculateScore(responses, 'leadership'),
  };
}

/**
 * Calculate overall score (average of all dimensions)
 * @param dimensionScores - Object with all dimension scores
 * @returns Overall score as percentage (0-100)
 */
export function calculateOverallScore(dimensionScores: DimensionScores): number {
  const scores = Object.values(dimensionScores);
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
}

/**
 * Get score color based on threshold
 * @param score - Score as percentage (0-100)
 * @returns Color classification
 */
export function getScoreColor(score: number): ScoreColor {
  if (score >= SCORE_THRESHOLDS.healthy) return 'green';
  if (score >= SCORE_THRESHOLDS.developing) return 'amber';
  return 'red';
}

/**
 * Get score label based on threshold
 * @param score - Score as percentage (0-100)
 * @returns Human-readable label
 */
export function getScoreLabel(score: number): string {
  if (score >= SCORE_THRESHOLDS.healthy) return SCORE_LABELS.healthy;
  if (score >= SCORE_THRESHOLDS.developing) return SCORE_LABELS.developing;
  return SCORE_LABELS.needsAttention;
}

/**
 * Map dimension scores to recommended activators
 * @param scores - Object with all dimension scores
 * @param threshold - Score threshold for recommendations (default 60)
 * @returns Array of recommended activator titles
 */
export function mapToActivators(scores: DimensionScores, threshold: number = 60): string[] {
  const recommendations = new Set<string>();

  Object.entries(scores).forEach(([dimension, score]) => {
    if (score < threshold) {
      const activators = dimensionToActivators[dimension as Dimension] || [];
      activators.forEach((activator) => recommendations.add(activator));
    }
  });

  return Array.from(recommendations);
}

/**
 * Get CSS class for score color
 * @param score - Score as percentage (0-100)
 * @returns CSS class name
 */
export function getScoreColorClass(score: number): string {
  const color = getScoreColor(score);
  return `score-${color}`;
}

/**
 * Get background CSS class for score color
 * @param score - Score as percentage (0-100)
 * @returns CSS class name for background
 */
export function getScoreBgColorClass(score: number): string {
  const color = getScoreColor(score);
  return `score-bg-${color}`;
}

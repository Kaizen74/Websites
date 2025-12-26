import type { Dimension, Quadrant } from './types';

// Number of diagnostic questions
export const QUESTION_COUNT = 20;

// Questions per dimension
export const QUESTIONS_PER_DIMENSION = 4;

// Dimension labels for UI
export const DIMENSION_LABELS: Record<Dimension, string> = {
  structure: 'Structure & Accountabilities',
  people: 'People & Skills',
  process: 'Process & Systems',
  mindset: 'Mindset & Behaviors',
  leadership: 'Leadership',
};

// Quadrant labels for the framework diagram
export const QUADRANT_LABELS: Record<Quadrant, string> = {
  structure: 'Structure & Accountabilities',
  people: 'People & Skills',
  process: 'Process & Systems',
  mindset: 'Mindset & Behaviors',
};

// Quadrant colors
export const QUADRANT_COLORS: Record<Quadrant, string> = {
  structure: '#C41E3A',    // Primary red
  people: '#4A5568',       // Slate gray
  process: '#2D3748',      // Charcoal
  mindset: '#718096',      // Light slate
};

// Score thresholds
export const SCORE_THRESHOLDS = {
  healthy: 70,    // ≥70 is healthy (green)
  developing: 50, // 50-69 is developing (amber)
  // <50 is needs attention (red)
};

// Score labels
export const SCORE_LABELS = {
  healthy: 'Healthy',
  developing: 'Developing',
  needsAttention: 'Needs Attention',
};

// Likert scale options
export const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
] as const;

// LocalStorage keys
export const STORAGE_KEYS = {
  responses: 'diagnostic_responses',
  progress: 'diagnostic_progress',
  results: 'diagnostic_results',
};

// Section IDs for navigation
export const SECTION_IDS = {
  hero: 'hero',
  framework: 'framework',
  activators: 'activators',
  changeLevers: 'change-levers',
  diagnostic: 'diagnostic',
  results: 'results',
};

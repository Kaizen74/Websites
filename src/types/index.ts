// Dimension types for the framework
export type Dimension = 'structure' | 'people' | 'process' | 'mindset' | 'leadership';

// Quadrant types for the framework diagram
export type Quadrant = 'structure' | 'people' | 'process' | 'mindset';

// Score color types
export type ScoreColor = 'green' | 'amber' | 'red';

// Diagnostic question interface
export interface DiagnosticQuestion {
  id: string;
  dimension: Dimension;
  text: string;
}

// Likert scale value (1-5)
export type LikertValue = 1 | 2 | 3 | 4 | 5;

// Survey response
export interface SurveyResponse {
  questionId: string;
  value: LikertValue;
}

// Dimension scores
export interface DimensionScores {
  structure: number;
  people: number;
  process: number;
  mindset: number;
  leadership: number;
}

// Diagnostic results
export interface DiagnosticResults {
  dimensionScores: DimensionScores;
  overallScore: number;
  responses: Map<string, LikertValue>;
  completedAt: string;
}

// Activator interface
export interface Activator {
  id: number;
  title: string;
  tagline: string;
  principles: string[];
  healthySignals: string[];
  dysfunctionSignals: string[];
}

// Change Lever interface
export interface ChangeLever {
  id: number;
  title: string;
  goal: string;
  method: string;
  tool?: string;
  description: string;
}

// Quadrant detail interface
export interface QuadrantDetail {
  id: Quadrant;
  title: string;
  items: string[];
  color: string;
}

// Framework diagram props
export interface FrameworkDiagramProps {
  scores?: Partial<DimensionScores>;
  onQuadrantClick?: (quadrant: Quadrant) => void;
  activeQuadrant?: Quadrant | null;
}

// Survey state
export interface SurveyState {
  currentQuestion: number;
  responses: Map<string, LikertValue>;
  isComplete: boolean;
}

// T.C.C.A.R. Framework types
export type TCCARDimension = 'trust' | 'conflict' | 'commitment' | 'accountability' | 'results';

export interface TCCARItem {
  id: TCCARDimension;
  title: string;
  description: string;
  healthyBehaviors: string[];
  dysfunctionSigns: string[];
}

// Playbook Module interface
export interface PlaybookModule {
  id: string;
  quadrant: Quadrant;
  title: string;
  description: string;
  interventions: string[];
  tools: string[];
}

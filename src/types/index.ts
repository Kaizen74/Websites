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
  summary?: string;
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

// One respondent's saved diagnostic within a cohort
export interface CohortMember {
  id: string;
  name: string;
  results: DiagnosticResults;
}

// Aggregate statistics for one dimension across a cohort
export interface DimensionStats {
  average: number;
  min: number;
  max: number;
}

// --- AI-native design section (static teaching content) ---

// One rung of the Organisation → Position → Task → Process descent
export interface DescentStep {
  label: string;
  line: string;
  /** The Task rung is the section's single emphasis */
  emphasis?: boolean;
  /** Leading fragment rendered at weight 600 within the line */
  leadIn?: string;
}

// One level of the L0–L3 automation ladder
export interface AiLevel {
  code: string;
  name: string;
  /** Rule width in px; grows with the level */
  ruleWidth: number;
  /** Rule colour token */
  ruleColor: string;
  task: string;
  cost: string;
  /** L3 only — the operating-model row */
  emphasis?: boolean;
}

// One cell of the capability-vs-desire matrix
export interface ScoringZone {
  label: string;
  labelColor: string;
  line: string;
}

// One tier of the provenance strip
export interface ProvenanceTier {
  label: string;
  labelColor: string;
  line: string;
}

// Targeted intervention prescribed for a weak dimension
export interface DimensionIntervention {
  title: string;
  description: string;
  timeframe: string;
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

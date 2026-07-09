import type {
  CohortMember,
  DiagnosticResults,
  Dimension,
  DimensionScores,
  DimensionStats,
  LikertValue,
} from '../types';
import { STORAGE_KEYS, MAX_COHORT_SIZE } from '../constants';

export type AddMemberResult =
  | { ok: true; member: CohortMember }
  | { ok: false; reason: 'full' | 'empty-name' };

const DIMENSIONS: Dimension[] = ['structure', 'people', 'process', 'mindset', 'leadership'];

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Results serialized for storage: responses Map flattened to an object */
interface StoredMember {
  id: string;
  name: string;
  results: Omit<DiagnosticResults, 'responses'> & {
    responses: Record<string, LikertValue>;
  };
}

function serializeMember(member: CohortMember): StoredMember {
  return {
    ...member,
    results: {
      ...member.results,
      responses: Object.fromEntries(member.results.responses),
    },
  };
}

function deserializeMember(stored: StoredMember): CohortMember {
  return {
    ...stored,
    results: {
      ...stored.results,
      responses: new Map(Object.entries(stored.results.responses || {})) as Map<
        string,
        LikertValue
      >,
    },
  };
}

/** Load the saved cohort; returns [] on missing or corrupt data */
export function loadCohort(): CohortMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cohort);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_COHORT_SIZE).map(deserializeMember);
  } catch {
    return [];
  }
}

function persist(members: CohortMember[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.cohort,
      JSON.stringify(members.map(serializeMember))
    );
  } catch {
    // Storage full/unavailable — the in-memory cohort still works this session
  }
}

/** Add a respondent's results to the cohort (max MAX_COHORT_SIZE) */
export function addCohortMember(name: string, results: DiagnosticResults): AddMemberResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { ok: false, reason: 'empty-name' };
  }
  const members = loadCohort();
  if (members.length >= MAX_COHORT_SIZE) {
    return { ok: false, reason: 'full' };
  }
  const member: CohortMember = { id: generateId(), name: trimmed, results };
  persist([...members, member]);
  return { ok: true, member };
}

export function removeCohortMember(id: string): CohortMember[] {
  const members = loadCohort().filter((m) => m.id !== id);
  persist(members);
  return members;
}

export function clearCohort(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.cohort);
  } catch {
    // ignore
  }
}

/** Per-dimension average/min/max across the cohort */
export function cohortDimensionStats(
  members: CohortMember[]
): Record<Dimension, DimensionStats> {
  const stats = {} as Record<Dimension, DimensionStats>;
  DIMENSIONS.forEach((dimension) => {
    const values = members.map((m) => m.results.dimensionScores[dimension]);
    if (values.length === 0) {
      stats[dimension] = { average: 0, min: 0, max: 0 };
      return;
    }
    stats[dimension] = {
      average: Math.round(values.reduce((sum, v) => sum + v, 0) / values.length),
      min: Math.min(...values),
      max: Math.max(...values),
    };
  });
  return stats;
}

/** Cohort-average dimension scores (for reuse with score-based components) */
export function cohortAverageScores(members: CohortMember[]): DimensionScores {
  const stats = cohortDimensionStats(members);
  return {
    structure: stats.structure.average,
    people: stats.people.average,
    process: stats.process.average,
    mindset: stats.mindset.average,
    leadership: stats.leadership.average,
  };
}

/** Average of the members' overall scores */
export function cohortOverallAverage(members: CohortMember[]): number {
  if (members.length === 0) return 0;
  return Math.round(
    members.reduce((sum, m) => sum + m.results.overallScore, 0) / members.length
  );
}

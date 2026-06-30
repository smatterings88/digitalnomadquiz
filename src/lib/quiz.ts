import { A, type ArchetypeKey, type Scores, type UrgencyLevel } from '../types/quiz';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';
import type { ArchetypeResult, QuizQuestion } from '../types/quiz';

export const questions = questionsData as QuizQuestion[];
export const results = resultsData as Record<ArchetypeKey, ArchetypeResult>;

export const PROCESSING_MESSAGES = [
  'Analyzing 47 destination variables...',
  'Scoring legal protections across 90+ countries...',
  'Mapping community density data...',
  'Calculating your Freedom Profile...',
  'Almost ready...',
] as const;

export function createInitialScores(): Scores {
  return { [A.HH]: 0, [A.WL]: 0, [A.TC]: 0, [A.AR]: 0, [A.CK]: 0, urgency: 0 };
}

export function getPhaseLabel(qIndex: number): string {
  if (qIndex <= 2) return 'Part 1 — Where You Are';
  if (qIndex <= 7) return "Part 2 — What's Possible";
  return 'Part 3 — The Future You';
}

export function computeArchetype(scores: Scores): ArchetypeKey {
  const archetypes = [A.HH, A.WL, A.TC, A.AR, A.CK] as const;
  return archetypes.reduce(
    (best, key) => (scores[key] > scores[best] ? key : best),
    archetypes[0],
  );
}

export function getUrgencyLevel(scores: Scores): UrgencyLevel {
  const u = scores.urgency;
  if (u >= 5) return 'high';
  if (u >= 3) return 'medium';
  return 'low';
}

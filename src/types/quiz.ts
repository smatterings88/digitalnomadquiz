export const A = {
  HH: 'hh',
  WL: 'wl',
  TC: 'tc',
  AR: 'ar',
  CK: 'ck',
} as const;

export type ArchetypeKey = (typeof A)[keyof typeof A];
export const U = 'urgency' as const;
export type ScoreKey = ArchetypeKey | typeof U;

export type Scores = Record<ArchetypeKey | typeof U, number>;

export type ScreenId = 'cover' | 'quiz' | 'capture' | 'result';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface QuizOption {
  text: string;
  scores: Partial<Scores>;
}

export interface QuizQuestion {
  text: string;
  sub: string | null;
  options: QuizOption[];
}

export interface Destination {
  flag: string;
  name: string;
}

export interface ArchetypeResult {
  badge: string;
  headline: string;
  body: string;
  destinations: Destination[];
  ctaHigh: string;
  ctaLow: string;
}

export interface QuizSubmitPayload {
  email: string;
  pridenomad_archetype_primary: ArchetypeKey;
  pridenomad_urgency: UrgencyLevel;
  urgency_score: number;
  score_hh: number;
  score_wl: number;
  score_tc: number;
  score_ar: number;
  score_ck: number;
  pridenomad_quiz_completed: boolean;
  source: string;
}

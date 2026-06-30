import type { QuizSubmitPayload } from '../types/quiz';

export async function submitQuizToGhl(payload: QuizSubmitPayload): Promise<void> {
  const response = await fetch('/api/quiz-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? 'Failed to save your profile. Please try again.');
  }
}

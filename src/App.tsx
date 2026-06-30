import { useCallback, useRef, useState } from 'react';
import { CaptureScreen } from './components/CaptureScreen';
import { CoverScreen } from './components/CoverScreen';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { submitQuizToGhl } from './lib/ghl';
import {
  computeArchetype,
  createInitialScores,
  getUrgencyLevel,
  questions,
} from './lib/quiz';
import type { ArchetypeKey, ScreenId, Scores, UrgencyLevel } from './types/quiz';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('cover');
  const [currentQ, setCurrentQ] = useState(0);
  const scoresRef = useRef<Scores>(createInitialScores());
  const [archetype, setArchetype] = useState<ArchetypeKey | null>(null);
  const [urgency, setUrgency] = useState<UrgencyLevel>('low');

  const applyScores = (base: Scores, optionScores: Partial<Scores>): Scores => {
    const next = { ...base };
    Object.entries(optionScores).forEach(([key, val]) => {
      const scoreKey = key as keyof Scores;
      if (next[scoreKey] !== undefined && typeof val === 'number') {
        next[scoreKey] += val;
      }
    });
    return next;
  };

  const updateScores = (optionScores: Partial<Scores>) => {
    const next = applyScores(scoresRef.current, optionScores);
    scoresRef.current = next;
    return next;
  };

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startQuiz = () => {
    const initial = createInitialScores();
    scoresRef.current = initial;
    setCurrentQ(0);
    setArchetype(null);
    setScreen('quiz');
    scrollTop();
  };

  const handleSelectAnswer = (optionScores: Partial<Scores>) => {
    updateScores(optionScores);

    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
    } else {
      setScreen('capture');
      scrollTop();
    }
  };

  const handleEmailSubmit = async (email: string) => {
    const nextScores = scoresRef.current;
    const resultArchetype = computeArchetype(nextScores);
    const resultUrgency = getUrgencyLevel(nextScores);

    const payload = {
      email,
      pridenomad_archetype_primary: resultArchetype,
      pridenomad_urgency: resultUrgency,
      urgency_score: nextScores.urgency,
      score_hh: nextScores.hh,
      score_wl: nextScores.wl,
      score_tc: nextScores.tc,
      score_ar: nextScores.ar,
      score_ck: nextScores.ck,
      pridenomad_quiz_completed: true,
      source: 'pridenomadquiz.com',
    };

    await submitQuizToGhl(payload);

    setArchetype(resultArchetype);
    setUrgency(resultUrgency);
    setScreen('result');
    scrollTop();
  };

  const resetQuiz = () => {
    const initial = createInitialScores();
    scoresRef.current = initial;
    setCurrentQ(0);
    setArchetype(null);
    setScreen('cover');
    scrollTop();
  };

  return (
    <>
      <Nav />
      <main>
        {screen === 'cover' && <CoverScreen onStart={startQuiz} />}
        {screen === 'quiz' && (
          <QuizScreen currentQ={currentQ} onSelectAnswer={handleSelectAnswer} />
        )}
        {screen === 'capture' && <CaptureScreen onSubmit={handleEmailSubmit} />}
        {screen === 'result' && archetype && (
          <ResultScreen archetype={archetype} urgency={urgency} onRetake={resetQuiz} />
        )}
      </main>
      <Footer />
    </>
  );
}

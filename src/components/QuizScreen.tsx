import { useEffect, useState } from 'react';
import { getPhaseLabel, questions } from '../lib/quiz';
import type { Scores } from '../types/quiz';

interface QuizScreenProps {
  currentQ: number;
  onSelectAnswer: (scores: Partial<Scores>) => void;
}

export function QuizScreen({ currentQ, onSelectAnswer }: QuizScreenProps) {
  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;
  const [visibleText, setVisibleText] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setVisibleText(false);
    setSelectedIndex(null);
    const timer = window.setTimeout(() => setVisibleText(true), 50);
    return () => window.clearTimeout(timer);
  }, [currentQ]);

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    window.setTimeout(() => onSelectAnswer(q.options[index].scores), 320);
  };

  return (
    <section id="screen-quiz" className="screen active">
      <div className="quiz-inner">
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="phase-label visible">{getPhaseLabel(currentQ)}</p>
        <h2
          className="question-text"
          style={{
            opacity: visibleText ? 1 : 0,
            transform: visibleText ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {q.text}
        </h2>
        {q.sub ? <p className="question-sub">{q.sub}</p> : null}
        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={opt.text}
              type="button"
              className={`option-btn${selectedIndex === i ? ' selected' : ''}`}
              style={{
                opacity: visibleText ? 1 : 0,
                transform: visibleText ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.3s ease ${i * 0.07}s, transform 0.3s ease ${i * 0.07}s, border-color 0.15s, background 0.15s`,
              }}
              onClick={() => handleSelect(i)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

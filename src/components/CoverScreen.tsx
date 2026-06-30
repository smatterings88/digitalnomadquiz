interface CoverScreenProps {
  onStart: () => void;
}

export function CoverScreen({ onStart }: CoverScreenProps) {
  return (
    <section id="screen-cover" className="screen active">
      <div className="cover-inner fade-up">
        <p className="cover-eyebrow fade-up">LGBTQ Freedom Intelligence</p>
        <h1 className="cover-h1 fade-up fade-up-delay-1">
          Where Are You <em>Really</em>
          <br />
          Meant to Live?
        </h1>
        <p className="cover-subtitle fade-up fade-up-delay-2">
          Your LGBTQ Freedom Profile — Built for the Moment You&apos;re Actually Ready
        </p>
        <p className="cover-meta fade-up fade-up-delay-3">
          10 questions. No wrong answers. A real answer waiting for you on the other side.
        </p>
        <button type="button" className="btn-start fade-up fade-up-delay-3" onClick={onStart}>
          Find My Profile
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

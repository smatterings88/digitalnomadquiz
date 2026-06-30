import type { ArchetypeKey, UrgencyLevel } from '../types/quiz';
import { results } from '../lib/quiz';

interface ResultScreenProps {
  archetype: ArchetypeKey;
  urgency: UrgencyLevel;
  onRetake: () => void;
}

export function ResultScreen({ archetype, urgency, onRetake }: ResultScreenProps) {
  const r = results[archetype];
  const isHighUrgency = urgency === 'high' || urgency === 'medium';

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My LGBTQ Freedom Profile — PrideNomad',
        text: "I just took the PrideNomad quiz — find out where you're really meant to live.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      window.alert('Link copied to clipboard!');
    }).catch(() => {});
  };

  return (
    <section id="screen-result" className="screen active">
      <div className="result-inner fade-up">
        <div className="result-badge">{r.badge}</div>
        <h1 className="result-h1">{r.headline}</h1>
        <div className="result-body" dangerouslySetInnerHTML={{ __html: r.body }} />
        <div className="destinations-section">
          <p className="destinations-label">Your Top Destination Matches</p>
          <div className="destination-list">
            {r.destinations.map((d) => (
              <div key={d.name} className="destination-chip">
                <span className="flag">{d.flag}</span>
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cta-section">
          <button
            type="button"
            className="btn-primary-result"
            onClick={() => window.open('https://pridenomad.com/index', '_blank')}
          >
            {isHighUrgency ? r.ctaHigh : r.ctaLow}
          </button>
          <a href="https://pridenomad.com/newsletter" className="btn-secondary-result">
            Get the Weekly Freedom Intelligence Letter →
          </a>
        </div>
        <div className="share-row">
          <span />
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Share your profile</span>
          <span />
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
          <button type="button" className="share-btn" onClick={shareResult}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>
          <button type="button" className="share-btn" onClick={copyLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Link
          </button>
        </div>
        <div className="retake-link">
          Not quite right?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRetake();
            }}
          >
            Retake the quiz
          </a>
        </div>
      </div>
    </section>
  );
}

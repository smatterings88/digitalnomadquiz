import { useEffect, useState, type FormEvent } from 'react';
import { PROCESSING_MESSAGES } from '../lib/quiz';
import { WorldMap } from './WorldMap';

interface CaptureScreenProps {
  onSubmit: (email: string) => Promise<void>;
}

export function CaptureScreen({ onSubmit }: CaptureScreenProps) {
  const [email, setEmail] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < PROCESSING_MESSAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  const processingText =
    messageIndex >= PROCESSING_MESSAGES.length - 1
      ? '✓ Your profile is ready.'
      : PROCESSING_MESSAGES[messageIndex];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(email.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="screen-capture" className="screen active">
      <div className="capture-inner">
        <WorldMap />
        <p className="processing-text">{processingText}</p>
        <h2 className="capture-h2">Your LGBTQ Freedom Profile is ready.</h2>
        <p className="capture-body">
          We matched you against 47 destination variables — legal protections, healthcare access,
          community density, cost of living, queer cultural infrastructure, and more.
          <br />
          <br />
          Enter your email and we&apos;ll send your full profile: your archetype, your top country
          matches, and the intelligence behind why they fit you specifically.
        </p>
        <div className="capture-variables">
          {[
            'Legal Protections',
            'Healthcare Access',
            'Community Density',
            'Cost of Living',
            'Queer Infrastructure',
            'Political Trajectory',
            'Expat Networks',
          ].map((tag) => (
            <span key={tag} className="variable-tag">
              {tag}
            </span>
          ))}
        </div>
        <form className="capture-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            disabled={submitting}
          />
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send My Freedom Profile →'}
          </button>
          {error ? (
            <p className="capture-microcopy" style={{ color: 'var(--red-alert)' }}>
              {error}
            </p>
          ) : null}
          <p className="capture-microcopy">
            No spam. No noise. Just your results + the PrideNomad intelligence that backs them up.
            You can unsubscribe any time — though most people don&apos;t.
          </p>
        </form>
      </div>
    </section>
  );
}

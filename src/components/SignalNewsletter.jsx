import React, { useState } from 'react';

export default function SignalNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="sf-section" style={{ borderBottom: 'none' }}>
      <div className="sf-wrap">
        <div className="sf-newsletter-box">
          <div>
            <span className="sf-pill">(Chronicle Dispatch)</span>
            <h2 className="sf-nl-title">
              Get chapter drops, soundtrack alerts &amp; manga news.
            </h2>
            <p className="sf-nl-desc">
              Subscribe to the official celestial dispatch. One direct transmission per major release — no spam, unsubscribe anytime.
            </p>
          </div>

          <div>
            {submitted ? (
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                padding: '24px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--accent)',
              }}>
                [ TRANSMISSION ESTABLISHED ] You will receive chapter alerts.
              </div>
            ) : (
              <form className="sf-nl-form" onSubmit={handleSubmit}>
                <div className="sf-input-capsule">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sf-input-field"
                  />
                  <button type="submit" className="sf-input-submit">
                    Sign Up
                  </button>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
                  One email per release · Unsubscribe at any time
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

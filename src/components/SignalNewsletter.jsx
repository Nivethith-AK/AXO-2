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
    <section className="sf-section sf-newsletter-section">
      <div className="sf-wrap">
        <div className="sf-newsletter-exact-box">
          <h2 className="sf-newsletter-title">
            Get lineup drops, ticket alerts and afterparty news.
          </h2>

          <div className="sf-newsletter-form-col">
            {submitted ? (
              <div className="sf-newsletter-success">
                [ TRANSMISSION CONFIRMED ] You’re on the alert list.
              </div>
            ) : (
              <form className="sf-newsletter-form" onSubmit={handleSubmit}>
                <div className="sf-capsule-input-row">
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sf-capsule-input"
                  />
                  <button type="submit" className="sf-capsule-btn">
                    SIGN UP
                  </button>
                </div>
                <div className="sf-newsletter-terms">
                  One email a week · Unsubscribe any time
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

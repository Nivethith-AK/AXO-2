import React from 'react';

export default function SignalReview() {
  return (
    <section className="sf-section sf-review-section">
      <div className="sf-wrap">
        <div className="sf-review-head">
          <div className="sf-review-meta">
            <span className="sf-pill">(Chronicle review)</span>
            <span className="sf-review-date">Press review — August 2025</span>
          </div>
          <blockquote className="sf-review-quote">
            “Signal doesn’t just bring music, art and people together. It makes them feel like one living thing.”
          </blockquote>
        </div>

        <div className="sf-review-wall">
          <div className="sf-review-col">
            <div className="sf-review-stat">
              <span className="sf-review-number">14.8K</span>
              <p className="sf-review-label">Total festival attendance across all four days.</p>
            </div>
            <div className="sf-review-photo">
              <img src="/images/signalfest/review_1.png" alt="Main stage crowd" loading="lazy" />
              <span className="sf-photo-tag">Main stage crowd</span>
            </div>
          </div>

          <div className="sf-review-col">
            <div className="sf-review-photo">
              <img src="/images/signalfest/review_2.png" alt="Arrivals at Gate A" loading="lazy" />
              <span className="sf-photo-tag">Golden hour set</span>
            </div>
            <div className="sf-review-stat">
              <span className="sf-review-number">4 / 4</span>
              <p className="sf-review-label">Sold-out nights out of four. The last went in under an hour.</p>
            </div>
          </div>

          <div className="sf-review-col">
            <div className="sf-review-stat">
              <span className="sf-review-number">21</span>
              <p className="sf-review-label">Artists, master works and visual installations on site.</p>
            </div>
            <div className="sf-review-photo">
              <img src="/images/signalfest/review_3.png" alt="Live visual" loading="lazy" />
              <span className="sf-photo-tag">Live visual relay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

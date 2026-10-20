import React from 'react';

export default function Testimonial() {
  return (
    <section className="sec" id="transmission-log">
      <div className="sec-inner">
        <div className="clario-testimonial-card">
          <div className="tc-notch tl" />
          <div className="tc-notch tr" />
          <div className="tc-notch bl" />
          <div className="tc-notch br" />

          <div className="testimonial-eyebrow">
            <span className="dot-pulse" />
            <span>INTERCEPTED TRANSMISSION LOG // RELAY_09</span>
          </div>

          <blockquote className="testimonial-quote">
            “A hauntingly beautiful collision of modern existential isolation and ancient celestial mythology.
            The prose, sacred geometry, and original soundtrack breathe together as one living cosmic entity.”
          </blockquote>

          <div className="testimonial-author">
            <div className="author-avatar">✦</div>
            <div className="author-meta">
              <span className="author-name">Project Eden Relay</span>
              <span className="author-role">Celestial Archive Observer · Sector 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

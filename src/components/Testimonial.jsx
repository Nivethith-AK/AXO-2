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
            <span>COMMUNITY REFLECTION</span>
          </div>

          <blockquote className="testimonial-quote">
            “A hauntingly beautiful collision of modern existential isolation and ancient celestial mythology.
            The original soundtrack and prose breathe together as one living, emotional work of art.”
          </blockquote>

          <div className="testimonial-author">
            <div className="author-avatar">◈</div>
            <div className="author-meta">
              <span className="author-name">Project Eden Reader</span>
              <span className="author-role">Listener &amp; Reader Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

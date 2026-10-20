import React, { useState, useEffect } from 'react';

export default function Hero({ onReadChapter }) {
  const [utcTime, setUtcTime] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, '0');
      const mm = String(d.getUTCMinutes()).padStart(2, '0');
      const ss = String(d.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxTransform = `translateY(${scrollY * 0.18}px)`;
  const parallaxOpacity = Math.max(0.15, 1 - scrollY / 950);

  const scrollToArchive = (e) => {
    e.preventDefault();
    const el = document.getElementById('archive');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadAlpha = (e) => {
    e.preventDefault();
    if (onReadChapter) onReadChapter('0');
  };

  return (
    <section
      className="hero"
      id="hero"
      style={{
        transform: parallaxTransform,
        opacity: parallaxOpacity,
        zIndex: 1,
      }}
    >
      <div className="fi vis d1">
        <div className="hud-pill">
          <span className="hud-dot" />
          <span className="hud-status">TRANSMISSION: ACTIVE</span>
          <span className="hud-sep">//</span>
          <span className="hud-metric">NODE_01</span>
          <span className="hud-sep">//</span>
          <span className="hud-time" id="hud-clock">
            {utcTime || '00:00:00 UTC'}
          </span>
        </div>
      </div>

      <div className="fi vis d2">
        <span className="hero-eyebrow">&#916;xolotl Presents</span>
      </div>

      <div className="fi vis d3">
        <h1 className="hero-title">
          Memento
          <br />
          Mori
        </h1>
      </div>

      <div className="hero-divider fi vis d3" />

      <div className="fi vis d4">
        <p className="hero-desc">
          A chronicle of celestial grief, quiet devotion, and the breathless space between Adoniel and the Archangel of Death.
        </p>
      </div>

      <div className="fi vis d5 hero-cta-row">
        <a href="#archive" className="btn btn-hero-primary" onClick={scrollToArchive}>
          <span>Access Archives</span>
        </a>
        <button className="btn btn-hero-secondary" onClick={handleReadAlpha}>
          <span>Read Chapter α</span>
        </button>
      </div>
    </section>
  );
}

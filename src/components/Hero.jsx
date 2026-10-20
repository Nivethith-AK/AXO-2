import React, { useState, useEffect } from 'react';
import { useLenis } from './SmoothScroll';

export default function Hero() {
  const [utcTime, setUtcTime] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const lenis = useLenis();

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
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -75, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
        <div className="hud-pill cl-float">
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
          Welcome to the Official Website of the web-novel by &#916;xolotl!
        </p>
      </div>

      <div className="fi vis d5">
        <a href="#archive" className="btn cl-btn-magnetic" onClick={scrollToArchive}>
          <span>Access Archives</span>
        </a>
      </div>
    </section>
  );
}

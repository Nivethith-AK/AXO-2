import React, { useState, useEffect } from 'react';

const TICKER_ITEMS = [
  'MEMENTO MORI // A REASON TO LIVE',
  'WRITTEN CHRONICLE VOL. I',
  'ADONIEL TOGAMI × AZRAEL',
  'MASTER SOUNDTRACK: TO ETERNITY AND AFTER',
  'PROJECT EDEN RELAY',
  'VOCADUO 2026: DEATH WISH',
  'ORIGINAL COMPOSITIONS BY ΔXOLOTL',
];

export default function SignalHero({ onOpenChapter, onPlaySoundtrack }) {
  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 14, mins: 32, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <>
      <section className="sf-hero" id="hero">
        <div className="sf-wrap">
          <div className="sf-hero-meta">
            <div>
              <span className="sf-hero-tag-red">VOL. I ARCHIVE</span> · THE CELESTIAL RELAY
            </div>
            <div>TOKYO / THE CELESTIAL EXPANSE</div>
          </div>

          <h1 className="sf-hero-title">
            Memento
            <br />
            Mori®
          </h1>

          <div className="sf-hero-footer-grid">
            <p className="sf-hero-subline">
              Official Web-Novel &amp; Original Master Score by <strong>Δxolotl</strong>. A chronicle of celestial grief, quiet devotion, and the breathless space between a mortal programmer and the Archangel of Death.
            </p>

            <div className="sf-hero-countdown">
              <span className="sf-cd-label">Next Release Drop:</span>
              <span className="sf-cd-digits">
                {pad(timeLeft.days)} : {pad(timeLeft.hours)} : {pad(timeLeft.mins)} : {pad(timeLeft.secs)}
              </span>
            </div>

            <div className="sf-hero-cta-group">
              <button
                className="sf-btn-primary"
                onClick={() => {
                  if (onOpenChapter) onOpenChapter('0');
                }}
              >
                Access Archives
              </button>
              <a href="#soundtrack" className="sf-btn-secondary" onClick={scrollTo('soundtrack')}>
                Play Score
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Ticker (Marquee) */}
      <div className="sf-ticker" aria-hidden="true">
        <div className="sf-ticker-track">
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`t1-${idx}`} className="sf-ticker-item">
              <span className="sf-ticker-dot" />
              {item}
            </span>
          ))}
          {TICKER_ITEMS.map((item, idx) => (
            <span key={`t2-${idx}`} className="sf-ticker-item">
              <span className="sf-ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

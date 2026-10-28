import React, { useState, useEffect } from 'react';

const TICKER_ITEMS = [
  'SIGNAL ’26',
  'Admit all · Aug 21–24',
  'FOUR NIGHTS',
  'TWO STAGES',
  '16 ARTISTS',
  'NORTH YARD, LA',
  'ONE TICKET COVERS THE LOT',
  'MEMENTO MORI // VOL. I THE AWAKENING',
  'ORIGINAL COMPOSITIONS BY ΔXOLOTL',
];

export default function SignalHero({ onOpenChapter }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 84,
    hours: 16,
    mins: 34,
    secs: 22,
  });

  useEffect(() => {
    const target = new Date('2026-08-21T16:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <>
      <section className="sf-hero-exact" id="hero">
        <div className="sf-wrap">
          {/* Top metadata row */}
          <div className="sf-hero-top-row">
            <span className="sf-top-date">21-24 AUG</span>
            <span className="sf-top-brand">SIGNAL®</span>
            <span className="sf-top-type">Music festival</span>
            <span className="sf-top-loc">North Yard, Los Angeles</span>
          </div>

          {/* Center visual frame */}
          <div className="sf-hero-frame">
            <div className="sf-hero-frame-bg">
              <img
                src="/images/cover_art/death_wish.webp"
                alt="Memento Mori Festival frame"
                className="sf-hero-img"
              />
              <div className="sf-hero-frame-dim" />
            </div>

            <div className="sf-hero-frame-overlay">
              <h1 className="sf-hero-huge-brand">
                SIGNAL®
              </h1>
              <div className="sf-hero-sub-meta">
                <span>VOL. I THE AWAKENING</span>
                <span>ORIGINAL MASTER SCORE BY ΔXOLOTL</span>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 3 thumbnail stills + Countdown */}
          <div className="sf-hero-bottom-strip">
            <div className="sf-hero-stills">
              <div className="sf-still-item">
                <img src="/images/signalfest/hero_still_1.png" alt="Festival still 1" />
              </div>
              <div className="sf-still-item">
                <img src="/images/signalfest/hero_still_2.png" alt="Festival still 2" />
              </div>
              <div className="sf-still-item">
                <img src="/images/signalfest/hero_still_3.png" alt="Festival still 3" />
              </div>
            </div>

            <div className="sf-hero-strip-clock">
              <span className="sf-clock-prefix">Start:</span>
              <div className="sf-clock-digits-compact">
                <b>{timeLeft.days}</b><span>d</span>
                <b>{pad(timeLeft.hours)}</b><span>h</span>
                <b>{pad(timeLeft.mins)}</b><span>m</span>
                <b>{pad(timeLeft.secs)}</b><span>s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Band 1 */}
      <div className="sf-ticker-exact" aria-hidden="true">
        <div className="sf-ticker-track-exact">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="sf-ticker-cell">
              <span className="sf-ticker-bullet">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

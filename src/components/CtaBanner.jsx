import React from 'react';
import { useAudio } from '../context/AudioContext';

export default function CtaBanner({ onReadChapter }) {
  const { togglePlay, isPlaying } = useAudio();

  const handleRead = (e) => {
    e.preventDefault();
    if (onReadChapter) onReadChapter('0');
  };

  const handleSoundtrack = (e) => {
    e.preventDefault();
    const el = document.getElementById('soundtracks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (!isPlaying) togglePlay();
  };

  return (
    <section className="sec clario-cta-section">
      <div className="sec-inner">
        <div className="clario-cta-card">
          <div className="cta-corner tl" />
          <div className="cta-corner tr" />
          <div className="cta-corner bl" />
          <div className="cta-corner br" />

          <div className="cta-badge">
            <span className="dot-pulse" />
            <span>TRANSMISSION RELAY OPEN</span>
          </div>

          <h2 className="cta-title">
            Ready to Enter the Celestial Archive?
          </h2>
          <p className="cta-sub">
            Begin the journey through Volume I. Chapter <span className="glyph-preserve">α</span> — "When We Met" is unlocked and available to read now.
          </p>

          <div className="cta-actions">
            <button className="btn cta-btn-primary" onClick={handleRead}>
              <span>Read Chapter α</span>
            </button>
            <button className="btn cta-btn-secondary" onClick={handleSoundtrack}>
              <span>Listen to Soundtrack</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

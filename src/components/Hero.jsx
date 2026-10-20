import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';

export default function Hero({ onReadChapter }) {
  const { togglePlay, isPlaying } = useAudio();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxTransform = `translateY(${scrollY * 0.16}px)`;
  const parallaxOpacity = Math.max(0.2, 1 - scrollY / 900);

  const handleReadAlpha = (e) => {
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
        <div className="hero-artist-badge">
          <span className="artist-spark">✦</span>
          <span>AN ORIGINAL WEB NOVEL &amp; SOUNDTRACK BY ΔXOLOTL</span>
        </div>
      </div>

      <div className="fi vis d2">
        <h1 className="hero-title">
          Memento
          <br />
          Mori
        </h1>
      </div>

      <div className="hero-divider fi vis d3" />

      <div className="fi vis d4">
        <p className="hero-desc">
          A narrative and musical chronicle of existential grief, quiet devotion, and the archangel who appeared not to take a life, but to save it.
        </p>
      </div>

      <div className="fi vis d5 hero-cta-row">
        <button className="btn btn-hero-primary" onClick={handleReadAlpha}>
          <span>Read Chapter α</span>
        </button>
        <button className="btn btn-hero-secondary" onClick={handleSoundtrack}>
          <span>Listen to Soundtrack</span>
        </button>
      </div>
    </section>
  );
}

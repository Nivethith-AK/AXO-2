import React from 'react';

const STEPS = [
  {
    step: '01',
    phase: 'The Novel',
    title: 'The Written Story',
    desc: 'Immerse yourself in the story of Adoniel and Azrael. Chapters are released online for free, formatted for reading on any screen or device.',
    tag: 'VOLUME I · THE AWAKENING',
    icon: '📖',
  },
  {
    step: '02',
    phase: 'The Music',
    title: 'Original Soundtracks',
    desc: 'Each arc is paired with custom music composed and produced by Δxolotl — designed to be listened to while reading for a cinematic experience.',
    tag: 'MASTER SCORES BY ΔXOLOTL',
    icon: '🎵',
  },
  {
    step: '03',
    phase: 'The Visuals',
    title: 'Illustrated Artwork',
    desc: 'Visual artwork, trailers, and manga panels created in partnership with Project Eden bring the characters and celestial backdrops to life.',
    tag: 'PROJECT EDEN COLLABORATION',
    icon: '•',
  },
];

export default function Journey({ onReadChapter }) {
  return (
    <section className="sec" id="journey">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="sec-label c">The Experience</div>
          <h2 className="sec-title">Music, Words &amp; Visuals</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Memento Mori is crafted as an integrated narrative — combining written chapters, original music, and visual art.
          </p>
        </div>

        <div className="clario-steps-grid">
          {STEPS.map((s, idx) => (
            <div key={idx} className="clario-step-card">
              <div className="step-card-header">
                <span className="step-badge">{s.phase}</span>
                <span className="step-num">{s.step}</span>
              </div>
              <div className="step-icon-wrap">
                <span className="step-icon">{s.icon}</span>
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              <div className="step-footer">
                <span className="step-tag">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

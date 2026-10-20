import React from 'react';
import { useAudio } from '../context/AudioContext';

const EDITIONS = [
  {
    tier: 'Web Novel',
    badge: 'FREE & UNLOCKED',
    price: 'Free',
    period: 'online access',
    desc: 'Read all released chapters directly in your browser with our responsive manuscript reader.',
    features: [
      'Full access to Chapter α & Chapter I',
      'Distraction-free manuscript reader',
      'Works on mobile, tablet, and desktop',
      'Zero paywalls, logins, or ads',
    ],
    buttonText: 'Start Reading Now',
    actionType: 'read',
    isPrimary: false,
  },
  {
    tier: 'Original Soundtrack',
    badge: 'STREAMING NOW',
    price: 'Stream',
    period: 'high-fidelity',
    desc: 'Listen to the master score "To Eternity and After" composed and produced by Δxolotl.',
    features: [
      'Stream master audio on this site',
      'Integrated planetary visual player',
      'Lossless master audio dynamic range',
      'Cinematic companion to the story',
    ],
    buttonText: 'Play Master Soundtrack',
    actionType: 'music',
    isPrimary: true,
  },
  {
    tier: 'Collector’s Edition',
    badge: 'COMING SOON',
    price: 'TBA',
    period: 'physical bundle',
    desc: 'Limited physical hardcover book and vinyl record bundle featuring restored artwork.',
    features: [
      'Hardcover book with gold-foil embossing',
      'Exclusive full-color art plates',
      '180g heavyweight obsidian vinyl record',
      'Author annotations & signed print',
    ],
    buttonText: 'Get Notified',
    actionType: 'contact',
    isPrimary: false,
  },
];

export default function Shop({ onReadChapter }) {
  const { togglePlay, isPlaying } = useAudio();

  const handleAction = (e, actionType) => {
    e.preventDefault();
    if (actionType === 'read') {
      if (onReadChapter) onReadChapter('0');
    } else if (actionType === 'music') {
      const el = document.getElementById('soundtracks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      if (!isPlaying) togglePlay();
    } else if (actionType === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sec" id="shop">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="sec-label c">Releases &amp; Formats</div>
          <h2 className="sec-title">How to Experience Memento Mori</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Choose how you explore the universe — read online for free, stream the original score, or look forward to physical releases.
          </p>
        </div>

        <div className="clario-pricing-grid">
          {EDITIONS.map((ed, idx) => (
            <div
              key={idx}
              className={`clario-pricing-card ${ed.isPrimary ? 'popular' : ''}`}
            >
              {ed.isPrimary && (
                <div className="pricing-badge-popular">FEATURED RELEASE</div>
              )}
              <div className="card-top">
                <span className="pricing-badge">{ed.badge}</span>
                <h3 className="pricing-tier">{ed.tier}</h3>
                <div className="pricing-price-row">
                  <span className="pricing-price">{ed.price}</span>
                  <span className="pricing-period">/ {ed.period}</span>
                </div>
                <p className="pricing-desc">{ed.desc}</p>
              </div>

              <div className="pricing-divider" />

              <ul className="pricing-features">
                {ed.features.map((feat, fi) => (
                  <li key={fi} className="pricing-feat-item">
                    <span className="feat-check">✦</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${ed.isPrimary ? 'btn-primary-highlight' : ''}`}
                style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                onClick={(e) => handleAction(e, ed.actionType)}
              >
                <span>{ed.buttonText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const PASSES = [
  {
    type: 'Web Reader Pass',
    sub: 'Volume I · Complete Access',
    price: '$0',
    priceSub: '100% Free · Open to All',
    features: [
      'Full Chapter α & I read-through',
      'Distraction-free Reader overlay',
      'Bilingual notes & character logs',
      'Instant access on mobile & desktop',
    ],
    cta: 'Open Reader',
    action: 'read',
  },
  {
    type: 'Theme Song Single',
    sub: 'Death Wish ft. near · VocaDuo',
    price: 'FREE',
    priceSub: 'Official Stream & Video',
    features: [
      'Master composition by Δxolotl',
      'Lyrics by Allyens & Vocals by 81senear',
      'Full Animated Music Video on YouTube',
      'Instrumental & Vocal stems available',
    ],
    cta: 'Watch MV ↗',
    url: 'https://www.youtube.com/watch?v=qR_bDjRskpg',
  },
  {
    type: 'Full Discography',
    sub: '21 Releases · 2022–2026',
    price: '21',
    priceSub: 'Tracks Indexed',
    features: [
      'HoYoFair & Genshin Impact suites',
      'Chainsaw Man & AoT tributes',
      'Lossless master tracks',
      'Official Spotify & YouTube feeds',
    ],
    cta: 'Explore Feed ↓',
    action: 'scroll-disco',
  },
  {
    type: 'Project Eden Relay',
    sub: 'Visual Manga & Concept Art',
    price: 'OPEN',
    priceSub: 'Community Archive',
    features: [
      'Illustrated character designs',
      'Balcony & Celestial background art',
      'Upcoming Manga adaptation panels',
      'Direct Discord community relay',
    ],
    cta: 'Join Discord ↗',
    url: 'https://discord.gg/QRRa4mxaAm',
  },
];

export default function SignalTickets({ onOpenChapter }) {
  const handleAction = (p) => (e) => {
    if (p.url) return; // Opens normal link
    e.preventDefault();
    if (p.action === 'read') {
      if (onOpenChapter) onOpenChapter('0');
    } else if (p.action === 'scroll-disco') {
      const el = document.getElementById('discography');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sf-section" id="passes">
      <div className="sf-wrap">
        <span className="sf-pill">(Access Passes)</span>
        <h2 className="sf-lineup-title" style={{ marginBottom: '16px' }}>
          Tear along the perforation
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-mid)', maxWidth: '680px', marginBottom: '48px', lineHeight: 1.6 }}>
          A chapter is only a quarter of it. Memento Mori runs original master music, web-novel chronicles, illustrated lore, and everything connecting them — one site covers the lot.
        </p>

        <div className="sf-tickets-grid">
          {PASSES.map((pass) => (
            <div key={pass.type} className="sf-ticket-card">
              <div className="sf-ticket-card-header">
                <div className="sf-ticket-type">{pass.type}</div>
                <div className="sf-ticket-sub">{pass.sub}</div>

                <div className="sf-ticket-price-row">
                  <span className="sf-ticket-price">{pass.price}</span>
                  <span className="sf-ticket-price-sub">{pass.priceSub}</span>
                </div>
              </div>

              <div className="sf-ticket-card-body">
                <ul className="sf-ticket-features">
                  {pass.features.map((f, i) => (
                    <li key={i}>
                      <span className="sf-check-dot" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={pass.url || '#'}
                  target={pass.url ? '_blank' : '_self'}
                  rel={pass.url ? 'noreferrer' : ''}
                  className="sf-btn-primary"
                  style={{ width: '100%', marginTop: 'auto', textAlign: 'center' }}
                  onClick={handleAction(pass)}
                >
                  {pass.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

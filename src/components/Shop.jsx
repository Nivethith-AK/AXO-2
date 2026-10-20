import React from 'react';

const EDITIONS = [
  {
    tier: 'Digital Archive',
    badge: 'ACTIVE ACCESS',
    price: 'Free',
    period: 'forever',
    desc: 'Unrestricted access to all released chapters, web reading experience, and soundtrack streaming.',
    features: [
      'Full web manuscript access',
      'Interactive manga reader overlay',
      'Lossless master soundtrack streaming',
      'Zero advertisements or paywalls',
    ],
    buttonText: 'Read Records Now',
    buttonAction: '#archive',
    isPrimary: false,
  },
  {
    tier: 'Illustrated Manuscript',
    badge: 'COMING SOON',
    price: 'TBA',
    period: 'collector book',
    desc: 'Limited physical hardcover featuring restored high-resolution illustrations and exclusive colored art plates.',
    features: [
      'Hardcover with gold-foil typography',
      'Exclusive full-color concept art',
      'Author annotations by Δxolotl',
      'Archival acid-free paper',
    ],
    buttonText: 'Join Waitlist',
    buttonAction: '#contact',
    isPrimary: true,
  },
  {
    tier: 'Master Score Vinyl',
    badge: 'COMING SOON',
    price: 'TBA',
    period: 'audiophile edition',
    desc: 'Original soundtrack pressed on heavyweight obsidian vinyl with celestial gatefold artwork.',
    features: [
      '180g heavyweight obsidian vinyl',
      'Mastered for audiophile dynamic range',
      'Sacred geometry fold-out poster',
      'Includes 24-bit lossless FLAC download',
    ],
    buttonText: 'Notify Me',
    buttonAction: '#contact',
    isPrimary: false,
  },
];

export default function Shop({ onReadChapter }) {
  const handleClick = (e, action) => {
    e.preventDefault();
    if (action === '#archive' && onReadChapter) {
      onReadChapter('0');
      return;
    }
    const target = document.querySelector(action);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec" id="shop">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="sec-label c">Artifacts &amp; Editions</div>
          <h2 className="sec-title">Archive Editions</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Choose how you experience Memento Mori — from digital transmission to physical artifacts.
          </p>
        </div>

        <div className="clario-pricing-grid">
          {EDITIONS.map((ed, idx) => (
            <div
              key={idx}
              className={`clario-pricing-card ${ed.isPrimary ? 'popular' : ''}`}
            >
              {ed.isPrimary && (
                <div className="pricing-badge-popular">MOST ANTICIPATED</div>
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

              <a
                href={ed.buttonAction}
                className={`btn ${ed.isPrimary ? 'btn-primary-highlight' : ''}`}
                style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}
                onClick={(e) => handleClick(e, ed.buttonAction)}
              >
                <span>{ed.buttonText}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

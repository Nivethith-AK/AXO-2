import React from 'react';

const PARTNERS = [
  { name: 'Project Eden', role: 'Visual Artwork & Manga' },
  { name: 'Gamesense', role: 'Official Hardware PV' },
  { name: 'VocaDuo 2026', role: 'Theme Song Entry' },
  { name: 'YouTube', role: 'Music & Official MVs' },
  { name: 'Spotify', role: 'Lossless Streaming' },
  { name: 'SoundCloud', role: 'Audio Previews & Demos' },
  { name: 'Apple Music', role: 'Digital Distribution' },
  { name: 'Discord', role: 'Official Community' },
];

export default function SignalPartners() {
  return (
    <section className="sf-section" id="partners">
      <div className="sf-wrap">
        <span className="sf-pill">(Partners &amp; Affiliates)</span>
        <h2 className="sf-lineup-title" style={{ marginBottom: '32px' }}>
          Made possible by
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}>
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--fg)' }}>
                {p.name}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--fg-muted)' }}>
                {p.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

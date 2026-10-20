import React from 'react';

const COMPARISON_ROWS = [
  {
    topic: 'Core Reality',
    mortal: 'Human isolation, finite lifespan, endless lines of cold code',
    celestial: 'Archangel of Death, eternal consciousness, sacred geometry',
  },
  {
    topic: 'Existential Struggle',
    mortal: 'Despair, grief over lost mother, longing for reason to exist',
    celestial: 'Binding mandate to protect Adoniel’s life at all costs',
  },
  {
    topic: 'Perception of Time',
    mortal: 'Linear exhaustion, midnight compiler errors, ticking clocks',
    celestial: 'Timeline recursion, orbital relays, infinite recurrence',
  },
  {
    topic: 'Cosmic Threat',
    mortal: 'Unseen encroaching shadows beneath the surface of reality',
    celestial: 'Sinister forces threatening to collapse Project Eden',
  },
];

export default function ParadoxMatrix() {
  return (
    <section className="sec" id="lore">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="sec-label c">The Dual Realities</div>
          <h2 className="sec-title">The Paradox: Two Worlds</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Where fragile human mortality collides with the timeless mandates of the celestial expanse.
          </p>
        </div>

        <div className="clario-matrix-wrapper">
          <div className="matrix-col mortal-col">
            <div className="matrix-col-header">
              <span className="matrix-badge mortal">MORTAL HORIZON</span>
              <h3 className="matrix-col-title">Adoniel Togami</h3>
              <p className="matrix-col-sub">The Recluse Programmer</p>
            </div>
            <div className="matrix-rows">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="matrix-item">
                  <span className="matrix-topic-label">{row.topic}</span>
                  <p className="matrix-item-text">{row.mortal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="matrix-divider-glow" />

          <div className="matrix-col celestial-col">
            <div className="matrix-col-header">
              <span className="matrix-badge celestial">CELESTIAL REALM</span>
              <h3 className="matrix-col-title">Azrael</h3>
              <p className="matrix-col-sub">Archangel of Death</p>
            </div>
            <div className="matrix-rows">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="matrix-item highlighted">
                  <span className="matrix-topic-label">{row.topic}</span>
                  <p className="matrix-item-text">{row.celestial}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

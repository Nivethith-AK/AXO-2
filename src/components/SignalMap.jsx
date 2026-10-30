import React, { useState } from 'react';

export default function SignalMap() {
  const [activePin, setActivePin] = useState(1);

  const pins = [
    { id: 1, name: 'Main stage', desc: 'Central performance stage & headline scores', time: '4 min from gate' },
    { id: 2, name: 'Yard stage', desc: 'Acoustic pianoforte & intimate live sets', time: '6 min' },
    { id: 3, name: 'Art zone', desc: 'Interactive concept art & manga projection room', time: 'All night' },
    { id: 4, name: 'Food court', desc: 'Artisan coffee & late-night dining', time: 'Open 16:00' },
    { id: 5, name: 'Bars', desc: 'Craft beverages & lounge deck', time: 'All night' },
    { id: 6, name: 'Toilets', desc: 'Step-free accessible restrooms', time: 'All zones' },
    { id: 7, name: 'Medical', desc: 'First aid, hydration & quiet room', time: '24/7' },
    { id: 8, name: 'Gate A', desc: 'Main check-in & pass accreditation', time: 'Entry point' },
  ];

  return (
    <section className="sf-section sf-map-section" id="map">
      <div className="sf-wrap">
        <div className="sf-map-head">
          <div className="sf-map-tag-row">
            <span className="sf-pill">(Site plan)</span>
            <div className="sf-hatch-box">
              <div className="sf-hatch-stripes" />
            </div>
          </div>
          <div className="sf-map-title-row">
            <h2 className="sf-map-title">Learn it now. Enjoy it at 23:00.</h2>
            <p className="sf-map-subtitle">Everything you need, right where the music happens.</p>
          </div>
        </div>

        <div className="sf-map-display">
          <div className="sf-map-visual">
            <img src="/images/cover_art/death_wish.jpg" alt="Festival site plan" loading="lazy" />
            <div className="sf-map-pins-overlay">
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  className={`sf-map-pin sf-pin-${pin.id} ${activePin === pin.id ? 'is-active' : ''}`}
                  onClick={() => setActivePin(pin.id)}
                  title={pin.name}
                >
                  <span>{pin.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sf-map-sidebar">
            <div className="sf-map-legend">
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  className={`sf-legend-item ${activePin === pin.id ? 'is-active' : ''}`}
                  onClick={() => setActivePin(pin.id)}
                >
                  <span className="sf-legend-num">{pin.id}.</span>
                  <span className="sf-legend-name">{pin.name}</span>
                </button>
              ))}
            </div>

            <div className="sf-map-callouts">
              <div className="sf-map-stat">
                <span className="sf-map-stat-num">01</span>
                <span className="sf-map-stat-label">Main stage · 4 min from gate</span>
              </div>
              <div className="sf-map-stat">
                <span className="sf-map-stat-num">02</span>
                <span className="sf-map-stat-label">Yard stage · 6 min</span>
              </div>
              <div className="sf-map-stat">
                <span className="sf-map-stat-num">03</span>
                <span className="sf-map-stat-label">Installations · all night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const TICKER_ITEMS = [
  'MEMENTO MORI // A REASON TO LIVE',
  'CELESTIAL ARCHIVE',
  'ADONIEL TOGAMI × AZRAEL',
  'ORIGINAL SOUNDTRACK: TO ETERNITY AND AFTER',
  'WRITTEN CHRONICLE VOL. I',
  'SACRED GEOMETRY RELAY',
  'PROJECT EDEN',
];

export default function InfiniteTicker() {
  return (
    <div className="infinite-ticker" aria-hidden="true">
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, idx) => (
          <span key={`a-${idx}`} className="ticker-item">
            <span className="ticker-glyph">✦</span>
            {item}
          </span>
        ))}
        {/* Duplicate items for seamless continuous loop */}
        {TICKER_ITEMS.map((item, idx) => (
          <span key={`b-${idx}`} className="ticker-item">
            <span className="ticker-glyph">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

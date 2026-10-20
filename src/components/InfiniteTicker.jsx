import React from 'react';

const TICKER_ITEMS = [
  'MEMENTO MORI // A REASON TO LIVE',
  'ORIGINAL SOUNDTRACK BY ΔXOLOTL',
  '"TO ETERNITY AND AFTER"',
  'CHAPTER α: WHEN WE MET',
  'CHAPTER I: A DEATH WISH',
  'ILLUSTRATIONS BY PROJECT EDEN',
  'VOLUME I: THE AWAKENING',
  '100% FREE TO READ ONLINE',
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

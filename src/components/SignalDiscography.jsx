import React, { useState } from 'react';
import { DISCOGRAPHY } from '../data/discographyData';

export default function SignalDiscography() {
  const [filter, setFilter] = useState('all');

  const filtered = DISCOGRAPHY.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const releasesCount = DISCOGRAPHY.filter((t) => t.type === 'release').length;
  const featuredCount = DISCOGRAPHY.filter((t) => t.type === 'featured').length;

  return (
    <section className="sf-section" id="discography">
      <div className="sf-wrap">
        <div className="sf-lineup-header">
          <div>
            <span className="sf-pill">(Official Discography)</span>
            <h2 className="sf-lineup-title">21 Releases Indexed by Δxolotl</h2>
          </div>
          <span className="sf-pill" style={{ margin: 0 }}>
            2022 — 2026
          </span>
        </div>

        {/* Filter Pills */}
        <div className="sf-disco-filters">
          <button
            className={`sf-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tracks ({DISCOGRAPHY.length})
          </button>
          <button
            className={`sf-filter-btn ${filter === 'release' ? 'active' : ''}`}
            onClick={() => setFilter('release')}
          >
            Releases ({releasesCount})
          </button>
          <button
            className={`sf-filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Featured &amp; Collabs ({featuredCount})
          </button>
        </div>

        {/* Discography Grid */}
        <div className="sf-disco-grid">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sf-disco-card"
            >
              <div className="sf-disco-thumb-wrap">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="sf-disco-thumb"
                  loading="lazy"
                />
                <span className="sf-belt-tag-overlay">{item.tag}</span>
              </div>
              <div className="sf-disco-card-body">
                <h3 className="sf-disco-card-title">{item.title}</h3>
                {item.notes && <p className="sf-disco-card-notes">{item.notes}</p>}
                {item.roles && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--fg-dim)', marginTop: '4px' }}>
                    {item.roles.slice(0, 3).join(' · ')}
                  </div>
                )}
                <div className="sf-disco-card-footer">
                  <span>Year {item.year}</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Stream ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { VOLUMES } from '../data/chapters';

export default function Archive({ onOpenChapter }) {
  return (
    <section className="sec" id="archive">
      <div className="sec-inner">
        <div className="fi vis cl-reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="sec-label c">The Written Chronicle</div>
          <h2 className="sec-title">Archive</h2>
          <p className="sec-body" style={{ margin: '0 auto' }}>
            Records from the celestial expanse — next chapter: 2026.11.16
          </p>
        </div>

        <div id="ch-volumes">
          {VOLUMES.map((vol, vi) => (
            <div key={vol.id} className={`fi vis cl-reveal cl-stagger-${Math.min(vi + 1, 4)}`}>
              <div className="vol-header">
                <span className="vol-label">{vol.label}</span>
                <div className="vol-line" />
              </div>

              <div className="ch-list">
                {vol.chapters.map((ch, idx) => {
                  if (ch.locked) {
                    return (
                      <div key={ch.id} className="ch-row locked cl-interactive-card">
                        <span className="ch-num">{ch.displayNum}</span>
                        <div className="ch-info">
                          <span className="ch-name">{ch.title}</span>
                          <span className="ch-date" style={{ opacity: 0.5 }}>
                            Encrypted
                          </span>
                        </div>
                        <span className="ch-arr">—</span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={ch.id}
                      className="ch-row cl-interactive-card"
                      onClick={() => onOpenChapter(ch.id)}
                      title={`Read Record: ${ch.title}`}
                    >
                      <span className="ch-num">{ch.displayNum}</span>
                      <div className="ch-info">
                        <span className="ch-name">{ch.title}</span>
                        <span className="ch-date">{ch.date || ''}</span>
                      </div>
                      <span className="ch-arr">→</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

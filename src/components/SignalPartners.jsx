import React from 'react';

const ROW_1 = [
  'NORTHBOUND',
  'THE PACIFIC REVIEW',
  'FREQUENCY',
  'NIGHTSHIFT LA',
  'yard notes',
  'KESTREL SOUND',
  'PIXEL YARD',
  'PROJECT EDEN',
  'GAMESENSE',
];

const ROW_2 = [
  'HALO SYSTEMS',
  'LOOP',
  'ARTS DISTRICT COUNCIL',
  '[ Open Walls ]',
  'LA SKATE UNION',
  'BOYLE HEIGHTS KITCHEN',
  'VOCADUO 2026',
  'STUDIO 199',
];

export default function SignalPartners() {
  return (
    <section className="sf-section sf-partners-section" id="partners">
      <div className="sf-wrap">
        <div className="sf-partners-head">
          <span className="sf-pill">(Partners)</span>
          <h2 className="sf-lineup-title">Made possible by</h2>
        </div>

        {/* Main Partner Highlight */}
        <div className="sf-main-partner-card">
          <span className="sf-main-partner-badge">Main partner</span>
          <div className="sf-main-partner-name">NORTHBOUND</div>
          <span className="sf-main-partner-since">With Signal since ’23</span>
        </div>

        {/* 2-row Marquee */}
        <div className="sf-partners-marquee-wrap" aria-hidden="true">
          <div className="sf-partners-track sf-track-left">
            {[...ROW_1, ...ROW_1].map((p, i) => (
              <span key={i} className="sf-partner-tag">
                {p}
              </span>
            ))}
          </div>

          <div className="sf-partners-track sf-track-right">
            {[...ROW_2, ...ROW_2].map((p, i) => (
              <span key={i} className="sf-partner-tag">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="sf-partners-cta-row">
          <a href="#faq" className="sf-btn sf-btn-outline">
            BECOME A PARTNER
          </a>
        </div>
      </div>
    </section>
  );
}

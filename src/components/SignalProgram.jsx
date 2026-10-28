import React, { useState } from 'react';

const CHAPTERS = [
  {
    id: '0',
    tab: 'Chapter α',
    subtitle: 'When We Met',
    date: 'Night 0 · Prelude',
    time: '23:45',
    stage: 'Balcony · First Light',
    desc: 'Adoniel sits at his computer in a dark room. An anomalous line appears on his console. When he steps onto his balcony, he finds Azrael standing in the moonlight.',
    details: [
      { time: '23:45', act: 'Console Halts', loc: 'IDE Terminal', note: 'Unrecognized line of code injected' },
      { time: '23:55', act: 'The Balcony Gate', loc: 'Apartment Edge', note: 'Night breeze and amber eye resonance' },
      { time: '00:00', act: 'The Vow of Non-Execution', loc: 'Moonlight', note: 'Azrael declares her purpose is to guard him' },
    ],
  },
  {
    id: '1',
    tab: 'Chapter I',
    subtitle: 'A Death Wish',
    date: 'Night 1 · Act I',
    time: '01:15',
    stage: 'Terminal · Glitch',
    desc: 'The aftermath of the encounter. As Adoniel tries to make sense of the immortal guardian living in his space, memories of his mother resurface.',
    details: [
      { time: '01:15', act: 'Quiet Breakfast', loc: 'Kitchen Counter', note: 'Mortal routine intersects immortal patience' },
      { time: '02:30', act: 'Terminal Glitch', loc: 'Localhost', note: 'Recursion loop in memory allocation' },
      { time: '03:45', act: 'The Question', loc: 'Living Room', note: 'Why did the Archangel descend?' },
    ],
  },
  {
    id: '2',
    tab: 'Chapter II',
    subtitle: "The Archangel's Oath",
    date: 'Night 2 · Act II',
    time: '04:00',
    stage: 'Eden · Relay',
    desc: 'A deeper dive into the celestial realm rules. Azrael explains the weight of mortal lives and the anomaly that drew her to Earth.',
    details: [
      { time: '04:00', act: 'Celestial Signal', loc: 'Upper Expanse', note: 'Frequency distortion in the constellation' },
      { time: '05:20', act: 'The Broken Star', loc: 'Tokyo Skyline', note: 'Dawn light breaks through the haze' },
    ],
  },
  {
    id: '3',
    tab: 'Chapter III',
    subtitle: 'Whispers of Mortality',
    date: 'Night 3 · Act III',
    time: '06:30',
    stage: 'The Void · Horizon',
    desc: 'The upcoming chapter releasing soon. Adoniel discovers that his mother’s death might not have been a mere coincidence.',
    details: [
      { time: '06:30', act: 'The Encrypted Note', loc: 'Mother’s Journal', note: 'Key coordinates left behind' },
      { time: '07:15', act: 'Next Drop Transmission', loc: 'Incoming Relay', note: 'Releasing November 2026' },
    ],
  },
];

export default function SignalProgram({ onOpenChapter }) {
  const [activeTab, setActiveTab] = useState(0);

  const curr = CHAPTERS[activeTab];

  return (
    <section className="sf-section" id="program">
      <div className="sf-wrap">
        <span className="sf-pill">(The Chronicle Program)</span>
        <h2 className="sf-lineup-title" style={{ marginBottom: '32px' }}>
          Four chapters — scroll through Volume I
        </h2>

        {/* Tab Buttons */}
        <div className="sf-program-tabs">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              className={`sf-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="sf-tab-day">{ch.tab}</span>
              <span className="sf-tab-date">{ch.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="sf-schedule-list">
          <div className="sf-schedule-item">
            <span className="sf-item-time">{curr.time}</span>
            <div>
              <div className="sf-item-title">{curr.subtitle}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--fg-muted)', marginTop: '4px' }}>
                {curr.date}
              </div>
            </div>
            <div className="sf-item-desc">{curr.desc}</div>
            <div>
              <button
                className="sf-btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.95rem' }}
                onClick={() => {
                  if (onOpenChapter) onOpenChapter(curr.id);
                }}
              >
                Read Record →
              </button>
            </div>
          </div>

          {curr.details.map((d, i) => (
            <div key={i} className="sf-schedule-item" style={{ padding: '18px 0' }}>
              <span className="sf-item-time" style={{ fontSize: '0.95rem', opacity: 0.85 }}>
                {d.time}
              </span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--fg)' }}>
                {d.act}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--fg-mid)' }}>
                {d.note}
              </div>
              <span className="sf-item-tag">{d.loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const STEPS = [
  {
    step: '01',
    phase: 'Step 1',
    title: 'The Existential Despair',
    desc: 'Adoniel Togami isolates himself before a glowing terminal screen. Long past midnight, an accidental syntax confession freezes the compiler: "Why am I even alive?"',
    tag: 'NODE_CODE // ISOLATION',
    icon: '⬡',
  },
  {
    step: '02',
    phase: 'Step 2',
    title: 'The Celestial Descent',
    desc: 'On a moonlit balcony sits Azrael — raven-haired, with amber eyes that pierce the soul. She has appeared not to take his life, but to ensure he holds onto it.',
    tag: 'AZRAEL // THE ARCHANGEL',
    icon: '◈',
  },
  {
    step: '03',
    phase: 'Step 3',
    title: 'The Relays of Eden',
    desc: 'As memory fragments collide with ancient sacred geometry, something sinister awakens. A cosmic recurrence where mortality and eternity intertwine.',
    tag: 'PROJECT EDEN // VOL. I',
    icon: '✦',
  },
];

export default function Journey({ onReadChapter }) {
  return (
    <section className="sec" id="journey">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="sec-label c">The Narrative Arc</div>
          <h2 className="sec-title">How the Chronicle Unfolds</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Follow the journey from terminal despair to celestial intervention in three pivotal phases.
          </p>
        </div>

        <div className="clario-steps-grid">
          {STEPS.map((s, idx) => (
            <div key={idx} className="clario-step-card">
              <div className="step-card-header">
                <span className="step-badge">{s.phase}</span>
                <span className="step-num">{s.step}</span>
              </div>
              <div className="step-icon-wrap">
                <span className="step-icon">{s.icon}</span>
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              <div className="step-footer">
                <span className="step-tag">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

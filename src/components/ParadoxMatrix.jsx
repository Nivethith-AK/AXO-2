import React from 'react';

const CHARACTERS = [
  {
    name: 'Adoniel Togami',
    role: 'The Recluse Programmer',
    badge: 'MORTAL WORLD',
    desc: 'Buried beneath lines of code long past midnight, Adoniel is trapped in quiet isolation and grief over his mother’s passing. When an accidental line of text halts his screen, he questions why he continues to exist.',
    highlights: [
      { label: 'Origin', val: 'Human Programmer' },
      { label: 'Struggle', val: 'Existential Despair & Grief' },
      { label: 'Encounter', val: 'Finds Azrael waiting on his balcony' },
    ],
  },
  {
    name: 'Azrael',
    role: 'The Archangel of Death',
    badge: 'CELESTIAL REALM',
    desc: 'With hair as dark as a raven and calm eyes of glowing amber, Azrael descends from the celestial expanse. Though bearing the title of Death, she arrives not to take Adoniel’s life, but to guard it.',
    highlights: [
      { label: 'Origin', val: 'Celestial Archangel' },
      { label: 'Purpose', val: 'Preserving Adoniel’s Life' },
      { label: 'Nature', val: 'Quiet devotion, subtle warmth & mystery' },
    ],
  },
];

export default function ParadoxMatrix() {
  return (
    <section className="sec" id="lore">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="sec-label c">The Characters</div>
          <h2 className="sec-title">Two Worlds in Collision</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            At the heart of Memento Mori is the quiet bond between a solitary human and an immortal guardian.
          </p>
        </div>

        <div className="clario-matrix-wrapper">
          {CHARACTERS.map((char, idx) => (
            <React.Fragment key={char.name}>
              {idx > 0 && <div className="matrix-divider-glow" />}
              <div className={`matrix-col ${idx === 0 ? 'mortal-col' : 'celestial-col'}`}>
                <div className="matrix-col-header">
                  <span className={`matrix-badge ${idx === 0 ? 'mortal' : 'celestial'}`}>
                    {char.badge}
                  </span>
                  <h3 className="matrix-col-title">{char.name}</h3>
                  <p className="matrix-col-sub">{char.role}</p>
                </div>

                <p className="matrix-item-text" style={{ marginBottom: '28px', lineHeight: 1.8 }}>
                  {char.desc}
                </p>

                <div className="matrix-rows">
                  {char.highlights.map((h, hi) => (
                    <div key={hi} className="matrix-item">
                      <span className="matrix-topic-label">{h.label}</span>
                      <span className="matrix-item-text">{h.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

const BELT_ITEMS = [
  {
    name: 'Adoniel Togami',
    role: 'The Recluse Programmer',
    tag: 'MORTAL REALM',
    time: '23:45',
    date: 'Night 0',
    stage: 'Tokyo Apartment',
    img: '/images/assets/profile_image.webp',
    desc: 'Buried under code and grief for his late mother, Adoniel’s screen freezes when an unintended line echoes back.',
  },
  {
    name: 'Azrael',
    role: 'Archangel of Death',
    tag: 'CELESTIAL REALM',
    time: '00:00',
    date: 'Night 1',
    stage: 'The Balcony',
    img: '/images/cover_art/death_wish.webp',
    desc: 'Raven hair, glowing amber eyes, and an immortal vow not to claim Adoniel’s life, but to guard it.',
  },
  {
    name: 'Death Wish',
    role: 'Official Theme Song',
    tag: 'VOCADUO 2026',
    time: '03:42',
    date: 'Vol. I Theme',
    stage: 'Master Score',
    img: '/images/cover_art/death_wish.webp',
    desc: 'Official Memento Mori entry featuring near, Allyens, and master composition by Δxolotl.',
  },
  {
    name: 'SiLVERL!NE',
    role: 'Silver Wolf Anthem',
    tag: 'HOYODIR 2025',
    time: '04:15',
    date: 'Featured Work',
    stage: 'Cyber Relay',
    img: '/images/cover_art/silverline.webp',
    desc: 'HoYoFair 2025 flagship tribute piece composed, arranged, and produced by Δxolotl.',
  },
  {
    name: 'Broken Steps',
    role: 'Piano Archive',
    tag: 'ORIGINAL OST',
    time: '12:00',
    date: 'Vol. 0 Record',
    stage: 'Pianoforte',
    img: '/images/cover_art/bsos.webp',
    desc: 'Pianoforte adlibs and ambient acoustic arrangements composed by Δxolotl for Studio 199.',
  },
  {
    name: 'Project Eden',
    role: 'Visual Partnership',
    tag: 'MANGA & LORE',
    time: 'Ongoing',
    date: 'Illustrated Arc',
    stage: 'Eden Relay',
    img: '/images/cover_art/aotnr.webp',
    desc: 'Collaborative manga panels, background conceptual artwork, and trailers expanding the universe.',
  },
];

export default function SignalLineup() {
  return (
    <section className="sf-section" id="lineup">
      <div className="sf-wrap">
        <div className="sf-lineup-header">
          <div>
            <span className="sf-pill">(The Cast &amp; Relics)</span>
            <h2 className="sf-lineup-title">First wave — drag the belt</h2>
          </div>
          <span className="sf-pill" style={{ margin: 0 }}>
            {BELT_ITEMS.length} Entities Indexed
          </span>
        </div>

        <div className="sf-belt-container">
          {BELT_ITEMS.map((item) => (
            <div key={item.name} className="sf-belt-card">
              <div className="sf-belt-img-wrap">
                <img src={item.img} alt={item.name} className="sf-belt-img" loading="lazy" />
                <span className="sf-belt-tag-overlay">{item.tag}</span>
              </div>
              <div className="sf-belt-body">
                <h3 className="sf-belt-name">{item.name}</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--fg-mid)' }}>{item.role}</p>
                <p style={{ margin: '6px 0 12px', fontSize: '0.8rem', color: 'var(--fg-dim)', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
                <div className="sf-belt-meta">
                  <span>{item.date}</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.time}</span>
                  <span>{item.stage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

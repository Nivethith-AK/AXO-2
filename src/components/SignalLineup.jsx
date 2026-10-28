import React, { useRef } from 'react';

const BELT_ITEMS = [
  {
    name: 'Amara Voss',
    time: '22:30',
    date: 'Thu, Aug 21',
    stage: 'Main stage',
    tag: 'HEADLINE',
    img: '/images/cover_art/death_wish.webp',
  },
  {
    name: 'Elias Kron',
    time: '21:00',
    date: 'Fri, Aug 22',
    stage: 'Yard stage',
    tag: 'LIVE',
    img: '/images/cover_art/silverline.webp',
  },
  {
    name: 'Nina Bruhn',
    time: '23:30',
    date: 'Fri, Aug 22',
    stage: 'Main stage',
    tag: 'HEADLINE',
    img: '/images/cover_art/bsos.webp',
  },
  {
    name: 'Dax Holloway',
    time: '22:00',
    date: 'Sat, Aug 23',
    stage: 'Main stage',
    tag: 'HEADLINE',
    img: '/images/cover_art/40pct.webp',
  },
  {
    name: 'Tomas Frei',
    time: '21:30',
    date: 'Sun, Aug 24',
    stage: 'Main stage',
    tag: 'HEADLINE',
    img: '/images/cover_art/legacy_of_helios.webp',
  },
  {
    name: 'Adoniel Togami',
    time: '23:45',
    date: 'Night 0',
    stage: 'Tokyo Apartment',
    tag: 'PROGRAMMER',
    img: '/images/assets/profile_image.webp',
  },
  {
    name: 'Azrael',
    time: '00:00',
    date: 'Night 1',
    stage: 'The Balcony',
    tag: 'ARCHANGEL',
    img: '/images/cover_art/death_wish.webp',
  },
];

export default function SignalLineup() {
  const beltRef = useRef(null);

  return (
    <section className="sf-section sf-lineup-section" id="lineup">
      <div className="sf-wrap">
        <div className="sf-lineup-header">
          <div>
            <span className="sf-pill">(Lineup)</span>
            <h2 className="sf-lineup-title">First wave — drag the belt</h2>
          </div>
          <span className="sf-pill sf-pill-counter">
            {BELT_ITEMS.length} Artists Indexed
          </span>
        </div>

        <div className="sf-belt-viewport" ref={beltRef}>
          <div className="sf-belt-track">
            {BELT_ITEMS.map((item, idx) => (
              <div key={idx} className="sf-fisheye-card">
                <div className="sf-fisheye-img-wrap">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  <span className="sf-fisheye-tag">{item.tag}</span>
                </div>
                <div className="sf-fisheye-meta">
                  <h3 className="sf-fisheye-name">{item.name}</h3>
                  <div className="sf-fisheye-info">
                    <span className="sf-fisheye-time">{item.time}</span>
                    <span className="sf-fisheye-date">{item.date}</span>
                    <span className="sf-fisheye-stage">{item.stage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sf-lineup-subtext">
          <span>AUTO-SLIDES — DRAG TO BROWSE</span>
        </div>
      </div>
    </section>
  );
}

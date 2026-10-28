import React from 'react';

export default function SignalExperience({ onOpenReader }) {
  const experiences = [
    {
      num: '1',
      title: 'LIVE SCORE',
      desc: 'Twenty-one original master compositions, two stages, four nights that end when the sun says so.',
      image: '/images/signalfest/exp_1.png',
      tag: 'MASTER AUDIO',
    },
    {
      num: '2',
      title: 'DIGITAL NOVEL',
      desc: 'Four chapters of code, angels, existential grief and mortal vows you read through, not past.',
      image: '/images/signalfest/exp_2.png',
      tag: 'WEB NOVEL',
    },
    {
      num: '3',
      title: 'STREET & LORE',
      desc: 'Live manga panels, concept art, orchestral adlibs and global artist collaborations.',
      image: '/images/signalfest/exp_3.png',
      tag: 'PROJECT EDEN',
    },
  ];

  return (
    <section className="sf-experience-section" id="experience">
      <div className="sf-experience-inner">
        {experiences.map((exp) => (
          <div key={exp.num} className="sf-exp-card">
            <div className="sf-exp-bg">
              <img src={exp.image} alt={exp.title} loading="lazy" />
              <div className="sf-exp-overlay" />
            </div>
            <div className="sf-exp-content">
              <div className="sf-exp-header">
                <span className="sf-exp-num">{exp.num}</span>
                <span className="sf-exp-tag">{exp.tag}</span>
              </div>
              <div className="sf-exp-footer">
                <h3 className="sf-exp-title">{exp.title}</h3>
                <p className="sf-exp-desc">{exp.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

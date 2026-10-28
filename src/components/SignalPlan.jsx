import React from 'react';

export default function SignalPlan() {
  const cards = [
    {
      title: 'Getting here',
      desc: 'Metro to Little Tokyo, then eight minutes on foot. Lot C holds 400 cars and it fills by 19:00 on Saturday.',
      image: '/images/signalfest/plan_1.png',
      tag: 'TRANSIT & ARRIVAL',
    },
    {
      title: 'What to bring',
      desc: 'ID, a sealed bottle under 500 ml, one soft bag under 30×20 cm. Chairs, umbrellas and pro cameras stay at home.',
      image: '/images/signalfest/plan_2.png',
      tag: 'BAG POLICY',
    },
    {
      title: 'Safety and care',
      desc: 'The welfare tent sits by the medical point, staffed all night. Step-free throughout, a quiet room next to Gate A, and a line you can text.',
      image: '/images/signalfest/plan_3.png',
      tag: 'ACCESSIBILITY & CARE',
    },
  ];

  return (
    <section className="sf-section sf-plan-section" id="visit">
      <div className="sf-wrap">
        <div className="sf-plan-header">
          <span className="sf-pill">(Plan your visit)</span>
          <h2 className="sf-plan-huge-title">Three things worth knowing before you walk in.</h2>
        </div>

        <div className="sf-plan-cards-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="sf-plan-card">
              <div className="sf-plan-card-img">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="sf-plan-card-body">
                <span className="sf-plan-tag">{card.tag}</span>
                <h3 className="sf-plan-card-title">{card.title}</h3>
                <p className="sf-plan-card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

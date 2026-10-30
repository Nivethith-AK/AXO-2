import React, { useState } from 'react';

const FAQS = [
  {
    num: '01',
    q: 'Are tickets refundable?',
    a: 'Full refunds are available within 14 days of purchase up to August 7. After that, passes can be transferred freely to any name until August 18 via your confirmation link.',
  },
  {
    num: '02',
    q: 'Can I transfer my ticket?',
    a: 'Yes, free name changes are open until August 18 at 23:59 PT. Simply click the transfer link in your original ticket email and input the new recipient details.',
  },
  {
    num: '03',
    q: 'Will tickets be available at the entrance?',
    a: 'If any tier has remaining allocations, the box office at Gate A will open at 15:00 on each festival day. However, last year all four days completely sold out prior to gates opening.',
  },
  {
    num: '04',
    q: 'Is there an age limit?',
    a: 'Signal Festival is an all-ages event. Attendees under 16 must be accompanied by an adult pass-holder. Children under 10 enter free with a ticketed guardian.',
  },
  {
    num: '05',
    q: 'What happens if it rains?',
    a: 'Signal is a rain-or-shine outdoor gathering. Both the Main Stage and Yard Stage feature covered acoustic sound roofs, and free poncho stations are deployed across the site.',
  },
  {
    num: '06',
    q: 'Can I leave and re-enter?',
    a: 'Yes, all passes include unlimited same-day re-entry. Just ensure your RFID wristband is scanned out at Gate A before stepping out into the Arts District.',
  },
];

export default function SignalFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="sf-section sf-faq-section" id="faq">
      <div className="sf-wrap">
        <div className="sf-faq-header-block">
          <span className="sf-pill">(FAQ)</span>
          <h2 className="sf-lineup-title">Six answers, no small print</h2>
          <p className="sf-faq-lead">
            Everything people actually asked us last August, answered the way we would answer it at the gate.
          </p>
        </div>

        <div className="sf-faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.num} className={`sf-faq-item ${isOpen ? 'open' : ''}`}>
                <button className="sf-faq-trigger" onClick={() => toggle(idx)}>
                  <div className="sf-faq-left">
                    <span className="sf-faq-num">{item.num}</span>
                    <span className="sf-faq-question">{item.q}</span>
                  </div>
                  <span className="sf-faq-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className="sf-faq-answer">{item.a}</div>}
              </div>
            );
          })}
        </div>

        {/* Torn Pass CTA Banner */}
        <div className="sf-torn-cta-card">
          <div className="sf-torn-cta-bg">
            <img src="/images/cover_art/SIPRSS.jpg" alt="Signal Festival crowd" loading="lazy" />
            <div className="sf-torn-cta-dim" />
          </div>

          <div className="sf-torn-cta-content">
            <div className="sf-torn-cta-top">
              <span className="sf-torn-cta-prompt">Still thinking about it?</span>
              <h3 className="sf-torn-cta-headline">THE NEXT TICKET TIER WON’T WAIT.</h3>
            </div>

            <div className="sf-torn-cta-details">
              <div className="sf-torn-detail">
                <span className="sf-torn-lbl">SIGNAL ’26</span>
                <span className="sf-torn-val">AUG 21–24</span>
              </div>
              <div className="sf-torn-detail">
                <span className="sf-torn-lbl">NORTH YARD, LA</span>
                <span className="sf-torn-val">GATE A · 16:00</span>
              </div>
            </div>

            <div className="sf-torn-cta-action">
              <a href="#tickets" className="sf-btn sf-btn-red sf-torn-btn">
                <span>GET YOUR PASS</span>
                <small>№ 018400 · ADMIT ALL</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

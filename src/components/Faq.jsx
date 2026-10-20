import React, { useState } from 'react';

const FAQS = [
  {
    num: '01',
    q: 'What is Memento Mori: A Reason to Live?',
    a: 'Memento Mori is an original web-novel and multimedia universe created by Δxolotl. It chronicles Adoniel Togami, a reclusive programmer burdened with existential isolation, and Azrael, the Archangel of Death who arrives not to take his life, but to keep him alive.',
  },
  {
    num: '02',
    q: 'When are upcoming chapters released?',
    a: 'Volume I chapters are released on bi-weekly transmissions. Chapter α and Chapter I are available now. Chapter II: Solace in Death and Chapter III: Manna are scheduled for release starting 2026.11.16.',
  },
  {
    num: '03',
    q: 'Where can I listen to the original soundtrack?',
    a: 'The official master score "Track Ω: To Eternity and After" is embedded directly on this website in the interactive Planetary Orrery player, with high-fidelity streaming and lossless playback.',
  },
  {
    num: '04',
    q: 'What is the distinction between Chapter α and Chapter I?',
    a: 'Chapter α ("When We Met") serves as the celestial prelude, introducing the fateful midnight encounter between Adoniel and Azrael. Chapter I ("A Death Wish") delves deeper into the harrowing events and the awakening of the recursion timeline.',
  },
  {
    num: '05',
    q: 'Who is behind the visuals and Project Eden?',
    a: 'Visual artwork, sacred geometry animations, and conceptual renders are coordinated under the Project Eden relay, providing cinematic trailers and illustrated manga pages.',
  },
  {
    num: '06',
    q: 'How can I submit business or licensing inquiries?',
    a: 'You can submit transmission inquiries directly through the Contact terminal below. Official inquiries receive responses within 4–5 business days.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="sec" id="faq">
      <div className="sec-inner">
        <div className="fi vis" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="sec-label c">Inquiries &amp; Intel</div>
          <h2 className="sec-title">Frequently Asked Questions</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Everything you need to know about the chronicle, release dates, and celestial lore.
          </p>
        </div>

        <div className="clario-faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.num}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggle(idx)}
              >
                <div className="faq-question-row">
                  <span className="faq-num">{faq.num}</span>
                  <h3 className="faq-question">{faq.q}</h3>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className="faq-answer-wrap">
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

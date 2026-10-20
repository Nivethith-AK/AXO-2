import React, { useState } from 'react';

const FAQS = [
  {
    num: '01',
    q: 'What is Memento Mori: A Reason to Live?',
    a: 'Memento Mori is an original web novel and musical experience created by artist and composer Δxolotl. It follows Adoniel Togami, a programmer trapped in isolation and grief, and Azrael, the Archangel of Death who arrives not to end his life, but to protect it.',
  },
  {
    num: '02',
    q: 'Where can I stream the music?',
    a: 'You can stream the official master track "Track Ω: To Eternity and After" directly on this website using the built-in player. The music is also distributed across major platforms including Spotify, Apple Music, and YouTube.',
  },
  {
    num: '03',
    q: 'When are new chapters released?',
    a: 'Volume I chapters are released on a bi-weekly schedule. Chapter α ("When We Met") and Chapter I ("A Death Wish") are available to read now. Upcoming chapters will be announced on this website and official channels.',
  },
  {
    num: '04',
    q: 'Is the novel free to read?',
    a: 'Yes, 100% free. There are no paywalls, subscriptions, or intrusive ads. You can open any chapter and read in the distraction-free manuscript viewer right in your browser.',
  },
  {
    num: '05',
    q: 'Can content creators use the music in streams and videos?',
    a: 'Yes, creators are welcome to use the soundtrack in non-commercial YouTube videos, art streams, and podcasts with proper credit to "Δxolotl — Memento Mori OST". For commercial licensing, please submit an inquiry below.',
  },
  {
    num: '06',
    q: 'How can I contact Δxolotl for business or collaborations?',
    a: 'Use the Contact form at the bottom of the page for music production, scoring inquiries, art collaborations, or press requests. We typically respond within 3–5 business days.',
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
          <div className="sec-label c">Help &amp; Answers</div>
          <h2 className="sec-title">Frequently Asked Questions</h2>
          <p className="sec-body" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Answers to common questions about the story, release schedule, and music streaming.
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

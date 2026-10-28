import React, { useState } from 'react';

const FAQS = [
  {
    num: '01',
    q: 'What is Memento Mori?',
    a: 'Memento Mori: A Reason to Live is an official original web-novel and master score written and produced by Δxolotl in partnership with Project Eden. It chronicles the quiet, existential bond between Adoniel Togami, an isolated programmer, and Azrael, the Archangel of Death who arrives not to take his life, but to guard it.',
  },
  {
    num: '02',
    q: 'Where can I read the chapters?',
    a: 'All chapters are available directly on this website for free. Click "Read Vol. I" or "Read Record" on any chapter in the Chronicle program to open the distraction-free reader overlay.',
  },
  {
    num: '03',
    q: 'Where can I listen to Δxolotl’s music?',
    a: 'You can stream directly on our built-in master player, or visit Δxolotl’s official channels on YouTube, Spotify, Apple Music, and SoundCloud. The official theme song "Death Wish" ft. near is streaming on YouTube.',
  },
  {
    num: '04',
    q: 'Can I create covers or stream with the soundtracks?',
    a: 'Yes! Δxolotl welcomes covers, fan art, animations, and non-commercial streaming with proper attribution. Instrumental versions and stems are provided on selected releases.',
  },
  {
    num: '05',
    q: 'When does the next chapter release?',
    a: 'Volume I releases in episodic drops. You can watch the live digital countdown in the hero section or sign up to our dispatch below to receive release notifications.',
  },
];

export default function SignalFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="sf-section" id="faq">
      <div className="sf-wrap">
        <span className="sf-pill">(FAQ)</span>
        <h2 className="sf-lineup-title" style={{ marginBottom: '16px' }}>
          Frequently Answered
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-mid)', maxWidth: '640px', marginBottom: '48px' }}>
          Everything readers and listeners ask us, answered directly.
        </p>

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
                  <span className="sf-faq-icon">+</span>
                </button>
                {isOpen && <div className="sf-faq-answer">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

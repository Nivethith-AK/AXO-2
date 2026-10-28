import React from 'react';

const PASSES = [
  {
    type: 'DAY PASS',
    sub: 'One day of your choice',
    price: '$89',
    per: 'per person',
    dates: 'ONE DAY · AUG 21–24',
    stamp: 'AVAILABLE',
    stampClass: 'sf-stamp-available',
    features: [
      'One festival day, your pick',
      'Main stage and Yard stage',
      'Re-entry all day',
    ],
    terms: 'Free name transfer until Aug 18 · refundable within 14 days.',
    cta: 'GET TICKETS',
    url: 'https://roman-koby.checkoutpage.com/signal-festival-26',
    tilt: '-4.5deg',
    delay: '0s',
  },
  {
    type: 'FULL FESTIVAL',
    sub: 'All four days',
    price: '$249',
    per: 'per person',
    dates: 'AUG 21–24',
    stamp: 'ALMOST GONE',
    stampClass: 'sf-stamp-warn',
    features: [
      'All four days, both stages',
      'Re-entry the whole week',
      'Locker rental at half price',
    ],
    terms: 'Free name transfer until Aug 18 · refundable within 14 days.',
    cta: 'GET TICKETS',
    url: 'https://roman-koby.checkoutpage.com/signal-festival-26',
    tilt: '4.5deg',
    delay: '0.15s',
  },
  {
    type: 'VIP PASS',
    sub: 'All days · own zone',
    price: '$459',
    per: 'per person',
    dates: 'AUG 21–24',
    stamp: 'SOLD OUT',
    stampClass: 'sf-stamp-sold',
    features: [
      'Everything in Full Festival',
      'VIP deck and bar at both stages',
      'Fast lane at every gate',
      'Own lockers and toilets',
    ],
    terms: 'Returned VIP passes go to the waitlist first, in order.',
    cta: 'SOLD OUT',
    disabled: true,
    tilt: '-4.5deg',
    delay: '0.30s',
  },
  {
    type: 'GROUP PASS',
    sub: 'Four people, one buy',
    price: '$796',
    per: '$199 each · 4 people',
    dates: 'AUG 21–24',
    stamp: 'AVAILABLE',
    stampClass: 'sf-stamp-available',
    features: [
      'Four Full Festival passes',
      'One shared locker, all week',
      'Group fast lane on arrival',
    ],
    terms: 'Set the names until Aug 18 · split or transfer any of the four.',
    cta: 'GET TICKETS',
    url: 'https://roman-koby.checkoutpage.com/signal-festival-26',
    tilt: '4.5deg',
    delay: '0.45s',
  },
];

export default function SignalTickets({ onOpenChapter }) {
  return (
    <section className="sf-section sf-pricing-section" id="tickets">
      <div className="sf-wrap">
        <div className="sf-pricing-head">
          <span className="sf-pill">(Tickets)</span>
          <h2 className="sf-lineup-title">Tear along the perforation</h2>
          <p className="sf-pricing-subtitle">
            A stage is a quarter of it. For four days the yard runs music, art, the street and everything cooking between them — one ticket covers the lot.
          </p>
        </div>

        <div className="sp-row">
          {PASSES.map((pass, idx) => (
            <div
              key={pass.type}
              className={`sp-pass sp-landed ${pass.disabled ? 'sp-dim' : ''}`}
              style={{ '--tilt': pass.tilt, '--dd': pass.delay }}
            >
              <div className="sp-rig">
                {/* Lanyard thread */}
                <svg className="sp-thread" viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M60 0 L60 48" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                </svg>

                {/* Safety Pin */}
                <svg className="sp-safety" width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true">
                  <path d="M2 7 C2 4 4 2 7 2 L27 2 C30 2 32 4 32 7 C32 10 30 12 27 12 L7 12 C4 12 2 10 2 7 Z" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="8" cy="7" r="2.5" fill="currentColor" />
                </svg>

                <div className="sp-card">
                  <div className="sp-cut">
                    <div className="sp-paper" />
                    <div className="sp-sheen" />

                    <div className="sp-content">
                      <div className="sp-strip" />

                      <div className="sp-band">
                        <span>{pass.type}</span>
                        <em>{pass.sub}</em>
                      </div>

                      <div className="sp-field">
                        <div className="sp-price">
                          <b>{pass.price}</b>
                          <s>{pass.per}</s>
                        </div>
                        <div className="sp-dates">{pass.dates}</div>

                        <div className={`sp-stamp ${pass.stampClass}`}>
                          {pass.stamp}
                        </div>
                      </div>

                      <div className="sp-body">
                        <ul className="sp-incl">
                          {pass.features.map((feat, fIdx) => (
                            <li key={fIdx}>
                              <i>▸</i>
                              {feat}
                            </li>
                          ))}
                        </ul>
                        <div className="sp-fees">Includes 9.5% CA sales tax · $6 booking fee per pass</div>
                      </div>

                      {/* Perforation line */}
                      <div className="sp-perf">
                        <div className="sp-notch-l" />
                        <div className="sp-notch-r" />
                        <i />
                      </div>

                      {/* Bottom Stub */}
                      <div className="sp-stub">
                        <svg className="sp-bars" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true">
                          <rect x="0" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="6" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="10" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="18" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="24" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="28" y="0" width="5" height="24" fill="currentColor" />
                          <rect x="36" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="42" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="48" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="52" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="60" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="66" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="72" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="76" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="84" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="90" y="0" width="5" height="24" fill="currentColor" />
                          <rect x="98" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="102" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="108" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="114" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="122" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="126" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="132" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="138" y="0" width="5" height="24" fill="currentColor" />
                          <rect x="146" y="0" width="1" height="24" fill="currentColor" />
                          <rect x="150" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="158" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="164" y="0" width="3" height="24" fill="currentColor" />
                          <rect x="170" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="176" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="184" y="0" width="2" height="24" fill="currentColor" />
                          <rect x="190" y="0" width="4" height="24" fill="currentColor" />
                          <rect x="197" y="0" width="3" height="24" fill="currentColor" />
                        </svg>

                        {pass.disabled ? (
                          <button className="sp-buy sp-buy-disabled" disabled>
                            {pass.cta}
                          </button>
                        ) : (
                          <a href={pass.url} target="_blank" rel="noopener noreferrer" className="sp-buy">
                            {pass.cta}
                          </a>
                        )}

                        <div className="sp-terms">{pass.terms}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';

export default function SignalAbout({ onOpenReader }) {
  return (
    <section className="sf-section sf-about-section" id="about">
      <div className="sf-wrap">
        <div className="sf-about-exact-grid">
          {/* Left Column: Photo Target */}
          <div className="sf-about-photo-col">
            <div className="sf-about-photo-wrapper">
              <img
                src="/images/assets/profile_image.webp"
                alt="Signal street culture & Adoniel"
                className="sf-about-img"
              />
            </div>
          </div>

          {/* Right Column: Statement & CTA */}
          <div className="sf-about-copy-col">
            <span className="sf-pill">(About)</span>

            <p className="sf-about-statement">
              Signal is a street culture forum in Los Angeles. We believe the street writes culture first. Everything else is a remix. Four days of riders, writers, musicians and makers on one site.
            </p>

            <div className="sf-about-action">
              <a href="#tickets" className="sf-btn sf-btn-red sf-btn-pill">
                GET TICKETS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

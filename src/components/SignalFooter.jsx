import React from 'react';

export default function SignalFooter({ onOpenChapter }) {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="sf-footer">
      <div className="sf-wrap">
        <div className="sf-footer-top-grid">
          {/* Brand & Socials */}
          <div className="sf-footer-brand-col">
            <h2 className="sf-footer-logo">SIGNAL®</h2>
            <p className="sf-footer-desc">
              Four days of music, art and the street. North Yard, Los Angeles · 21–24 Aug 2026.
            </p>
            <div className="sf-footer-socials">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="sf-social-link">
                INSTAGRAM
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noreferrer" className="sf-social-link">
                TIKTOK
              </a>
              <a href="https://youtube.com/@theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-social-link">
                YOUTUBE
              </a>
              <a href="https://discord.gg/QRRa4mxaAm" target="_blank" rel="noreferrer" className="sf-social-link">
                DISCORD
              </a>
            </div>
          </div>

          {/* 3 Nav Columns */}
          <div className="sf-footer-col">
            <span className="sf-footer-col-title">EXPLORE</span>
            <ul className="sf-footer-links">
              <li>
                <a href="#lineup" className="sf-footer-link" onClick={scrollTo('lineup')}>
                  Lineup
                </a>
              </li>
              <li>
                <a href="#program" className="sf-footer-link" onClick={scrollTo('program')}>
                  Program
                </a>
              </li>
              <li>
                <a href="#tickets" className="sf-footer-link" onClick={scrollTo('tickets')}>
                  Tickets
                </a>
              </li>
              <li>
                <a href="#discography" className="sf-footer-link" onClick={scrollTo('discography')}>
                  Discography
                </a>
              </li>
            </ul>
          </div>

          <div className="sf-footer-col">
            <span className="sf-footer-col-title">VISIT</span>
            <ul className="sf-footer-links">
              <li>
                <a href="#faq" className="sf-footer-link" onClick={scrollTo('faq')}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#visit" className="sf-footer-link" onClick={scrollTo('visit')}>
                  Plan your visit
                </a>
              </li>
              <li>
                <a href="#map" className="sf-footer-link" onClick={scrollTo('map')}>
                  Festival map
                </a>
              </li>
            </ul>
          </div>

          <div className="sf-footer-col">
            <span className="sf-footer-col-title">CONNECT</span>
            <ul className="sf-footer-links">
              <li>
                <a href="https://twitter.com/theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a href="https://discord.gg/QRRa4mxaAm" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Discord Server ↗
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  YouTube Channel ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant full-width brand wordmark */}
        <div className="sf-footer-huge-brand">
          SIGNAL®
        </div>

        {/* Bottom bar */}
        <div className="sf-footer-bottom">
          <span>© 2026 Signal Festival · Made in Los Angeles</span>
          <span>Tickets are non-transferable after 18 Aug</span>
        </div>
      </div>
    </footer>
  );
}

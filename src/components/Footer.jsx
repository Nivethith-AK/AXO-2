import React from 'react';

export default function Footer({ onReadChapter }) {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadAlpha = (e) => {
    e.preventDefault();
    if (onReadChapter) onReadChapter('0');
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="clario-footer">
      <div className="footer-inner">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a className="footer-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              Memento Mori
            </a>
            <p className="footer-tagline">
              Official website of the web novel by Δxolotl. A chronicle of celestial grief, quiet devotion, and the breathless space between.
            </p>
            <div className="footer-credit">
              Created by <span className="highlight">Δxolotl</span> // In collaboration with <span className="highlight">Project Eden</span>
            </div>
          </div>

          {/* Column 1: Chronicle */}
          <div className="footer-col">
            <h4 className="footer-col-title">Chronicle</h4>
            <ul className="footer-links">
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')}>
                  The Series
                </a>
              </li>
              <li>
                <a href="#journey" onClick={(e) => scrollTo(e, 'journey')}>
                  How It Unfolds
                </a>
              </li>
              <li>
                <a href="#archive" onClick={(e) => scrollTo(e, 'archive')}>
                  The Archive
                </a>
              </li>
              <li>
                <a href="#read-alpha" onClick={handleReadAlpha}>
                  Read Chapter α
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Media & Lore */}
          <div className="footer-col">
            <h4 className="footer-col-title">Media &amp; Lore</h4>
            <ul className="footer-links">
              <li>
                <a href="#soundtracks" onClick={(e) => scrollTo(e, 'soundtracks')}>
                  Soundtracks
                </a>
              </li>
              <li>
                <a href="#lore" onClick={(e) => scrollTo(e, 'lore')}>
                  The Paradox
                </a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => scrollTo(e, 'shop')}>
                  Archive Editions
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollTo(e, 'faq')}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Transmission */}
          <div className="footer-col">
            <h4 className="footer-col-title">Transmission</h4>
            <ul className="footer-links">
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')}>
                  Contact Terminal
                </a>
              </li>
              <li>
                <a href="https://theaxolotlmusic.com/" target="_blank" rel="noopener noreferrer">
                  theaxolotlmusic.com ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/Nivethith-AK/AXO-2" target="_blank" rel="noopener noreferrer">
                  GitHub Relay ↗
                </a>
              </li>
              <li>
                <a href="#hero" onClick={scrollToTop}>
                  Back to Top ↑
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © 2026 THEAXOLOTLMUSIC // ALL RIGHTS RESERVED
          </div>
          <div className="footer-build">
            BUILT BY ΔXOLOTL &nbsp;//&nbsp; LAST_UPDATED: 2026.10.20
          </div>
        </div>
      </div>
    </footer>
  );
}

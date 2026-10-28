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
        <div className="sf-footer-top">
          <div className="sf-footer-about">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--fg)', textTransform: 'uppercase' }}>
              Memento Mori®
            </span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--fg-mid)', lineHeight: 1.6 }}>
              A web-novel and original master soundtrack chronicle by Δxolotl in collaboration with Project Eden.
            </p>
          </div>

          <div>
            <div className="sf-footer-col-title">Chronicle</div>
            <ul className="sf-footer-links">
              <li>
                <a
                  href="#chapter-0"
                  className="sf-footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenChapter) onOpenChapter('0');
                  }}
                >
                  Chapter α — When We Met
                </a>
              </li>
              <li>
                <a
                  href="#chapter-1"
                  className="sf-footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenChapter) onOpenChapter('1');
                  }}
                >
                  Chapter I — A Death Wish
                </a>
              </li>
              <li>
                <a href="#program" className="sf-footer-link" onClick={scrollTo('program')}>
                  Program Timeline
                </a>
              </li>
              <li>
                <a href="#passes" className="sf-footer-link" onClick={scrollTo('passes')}>
                  Archive Passes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="sf-footer-col-title">Discography</div>
            <ul className="sf-footer-links">
              <li>
                <a href="#discography" className="sf-footer-link" onClick={scrollTo('discography')}>
                  21 Indexed Releases
                </a>
              </li>
              <li>
                <a href="#soundtrack" className="sf-footer-link" onClick={scrollTo('soundtrack')}>
                  To Eternity and After
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=qR_bDjRskpg" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Death Wish (YouTube) ↗
                </a>
              </li>
              <li>
                <a href="https://soundcloud.com/theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  SoundCloud Archive ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="sf-footer-col-title">Connect</div>
            <ul className="sf-footer-links">
              <li>
                <a href="https://twitter.com/theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  YouTube Channel ↗
                </a>
              </li>
              <li>
                <a href="https://instagram.com/theaxolotlmusic" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="https://discord.gg/QRRa4mxaAm" target="_blank" rel="noreferrer" className="sf-footer-link">
                  Discord Server ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Anton Wordmark */}
        <div className="sf-footer-huge-brand">
          Memento Mori®
        </div>

        <div className="sf-footer-bottom">
          <span>© 2026 Memento Mori · Web Novel &amp; Music by Δxolotl</span>
          <span>Project Eden Collaboration · Tokyo / Celestial Expanse</span>
        </div>
      </div>
    </footer>
  );
}

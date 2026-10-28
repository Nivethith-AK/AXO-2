import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SignalNav({ onOpenChapter }) {
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sf-nav-fixed">
      <div className="sf-wrap sf-nav-inner">
        <a href="#hero" className="sf-nav-brand" onClick={scrollTo('hero')}>
          <span className="sf-brand-badge" />
          Memento Mori®
        </a>

        <nav className="sf-nav-links">
          <a href="#lineup" className="sf-nav-link" onClick={scrollTo('lineup')}>
            Cast <span className="sf-nav-link-sub">2 names</span>
          </a>
          <a href="#program" className="sf-nav-link" onClick={scrollTo('program')}>
            Chronicle <span className="sf-nav-link-sub">4 chapters</span>
          </a>
          <a href="#discography" className="sf-nav-link" onClick={scrollTo('discography')}>
            Discography <span className="sf-nav-link-sub">21 tracks</span>
          </a>
          <a href="#soundtrack" className="sf-nav-link" onClick={scrollTo('soundtrack')}>
            Soundtrack <span className="sf-nav-link-sub">Master</span>
          </a>
          <a href="#faq" className="sf-nav-link" onClick={scrollTo('faq')}>
            FAQ <span className="sf-nav-link-sub">Help</span>
          </a>
        </nav>

        <div className="sf-nav-actions">
          <button
            className="sf-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a
            href="#program"
            className="sf-ticket-btn"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenChapter) onOpenChapter('0');
            }}
          >
            Read Vol. I
          </a>
        </div>
      </div>
    </header>
  );
}

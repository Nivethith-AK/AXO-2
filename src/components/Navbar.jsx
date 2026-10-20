import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';

const SECTIONS = ['about', 'archive', 'soundtracks', 'shop', 'contact'];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSec, setActiveSec] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 44);

      let current = '';
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          current = id;
        }
      });
      setActiveSec(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle outside click to close mobile menu
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [menuOpen]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`mm-nav ${isScrolled ? 'scrolled' : ''}`}
      id="mm-nav"
      style={{ zIndex: 9000, position: 'fixed' }}
    >
      <a
        className="nav-mark"
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      >
        Memento Mori
      </a>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
        {SECTIONS.map((sec) => (
          <a
            key={sec}
            href={`#${sec}`}
            className={`nav-link ${activeSec === sec ? 'active' : ''}`}
            onClick={(e) => scrollToSection(e, sec)}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </a>
        ))}
        <Link to="/clario" className="nav-link" style={{ color: 'var(--gold-bright)' }}>
          Clario View ↗
        </Link>
      </div>

      <button
        id="theme-toggle"
        aria-label="Toggle theme"
        title="Toggle Light / Dark mode"
        onClick={toggleTheme}
      >
        <svg
          className="theme-icon sun-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <svg
          className="theme-icon moon-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <button
        id="music-toggle"
        className={isMuted ? 'muted' : ''}
        aria-label="Toggle music"
        onClick={toggleMute}
      >
        <span className="music-icon-wrap">
          <img src="/assets/images/music_icon.png" alt="" aria-hidden="true" />
          <svg className="music-mute-line" viewBox="0 0 19 19">
            <line x1="2" y1="17" x2="17" y2="2" />
          </svg>
        </span>
      </button>

      <button
        className={`nav-tog ${menuOpen ? 'open' : ''}`}
        id="nav-tog"
        aria-label="Menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

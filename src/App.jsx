import React, { useState, useEffect, useRef } from 'react';
import CatLayer from './components/CatLayer';
import ReaderOverlay from './components/ReaderOverlay';
import '../src/styles/reader.css';

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  // Global anchor click listener for smooth scroll and chapter reader opening
  useEffect(() => {
    const handleClick = (e) => {
      // 1. Check if user clicked a reader trigger
      const readerTrigger = e.target.closest('[data-open-reader], a[href="#reader"], a[href="#read"], [data-framer-name="Read Manifesto"]');
      if (readerTrigger) {
        e.preventDefault();
        const chId = readerTrigger.getAttribute('data-open-reader') || '0';
        setActiveChapterId(chId);
        return;
      }

      // 2. Check for in-page hash anchor link
      const anchor = e.target.closest('a[href*="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;
        const hashIdx = href.indexOf('#');
        if (hashIdx === -1) return;
        const hash = href.substring(hashIdx);
        if (!hash || hash === '#') return;

        // If target exists in page, smoothly scroll to it with offset
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          e.preventDefault();
          const navOffset = 75;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });

          // Update URL hash without jumping
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, hash);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const toggleMasterAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden Master Audio Element */}
      <audio
        ref={audioRef}
        src="/assets/media/audio/To_Eternity_and_After.m4a"
        preload="metadata"
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* Floating Audio Player Bar */}
      <aside
        id="master-audio-pill"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(17, 17, 16, 0.12)',
          borderRadius: '40px',
          padding: '8px 18px 8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onClick={toggleMasterAudio}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
        role="button"
        tabIndex={0}
        aria-label="Toggle master soundtrack playback"
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isPlayingAudio ? '#fa0b29' : '#111110',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            transition: 'background 0.2s ease',
          }}
        >
          {isPlayingAudio ? '❚❚' : '▶'}
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#111110', letterSpacing: '0.04em' }}>
            To Eternity and After
          </div>
          <div style={{ fontSize: '9px', color: '#777', fontFamily: "'Fragment Mono', monospace" }}>
            {isPlayingAudio ? 'PLAYING MASTER OST · ΔXOLOTL' : 'CLICK TO LISTEN OST'}
          </div>
        </div>
      </aside>

      {/* Novel Chapter Reader Overlay */}
      <ReaderOverlay
        chapterId={activeChapterId}
        onClose={() => setActiveChapterId(null)}
        onSelectChapter={(id) => setActiveChapterId(id)}
      />

      {/* Global Oneko Tuxedo Cat */}
      <CatLayer />
    </>
  );
}

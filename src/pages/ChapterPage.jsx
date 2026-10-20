import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ALL_CHAPTERS } from '../data/chapters';
import { useTheme } from '../context/ThemeContext';
import CelestialCanvas from '../components/CelestialCanvas';

export default function ChapterPage() {
  const [searchParams] = useSearchParams();
  const chId = searchParams.get('id') || '0';
  const { toggleTheme } = useTheme();

  const chapter = ALL_CHAPTERS.find((c) => c.id === chId);
  const totalPages = chapter && chapter.pages ? chapter.pages : 1;

  const [page, setPage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setPage(1);
    setImgError(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chId]);

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setIsFading(true);
    setTimeout(() => {
      setPage(p);
      setImgError(false);
      setIsFading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(page + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(page - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [page, totalPages]);

  if (!chapter || chapter.locked) {
    return (
      <>
        <CelestialCanvas geomReady={true} />
        <header className="ch-topbar">
          <Link to="/" className="ch-back">
            ← Archive
          </Link>
          <span className="ch-bar-title">Memento Mori</span>
        </header>
        <main className="ch-stage">
          <div style={{ textAlign: 'center', padding: '100px clamp(16px,5vw,60px)' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--fg-mid)',
                marginBottom: '1.6rem',
              }}
            >
              This record is encrypted or does not exist.
            </p>
            <Link to="/" className="ch-nav-btn" style={{ display: 'inline-block' }}>
              ← Return to Archive
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <CelestialCanvas geomReady={true} />

      <header className="ch-topbar">
        <Link to="/" className="ch-back">
          ← Archive
        </Link>
        <span className="ch-bar-title">{chapter.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span className="ch-page-counter">
            {page} / {totalPages}
          </span>
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
        </div>
      </header>

      <main className="ch-stage">
        <header className="ch-heading">
          <span
            className="ch-meta"
            dangerouslySetInnerHTML={{ __html: chapter.tag }}
          />
          <h1 className="ch-title">{chapter.title}</h1>
          <span className="ch-date">{chapter.date}</span>
          <div className="ch-divider" />
        </header>

        <section className="ch-viewer" id="ch-viewer">
          {page > 1 && (
            <div className="ch-arrow prev" onClick={() => goTo(page - 1)}>
              <span className="ch-arrow-chip">← Prev</span>
            </div>
          )}

          {!imgError ? (
            <img
              key={`${chapter.id}-${page}`}
              className={`ch-page-img ${isFading ? 'fade' : ''}`}
              src={`/assets/chapters/${chapter.id}/${chapter.id}-${page}.png`}
              alt={`${chapter.title} - Page ${page}`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="ch-fallback">Page image not yet uploaded</div>
          )}

          {page < totalPages && (
            <div className="ch-arrow next" onClick={() => goTo(page + 1)}>
              <span className="ch-arrow-chip">Next →</span>
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <div className="ch-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`ch-dot ${i + 1 === page ? 'active' : ''}`}
                onClick={() => goTo(i + 1)}
              />
            ))}
          </div>
        )}

        <nav className="ch-bottom-nav">
          <button
            className="ch-nav-btn"
            disabled={page <= 1}
            onClick={() => goTo(page - 1)}
          >
            ← Previous Page
          </button>
          <button
            className="ch-nav-btn"
            disabled={page >= totalPages}
            onClick={() => goTo(page + 1)}
          >
            Next Page →
          </button>
        </nav>
      </main>
    </>
  );
}

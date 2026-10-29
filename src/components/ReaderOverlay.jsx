import React, { useEffect } from 'react';
import { ALL_CHAPTERS } from '../data/chapters';

export default function ReaderOverlay({ chapterId, onClose, onSelectChapter }) {
  const unlockedChapters = ALL_CHAPTERS.filter((c) => !c.locked);
  const currentIdx = chapterId ? unlockedChapters.findIndex((c) => c.id === chapterId) : -1;
  const chapter = currentIdx >= 0 ? unlockedChapters[currentIdx] : null;

  const prevChapter = currentIdx > 0 ? unlockedChapters[currentIdx - 1] : null;
  const nextChapter =
    currentIdx >= 0 && currentIdx < unlockedChapters.length - 1
      ? unlockedChapters[currentIdx + 1]
      : null;

  useEffect(() => {
    if (!chapterId) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevChapter) onSelectChapter(prevChapter.id);
      if (e.key === 'ArrowRight' && nextChapter) onSelectChapter(nextChapter.id);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [chapterId, prevChapter, nextChapter, onClose, onSelectChapter]);

  if (!chapterId || !chapter) return null;

  return (
    <div id="reader-overlay" className="open" data-lenis-prevent="true">
      <button className="reader-close" onClick={onClose} aria-label="Close reader">
        ✕ &nbsp;Close
      </button>

      <div className="reader-inner">
        <header className="reader-header">
          <span
            className="r-meta"
            id="r-meta"
            dangerouslySetInnerHTML={{ __html: chapter.tag }}
          />
          <h2 className="r-title" id="r-title">
            {chapter.title}
          </h2>
          <span className="r-date" id="r-date">
            {chapter.date}
          </span>
        </header>

        <div
          className="reader-body"
          id="r-body"
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />

        <nav className="reader-nav">
          <button
            className="rnav-btn prev"
            id="r-prev"
            disabled={!prevChapter}
            style={{ opacity: prevChapter ? 1 : 0.4, cursor: prevChapter ? 'pointer' : 'default' }}
            onClick={() => prevChapter && onSelectChapter(prevChapter.id)}
          >
            <span className="dir">← Previous</span>
            <span className="rtitle" id="r-prev-title">
              {prevChapter ? prevChapter.title : '—'}
            </span>
          </button>

          <button
            className="rnav-btn next"
            id="r-next"
            disabled={!nextChapter}
            style={{ opacity: nextChapter ? 1 : 0.4, cursor: nextChapter ? 'pointer' : 'default' }}
            onClick={() => nextChapter && onSelectChapter(nextChapter.id)}
          >
            <span className="dir">Next →</span>
            <span className="rtitle" id="r-next-title">
              {nextChapter ? nextChapter.title : '—'}
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}

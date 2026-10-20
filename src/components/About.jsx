import React from 'react';

const STORY_STATS = [
  {
    num: '02',
    label: 'Chapters Released',
    sub: (
      <>
        Chapter <span className="glyph-preserve">α</span> &amp; Chapter I
      </>
    ),
  },
  {
    num: '01',
    label: 'Master Soundtrack',
    sub: 'To Eternity and After',
  },
  {
    num: 'Vol. I',
    label: 'Current Volume',
    sub: 'The Awakening',
  },
  {
    num: '100%',
    label: 'Free Reading',
    sub: 'No Login or Paywall Required',
  },
];

export default function About({ onReadChapter }) {
  const handleReadAlpha = (e) => {
    e.preventDefault();
    if (onReadChapter) onReadChapter('0');
  };

  return (
    <section className="sec" id="about">
      <div className="sec-inner">
        <div className="grid-2-fixed">
          <div>
            <div className="fi vis">
              <div className="sec-label">The Story</div>
            </div>
            <div className="fi vis d1">
              <h2 className="sec-title">
                Memento Mori:
                <br />
                A Reason to Live
              </h2>
            </div>
            <div className="fi vis d2" style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                [ SYNOPSIS ]
              </span>
            </div>
            <div className="fi vis d2">
              <p className="sec-body" style={{ fontStyle: 'italic' }}>
                The story follows{' '}
                <span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>
                  Adoniel Togami
                </span>
                , a reclusive programmer struggling with existential despair, and{' '}
                <span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>
                  Azrael
                </span>
                , the{' '}
                <span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>
                  "Archangel of Death"
                </span>
                , who appears on his balcony not to take his life, but to ensure he keeps it.
                <br />
                Yet beneath their quiet encounters lies a deeper mystery waiting to unfold...
              </p>
            </div>
            <div className="fi vis d3" style={{ marginTop: '24px' }}>
              <button className="btn" onClick={handleReadAlpha}>
                <span>Read Chapter α</span>
              </button>
            </div>
          </div>

          <div className="fi vis d2">
            <div className="video-label">The Visuals &amp; Trailer</div>
            <div className="video-wrap">
              <video id="series-video" autoPlay muted loop playsInline />
              <div className="video-placeholder" id="video-ph">
                <span className="vp-bracket">[ Official Trailer ]</span>
                <span className="vp-sub">Original Score by Δxolotl</span>
              </div>
            </div>
            <div className="video-credit">
              Visuals by <a href="https://theaxolotlmusic.com/" target="_blank" rel="noopener noreferrer">Project Eden</a> &nbsp;//&nbsp; Music by Δxolotl
            </div>
          </div>
        </div>

        {/* Clean Story & Music Stats Grid */}
        <div className="telemetry-grid fi vis d3" style={{ marginTop: '48px' }}>
          {STORY_STATS.map((t, idx) => (
            <div key={idx} className="telemetry-card">
              <div className="tc-corner tl" />
              <div className="tc-corner tr" />
              <div className="tc-corner bl" />
              <div className="tc-corner br" />
              <div className="tc-num">{t.num}</div>
              <div className="tc-label">{t.label}</div>
              <div className="tc-sub">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

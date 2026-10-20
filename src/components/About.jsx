import React from 'react';

const TELEMETRY_DATA = [
  {
    num: '02',
    label: 'Records Archived',
    sub: (
      <>
        Chapter <span className="glyph-preserve">α</span> &amp; I Live
      </>
    ),
  },
  {
    num: '01',
    label: 'Master Soundtrack',
    sub: 'To Eternity and After',
  },
  {
    num: '100%',
    label: 'Timeline Recursion',
    sub: 'Adoniel × Azrael Paradox',
  },
  {
    num: 'VOL. I',
    label: 'Celestial Chronicle',
    sub: 'Project Eden Relay',
  },
];

export default function About() {
  const scrollToArchive = (e) => {
    e.preventDefault();
    const el = document.getElementById('archive');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec" id="about">
      <div className="sec-inner">
        <div className="grid-2-fixed">
          <div>
            <div className="fi vis">
              <div className="sec-label">The Series</div>
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
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  opacity: 1,
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
                , who appears not to take his life but to ensure he keeps it.
                <br />
                However, something far more sinister lies beneath the surface...
              </p>
            </div>
            <div className="fi vis d3">
              <a href="#archive" className="btn" onClick={scrollToArchive}>
                <span>Access Archives</span>
              </a>
            </div>
          </div>

          <div className="fi vis d2">
            <div className="video-label">The Visuals</div>
            <div className="video-wrap">
              <video id="series-video" autoPlay muted loop playsInline />
              <div className="video-placeholder" id="video-ph">
                <span className="vp-bracket">[ To Be Added ]</span>
                <span className="vp-sub">Video or YouTube Embed</span>
              </div>
            </div>
            <div className="video-credit">
              Visuals by <a href="#">Project Eden</a>
            </div>
          </div>
        </div>

        {/* Chronicle Telemetry Stat Grid */}
        <div className="telemetry-grid fi vis d3">
          {TELEMETRY_DATA.map((t, idx) => (
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

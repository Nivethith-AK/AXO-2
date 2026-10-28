import React, { useState, useRef, useEffect } from 'react';

export default function SignalPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="sf-section" id="soundtrack">
      <div className="sf-wrap">
        <span className="sf-pill">(Master Soundtrack)</span>
        <h2 className="sf-lineup-title" style={{ marginBottom: '16px' }}>
          Original Orchestral Score
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-mid)', maxWidth: '640px', marginBottom: '40px' }}>
          Composed and produced by Δxolotl to accompany the reading of Memento Mori. Listen to the celestial themes while reading.
        </p>

        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: 'clamp(24px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '32px',
          alignItems: 'center',
        }}>
          <button
            onClick={togglePlay}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              cursor: 'pointer',
              border: 'none',
              flexShrink: 0,
              transition: 'transform 0.2s',
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--fg)', textTransform: 'uppercase' }}>
                  To Eternity and After
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg-muted)', marginLeft: '12px' }}>
                  // OFFICIAL MASTER OST
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>
                {formatTime(currentTime)} / {formatTime(duration || 180)}
              </div>
            </div>

            {/* Scrub bar */}
            <input
              type="range"
              min="0"
              max={duration || 180}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                accentColor: 'var(--accent)',
                cursor: 'pointer',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)' }}>
              <span>Composer: Δxolotl</span>
              <a
                href="https://www.youtube.com/watch?v=qR_bDjRskpg"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--fg)', textDecoration: 'underline' }}
              >
                Listen to "Death Wish" on YouTube ↗
              </a>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src="/assets/media/audio/To_Eternity_and_After.m4a"
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </section>
  );
}

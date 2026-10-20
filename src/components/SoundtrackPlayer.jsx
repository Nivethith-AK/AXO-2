import React, { useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const fmtTime = (s) => {
  const sec = Math.floor(s || 0);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
};

export default function SoundtrackPlayer() {
  const {
    tracks,
    currentIdx,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    togglePlay,
    selectTrack,
    prevTrack,
    nextTrack,
    toggleShuffle,
    setVolume,
    seek,
  } = useAudio();

  const progressWrapRef = useRef(null);

  const handleSeek = (e) => {
    if (!progressWrapRef.current || !duration) return;
    const rect = progressWrapRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(pct * duration);
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="sec" id="soundtracks">
      <div className="sec-inner">
        <div className="fi vis cl-reveal" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div className="sec-label c">Transmission</div>
          <h2 className="sec-title">Soundtracks</h2>
          <p className="sec-body" style={{ margin: '0 auto 0' }}>
            Original scores from the celestial archive.
          </p>
        </div>

        <div className="player-shell fi vis cl-interactive-card cl-reveal d1">
          {/* Top: orrery | track info + controls */}
          <div className="player-top">
            {/* Orrery */}
            <div
              className="player-orrery-col"
              onClick={togglePlay}
              title="Play / Pause"
            >
              <svg
                id="orrery-svg"
                className="orrery-spin"
                width="160"
                height="160"
                viewBox="0 0 280 280"
                style={{
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                <circle
                  cx="140"
                  cy="140"
                  r="136"
                  fill="none"
                  stroke="rgba(201,168,76,1)"
                  strokeWidth="0.65"
                  strokeDasharray="2 13"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="97"
                  fill="none"
                  stroke="rgba(201,168,76,1)"
                  strokeWidth="0.65"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="58"
                  fill="none"
                  stroke="rgba(201,168,76,1)"
                  strokeWidth="0.65"
                  strokeDasharray="1 7"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="20"
                  fill="none"
                  stroke="rgba(201,168,76,1)"
                  strokeWidth="0.65"
                />
                <circle cx="140" cy="4" r="4.2" fill="rgba(201,168,76,1)" />
                <circle cx="43" cy="140" r="2.4" fill="rgba(201,168,76,1)" />
                <circle cx="237" cy="140" r="1.8" fill="rgba(201,168,76,1)" />
              </svg>
              <span className="player-state-label" id="orrery-state">
                {isPlaying ? '[ Playing ]' : '[ Paused ]'}
              </span>
            </div>

            {/* Controls */}
            <div className="player-controls-col">
              <div>
                <div className="now-playing-header">
                  <div className="player-now-label">Now Playing</div>
                  <div
                    className={`audio-equalizer ${isPlaying ? 'playing' : ''}`}
                    id="audio-eq"
                    title="Audio Stream Frequency"
                  >
                    <span className="eq-bar bar-1" />
                    <span className="eq-bar bar-2" />
                    <span className="eq-bar bar-3" />
                    <span className="eq-bar bar-4" />
                    <span className="eq-bar bar-5" />
                  </div>
                </div>
                <div id="track-title">{currentTrack.title}</div>
              </div>

              {/* Progress bar */}
              <div>
                <div
                  className="player-progress-wrap"
                  id="player-progress-wrap"
                  ref={progressWrapRef}
                  onClick={handleSeek}
                >
                  <div id="player-progress" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="player-time-row">
                  <span className="player-time" id="player-cur">
                    {fmtTime(currentTime)}
                  </span>
                  <span className="player-time" id="player-dur">
                    {fmtTime(duration)}
                  </span>
                </div>
              </div>

              {/* Playback buttons */}
              <div className="player-btn-row">
                {/* Prev */}
                <button
                  className="p-btn"
                  onClick={prevTrack}
                  title="Previous"
                  aria-label="Previous Track"
                >
                  <svg className="p-btn-icon" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  className="p-btn p-btn-play"
                  id="player-playbtn"
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg id="play-icon" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg id="play-icon" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Next */}
                <button
                  className="p-btn"
                  onClick={nextTrack}
                  title="Next"
                  aria-label="Next Track"
                >
                  <svg className="p-btn-icon" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
                  </svg>
                </button>

                {/* Shuffle */}
                <button
                  className={`p-btn p-btn-shuffle ${shuffle ? 'active' : ''}`}
                  id="player-shufflebtn"
                  onClick={toggleShuffle}
                  title="Shuffle"
                  aria-label="Toggle Shuffle"
                >
                  <svg
                    className="p-btn-icon"
                    viewBox="0 0 24 24"
                    style={{ width: '15px', height: '15px' }}
                  >
                    <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                  </svg>
                </button>

                {/* Volume slider */}
                <div className="player-vol-row" style={{ marginLeft: 'auto' }}>
                  <svg
                    className="p-btn-icon vol-icon"
                    viewBox="0 0 24 24"
                    style={{ width: '14px', height: '14px', flexShrink: 0 }}
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  </svg>
                  <input
                    type="range"
                    className="vol-slider"
                    id="vol-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    aria-label="Volume Slider"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="player-tracklist" id="track-list">
            {tracks.map((t, idx) => (
              <div
                key={t.id || idx}
                className={`tl-row ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => selectTrack(idx)}
              >
                <span className="tl-num">{String(idx + 1).padStart(2, '0')}</span>
                <span className="tl-name">{t.title}</span>
                <span className="tl-indicator">
                  {isPlaying && idx === currentIdx ? '▶' : '◈'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

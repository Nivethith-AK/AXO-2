import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAudio } from '../context/AudioContext';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΔΨΩΞΛΘΦΣΠαβγδ∞◈✦⬡';
const CIPHER_MSGS = [
  'INITIALIZING CELESTIAL RELAY ',
  'DECRYPTING ARCHIVE RECORDS   ',
  'ALIGNING ORBITAL PARAMETERS  ',
  'ACCESSING SACRED GEOMETRY    ',
];
const TITLE_RAW = 'MEMENTO MORI';
const TITLE_DONE = 'Memento Mori';
const DURATION = 1800;
const SESSION_KEY = 'memento_mori_loaded';

export default function LoadingScreen({ onDismiss }) {
  const { autostart } = useAudio();
  const [cipherText, setCipherText] = useState('');
  const [titleText, setTitleText] = useState(TITLE_DONE);
  const [subVisible, setSubVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  const autostartRef = useRef(autostart);
  autostartRef.current = autostart;

  const dismissedRef = useRef(false);
  const animIdsRef = useRef([]);
  const timersRef = useRef([]);
  const exitTimerRef = useRef(null);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch (e) {}

    // Unlock interactions immediately
    if (onDismissRef.current) onDismissRef.current();
    try {
      autostartRef.current();
    } catch (e) {}

    setIsExiting(true);

    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      setIsHidden(true);
    }, 520);
  }, []);

  useEffect(() => {
    if (isHidden) {
      if (onDismissRef.current) onDismissRef.current();
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const tStart = performance.now();
    let titlePhase = 0;
    let decIdx = 0;
    let msgIdx = 0;
    let charIdx = 0;
    let cfr = 0;
    let cipherRunning = true;

    const scrambleMsg = (str) =>
      str
        .split('')
        .map((c, i) => (c === ' ' ? ' ' : i < charIdx ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join('');

    const runCipher = () => {
      if (!cipherRunning || dismissedRef.current) return;
      const t = CIPHER_MSGS[msgIdx % CIPHER_MSGS.length];
      cfr++;
      if (cfr % 3 === 0) charIdx++;
      if (charIdx > t.length + 4) {
        charIdx = 0;
        msgIdx++;
        if (msgIdx >= CIPHER_MSGS.length) cipherRunning = false;
      }
      setCipherText(scrambleMsg(t));
      if (cipherRunning && !dismissedRef.current) {
        const id = requestAnimationFrame(runCipher);
        animIdsRef.current.push(id);
      }
    };

    const scrambleTitle = () => {
      if (titlePhase !== 1 || dismissedRef.current) return;
      setTitleText(
        TITLE_RAW.split('')
          .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      const timer = setTimeout(() => {
        if (!dismissedRef.current) {
          const id = requestAnimationFrame(scrambleTitle);
          animIdsRef.current.push(id);
        }
      }, 45);
      timersRef.current.push(timer);
    };

    const decryptTitle = () => {
      if (dismissedRef.current) return;
      setTitleText(
        TITLE_RAW.split('')
          .map((c, i) => (c === ' ' ? ' ' : i < decIdx ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      decIdx += 0.55;
      if (decIdx < TITLE_RAW.length) {
        const id = requestAnimationFrame(decryptTitle);
        animIdsRef.current.push(id);
      } else {
        setTitleText(TITLE_DONE);
      }
    };

    const fillBar = (now) => {
      if (dismissedRef.current) return;
      const p = Math.min(1, (now - tStart) / DURATION);
      setProgress(p * 100);

      if (p >= 0.15 && titlePhase === 0) {
        titlePhase = 1;
        scrambleTitle();
      }
      if (p >= 0.5 && titlePhase === 1) {
        titlePhase = 2;
        decryptTitle();
      }
      if (p >= 0.7) {
        setSubVisible(true);
      }
      if (p < 1) {
        const id = requestAnimationFrame(fillBar);
        animIdsRef.current.push(id);
        return;
      }

      const endTimer = setTimeout(dismiss, 160);
      timersRef.current.push(endTimer);
    };

    const startTimer = setTimeout(() => {
      runCipher();
      const id = requestAnimationFrame(fillBar);
      animIdsRef.current.push(id);
    }, 120);
    timersRef.current.push(startTimer);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cipherRunning = false;
      timersRef.current.forEach(clearTimeout);
      animIdsRef.current.forEach(cancelAnimationFrame);
    };
  }, [dismiss, isHidden]);

  if (isHidden) return null;

  return (
    <div
      id="ls-overlay"
      className={isExiting ? 'exit' : ''}
      onClick={dismiss}
      role="button"
      tabIndex={0}
      title="Click or press ESC to enter"
    >
      <span className="ls-presents">&#916;xolotl Presents</span>
      <h1 className="ls-title" id="ls-title">
        {titleText}
      </h1>
      <div className="ls-cipher" id="ls-cipher">
        {cipherText || '\u00A0'}
      </div>
      <div className="ls-bar-wrap">
        <div className="ls-bar" id="ls-bar" style={{ width: `${progress}%` }} />
      </div>
      <span className={`ls-sub ${subVisible ? 'show' : ''}`} id="ls-sub">
        Accessing Archives
      </span>

      <button
        type="button"
        className="ls-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
      >
        Skip &rarr;
      </button>
    </div>
  );
}

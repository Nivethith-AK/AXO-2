import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAudio } from '../context/AudioContext';
import { useLenis } from './SmoothScroll';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΔΨΩΞΛΘΦΣΠαβγδ∞◈⬡';
const CIPHER_MSGS = [
  'INITIALIZING CELESTIAL RELAY ',
  'DECRYPTING ARCHIVE RECORDS   ',
  'ALIGNING ORBITAL PARAMETERS  ',
  'ACCESSING SACRED GEOMETRY    ',
];
const TITLE_RAW = 'MEMENTO MORI';
const TITLE_DONE = 'Memento Mori';
const DURATION = 2400;

export default function LoadingScreen({ onDismiss }) {
  const { autostart } = useAudio();
  const lenis = useLenis();

  const [cipherText, setCipherText] = useState('');
  const [titleText, setTitleText] = useState('◈◈◈◈◈◈ ◈◈◈◈');
  const [subVisible, setSubVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  const autostartRef = useRef(autostart);
  autostartRef.current = autostart;

  const dismissedRef = useRef(false);
  const animIdsRef = useRef([]);
  const timersRef = useRef([]);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // Notify listeners and remove loading class so cat & site unveil together
    document.body.classList.remove('loading-active');
    window.dispatchEvent(new CustomEvent('loading-screen-done'));

    // 1. Unlock interactions & scroll
    document.body.style.overflow = '';
    if (lenis) lenis.start();

    // 2. Trigger parent ready state and audio autostart immediately
    if (onDismissRef.current) onDismissRef.current();
    try {
      autostartRef.current();
    } catch (e) {}

    // 3. Begin smooth curtain exit fade
    setIsExiting(true);

    const exitTimer = setTimeout(() => {
      setIsHidden(true);
    }, 650);
    timersRef.current.push(exitTimer);
  }, [lenis]);

  useEffect(() => {
    // Mark body as loading-active and lock scroll
    document.body.classList.add('loading-active');
    window.dispatchEvent(new CustomEvent('loading-screen-start'));
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

    const tStart = performance.now();
    let msgIdx = 0;
    let charIdx = 0;
    let cfr = 0;
    let cipherRunning = true;
    let lastScramble = 0;

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

    const updateLoop = (now) => {
      if (dismissedRef.current) return;
      const elapsed = now - tStart;
      const p = Math.min(1, elapsed / DURATION);
      setProgress(p * 100);

      // Phase 1: 0% to 45% — rhythmic cipher scramble
      if (p < 0.45) {
        if (now - lastScramble > 45) {
          lastScramble = now;
          setTitleText(
            TITLE_RAW.split('')
              .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join('')
          );
        }
      }
      // Phase 2: 45% to 88% — smooth left-to-right character decryption
      else if (p < 0.88) {
        const decProgress = (p - 0.45) / (0.88 - 0.45);
        const charsDecrypted = Math.floor(decProgress * TITLE_RAW.length);
        setTitleText(
          TITLE_RAW.split('')
            .map((c, i) => {
              if (c === ' ') return ' ';
              if (i < charsDecrypted) return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );
      }
      // Phase 3: 88% to 100% — fully decrypted "Memento Mori"
      else {
        setTitleText(TITLE_DONE);
      }

      if (p >= 0.7) {
        setSubVisible(true);
      }

      if (p < 1) {
        const id = requestAnimationFrame(updateLoop);
        animIdsRef.current.push(id);
        return;
      }

      // 100% Complete — brief hold then smooth exit
      setTitleText(TITLE_DONE);
      const endTimer = setTimeout(dismiss, 180);
      timersRef.current.push(endTimer);
    };

    const startTimer = setTimeout(() => {
      runCipher();
      const id = requestAnimationFrame(updateLoop);
      animIdsRef.current.push(id);
    }, 100);
    timersRef.current.push(startTimer);

    return () => {
      document.body.classList.remove('loading-active');
      window.dispatchEvent(new CustomEvent('loading-screen-done'));
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      cipherRunning = false;
      timersRef.current.forEach(clearTimeout);
      animIdsRef.current.forEach(cancelAnimationFrame);
    };
  }, [dismiss, lenis]);

  if (isHidden) return null;

  return (
    <div
      id="ls-overlay"
      className={isExiting ? 'exit' : ''}
      aria-hidden="true"
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
    </div>
  );
}

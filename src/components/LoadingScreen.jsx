import React, { useEffect, useState, useRef } from 'react';
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
const DURATION = 3200;

export default function LoadingScreen({ onDismiss }) {
  const { autostart } = useAudio();
  const [cipherText, setCipherText] = useState('');
  const [titleText, setTitleText] = useState(TITLE_DONE);
  const [subVisible, setSubVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const tStart = performance.now();
    let titlePhase = 0;
    let decIdx = 0;
    let msgIdx = 0;
    let charIdx = 0;
    let cfr = 0;
    let cipherRunning = true;
    let animId;

    const scrambleMsg = (str) =>
      str
        .split('')
        .map((c, i) => (c === ' ' ? ' ' : i < charIdx ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join('');

    const runCipher = () => {
      if (!cipherRunning) {
        setCipherText('');
        return;
      }
      const t = CIPHER_MSGS[msgIdx % CIPHER_MSGS.length];
      cfr++;
      if (cfr % 3 === 0) charIdx++;
      if (charIdx > t.length + 4) {
        charIdx = 0;
        msgIdx++;
        if (msgIdx >= CIPHER_MSGS.length) cipherRunning = false;
      }
      setCipherText(scrambleMsg(t));
      if (cipherRunning) {
        animId = requestAnimationFrame(runCipher);
      }
    };

    const scrambleTitle = () => {
      if (titlePhase !== 1) return;
      setTitleText(
        TITLE_RAW.split('')
          .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      setTimeout(() => requestAnimationFrame(scrambleTitle), 50);
    };

    const decryptTitle = () => {
      setTitleText(
        TITLE_RAW.split('')
          .map((c, i) => (c === ' ' ? ' ' : i < decIdx ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      decIdx += 0.45;
      if (decIdx < TITLE_RAW.length) {
        requestAnimationFrame(decryptTitle);
      } else {
        setTitleText(TITLE_DONE);
      }
    };

    const fillBar = (now) => {
      const p = Math.min(1, (now - tStart) / DURATION);
      setProgress(p * 100);

      if (p >= 0.2 && titlePhase === 0) {
        titlePhase = 1;
        scrambleTitle();
      }
      if (p >= 0.55 && titlePhase === 1) {
        titlePhase = 2;
        decryptTitle();
      }
      if (p >= 0.72) {
        setSubVisible(true);
      }
      if (p < 1) {
        requestAnimationFrame(fillBar);
        return;
      }

      setTimeout(dismiss, 380);
    };

    const dismiss = () => {
      setIsExiting(true);
      autostart();
      setTimeout(() => {
        setIsHidden(true);
        if (onDismiss) onDismiss();
      }, 1050);
    };

    const startTimer = setTimeout(() => {
      runCipher();
      requestAnimationFrame(fillBar);
    }, 300);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(animId);
      cipherRunning = false;
    };
  }, []);

  if (isHidden) return null;

  return (
    <div id="ls-overlay" className={isExiting ? 'exit' : ''}>
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

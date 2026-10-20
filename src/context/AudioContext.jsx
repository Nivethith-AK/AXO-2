import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const TRACKS = [
  {
    id: 'omega',
    title: 'Track Ω: To Eternity and After',
    src: '/assets/media/audio/To_Eternity_and_After.m4a',
    fallbackSrc: 'https://res.cloudinary.com/demeossfk/video/upload/v1778352089/To_Eternity_and_After_kp6xtm.m4a',
  },
];

const PREF_KEY = 'mm_music_muted';
const TARGET_VOL = 0.6;
const FADE_STEPS = 40;
const FADE_MS = 40;

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem(PREF_KEY) === '1');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(TARGET_VOL);
  const [shuffle, setShuffle] = useState(false);

  // Initialize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, []);

  const fadeIn = () => {
    clearInterval(fadeTimerRef.current);
    if (!audioRef.current) return;
    let step = 0;
    fadeTimerRef.current = setInterval(() => {
      step++;
      if (!audioRef.current) return;
      audioRef.current.volume = Math.min(isMuted ? 0 : volume, (step / FADE_STEPS) * volume);
      if (step >= FADE_STEPS) clearInterval(fadeTimerRef.current);
    }, FADE_MS);
  };

  const fadeOut = (callback) => {
    clearInterval(fadeTimerRef.current);
    if (!audioRef.current) return;
    let step = FADE_STEPS;
    const initialVol = audioRef.current.volume;
    fadeTimerRef.current = setInterval(() => {
      step--;
      if (!audioRef.current) return;
      audioRef.current.volume = Math.max(0, (step / FADE_STEPS) * initialVol);
      if (step <= 0) {
        clearInterval(fadeTimerRef.current);
        if (callback) callback();
      }
    }, FADE_MS);
  };

  const playAudio = () => {
    if (isMuted || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        fadeIn();
        setIsPlaying(true);
      })
      .catch(() => {});
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    localStorage.setItem(PREF_KEY, next ? '1' : '0');
    if (!audioRef.current) return;
    if (next) {
      clearInterval(fadeTimerRef.current);
      audioRef.current.pause();
      audioRef.current.volume = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      playAudio();
    }
  };

  const nextTrack = () => {
    const nextIdx = shuffle
      ? Math.floor(Math.random() * TRACKS.length)
      : (currentIdx + 1) % TRACKS.length;
    setCurrentIdx(nextIdx);
    if (isPlaying) {
      setTimeout(playAudio, 50);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentIdx - 1 + TRACKS.length) % TRACKS.length;
    setCurrentIdx(prevIdx);
    if (isPlaying) {
      setTimeout(playAudio, 50);
    }
  };

  const toggleShuffle = () => {
    setShuffle(prev => !prev);
  };

  const setVolume = (val) => {
    const v = parseFloat(val);
    setVolumeState(v);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = v;
    }
  };

  const seek = (timeInSeconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = timeInSeconds;
    setCurrentTime(timeInSeconds);
  };

  const autostart = () => {
    if (isMuted) return;
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        fadeIn();
        setIsPlaying(true);
      })
      .catch(() => {
        const onFirstInteraction = () => {
          if (!isMuted && audioRef.current) {
            audioRef.current.play().then(fadeIn).catch(() => {});
            setIsPlaying(true);
          }
        };
        document.addEventListener('click', onFirstInteraction, { once: true });
        document.addEventListener('keydown', onFirstInteraction, { once: true });
        document.addEventListener('touchstart', onFirstInteraction, { once: true });
      });
  };

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      // Smooth loop crossfade near the track end
      const timeLeft = audio.duration - audio.currentTime;
      if (
        audio.duration > 0 &&
        timeLeft <= (FADE_STEPS * FADE_MS) / 1000 &&
        isPlaying
      ) {
        fadeOut(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().then(fadeIn).catch(() => {});
          }
        });
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentIdx, isPlaying, shuffle, volume, isMuted]);

  const currentTrack = TRACKS[currentIdx];

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        tracks: TRACKS,
        currentIdx,
        currentTrack,
        isPlaying,
        isMuted,
        currentTime,
        duration,
        volume,
        shuffle,
        togglePlay,
        playAudio,
        pauseAudio,
        toggleMute,
        nextTrack,
        prevTrack,
        toggleShuffle,
        setVolume,
        seek,
        autostart,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onError={(e) => {
          // Cloudinary fallback
          if (currentTrack.fallbackSrc && e.currentTarget.src !== currentTrack.fallbackSrc) {
            e.currentTarget.src = currentTrack.fallbackSrc;
            e.currentTarget.load();
            if (isPlaying) e.currentTarget.play().catch(() => {});
          }
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

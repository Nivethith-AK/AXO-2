import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Archive from '../components/Archive';
import SoundtrackPlayer from '../components/SoundtrackPlayer';
import Shop from '../components/Shop';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ReaderOverlay from '../components/ReaderOverlay';
import LoadingScreen from '../components/LoadingScreen';
import CelestialCanvas from '../components/CelestialCanvas';

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const handleLoadingDone = useCallback(() => {
    setLoadingDone(true);
  }, []);

  return (
    <>
      <CelestialCanvas geomReady={loadingDone} />
      <LoadingScreen onDismiss={handleLoadingDone} />

      <div
        className="home-page-content"
        style={{
          opacity: loadingDone ? 1 : 0,
          pointerEvents: loadingDone ? 'auto' : 'none',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <About />
          <Archive onOpenChapter={(id) => setSelectedChapterId(id)} />
          <SoundtrackPlayer />
          <Shop />
          <Contact />
        </main>

        <Footer />
      </div>

      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={(id) => setSelectedChapterId(id)}
      />
    </>
  );
}

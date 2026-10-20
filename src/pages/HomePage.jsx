import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfiniteTicker from '../components/InfiniteTicker';
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
      <Navbar />

      <main>
        <Hero />
        <InfiniteTicker />
        <About />
        <Archive onOpenChapter={(id) => setSelectedChapterId(id)} />
        <SoundtrackPlayer />
        <Shop />
        <Contact />
      </main>

      <Footer />

      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={(id) => setSelectedChapterId(id)}
      />
    </>
  );
}

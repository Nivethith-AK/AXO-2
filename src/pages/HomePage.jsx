import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfiniteTicker from '../components/InfiniteTicker';
import About from '../components/About';
import Journey from '../components/Journey';
import Archive from '../components/Archive';
import SoundtrackPlayer from '../components/SoundtrackPlayer';
import ParadoxMatrix from '../components/ParadoxMatrix';
import Testimonial from '../components/Testimonial';
import Shop from '../components/Shop';
import Faq from '../components/Faq';
import CtaBanner from '../components/CtaBanner';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ReaderOverlay from '../components/ReaderOverlay';
import LoadingScreen from '../components/LoadingScreen';
import CelestialCanvas from '../components/CelestialCanvas';

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const handleOpenChapter = (id) => {
    setSelectedChapterId(id);
  };

  return (
    <>
      <CelestialCanvas geomReady={loadingDone} />
      <LoadingScreen onDismiss={() => setLoadingDone(true)} />
      <Navbar onReadChapter={handleOpenChapter} />

      <main>
        {/* 1. Hero with dual CTA */}
        <Hero onReadChapter={handleOpenChapter} />

        {/* 2. Seamless Marquee Ticker */}
        <InfiniteTicker />

        {/* 3. The Series & Visuals Feature Bento */}
        <About onReadChapter={handleOpenChapter} />

        {/* 4. How It Unfolds / 3-Step Journey */}
        <Journey onReadChapter={handleOpenChapter} />

        {/* 5. The Archive / Chapter Records */}
        <Archive onOpenChapter={handleOpenChapter} />

        {/* 6. Soundtrack Planetary Player */}
        <SoundtrackPlayer />

        {/* 7. The Paradox / Two Worlds Comparison */}
        <ParadoxMatrix />

        {/* 8. Intercepted Transmission Log / Review */}
        <Testimonial />

        {/* 9. Collector's Artifacts / Editions */}
        <Shop onReadChapter={handleOpenChapter} />

        {/* 10. Frequently Asked Questions Accordion */}
        <Faq />

        {/* 11. Pre-Footer High-Impact CTA Banner */}
        <CtaBanner onReadChapter={handleOpenChapter} />

        {/* 12. Contact Terminal */}
        <Contact />
      </main>

      {/* 13. Clario-style Comprehensive Multi-column Footer */}
      <Footer onReadChapter={handleOpenChapter} />

      {/* Modal Text Reader Overlay */}
      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={handleOpenChapter}
      />
    </>
  );
}

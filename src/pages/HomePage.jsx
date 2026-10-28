import React, { useState, useCallback } from 'react';
import SignalNav from '../components/SignalNav';
import SignalHero from '../components/SignalHero';
import SignalAbout from '../components/SignalAbout';
import SignalLineup from '../components/SignalLineup';
import SignalBanner from '../components/SignalBanner';
import SignalProgram from '../components/SignalProgram';
import SignalTickets from '../components/SignalTickets';
import SignalDiscography from '../components/SignalDiscography';
import SignalPlayer from '../components/SignalPlayer';
import SignalPartners from '../components/SignalPartners';
import SignalFaq from '../components/SignalFaq';
import SignalNewsletter from '../components/SignalNewsletter';
import SignalFooter from '../components/SignalFooter';
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
        <SignalNav onOpenChapter={(id) => setSelectedChapterId(id)} />

        <main>
          <SignalHero
            onOpenChapter={(id) => setSelectedChapterId(id)}
          />
          <SignalAbout />
          <SignalLineup />
          <SignalBanner />
          <SignalProgram onOpenChapter={(id) => setSelectedChapterId(id)} />
          <SignalTickets onOpenChapter={(id) => setSelectedChapterId(id)} />
          <SignalDiscography />
          <SignalPlayer />
          <SignalPartners />
          <SignalFaq />
          <SignalNewsletter />
        </main>

        <SignalFooter onOpenChapter={(id) => setSelectedChapterId(id)} />
      </div>

      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={(id) => setSelectedChapterId(id)}
      />
    </>
  );
}

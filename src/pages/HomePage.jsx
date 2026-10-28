import React, { useState, useCallback } from 'react';
import SignalRails from '../components/SignalRails';
import SignalNav from '../components/SignalNav';
import SignalHero from '../components/SignalHero';
import SignalAbout from '../components/SignalAbout';
import SignalLineup from '../components/SignalLineup';
import SignalBanner from '../components/SignalBanner';
import SignalProgram from '../components/SignalProgram';
import SignalTickets from '../components/SignalTickets';
import SignalExperience from '../components/SignalExperience';
import SignalMap from '../components/SignalMap';
import SignalPlan from '../components/SignalPlan';
import SignalReview from '../components/SignalReview';
import SignalDiscography from '../components/SignalDiscography';
import SignalPlayer from '../components/SignalPlayer';
import SignalFaq from '../components/SignalFaq';
import SignalPartners from '../components/SignalPartners';
import SignalFinalCta from '../components/SignalFinalCta';
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
          position: 'relative',
          opacity: loadingDone ? 1 : 0,
          pointerEvents: loadingDone ? 'auto' : 'none',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* 4-column guide rails from Signal Fest */}
        <SignalRails />

        {/* Fixed Navigation */}
        <SignalNav onOpenChapter={(id) => setSelectedChapterId(id)} />

        <main>
          {/* 1. Hero: Top row + Video frame + Bottom strip (3 stills + clock) */}
          <SignalHero onOpenChapter={(id) => setSelectedChapterId(id)} />

          {/* 2. About: Left photo + 50px statement + Get Tickets pill */}
          <SignalAbout onOpenReader={() => setSelectedChapterId('0')} />

          {/* 3. Lineup: Fisheye draggable belt of artists & relics */}
          <SignalLineup />

          {/* 4. Ticker Band 1: High-contrast infinite marquee */}
          <SignalBanner />

          {/* 5. Program: 4-column schedule grid with diagonal hatch */}
          <SignalProgram onOpenChapter={(id) => setSelectedChapterId(id)} />

          {/* 6. Pricing: Hanging perforated passes with safety pins & threads */}
          <SignalTickets onOpenChapter={(id) => setSelectedChapterId(id)} />

          {/* 7. Experience: 3 full-width numbered feature cards */}
          <SignalExperience onOpenReader={() => setSelectedChapterId('0')} />

          {/* 8. Ticker Band 2: Inverted infinite marquee */}
          <SignalBanner />

          {/* 9. Festival Map: Blueprint with interactive numbered pins */}
          <SignalMap />

          {/* 10. Plan Your Visit: 3 photo cards (Getting here, What to bring, Safety) */}
          <SignalPlan />

          {/* 11. Previous Edition / Review: Editorial quote + 3 stats + photo wall */}
          <SignalReview />

          {/* 12. Official 21-track Discography */}
          <SignalDiscography />

          {/* 13. Master Audio Player */}
          <SignalPlayer />

          {/* 14. FAQ & Torn Pass CTA Banner */}
          <SignalFaq />

          {/* 15. Partners: Main partner + 2-row logo marquee */}
          <SignalPartners />

          {/* 16. Final CTA: Giant countdown clock banner */}
          <SignalFinalCta onOpenReader={() => setSelectedChapterId('0')} />

          {/* 17. Newsletter: Capsule dispatch input */}
          <SignalNewsletter />
        </main>

        {/* 18. Massive Brand Footer */}
        <SignalFooter onOpenChapter={(id) => setSelectedChapterId(id)} />
      </div>

      {/* Reader Overlay for Web-Novel */}
      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={(id) => setSelectedChapterId(id)}
      />
    </>
  );
}

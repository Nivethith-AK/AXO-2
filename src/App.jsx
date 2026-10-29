import React, { useState, useEffect } from 'react';
import CatLayer from './components/CatLayer';
import ReaderOverlay from './components/ReaderOverlay';
import '../src/styles/reader.css';

export default function App() {
  const [activeChapterId, setActiveChapterId] = useState(null);

  // Live countdown timer for both Hero and Final CTA clocks
  useEffect(() => {
    const target = new Date('2026-11-02T00:00:00Z').getTime();
    const updateClocks = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');

      // Update Hero clock elements if present
      const heroD = document.getElementById('hero-days');
      const heroH = document.getElementById('hero-hours');
      const heroM = document.getElementById('hero-minutes');
      const heroS = document.getElementById('hero-seconds');
      if (heroD) heroD.textContent = String(days);
      if (heroH) heroH.textContent = pad(hours);
      if (heroM) heroM.textContent = pad(minutes);
      if (heroS) heroS.textContent = pad(seconds);

      // Update Final CTA clock elements if present
      const fctaD = document.getElementById('fcta-days');
      const fctaH = document.getElementById('fcta-hours');
      const fctaM = document.getElementById('fcta-minutes');
      const fctaS = document.getElementById('fcta-seconds');
      if (fctaD) fctaD.textContent = String(days);
      if (fctaH) fctaH.textContent = pad(hours);
      if (fctaM) fctaM.textContent = pad(minutes);
      if (fctaS) fctaS.textContent = pad(seconds);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Homepage Scroll Animations Engine (Reveal on scroll, parallax, pass tilt physics)
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.sf-scroll-reveal, [data-framer-name="Card"], [data-framer-name="Slots"], [data-framer-name="Marker"], [data-framer-name^="Q0"], [data-framer-name="Sheet"], [data-framer-name="Copy"]'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sf-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('sf-revealed');
      } else {
        observer.observe(el);
      }
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const deltaY = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;

          // Hero image parallax
          if (currentScrollY < 1200) {
            const heroImg = document.querySelector('.framer-t3ax4z img');
            if (heroImg) {
              heroImg.style.transform = `translateY(${currentScrollY * 0.16}px) scale(1.05)`;
            }
          }

          // Hanging passes dynamic swing
          const passesSection = document.querySelector('.sp-row');
          if (passesSection) {
            const rect = passesSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const tiltDelta = Math.max(-6, Math.min(6, deltaY * 0.18));
              const passes = document.querySelectorAll('.sp-pass');
              passes.forEach((pass, i) => {
                const base = i % 2 === 0 ? -4.5 : 4.5;
                pass.style.transform = `rotate(${base + tiltDelta * (i % 2 === 0 ? 1 : -1)}deg)`;
              });
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Global anchor click listener for smooth scroll, chapter reader opening, and FAQ toggle
  useEffect(() => {
    const handleClick = (e) => {
      // 1. Check if user clicked a reader trigger
      const readerTrigger = e.target.closest('[data-open-reader], a[href="#reader"], a[href="#read"], [data-framer-name="Read Manifesto"], .sp-btn');
      if (readerTrigger) {
        e.preventDefault();
        const chId = readerTrigger.getAttribute('data-open-reader') || '0';
        setActiveChapterId(chId);
        return;
      }

      // 2. Check for FAQ accordion click
      const faqStrip = e.target.closest('.framer-1y2cksb, [data-framer-name^="Q0"]');
      if (faqStrip) {
        const item = faqStrip.closest('[data-framer-name^="Q0"]') || faqStrip.parentElement;
        const answer = item ? item.querySelector('.faq-answer-pane') : null;
        const plusP = item ? item.querySelector('[data-framer-name="Plus"] p') : null;
        if (answer) {
          const isClosed = answer.style.display === 'none' || !answer.style.display;
          answer.style.display = isClosed ? 'block' : 'none';
          if (plusP) {
            plusP.textContent = isClosed ? '−' : '+';
          }
          return;
        }
      }

      // 3. Check for in-page hash anchor link
      const anchor = e.target.closest('a[href*="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;
        const hashIdx = href.indexOf('#');
        if (hashIdx === -1) return;
        const hash = href.substring(hashIdx);
        if (!hash || hash === '#') return;

        // If target exists in page, smoothly scroll to it with offset
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          e.preventDefault();
          const navOffset = 75;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });

          // Update URL hash without jumping
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, hash);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Novel Chapter Reader Overlay */}
      {activeChapterId && (
        <ReaderOverlay
          chapterId={activeChapterId}
          onClose={() => setActiveChapterId(null)}
          onSelectChapter={(id) => setActiveChapterId(id)}
        />
      )}

      {/* Global Oneko Tuxedo Cat */}
      <CatLayer />
    </>
  );
}

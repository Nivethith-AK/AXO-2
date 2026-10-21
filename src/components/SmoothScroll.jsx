import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { SmoothScrollContext, useLenis } from '../context/SmoothScrollContext';
import '../styles/lenis.css';

export { useLenis };

export default function SmoothScroll({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis with luxury slow motion inertia physics
    const lenis = new Lenis({
      duration: 1.4, // Silky slow-motion glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clario Framer easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.3,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Global interceptor for smooth in-page hash links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.substring(hashIndex);
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -75,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // 3. Framer scroll reveal observer on route change & content mount
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.cl-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <SmoothScrollContext.Provider value={lenisInstance}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

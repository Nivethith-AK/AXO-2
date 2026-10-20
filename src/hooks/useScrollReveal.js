import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    // 1. IntersectionObserver for Framer-style scroll reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after reveal for optimal performance
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

    // 2. High-performance delegated mousemove listener for Clario card spotlight effect
    const handleMouseMove = (e) => {
      const card = e.target.closest(
        '.cl-interactive-card, .cl-step-card, .cl-bento-card, .cl-edition-card, .archive-card, .track-card, .shop-card'
      );
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}

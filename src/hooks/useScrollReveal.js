import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    // IntersectionObserver for Framer-style scroll reveals
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

    return () => {
      observer.disconnect();
    };
  }, []);
}

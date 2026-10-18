/* ============================================================
   ui.js — fade-in observer, parallax, geom signal,
            video fallback, contact form
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // ── Hero ORRERY fade in ──
    setTimeout(() => {
      document.body.classList.add('geom-ready');
      const orrery = document.querySelector('.hero-orrery-wrap');
      if (orrery) orrery.classList.add('vis');
    }, 800);

    // ── Fade-in observer with viewport check ──
    window.initScrollAnimations = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
          }
        });
      }, { threshold: 0.02, rootMargin: '60px 0px 60px 0px' });

      document.querySelectorAll('.fi').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('vis');
        }
        obs.observe(el);
      });
    };
    // Initialize observer right away
    window.initScrollAnimations();

    // ── Hero parallax ─────────────────────────────────────────
    const hero = document.querySelector('.hero');
    if (hero) {
      // Ensure the hero never forms a stacking context above the fixed nav.
      // We do this by keeping hero z-index below nav (9000) explicitly.
      hero.style.zIndex = '1';
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        hero.style.transform = `translateY(${y * 0.2}px)`;
        // Fade smoothly only when scrolling well past the hero section
        hero.style.opacity   = Math.max(0.15, 1 - (y / 950));
      }, { passive: true });
    }

    // ── Video fallback ────────────────────────────────────────
    const video = document.getElementById('series-video');
    const ph    = document.getElementById('video-ph');
    if (video && ph) {
      const showPh = () => { ph.style.display = 'flex'; video.style.display = 'none'; };
      if (!video.querySelector('source') && !video.getAttribute('src')) {
        showPh();
      } else {
        video.addEventListener('error',       showPh);
        video.addEventListener('loadeddata', () => { ph.style.display = 'none'; video.style.display = 'block'; });
      }
    }

    // ── Contact form ──────────────────────────────────────────
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        form.style.transition = 'opacity 0.5s';
        form.style.opacity    = '0';
        form.style.pointerEvents = 'none';
        setTimeout(() => {
          form.style.display = 'none';
          if (success) success.classList.add('show');
        }, 520);
      });
    }

  });
})();
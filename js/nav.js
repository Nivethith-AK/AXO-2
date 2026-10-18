/* ============================================================
   nav.js — sticky nav, scroll state, section highlighting,
             mobile hamburger
   ============================================================ */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav   = document.getElementById('mm-nav');
    const links = document.getElementById('nav-links');
    const tog   = document.getElementById('nav-tog');
    if (!nav) return;

    const SECTIONS = ['home','about','archive','soundtracks','shop','contact'];

    // ── Scroll: active state + frosted glass ────────────────
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 44);
      let current = '';
      SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      document.querySelectorAll('.nav-link[data-sec]').forEach(l => {
        l.classList.toggle('active', l.dataset.sec === current);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Hamburger toggle ────────────────────────────────────
    if (tog && links) {
      tog.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = links.classList.toggle('open');
        tog.classList.toggle('open', isOpen);
        // Prevent body scroll when menu open on mobile
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      links.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => {
          links.classList.remove('open');
          tog.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && links.classList.contains('open')) {
          links.classList.remove('open');
          tog.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // ── Theme toggle ────────────────────────────────────────
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  });
})();

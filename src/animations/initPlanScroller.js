// Plan Your Visit multi-panel jagged curtain scroll animation
// Replicates Signal Fest sticky 4-column peeling blind effect
export function initPlanScroller() {
  const planSection = document.querySelector('[data-framer-name="Plan Your Visit"]');
  if (!planSection) return () => {};

  const panels = [
    planSection.querySelector('[data-framer-name="Panel 1"]'),
    planSection.querySelector('[data-framer-name="Panel 2"]'),
    planSection.querySelector('[data-framer-name="Panel 3"]'),
  ];

  // Make sure all copy and images inside all panels are visible
  planSection.querySelectorAll('[data-framer-name="Copy"]').forEach((copy) => {
    copy.style.opacity = '1';
    copy.style.transform = 'none';
  });

  const onScroll = () => {
    // If on narrow/mobile screens, disable clip-path for natural layout
    if (window.innerWidth < 810) {
      panels.forEach((p) => {
        if (p) p.style.clipPath = 'none';
      });
      return;
    }

    const rect = planSection.getBoundingClientRect();
    const scrollRange = planSection.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return;

    // Progress from 0 (top of section hits viewport) to 1 (bottom of section hits bottom)
    const progress = Math.max(0, Math.min(1, -rect.top / scrollRange));

    // Staggered column boundaries: 0, 284px, 660px, 1036px, 1440px
    const computeCurtain = (localT) => {
      const t = Math.max(0, Math.min(1, localT));
      if (t <= 0) return 'polygon(0px 100%, 284px 100%, 284px 100%, 660px 100%, 660px 100%, 1036px 100%, 1036px 100%, 1440px 100%, 100% 100%, 0% 100%)';
      if (t >= 1) return 'polygon(0px 0%, 284px 0%, 284px 0%, 660px 0%, 660px 0%, 1036px 0%, 1036px 0%, 1440px 0%, 100% 100%, 0% 100%)';

      const c1 = Math.max(0, Math.min(100, (1 - t * 1.25) * 100)).toFixed(2);
      const c2 = Math.max(0, Math.min(100, (1 - Math.max(0, t - 0.08) * 1.25) * 100)).toFixed(2);
      const c3 = Math.max(0, Math.min(100, (1 - Math.max(0, t - 0.16) * 1.25) * 100)).toFixed(2);
      const c4 = Math.max(0, Math.min(100, (1 - Math.max(0, t - 0.24) * 1.25) * 100)).toFixed(2);

      return `polygon(0px ${c1}%, 284px ${c1}%, 284px ${c2}%, 660px ${c2}%, 660px ${c3}%, 1036px ${c3}%, 1036px ${c4}%, 1440px ${c4}%, 100% 100%, 0% 100%)`;
    };

    // Panel 1: progress 0.05 to 0.35
    if (panels[0]) {
      const t1 = (progress - 0.05) / 0.30;
      panels[0].style.clipPath = computeCurtain(t1);
    }

    // Panel 2: progress 0.38 to 0.68
    if (panels[1]) {
      const t2 = (progress - 0.38) / 0.30;
      panels[1].style.clipPath = computeCurtain(t2);
    }

    // Panel 3: progress 0.70 to 0.98
    if (panels[2]) {
      const t3 = (progress - 0.70) / 0.28;
      panels[2].style.clipPath = computeCurtain(t3);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

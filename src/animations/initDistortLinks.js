// DistortLink kinetic hover physics (Anton Nav Links, CTAs, Footer Links)
// Matches Signal Fest Framer physics: scaleY(1.55), skewX(-7deg/7deg), crimson color shift
export function initDistortLinks() {
  const targetSelectors = [
    '.framer-p8gunt a',
    '.framer-1ep0wx7',
    '.framer-h92k9j',
    '.framer-8yog0e',
    '.framer-5q294k a',
    'a [data-code-component-plugin-id="api"]',
  ];

  const containers = document.querySelectorAll(targetSelectors.join(', '));
  const cleanupFns = [];

  containers.forEach((container, idx) => {
    if (container.closest('[data-framer-name="Statement"]')) return;
    const span = container.querySelector('span') || container.querySelector('p');
    if (!span) return;

    // Lean direction alternating
    const skewDeg = idx % 2 === 0 ? -7 : 7;
    const originalColor = span.style.color || getComputedStyle(span).color || '#111110';

    span.style.display = 'inline-block';
    span.style.transformOrigin = 'center bottom';
    span.style.transition = 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease';
    span.style.cursor = 'pointer';

    const onEnter = () => {
      span.style.transform = `scaleY(1.55) skewX(${skewDeg}deg)`;
      span.style.color = '#E8321E';
    };

    const onLeave = () => {
      span.style.transform = 'scaleY(1) skewX(0deg)';
      span.style.color = originalColor;
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    cleanupFns.push(() => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    });
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}

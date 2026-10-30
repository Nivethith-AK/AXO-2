// Hanging Passes continuous pendular sway & hover physics engine
// Matches Signal Fest .sp-sway and .sp-inview mechanics
export function initHangingPasses() {
  const spRow = document.querySelector('.sp-row');
  if (!spRow) return () => {};

  const container = spRow.parentElement || spRow;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        container.classList.add('sp-inview');
        spRow.classList.add('sp-inview');
      } else {
        container.classList.remove('sp-inview');
        spRow.classList.remove('sp-inview');
      }
    },
    { threshold: 0.1, rootMargin: '100px 0px 100px 0px' }
  );

  observer.observe(spRow);

  // Ensure all passes have landed state and smooth hover transition
  const passes = spRow.querySelectorAll('.sp-pass');
  passes.forEach((pass) => {
    pass.classList.add('sp-landed');
    const rig = pass.querySelector('.sp-rig');
    if (rig) {
      rig.style.willChange = 'transform';
      rig.style.transformOrigin = '50% 0px';
      rig.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  });

  return () => {
    observer.disconnect();
    container.classList.remove('sp-inview');
    spRow.classList.remove('sp-inview');
  };
}

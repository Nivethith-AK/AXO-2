// Flight animation from Hero anchor (#travel-a) to About target (#travel-b) with auto-cycling slides
export function initTravelPhotoFlight() {
  const flightEl = document.querySelector('.framer-1ucw4l4-container > div > div');
  const anchorEl = document.getElementById('travel-a') || document.querySelector('.framer-ofwj02');
  const targetEl = document.getElementById('travel-b') || document.querySelector('.framer-jopnoo');

  if (!flightEl || !anchorEl || !targetEl) return () => {};

  // Auto-cycle slides every 3.5 seconds
  const slides = flightEl.querySelectorAll('[data-slide]');
  let currentSlide = 0;
  let slideTimer = null;

  if (slides.length > 1) {
    slideTimer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      slides.forEach((s, i) => {
        if (i === nextSlide) {
          s.style.zIndex = '3';
          s.style.clipPath = 'inset(0 0 0 0)';
          s.style.transition = 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        } else if (i === currentSlide) {
          s.style.zIndex = '2';
          s.style.transition = 'none';
        } else {
          s.style.zIndex = '1';
          s.style.clipPath = 'inset(0 100% 0 0)';
          s.style.transition = 'none';
        }
      });
      currentSlide = nextSlide;
    }, 3500);
  }

  let ticking = false;
  function updateFlight() {
    ticking = false;
    const rectA = anchorEl.getBoundingClientRect();
    const rectB = targetEl.getBoundingClientRect();

    // Calculate scroll progress between anchor passing viewport and reaching target
    const scrollY = window.scrollY;
    const startScroll = 100;
    const endScroll = Math.max(startScroll + 100, targetEl.offsetTop - 120);
    const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));

    // Ease in-out cubic
    const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const curX = rectA.left + (rectB.left - rectA.left) * ease;
    const curY = rectA.top + (rectB.top - rectA.top) * ease;
    const curW = rectA.width + (rectB.width - rectA.width) * ease;
    const curH = rectA.height + (rectB.height - rectA.height) * ease;

    flightEl.style.width = `${Math.round(curW)}px`;
    flightEl.style.height = `${Math.round(curH)}px`;
    flightEl.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;

    // When fully docked into About target, hide duplicate border or adjust opacity
    if (progress >= 0.98) {
      targetEl.style.opacity = '1';
    } else {
      targetEl.style.opacity = '0.35';
    }
  }

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateFlight);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateFlight();

  return () => {
    if (slideTimer) clearInterval(slideTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

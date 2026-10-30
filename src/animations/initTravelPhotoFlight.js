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

  // Calculate target progress based on targetEl's position relative to viewport center
  function calcProgress(el) {
    const rect = el.getBoundingClientRect();
    const centerOffset = (window.innerHeight - rect.height) / 2;
    const scrollRange = Math.max(1, window.innerHeight - centerOffset);
    const rawProgress = 1 - (rect.top - centerOffset) / scrollRange;
    return rawProgress > 0.85 ? 1 : rawProgress < 0.05 ? 0 : rawProgress;
  }

  // Ease in-out
  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  let currentP = 0;
  let targetP = 0;
  let rafId = 0;
  let isRunning = false;
  let lastTime = 0;

  function update() {
    const rectA = anchorEl.getBoundingClientRect();
    const rectB = targetEl.getBoundingClientRect();

    // If target has scrolled completely above the viewport, hide fixed flight element
    if (rectB.bottom < 0) {
      flightEl.style.opacity = '0';
      flightEl.style.pointerEvents = 'none';
      return;
    }

    flightEl.style.opacity = '1';
    const o = ease(currentP);
    const curX = rectA.left + (rectB.left - rectA.left) * o;
    const curY = rectA.top + (rectB.top - rectA.top) * o;
    const curW = rectA.width + (rectB.width - rectA.width) * o;
    const curH = rectA.height + (rectB.height - rectA.height) * o;
    const tilt = Math.sin(Math.min(1, o * 1.18) * Math.PI) * -4;

    flightEl.style.width = `${curW.toFixed(1)}px`;
    flightEl.style.height = `${curH.toFixed(1)}px`;
    flightEl.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`;

    // Fade target placeholder in when arrived
    if (currentP >= 0.95) {
      targetEl.style.opacity = '1';
    } else {
      targetEl.style.opacity = '0';
    }
  }

  function loop(now) {
    if (!isRunning) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    targetP = calcProgress(targetEl);
    currentP += (targetP - currentP) * (1 - Math.exp(-10 * dt));

    update();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    }
  }

  function stop() {
    isRunning = false;
    cancelAnimationFrame(rafId);
  }

  const onScroll = () => {
    targetP = calcProgress(targetEl);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  targetP = currentP = calcProgress(targetEl);
  update();
  start();

  return () => {
    stop();
    if (slideTimer) clearInterval(slideTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

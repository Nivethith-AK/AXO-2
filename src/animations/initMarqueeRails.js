// Infinite Marquee Rails engine for Ticker Band 1, Ticker Band 2, and Partner Tickers
// Matches Signal Fest horizontal kinetic sliding physics
export function initMarqueeRails() {
  const railsConfig = [
    {
      // Ticker Band 1: Ticket Ticker Rail (translates left)
      containerSelector: '[data-framer-name="Ticker Band 1"]',
      railSelector: '[data-framer-name="Ticker Band 1"] [data-framer-name="Rail"]',
      direction: -1,
      speed: 75, // px per second
      segmentCalc: (rail) => {
        const first = rail.children[0];
        return first ? first.offsetWidth : 2050;
      },
    },
    {
      // Ticker Band 2: Ticket Ticker Rail (translates left)
      containerSelector: '[data-framer-name="Ticker Band 2"]',
      railSelector: '[data-framer-name="Ticker Band 2"] [data-framer-name="Rail"]',
      direction: -1,
      speed: 75,
      segmentCalc: (rail) => {
        const first = rail.children[0];
        return first ? first.offsetWidth : 2050;
      },
    },
    {
      // Partner Tickers Row 1: Leftward marquee
      containerSelector: '.framer-1m44vks',
      railSelector: '.framer-1m44vks [data-framer-name="Rail"]',
      direction: -1,
      speed: 55,
      segmentCalc: (rail) => Math.max(100, Math.round(rail.scrollWidth / 2)),
    },
    {
      // Partner Tickers Row 2: Rightward marquee
      containerSelector: '.framer-10u16rx',
      railSelector: '.framer-10u16rx [data-framer-name="Rail"]',
      direction: 1,
      speed: 55,
      segmentCalc: (rail) => Math.max(100, Math.round(rail.scrollWidth / 2)),
    },
  ];

  const activeRails = [];

  railsConfig.forEach((cfg) => {
    const container = document.querySelector(cfg.containerSelector);
    const rail = document.querySelector(cfg.railSelector);
    if (!container || !rail) return;

    rail.style.willChange = 'transform';

    activeRails.push({
      container,
      rail,
      direction: cfg.direction,
      speed: cfg.speed,
      segmentCalc: cfg.segmentCalc,
      offset: 0,
      inView: false,
    });
  });

  if (!activeRails.length) return () => {};

  // Track visibility to only update elements in or near viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = activeRails.find((r) => r.container === entry.target);
        if (item) {
          item.inView = entry.isIntersecting;
        }
      });
    },
    { rootMargin: '300px 0px 300px 0px' }
  );

  activeRails.forEach((item) => observer.observe(item.container));

  let lastTime = performance.now();
  let rafId = 0;
  let isRunning = true;

  function loop(now) {
    if (!isRunning) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    activeRails.forEach((item) => {
      if (!item.inView) return;

      const segmentWidth = item.segmentCalc(item.rail);
      if (!segmentWidth || segmentWidth <= 0) return;

      if (item.direction === -1) {
        // Move leftwards
        item.offset -= item.speed * dt;
        if (item.offset <= -segmentWidth) {
          item.offset += segmentWidth;
        }
        item.rail.style.transform = `translateX(${item.offset.toFixed(2)}px)`;
      } else {
        // Move rightwards
        item.offset += item.speed * dt;
        if (item.offset >= segmentWidth) {
          item.offset -= segmentWidth;
        }
        item.rail.style.transform = `translateX(${(item.offset - segmentWidth).toFixed(2)}px)`;
      }
    });

    rafId = requestAnimationFrame(loop);
  }

  rafId = requestAnimationFrame(loop);

  return () => {
    isRunning = false;
    cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}

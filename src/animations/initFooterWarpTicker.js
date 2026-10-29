// 2D Canvas WarpTicker engine: warped dual-row Anton typography marquee ticker
export function initFooterWarpTicker() {
  const container = document.querySelector('.framer-3rqaz4-container');
  if (!container) return () => {};
  const canvas = container.querySelector('canvas');
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const offCanvas = document.createElement('canvas');
  const offCtx = offCanvas.getContext('2d');
  if (!offCtx) return () => {};

  const text = 'MEMENTO MORI // VOCADUO 2026 // A REASON TO LIVE   ';
  const color = '#FA0B29';
  const sizeFraction = 0.42;
  const rowGapFraction = 0.04;
  const speed = 60;
  const warp = 0.5;

  let dpr = 1;
  let canvasW = 1440;
  let canvasH = 325;
  let textWidth = 100;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clientW = container.clientWidth || 1440;
    const clientH = container.clientHeight || 325;
    canvasW = Math.max(1, Math.round(clientW * dpr));
    canvasH = Math.max(1, Math.round(clientH * dpr));
    canvas.width = canvasW;
    canvas.height = canvasH;
    offCanvas.width = canvasW;
    offCanvas.height = canvasH;
  }

  function getFont() {
    const fontSize = Math.max(8, Math.round(sizeFraction * canvasH));
    return `400 ${fontSize}px "Anton", sans-serif`;
  }

  function drawOffscreen(offset) {
    offCtx.clearRect(0, 0, canvasW, canvasH);
    offCtx.fillStyle = color;
    offCtx.font = getFont();
    offCtx.textBaseline = 'alphabetic';
    textWidth = Math.max(8, offCtx.measureText(text).width);

    const capHeight = sizeFraction * canvasH;
    const gap = rowGapFraction * canvasH;
    const rows = [
      { base: canvasH / 2 - gap / 2, dir: -1 },
      { base: canvasH / 2 + gap / 2 + capHeight * 0.76, dir: 1 },
    ];

    for (const r of rows) {
      let x = ((offset * r.dir) % textWidth + textWidth) % textWidth - textWidth;
      while (x < canvasW) {
        offCtx.fillText(text, x, r.base);
        x += textWidth;
      }
    }
  }

  function renderBarrelWarp() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    const sliceW = Math.max(4, Math.round(4 * dpr));
    const maxDisplacement = warp * 0.1 * canvasH;

    for (let x = 0; x < canvasW; x += sliceW) {
      const normX = ((x + sliceW / 2) / canvasW) * 2 - 1; // -1 to +1
      const dispY = maxDisplacement * (normX * normX * 2 - 1);
      const scaleY = 1 + warp * 0.12 * normX * normX;
      const sliceH = canvasH * scaleY;
      ctx.drawImage(
        offCanvas,
        x,
        0,
        sliceW,
        canvasH,
        x,
        dispY + (canvasH - sliceH) / 2,
        sliceW,
        sliceH
      );
    }
  }

  let textOffset = 0;
  let rafId = 0;
  let isRunning = false;
  let lastTime = 0;

  function loop(now) {
    if (!isRunning) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    textOffset += speed * dpr * dt;
    drawOffscreen(textOffset);
    renderBarrelWarp();
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

  const resizeObserver = new ResizeObserver(() => {
    resize();
    drawOffscreen(textOffset);
    renderBarrelWarp();
  });
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !document.hidden) {
      start();
    } else {
      stop();
    }
  });
  intersectionObserver.observe(container);

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  resize();
  drawOffscreen(0);
  renderBarrelWarp();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      drawOffscreen(textOffset);
      renderBarrelWarp();
    });
  }
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

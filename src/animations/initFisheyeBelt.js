// WebGL Fisheye Belt engine: 3D droplet lens carousel with inertia drag and auto-drift
export function initFisheyeBelt() {
  const container = document.querySelector('.framer-15nn9xp-container');
  if (!container) return () => {};
  const canvas = container.querySelector('canvas');
  if (!canvas) return () => {};

  container.style.cursor = 'grab';
  container.style.touchAction = 'pan-y';

  const ARTISTS = [
    {
      name: 'Legacy of Helios',
      time: '22:30',
      date: 'Thu, Aug 21',
      stage: 'Main stage',
      image: '/images/cover_art/legacy_of_helios.webp',
      tint: [226, 226, 230, 130, 130, 138, 23, 23, 27],
      img: null,
    },
    {
      name: 'I Really Want to Stay at Your House',
      time: '21:00',
      date: 'Fri, Aug 22',
      stage: 'Yard stage',
      image: '/images/cover_art/IRWTSAYH-vn-vc-pf-.webp',
      tint: [210, 210, 216, 110, 110, 120, 14, 14, 18],
      img: null,
    },
    {
      name: 'Iris Out',
      time: '23:30',
      date: 'Fri, Aug 22',
      stage: 'Main stage',
      image: '/images/cover_art/iris_out.webp',
      tint: [217, 217, 222, 144, 144, 154, 30, 30, 35],
      img: null,
    },
    {
      name: 'Death Wish',
      time: '22:00',
      date: 'Sat, Aug 23',
      stage: 'Main stage',
      image: '/images/cover_art/death_wish.webp',
      tint: [207, 207, 214, 122, 122, 132, 18, 18, 22],
      img: null,
    },
    {
      name: 'Smiles in Puerto Rican Sunshine',
      time: '20:00',
      date: 'Sat, Aug 23',
      stage: 'Yard stage',
      image: '/images/cover_art/SIPRSS.webp',
      tint: [222, 222, 226, 134, 134, 142, 25, 25, 32],
      img: null,
    },
    {
      name: 'SiLVERL!NE (Silver Wolf Ver.)',
      time: '21:30',
      date: 'Sun, Aug 24',
      stage: 'Main stage',
      image: '/images/cover_art/silverline_sw-ver.webp',
      tint: [214, 214, 219, 126, 126, 136, 20, 20, 25],
      img: null,
    },
  ];

  // Pre-load artist cover images
  ARTISTS.forEach((a) => {
    if (!a.image) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      a.img = img;
      renderFrame();
    };
    img.src = a.image;
  });

  const cardW = 380;
  const cardH = 640;
  const cardY = 192;
  const gap = 56;
  const cardStep = cardW + gap;
  const offH = 1024;
  let offW = 2048;

  const offCanvas = document.createElement('canvas');
  offCanvas.width = offW;
  offCanvas.height = offH;
  const offCtx = offCanvas.getContext('2d');
  if (!offCtx) return () => {};

  const stripeText = 'MEMENTO MORI · VOCADUO 2026 · ΔXOLOTL';
  const tickerSpeed = 40;
  const autoDriftSpeed = 40;
  let tickerOffset = 0;
  let scrollPos = 0;
  let velocity = 0;
  let isDragging = false;
  let lastClientX = 0;

  function drawCard(x, card) {
    offCtx.save();
    offCtx.beginPath();
    offCtx.rect(x, cardY, cardW, cardH);
    offCtx.clip();

    // 1. Cover Image or Radial Tint
    if (card.img && card.img.complete && card.img.naturalWidth) {
      const nw = card.img.naturalWidth;
      const nh = card.img.naturalHeight;
      const scale = Math.max(cardW / nw, cardH / nh);
      const sw = cardW / scale;
      const sh = cardH / scale;
      offCtx.drawImage(
        card.img,
        (nw - sw) / 2,
        (nh - sh) / 2,
        sw,
        sh,
        x,
        cardY,
        cardW,
        cardH
      );
    } else {
      const n = card.tint;
      const grad = offCtx.createRadialGradient(
        x + cardW * 0.48,
        371,
        20,
        x + cardW * 0.5,
        544,
        cardH * 0.85
      );
      grad.addColorStop(0, `rgb(${n[0]},${n[1]},${n[2]})`);
      grad.addColorStop(0.45, `rgb(${n[3]},${n[4]},${n[5]})`);
      grad.addColorStop(1, `rgb(${n[6]},${n[7]},${n[8]})`);
      offCtx.fillStyle = grad;
      offCtx.fillRect(x, cardY, cardW, cardH);
    }

    // 2. Dark Vignette at bottom
    const vig = offCtx.createLinearGradient(0, 480, 0, 832);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.72)');
    offCtx.fillStyle = vig;
    offCtx.fillRect(x, 480, cardW, cardH * 0.55);

    // 3. Card Title (Anton / Bold Sans)
    offCtx.fillStyle = '#FCFCFB';
    offCtx.font = '400 42px "Anton", sans-serif';
    offCtx.textBaseline = 'alphabetic';
    const words = String(card.name).toUpperCase().split(' ');
    const lines = [];
    let curLine = '';
    for (const w of words) {
      const testLine = curLine ? `${curLine} ${w}` : w;
      if (offCtx.measureText(testLine).width > 340 && curLine) {
        lines.push(curLine);
        curLine = w;
      } else {
        curLine = testLine;
      }
    }
    lines.push(curLine);

    // 4. Meta Details: Time, Date, Stage
    const meta = [
      card.time ? card.time.toUpperCase() : '',
      card.date ? card.date.toUpperCase() : '',
      card.stage ? card.stage.toUpperCase() : '',
    ].filter(Boolean);

    let textY = 780 - (lines.length * 44 + meta.length * 20);
    for (const line of lines) {
      offCtx.font = '400 42px "Anton", sans-serif';
      offCtx.fillStyle = '#FCFCFB';
      offCtx.fillText(line, x + 20, textY);
      textY += 44;
    }

    offCtx.font = '400 13px "Fragment Mono", monospace';
    offCtx.fillStyle = 'rgba(252, 252, 251, 0.82)';
    for (const m of meta) {
      offCtx.fillText(m, x + 20, textY);
      textY += 20;
    }

    // 5. Red bottom stripe with sliding marquee ticker
    offCtx.save();
    offCtx.beginPath();
    offCtx.rect(x, 806, cardW, 26);
    offCtx.clip();
    offCtx.fillStyle = '#FA0B28';
    offCtx.fillRect(x, 806, cardW, 26);

    offCtx.fillStyle = '#FFFFFF';
    offCtx.font = '500 13px "Be Vietnam Pro", sans-serif';
    const strWidth = offCtx.measureText(stripeText).width + 24;
    const stripeOffset = -((tickerOffset % strWidth + strWidth) % strWidth);
    for (let pos = x + 20 + stripeOffset; pos < x + cardW; pos += strWidth) {
      offCtx.fillText(stripeText, pos, 824);
    }
    offCtx.restore();

    offCtx.restore();
  }

  function drawOffscreen(offset) {
    offCtx.clearRect(0, 0, offW, offH);
    offCtx.fillStyle = '#111110';
    offCtx.fillRect(0, 0, offW, offH);

    const total = ARTISTS.length;
    const startIdx = Math.floor(offset / cardStep) - 1;
    for (let r = startIdx; ; r++) {
      const cardX = r * cardStep - offset;
      if (cardX >= offW) break;
      if (cardX + cardW < 0) continue;
      const idx = ((r % total) + total) % total;
      drawCard(cardX, ARTISTS[idx]);
    }
  }

  // WebGL Droplet Lens Setup
  const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
  if (!gl) return () => {};

  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const vs = compileShader(
    gl.VERTEX_SHADER,
    `
    attribute vec2 aPos;
    varying vec2 vUV;
    void main() {
      vUV = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `
  );

  const fs = compileShader(
    gl.FRAGMENT_SHADER,
    `
    precision mediump float;
    varying vec2 vUV;
    uniform sampler2D uTex;
    uniform float uA, uSX, uSY, uZoom;
    uniform vec4 uBg;
    void main() {
      vec2 pv = vUV * 2.0 - 1.0;
      float bump = exp(-pv.x * pv.x / (2.0 * uSX * uSX)) * exp(-pv.y * pv.y / (2.0 * uSY * uSY));
      vec2 s = pv / (1.0 + uA * bump);
      vec2 suv = vec2(s.x * 0.5 * uZoom + 0.5, s.y * 0.5 + 0.5);
      if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) gl_FragColor = uBg;
      else gl_FragColor = texture2D(uTex, suv);
    }
  `
  );

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.uniform1f(gl.getUniformLocation(prog, 'uA'), 0.55);
  gl.uniform1f(gl.getUniformLocation(prog, 'uSX'), 0.26);
  gl.uniform1f(gl.getUniformLocation(prog, 'uSY'), 0.85);
  gl.uniform1f(gl.getUniformLocation(prog, 'uZoom'), 0.95);
  gl.uniform4f(gl.getUniformLocation(prog, 'uBg'), 18 / 255, 18 / 255, 17 / 255, 0.0);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);

    const neededW = Math.max(1024, Math.round((w / h) * offH));
    if (neededW !== offW) {
      offW = neededW;
      offCanvas.width = offW;
    }
  }

  function renderFrame() {
    drawOffscreen(scrollPos);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // Pointer drag event handlers
  const onPointerDown = (e) => {
    isDragging = true;
    lastClientX = e.clientX;
    velocity = 0;
    container.style.cursor = 'grabbing';
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastClientX;
    lastClientX = e.clientX;
    scrollPos -= dx * 1.6;
    velocity = -dx * 60;
  };

  const onPointerUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
  };

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  let rafId = 0;
  let isRunning = false;
  let lastTime = 0;

  function loop(now) {
    if (!isRunning) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    tickerOffset += tickerSpeed * dt;
    if (!isDragging) {
      velocity *= Math.exp(-2.4 * dt);
      scrollPos += (velocity - autoDriftSpeed) * dt;
    }

    renderFrame();
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
    renderFrame();
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
  renderFrame();
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    container.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
  };
}

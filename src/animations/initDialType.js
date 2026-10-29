// WebGL DialType engine: interactive text warp dial with lens pinch shader
export function initDialType({
  containerSelector,
  text = 'MEMENTO MORI // A REASON TO LIVE',
  color = [250 / 255, 11 / 255, 40 / 255], // #FA0B28
  bg = [1, 1, 1],
  capScale = 0.34,
  gap = 0.05,
  zoom = 0.72,
  speed = 26,
  pinchDeep = 1.55,
  pinchFlat = 0.70,
  pinchStart = 1.05,
  isInteractive = true,
  showDial = true,
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return () => {};
  const canvas = container.querySelector('canvas');
  if (!canvas) return () => {};

  const dot = showDial
    ? container.querySelector('div[style*="border-radius: 50%"], div[style*="border-radius:50%"]')
    : null;

  // Offscreen canvas for typography texture
  const offW = 2048;
  const offH = 1024;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = offW;
  offCanvas.height = offH;
  const offCtx = offCanvas.getContext('2d');
  if (!offCtx) return () => {};

  const fontStr = `400 ${Math.round((capScale * offH) / 0.86)}px Anton, sans-serif`;
  const textSample = text.toUpperCase() + '   ';
  const rows = [
    { f: 0.5 - gap / 2, dir: -1 },
    { f: 0.5 + gap / 2 + capScale, dir: 1 },
  ];
  let textWidth = offW;

  function measure() {
    offCtx.font = fontStr;
    textWidth = Math.max(8, offCtx.measureText(textSample).width);
  }
  measure();

  function drawOffscreen(offset) {
    offCtx.fillStyle = '#000000'; // black bg for difference mask
    offCtx.fillRect(0, 0, offW, offH);
    offCtx.fillStyle = '#FFFFFF'; // white text for difference mask
    offCtx.font = fontStr;
    offCtx.textBaseline = 'alphabetic';
    for (const r of rows) {
      let x = ((offset * r.dir) % textWidth + textWidth) % textWidth - textWidth;
      while (x < offW) {
        offCtx.fillText(textSample, x, Math.round(r.f * offH));
        x += textWidth;
      }
    }
  }

  const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true });
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
    uniform float uTheta, uZoom, uMask;
    uniform vec3 uBg, uInk;
    void main() {
      vec2 pv = vUV * 2.0 - 1.0;
      float r = length(pv);
      float rn = min(r / 1.41421, 1.0);
      float rs = sin(rn * uTheta) / sin(uTheta);
      vec2 dir = r > 0.0001 ? pv / r : vec2(0.0);
      vec2 s = dir * rs * 1.41421;
      vec2 suv = vec2(s.x * 0.5 * uZoom + 0.5, s.y * 0.5 + 0.5);
      bool out_ = suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0;
      if (uMask > 0.5) {
        float m = out_ ? 0.0 : texture2D(uTex, suv).r;
        gl_FragColor = vec4(uInk * m, m);
      } else {
        if (out_) gl_FragColor = vec4(uBg, 1.0);
        else gl_FragColor = texture2D(uTex, suv);
      }
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

  const uTheta = gl.getUniformLocation(prog, 'uTheta');
  gl.uniform1f(gl.getUniformLocation(prog, 'uZoom'), zoom);
  gl.uniform3f(gl.getUniformLocation(prog, 'uBg'), bg[0], bg[1], bg[2]);
  gl.uniform3f(gl.getUniformLocation(prog, 'uInk'), color[0], color[1], color[2]);
  gl.uniform1f(gl.getUniformLocation(prog, 'uMask'), 1.0);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  const kBase = (pinchStart - pinchDeep) / (pinchFlat - pinchDeep);
  let targetK = kBase;
  let currentK = kBase;

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    if (rect.width && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      targetK = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    } else {
      targetK = kBase;
    }
  };

  if (isInteractive) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  let textOffset = 0;
  function renderFrame() {
    drawOffscreen(textOffset);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPos);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    const theta = Math.min(1.55, Math.max(0.2, pinchDeep + (pinchFlat - pinchDeep) * currentK));
    gl.uniform1f(uTheta, theta);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (dot) {
      dot.style.left = (currentK * 100).toFixed(1) + '%';
    }
  }

  let rafId = 0;
  let isRunning = false;
  let lastTime = 0;

  function loop(now) {
    if (!isRunning) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    textOffset += speed * dt;
    currentK += (targetK - currentK) * (1 - Math.exp(-8 * dt));
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
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measure();
      renderFrame();
    });
  }
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (isInteractive) {
      window.removeEventListener('pointermove', onPointerMove);
    }
  };
}

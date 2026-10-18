/* ============================================================
   canvas.js — Celestial background
   Stars · Gray nebula · Gold sacred geometry · Orbital rings
   Shooting stars · Constellation lines
   Sacred geometry fades in after window.geomReady = true
   ============================================================ */

(function () {
  const cv = document.getElementById('cc');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  let W, H;
  let mx = -9999, my = -9999, mActive = false, mTimer;

  // Geometry alpha — lerps from 0 → 1 after window.geomReady
  let geomAlpha = 0;

  const resize = () => {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', () => { resize(); buildAll(); });

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY; mActive = true;
    clearTimeout(mTimer);
    mTimer = setTimeout(() => { mActive = false; }, 2400);
  });

  /* ── COLOURS ─────────────────────────────────────────────── */
  const cStar  = a => `rgba(215,215,215,${a})`;
  const cWarm  = a => `rgba(238,222,195,${a})`;
  const cCool  = a => `rgba(195,195,205,${a})`;
  const cGold  = a => `rgba(201,168,76,${a})`;
  const cGray  = a => `rgba(88,88,88,${a})`;

  /* ── STAR ─────────────────────────────────────────────────── */
  class Star {
    constructor(layer) { this.layer = layer; this.reset(); }
    reset() {
      this.hx = Math.random() * W;
      this.hy = Math.random() * H;
      this.x  = this.hx; this.y = this.hy;
      const sz = [[0.10,0.10],[0.35,0.22],[0.85,0.55]][this.layer];
      const br = [[0.12,0.22],[0.28,0.34],[0.50,0.40]][this.layer];
      this.r    = sz[0] + Math.random() * sz[1];
      this.base = br[0] + Math.random() * br[1];
      const t   = Math.random();
      this.tint = t < 0.14 ? 'warm' : t < 0.28 ? 'cool' : 'w';
      this.ph   = Math.random() * Math.PI * 2;
      this.sp   = 0.003 + Math.random() * 0.007;
      this.vx   = 0; this.vy = 0;
    }
    update() {
      this.ph += this.sp;
      if (mActive && this.layer === 2) {
        const dx = this.x - mx, dy = this.y - my;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 210) {
          const f = (1 - d / 210) * 1.3;
          const a = Math.atan2(dy, dx);
          this.vx += (Math.cos(a) + Math.sin(a) * 0.4) * f;
          this.vy += (Math.sin(a) - Math.cos(a) * 0.4) * f;
        }
      }
      this.vx += (this.hx - this.x) * 0.034;
      this.vy += (this.hy - this.y) * 0.034;
      this.vx *= 0.87; this.vy *= 0.87;
      this.x += this.vx; this.y += this.vy;
    }
    draw() {
      const tw  = Math.sin(this.ph) * 0.3 + 0.7;
      const a   = this.base * tw;
      const col = this.tint === 'warm' ? cWarm(a) : this.tint === 'cool' ? cCool(a) : cStar(a);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      if (this.layer === 2 && this.r > 0.6) {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 5);
        g.addColorStop(0, col); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  /* ── SHOOTING STAR ─────────────────────────────────────────── */
  class ShootStar {
    constructor() { this.active = false; }
    fire() {
      this.x       = Math.random() * W * 1.4 - W * 0.2;
      this.y       = Math.random() * H * 0.6 - H * 0.05;
      this.len     = 75 + Math.random() * 180;
      this.ang     = Math.PI * 0.1 + Math.random() * 0.28;
      this.spd     = 4.5 + Math.random() * 5;
      this.life    = 0;
      this.maxLife = 36 + Math.random() * 44;
      this.active  = true;
      this.isGold  = Math.random() < 0.38;
    }
    update() {
      if (!this.active) return;
      this.life++;
      this.x += Math.cos(this.ang) * this.spd;
      this.y += Math.sin(this.ang) * this.spd;
      if (this.life >= this.maxLife) this.active = false;
    }
    draw() {
      if (!this.active) return;
      const p  = this.life / this.maxLife;
      const a  = p < 0.22 ? p / 0.22 : Math.max(0, 1 - (p - 0.22) / 0.78);
      const tx = this.x - Math.cos(this.ang) * this.len;
      const ty = this.y - Math.sin(this.ang) * this.len;
      const g  = ctx.createLinearGradient(tx, ty, this.x, this.y);
      g.addColorStop(0,    'transparent');
      g.addColorStop(0.55, this.isGold ? cGold(a * 0.45) : cStar(a * 0.3));
      g.addColorStop(1,    this.isGold ? cGold(a * 0.95) : cStar(a * 0.85));
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = g; ctx.lineWidth = this.isGold ? 1.3 : 1.0;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(this.x, this.y); ctx.stroke();
      const hg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 5);
      hg.addColorStop(0, this.isGold ? cGold(a) : cStar(a * 0.75));
      hg.addColorStop(1, 'transparent');
      ctx.fillStyle = hg;
      ctx.beginPath(); ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }

  /* ── NEBULA (gray cloud) ───────────────────────────────────── */
  class Nebula {
    constructor(x, y, rx, ry, a) {
      this.x = x; this.y = y; this.rx = rx; this.ry = ry;
      this.ba = a; this.ph = Math.random() * Math.PI * 2;
    }
    draw() {
      this.ph += 0.0007;
      const a = this.ba * (Math.sin(this.ph) * 0.12 + 0.88);
      ctx.save();
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rx);
      g.addColorStop(0,   cGray(a));
      g.addColorStop(0.5, cGray(a * 0.42));
      g.addColorStop(1,   'transparent');
      ctx.scale(1, this.ry / this.rx);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(this.x, this.y * (this.rx / this.ry), this.rx, 0, Math.PI * 2);
      ctx.fill(); ctx.restore();
    }
  }

  /* ── ORBITAL RING ──────────────────────────────────────────── */
  class Ring {
    constructor(rx, ry, tilt, spd, dash, dot) {
      this.rx = rx; this.ry = ry; this.tilt = tilt;
      this.spd = spd; this.dash = dash; this.dot = dot;
      this.ang = Math.random() * Math.PI * 2;
    }
    draw(ox, oy, alpha) {
      this.ang += this.spd;
      ctx.save(); ctx.translate(ox, oy); ctx.rotate(this.tilt);
      ctx.scale(1, this.ry / this.rx);
      ctx.strokeStyle = cGold(0.28 * alpha);
      ctx.lineWidth = 0.85;
      if (this.dash.length) ctx.setLineDash(this.dash);
      ctx.beginPath(); ctx.arc(0, 0, this.rx, 0, Math.PI * 2);
      ctx.stroke(); ctx.setLineDash([]);
      if (this.dot && alpha > 0.01) {
        const px = Math.cos(this.ang) * this.rx;
        const py = Math.sin(this.ang) * this.rx;
        ctx.globalCompositeOperation = 'lighter';
        const dg = ctx.createRadialGradient(px, py, 0, px, py, 7);
        dg.addColorStop(0, cGold(0.72 * alpha)); dg.addColorStop(1, 'transparent');
        ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = cGold(0.9 * alpha);
        ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }
  }

  /* ── GOLDEN SPIRAL ─────────────────────────────────────────── */
  const PHI = 1.6180339887;

  class GoldenSpiral {
    constructor(x, y, scale, rotSpd) {
      this.ox = x; this.oy = y; this.x = x; this.y = y;
      this.scale = scale; this.rotSpd = rotSpd;
      this.ang = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.038;
      this.vy = (Math.random() - 0.5) * 0.038;
    }
    _wrap() {
      const m = this.scale * 4.5;
      if (this.x < -m) this.x = W + m;  if (this.x > W + m) this.x = -m;
      if (this.y < -m) this.y = H + m;  if (this.y > H + m) this.y = -m;
    }
    draw(alpha) {
      if (alpha < 0.005) return;
      this.ang += this.rotSpd;
      this.x += this.vx; this.y += this.vy;
      this._wrap();
      const S = this.scale;
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.ang);
      ctx.strokeStyle = cGold(1); ctx.lineWidth = 0.72;

      // Fibonacci rectangles
      ctx.globalAlpha = 0.28 * alpha;
      const seq   = [1, 1/PHI, 1/PHI/PHI, 1/PHI/PHI/PHI, 1/PHI/PHI/PHI/PHI, 1/PHI**5];
      const moves = [[1,0],[0,1],[-1,0],[0,-1],[1,0],[0,1]];
      let cx0 = 0, cy0 = 0;
      for (let i = 0; i < 6; i++) {
        const w = S * seq[i];
        const rw = i % 2 === 0 ? w : w * PHI;
        const rh = i % 2 === 0 ? w * PHI : w;
        ctx.strokeRect(cx0, cy0, rw, rh);
        cx0 += moves[i][0] * (i % 2 === 0 ? w : w * PHI);
        cy0 += moves[i][1] * (i % 2 === 0 ? w * PHI : w);
      }

      // Spiral
      ctx.globalAlpha = 0.34 * alpha;
      ctx.beginPath();
      let moved = false;
      for (let t = 0; t < 8 * Math.PI; t += 0.055) {
        const r  = S * 0.011 * Math.pow(PHI, t / (Math.PI / 2));
        const px = r * Math.cos(t), py = r * Math.sin(t);
        if (!moved) { ctx.moveTo(px, py); moved = true; } else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Ratio division lines
      ctx.globalAlpha = 0.15 * alpha;
      ctx.setLineDash([2, 8]);
      const hl = S * 1.5;
      ctx.beginPath(); ctx.moveTo(-hl, hl * 0.618); ctx.lineTo(hl, -hl * 0.618); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-hl * 0.618, hl); ctx.lineTo(hl * 0.618, -hl); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  /* ── VESICA PISCIS ─────────────────────────────────────────── */
  class VesicaPiscis {
    constructor(x, y, r, rotSpd) {
      this.x = x; this.y = y; this.r = r; this.rotSpd = rotSpd;
      this.ang = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.028;
      this.vy = (Math.random() - 0.5) * 0.028;
    }
    draw(alpha) {
      if (alpha < 0.005) return;
      this.ang += this.rotSpd;
      this.x += this.vx; this.y += this.vy;
      if (this.x < -this.r * 3) this.x = W + this.r;
      if (this.x > W + this.r * 3) this.x = -this.r;
      if (this.y < -this.r * 3) this.y = H + this.r;
      if (this.y > H + this.r * 3) this.y = -this.r;
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.ang);
      ctx.strokeStyle = cGold(1); ctx.lineWidth = 0.68;
      ctx.globalAlpha = 0.26 * alpha;
      ctx.beginPath(); ctx.arc(-this.r * 0.5, 0, this.r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc( this.r * 0.5, 0, this.r, 0, Math.PI * 2); ctx.stroke();
      ctx.globalAlpha = 0.13 * alpha;
      const h = this.r * Math.sqrt(3) / 2;
      ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(this.r, h * 0.5); ctx.lineTo(-this.r, h * 0.5);
      ctx.closePath(); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── FLOWER OF LIFE ────────────────────────────────────────── */
  class FlowerOfLife {
    constructor(x, y, r, rotSpd) {
      this.x = x; this.y = y; this.r = r; this.rotSpd = rotSpd;
      this.ang = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.022;
      this.vy = (Math.random() - 0.5) * 0.022;
    }
    draw(alpha) {
      if (alpha < 0.005) return;
      this.ang += this.rotSpd;
      this.x += this.vx; this.y += this.vy;
      if (this.x < -this.r * 4) this.x = W + this.r;
      if (this.x > W + this.r * 4) this.x = -this.r;
      if (this.y < -this.r * 4) this.y = H + this.r;
      if (this.y > H + this.r * 4) this.y = -this.r;
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.ang);
      ctx.strokeStyle = cGold(1); ctx.lineWidth = 0.62;
      ctx.globalAlpha = 0.24 * alpha;
      ctx.beginPath(); ctx.arc(0, 0, this.r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        ctx.beginPath(); ctx.arc(Math.cos(a)*this.r, Math.sin(a)*this.r, this.r, 0, Math.PI*2);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.08 * alpha;
      ctx.beginPath(); ctx.arc(0, 0, this.r * 2, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── METATRON'S CUBE ───────────────────────────────────────── */
  class MetatronsCube {
    constructor(x, y, r, rotSpd) {
      this.x = x; this.y = y; this.r = r; this.rotSpd = rotSpd;
      this.ang = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.018;
      this.vy = (Math.random() - 0.5) * 0.018;
    }
    draw(alpha) {
      if (alpha < 0.005) return;
      this.ang += this.rotSpd;
      this.x += this.vx; this.y += this.vy;
      if (this.x < -this.r * 3) this.x = W + this.r;
      if (this.x > W + this.r * 3) this.x = -this.r;
      if (this.y < -this.r * 3) this.y = H + this.r;
      if (this.y > H + this.r * 3) this.y = -this.r;
      const pts = Array.from({length:6},(_,i) => {
        const a = i * Math.PI / 3;
        return [Math.cos(a)*this.r, Math.sin(a)*this.r];
      });
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.ang);
      ctx.strokeStyle = cGold(1); ctx.lineWidth = 0.58;
      ctx.globalAlpha = 0.22 * alpha;
      ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
      for (let i=1;i<6;i++) ctx.lineTo(pts[i][0],pts[i][1]);
      ctx.closePath(); ctx.stroke();
      ctx.beginPath();
      for (let i=0;i<6;i++){
        const a=i*Math.PI/3+Math.PI/6;
        const x2=Math.cos(a)*this.r*0.577, y2=Math.sin(a)*this.r*0.577;
        i===0?ctx.moveTo(x2,y2):ctx.lineTo(x2,y2);
      }
      ctx.closePath(); ctx.stroke();
      ctx.globalAlpha = 0.08 * alpha;
      for (let i=0;i<6;i++) {
        for (let j=i+1;j<6;j++) {
          ctx.beginPath(); ctx.moveTo(pts[i][0],pts[i][1]); ctx.lineTo(pts[j][0],pts[j][1]); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.16 * alpha;
      ctx.beginPath(); ctx.arc(0,0,this.r,0,Math.PI*2); ctx.stroke();
      ctx.restore();
    }
  }

  /* ── CONSTELLATION LINES ───────────────────────────────────── */
  let cPts = [];
  const buildConstellations = () => {
    cPts = Array.from({length:14}, () => ({ x: Math.random()*W, y: Math.random()*H }));
  };
  const drawConstellations = () => {
    ctx.save(); ctx.strokeStyle = cStar(0.055); ctx.lineWidth = 0.5;
    ctx.setLineDash([2,20]);
    const used = new Set();
    cPts.forEach((p,i) => {
      let best=null, bd=Infinity;
      cPts.forEach((q,j) => {
        if(i===j||used.has(`${j}-${i}`)) return;
        const d=Math.hypot(p.x-q.x, p.y-q.y);
        if(d<330&&d<bd){bd=d;best=j;}
      });
      if(best!==null){
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(cPts[best].x,cPts[best].y); ctx.stroke();
        used.add(`${i}-${best}`);
      }
    });
    ctx.setLineDash([]); ctx.restore();
  };

  /* ── BUILD ─────────────────────────────────────────────────── */
  let stars=[], rings=[], nebulae=[], geom=[], shooters=[];

  const buildAll = () => {
    stars = [
      ...Array.from({length:580},()=>new Star(0)),
      ...Array.from({length:210},()=>new Star(1)),
      ...Array.from({length:95}, ()=>new Star(2)),
    ];
    shooters = Array.from({length:8}, ()=>new ShootStar());
    const S = Math.min(W,H);
    rings = [
      new Ring(S*0.15, S*0.046,  0.38,  0.00042, [4,12], true),
      new Ring(S*0.27, S*0.082, -0.28, -0.00028, [2,8],  true),
      new Ring(S*0.40, S*0.122,  0.56,  0.00015, [],     false),
      new Ring(S*0.53, S*0.162, -0.18, -0.00009, [1,28], false),
      new Ring(S*0.67, S*0.205,  0.73,  0.00006, [3,18], false),
    ];
    nebulae = [
      new Nebula(W*0.50, H*0.50, W*0.40, H*0.30, 0.058),
      new Nebula(W*0.78, H*0.22, W*0.26, H*0.22, 0.040),
      new Nebula(W*0.18, H*0.72, W*0.24, H*0.20, 0.042),
      new Nebula(W*0.88, H*0.68, W*0.22, H*0.18, 0.034),
      new Nebula(W*0.35, H*0.12, W*0.20, H*0.16, 0.030),
    ];
    geom = [
      new GoldenSpiral( W*0.17, H*0.21, S*0.13,  0.00020),
      new GoldenSpiral( W*0.83, H*0.76, S*0.11, -0.00015),
      new GoldenSpiral( W*0.55, H*0.14, S*0.09,  0.00025),
      new VesicaPiscis( W*0.73, H*0.27, S*0.10, -0.00017),
      new VesicaPiscis( W*0.24, H*0.66, S*0.08,  0.00013),
      new FlowerOfLife(  W*0.50, H*0.60, S*0.085, 0.00011),
      new MetatronsCube( W*0.63, H*0.82, S*0.095, 0.00009),
      new MetatronsCube( W*0.40, H*0.38, S*0.07, -0.00012),
    ];
    buildConstellations();
  };
  buildAll();

  /* ── BACKGROUND ────────────────────────────────────────────── */
  const drawBG = () => {
    const g = ctx.createRadialGradient(W/2, H*0.44, 0, W/2, H/2, Math.max(W,H)*0.9);
    g.addColorStop(0,   '#111111');
    g.addColorStop(0.3, '#0a0a0a');
    g.addColorStop(0.7, '#050505');
    g.addColorStop(1,   '#020202');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    const v=ctx.createLinearGradient(0,0,W,0);
    v.addColorStop(0,'rgba(0,0,0,0.55)'); v.addColorStop(0.2,'transparent');
    v.addColorStop(0.8,'transparent');    v.addColorStop(1,'rgba(0,0,0,0.55)');
    ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
  };

  /* ── ANIMATE ───────────────────────────────────────────────── */
  let shotTimer = 0;
  const SHOT_INT = 40;

  const frame = () => {
    // Lerp geometry alpha
    const target = window.geomReady ? 1 : 0;
    geomAlpha += (target - geomAlpha) * 0.018;

    ctx.clearRect(0,0,W,H);
    drawBG();
    nebulae.forEach(n => n.draw());
    drawConstellations();
    geom.forEach(g => g.draw(geomAlpha));
    stars.forEach(s => { s.update(); s.draw(); });
    rings.forEach(r => r.draw(W/2, H/2, geomAlpha));

    shotTimer++;
    if (shotTimer >= SHOT_INT) {
      shotTimer = 0;
      const burst = Math.random() < 0.28 ? 2 : 1;
      let fired = 0;
      for (let i = 0; i < shooters.length && fired < burst; i++) {
        if (!shooters[i].active) { shooters[i].fire(); fired++; }
      }
    }
    shooters.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(frame);
  };
  frame();
})();

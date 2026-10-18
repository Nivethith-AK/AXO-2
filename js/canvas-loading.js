/* ============================================================
   canvas-loading.js — Stars only (no geometry, no rings)
   Used on loading.html and cover.html background
   ============================================================ */

(function () {
  const cv = document.getElementById('cc');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H;
  let mx = -9999, my = -9999, mActive = false, mTimer;

  const resize = () => {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', () => { resize(); buildStars(); });
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY; mActive = true;
    clearTimeout(mTimer);
    mTimer = setTimeout(() => { mActive = false; }, 2200);
  });

  const cStar = a => `rgba(215,215,215,${a})`;
  const cWarm = a => `rgba(238,222,195,${a})`;
  const cCool = a => `rgba(195,195,205,${a})`;

  class Star {
    constructor(layer) { this.layer = layer; this.reset(); }
    reset() {
      this.hx = Math.random() * W; this.hy = Math.random() * H;
      this.x  = this.hx; this.y  = this.hy;
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
        if (d < 200) {
          const f = (1 - d/200) * 1.2, a = Math.atan2(dy,dx);
          this.vx += (Math.cos(a) + Math.sin(a)*0.4)*f;
          this.vy += (Math.sin(a) - Math.cos(a)*0.4)*f;
        }
      }
      this.vx += (this.hx-this.x)*0.034; this.vy += (this.hy-this.y)*0.034;
      this.vx *= 0.87; this.vy *= 0.87;
      this.x += this.vx; this.y += this.vy;
    }
    draw() {
      const tw  = Math.sin(this.ph)*0.3+0.7;
      const a   = this.base * tw;
      const col = this.tint==='warm'?cWarm(a):this.tint==='cool'?cCool(a):cStar(a);
      ctx.save(); ctx.globalCompositeOperation='lighter';
      if (this.layer===2 && this.r>0.6) {
        const g=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r*5);
        g.addColorStop(0,col); g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(this.x,this.y,this.r*5,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
  }

  let stars = [];
  const buildStars = () => {
    stars = [
      ...Array.from({length:520},()=>new Star(0)),
      ...Array.from({length:190},()=>new Star(1)),
      ...Array.from({length:80}, ()=>new Star(2)),
    ];
  };
  buildStars();

  const drawBG = () => {
    const g=ctx.createRadialGradient(W/2,H*0.44,0,W/2,H/2,Math.max(W,H)*0.9);
    g.addColorStop(0,'#111111'); g.addColorStop(0.3,'#0a0a0a');
    g.addColorStop(0.7,'#050505'); g.addColorStop(1,'#020202');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    const v=ctx.createLinearGradient(0,0,W,0);
    v.addColorStop(0,'rgba(0,0,0,0.55)'); v.addColorStop(0.2,'transparent');
    v.addColorStop(0.8,'transparent'); v.addColorStop(1,'rgba(0,0,0,0.55)');
    ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
  };

  const frame = () => {
    ctx.clearRect(0,0,W,H);
    drawBG();
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(frame);
  };
  frame();
})();

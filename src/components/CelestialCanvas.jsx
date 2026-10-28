import React, { useEffect, useRef } from 'react';

export default function CelestialCanvas({ geomReady = true }) {
  const canvasRef = useRef(null);
  const geomReadyRef = useRef(geomReady);

  useEffect(() => {
    geomReadyRef.current = geomReady;
  }, [geomReady]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let animId;
    let W = (cv.width = window.innerWidth);
    let H = (cv.height = window.innerHeight);
    let mx = -9999,
      my = -9999,
      mActive = false,
      mTimer;
    let geomAlpha = 0;

    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      buildAll();
    };

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      mActive = true;
      clearTimeout(mTimer);
      mTimer = setTimeout(() => {
        mActive = false;
      }, 2400);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    /* ── Colors (dynamically adapting to Dark Crimson & Light Gold Marble) ── */
    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';
    const cStar = (a) => (isLight() ? `rgba(195,150,55,${a * 0.45})` : `rgba(255,235,235,${a})`);
    const cWarm = (a) => (isLight() ? `rgba(180,130,25,${a * 0.75})` : `rgba(255,50,70,${a})`);
    const cCool = (a) => (isLight() ? `rgba(160,110,20,${a * 0.70})` : `rgba(200,25,45,${a})`);
    const cGold = (a) => (isLight() ? `rgba(166,115,2,${a})` : `rgba(240,30,55,${a})`);
    const cGray = (a) => (isLight() ? `rgba(180,145,105,${a * 0.4})` : `rgba(120,40,50,${a})`);

    /* ── Procedural Generative Marble Vein Engine ── */
    const offscreenMarble = document.createElement('canvas');
    const mctx = offscreenMarble.getContext('2d');
    let veinPaths = [];
    let mineralClouds = [];
    let shimmerPhase = 0;

    const buildVeinPaths = () => {
      veinPaths = [];
      mineralClouds = [];

      // 3 majestic geological fault lines leaving space for hero typography
      const fissureDefs = [
        {
          x0: -W * 0.08, y0: H * 0.12,
          x1: W * 1.08,  y1: H * 0.82,
          ctrl1X: W * 0.22, ctrl1Y: H * 0.05,
          ctrl2X: W * 0.82, ctrl2Y: H * 0.65,
          branches: 4, seed: 1.5
        },
        {
          x0: W * 0.28,  y0: -H * 0.08,
          x1: W * 1.10,  y1: H * 0.32,
          ctrl1X: W * 0.55, ctrl1Y: H * 0.02,
          ctrl2X: W * 0.85, ctrl2Y: H * 0.18,
          branches: 3, seed: 3.2
        },
        {
          x0: -W * 0.06, y0: H * 0.74,
          x1: W * 0.78,  y1: H * 1.10,
          ctrl1X: W * 0.18, ctrl1Y: H * 0.88,
          ctrl2X: W * 0.52, ctrl2Y: H * 0.98,
          branches: 3, seed: 4.8
        },
      ];

      fissureDefs.forEach((f, fIdx) => {
        const pts = [];
        const steps = 48;
        const dx = (f.x1 - f.x0) / steps;
        const dy = (f.y1 - f.y0) / steps;
        const nx = -dy;
        const ny = dx;
        const nLen = Math.sqrt(nx * nx + ny * ny) || 1;
        const normX = nx / nLen;
        const normY = ny / nLen;

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          // Organic sinusoidal meandering
          const disp =
            Math.sin(t * Math.PI * 2.2 + f.seed) * 48 +
            Math.cos(t * Math.PI * 4.8 - f.seed * 1.5) * 22 +
            Math.sin(t * Math.PI * 9.5 + f.seed * 3) * 9;

          const px = f.x0 + dx * i + normX * disp;
          const py = f.y0 + dy * i + normY * disp;
          pts.push({ x: px, y: py });

          // Spawn soft mineral cloud clusters along key nodes
          if (i % 7 === 3) {
            mineralClouds.push({
              x: px + (Math.sin(i * 4) * 25),
              y: py + (Math.cos(i * 3) * 25),
              r: 60 + ((i * 11) % 55),
              seed: f.seed + i
            });
          }
        }

        const branches = [];
        for (let b = 0; b < f.branches; b++) {
          const attachIdx = Math.floor(6 + (b / f.branches) * (steps - 12));
          const origin = pts[attachIdx];
          if (!origin) continue;

          const bPts = [origin];
          const bSteps = 14 + Math.floor(((fIdx * 5 + b * 7) % 8));
          const bSide = b % 2 === 0 ? 1 : -1;
          const baseAng = Math.atan2(dy, dx) + bSide * (0.55 + ((f.seed + b) % 0.3));
          const bSpd = 20 + ((fIdx * 6 + b * 9) % 14);

          let cx = origin.x;
          let cy = origin.y;
          for (let s = 1; s <= bSteps; s++) {
            const st = s / bSteps;
            const curl = Math.sin(st * Math.PI * 2.2 + f.seed) * 12;
            cx += Math.cos(baseAng) * bSpd + normX * curl;
            cy += Math.sin(baseAng) * bSpd + normY * curl;
            bPts.push({ x: cx, y: cy });
          }
          branches.push(bPts);
        }

        veinPaths.push({ pts, branches, seed: f.seed });
      });
    };

    const renderMarbleOffscreen = () => {
      offscreenMarble.width = W;
      offscreenMarble.height = H;
      mctx.clearRect(0, 0, W, H);
      const light = isLight();

      const drawPath = (points) => {
        if (!points || points.length < 2) return;
        mctx.beginPath();
        mctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          mctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        mctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        mctx.stroke();
      };

      mctx.lineCap = 'round';
      mctx.lineJoin = 'round';

      // Pass 0: Soft smoky mineral clouds along fissures
      mineralClouds.forEach((c) => {
        const cg = mctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        if (light) {
          cg.addColorStop(0, 'rgba(215, 172, 70, 0.055)');
          cg.addColorStop(0.5, 'rgba(200, 155, 50, 0.025)');
          cg.addColorStop(1, 'transparent');
        } else {
          cg.addColorStop(0, 'rgba(215, 25, 45, 0.075)');
          cg.addColorStop(0.5, 'rgba(170, 15, 30, 0.035)');
          cg.addColorStop(1, 'transparent');
        }
        mctx.fillStyle = cg;
        mctx.beginPath();
        mctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        mctx.fill();
      });

      // Pass 1: Broad diffuse mineral wash
      mctx.strokeStyle = light
        ? 'rgba(212, 168, 65, 0.06)'
        : 'rgba(225, 25, 45, 0.08)';
      mctx.lineWidth = 55;
      veinPaths.forEach((v) => {
        drawPath(v.pts);
      });

      // Pass 2: Secondary mineral vein
      mctx.strokeStyle = light
        ? 'rgba(184, 134, 11, 0.18)'
        : 'rgba(240, 30, 55, 0.28)';
      mctx.lineWidth = 14;
      veinPaths.forEach((v) => {
        drawPath(v.pts);
        v.branches.forEach((b) => {
          mctx.lineWidth = 6;
          drawPath(b);
        });
      });

      // Pass 3: Core crisp quartz / magma fissure
      mctx.strokeStyle = light
        ? 'rgba(150, 105, 10, 0.60)'
        : 'rgba(255, 55, 75, 0.85)';
      mctx.lineWidth = 2.2;
      veinPaths.forEach((v) => {
        mctx.lineWidth = 2.2;
        drawPath(v.pts);
        mctx.lineWidth = 1.1;
        mctx.strokeStyle = light
          ? 'rgba(166, 115, 2, 0.38)'
          : 'rgba(235, 30, 55, 0.52)';
        v.branches.forEach((b) => drawPath(b));
      });

      // Pass 4: Calcite & crystalline flecks
      const fleckCount = 60;
      for (let i = 0; i < fleckCount; i++) {
        const v = veinPaths[i % veinPaths.length];
        const pIdx = Math.floor(((i * 9 + 17) % v.pts.length));
        const pt = v.pts[pIdx];
        if (!pt) continue;
        const ox = (Math.sin(i * 3.7) * 22);
        const oy = (Math.cos(i * 4.3) * 22);
        const r = 0.8 + ((i * 3) % 4) * 0.45;
        mctx.fillStyle = light
          ? `rgba(215, 175, 75, ${0.30 + ((i % 4) * 0.08)})`
          : `rgba(255, 75, 95, ${0.40 + ((i % 4) * 0.1)})`;
        mctx.beginPath();
        mctx.arc(pt.x + ox, pt.y + oy, r, 0, Math.PI * 2);
        mctx.fill();
      }
    };

    const drawVeinShimmer = (phase) => {
      const light = isLight();
      ctx.save();
      veinPaths.forEach((v) => {
        const cycle = (phase * 0.6 + v.seed * 0.35) % 1;
        const pLen = v.pts.length;
        const centerIdx = Math.floor(cycle * (pLen - 1));
        const p = v.pts[centerIdx];
        if (!p) return;

        const rad = 75;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        const shimmerCol = light
          ? 'rgba(225, 185, 75, 0.16)'
          : 'rgba(255, 75, 95, 0.28)';
        g.addColorStop(0, shimmerCol);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    /* ── Star ── */
    class Star {
      constructor(layer) {
        this.layer = layer;
        this.reset();
      }
      reset() {
        this.hx = Math.random() * W;
        this.hy = Math.random() * H;
        this.x = this.hx;
        this.y = this.hy;
        const sz = [
          [0.1, 0.1],
          [0.35, 0.22],
          [0.85, 0.55],
        ][this.layer];
        const br = [
          [0.12, 0.22],
          [0.28, 0.34],
          [0.5, 0.4],
        ][this.layer];
        this.r = sz[0] + Math.random() * sz[1];
        this.base = br[0] + Math.random() * br[1];
        const t = Math.random();
        this.tint = t < 0.14 ? 'warm' : t < 0.28 ? 'cool' : 'w';
        this.ph = Math.random() * Math.PI * 2;
        this.sp = 0.003 + Math.random() * 0.007;
        this.vx = 0;
        this.vy = 0;
      }
      update() {
        this.ph += this.sp;
        if (mActive && this.layer === 2) {
          const dx = this.x - mx,
            dy = this.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 210) {
            const f = (1 - d / 210) * 1.3;
            const a = Math.atan2(dy, dx);
            this.vx += (Math.cos(a) + Math.sin(a) * 0.4) * f;
            this.vy += (Math.sin(a) - Math.cos(a) * 0.4) * f;
          }
        }
        this.vx += (this.hx - this.x) * 0.034;
        this.vy += (this.hy - this.y) * 0.034;
        this.vx *= 0.87;
        this.vy *= 0.87;
        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        const tw = Math.sin(this.ph) * 0.3 + 0.7;
        const a = this.base * tw;
        const col =
          this.tint === 'warm'
            ? cWarm(a)
            : this.tint === 'cool'
            ? cCool(a)
            : cStar(a);
        ctx.save();
        ctx.globalCompositeOperation = isLight() ? 'source-over' : 'lighter';
        if (this.layer === 2 && this.r > 0.6) {
          const g = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.r * 5
          );
          g.addColorStop(0, col);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /* ── Shooting Star ── */
    class ShootStar {
      constructor() {
        this.active = false;
      }
      fire() {
        this.x = Math.random() * W * 1.4 - W * 0.2;
        this.y = Math.random() * H * 0.6 - H * 0.05;
        this.len = 75 + Math.random() * 180;
        this.ang = Math.PI * 0.1 + Math.random() * 0.28;
        this.spd = 4.5 + Math.random() * 5;
        this.life = 0;
        this.maxLife = 36 + Math.random() * 44;
        this.gold = Math.random() < 0.2;
        this.active = true;
      }
      update() {
        if (!this.active) return;
        this.x += Math.cos(this.ang) * this.spd;
        this.y += Math.sin(this.ang) * this.spd;
        this.life++;
        if (this.life >= this.maxLife) this.active = false;
      }
      draw() {
        if (!this.active) return;
        const p = this.life / this.maxLife;
        const a = Math.sin(p * Math.PI) * 0.85;
        const tx = this.x - Math.cos(this.ang) * this.len;
        const ty = this.y - Math.sin(this.ang) * this.len;
        const g = ctx.createLinearGradient(tx, ty, this.x, this.y);
        g.addColorStop(0, 'transparent');
        g.addColorStop(1, this.gold ? cGold(a) : cStar(a * 0.9));
        ctx.save();
        ctx.strokeStyle = g;
        ctx.lineWidth = this.gold ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    /* ── Nebula Cloud ── */
    class Nebula {
      constructor(cx, cy, rx, ry, col, spd) {
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
        this.col = col;
        this.spd = spd;
        this.t = Math.random() * 100;
      }
      draw() {
        this.t += this.spd;
        const ox = Math.sin(this.t * 0.4) * 28;
        const oy = Math.cos(this.t * 0.3) * 20;
        const x = this.cx + ox,
          y = this.cy + oy;
        const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(this.rx, this.ry));
        g.addColorStop(0, this.col(0.04));
        g.addColorStop(0.5, this.col(0.018));
        g.addColorStop(1, 'transparent');
        ctx.save();
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(x, y, this.rx, this.ry, 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /* ── Golden Spiral ── */
    class GoldenSpiral {
      constructor(cx, cy, scale, rotSpd) {
        this.cx = cx;
        this.cy = cy;
        this.scale = scale;
        this.rotSpd = rotSpd;
        this.rot = Math.random() * Math.PI * 2;
      }
      draw(alpha) {
        if (alpha <= 0.001) return;
        this.rot += this.rotSpd;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.rot);
        ctx.strokeStyle = cGold(0.09 * alpha);
        ctx.lineWidth = 0.65;
        const b = 0.30635;
        ctx.beginPath();
        let first = true;
        for (let theta = 0; theta < Math.PI * 6.5; theta += 0.06) {
          const r = this.scale * Math.exp(b * theta) * 0.015;
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    /* ── Vesica Piscis ── */
    class VesicaPiscis {
      constructor(cx, cy, r, rotSpd) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.rotSpd = rotSpd;
        this.rot = 0;
      }
      draw(alpha) {
        if (alpha <= 0.001) return;
        this.rot += this.rotSpd;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.rot);
        ctx.strokeStyle = cGold(0.08 * alpha);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(-this.r * 0.5, 0, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.r * 0.5, 0, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    /* ── Flower of Life ── */
    class FlowerOfLife {
      constructor(cx, cy, r, rotSpd) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.rotSpd = rotSpd;
        this.rot = 0;
      }
      draw(alpha) {
        if (alpha <= 0.001) return;
        this.rot += this.rotSpd;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.rot);
        ctx.strokeStyle = cGold(0.065 * alpha);
        ctx.lineWidth = 0.55;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * this.r, Math.sin(a) * this.r, this.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    /* ── Metatron's Cube ── */
    class MetatronsCube {
      constructor(cx, cy, r, rotSpd) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.rotSpd = rotSpd;
        this.rot = 0;
      }
      draw(alpha) {
        if (alpha <= 0.001) return;
        this.rot += this.rotSpd;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.rot);
        ctx.strokeStyle = cGold(0.055 * alpha);
        ctx.lineWidth = 0.5;
        const pts = [{ x: 0, y: 0 }];
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          pts.push({ x: Math.cos(a) * this.r * 0.5, y: Math.sin(a) * this.r * 0.5 });
          pts.push({ x: Math.cos(a) * this.r, y: Math.sin(a) * this.r });
        }
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    }

    /* ── Orbital Ring ── */
    class OrbitalRing {
      constructor(r, tilt, rotSpd, strokeAlpha) {
        this.r = r;
        this.tilt = tilt;
        this.rotSpd = rotSpd;
        this.strokeAlpha = strokeAlpha;
        this.rot = Math.random() * Math.PI * 2;
      }
      draw(cx, cy, alpha) {
        if (alpha <= 0.001) return;
        this.rot += this.rotSpd;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.rot);
        ctx.scale(1, this.tilt);
        ctx.strokeStyle = cGold(this.strokeAlpha * alpha);
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    let stars = [];
    let shooters = [];
    let nebulae = [];
    let geom = [];
    let rings = [];
    let constellations = [];

    const buildConstellations = () => {
      constellations = [];
      const pts = [
        [0.15, 0.18],
        [0.22, 0.12],
        [0.29, 0.19],
        [0.25, 0.27],
        [0.17, 0.25],
        [0.72, 0.68],
        [0.79, 0.61],
        [0.86, 0.67],
        [0.82, 0.77],
        [0.75, 0.74],
      ];
      for (let i = 0; i < pts.length - 1; i += 2) {
        constellations.push({
          x1: pts[i][0] * W,
          y1: pts[i][1] * H,
          x2: pts[i + 1][0] * W,
          y2: pts[i + 1][1] * H,
        });
      }
    };

    const buildAll = () => {
      stars = [
        ...Array.from({ length: 480 }, () => new Star(0)),
        ...Array.from({ length: 180 }, () => new Star(1)),
        ...Array.from({ length: 70 }, () => new Star(2)),
      ];
      shooters = Array.from({ length: 6 }, () => new ShootStar());
      nebulae = [
        new Nebula(W * 0.25, H * 0.35, W * 0.28, H * 0.22, cGray, 0.0003),
        new Nebula(W * 0.75, H * 0.65, W * 0.3, H * 0.25, cGray, 0.00025),
        new Nebula(W * 0.5, H * 0.5, W * 0.22, H * 0.18, cWarm, 0.0002),
      ];
      const S = Math.min(W, H);
      geom = [
        new GoldenSpiral(W * 0.17, H * 0.21, S * 0.13, 0.0002),
        new GoldenSpiral(W * 0.83, H * 0.76, S * 0.11, -0.00015),
        new GoldenSpiral(W * 0.55, H * 0.14, S * 0.09, 0.00025),
        new VesicaPiscis(W * 0.73, H * 0.27, S * 0.1, -0.00017),
        new VesicaPiscis(W * 0.24, H * 0.66, S * 0.08, 0.00013),
        new FlowerOfLife(W * 0.5, H * 0.6, S * 0.085, 0.00011),
        new MetatronsCube(W * 0.63, H * 0.82, S * 0.095, 0.00009),
        new MetatronsCube(W * 0.4, H * 0.38, S * 0.07, -0.00012),
      ];
      rings = [
        new OrbitalRing(S * 0.38, 0.45, 0.0002, 0.06),
        new OrbitalRing(S * 0.48, 0.38, -0.00015, 0.045),
        new OrbitalRing(S * 0.58, 0.5, 0.0001, 0.035),
      ];
      buildConstellations();
      buildVeinPaths();
      renderMarbleOffscreen();
    };

    buildAll();

    const drawConstellations = () => {
      ctx.save();
      ctx.strokeStyle = cGold(0.045 * geomAlpha);
      ctx.lineWidth = 0.5;
      constellations.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(c.x1, c.y1);
        ctx.lineTo(c.x2, c.y2);
        ctx.stroke();
      });
      ctx.restore();
    };

    let shotTimer = 0;
    const SHOT_INT = 40;

    const frame = () => {
      const target = geomReadyRef.current ? 1 : 0;
      geomAlpha += (target - geomAlpha) * 0.018;

      ctx.clearRect(0, 0, W, H);

      // 1. Procedural generative marble veins
      ctx.drawImage(offscreenMarble, 0, 0);

      // 2. Animated mineral shimmer along the fissures
      shimmerPhase += 0.005;
      drawVeinShimmer(shimmerPhase);

      // 3. Ambient celestial geometry & stars
      nebulae.forEach((n) => n.draw());
      drawConstellations();
      geom.forEach((g) => g.draw(geomAlpha));
      stars.forEach((s) => {
        s.update();
        s.draw();
      });
      rings.forEach((r) => r.draw(W / 2, H / 2, geomAlpha));

      shotTimer++;
      if (shotTimer >= SHOT_INT) {
        shotTimer = 0;
        const burst = Math.random() < 0.28 ? 2 : 1;
        let fired = 0;
        for (let i = 0; i < shooters.length && fired < burst; i++) {
          if (!shooters[i].active) {
            shooters[i].fire();
            fired++;
          }
        }
      }
      shooters.forEach((s) => {
        s.update();
        s.draw();
      });

      animId = requestAnimationFrame(frame);
    };

    frame();

    const themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          renderMarbleOffscreen();
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(mTimer);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="cc" />;
}

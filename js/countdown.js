/* ============================================================
   countdown.js — Launch countdown timer
   Set TARGET_DATE to your launch date/time (ISO 8601 UTC).
   ============================================================ */

const TARGET_DATE = '2026-07-01T00:00:00Z'; // Launch date // ← Change this

(function () {
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
    wrap:  document.getElementById('cd-timer'),
    exp:   document.getElementById('cd-expired'),
  };

  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  const flash = el => {
    el.classList.remove('flash');
    void el.offsetWidth; // reflow
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 300);
  };

  let prevVals = {};

  const tick = () => {
    const now  = Date.now();
    const end  = new Date(TARGET_DATE).getTime();
    const diff = end - now;

    if (diff <= 0) {
      if (els.wrap) els.wrap.style.display = 'none';
      if (els.exp)  els.exp.style.display  = 'block';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    if (els.days  && d !== prevVals.d) { els.days.textContent  = pad(d); flash(els.days);  }
    if (els.hours && h !== prevVals.h) { els.hours.textContent = pad(h); flash(els.hours); }
    if (els.mins  && m !== prevVals.m) { els.mins.textContent  = pad(m); flash(els.mins);  }
    if (els.secs  && s !== prevVals.s) { els.secs.textContent  = pad(s); flash(els.secs);  }

    prevVals = { d, h, m, s };
  };

  tick();
  setInterval(tick, 1000);
})();

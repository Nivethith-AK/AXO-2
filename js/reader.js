/* ============================================================
   reader.js — Chapter reader overlay
   ============================================================ */

let _currentId = null;

function _allUnlocked() {
  return VOLUMES.flatMap(v => v.chapters).filter(c => !c.locked);
}

function openChapter(id) {
  const all = VOLUMES.flatMap(v => v.chapters);
  const ch  = all.find(c => c.id === id);
  if (!ch || ch.locked) return;

  _currentId = id;

  document.getElementById('r-meta').textContent  = ch.tag  || '';
  document.getElementById('r-title').textContent = ch.title;
  document.getElementById('r-date').textContent  = ch.date || '';
  document.getElementById('r-body').innerHTML    =
    ch.content || '<p><em>This record has not yet been transmitted.</em></p>';

  const unlocked = _allUnlocked();
  const idx = unlocked.findIndex(c => c.id === id);
  const prev = unlocked[idx - 1] || null;
  const next = unlocked[idx + 1] || null;

  const pb = document.getElementById('r-prev');
  const nb = document.getElementById('r-next');

  pb.style.opacity        = prev ? '1' : '0.14';
  pb.style.pointerEvents  = prev ? 'auto' : 'none';
  nb.style.opacity        = next ? '1' : '0.14';
  nb.style.pointerEvents  = next ? 'auto' : 'none';

  document.getElementById('r-prev-title').textContent = prev ? prev.title : '—';
  document.getElementById('r-next-title').textContent = next ? next.title : '—';

  const overlay = document.getElementById('reader-overlay');
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function navChapter(dir) {
  const unlocked = _allUnlocked();
  const idx = unlocked.findIndex(c => c.id === _currentId);
  const target = unlocked[idx + dir];
  if (target) openChapter(target.id);
}

function closeReader() {
  document.getElementById('reader-overlay').classList.remove('open');
  document.body.style.overflow = '';
  _currentId = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReader();
});

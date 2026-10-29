// Subtle SVG turbulence analog film grain overlay
export function initFilmGrain() {
  if (document.getElementById('memento-film-grain')) return () => {};

  const grainEl = document.createElement('div');
  grainEl.id = 'memento-film-grain';
  const tile = 180;
  const grain = 0.85;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="${grain}" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`;
  const bg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  Object.assign(grainEl.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '99',
    opacity: '0.14',
    mixBlendMode: 'overlay',
    backgroundImage: bg,
    backgroundRepeat: 'repeat',
    backgroundSize: `${tile}px ${tile}px`,
  });

  document.body.appendChild(grainEl);

  return () => {
    grainEl.remove();
  };
}

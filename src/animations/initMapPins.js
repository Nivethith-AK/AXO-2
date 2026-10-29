// Interactive Blueprint Map Pins with hover states, pulse rings, and interactive detail callouts
export function initMapPins() {
  const pinElements = document.querySelectorAll('[data-framer-name^="Pin "]');
  if (!pinElements.length) return () => {};

  const PIN_DETAILS = {
    'Pin 1': {
      title: 'Main Stage',
      num: '01',
      desc: 'Orchestral live performances featuring near, synths, and strings. High-output audio arrays with 360° sub bass.',
      hours: '19:00 — 02:00',
    },
    'Pin 2': {
      title: 'Yard Stage',
      num: '02',
      desc: 'Acoustic sets, intimate vocaloid arrangements, experimental ambient synthesizers and unreleased demo listening.',
      hours: '18:00 — 01:00',
    },
    'Pin 3': {
      title: 'Art Zone',
      num: '03',
      desc: 'Interactive celestial projection domes, holographic character displays, and Volume I chapter manuscript exhibits.',
      hours: 'All Day',
    },
    'Pin 4': {
      title: 'Food Court',
      num: '04',
      desc: 'Artisanal festival dining, plant-based specialties, ramen stalls, and night market vendors.',
      hours: '12:00 — 02:30',
    },
    'Pin 5': {
      title: 'Bars & Elixirs',
      num: '05',
      desc: 'Themed Memento Mori mocktails, craft beers, matcha lattes, and electrolyte hydration stations.',
      hours: '14:00 — 02:00',
    },
    'Pin 6': {
      title: 'Restrooms & Wash',
      num: '06',
      desc: 'All-gender individual stalls, touchless hygiene facilities, accessible private restrooms, and water refills.',
      hours: '24 Hours',
    },
    'Pin 7': {
      title: 'Medical & Sanctuary',
      num: '07',
      desc: 'Certified medical staff, sensory decompression quiet room, hydration packs, and welfare support.',
      hours: '24 Hours',
    },
    'Pin 9': {
      title: 'Raven Gate',
      num: '09',
      desc: 'Primary access terminal, digital wristband NFC pairing, bag verification, and lost & found office.',
      hours: 'Opens 12:00 Daily',
    },
  };

  // Create floating callout tooltip
  let tooltip = document.getElementById('map-pin-callout');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'map-pin-callout';
    Object.assign(tooltip.style, {
      position: 'absolute',
      zIndex: '100',
      display: 'none',
      width: '260px',
      background: '#FFFFFF',
      border: '1.5px solid #111110',
      borderRadius: '8px',
      padding: '14px 16px',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
      pointerEvents: 'auto',
      fontFamily: '"Be Vietnam Pro", sans-serif',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      transform: 'translateY(6px)',
      opacity: '0',
    });
    document.body.appendChild(tooltip);
  }

  function showTooltip(pinEl, data) {
    const rect = pinEl.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    tooltip.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-family:'Anton', sans-serif;font-size:18px;color:#FA0B28;letter-spacing:0.04em">${data.num} // ${data.title.toUpperCase()}</span>
        <span style="font-family:'Fragment Mono', monospace;font-size:11px;color:#888">${data.hours}</span>
      </div>
      <p style="margin:0 0 8px 0;font-size:12px;line-height:1.45;color:#222;font-weight:400">${data.desc}</p>
      <div style="font-family:'Fragment Mono', monospace;font-size:10px;color:#FA0B28;text-transform:uppercase;letter-spacing:0.05em">● Live Active Sector</div>
    `;

    tooltip.style.left = `${Math.max(10, Math.min(window.innerWidth - 280, rect.left + scrollX - 60))}px`;
    tooltip.style.top = `${rect.bottom + scrollY + 10}px`;
    tooltip.style.display = 'block';
    requestAnimationFrame(() => {
      tooltip.style.transform = 'translateY(0)';
      tooltip.style.opacity = '1';
    });
  }

  function hideTooltip() {
    tooltip.style.transform = 'translateY(6px)';
    tooltip.style.opacity = '0';
    setTimeout(() => {
      if (tooltip.style.opacity === '0') {
        tooltip.style.display = 'none';
      }
    }, 200);
  }

  const cleanups = [];

  pinElements.forEach((pin) => {
    const name = pin.getAttribute('data-framer-name');
    const data = PIN_DETAILS[name] || {
      title: name,
      num: '●',
      desc: 'Festival infrastructure & interactive installations.',
      hours: 'All Day',
    };

    pin.style.cursor = 'pointer';
    pin.style.transition = 'transform 0.22s cubic-bezier(0.2, 1, 0.3, 1)';

    const dot = pin.querySelector('[data-framer-name="Dot"]');
    if (dot) {
      dot.style.transition = 'box-shadow 0.25s ease, transform 0.25s ease';
    }

    const plate = pin.querySelector('[data-framer-name="Plate"]');
    if (plate) {
      plate.style.transition = 'box-shadow 0.25s ease, background-color 0.25s ease, transform 0.25s ease';
    }

    const onEnter = () => {
      pin.style.transform = 'scale(1.08)';
      if (dot) {
        dot.style.boxShadow = '0 0 0 5px rgba(250, 11, 40, 0.4)';
        dot.style.transform = 'scale(1.2)';
      }
      if (plate) {
        plate.style.boxShadow = '0 6px 18px rgba(250, 11, 40, 0.2)';
        plate.style.backgroundColor = '#FFFFFF';
      }
      showTooltip(pin, data);
    };

    const onLeave = () => {
      pin.style.transform = 'none';
      if (dot) {
        dot.style.boxShadow = 'none';
        dot.style.transform = 'none';
      }
      if (plate) {
        plate.style.boxShadow = 'none';
        plate.style.backgroundColor = '';
      }
      hideTooltip();
    };

    pin.addEventListener('mouseenter', onEnter);
    pin.addEventListener('mouseleave', onLeave);
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      showTooltip(pin, data);
    });

    cleanups.push(() => {
      pin.removeEventListener('mouseenter', onEnter);
      pin.removeEventListener('mouseleave', onLeave);
    });
  });

  const onDocClick = (e) => {
    if (!e.target.closest('[data-framer-name^="Pin "]') && !e.target.closest('#map-pin-callout')) {
      hideTooltip();
    }
  };
  document.addEventListener('click', onDocClick);

  return () => {
    cleanups.forEach((c) => c());
    document.removeEventListener('click', onDocClick);
    if (tooltip) tooltip.remove();
  };
}

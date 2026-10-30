// Scroll-driven animation engine for the 2nd section (About)
// Reverse-engineered directly from Signal Fest's compiled Framer runtime:
// 1. Statement word-by-word scroll text scrubbing (Ji component algorithm)
// 2. Photo Target, Copy, and Button spring entrance reveals (So, Do, Ao components)
// 3. Kinetic depth subtle photo float/parallax on scroll

export function initAboutScroll() {
  const aboutSection = document.querySelector('[data-framer-name="About"]');
  if (!aboutSection) return () => {};

  const photoTarget = aboutSection.querySelector('[data-framer-name="Photo Target"]');
  const photoImg = photoTarget ? photoTarget.querySelector('img') : null;
  const copyEl = aboutSection.querySelector('[data-framer-name="Copy"]');
  const manifestoBtn = aboutSection.querySelector('[data-framer-name="Read Manifesto"]');
  const statement = aboutSection.querySelector('[data-framer-name="Statement"]');
  const words = statement ? Array.from(statement.querySelectorAll('[data-w]')) : [];

  const dimColor = 'rgba(17, 17, 16, 0.18)';
  const inkColor = '#111110';
  const accentColor = '#E8321E';

  // 1. Initial entrance states (Framer spring & tween presets)
  if (photoTarget) {
    photoTarget.style.willChange = 'transform, opacity';
    photoTarget.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease';
    photoTarget.style.opacity = '0';
    photoTarget.style.transform = 'translateY(28px) scale(0.96)';
  }

  if (photoImg) {
    photoImg.style.willChange = 'transform';
    photoImg.style.transformOrigin = 'center center';
    photoImg.style.transition = 'transform 0.12s ease-out';
  }

  if (copyEl) {
    copyEl.style.willChange = 'transform, opacity';
    copyEl.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.7s ease 0.1s';
    copyEl.style.opacity = '0';
    copyEl.style.transform = 'translateY(20px) scale(0.98)';
  }

  if (manifestoBtn) {
    manifestoBtn.style.willChange = 'transform, opacity';
    manifestoBtn.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.22s, opacity 0.5s ease 0.22s';
    manifestoBtn.style.opacity = '0';
    manifestoBtn.style.transform = 'translateX(-36px)';
  }

  // Set all statement words to initial dimmed color and proper typographic spacing
  words.forEach((w) => {
    w.style.display = 'inline-block';
    w.style.marginRight = '0.28em';
    w.style.color = dimColor;
    w.style.transition = 'color 0.18s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  let revealed = false;
  let lastHighlighted = -1;
  let rafId = 0;

  function onScroll() {
    const vh = window.innerHeight;
    const aboutRect = aboutSection.getBoundingClientRect();

    // Trigger entrance when about section enters 82% of viewport
    if (!revealed && aboutRect.top < vh * 0.82) {
      revealed = true;
      if (photoTarget) {
        photoTarget.style.opacity = '1';
        photoTarget.style.transform = 'translateY(0px) scale(1)';
      }
      if (copyEl) {
        copyEl.style.opacity = '1';
        copyEl.style.transform = 'translateY(0px) scale(1)';
      }
      if (manifestoBtn) {
        manifestoBtn.style.opacity = '1';
        manifestoBtn.style.transform = 'translateX(0px)';
      }
    }

    // Word-by-word scroll text illumination (Ji algorithm)
    if (statement && words.length > 0) {
      const stRect = statement.getBoundingClientRect();
      // Progress scrubs from top entering at 85% of screen height to 45% (over 40% vh)
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - stRect.top) / (vh * 0.40)));
      const targetCount = Math.ceil(progress * words.length);

      if (targetCount !== lastHighlighted) {
        lastHighlighted = targetCount;
        words.forEach((w, idx) => {
          const isLit = idx < targetCount;
          // Climax accent on the last 3 words or explicitly tagged accents
          const isAccent = w.hasAttribute('data-accent') || idx >= words.length - 3;
          w.style.color = isLit ? (isAccent ? accentColor : inkColor) : dimColor;
        });
      }
    }

    // Subtle kinetic parallax on the photo image while section is in viewport
    if (photoImg && aboutRect.top < vh && aboutRect.bottom > 0) {
      const offset = (aboutRect.top - vh * 0.2) * -0.055;
      photoImg.style.transform = `scale(1.06) translateY(${offset.toFixed(1)}px)`;
    }
  }

  const handleScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(onScroll);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });

  // Evaluate immediately on mount
  onScroll();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}

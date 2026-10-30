// Interactive FAQ accordion engine with smooth kinetic expand/collapse and rotating icon
// Matches Signal Fest Q01-Q06 structure, Fold container, and Framer cubic-bezier tween
export function initFAQAccordion() {
  const FAQ_DATA = {
    Q01: 'A multimedia dark fantasy universe and official VocaDuo 2026 entry created by Δxolotl. It pairs original electronic and orchestral music with an episodic web novel tracing the redemption arc of Azrael and Adoniel.',
    Q02: 'All twenty-one tracks are available across YouTube, Spotify, Apple Music, and Soundcloud. Lossless 24-bit audio stems and instrumental scores are accessible through the digital archive.',
    Q03: 'Volume I chapters are released bi-weekly on Sundays at 00:00 UTC. Readers can experience all published chapters through our interactive web reader overlay with synchronized music cues.',
    Q04: 'Yes, the full novel is 100% free to read online directly on this site without subscriptions or paywalls. Physical clothbound hardcovers and art books will be available for pre-order.',
    Q05: 'Absolutely. All tracks are free to use in non-commercial livestreams, fan animations, and YouTube videos with proper credit to Δxolotl and a link back to Memento Mori.',
    Q06: 'You can transmit a message through our terminal contact form below, join the official community Discord server, or email management directly at contact@axolotlmusic.com.',
  };

  const cleanupFns = [];

  Object.entries(FAQ_DATA).forEach(([qKey, answerText]) => {
    const qContainer = document.querySelector(`[data-framer-name="${qKey}"]`);
    if (!qContainer) return;

    const jrmsCard = qContainer.querySelector('.framer-JRMsV') || qContainer.firstElementChild;
    if (!jrmsCard) return;

    const strip = jrmsCard.querySelector('.framer-1y2cksb');
    if (!strip) return;

    const plusContainer = strip.querySelector('[data-framer-name="Plus"]');
    const plusText = plusContainer ? plusContainer.querySelector('p') : null;

    // Inject Fold container if not already present
    let fold = jrmsCard.querySelector('[data-framer-name="Fold"]');
    if (!fold) {
      fold = document.createElement('div');
      fold.className = 'framer-m5ksiq';
      fold.setAttribute('data-framer-name', 'Fold');
      fold.style.cssText =
        'background-color: transparent; overflow: hidden; max-height: 0px; opacity: 0; padding: 0px 18px 0px 80px; pointer-events: none; transition: max-height 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, padding 0.35s ease;';

      const answerWrapper = document.createElement('div');
      answerWrapper.className = 'framer-moawf0';
      answerWrapper.setAttribute('data-framer-name', 'Answer');
      answerWrapper.setAttribute('data-framer-component-type', 'RichTextContainer');
      answerWrapper.style.maxWidth = '680px';

      const p = document.createElement('p');
      p.className = 'framer-text';
      p.style.fontFamily = '"Be Vietnam Pro", sans-serif';
      p.style.fontSize = '15px';
      p.style.lineHeight = '1.6em';
      p.style.color = 'var(--token-bd2e10c0-fe65-422d-8bfb-f9a71ea30469, rgba(17, 17, 16, 0.62))';
      p.style.margin = '0';
      p.textContent = answerText;

      answerWrapper.appendChild(p);
      fold.appendChild(answerWrapper);
      jrmsCard.appendChild(fold);
    }

    let isOpen = false;

    const updateState = (open) => {
      isOpen = open;
      if (isOpen) {
        jrmsCard.classList.remove('framer-v-c4tcn8');
        jrmsCard.classList.add('framer-v-1840zih');
        jrmsCard.setAttribute('data-framer-name', 'Open');
        fold.style.maxHeight = '280px';
        fold.style.opacity = '1';
        fold.style.padding = '18px 18px 22px 80px';
        fold.style.pointerEvents = 'auto';
        if (plusText) {
          plusText.textContent = '×';
          plusText.style.color = '#E8321E';
          plusText.style.fontSize = '22px';
          plusText.style.transform = 'scale(1.15)';
        }
      } else {
        jrmsCard.classList.remove('framer-v-1840zih');
        jrmsCard.classList.add('framer-v-c4tcn8');
        jrmsCard.setAttribute('data-framer-name', 'Closed');
        fold.style.maxHeight = '0px';
        fold.style.opacity = '0';
        fold.style.padding = '0px 18px 0px 80px';
        fold.style.pointerEvents = 'none';
        if (plusText) {
          plusText.textContent = '+';
          plusText.style.color = '';
          plusText.style.fontSize = '';
          plusText.style.transform = '';
        }
      }
    };

    const onClick = (e) => {
      e.preventDefault();
      updateState(!isOpen);
    };

    strip.addEventListener('click', onClick);
    cleanupFns.push(() => strip.removeEventListener('click', onClick));
  });

  return () => {
    cleanupFns.forEach((fn) => fn());
  };
}

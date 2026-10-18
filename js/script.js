/* =============================================================
   MEMENTO MORI — js/script.js
   Shared utilities across all pages.
   ============================================================= */

/* ── NAV ────────────────────────────────────────────────────── */
const initNav = () => {
  const nav      = document.getElementById('mm-nav');
  const toggler  = document.getElementById('nav-toggler');
  const links    = document.getElementById('nav-links');
  if (!nav) return;

  // Scroll shadow
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggler && links) {
    toggler.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggler.classList.toggle('open', open);
      toggler.setAttribute('aria-expanded', open);
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggler.classList.remove('open');
    }));
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggler.classList.remove('open');
      }
    });
  }

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links && links.querySelectorAll('a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('nav-active');
  });
};

/* ── FADE-IN ON SCROLL ──────────────────────────────────────── */
const initFadeIn = () => {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
};

/* ── FOOTER LAST UPDATED ────────────────────────────────────── */
const initFooter = () => {
  const el = document.getElementById('footer-updated');
  if (el) el.textContent = new Date().getFullYear();
};

/* ═══════════════════════════════════════════════════════════════
   LOADING SCREEN — loading_main.html
   Cipher deciphering animation: characters resolve from a pool
   of symbols into readable letters, one by one, elegantly.
   ═══════════════════════════════════════════════════════════════ */

// Symbol pool — a mix of mirror-script-like characters
const CIPHER_POOL = '∑⊕⊗⋄⋆◈◉◊▲△▷▸◁◂⬡⬢⬣⌘⍟✦✧✩⟡⟢⟣⟤⟥';

const randomCipher = () => CIPHER_POOL[Math.floor(Math.random() * CIPHER_POOL.length)];

// Resolve a string letter-by-letter with a cipher effect
const resolveText = (el, target, onDone, { delay = 0, stepMs = 60, resolveMs = 90 } = {}) => {
  if (!el) { if (onDone) onDone(); return; }
  const chars = Array.from(target);
  const result = chars.map(() => randomCipher());
  let resolved = 0;

  setTimeout(() => {
    // Shimmer phase — randomise all unresolved chars
    const shimmer = setInterval(() => {
      const display = chars.map((c, i) => {
        if (c === ' ') return '\u00A0';
        return i < resolved ? chars[i] : randomCipher();
      }).join('');
      el.textContent = display;
    }, stepMs / 2);

    const resolveNext = () => {
      if (resolved >= chars.length) {
        clearInterval(shimmer);
        el.textContent = target;
        if (onDone) onDone();
        return;
      }
      resolved++;
      setTimeout(resolveNext, resolveMs + Math.random() * 40);
    };
    setTimeout(resolveNext, 300);
  }, delay);
};

const initLoadingScreen = () => {
  const screen   = document.getElementById('loading-screen');
  if (!screen) return;

  const cipherEl = document.getElementById('ls-cipher');
  const subEl    = document.getElementById('ls-sub');
  const barEl    = document.getElementById('ls-bar');

  // Phase 1: resolve title
  resolveText(cipherEl, 'MEMENTO MORI', () => {
    // Phase 2: fade in subtitle
    if (subEl) subEl.classList.add('vis');

    // Phase 3: fill bar
    let pct = 0;
    const barInterval = setInterval(() => {
      pct += Math.random() * 14 + 3;
      if (pct >= 100) { pct = 100; clearInterval(barInterval); }
      if (barEl) barEl.style.width = pct + '%';
      if (pct >= 100) {
        setTimeout(() => {
          screen.classList.add('ls-exit');
          setTimeout(() => { screen.remove(); document.body.style.overflow = ''; }, 900);
        }, 600);
      }
    }, 200);
  }, { delay: 800, resolveMs: 110 });

  document.body.style.overflow = 'hidden';
};

/* ═══════════════════════════════════════════════════════════════
   COUNTDOWN — countdown.html
   ═══════════════════════════════════════════════════════════════ */
const initCountdown = () => {
  const daysEl  = document.getElementById('cd-days');
  if (!daysEl) return;

  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-mins');
  const secsEl  = document.getElementById('cd-secs');

  // ← SET YOUR LAUNCH DATE HERE
  const LAUNCH = new Date('2026-07-01T00:00:00');

  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  const tick = () => {
    const now  = Date.now();
    const diff = LAUNCH.getTime() - now;

    if (diff <= 0) {
      // Countdown complete → go to loading screen
      window.location.href = 'loading_main.html';
      return;
    }

    const total_s = Math.floor(diff / 1000);
    const d = Math.floor(total_s / 86400);
    const h = Math.floor((total_s % 86400) / 3600);
    const m = Math.floor((total_s % 3600) / 60);
    const s = total_s % 60;

    daysEl.textContent  = pad(d);
    hoursEl.textContent = pad(h);
    minsEl.textContent  = pad(m);
    secsEl.textContent  = pad(s);
  };

  tick();
  setInterval(tick, 1000);
};

/* ═══════════════════════════════════════════════════════════════
   ARCHIVE — testament data
   To add a new testament: add an entry to TESTAMENTS below.
   Available testaments will link directly to chapter.html?id=X.
   ═══════════════════════════════════════════════════════════════ */
const TESTAMENTS = {
  vol1: {
    label: 'Vol. I',
    entries: [
      { id: 'alpha', num: 'α',  title: 'When We Met',            available: true  },
      { id: '1',     num: '01', title: 'A Death Wish',           available: true  },
      { id: '2',     num: '02', title: 'Solace in Death',        available: false },
      { id: '3',     num: '03', title: 'Manna',                  available: false },
      { id: '4',     num: '04', title: 'The Tempest',            available: false },
      { id: '5',     num: '05', title: 'Iris',                   available: false },
      { id: '6',     num: '06', title: 'Lost Flowers',           available: false },
    ]
  },
  vol2: {
    label: 'Vol. II',
    entries: [
      { id: '7',     num: '07', title: 'Contiguity',             available: false },
      { id: '8',     num: '08', title: 'Six Degrees of Separation', available: false },
      { id: '9',     num: '09', title: 'Ignorance is a Sin',    available: false },
      { id: '10',    num: '10', title: 'Theodicy',               available: false },
      { id: '11',    num: '11', title: 'Crux',                   available: false },
      { id: '12',    num: '12', title: 'Two Way Mirrors',        available: false },
      { id: '13',    num: '13', title: 'The Meeting',            available: false },
    ]
  }
};

const buildArchive = () => {
  const containers = {
    vol1: document.getElementById('archive-vol1'),
    vol2: document.getElementById('archive-vol2'),
  };
  if (!containers.vol1 && !containers.vol2) return;

  Object.entries(TESTAMENTS).forEach(([key, vol]) => {
    const c = containers[key];
    if (!c) return;
    vol.entries.forEach(t => {
      const li = document.createElement('li');
      li.className = 'archive-row fade-in' + (t.available ? '' : ' locked');

      const href = t.available ? `chapter.html?id=${t.id}` : '#';

      li.innerHTML = `
        <span class="archive-row-num">${t.num}</span>
        <span class="archive-row-title">${t.title}</span>
        <span class="archive-row-dots"></span>
        <span class="archive-row-status ${t.available ? 'open' : ''}">${t.available ? 'Open' : 'Coming Soon'}</span>
      `;

      if (t.available) {
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => window.location.href = href);
      }
      c.appendChild(li);
    });
  });
};

/* ═══════════════════════════════════════════════════════════════
   CHAPTER CONTENT
   To add content to a testament: add a key matching the id
   from TESTAMENTS above. Each entry is an array of paragraph
   objects: { type: 'p'|'sep'|'end', text: '...' }
   ═══════════════════════════════════════════════════════════════ */
const CHAPTER_CONTENT = {
  alpha: {
    vol: 'Testament α',
    title: 'When We Met',
    date: 'November 2nd / 03:15',
    body: [
      { type: 'p', text: `The soft hum of my computer filled the room, its faint glow washing over the walls. I sat hunched at my desk in my ergonomic chair, buried in a heap of code. It was long past midnight, and the world beyond my sliding doors felt distant and irrelevant. Everything that mattered existed here, within the quiet confines of my home.` },
      { type: 'p', text: `'Why isn't this damn thing working?' I kept asking myself. The algorithm was complex, too complex for a simple syntax error. But the compiler stubbornly refused to do its job. The rolling of my scroll wheel became more and more frantic as I scrolled through the core code I had been writing for days now, my tired eyes scanning every line.` },
      { type: 'p', text: `With each line my mind started to go blank slowly. Even if this program as a whole had a monumental purpose, and each instruction had its calculated use, it all felt pointless, at least to me. My frustration grew with each scroll. It wasn't the lines of code that I was seeing by now, it's as if my life was flashing before my eyes, on my screen.` },
      { type: 'p', text: `"Why am I even alive? |"` },
      { type: 'p', text: `Those were the first words my mouth spoke in days, the first raw thought I saw after endless scrolling. The line sat at the bottom of the source code — a pure string of text, a fatal, unauthorized command I had somehow typed in.` },
      { type: 'p', text: `"Why am I even alive?" I repeated, staring blankly at the flickering cursor on my screen, going in and out with each second. The irrelevant line, an accidental confession, was what caused the compile error, and it seemed to stop me from working.` },
      { type: 'p', text: `I swung around on my chair, away from my computer to face the dark room. It was barely being illuminated by my screen — like twilight. My eyes slowly adjusted to the dark room. My gaze drifted towards the fragmented light being reflected from a framed photo, placed awkwardly on top of my drawer. It was at the far end of the room, next to my bed.` },
      { type: 'p', text: `The photo that was behind the broken glass frame was of a woman and her son, the son who after 7 years from when the picture was taken, will live to be in complete isolation from the world outside of him.` },
      { type: 'p', text: `'What would you think of me, if you saw me like this?' I wondered, staring aimlessly at the photo, deep into the eyes of my mother, which were full of life back then.` },
      { type: 'p', text: `I lost her to an illness that became severe from her mid-forties. Now that I look back on it, she always had the symptoms for as long as I can remember. Things became worse with time, she became hospitalized by the time I entered university, age 18.` },
      { type: 'p', text: `Her doctors found it more and more difficult to find a cure, so they decided to only treat the symptoms, and I—` },
      { type: 'p', class: 'italic-line', text: `I closed my eyes to force my trail of thoughts to a halt.` },
      { type: 'p', class: 'italic-line', text: `'I know why I'm alive.'` },
      { type: 'p', class: 'italic-line', text: `'I know what I'm working for.'` },
      { type: 'p', text: `I told myself with the last bit of strength my feeble body had in me by now. The lack of food and sleep has for sure driven me to the brink of insanity, with the only thing between me and a mental asylum being a doctor's prescription.` },
      { type: 'p', class: 'italic-line', text: `"I just have to keep on working."` },
      { type: 'p', class: 'italic-line', text: `"Yeah."` },
      { type: 'p', class: 'italic-line', text: `"This too, shall pass, right?."` },
      { type: 'p', class: 'italic-line', text: `"Everything will just disappear one day."` },
      { type: 'p', class: 'italic-line', text: `"This too, shall pass."` },
      { type: 'p', class: 'italic-line', text: `"That's right."` },
      { type: 'p', class: 'italic-line', text: `"I know why I'm alive."` },
      { type: 'p', text: `I went on rambling out loud this time. I leaned hard against my chair, stretching out my body after hours of hunched work with little to no mobility. Although my body was losing touch with my mind, I was sure of the answer.` },
      { type: 'p', class: 'italic-line', text: `"Do you really now?"` },
      { type: 'p', text: `I turned over to look at where it came from, and there she was. On the edge of my balcony sitting with her legs crossed, her hair as dark as a raven — tied into a low bun with a golden hairpin — shaped like a dead branch.` },
      { type: 'p', text: `Her fringes wavering inwards by the cold breeze, the calm stare from her eyes of bright golden amber — almost as if they were subtly glowing to the moonlit backdrop. Looked deep past my soul.` },
      { type: 'p', text: `My brain could barely think anymore, let alone question what was before my eyes. Was I seeing things?` },
      { type: 'p', text: `"Careful now, if you keep leaning on that chair much longer, you might reduce your life span by a few years." She said, her voice carrying a caring tone with an underlying smugness to it.` },
      { type: 'p', text: `Nope, it wasn't a hallucination. The surroundings are consistent with her being physically there. Just what the hell is even happening?` },
      { type: 'p', text: `I slowly sat up straight, correcting my posture. So many questions ran through my head, and none came out of my mouth. All I could do was stare back into her cat-like black pupils. The longer I looked, a recent feeling crept up my spine. Staring at those eyes, was like staring at my screen when I was scrolling down my code lines.` },
      { type: 'p', text: `"Are… you the angel here to take my life?" I asked her without even thinking how absurd the question was, or how strange of a situation I was in. I felt like any question I could think of wouldn't make much sense.` },
      { type: 'p', text: `I was at a point in life where I just wished that I could disappear out of existence. Sink into nothingness.` },
      { type: 'p', text: `"Well," the girl chuckled, struggling to maintain her composure. She got down from my balcony railing with a playful hop — holding both her hands behind her back, and then slowly walked into the room through the opened sliding door.` },
      { type: 'p', text: `The atmosphere changed into something I had never seen in my life — both of pure beauty and haunt, as the hair on my neck rose. All I could do was stare in awe at the sight:` },
      { type: 'p', text: `She stood before me, as the moonlight cast its gentle glow onto her figure, her eyes glowed even brighter to the backdrop of the full moon.` },
      { type: 'p', text: `She extended a hand to me, like dark vines growing towards the sun with grace, only to distort its light; while black flames slowly erupted into the shape of a pair of wings from below where her rib cage was — over the black lace dress she wore.` },
      { type: 'p', text: `The flames withered out, leaving a pair of feathered wings of black and marginal coverts of gold. The room was filled by a rather strange aroma: Lilies.` },
      { type: 'p', text: `She was hauntingly beautiful, but whatever was beautiful still sent chills down my spine. Her lips curved into a gentle smile as she said;` },
      { type: 'p', class: 'italic-line', text: `"I am the angel here to make sure thou art alive."` },
      { type: 'p', text: `Despite what should have been reassuring words, I couldn't shake off the feeling of uneasiness that crawled all over my neck from the very moment she appeared.` },
      { type: 'p', text: `"For I am Azrael, the Summoner of Souls, and the Archangel of Death. Thou may address me as… Rae." She finished her introduction in a theatrical way. Her wings then withered out of existence into the black flaming smoke from which they had first erupted from.` },
      { type: 'p', text: `There was a moment of silence; all that could be heard was the hustling wind, and the humming computer. Azrael continued to stare at me with her fixed expression, before raising an eyebrow.` },
      { type: 'p', text: `"Well? Say something," she tilted her head, expecting some kind of reaction from me. While my face — by contrast, looked like the identical twin of a Moyai Statue made of wet concrete.` },
      { type: 'p', text: `I closed my eyes, letting out a sigh, and turned to my computer to leave it in sleep-mode. I took the long elastic hair tie from my table and wrapped it around my wrist, before finally sluggishly getting off my chair, and walking right passed Azrael.` },
      { type: 'p', text: `Her expression turned from confusion to complete shock, staring blankly at where I was sitting moments ago, as I walked past her.` },
      { type: 'p', text: `"W-wait, huh?!" she exclaimed, her voice abandoning its previous calm composure. Now, it was infused with bewildered disbelief, rising in pitch as if she had been physically bitch-slapped in public.` },
      { type: 'p', text: `I slid into my bed, under the sheets of both clean and dirty laundry — which I couldn't tell apart. My eyelids weighed heavy with exhaustion, as Azrael's rants from across the room demanded a response. With a sigh, all I could muster up was a defeated whisper:` },
      { type: 'p', class: 'italic-line', text: `"Well, fuck my life."` },
      { type: 'sep' },
      { type: 'end' },
    ]
  },
  '1': {
    vol: 'Testament 1',
    title: 'A Death Wish',
    date: 'November 2nd / 07:21',
    body: [
      { type: 'p', text: `The soft glow of Saturday dawn began to seep through the curtains, casting its pale light into the cluttered room as consciousness forcefully crept into my mind. I couldn't sleep any longer. My body — wired by a chaotic, nocturnal life, had abruptly cut my sleep short. Four hours was all I was going to get, and there was no point fighting it.` },
      { type: 'p', text: `I found myself tangled in a mess of sheets and clothes. The events of the previous night felt like a distant dream, but Azrael's presence still felt very real. I slowly opened my eyes to look around the room, the clutter was exactly as I had left it. But the slider door to the balcony was now closed.` },
      { type: 'p', text: `"How considerate of her." I thought, attempting to recollect fragments of what had happened last night. "I shouldn't have been like that to her, now that I think about it."` },
      { type: 'p', text: `I looked over to the balcony where she sat. "I wonder where she is now."` },
      { type: 'p', text: `Despite feeling bad, the voice of reason whispered in the back of my head, urged me to confront the reality of the situation. Azrael, the Angel of Death, showed up to me last night, claiming to be the harbinger of life rather than its end.` },
      { type: 'p', text: `"How disappointing", I muttered as I dragged myself out of bed, the weight of exhaustion still heavy upon my shoulders. Stumbling towards the messy kitchen, my movements were sluggish and uncoordinated. What was animating my aching body was the feeling in my gut.` },
      { type: 'p', text: `This frequent uneasy feeling of emptiness clawing my stomach wasn't hunger. The hollow thirst in me was the persistent craving pulsing through my brain: caffeine.` },
      { type: 'p', text: `I had always preferred hand-brewed coffee over the ones that are machine-brewed. This was a habit I caught on thanks to an old friend of mine. I started by gathering the tools: the manual burr grinder, the scale, the kettle filled with pristine water, and finally, the most important one…` },
      { type: 'p', text: `I moved to the cabinet housing the French Press, in it — there were two of them. Both were custom-made and were gifted to me by him. One of them was worn from years of use since our university days. The other, identical in appearance but starkly new, remained untouched from the day it had arrived — nearly two years ago.` },
      { type: 'p', text: `I took the worn-out Press, closing the cabinet door on the other one with a sharp click. I reached for the bag of Robusta coffee beans, which is said to be the world's most caffeinated variety.` },
      { type: 'p', text: `I had shipped from the Death Wish Coffee Co., known for infamously marketing themselves as "world's strongest coffee", and for a pretty good reason at that.` },
      { type: 'p', text: `I took a slow glance at the bag of coffee beans that I had sealed with a rubber-band after my previous use, its red & black packaging was sealed by the company logo over the white letters forming the words 'Dark Roast'. My eyes didn't avert from the skull with the cross bones, embellished by the company's name around it:` },
      { type: 'p', class: 'italic-line', text: `Death Wish.` },
      { type: 'p', class: 'italic-line', text: `"Is there really such a thing?"` },
      { type: 'p', text: `I wondered, as I removed the rubber-band and put it on my wrist for safe keeping. I opened the bag and carefully measured out a generous portion of beans, their coarse texture promising a potent brew. I placed the beans into the grinder and began my methodical work.` },
      { type: 'p', text: `The rhythmic whir of the grinder filled the air as it transformed the beans into a uniform grind thanks to the conical burr within it, releasing an enticing fragrance that rivalled the already rather strangely sweet fragrance of the kitchen. The coarse grind size is crucial to prevent over-extraction and minimize sediment in the final brew.` },
      { type: 'p', class: 'italic-line', text: `"Nobody wants to die. Nobody really, truly wants to embrace death, do they?"` },
      { type: 'p', text: `I went on in my head. With precision born of experience, I heated the water in the kettle, watching the thermometer climb steadily to the optimal 93 degrees Celsius, or about 200 degrees Fahrenheit.` },
      { type: 'p', text: `Once reached, I poured the hot water over the waiting grounds, my movements deliberate and controlled to maintain my desired 1:18 coffee-to-water ratio. The coffee bloomed, releasing its full flavor potential with each passing moment.` },
      { type: 'p', class: 'italic-line', text: `"What those people want is relief from their suffering, their problems, their worries."` },
      { type: 'p', text: `I gave it a gentle stir to agitate the grounds, coaxing out their hidden depths and flavors. The French Press's lid is placed delicately atop the vessel and was set to wait for about 4 minutes.` },
      { type: 'p', class: 'italic-line', text: `"They don't want to die. They're afraid of failing to live up to their full potential. Afraid to live life, resorting to death."` },
      { type: 'p', text: `With a steady hand, I pressed down on the plunger, slowly and steadily for the grounds to be separated from the coffee.` },
      { type: 'p', class: 'italic-line', text: `"But we all suffer, we all have problems, we all have worries. Sometimes more than others, and sometimes less."` },
      { type: 'p', text: `As the rich, dark liquid began to drip into the waiting mug below, anticipation was racing through my veins, just as the thoughts in my head. The result should be perfect to replenish the body, and like so, the process should be perfect to replenish the mind. The slightest mistake would feel suffocating to me.` },
      { type: 'p', class: 'italic-line', text: `"Would be pretty stupid to compare these things, because we all suffer differently, we all have our problems, and we all have our worries. Sure."` },
      { type: 'p', text: `Finally, the brewing process was complete. I poured the steaming brew into my mug, a broken black one fixed using kintsugi; its vine-like cracks were filled in by gold.` },
      { type: 'p', class: 'italic-line', text: `"Then again, they're what we sew after all, shouldn't we be there to reap them?"` },
      { type: 'p', text: `The coffee's aroma enveloped me as I brought it closer and closer to my lips. I took the first sip — allowing the intense flavour to wash over my senses. Bitterness mingled with the robust, earthy notes, creating a bold and invigorating experience. More importantly, I could feel the caffeine doing its work. The dopamine rushed through my body, satisfying my mind with a feeling of subtle high.` },
      { type: 'p', class: 'italic-line', text: `"Lesser than humans, who are afraid to live."` },
      { type: 'p', text: `As the rays of sunlight bathed the room in golden hues, with my mind finally free of its chains of drowsiness, I walked over with the cup of coffee in my hand to the small circular dining table to take a seat.` },
      { type: 'p', text: `I began to replay the events of last night in my head with each small sip. It was a bizarre encounter, one that defied all logic and reason. But here I was, seated in my dumpster of a kitchen, grappling with the reality of what had transpired the night before.` },
      { type: 'sep' },
      { type: 'p', text: `I took another sip of coffee, allowing its warmth to spread through my body, grounding me in the present moment. Despite my initial shock, curiosity gnawed at me. Why me? My life to this point has been of pure insignificance. Why now? Have I done something wrong? And why would the Angel of Death claim to be the harbinger of life? Where is she now?` },
      { type: 'p', text: `With these questions swirling in my mind, I couldn't simply dismiss Azrael as a figment of my imagination. I needed data. Setting down my mug, I pulled my phone out of my pocket, intending to find answers.` },
      { type: 'p', text: `I ran a quick search on the Nexus browser. I typed 'Azrael Archangel of Death' and any other keyword I could find. I scrolled through the first five pages. Old religious texts, terrible Wikipedia entries, and links to some guy trying to sell "Heavenly Scented" candles. My face tightened.` },
      { type: 'p', text: `"Yeah. Right..." I muttered, but I kept scrolling, dropping the formality for a more desperate search, then tried the AI search option. Nothing useful was generated so I moved to the time-tested method: Reddit.` },
      { type: 'p', text: `The signal-to-noise ratio was exactly zero. Every thread was either a cosplay convention or a cry for psychiatric help. One post detailed a lengthy conversation with Azrael after finding a supernatural notebook that granted the power to kill anyone simply by writing their name and visualizing their face.` },
      { type: 'p', text: `I gave up, and considered asking for help as I stared at the phone blankly. My finger hovered over the 'Create Post' button, where I could detail the winged woman who called herself 'Rae'. But that was dumb. Posting would only attract either idiots or the people I was actively trying to avoid.` },
      { type: 'p', text: `I locked the screen and tossed the phone onto the table. "No matter what I look up, her reasons for trying to keep me alive would only be known to her. It's not like I could find concrete data on her anyway."` },
      { type: 'p', text: `I reached for my mug and took a large gulp of coffee, the intensity of the flavour momentarily cutting through the mental fog. I stared into the bottom of the empty mug, my reflection — a distorted, tired version of myself — staring back.` },
      { type: 'p', class: 'italic-line', text: `"What is there to even gain from someone like me?"` },
      { type: 'p', class: 'italic-line', text: `"After all, why else would she be willing to keep me alive?"` },
      { type: 'sep' },
      { type: 'p', text: `The question hung there, unsatisfying and unanswered. The temptation of staring at the bottom of my mug finally caught up to me. I needed the hit. I needed the break.` },
      { type: 'p', class: 'italic-line', text: `"One more wouldn't hurt, would it?"` },
      { type: 'p', text: `With a sigh, I poured myself another mug of the bitter brew, the warmth seeping into my chilled bones. The events of the night before seemed surreal, yet the memory of Azrael's piercing gaze remained vivid in my mind. I couldn't shake the feeling that my life was about to take a drastic turn, whether I liked it or not.` },
      { type: 'p', text: `"What were you really here for?" I went on, while taking tentative sips of the coffee. I braced myself for the inevitable confrontation with the unknown. Azrael had disrupted the fragile semblance of normalcy that I clung to, thrusting me into a world of complete uncertainty.` },
      { type: 'p', text: `Whether by fate or mere chance, I was left to navigate the tangled web of whatever destiny-bullshit that was waiting for me.` },
      { type: 'p', text: `I walked away from the kitchen bar-table towards the dining table. I paused as my stomach let out a small bellow — hunger. It's a sense my mind has grown numb to, even though my body hasn't.` },
      { type: 'p', text: `"I haven't had anything since last dinner... for the past two days." I remembered, changing course towards my refrigerator. With each step closer, something felt odd. The closer I got, the more the scent of my coffee faded, as it was enveloped by the much stronger scent that's been present since I've entered the kitchen.` },
      { type: 'p', text: `No. Ever since I woke up.` },
      { type: 'p', class: 'italic-line', text: `"Huh... Lilies..."` },
      { type: 'p', text: `The chilling cold breeze hit me, as I opened my freezer with one hand, with my half-emptied mug of coffee on the other. All there was left were some ice-cubes. "Mental Note: Need to buy some fish. And maybe some chicken too." I made a note to myself.` },
      { type: 'p', text: `"It's been a while since I've made food," I thought. It's easier to just order food to your doorstep. Even so once in a while, I tend to feel the cravings for home cooked meals. They give me a subtle sense of nostalgia, something I feel ashamed to enjoy.` },
      { type: 'p', text: `I closed the freezer and crouched over to open the fridge. To my surprise, it was basically empty. All that's left was some leftovers from days ago, a carton of milk without the cap on, and the little bowl of coarsely ground coffee beans, soaked in water.` },
      { type: 'p', class: 'italic-line', text: `"...Weird, I'm sure I had more stuff in here, like a whole loaf of bread. Where on earth that milk carton's cap go?!"` },
      { type: 'p', text: `I slowly closed the fridge's door shut, and wallowed deep in thought, only to have a pair of golden eyes locking onto mine with an intensity so much so it cleared my bowel system.` },
      { type: 'p', text: `"Goo' morf'ing!" she greeted me, with a plain slice of bread hanging from her mouth, and the whole damn half-a-loaf wrapped under her arm. I went tumbling backward in shock, with a tiny squeak following a gasp.` },
      { type: 'p', text: `The mug in my hand slipped through my fingers, and all that I could feel the very next moment, was my schlong being boiled by the hot coffee seeping into my pants. I yelped, as the coffee absorbed through each layer of my clothing, slowly burning my skin with the sensation of my crotch being acupunctured.` },
      { type: 'p', text: `My screams broke the silence for the first time this morning, and definitely startled Azrael, whose plain slice of bread fell out of her mouth. She leaped to get a piece of cloth that was hanging on the cabinet handle besides the tower of dirty dishes.` },
      { type: 'p', class: 'italic-line', text: `"I-I I'm so sorry! L-Let me help you with that!"` },
      { type: 'p', text: `The moment I saw her hand reach out for my burnt area, I started to back away on my rear, pushing myself away from her with my legs, as if my nuts were being hunted down by a pack of hungry squirrels, until my back was flat against the wall.` },
      { type: 'p', text: `It's been so long since I've made close physical contact with anyone, even the thought of something as simple as a handshake felt foreign to me. "N-no hold it right there! Stay back! I'm perfectly f-fine!" I stammered, trying to hide the excruciating pain my nether region was enduring.` },
      { type: 'p', text: `"What do you mean you're fine?! Y-your... t-thing down there... is literally smoking!" she exclaimed frantically, her voice rising in pitch with each word. She wasn't wrong. The wisps of hot vapor still erupted from between my legs, maybe it's sign that something else might never 'erupt' ever again in my lifetime.` },
      { type: 'sep' },
      { type: 'p', text: `I struggled as I tried to pull myself up again, using the wall behind me to crawl my way up. With each inch I rose from the ground, the hot coffee began to obey gravity, flowing its way down my legs. The pain spread like wildfire down my pants, as if I had fire-ants poured into them.` },
      { type: 'p', text: `"Just...-ow- w-wait right here-ow-ow-ow." I instructed Azrael, whose face was somewhere between concern and a pained expression. I scooted my way up to my room and grabbed a pair of new cloths, and then stumbled into the bathroom to clean myself up and change.` },
      { type: 'p', text: `As I stood in the bathroom, the cold water from the shower felt like heaven upon the raging hell's inferno down in my nether region. The pain slowly began to subside as I washed away the remnants of coffee from my body. Although the skin was somewhat red, it wasn't too bad.` },
      { type: 'p', text: `I gently wiped the burnt area only to wince in pain at the sting deep below my skin. Once I was cleaned up and dressed in fresh clothes, I turned to the bathroom-mirror to take a good look at myself.` },
      { type: 'p', text: `The bags under my grey eyes had gotten progressively darker, my hair — somewhere between both straight and wavy, in pearl white was as messy as ever, but gotten slightly longer than I remembered. I took the hair-tie off my wrist and placed it between my teeth. Then I took a hand full of hair from the back of my head, before tying it into a small low-pony tail with the hair tie.` },
      { type: 'p', text: `I continued to look deep into the mirror, trying to formulate my thoughts and process what had just happened. "Either she must've stayed here, or she arrived this morning." I started off with something simple to ground myself. "Seems like she's not planning on leaving until she gets what she's here for." I reasoned. But my train of deep thoughts were interrupted by my gut, begging for nourishment.` },
      { type: 'p', text: `I made my way back to the kitchen where Azrael was seated — waiting anxiously. She looked sheepish with a cloth in hand, still holding the half-a-loaf of bread. She seemed genuinely concerned, her golden eyes softening as she saw me approach the table she was sitting on.` },
      { type: 'p', text: `"I'm… so sorry about that," she apologized, her voice laced with genuine remorse. "I didn't mean to startle you or cause you any harm."` },
      { type: 'p', text: `I waved her apology away, though still feeling a twinge of discomfort from the burns. "It's alright," I muttered, trying to brush off the embarrassment. "I should have been more careful." I told her, as I took my seat on the chair that was right across from her.` },
      { type: 'p', text: `I didn't have the heart to be upset about what happened a few minutes ago. I placed my elbows on the table, closing my hands with my fingers intertwined so I could rest my chin atop of it.` },
      { type: 'p', text: `"Let's… cut the chase and get to the point, Azrael."` },
      { type: 'p', text: `"Why exactly are you here?"` },
      { type: 'p', text: `She closed her eyes, and relaxed her face into a gentle smile before answering. "It's like I said, I'm here to make sure you stay alive." She gave the very same response she had given me the day before.` },
      { type: 'p', text: `It almost sounded robotic, as if it was a response from a poorly programmed auto responder, with limited NLP and response variation. I decided to get to the finer details, the ones that have been haunting my mind all morning.` },
      { type: 'p', text: `"Why would the angel of death be here to make sure I'm not going to die?" the voice of reason animated my mouth, as the thirst for answers plagued my consciousness. There was a pause, and Azrael leaned back against the chair, still maintaining her calm expression.` },
      { type: 'p', text: `"That's because it's a part of my job too." She said, tilting her head to the side.` },
      { type: 'p', text: `I fired back, "Why? Is there something that's a threat to my life?"` },
      { type: 'p', text: `"Maybe, you could say that." She replied, taking a new slice of bread.` },
      { type: 'p', text: `I couldn't see the conversation going anywhere. Even if Azrael was answering every question that I threw at her, it still felt like there was an invisible wall between the two of us. A wall built by none other than Azrael. A wall to keep me away from knowing the truth — whatever she was hiding.` },
      { type: 'p', text: `The desperation for answers, despite the fact they were right before me, made me impatient, "Then what is it? What's going to be such a threat that's making you stick around, not letting me live my life in peace?" I fired in rapid succession.` },
      { type: 'p', text: `There was another pause, as she stared deep into my eyes for a moment, with a blank yet calm expression, as if she was looking at something beyond me, or at least, beyond the me before her.` },
      { type: 'p', text: `She moved her head towards the bread in her hand, while not breaking eye contact. She slowly parted her lips to ask a question, before taking a small first bite:` },
      { type: 'p', class: 'italic-line', text: `"Do you happened to have a death wish, Adoniel?"` },
      { type: 'p', text: `More silence ensued. She said my first name, one that I haven't heard being addressed by in ages. I couldn't tell whether it was the question itself or the fact she called me by my name which caught me off guard, let alone hit something deep inside me.` },
      { type: 'p', text: `"Why do you think that I have a death wish?"` },
      { type: 'p', text: `Azrael raised her head to meet my gaze. She swallowed the piece she had taken, and slightly tilted her head over to the side,` },
      { type: 'p', class: 'italic-line', text: `"If this life you were living till now was peaceful, then was it really something without a death wish?"` },
      { type: 'p', text: `She responded, to which the words came out of my mouth without a single thought, and they stung me.` },
      { type: 'p', text: `"Why would something like having a death wish matter to how a person lives?" Even though it's what I believe to be the truth, I couldn't help but feel the weight of the words I spoke.` },
      { type: 'p', text: `"It does affect someone's lifespan to an extent, you know?" Azrael said, now keeping her hands down on the table gently after finishing the slice. One hand on top of another, after placing the half-loaf of bread on her lap. "A person with a death wish reduces their lifespan, at a pace much faster than the natural progression of life."` },
      { type: 'p', text: `Her words, although spoken with absolute seriousness, still sounded kinda bizarre to me. The concept of one's life span influenced by one's mindset didn't make any sense to me at all.` },
      { type: 'p', text: `"There's no way something like a death wish works as some kind of axiom to someone's life span, right?" I argued.` },
      { type: 'p', text: `She looked sharply at me, as if I was not seeing the bigger picture. "If circumstances were to affect one's mindset, and one's mindset affects one's actions, they have to correlate if someone's life span were to rapidly reduce." She explained before she continued.` },
      { type: 'p', text: `"With mindset being the bridge between the other two factors, it's something that makes me curious, you know?" Azrael said.` },
      { type: 'p', text: `I thought for a moment, her explanation would only make sense if...` },
      { type: 'p', class: 'italic-line', text: `"Why does it sound like... the human lifespan is something that's... predetermined?"` },
      { type: 'p', text: `My heart raced at this possible revelation. This could mean life is destined to end at a specific moment for each person, the maximum potential of one's life span and no more, but lessens depending on factors that affect their life.` },
      { type: 'p', text: `"All life that was born from ashes, are predetermined to return to ashes in due time. Yet death is indeterminate. They say that death is one of the five primordial constants, Adoniel."` },
      { type: 'p', text: `The aura around her changed, it was the same as it was the night before. It was something that of divine horror. But one thing is clear now, everything that lives is destined to die either on time or earlier. But that also could imply that...` },
      { type: 'p', text: `"Wouldn't that mean, free will is… a lie? Every circumstance we ended up in, every choice we've made, every feeling we've felt, every action we've taken, were all predetermined? None of it truly mattered in the grand scheme of things."` },
      { type: 'p', text: `I asked her after thinking about it, but the thought didn't make my heart sink, but rather made me accept what seemed to be the narrative that was placed before me. Azrael reached into the bag on her lap for another slice of bread.` },
      { type: 'p', text: `"Not really, that's where you're wrong."` },
      { type: 'p', text: `She calmly said, taking a bite and swallowing it before continuing.` },
      { type: 'p', text: `"Think of it like an ever-flowing river born from a mountain top of a fixed altitude, even if it's predetermined to reach the sea — because of natural forces; The path it flows down the mountain isn't predetermined, it depends on multiple factors."` },
      { type: 'p', text: `She was right, that would mean the only thing that was always predetermined was death itself, the life we lived is something that's determined by how we live it, regardless how we live it. I gave it a thought for another moment, as a new question popped up.` },
      { type: 'p', text: `"But the slope isn't always going to be a constant, right?" I asked, "There are times, where the flow of the river is faster and sometimes slower. Sometimes the river stagnates on the mountain. Isn't there a way that life is —"` },
      { type: 'p', text: `"A human can't be immortal or prolong their life beyond what's already fixed." There was a subtle shake to her voice as she cut me off, "I know that the nature of this mountain wouldn't permit that." her eyes had a hint of regret. I wonder what made her react this way.` },
      { type: 'p', text: `"But if you're saying that you're here to make sure I'm alive, does that mean you know when and how exactly my river will reach the sea?"` },
      { type: 'p', text: `"Well, of course, I know when you'll die."` },
      { type: 'p', text: `The atmosphere thickened so much so at those words, you could cut it with a knife. She answered half of my question, again ignoring the other half. The thought of having my life being watched like an hourglass, waiting for it to be emptied, dried the walls of my throat.` },
      { type: 'p', text: `Azrael pointed at me with a new slice of bread in her hand, "Us angels of death can know when a human's lifespan runs out, by looking above their heads." She revealed. "We can tell how much time they have left, if the numerals above go down in a steady pace, but if it were to change with a huge leap or wobble a lot, that's how you know there are altering slopes to the river, you know?"` },
      { type: 'p', text: `She went on, with her eyes starting to glow a faint gold. "In your case, yours is doing Olympic levels of leaping." She ended, finishing her slice of bread while at it.` },
      { type: 'p', text: `I took my time to process the information I had received; it was surely something that's a lot to take in. Even so, it won't stop me from gaining an understanding of my situation.` },
      { type: 'p', text: `"So why don't you tell me, how much time I'm left with?"` },
      { type: 'p', text: `"No can do." She swiftly responded. "If a human were to learn when they'd die, it'll change their perception of life, and could even lead them to meeting their end sooner than intended." I sat rooted on my seat, as she went on. "Which is exactly why us angels of death should never mention someone's day of passing, or how long they have till they pass."` },
      { type: 'p', text: `"But I don't mind—" I began, only to be cut off.` },
      { type: 'p', class: 'italic-line', text: `"Asking Death when you'll die, is no different from having a death wish."` },
      { type: 'p', text: `I couldn't respond immediately. But her first question made much more sense now, and still, I could tell she's hiding things from me whenever I ask her directly with no room for answers.` },
      { type: 'p', text: `It looked like she wouldn't be leaving until my life has been reset to the day I'll be actually dying. But she keeps concealing what's causing the threat to my life or what makes my life worth needing to end properly without any gains to her.` },
      { type: 'p', text: `I couldn't get the answers I was looking for, but the answers that I did get were clues worth taking note of. The fact there are more than one angel of death, how life has a fixed ending, the way one can reduce their life span. All of these could be of use to getting closer to the truth, whatever it may be.` },
      { type: 'p', class: 'italic-line', text: `"No way in hell I have a death wish. There's a clear distinction between questioning life and not living life at all."` },
      { type: 'p', text: `I lowered my gaze and remained quiet, looking down blankly at the table. A moment of silence passed in thought, before my stomach began to let out a faint growl again.` },
      { type: 'p', text: `I slowly buried my face behind the back of hands, stationing my forehead against them. "Sorry, I haven't had anything to eat in a while now." I informed Azrael, who was giving a puzzled expression from my gastral outburst. Which reminded me...` },
      { type: 'p', text: `"Speaking of which..." I drawled, pointing at the fridge as I got her attention.` },
      { type: 'p', text: `"...Do you happened to know what happened to my fridge?"` },
      { type: 'p', text: `Azrael flinched; her composure slowly morphed into that of a sorry little puppy who took the biggest dookie in its life right on the carpet. You could see the nervousness creep in across her face, as she spread out a thin crooked smile. She swiftly turned her head.` },
      { type: 'p', text: `"I don't know what you're talking about. I checked this morning myself and it was working perfectly fine! Far better than the wooden ones — with a huge block of ice!" She said nonchalantly, going for another bite of the bread.` },
      { type: 'p', class: 'italic-line', text: `"Why you little shit…"` },
      { type: 'p', text: `I yanked the bread off from the clutches of her teeth, "Give me a good reason, as to why I shouldn't smack that head of yours off of your goddamn shoulders." I hissed at her. The hunger and frustration brought me to the brink of sanity once more, on top of that, and most importantly, this one is such a pain in the ass.` },
      { type: 'p', text: `"Hey! I have my basic needs too just like anyone else, you know?" She pouted. The audacity of this girl for freeloading off my fridge and then lecture me on basic-needs. "Fulfill your own needs by yourself then, besides do angels even need to eat?"` },
      { type: 'p', text: `"Indeed, we do!" She said, with somewhat of pride in her voice — laced with a dramatic flair. "We are given the food of angels through Shamayim — or what you humans call 'heaven'. It's called Manna." I walked over to the fridge.` },
      { type: 'p', text: `"If you got Manna, then why wipe my fridge clean?"` },
      { type: 'p', text: `"W-well," Azrael stuttered. "There's been some s-shortage, a-and they restricted my access to Manna... o-only temporarily!" She responded, with a subtle embarrassment in her tone. Knowing this girl so far, I could think of two-hundred reasons as to why that might have happened. Not like it's any of my business anyway. Whatever the reason, it shouldn't come at the cost of my fridge stock.` },
      { type: 'p', text: `I swung the fridge door open; its contents remained the same as it was a while ago. The loaf of bread that went missing was in Azrael's clutches, now half emptied. But that doesn't explain the other items that went missing.` },
      { type: 'p', text: `"What about the other things?" I inquired, as Azrael looked over shoulder at me. Her expression still remained the same, if not with more nervousness, "I-I might have taken a little bit of somethings from here and there, just a little—"` },
      { type: 'p', text: `"You emptied the whole damn fridge, damn it! Only thing that's left in here is my bowl of soaked coffee beans." I fired at her, to which she protested.` },
      { type: 'p', text: `"That's because they tasted bitter, who would even eat that?!"` },
      { type: 'p', text: `I was at the verge of ripping my ears out, and shoving them up my ass. Those weren't meant to be eaten, but used for a quick cold brew of coffee in the evening, or whenever I feel too lazy to do the methodical brewing.` },
      { type: 'p', text: `"Well, that doesn't explain where the milk, maple-syrup and butter went, does it?" I asked, closing the fridge. Azrael fidgeted in her seat, twiddling her thumbs trying to find a way to hide the truth but couldn't, as she finally confessed to me.` },
      { type: 'p', text: `"I used them up to make the bread taste a little sweeter. But they ran out pretty quickly so now I'm just eating what's left."` },
      { type: 'p', text: `I felt my jaw hit the ground in shock. I could understand having a sweet-tooth but eating a whole raw stick of butter mixed with milk is just barbaric. Downright inhumane.` },
      { type: 'p', text: `"Mental Note: Need to buy the whole damn fridge."` },
      { type: 'p', text: `I came back to my seat, resting my chin in my hand, "Do you always raid people's fridge like this to sustain yourself? Everyday?" It was of genuine disbelief and curiosity.` },
      { type: 'p', text: `"Hey! don't think I'm some kind of a thief who just sneaks into people's house and raids their food storages! I'm a divine being of grace, you hear me?!" She began to yell, being offended by what I said.` },
      { type: 'p', class: 'italic-line', text: `"Divine being that empties my fridge with grace."` },
      { type: 'p', text: `Azrael continued to explain, "Besides, I've been opting to fruits and stuff found in the wild, why can't I have something different for a change?"` },
      { type: 'p', text: `"That's weird for an angel who get food from heaven. Isn't she an Archangel?" I wondered. "Then why eat the most random things in the kitchen, and make an abomination like... that." I asked her, trying not to throw up at her combination of food.` },
      { type: 'p', text: `"Well," she began, turning her head away swiftly, pouting without making eye contact with me. "I was never a cook. How am I supposed to know how to make food with more than one food? But even so..."` },
      { type: 'p', text: `Azrael opened her eyes gently, looking into the distance as if reminiscing the past.` },
      { type: 'p', class: 'italic-line', text: `"I sort of missed how Manna tasted like, so I tried to relive that feeling."` },
      { type: 'p', text: `She brought her eyes back to me, with a hint of sadness and yearning in them.` },
      { type: 'p', class: 'italic-line', text: `"Would it be a sin to still love what you've lost?"` },
      { type: 'p', text: `Her words struck a chord with me, after all it's a feeling that I've felt mere moments ago. Even though the context is something as simple as food — those words on a grand scheme of things — I know how much it meant. A part of me wanted to tell her that she was right. But all that my mouth could spew after a moment of silence was,` },
      { type: 'p', class: 'italic-line', text: `"I… don't know."` },
      { type: 'p', text: `More silence ensued, as we both looked down at the table, lost in thought. My gut broke the stillness with another growl. I let out a sigh, as I got up. Azrael, looked up at me, breaking her own train of thoughts. "Where are you going?" She asked me, as I checked the time on my wrist watch:` },
      { type: 'p', class: 'italic-line', text: `09:42` },
      { type: 'p', text: `Time sure does pass by quickly, after all it was an eventful morning. I turned my back to Azrael responding to her question as I headed upstairs to my room to get ready, "To the supermarket."` },
      { type: 'p', text: `I climbed the stairs; with each step my mind raced with thoughts. "It seems like the indirect approach is an effective way to get the truth from Azrael, rather than the direct approach." I realized.` },
      { type: 'p', text: `I entered my room to get dressed. It's been a while since I've left the house, let alone touched some grass. I took my door keys, my phone, my wireless EarPods, and my wallet from my desk.` },
      { type: 'p', text: `Before I left my bedroom, I paused. A glint of light struck me in the corner of my eye, one that came reflecting from the framed photo of my mother & I. Without a thought, I walked across my bedroom and towards the framed photo.` },
      { type: 'p', text: `It stayed in its place against the wall being lopsided. I picked it up from the shelf and dusted off the cobwebs carefully, making sure I don't cut myself from the broken glass frame. I looked into the photo once more, now the faces in it looked clearer.` },
      { type: 'p', text: `A feeling of bitter-sweet nostalgia spread across my face, before I properly set it back on the shelf, next to a little chest that I never brought myself to open. I backed off, still not taking my eyes off of the frame, before waving it goodbye.` },
      { type: 'p', text: `My mouth shaping the words, even if my voice didn't come out, despite knowing it wouldn't make any difference. As usual, I couldn't say it out loud.` },
      { type: 'p', class: 'italic-line', text: `"I love you too, mom."` },
      { type: 'p', text: `I finally set off down stairs to the kitchen, where Azrael was still in her seat — lost in thought with a somewhat melancholic expression. It was that of someone who was in search of something that they had lost, and in Azrael's case, maybe memories or feelings of nostalgia herself.` },
      { type: 'p', text: `I walked past her to the living room, to take my shoes off from my shoe-rack, and then headed to the front door. Light broke into the room through the gaps of the front door; from the outside world. I placed my hand on top of the door knob, and looked around to take a glance at Azrael, who stayed the same, silently staring down at the table.` },
      { type: 'p', text: `Sometimes I wonder what goes through other people's heads, but never bothered too much about it. But now, with her? I can't stop but wonder what she'd be thinking, since whatever the reason she's here for, concerns me too.` },
      { type: 'p', text: `"If the indirect approach is what's gonna get the answers I am looking for, then I'll have to do everything I could to get as much as I can." I thought, taking a deep breath, before I called out to her. "Azrael,"` },
      { type: 'p', text: `She lifted her head to meet my gaze, all the way from where she was at the dining table. Her eyes widened in a pleasant shock, in bright yellow like that of a floating lantern.` },
      { type: 'p', class: 'italic-line', text: `"You coming or what?"` },
      { type: 'p', text: `Her face brightened to my invitation, as she happily hopped out of her seat and rushed towards the front door. "Oh, of course! I'll be by your side to make sure you don't do anything that'll get you killed any sooner." She exclaimed with pride, despite how morbid it sounded. I turned the door handle without a response.` },
      { type: 'p', text: `I pushed the door wide open, the gentle breeze hit me across the face. A moment of bliss washed over me under the mildly greyed clouded sky, giving out a pleasant atmosphere. So much has happened within the last 24 hours than it ever did in the last year or so. Who knows what's more to come ahead from now on?` },
      { type: 'p', text: `"Well, what are you waiting for?" Azrael asked me.` },
      { type: 'p', text: `I gazed at her, and finally gave her a gentle nod, my blank expression unchanged. The sound of vehicles & people walking around to their daily lives, brought me from my daze back to reality.` },
      { type: 'p', text: `I don't care how I die before my time comes. But that doesn't mean it would make me stop being curious about it. As I took the first steps outside in a long time, all I could think at that moment was...` },
      { type: 'p', class: 'italic-line', text: `"I wonder, how much longer am I actually supposed to live for?"` },
      { type: 'sep' },
      { type: 'end' },
    ]
  }
};

// Build chapter navigation data
const CHAPTER_ORDER = ['alpha','1','2','3','4','5','6','7','8','9','10','11','12','13'];

const initChapter = () => {
  const container = document.getElementById('chapter-content');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'alpha';
  const data = CHAPTER_CONTENT[id];

  // Find prev/next
  const idx  = CHAPTER_ORDER.indexOf(id);
  const prevId = idx > 0 ? CHAPTER_ORDER[idx - 1] : null;
  const nextId = idx < CHAPTER_ORDER.length - 1 ? CHAPTER_ORDER[idx + 1] : null;

  // All testament metadata
  const allEntries = [...TESTAMENTS.vol1.entries, ...TESTAMENTS.vol2.entries];
  const prevMeta   = prevId ? allEntries.find(e => e.id === prevId) : null;
  const nextMeta   = nextId ? allEntries.find(e => e.id === nextId) : null;
  const thisMeta   = allEntries.find(e => e.id === id);

  // Update header
  const volEl   = document.getElementById('ch-vol');
  const numEl   = document.getElementById('ch-num');
  const titleEl = document.getElementById('ch-title');
  const dateEl  = document.getElementById('ch-date');

  if (data) {
    if (volEl)   volEl.textContent  = data.vol;
    if (numEl)   numEl.textContent  = thisMeta ? thisMeta.num : '';
    if (titleEl) titleEl.textContent = data.title;
    if (dateEl)  dateEl.textContent  = data.date;
    document.title = `${data.title} — Memento Mori`;

    // Build body
    data.body.forEach(item => {
      if (item.type === 'p') {
        const p = document.createElement('p');
        if (item.class) p.className = item.class;
        p.textContent = item.text;
        container.appendChild(p);
      } else if (item.type === 'sep') {
        const sep = document.createElement('div');
        sep.className = 'ch-inner-sep';
        sep.innerHTML = '•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•';
        container.appendChild(sep);
      } else if (item.type === 'end') {
        const end = document.createElement('div');
        end.className = 'ch-end-mark';
        end.textContent = 'Ƹ';
        container.appendChild(end);
      }
    });
  } else {
    // Coming soon
    container.innerHTML = `
      <div class="ch-coming-soon fade-in">
        <span class="ch-cs-label">Testament ${thisMeta ? thisMeta.num : id}</span>
        <span class="ch-cs-body">${thisMeta ? thisMeta.title : 'Untitled'}</span>
        <span class="ch-cs-label" style="margin-top:12px">Coming Soon</span>
      </div>
    `;
    if (titleEl) titleEl.textContent = thisMeta ? thisMeta.title : 'Testament';
    if (volEl)   volEl.textContent   = thisMeta ? `Testament ${thisMeta.num}` : '';
    if (dateEl)  dateEl.textContent  = '— / —';
  }

  // Navigation
  const prevBtn = document.getElementById('ch-prev');
  const nextBtn = document.getElementById('ch-next');

  if (prevBtn) {
    if (prevMeta) {
      prevBtn.href = `chapter.html?id=${prevMeta.id}`;
      prevBtn.querySelector('.ch-nav-label').textContent = prevMeta.title;
    } else {
      prevBtn.classList.add('inactive');
    }
  }

  if (nextBtn) {
    if (nextMeta) {
      nextBtn.href = `chapter.html?id=${nextMeta.id}`;
      nextBtn.querySelector('.ch-nav-label').textContent = nextMeta.title;
    } else {
      nextBtn.classList.add('inactive');
    }
  }
};

/* ── CONTACT FORM ───────────────────────────────────────────── */
const initContact = () => {
  const form = document.getElementById('mm-form');
  if (!form) return;
  const note = document.getElementById('form-note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (note) note.textContent = 'Message received. We will respond in due time.';
    form.reset();
  });
};

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeIn();
  initFooter();
  initLoadingScreen();
  initCountdown();
  buildArchive();
  initChapter();
  initContact();
});

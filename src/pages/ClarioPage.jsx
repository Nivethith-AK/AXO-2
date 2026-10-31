import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { useLenis } from '../components/SmoothScroll';
import CelestialCanvas from '../components/CelestialCanvas';
import ReaderOverlay from '../components/ReaderOverlay';
import SoundtrackPlayer from '../components/SoundtrackPlayer';

const HOW_STEPS = [
  {
    step: 'Step 1',
    title: 'Read the Novel',
    desc: 'Immerse yourself in the story of Adoniel and Azrael online. Clean, distraction-free chapters formatted for any screen.',
    badge: 'FREE WEB ACCESS',
  },
  {
    step: 'Step 2',
    title: 'Stream the Soundtrack',
    desc: 'Listen to cinematic master tracks composed by Δxolotl — designed to be experienced alongside each written chapter.',
    badge: 'ORIGINAL MUSIC',
  },
  {
    step: 'Step 3',
    title: 'Explore the Artwork',
    desc: 'Concept illustrations, sacred geometry, and animated trailers created in partnership with Project Eden.',
    badge: 'PROJECT EDEN ART',
  },
];

const FEATURES = [
  {
    title: 'Lossless Audio Stream',
    desc: 'Stream high-dynamic range master audio directly in your browser without lag.',
  },
  {
    title: 'Distraction-Free Reader',
    desc: 'Responsive reader with full keyboard navigation, font scaling, and theme matching.',
  },
  {
    title: 'Bi-Weekly Releases',
    desc: 'Regular chapter updates and soundtrack drops following Volume I schedule.',
  },
  {
    title: 'Mobile-Optimized',
    desc: 'Every chapter and audio control functions seamlessly across desktop and mobile.',
  },
  {
    title: 'Sacred Geometry',
    desc: 'Interactive celestial canvas with golden spirals and rotating orbital rings.',
  },
  {
    title: '100% Free & Ad-Free',
    desc: 'Zero subscriptions, paywalls, or third-party ads. Pure story and music.',
  },
];

const FAQS = [
  {
    num: '01',
    q: 'What is Memento Mori: A Reason to Live?',
    a: 'Memento Mori is an original web novel and musical universe created by composer and author Δxolotl. It chronicles Adoniel Togami, a programmer burdened with existential isolation, and Azrael, the Archangel of Death who arrives not to take his life, but to protect it.',
  },
  {
    num: '02',
    q: 'Where can I stream the music?',
    a: 'You can stream the official master track "Track Ω: To Eternity and After" directly on this site. The music is also distributed across Spotify, Apple Music, and YouTube.',
  },
  {
    num: '03',
    q: 'When are new chapters released?',
    a: 'Volume I chapters are released on a bi-weekly schedule. Chapter α ("When We Met") and Chapter I ("A Death Wish") are available now. Upcoming chapters will be announced on this website.',
  },
  {
    num: '04',
    q: 'Is the novel free to read?',
    a: 'Yes, 100% free. There are no paywalls or sign-ups required. You can open any chapter and read in the distraction-free manuscript viewer right in your browser.',
  },
  {
    num: '05',
    q: 'Can creators use the music in videos and streams?',
    a: 'Yes, creators are welcome to use the soundtrack in non-commercial YouTube videos and streams with proper credit to "Δxolotl — Memento Mori OST".',
  },
  {
    num: '06',
    q: 'How can I contact Δxolotl for licensing or inquiries?',
    a: 'Use the Contact terminal at the bottom of the page for music production, scoring inquiries, art collaborations, or press requests.',
  },
];

export default function ClarioPage() {
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, togglePlay, isPlaying } = useAudio();
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const lenis = useLenis();

  const handleReadAlpha = (e) => {
    e?.preventDefault();
    setSelectedChapterId('0');
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -75, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="clario-page-root">
      <CelestialCanvas geomReady={true} />

      {/* Clario-style Floating Navbar */}
      <nav className="mm-nav" style={{ zIndex: 9000, position: 'fixed' }}>
        <Link to="/" className="nav-mark" title="Back to Classic Home">
          Memento Mori
        </Link>

        <div className="nav-links">
          <a href="#how-it-works" className="nav-link" onClick={(e) => scrollTo(e, 'how-it-works')}>
            How it works
          </a>
          <a href="#bento" className="nav-link" onClick={(e) => scrollTo(e, 'bento')}>
            Bento
          </a>
          <a href="#features" className="nav-link" onClick={(e) => scrollTo(e, 'features')}>
            Features
          </a>
          <a href="#music" className="nav-link" onClick={(e) => scrollTo(e, 'music')}>
            Soundtrack
          </a>
          <a href="#editions" className="nav-link" onClick={(e) => scrollTo(e, 'editions')}>
            Editions
          </a>
          <a href="#faq" className="nav-link" onClick={(e) => scrollTo(e, 'faq')}>
            FAQ
          </a>
          <Link to="/" className="nav-link" style={{ color: 'var(--gold-bright)' }}>
            ← Classic View
          </Link>
        </div>

        <div className="nav-actions">
          <button className="nav-cta-btn cl-btn-magnetic desktop-only" onClick={handleReadAlpha}>
            <span>Read Chapter α</span>
          </button>

          <button id="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <svg className="theme-icon sun-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            </svg>
            <svg className="theme-icon moon-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>

          <button id="music-toggle" className={isMuted ? 'muted' : ''} aria-label="Toggle music" onClick={toggleMute}>
            <span className="music-icon-wrap">
              <img src="/assets/images/music_icon.png" alt="" />
              <svg className="music-mute-line" viewBox="0 0 19 19"><line x1="2" y1="17" x2="17" y2="2" /></svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Clario Hero Section */}
      <section className="clario-hero-section" id="hero">
        <div className="sec-inner" style={{ textAlign: 'center' }}>
          <div className="hero-artist-badge cl-float" style={{ margin: '0 auto 24px' }}>
            <span className="artist-spark">✦</span>
            <span>AN ORIGINAL WEB NOVEL &amp; SOUNDTRACK BY ΔXOLOTL</span>
          </div>

          <h1 className="clario-main-headline cl-reveal">
            Experience the novel and music — with clarity
          </h1>

          <p className="clario-hero-sub cl-reveal cl-stagger-1">
            All your chapters, illustrated panels, and original master soundtracks in one place — read, listen, and follow the universe with ease.
          </p>

          <div className="hero-cta-row cl-reveal cl-stagger-2" style={{ marginBottom: '48px' }}>
            <button className="btn cta-btn-primary cl-btn-magnetic" onClick={handleReadAlpha}>
              <span>Read Chapter α Free</span>
            </button>
            <button
              className="btn cta-btn-secondary cl-btn-magnetic"
              onClick={() => {
                const el = document.getElementById('music');
                if (el && lenis) {
                  lenis.scrollTo(el, { offset: -75, duration: 1.4 });
                } else if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
                if (!isPlaying) togglePlay();
              }}
            >
              <span>{isPlaying ? 'Pause Music' : 'Listen to Soundtrack'}</span>
            </button>
          </div>

          {/* Clario Dashboard/Centerpiece Preview Card */}
          <div className="clario-centerpiece-card cl-interactive-card cl-reveal cl-stagger-3">
            <div className="centerpiece-topbar">
              <span className="window-dot red" />
              <span className="window-dot yellow" />
              <span className="window-dot green" />
              <span className="centerpiece-title">MEMENTO MORI // OFFICIAL TRANSMISSION PLAYER</span>
            </div>
            <div className="centerpiece-content">
              <div className="centerpiece-track-meta">
                <span className="cp-badge">NOW STREAMING</span>
                <h3 className="cp-title">Track Ω: To Eternity and After</h3>
                <p className="cp-artist">Composed &amp; Produced by Δxolotl · Chapter α Official Score</p>
              </div>
              <button className="btn cp-play-btn cl-btn-magnetic" onClick={togglePlay}>
                <span>{isPlaying ? '❚❚ Pause Track' : '▶ Play Track'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clario 3-Step Process (How it Works) */}
      <section className="sec" id="how-it-works">
        <div className="sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-label c cl-reveal">Step-by-Step Experience</div>
            <h2 className="sec-title cl-reveal cl-stagger-1">How Memento Mori Works</h2>
            <p className="sec-body cl-reveal cl-stagger-2" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Designed for immersion. Move effortlessly between reading the story and listening to the music.
            </p>
          </div>

          <div className="clario-steps-grid">
            {HOW_STEPS.map((s, idx) => (
              <div key={idx} className={`clario-step-card cl-interactive-card cl-reveal cl-stagger-${idx + 1}`}>
                <div className="step-card-header">
                  <span className="step-badge">{s.step}</span>
                  <span className="step-num">0{idx + 1}</span>
                </div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                <div className="step-footer">
                  <span className="step-tag">{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clario Bento Section */}
      <section className="sec" id="bento">
        <div className="sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-label c cl-reveal">Chronicle Showcase</div>
            <h2 className="sec-title cl-reveal cl-stagger-1">Explore the Universe in Real Time</h2>
            <p className="sec-body cl-reveal cl-stagger-2" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Visual previews, released chapter manuscripts, and master soundtrack audio at your fingertips.
            </p>
          </div>

          <div className="clario-bento-grid">
            <div className="bento-card bento-large cl-interactive-card cl-reveal cl-stagger-1">
              <span className="bento-badge">ACTIVE RECORD</span>
              <h3 className="bento-title">Chapter α: When We Met</h3>
              <p className="bento-desc">
                Adoniel Togami sits before a frozen compiler screen late past midnight. An accidental syntax confession interrupts everything.
              </p>
              <button className="btn cl-btn-magnetic" style={{ alignSelf: 'flex-start' }} onClick={handleReadAlpha}>
                <span>Read Chapter α</span>
              </button>
            </div>

            <div className="bento-card bento-small cl-interactive-card cl-reveal cl-stagger-2">
              <span className="bento-badge">CHAPTER I</span>
              <h3 className="bento-title">A Death Wish</h3>
              <p className="bento-desc">The encounter with Azrael deepens on the moonlit balcony.</p>
              <button className="btn cl-btn-magnetic" style={{ alignSelf: 'flex-start' }} onClick={() => setSelectedChapterId('1')}>
                <span>Read Chapter I</span>
              </button>
            </div>

            <div className="bento-card bento-small cl-interactive-card cl-reveal cl-stagger-3">
              <span className="bento-badge">AUDIO ARCHIVE</span>
              <h3 className="bento-title">Master Soundtrack</h3>
              <p className="bento-desc">Lossless audio score produced by Δxolotl to accompany your reading.</p>
              <button className="btn cl-btn-magnetic" style={{ alignSelf: 'flex-start' }} onClick={togglePlay}>
                <span>{isPlaying ? 'Pause Score' : 'Play Score'}</span>
              </button>
            </div>

            <div className="bento-card bento-large cl-interactive-card cl-reveal cl-stagger-4">
              <span className="bento-badge">VISUAL RELAY</span>
              <h3 className="bento-title">Illustrated Manga Panels &amp; Trailers</h3>
              <p className="bento-desc">
                Concept art and illustrated manga pages crafted in collaboration with Project Eden.
              </p>
              <Link to="/chapter?id=0" className="btn cl-btn-magnetic" style={{ alignSelf: 'flex-start' }}>
                <span>Open Illustrated Viewer ↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full Integrated Soundtrack Player Section */}
      <div id="music" className="cl-reveal">
        <SoundtrackPlayer />
      </div>

      {/* Clario Features Section */}
      <section className="sec" id="features">
        <div className="sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-label c cl-reveal">Creative Design</div>
            <h2 className="sec-title cl-reveal cl-stagger-1">Built for Story &amp; Music</h2>
            <p className="sec-body cl-reveal cl-stagger-2" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Every feature exists to serve the story and the music without digital friction.
            </p>
          </div>

          <div className="clario-features-grid">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className={`feature-card cl-interactive-card cl-reveal cl-stagger-${(idx % 3) + 1}`}>
                <span className="feature-spark">✦</span>
                <h4 className="feature-title">{feat.title}</h4>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clario Testimonial Section */}
      <section className="sec">
        <div className="sec-inner">
          <div className="clario-testimonial-card cl-interactive-card cl-reveal">
            <div className="testimonial-eyebrow">
              <span className="dot-pulse" />
              <span>READER &amp; LISTENER COMMUNITY</span>
            </div>
            <blockquote className="testimonial-quote">
              “A hauntingly beautiful collision of modern existential isolation and ancient celestial mythology.
              The original soundtrack and prose breathe together as one living, emotional work of art.”
            </blockquote>
            <div className="testimonial-author">
              <div className="author-avatar">✦</div>
              <div className="author-meta">
                <span className="author-name">Project Eden Reader</span>
                <span className="author-role">Listener &amp; Reader Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clario 3-Card Releases / Editions */}
      <section className="sec" id="editions">
        <div className="sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-label c cl-reveal">Access &amp; Formats</div>
            <h2 className="sec-title cl-reveal cl-stagger-1">Simple Access Plans</h2>
            <p className="sec-body cl-reveal cl-stagger-2" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Free online reading for everyone, streaming music on all platforms, and upcoming physical collectibles.
            </p>
          </div>

          <div className="clario-pricing-grid">
            <div className="clario-pricing-card cl-interactive-card cl-reveal cl-stagger-1">
              <span className="pricing-badge">ACTIVE ACCESS</span>
              <h3 className="pricing-tier">Web Novel</h3>
              <div className="pricing-price-row">
                <span className="pricing-price">Free</span>
                <span className="pricing-period">/ forever</span>
              </div>
              <p className="pricing-desc">Read all released chapters online with distraction-free reader mode.</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Chapter α &amp; I available now</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Zero logins or advertisements</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Mobile &amp; desktop responsive</li>
              </ul>
              <button className="btn cl-btn-magnetic" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }} onClick={handleReadAlpha}>
                <span>Read Free Now</span>
              </button>
            </div>

            <div className="clario-pricing-card popular cl-interactive-card cl-reveal cl-stagger-2">
              <div className="pricing-badge-popular">MOST STREAMED</div>
              <span className="pricing-badge">STREAMING NOW</span>
              <h3 className="pricing-tier">Original Soundtrack</h3>
              <div className="pricing-price-row">
                <span className="pricing-price">Stream</span>
                <span className="pricing-period">/ lossless audio</span>
              </div>
              <p className="pricing-desc">Listen to "To Eternity and After" master soundtrack score composed by Δxolotl.</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feat-item"><span className="feat-check">✦</span>High-fidelity browser streaming</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Available on Spotify &amp; YouTube</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Full companion score to novel</li>
              </ul>
              <button className="btn btn-primary-highlight cl-btn-magnetic" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }} onClick={togglePlay}>
                <span>{isPlaying ? 'Pause Audio' : 'Play Master Score'}</span>
              </button>
            </div>

            <div className="clario-pricing-card cl-interactive-card cl-reveal cl-stagger-3">
              <span className="pricing-badge">COMING SOON</span>
              <h3 className="pricing-tier">Collector’s Bundle</h3>
              <div className="pricing-price-row">
                <span className="pricing-price">TBA</span>
                <span className="pricing-period">/ physical release</span>
              </div>
              <p className="pricing-desc">Physical hardcover book and 180g obsidian vinyl record bundle.</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Gold-foil hardcover book</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>180g heavyweight obsidian vinyl</li>
                <li className="pricing-feat-item"><span className="feat-check">✦</span>Author signed print by Δxolotl</li>
              </ul>
              <button className="btn cl-btn-magnetic" style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }} onClick={(e) => scrollTo(e, 'faq')}>
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clario FAQ Accordion */}
      <section className="sec" id="faq">
        <div className="sec-inner">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-label c cl-reveal">Questions &amp; Answers</div>
            <h2 className="sec-title cl-reveal cl-stagger-1">Frequently Asked Questions</h2>
            <p className="sec-body cl-reveal cl-stagger-2" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Everything you need to know about the music, chapter release schedules, and novel lore.
            </p>
          </div>

          <div className="clario-faq-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.num}
                  className={`cl-faq-item faq-item ${isOpen ? 'active open' : ''} cl-reveal cl-stagger-${(idx % 3) + 1}`}
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                >
                  <div className="faq-question-row">
                    <span className="faq-num">{faq.num}</span>
                    <h3 className="faq-question">{faq.q}</h3>
                    <span className="cl-faq-icon faq-toggle-icon">{isOpen ? '×' : '+'}</span>
                  </div>
                  <div className="cl-faq-answer">
                    <div className="cl-faq-answer-inner faq-answer-wrap">
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clario Pre-Footer CTA Card */}
      <section className="sec clario-cta-section">
        <div className="sec-inner">
          <div className="clario-cta-card cl-interactive-card cl-reveal">
            <div className="cta-corner tl" /><div className="cta-corner tr" /><div className="cta-corner bl" /><div className="cta-corner br" />
            <div className="cta-badge">
              <span className="dot-pulse" />
              <span>READY TO EXPLORE?</span>
            </div>
            <h2 className="cta-title">Start Experiencing Memento Mori</h2>
            <p className="cta-sub">
              Chapter <span className="glyph-preserve">α</span> is waiting. Stream the official soundtrack and immerse yourself in Volume I.
            </p>
            <div className="cta-actions">
              <button className="btn cta-btn-primary cl-btn-magnetic" onClick={handleReadAlpha}>
                <span>Read Chapter α Free</span>
              </button>
              <Link to="/" className="btn cta-btn-secondary cl-btn-magnetic">
                <span>View Classic Home Page</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clario Multi-Column Footer */}
      <footer className="clario-footer">
        <div className="footer-inner">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <Link to="/" className="footer-logo">Memento Mori</Link>
              <p className="footer-tagline">
                Official web novel and musical universe created by Δxolotl. A chronicle of quiet devotion and existential grief.
              </p>
              <div className="footer-credit">
                Created by <span className="highlight">Δxolotl</span> // In collaboration with <span className="highlight">Project Eden</span>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links">
                <li><Link to="/">Classic Home Page</Link></li>
                <li><a href="#how-it-works" onClick={(e) => scrollTo(e, 'how-it-works')}>How it Works</a></li>
                <li><a href="#bento" onClick={(e) => scrollTo(e, 'bento')}>Bento Showcase</a></li>
                <li><a href="#features" onClick={(e) => scrollTo(e, 'features')}>Features</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Releases</h4>
              <ul className="footer-links">
                <li><a href="#music" onClick={(e) => scrollTo(e, 'music')}>Soundtrack Player</a></li>
                <li><a href="#editions" onClick={(e) => scrollTo(e, 'editions')}>Access Editions</a></li>
                <li><a href="#faq" onClick={(e) => scrollTo(e, 'faq')}>FAQ</a></li>
                <li><a href="https://theaxolotlmusic.com/" target="_blank" rel="noopener noreferrer">theaxolotlmusic.com ↗</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Legal &amp; Source</h4>
              <ul className="footer-links">
                <li><a href="https://github.com/Nivethith-AK/AXO-2" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a></li>
                <li><a href="#hero" onClick={(e) => scrollTo(e, 'hero')}>Back to Top ↑</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copy">© 2026 THEAXOLOTLMUSIC // ALL RIGHTS RESERVED</div>
            <div className="footer-build">BUILT BY ΔXOLOTL // CLARIO TEMPLATE EDITION</div>
          </div>
        </div>
      </footer>

      {/* Reader Overlay */}
      <ReaderOverlay
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onSelectChapter={(id) => setSelectedChapterId(id)}
      />
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { HeroServiceCloud } from './HeroServiceCloud.jsx';

const words = ['think', 'connect', 'scale'];
const headlineWords = ['We', 'build', 'the', 'systems', 'that'];
const headlineLength = headlineWords.join('').length;
const ORBIT_HOLD_MS = 3000;
const ORBIT_CLOSE_MS = 750;
const ORBIT_TRAVEL_MS = 2000;
const ORBIT_OPEN_MS = 750;
const ORBIT_CYCLE_MS = ORBIT_HOLD_MS + ORBIT_CLOSE_MS + ORBIT_TRAVEL_MS + ORBIT_OPEN_MS;
const openingTiles = [
  { name: 'AI Solutions', symbol: '✦', detail: 'Intelligence with purpose' },
  { name: 'Web Development', symbol: '◈', detail: 'Experiences built to scale' },
  { name: 'Cloud Solutions', symbol: '⬡', detail: 'Infrastructure that adapts' },
  { name: 'Automation', symbol: '⟲', detail: 'Less friction, more flow' },
  { name: 'Data & BI', symbol: '◎', detail: 'Clarity in every decision' },
  { name: 'Integrations', symbol: '⌁', detail: 'Everything working together' },
];

function OpeningTile({ name, symbol, detail, index, active, onEnter, onLeave, onSelect }) {
  const surfaceRef = useRef(null);
  const tilt = (event) => {
    if (event.pointerType === 'touch') return;
    const surface = surfaceRef.current;
    const bounds = surface?.getBoundingClientRect();
    if (!surface || !bounds) return;
    surface.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - .5) * -12}deg`);
    surface.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - .5) * 12}deg`);
  };
  const reset = () => {
    surfaceRef.current?.style.setProperty('--tilt-x', '0deg');
    surfaceRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  return <button type="button" className="opening-glass-tile" data-active={active ? '' : undefined} aria-label={`${name}: ${detail}`} aria-pressed={active} onPointerMove={(event) => { tilt(event); onEnter(event); }} onPointerLeave={(event) => { reset(); onLeave(event); }} onBlur={onLeave} onClick={onSelect}>
    <div className="opening-glass-surface" ref={surfaceRef}>
      <span className="opening-glass-symbol" aria-hidden="true">{symbol}</span>
      <span className="opening-glass-label">{name}</span>
      <span className="opening-glass-detail">{detail}</span>
    </div>
  </button>;
}

function OpeningGallery() {
  const galleryRef = useRef(null);
  const pausedRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [autoIndex, setAutoIndex] = useState(3);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const story = gallery.closest('.home-story');
    const tiles = [...gallery.querySelectorAll('.opening-glass-tile:not(.mobile-clone)')];
    let frame = 0;
    let phase = 0;
    let elapsed = 0;
    let lastAutoIndex = 3;
    let last = performance.now();
    let mobileCleared = false;

    const place = () => {
      const width = gallery.clientWidth;
      const height = gallery.clientHeight;
      if (!width || !height) return;
      const mobile = window.innerWidth <= 700;
      if (mobile) {
        if (!mobileCleared) {
          tiles.forEach((tile) => {
            tile.style.removeProperty('left');
            tile.style.removeProperty('top');
            tile.style.removeProperty('opacity');
            tile.style.removeProperty('z-index');
            tile.style.removeProperty('--orbit-scale');
          });
          mobileCleared = true;
        }
        return;
      }
      mobileCleared = false;
      // The center sits beyond the right edge. Only the inward half of the orbit is visible.
      const centerX = width;
      const radiusX = width * .8;
      const radiusY = height * .45;
      tiles.forEach((tile, index) => {
        const progress = (index / tiles.length + phase) % 1;
        const angle = -Math.PI / 2 + progress * Math.PI;
        const depth = Math.cos(angle);
        tile.style.left = `${centerX - radiusX * depth}px`;
        tile.style.top = `${height / 2 + radiusY * Math.sin(angle)}px`;
        tile.style.setProperty('--orbit-scale', (.84 + depth * .18).toFixed(3));
        tile.style.opacity = (Math.min(1, Math.sin(progress * Math.PI) * 4) * (.63 + depth * .37)).toFixed(3);
        tile.style.zIndex = String(1 + Math.round(depth * 10));
      });
    };
    const tick = (now) => {
      const openingActive = !story || story.hasAttribute('data-opening-active');
      if (openingActive && !pausedRef.current && window.innerWidth > 700) elapsed += Math.max(0, now - last);
      last = now;
      if (openingActive && window.innerWidth > 700) {
        const step = Math.floor(elapsed / ORBIT_CYCLE_MS);
        const within = elapsed % ORBIT_CYCLE_MS;
        const travel = Math.max(0, Math.min(1, (within - ORBIT_HOLD_MS - ORBIT_CLOSE_MS) / ORBIT_TRAVEL_MS));
        const easedTravel = travel * travel * travel * (travel * (travel * 6 - 15) + 10);
        phase = ((step + easedTravel) / tiles.length) % 1;
        const nextAutoIndex = within < ORBIT_HOLD_MS
          ? (3 - step % tiles.length + tiles.length) % tiles.length
          : within >= ORBIT_HOLD_MS + ORBIT_CLOSE_MS + ORBIT_TRAVEL_MS
            ? (2 - step % tiles.length + tiles.length) % tiles.length
            : null;
        if (nextAutoIndex !== lastAutoIndex) { lastAutoIndex = nextAutoIndex; setAutoIndex(nextAutoIndex); }
      }
      if (openingActive) place();
      frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(place);
    resize.observe(gallery);
    place();
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const story = gallery.closest('.home-story');
    const cards = [...gallery.querySelectorAll('.opening-glass-tile')];
    let slide = 0;
    let pauseUntil = 0;
    let resetTimer = 0;
    let settleTimer = 0;
    const centerCard = (index) => {
      const card = cards[index];
      if (!card) return;
      const left = card.offsetLeft - (gallery.clientWidth - card.clientWidth) / 2;
      if (gallery.scrollTo) gallery.scrollTo({ left, behavior: 'smooth' });
      else gallery.scrollLeft = left;
    };
    const pause = () => { pauseUntil = Date.now() + 6500; clearTimeout(resetTimer); };
    const settle = () => {
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const center = gallery.scrollLeft + gallery.clientWidth / 2;
        slide = cards.reduce((nearest, card, index) =>
          Math.abs(card.offsetLeft + card.clientWidth / 2 - center) < Math.abs(cards[nearest].offsetLeft + cards[nearest].clientWidth / 2 - center) ? index : nearest, 0);
        if (slide === openingTiles.length) { gallery.scrollLeft = 0; slide = 0; }
      }, 450);
    };
    const advance = () => {
      if (window.innerWidth > 700 || Date.now() < pauseUntil || (story && !story.hasAttribute('data-opening-active'))) return;
      slide += 1;
      centerCard(slide);
      if (slide === openingTiles.length) {
        resetTimer = window.setTimeout(() => { gallery.scrollLeft = 0; slide = 0; }, 850);
      }
    };
    const timer = window.setInterval(advance, 3400);
    gallery.addEventListener('touchstart', pause, { passive: true });
    gallery.addEventListener('touchend', settle, { passive: true });
    gallery.addEventListener('pointerdown', pause, { passive: true });
    return () => {
      window.clearInterval(timer);
      clearTimeout(resetTimer);
      clearTimeout(settleTimer);
      gallery.removeEventListener('touchstart', pause);
      gallery.removeEventListener('touchend', settle);
      gallery.removeEventListener('pointerdown', pause);
    };
  }, []);

  return <div className="hero-opening-gallery" ref={galleryRef} role="region" aria-label="Our capabilities">
    {openingTiles.map((tile, index) => <OpeningTile key={tile.name} {...tile} index={index} active={(selectedIndex ?? autoIndex) === index}
      onEnter={(event) => { if (window.innerWidth <= 700 || event?.pointerType === 'touch') return; pausedRef.current = true; setSelectedIndex(index); }}
      onLeave={(event) => { if (event?.pointerType === 'touch') return; pausedRef.current = false; setSelectedIndex(null); }}
      onSelect={(event) => {
        if (window.innerWidth <= 700) { event.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); return; }
        if (event.detail > 0 && window.matchMedia?.('(hover: hover)').matches && event.nativeEvent.pointerType !== 'touch') return;
        setSelectedIndex((current) => { const next = current === index ? null : index; pausedRef.current = next !== null; return next; });
      }} />)}
    <div className="opening-glass-tile mobile-clone" aria-hidden="true">
      <div className="opening-glass-surface"><span className="opening-glass-symbol">{openingTiles[0].symbol}</span><span className="opening-glass-label">{openingTiles[0].name}</span><span className="opening-glass-detail">{openingTiles[0].detail}</span></div>
    </div>
  </div>;
}

function Letters({ value, start }) {
  return [...value].map((letter, index) => <span className="hero-letter" style={{ '--letter-order': start + index }} key={`${letter}-${index}`}>{letter}</span>);
}

export function Hero() {
  const [rotation, setRotation] = useState({ current: 0, previous: null });

  useEffect(() => {
    let exitTimer;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setRotation(({ current }) => ({ current: (current + 1) % words.length, previous: current }));
      window.clearTimeout(exitTimer);
      exitTimer = window.setTimeout(() => setRotation(({ current }) => ({ current, previous: null })), 720);
    }, 3000);
    return () => { window.clearInterval(timer); window.clearTimeout(exitTimer); };
  }, []);

  return <section className="hero premium-hero" id="top" data-hero="">
    <div className="hero-opening">
      <p className="hero-opening-kicker"><span /> BAIG BOTS / DIGITAL SOLUTIONS <span /></p>
      <h2>Ideas into<br/><em>intelligent systems.</em></h2>
      <p className="hero-opening-copy">Software, automation and AI that make every part of your business work better together.</p>
      <div className="hero-opening-tags" aria-label="Explore Baig Bots">
        <a href="#services">Build</a>
        <a href="#engage">Scale</a>
        <a href="/contact">Connect</a>
      </div>
      <OpeningGallery />
      {/* <p className="hero-opening-cue">SCROLL TO SEE IT COME TO LIFE <span>↓</span></p> */}
    </div>
    <div className="wrap hero-grid">
      <div className="hero-copy">
        <p className="eyebrow" data-hero="eyebrow"><span className="dot"/>Software · Automation · AI solutions</p>
        <h1 className="h-display" data-hero-h1="" aria-label="We build the systems that think, connect and scale."><span aria-hidden="true">{headlineWords.map((word, index) => <span className="hero-word-unit" key={word}><Letters value={word} start={headlineWords.slice(0, index).join('').length} />{' '}</span>)}</span><span className="hero-word-slot" aria-hidden="true"><span className="hero-word-measure">connect.</span>{rotation.previous !== null && <em className="kin hero-word hero-word-exit" key={`out-${rotation.previous}`}><Letters value={`${words[rotation.previous]}.`} start={headlineLength} /></em>}<em className="kin hero-word hero-word-current" key={`in-${rotation.current}`}><Letters value={`${words[rotation.current]}.`} start={headlineLength} /></em></span></h1>
        <p className="lead" data-hero="lead">Baig Bots delivers practical software, integration and automation services across enterprise applications, payment technology, data and modern digital experiences.</p>
        <div className="hero-act" data-hero="cta">
          <a className="btn btn-primary" href="/contact" data-magnet="" data-press=""><span>Start a project</span></a>
          <a className="btn btn-outline" href="#services" data-magnet="" data-press=""><span>Explore services</span></a>
        </div>
      </div>
      <HeroServiceCloud />
    </div>
    <div className="hero-index" aria-hidden="true"><span>01 / INTRODUCTION</span><span>BAIG BOTS · DIGITAL SOLUTIONS</span></div>
    <a className="cue" href="#about" aria-label="Scroll to about Baig Bots"><span>Scroll to explore</span><i/></a>
  </section>;
}

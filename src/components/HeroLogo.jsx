import { useEffect, useRef, useState } from 'react';

const frames = ['hero-logo-1.png', 'hero-logo-2.png', 'hero-logo-3.png', 'hero-logo-4.png', 'hero-logo-5.png']
  .map((name) => `/assets/${name}`);
// Align each generated mark to the corresponding original frame's footprint.
const frameRegistration = [
  { x: 23, y: 14, scale: .9596 },
  { x: 91, y: 29, scale: .8894 },
  { x: 189, y: 65, scale: .8356 },
  { x: 141, y: 30, scale: .875 },
  { x: 230, y: 69, scale: .7914 },
];

export function HeroLogo() {
  const host = useRef(null);
  const progress = useRef(0);
  const holding = useRef(false);
  const holdProgress = useRef(0);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let live = true;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    Promise.all(frames.map((src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image.naturalWidth > 0);
      image.onerror = () => resolve(false);
      image.src = src;
    }))).then((results) => { if (live) setReady(results.every(Boolean)); });
    return () => { live = false; media.removeEventListener('change', updateMotion); };
  }, []);

  useEffect(() => {
    const el = host.current;
    const story = el?.closest('.home-story');
    if (!el || !story) return;
    let id;
    let last = performance.now();
    let targetPosition = 0;
    let displayPosition = 0;
    let assetBlend = 0;
    let initialized = false;
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const smoothstep = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
    const frameAt = (position) => position < .36
      ? smoothstep((position - .05) / .31)
      : smoothstep(1 - (position - .36) / .28);
    const paintStory = (position) => {
      story.style.setProperty('--story-progress', position.toFixed(4));
      story.style.setProperty('--opening-progress', smoothstep(position / .13).toFixed(4));
      story.style.setProperty('--lines-progress', smoothstep((position - .03) / .17).toFixed(4));
      story.style.setProperty('--cards-appear', smoothstep((position - .12) / .18).toFixed(4));
      story.style.setProperty('--tornado-progress', smoothstep((position - .36) / .22).toFixed(4));
      story.style.setProperty('--text-progress', smoothstep((position - .54) / .18).toFixed(4));
      story.style.setProperty('--copy-progress', smoothstep((position - .67) / .10).toFixed(4));
      story.style.setProperty('--hero-progress', smoothstep((position - .78) / .11).toFixed(4));
      story.style.setProperty('--about-progress', smoothstep((position - .82) / .14).toFixed(4));
      story.style.setProperty('--scene-light', smoothstep((position - .74) / .21).toFixed(4));
      story.style.setProperty('--logo-presence', (1 - smoothstep((position - .57) / .19) * .45 - smoothstep((position - .82) / .13) * .13).toFixed(4));
      story.toggleAttribute('data-copy-active', position > .67 && position < .89);
    };
    const paint = (value) => {
      progress.current = value;
      el.style.setProperty('--break-progress', value.toFixed(4));
      const frameIntro = ready ? assetBlend : 0;
      el.style.setProperty('--vector-opacity', (1 - frameIntro).toFixed(4));
      const sequence = value * 4;
      const current = Math.min(3, Math.floor(sequence));
      const blend = smoothstep((sequence - current - .39) / .22);
      el.querySelectorAll('[data-logo-frame]').forEach((frame, i) => {
        frame.style.opacity = String((i === current ? 1 - blend : i === current + 1 ? blend : 0) * frameIntro);
      });
    };
    const tick = (now) => {
      const dt = Math.max(0, Math.min(50, now - last));
      last = now;
      displayPosition = clamp(displayPosition + (targetPosition - displayPosition) * (1 - Math.exp(-dt / (reduced ? 160 : 220))));
      if (ready && assetBlend < 1) assetBlend = Math.min(1, assetBlend + dt / 550);
      if (Math.abs(displayPosition - targetPosition) < .0002) displayPosition = targetPosition;
      paintStory(displayPosition);
      holdProgress.current = Math.max(0, Math.min(1, holdProgress.current + (holding.current ? 1 : -1) * dt / (holding.current ? 1750 : 1100)));
      const target = ready ? Math.max(frameAt(displayPosition), reduced ? 0 : holdProgress.current) : 0;
      const next = progress.current + (target - progress.current) * (1 - Math.exp(-dt / (reduced ? 120 : 100)));
      paint(Math.abs(next - target) < .001 ? target : next);
      if (Math.abs(displayPosition - targetPosition) > .0002 || Math.abs(progress.current - target) > .001 || (ready && assetBlend < 1) || (holding.current && holdProgress.current < 1) || (!holding.current && holdProgress.current > 0)) id = requestAnimationFrame(tick);
      else id = undefined;
    };
    const start = () => { if (id === undefined) { last = performance.now(); id = requestAnimationFrame(tick); } };
    const updateScroll = () => {
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      targetPosition = clamp(-rect.top / travel);
      if (!initialized) {
        displayPosition = targetPosition;
        paintStory(displayPosition);
        paint(ready ? frameAt(displayPosition) : 0);
        initialized = true;
      }
      start();
    };
    el.addEventListener('logo-progress', start);
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();
    return () => { if (id !== undefined) cancelAnimationFrame(id); el.removeEventListener('logo-progress', start); window.removeEventListener('scroll', updateScroll); window.removeEventListener('resize', updateScroll); };
  }, [ready, reduced]);

  const changeHold = (value) => {
    holding.current = value;
    setActive(value);
    host.current?.dispatchEvent(new Event('logo-progress'));
  };
  const move = (event) => {
    if (event.pointerType === 'touch' || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    host.current?.style.setProperty('--logo-x', `${x * 16}px`);
    host.current?.style.setProperty('--logo-y', `${y * 16}px`);
  };
  return <div className="hero-logo-wrap" ref={host} data-active={active} data-frames-ready={ready}>
    <button className="hero-logo-control" type="button" aria-label={ready ? 'Baig Bots logo: scroll to disassemble, or press and hold to explore' : 'Baig Bots metallic logo'}
      onPointerDown={(event) => { if (ready && !reduced) { event.currentTarget.setPointerCapture(event.pointerId); changeHold(true); } }}
      onPointerUp={() => changeHold(false)} onPointerCancel={() => changeHold(false)}
      onLostPointerCapture={() => changeHold(false)} onPointerMove={move}
      onPointerLeave={() => { host.current?.style.setProperty('--logo-x', '0px'); host.current?.style.setProperty('--logo-y', '0px'); }}>
      <span className="hero-logo-orbit" aria-hidden="true" />
      <span className="hero-logo-art" aria-hidden="true">
        <span className="blg hero-logo-fallback"><i className="lg-s"/><i className="lg-ss"/><i className="lg-r"/><i className="lg-rs"/><i className="lg-sh"/></span>
        {frames.map((src, index) => <img key={src} data-logo-frame="" src={src} alt="" draggable="false" style={{
          opacity: 0,
          transformOrigin: 'top left',
          transform: `translate(${(frameRegistration[index].x / 1681 * 100).toFixed(3)}%, ${(frameRegistration[index].y / 937 * 100).toFixed(3)}%) scale(${frameRegistration[index].scale})`,
        }} />)}
      </span>
      <span className="hero-logo-glint" aria-hidden="true" />
      <span className="hero-logo-energy" aria-hidden="true" />
      <span className="hero-logo-particles" aria-hidden="true"><i/><i/><i/><i/><i/></span>
    </button>
    <span className="hero-logo-caption">{ready ? 'Scroll to deconstruct · hold to explore' : 'Original Baig Bots mark'}</span>
  </div>;
}

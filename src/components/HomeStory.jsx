import { useEffect, useRef } from 'react';
import { KineticGrid } from './KineticGrid.jsx';
import { Hero } from './Hero.jsx';
import { HomeIntroduction } from './HomeIntroduction.jsx';

export function HomeStory() {
  const storyRef = useRef(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const smoothstep = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
    let target = 0;
    let displayed = 0;
    let frame = 0;
    let last = performance.now();
    let initialized = false;

    const paint = (position) => {
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
      story.toggleAttribute('data-opening-active', position < .13);
      story.querySelector('.hero-opening')?.toggleAttribute('inert', position >= .13);
      story.toggleAttribute('data-copy-active', position > .67 && position < .89);
    };

    const tick = (now) => {
      const delta = Math.min(50, Math.max(0, now - last));
      last = now;
      displayed = clamp(displayed + (target - displayed) * (1 - Math.exp(-delta / (reduced.matches ? 160 : 220))));
      if (Math.abs(displayed - target) < .0002) displayed = target;
      paint(displayed);
      frame = displayed === target ? 0 : requestAnimationFrame(tick);
    };
    const update = () => {
      const rect = story.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      if (!initialized) { displayed = target; paint(displayed); initialized = true; }
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="home-story" data-home-story="" ref={storyRef}>
    <div className="story-backdrop">
      <KineticGrid />
      <svg className="story-approach-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="approach-line from-left" pathLength="100" d="M-100 490C150 330 355 650 720 450" />
        <path className="approach-line from-right" pathLength="100" d="M1540 400C1260 570 1090 240 720 450" />
      </svg>
      <Hero />
    </div>
    <div className="hero-scroll-space" aria-hidden="true" />
    <HomeIntroduction />
  </div>;
}

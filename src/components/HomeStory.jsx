import { CircuitLines } from './CircuitLines.jsx';
import { HeroLogo } from './HeroLogo.jsx';
import { Hero } from './Hero.jsx';
import { HomeIntroduction } from './HomeIntroduction.jsx';

export function HomeStory() {
  return <div className="home-story" data-home-story="" onPointerMove={(event) => {
    if (event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--circuit-x', `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty('--circuit-y', `${event.clientY - box.top}px`);
  }}>
    <div className="story-backdrop">
      <CircuitLines />
      <svg className="story-approach-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="approach-line from-left" pathLength="100" d="M-100 490C150 330 355 650 720 450" />
        <path className="approach-line from-right" pathLength="100" d="M1540 400C1260 570 1090 240 720 450" />
      </svg>
      <div className="story-logo-stage"><HeroLogo /></div>
      <Hero />
    </div>
    <div className="hero-scroll-space" aria-hidden="true" />
    <HomeIntroduction />
  </div>;
}

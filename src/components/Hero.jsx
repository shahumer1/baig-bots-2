import { useEffect, useState } from 'react';
import { HeroServiceCloud } from './HeroServiceCloud.jsx';

const words = ['think', 'connect', 'scale'];
const headlineWords = ['We', 'build', 'the', 'systems', 'that'];
const headlineLength = headlineWords.join('').length;

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
    <div className="hero-opening" aria-hidden="true">
      <p className="hero-opening-kicker"><span /> BAIG BOTS / DIGITAL SOLUTIONS <span /></p>
      <h2>Ideas into<br/><em>intelligent systems.</em></h2>
      <p className="hero-opening-copy">Software, automation and AI that make every part of your business work better together.</p>
      <div className="hero-opening-tags"><span>BUILD</span><span>CONNECT</span><span>SCALE</span></div>
      <p className="hero-opening-cue">SCROLL TO SEE IT COME TO LIFE <span>↓</span></p>
    </div>
    <div className="wrap hero-grid">
      <div className="hero-copy">
        <p className="eyebrow" data-hero="eyebrow"><span className="dot"/>Software · Automation · AI solutions</p>
        <h1 className="h-display" data-hero-h1="" aria-label="We build the systems that think, connect and scale."><span aria-hidden="true">{headlineWords.map((word, index) => <span className="hero-word-unit" key={word}><Letters value={word} start={headlineWords.slice(0, index).join('').length} />{' '}</span>)}</span><span className="hero-word-slot" aria-hidden="true"><span className="hero-word-measure">connect.</span>{rotation.previous !== null && <em className="kin hero-word hero-word-exit" key={`out-${rotation.previous}`}><Letters value={`${words[rotation.previous]}.`} start={headlineLength} /></em>}<em className="kin hero-word hero-word-current" key={`in-${rotation.current}`}><Letters value={`${words[rotation.current]}.`} start={headlineLength} /></em></span></h1>
        <p className="lead" data-hero="lead">Baig Bots delivers practical software, integration and automation services across enterprise applications, payment technology, data and modern digital experiences.</p>
        <div className="hero-act" data-hero="cta">
          <a className="btn btn-primary" href="/contact" data-magnet="" data-press=""><span>Start a project</span><span aria-hidden="true">↗</span></a>
          <a className="btn btn-outline" href="#services" data-magnet="" data-press=""><span>Explore services</span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <HeroServiceCloud />
    </div>
    <div className="hero-index" aria-hidden="true"><span>01 / INTRODUCTION</span><span>BAIG BOTS · DIGITAL SOLUTIONS</span></div>
    <a className="cue" href="#about" aria-label="Scroll to about Baig Bots"><span>Scroll to explore</span><i/></a>
  </section>;
}

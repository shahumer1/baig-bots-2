import { useEffect, useRef } from 'react';

const facts = [
  ['08', 'CORE SERVICES'],
  ['08', 'DIGITAL LINES'],
  ['05', 'WAYS TO WORK'],
  ['17', 'TOOLS & STANDARDS'],
];
const stripCount = 64;
const smoothstep = (value) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function HomeVision() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const siteRoot = section.closest('#bb');
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      siteRoot?.toggleAttribute('data-vision-visible', entry.isIntersecting);
    });
    visibilityObserver.observe(section);
    let frame = 0;
    let target = 0;
    let displayed = 0;
    let last = performance.now();
    const sticky = section.querySelector('.vision-sticky');
    const factElements = [...section.querySelectorAll('.vision-fact')];
    const strips = [...section.querySelectorAll('.vision-flip-strip')];
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const progressFromView = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(window.innerHeight * .65, section.offsetHeight - window.innerHeight);
      return clamp((window.innerHeight * .04 - rect.top) / Math.max(1, travel));
    };
    const read = () => {
      target = progressFromView();
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    };
    const paint = (progress) => {
      section.style.setProperty('--vision-progress', progress.toFixed(4));
      const copyReveal = smoothstep((progress - .74) / .12);
      section.style.setProperty('--vision-copy-opacity', copyReveal.toFixed(4));
      section.style.setProperty('--vision-copy-y', `${((1 - copyReveal) * 28).toFixed(1)}px`);
      const visibleStrips = Math.max(1, Math.ceil((sticky?.clientHeight || window.innerHeight) / 38));
      strips.forEach((strip, index) => {
        const turn = smoothstep((progress - .03 - index / visibleStrips * .25) / .42);
        strip.style.setProperty('--strip-angle', `${(turn * 180).toFixed(2)}deg`);
      });
      factElements.forEach((element, index) => {
        const reveal = smoothstep((progress - .80 - index * .018) / .12);
        element.style.setProperty('--fact-opacity', reveal.toFixed(4));
        element.style.setProperty('--fact-y', `${((1 - reveal) * 24).toFixed(1)}px`);
      });
    };
    const tick = (now) => {
      const delta = Math.min(50, Math.max(0, now - last));
      last = now;
      displayed += (target - displayed) * (1 - Math.exp(-delta / 250));
      if (Math.abs(displayed - target) < .0004) displayed = target;
      paint(displayed);
      frame = displayed === target ? 0 : requestAnimationFrame(tick);
    };
    displayed = target = progressFromView();
    paint(displayed);
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      siteRoot?.removeAttribute('data-vision-visible');
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  return <section className="home-vision" ref={sectionRef} aria-labelledby="vision-heading" data-home-vision="">
    <div className="vision-sticky">
      <div className="vision-flip-field" aria-hidden="true">
        {Array.from({ length: stripCount }, (_, index) => <div className="vision-flip-strip" key={index}>
          <span className="vision-flip-face vision-flip-front"/><span className="vision-flip-face vision-flip-back"/>
        </div>)}
      </div>
      <span className="vision-index">03 / KEY FACTS</span>
      <div className="vision-center">
        <p>ONE CONNECTED WAY OF WORKING <i>✳</i></p>
        <h2 id="vision-heading">Built to connect.<br/><em>Ready to scale.</em></h2>
        <span>Four facts behind the work we build together.</span>
      </div>
      <div className="vision-facts" aria-label="Key facts at a glance">
        {facts.map(([number, label], index) => <div className="vision-fact" key={label} style={{ '--fact-order': index }}>
          <strong>{number}</strong><span>{label}</span>
        </div>)}
      </div>
      <span className="vision-scroll-cue">SCROLL FOR THE DETAILS <b>↓</b></span>
    </div>
  </section>;
}

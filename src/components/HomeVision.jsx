import { useEffect, useRef } from 'react';

const facts = [
  ['08', 'CORE SERVICES'],
  ['08', 'DIGITAL LINES'],
  ['05', 'WAYS TO WORK'],
  ['17', 'TOOLS & STANDARDS'],
];

export function HomeVision() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let target = 0;
    let displayed = 0;
    let last = performance.now();
    const factElements = [...section.querySelectorAll('.vision-fact')];
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const read = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      target = clamp(-rect.top / travel);
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
    };
    const paint = (progress) => {
      section.style.setProperty('--vision-progress', progress.toFixed(4));
      section.style.setProperty('--vision-key-x', `${-14 + progress * 14}%`);
      section.style.setProperty('--vision-facts-x', `${14 - progress * 14}%`);
      section.style.setProperty('--vision-heading-y', `${(1 - progress) * 34}px`);
      section.style.setProperty('--vision-heading-opacity', String(.7 + progress * .3));
      factElements.forEach((element, index) => {
        const reveal = Math.max(0, Math.min(1, progress * 3 - index * .28));
        element.style.setProperty('--fact-opacity', String(.22 + reveal * .78));
        element.style.setProperty('--fact-y', `${(1 - reveal) * 28}px`);
      });
    };
    const tick = (now) => {
      const delta = Math.min(50, Math.max(0, now - last));
      last = now;
      displayed += (target - displayed) * (1 - Math.exp(-delta / 110));
      if (Math.abs(displayed - target) < .0004) displayed = target;
      paint(displayed);
      frame = displayed === target ? 0 : requestAnimationFrame(tick);
    };
    const rect = section.getBoundingClientRect();
    displayed = target = clamp(-rect.top / Math.max(1, section.offsetHeight - window.innerHeight));
    paint(displayed);
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  return <section className="home-vision" ref={sectionRef} aria-labelledby="vision-heading" data-home-vision="">
    <div className="vision-sticky">
      <span className="vision-index">03 / KEY FACTS</span>
      <div className="vision-giant" aria-hidden="true"><span>KEY</span><span>FACTS</span></div>
      <div className="vision-center">
        <p>ONE CONNECTED WAY OF WORKING <i>✳</i></p>
        <h2 id="vision-heading">Built to connect.<br/><em>Ready to scale.</em></h2>
        <span>Four numbers that show what we can bring to the build.</span>
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

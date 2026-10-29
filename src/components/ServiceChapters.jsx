import { useEffect, useRef } from 'react';
import { innerServicePath, innerServices } from './innerData.js';
import './ServiceChapters.css';

const featuredSlugs = ['ai-agents-chatbots', 'web-development', 'workflow-automation', 'api-integrations'];
const featured = featuredSlugs.map(slug => innerServices.find(service => service.slug === slug));
const clamp = value => Math.max(0, Math.min(1, value));

export function ServiceChapters() {
  const root = useRef(null);

  useEffect(() => {
    const sequence = root.current.querySelector('.services-chapters-sequence');
    const panels = [...sequence.querySelectorAll('.service-chapter')];
    const mobileScreen = window.matchMedia('(max-width: 850px)');
    let frame = 0;
    let current = 0;
    const mobileValues = new Map(panels.map(panel => [panel, 0]));

    function tick() {
      frame = 0;
      let moving = false;
      const height = window.innerHeight;

      if (mobileScreen.matches) {
        for (const panel of panels) {
          const rect = panel.getBoundingClientRect();
          const target = clamp((height * .88 - rect.top) / (height * .68));
          const previous = mobileValues.get(panel);
          const next = Math.abs(target - previous) < .002 ? target : previous + (target - previous) * .2;
          mobileValues.set(panel, next);
          panel.style.setProperty('--chapter-progress', next.toFixed(3));
          panel.style.setProperty('--chapter-main-y', `${((1 - next) * 48).toFixed(1)}px`);
          panel.style.setProperty('--chapter-glass-y', `${((1 - next) * 55).toFixed(1)}px`);
          panel.style.setProperty('--chapter-ghost-opacity', (next * .06).toFixed(3));
          panel.style.opacity = '1';
          panel.querySelector('.service-chapter-surface').style.clipPath = 'none';
          panel.inert = false;
          if (Math.abs(target - next) >= .002) moving = true;
        }
      } else {
        const rect = sequence.getBoundingClientRect();
        const distance = Math.max(1, rect.height - height);
        const target = clamp(-rect.top / distance) * (panels.length - 1);
        const desired = target;
        current = Math.abs(desired - current) < .002 ? desired : current + (desired - current) * .28;
        if (Math.abs(desired - current) >= .002) moving = true;
        sequence.style.setProperty('--sequence-progress', (current / (panels.length - 1)).toFixed(4));

        panels.forEach((panel, index) => {
          const fraction = index === 0 ? 1 : clamp((current - (index - 1) - .12) / .55);
          const revealed = fraction;
          const widths = Array.from({ length: 5 }, (_, stripe) =>
            (clamp((revealed - stripe * .06) / .76) * 100).toFixed(2)
          );
          panel.style.opacity = '1';
          panel.querySelector('.service-chapter-surface').style.clipPath = `polygon(0 0, ${widths[0]}% 0, ${widths[0]}% 20%, ${widths[1]}% 20%, ${widths[1]}% 40%, ${widths[2]}% 40%, ${widths[2]}% 60%, ${widths[3]}% 60%, ${widths[3]}% 80%, ${widths[4]}% 80%, ${widths[4]}% 100%, 0 100%)`;
          const following = index > current;
          const content = following
            ? clamp((revealed - .45) / .45)
            : clamp(1 - clamp((current - index - .12) / .55) * 2.2);
          panel.style.setProperty('--chapter-progress', revealed.toFixed(3));
          panel.style.setProperty('--chapter-content-opacity', content.toFixed(3));
          panel.style.setProperty('--chapter-main-y', `${((1 - content) * 72).toFixed(1)}px`);
          panel.style.setProperty('--chapter-glass-x', `${((1 - content) * 155).toFixed(1)}px`);
          panel.style.setProperty('--chapter-rotate', `${((1 - content) * -9).toFixed(2)}deg`);
          panel.style.setProperty('--chapter-ghost-opacity', (revealed * .075).toFixed(3));
          panel.inert = index !== Math.round(current);
        });
      }

      if (moving) frame = requestAnimationFrame(tick);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobileScreen.addEventListener('change', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mobileScreen.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="services-chapters" ref={root} aria-labelledby="service-chapters-title">
    <div className="services-chapters-intro wrap">
      <p className="eyebrow"><span className="dot" />02 / A closer look</p>
      <h2 id="service-chapters-title">One connected system.<br /><em>Many ways to build it.</em></h2>
      <p>Explore how our core capabilities turn a business requirement into a working experience.</p>
    </div>
    <div className="services-chapters-sequence" style={{ height: `${featured.length * 100}vh` }}>
      <div className="services-chapters-stage">
        <div className="services-chapters-progress" aria-hidden="true"><span /></div>
    {featured.map((service, index) => <article className="service-chapter" key={service.slug} style={{ '--chapter-progress': index === 0 ? 1 : 0, zIndex: index }}>
      <div className="service-chapter-surface" aria-hidden="true" style={{ clipPath: index === 0 ? 'none' : 'inset(0 100% 0 0)' }} />
      <div className="service-chapter-inner wrap">
        <div className="service-chapter-main">
          <p className="service-chapter-label"><span>{String(index + 1).padStart(2, '0')} / 04</span><span>CAPABILITY</span></p>
          <h3>{service.title}</h3>
          <p className="service-chapter-intro">{service.intro}</p>
          <a className="service-chapter-link" href={innerServicePath(service)}>Explore {service.title} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="service-chapter-glass">
          <span className="service-chapter-glass-kicker">WHAT THIS INCLUDES</span>
          <ol>{service.focus.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
          <p>{service.visualSteps?.join('  /  ')}</p>
        </div>
      </div>
      <span className="service-chapter-ghost" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </article>)}
      </div>
    </div>
  </section>;
}

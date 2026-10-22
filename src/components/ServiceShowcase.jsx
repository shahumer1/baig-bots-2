import { useRef, useState } from 'react';
import { serviceShowcases } from './serviceShowcaseData.js';

export function ServiceShowcase({ service }) {
  const slides = serviceShowcases[service.slug];
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);

  if (!slides?.length) return null;

  const index = active % slides.length;
  const [image, industry, heading, explanation, detail, destination] = slides[index];
  const goTo = (next) => setActive((next + slides.length) % slides.length);

  return <section className="service-showcase inner-section wrap" aria-label={`${service.title} examples`}>
    <div className="inner-section-head">
      <p className="eyebrow"><span className="dot"/>Service in context</p>
      <h2 className="h2">See what this can make easier.</h2>
      <p className="inner-help">Explore how {service.title.toLowerCase()} can support different day-to-day journeys.</p>
    </div>
    <div className="service-showcase-shell" onTouchStart={(event) => { touchStart.current = event.touches[0] ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }} onTouchEnd={(event) => {
      if (touchStart.current === null) return;
      const touch = event.changedTouches[0];
      const distance = touchStart.current.x - (touch?.clientX ?? touchStart.current.x);
      const vertical = Math.abs(touchStart.current.y - (touch?.clientY ?? touchStart.current.y));
      if (Math.abs(distance) > 55 && Math.abs(distance) > vertical) goTo(index + (distance > 0 ? 1 : -1));
      touchStart.current = null;
    }}>
      <div className="service-showcase-image" key={`${service.slug}-${index}-image`}>
        <img src={image} alt={`${industry} workflow screen showing ${detail.toLowerCase()}`} loading={index === 0 ? 'lazy' : 'eager'} decoding="async" />
        <span className="service-showcase-image-tag">{detail}</span>
      </div>
      <div className="service-showcase-copy" key={`${service.slug}-${index}-copy`} aria-live="polite">
        <span className="inner-kicker">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} &nbsp;·&nbsp; {industry}</span>
        <h3>{heading}</h3>
        <p>{explanation}</p>
        <a href={destination} className="service-showcase-link">Explore {industry.toLowerCase()} <span aria-hidden="true">→</span></a>
      </div>
      <div className="service-showcase-controls" aria-label="Example controls">
        <div className="service-showcase-progress" aria-hidden="true">{slides.map((_, position) => <span key={position} className={position === index ? 'is-active' : ''} />)}</div>
        <div className="service-showcase-actions">
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous example">←</button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Next example">→</button>
        </div>
      </div>
    </div>
  </section>;
}

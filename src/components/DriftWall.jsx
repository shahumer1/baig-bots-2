import { useEffect, useRef, useState } from 'react';
import './DriftWall.css';

export default function DriftWall({ items }) {
  const wallRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [active, setActive] = useState(-1);
  const interacting = pointerInside || focusInside;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setActive(-1);
    }, { threshold: .2 });
    if (wallRef.current) observer.observe(wallRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || interacting || !items.length) return;
    let interval;
    const advance = () => setActive(current => (current + 1) % items.length);
    const start = window.setTimeout(() => {
      advance();
      interval = window.setInterval(advance, 2600);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [visible, interacting, items.length]);

  useEffect(() => { if (interacting) setActive(-1); }, [interacting]);

  return <div ref={wallRef} className="drift-wall" role="group" aria-label="Explore services" onPointerEnter={() => setPointerInside(true)} onPointerLeave={() => setPointerInside(false)} onFocusCapture={() => setFocusInside(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false); }}>
    {items.map((item, index) => <a className={`drift-wall__tile${active === index ? ' is-active' : ''}`} key={item.href} href={item.href} aria-label={`Explore ${item.title}: ${item.detail}`} style={{ '--tile-index': index }}>
      <span className="drift-wall__inner">
        <span className="drift-wall__title">{item.title}</span>
        <span className="drift-wall__detail">{item.detail}</span>
      </span>
    </a>)}
  </div>;
}

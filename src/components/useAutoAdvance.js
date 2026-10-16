import { useEffect, useRef, useState } from 'react';

// Start when the explorer first enters the viewport, then keep a steady cadence.
// Pointer movement and page scrolling never change the timer's speed.
export function useAutoAdvance(count, delay = 4000) {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || count < 2) return;
    const timer = window.setTimeout(() => setActive(current => (current + 1) % count), delay);
    return () => window.clearTimeout(timer);
  }, [active, count, cycle, delay, started]);

  function choose(index) {
    setActive(index);
    setCycle(value => value + 1);
  }

  return { active, choose, ref, started };
}

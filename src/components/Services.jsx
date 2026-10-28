import { useEffect, useRef } from 'react';
import { innerServices, innerServicePath } from './innerData.js';
import { coreServices } from './serviceData.js';
import './ServicesGallery.css';

// The former card grid's useful descriptions now live in the slider.
const serviceCopy = {
  'web-development': coreServices[2].description,
  'cloud-infrastructure': coreServices[6].description,
  'ai-agents-chatbots': coreServices[0].description,
  'computer-vision': 'Visual analysis and AI document processing that turn images and video into useful business signals.',
  'crm-erp-systems': 'Customer and admin portals, connected records, dashboards and workflows built around your team.',
  'workflow-automation': coreServices[1].description,
  'api-integrations': coreServices[3].description,
  'digital-transformation': 'Connect the tools, people and processes behind your business with a practical delivery roadmap.',
};

const galleryServices = innerServices.map((service) => ({
  ...service,
  href: innerServicePath(service),
  detail: serviceCopy[service.slug] || service.intro,
}));

function ServicesGallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const stage = gallery.querySelector('.sg-stage');
    const cards = [...gallery.querySelectorAll('.sg-card')];
    const counter = gallery.querySelector('.sg-counter strong');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const total = cards.length;
    let target = 0;
    let progress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let last = performance.now();
    let focused = -1;
    const clamp = (value) => Math.max(0, Math.min(1, value));

    const draw = () => {
      const width = stage.clientWidth;
      const compact = width < 700;
      const radius = compact ? width * .72 : Math.min(width * .46, 650);
      const depth = compact ? 105 : 250;
      const lean = compact ? 36 : 72;
      let nearest = 0;
      let nearestDistance = Infinity;

      cards.forEach((card, index) => {
        let slot = index - progress * (total - 1);
        slot = ((slot + total / 2) % total + total) % total - total / 2;
        const distance = Math.abs(slot);
        if (distance < nearestDistance) { nearest = index; nearestDistance = distance; }
        const angle = slot * (compact ? .46 : .41);
        const focus = Math.max(0, Math.cos(angle));
        const edge = clamp((total / 2 - distance) / .6);
        const x = Math.sin(angle) * radius + pointerX * (9 + focus * 13);
        const y = (1 - focus) * (compact ? 55 : 90) + Math.sin(angle * 1.15) * lean + pointerY * (6 + focus * 11);
        const z = (focus - .42) * depth;
        const scale = .76 + .43 * Math.exp(-distance * distance * 1.8);
        card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) rotateY(${(-angle * 55).toFixed(2)}deg) rotateZ(${(slot * (compact ? 2.4 : 3.2)).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = (edge * (.2 + .8 * Math.exp(-distance * distance * 1.6))).toFixed(3);
        card.style.zIndex = String(Math.round(focus * 100));
        card.tabIndex = edge < .15 ? -1 : 0;
        card.style.setProperty('--sg-glint-x', `${50 + pointerX * 22}%`);
        card.style.setProperty('--sg-glint-y', `${30 + pointerY * 18}%`);
      });
      if (focused !== nearest) {
        cards.forEach((card, index) => { card.dataset.center = index === nearest ? 'true' : 'false'; });
        focused = nearest;
        counter.textContent = String(nearest + 1).padStart(2, '0');
      }
      gallery.dataset.ready = 'true';
    };

    const tick = (now) => {
      const delta = Math.max(0, Math.min(50, now - last));
      last = now;
      const ease = motion.matches ? 1 : 1 - Math.exp(-delta / 270);
      progress += (target - progress) * ease;
      pointerX += (targetX - pointerX) * ease;
      pointerY += (targetY - pointerY) * ease;
      if (Math.abs(progress - target) < .0002) progress = target;
      if (Math.abs(pointerX - targetX) < .001) pointerX = targetX;
      if (Math.abs(pointerY - targetY) < .001) pointerY = targetY;
      draw();
      frame = 0;
      if (progress !== target || pointerX !== targetX || pointerY !== targetY) start();
    };
    const start = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); } };
    const updateScroll = () => {
      const rect = gallery.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const travel = Math.max(1, gallery.offsetHeight - stage.offsetHeight);
      const next = clamp((stickyTop - rect.top) / travel);
      if (Math.abs(next - target) > .0002) { target = next; start(); }
    };
    const move = (event) => {
      if (!fine.matches || motion.matches) return;
      const rect = stage.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - .5) * 2;
      start();
    };
    const leave = () => { targetX = 0; targetY = 0; start(); };
    const resize = () => { updateScroll(); draw(); };
    updateScroll();
    progress = target;
    draw();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', resize);
    stage.addEventListener('pointermove', move, { passive: true });
    stage.addEventListener('pointerleave', leave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', resize);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div className="sg-gallery" ref={galleryRef} aria-label="Explore Baig Bots services">
    <div className="sg-stage">
      <div className="sg-backtype" aria-hidden="true">SERVICES</div>
      <p className="sg-intro">SOFTWARE / AUTOMATION / AI</p>
      <svg className="sg-curve" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true"><path d="M-80 390C260 160 480 500 720 420S1200 200 1520 370" /></svg>
      <div className="sg-deck">
        {galleryServices.map((service, index) => <a className="sg-card" href={service.href} key={service.slug} aria-label={`Explore ${service.title}`}>
          <span className="sg-card-index">{String(index + 1).padStart(2, '0')} / {String(galleryServices.length).padStart(2, '0')}</span>
          <span className="sg-card-title">{service.title}</span>
          <span className="sg-card-detail">{service.detail}</span>
          <span className="sg-card-focus">{service.focus.slice(0, 2).join(' · ')}</span>
        </a>)}
      </div>
      <div className="sg-foot" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="sg-counter"><strong>01</strong> / {String(galleryServices.length).padStart(2, '0')}</span></div>
    </div>
  </div>;
}

export function Services() {
  return <section className="sec" id="services"><ServicesGallery /></section>;
}

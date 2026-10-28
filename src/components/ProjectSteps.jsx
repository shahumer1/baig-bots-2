import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Reveal } from './Reveal.jsx';
import { ProjectStepVisual } from './ProjectStepVisual.jsx';

export function ProjectSteps({ steps, eyebrow, title, service, industry, id }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 25%', 'end 75%'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const next = Math.min(steps.length - 1, Math.floor(Math.max(0, value) * steps.length));
    setActive(current => current === next ? current : next);
  });
  const contact = service ? `/contact?service=${encodeURIComponent(service.title)}` : null;
  return <section id={id} className="inner-section wrap project-steps-section" aria-label={title}>
    <div className="inner-section-head"><p className="eyebrow"><span className="dot"/>{eyebrow}</p><h2 className="h2" data-split="">{title}</h2></div>
    <div className="project-steps-scroll" ref={ref} style={{ '--step-count': steps.length }}>
      <div className="project-steps-sticky">
        <div className="project-steps-meta"><span>STEP {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span><span>SCROLL TO EXPLORE ↓</span></div>
        <div className="project-steps-frame">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article className="project-step-card" key={active}
              initial={reducedMotion ? false : compact ? { opacity: 0, y: 16 } : { opacity: 0, y: 42, filter: 'blur(8px)' }}
              animate={compact ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : compact ? { opacity: 0, y: -16 } : { opacity: 0, y: -42, filter: 'blur(8px)' }}
              transition={{ duration: reducedMotion ? 0 : .38, ease: [.22, 1, .36, 1] }}>
              <div className="project-step-copy"><span className="project-step-number">{String(active + 1).padStart(2, '0')}</span><p>{steps[active]}</p></div>
              <ProjectStepVisual industry={industry} service={service} active={active}/>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="project-step-progress" aria-hidden="true">{steps.map((_, index) => <span key={index} className={index <= active ? 'is-active' : ''}/>)}</div>
      </div>
    </div>
    {contact && <Reveal><a className="btn btn-primary project-steps-cta" href={contact}><span>Plan the first step</span></a></Reveal>}
  </section>;
}

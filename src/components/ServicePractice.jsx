import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

function PracticeCard({ heading, body, index, progress, service, contact, reducedMotion }) {
  const start = .04 + index * .27;
  const opacity = useTransform(progress, [start, start + .21], [.34, 1]);
  const y = useTransform(progress, [start, start + .21], [22, 0]);

  const tilt = (event) => {
    if (event.pointerType === 'touch' || reducedMotion) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
    card.style.setProperty('--gloss-x', `${((x + .5) * 100).toFixed(1)}%`);
    card.style.setProperty('--gloss-y', `${((y + .5) * 100).toFixed(1)}%`);
  };
  const reset = (event) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--gloss-x', '50%');
    card.style.setProperty('--gloss-y', '50%');
  };

  return <div className="practice-row">
    <span className="practice-node" aria-hidden="true"/>
    <motion.div className="practice-reveal" style={reducedMotion ? undefined : { opacity, y }}>
      <div className="practice-card" onPointerMove={tilt} onPointerLeave={reset}>
        <span className="inner-kicker">0{index + 1} / IN PRACTICE</span>
        <h3>{heading}</h3>
        <p>{body}</p>
        <a href={contact} aria-label={`Discuss ${heading.toLowerCase()} for ${service.title}`}>Discuss this part <span aria-hidden="true">→</span></a>
      </div>
    </motion.div>
  </div>;
}

export function ServicePractice({ details, service }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 82%', 'end 22%'] });
  const reducedMotion = useReducedMotion();
  const contact = `/contact?service=${encodeURIComponent(service.title)}`;

  return <div className="practice-timeline" ref={ref} aria-label={`${service.title} in practice`}>
    <span className="practice-line-track" aria-hidden="true"/>
    <motion.span className="practice-line-fill" style={{ scaleY: scrollYProgress }} aria-hidden="true"/>
    {details.map(([heading, body], index) => <PracticeCard key={heading} heading={heading} body={body} index={index} progress={scrollYProgress} service={service} contact={contact} reducedMotion={reducedMotion}/>)}
  </div>;
}

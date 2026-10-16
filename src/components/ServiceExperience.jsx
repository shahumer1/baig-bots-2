import { motion } from 'motion/react';
import { Reveal } from './Reveal.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';
import { innerAreaNotes, innerPreviewKinds, innerPreviewSteps, legacyExperience } from './serviceExperienceData.js';

export function Preview({ kind, steps, title, caption = 'ILLUSTRATIVE FLOW / SELECT AN AREA' }) {
  return <div className={`sx-preview sx-preview-${kind}`} aria-hidden="true">
    <div className="sx-preview-top"><span><i/> INTERACTIVE VIEW</span><span>{title.toUpperCase()}</span></div>
    <div className="sx-preview-stage" key={`${kind}-${steps.join('-')}`}>
      {kind === 'conversation' && <div className="sx-chat">
        <div className="sx-chat-bubble">{steps[0]}<span>●</span></div>
        <div className="sx-chat-route"><i/><i/><i/></div>
        <div className="sx-chat-bubble sx-chat-reply">{steps[1]}<span>→</span></div>
        <div className="sx-chat-status"><span className="sx-chat-pulse"/>{steps[2]}</div>
      </div>}
      {kind === 'flow' && <div className="sx-flow"><div className="sx-flow-route"/><div className="sx-flow-nodes">{steps.map((step,i)=><div key={`${step}-${i}`} className="sx-flow-node"><small>0{i+1}</small><strong>{step}</strong></div>)}</div><div className="sx-flow-note">EVENT → CHECK → OUTCOME</div></div>}
      {kind === 'dashboard' && <div className="sx-dashboard"><div className="sx-dashboard-head"><span>{steps[2]} / OVERVIEW</span><i/></div><div className="sx-dashboard-grid"><div><small>{steps[0]}</small><div className="sx-dashboard-lines"><i/><i/><i/></div></div><div><small>{steps[1]}</small><div className="sx-dashboard-ring"/></div><div className="sx-dashboard-chart"><small>{steps[2]}</small><div>{[1,2,3,4,5,6,7].map(i=><i key={i} style={{'--n':i}}/>)}</div></div></div></div>}
      {kind === 'interface' && <div className="sx-interface"><div className="sx-interface-bar"><i/><i/><i/><span>{steps[0]} / APP</span></div><div className="sx-interface-body"><div className="sx-interface-rail"><b>{steps[0]}</b><i/><i/><i/></div><div className="sx-interface-content"><small>{steps[1]}</small><strong>{steps[2]}</strong><div><i/><i/></div><span>OPEN VIEW →</span></div></div></div>}
      {kind === 'board' && <div className="sx-board"><div className="sx-board-top">WORKFLOW / BOARD <span>● ACTIVE</span></div><div className="sx-board-cols">{steps.map((step,i)=><div key={`${step}-${i}`}><small>0{i+1} / {step}</small><span/><span/></div>)}</div><div className="sx-board-cursor">→</div></div>}
      {kind === 'canvas' && <div className="sx-canvas"><div className="sx-canvas-art"><div/><div/><div/></div><div className="sx-canvas-caption"><small>CREATIVE / PROCESS</small><strong>{steps[1]}</strong></div><div className="sx-canvas-timeline">{steps.map((step,i)=><span key={`${step}-${i}`}>{step}</span>)}</div></div>}
    </div>
    <div className="sx-preview-bottom"><span>{caption}</span><span>→</span></div>
  </div>;
}

export function ServiceExperience({ service, editorial }) {
  const legacy = legacyExperience[service.slug];
  const areas = legacy ? legacy.areas.map(([title, lead, body, steps]) => ({title, lead, body, steps})) : editorial.types.slice(0,3).map(([title, body],i) => ({title, lead: title, body: `${body} ${innerAreaNotes[service.slug][i]}`, steps: innerPreviewSteps[service.slug][i]}));
  const { active, choose, ref, started } = useAutoAdvance(areas.length, 4000);
  const kind = legacy?.kind || innerPreviewKinds[service.slug];
  const current = areas[active];
  const contact = `/contact?service=${encodeURIComponent(service.title)}`;

  return <>
    <section className="inner-section wrap sx-section" aria-labelledby="sx-heading"><Reveal className="sx-heading"><p className="eyebrow"><span className="dot"/>Explore the service</p><h2 id="sx-heading" className="h2">{service.title}, in practice.</h2><p>Watch each area unfold, or select one to see the work behind it.</p></Reveal>
      <div className="sx-explorer" ref={ref}><div className="sx-choices" role="group" aria-label={`Explore ${service.title}`}>{areas.map((area,i)=><button className="sx-choice" type="button" key={area.title} aria-pressed={active===i} onClick={()=>choose(i)}><span>0{i+1} / AREA</span><strong>{area.title}</strong><i aria-hidden="true">→</i>{active===i && started && <motion.span className="sx-timer" key={`${active}-${area.title}`} initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:4,ease:'linear'}} aria-hidden="true"/>}</button>)}</div>
        <motion.div className="sx-selected" key={active} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55,ease:[.22,1,.36,1]}}><div className="sx-selected-copy"><span className="inner-kicker">SELECTED / 0{active+1}</span><h3>{current.lead}</h3><p>{current.body}</p><div className="sx-step-list">{current.steps.map((step,i)=><span key={`${step}-${i}`}><b>0{i+1}</b>{step}</span>)}</div><a className="sx-contact-link" href={contact}>Discuss this service <span aria-hidden="true">→</span></a></div><Preview kind={kind} steps={current.steps} title={service.title}/></motion.div>
      </div>
    </section>
    <section className="inner-section wrap sx-next"><Reveal className="sx-next-inner"><div><p className="eyebrow"><span className="dot"/>Plan the right next step</p><h2 className="h2">Let's map this to your workflow.</h2><p>Tell us what your team needs to do, which systems are involved and where the current process gets stuck. We can discuss a suitable scope from there.</p></div><a className="btn btn-primary" href={contact}><span>Contact us about {service.title} →</span></a></Reveal></section>
  </>;
}

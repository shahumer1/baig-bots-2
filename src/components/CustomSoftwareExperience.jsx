import { motion } from 'motion/react';
import { Reveal } from './Reveal.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const areas = [
  {
    title: 'Customer and admin portals',
    label: 'PORTALS',
    lead: 'Give customers a clear place to act, and your team a clear place to manage the work behind it.',
    body: 'A portal can bring requests, records, documents and updates into one journey. Customer views keep the next action simple; admin views help teams review submissions, manage access and follow each case through to completion.',
    points: ['Role-based customer and team views', 'Forms, records and status updates', 'Clear handovers and permissions'],
  },
  {
    title: 'Dashboards and business applications',
    label: 'APPLICATIONS',
    lead: 'Turn scattered information into a usable workspace for decisions and daily operations.',
    body: 'A business application can combine the tools your team needs to review work, update records and see what needs attention. Dashboards focus on useful signals and actions, with filters and views shaped around each role.',
    points: ['Operational views and useful filters', 'Actions connected to the underlying records', 'Responsive interfaces for real workflows'],
  },
  {
    title: 'Scalable APIs and SaaS platforms',
    label: 'PLATFORMS',
    lead: 'Build a dependable foundation for a product that needs to connect systems and grow over time.',
    body: 'APIs give interfaces and external services a defined way to exchange data. For a SaaS product, the application structure also needs to account for users, access, repeatable workflows and maintainable integrations as requirements evolve.',
    points: ['Defined endpoints and data flows', 'User access and product workflows', 'Integration-ready application structure'],
  },
];

function ProductVisual({ active }) {
  return <div className="cs-visual" aria-hidden="true" key={active}>
    <div className="cs-visual-top"><span className="cs-visual-lights"><i/><i/><i/></span><span>BAIG BOTS / {areas[active].label}</span><span>● LIVE VIEW</span></div>
    {active === 0 && <div className="cs-portal-demo">
      <div className="cs-demo-sidebar"><b>PORTAL</b><span className="is-on">Overview</span><span>Requests</span><span>Documents</span><span>Settings</span></div>
      <div className="cs-demo-main"><small>CUSTOMER VIEW</small><strong>One place for every next step.</strong><div className="cs-demo-progress"><i/></div><div className="cs-demo-request"><span><em/> Request received</span><b>01</b></div><div className="cs-demo-request"><span><em/> Team review</span><b>02</b></div><div className="cs-demo-request"><span><em/> Status update</span><b>03</b></div></div>
    </div>}
    {active === 1 && <div className="cs-dashboard-demo"><div className="cs-dash-heading"><small>OPERATIONS / OVERVIEW</small><strong>Work at a glance</strong></div><div className="cs-dash-grid"><div><small>NEW REQUESTS</small><span className="cs-dash-lines"><i/><i/><i/></span></div><div><small>IN REVIEW</small><span className="cs-dash-ring"/></div><div className="cs-dash-wide"><small>ACTIVITY / FLOW</small><span className="cs-dash-chart"><i/><i/><i/><i/><i/><i/><i/><i/></span></div></div></div>}
    {active === 2 && <div className="cs-api-demo"><small>CONNECTED PRODUCT / DATA FLOW</small><div className="cs-api-flow"><span>WEB APP</span><i/><b>API</b><i/><span>DATA</span></div><div className="cs-api-modules"><span>ACCESS</span><span>WORKFLOWS</span><span>INTEGRATIONS</span></div><div className="cs-api-console"><i/><i/><i/></div></div>}
    <div className="cs-visual-bottom"><span>01 / 03 · EXPLORE THE CAPABILITY</span><span>→</span></div>
  </div>;
}

export function CustomSoftwareExperience() {
  const { active, choose, ref, started } = useAutoAdvance(areas.length, 4000);
  const current = areas[active];
  const contact = '/contact?service=Custom%20Software%20%26%20SaaS';

  return <>
    <section className="inner-section wrap cs-section" aria-labelledby="cs-heading">
      <Reveal className="cs-heading"><p className="eyebrow"><span className="dot"/>What we build</p><h2 id="cs-heading" className="h2" data-split="">Software shaped around the work.</h2><p>Explore three ways a custom product can help people complete tasks, understand information and connect systems. Select an area to see how it works.</p></Reveal>
      <div className="cs-explorer" ref={ref}>
        <div className="cs-options" role="group" aria-label="Explore custom software capabilities">{areas.map((area, index) => <button className="cs-option" type="button" key={area.title} aria-pressed={active === index} onClick={() => choose(index)}><span className="cs-option-index">0{index + 1} / {area.label}</span><strong>{area.title}</strong>{active===index && started && <motion.span className="cs-timer" key={`${active}-${area.label}`} initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:4,ease:'linear'}} aria-hidden="true"/>}</button>)}</div>
        <motion.div className="cs-detail" key={active} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.55,ease:[.22,1,.36,1]}}><div className="cs-detail-copy"><span className="inner-kicker">SELECTED / {current.label}</span><h3>{current.lead}</h3><p>{current.body}</p><ul>{current.points.map(point => <li key={point}>{point}</li>)}</ul><a className="cs-text-cta" href={contact}>Discuss this with us</a></div><ProductVisual active={active}/></motion.div>
      </div>
    </section>
    <section className="inner-section wrap cs-next"><Reveal className="cs-next-inner"><div><p className="eyebrow"><span className="dot"/>Your product, mapped properly</p><h2 className="h2" data-split="">Start with the user journey. Build the right system around it.</h2><p>Tell us who will use the product, what they need to do and which existing tools it should connect to. We can shape the scope, interface and technical approach from there.</p></div><a className="btn btn-primary" href={contact}><span>Discuss your project</span></a></Reveal></section>
  </>;
}

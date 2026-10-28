import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal } from './Reveal.jsx';
import { ServicePractice } from './ServicePractice.jsx';
import { serviceLabData } from './serviceLabData.js';

function WebVisual() {
  const [device, setDevice] = useState('Desktop');
  return <div className="lab-web"><div className="lab-control" role="group" aria-label="Preview screen size">{['Desktop','Tablet','Phone'].map(name=><button key={name} type="button" aria-pressed={device===name} onClick={()=>setDevice(name)}>{name}</button>)}</div><div className={`lab-browser lab-browser-${device.toLowerCase()}`}><div className="lab-browser-bar"><i/><i/><i/><span>website / responsive preview</span></div><div className="lab-browser-nav"><b>BRAND</b><span>Services</span><span>About</span><span>Contact</span></div><div className="lab-browser-body"><div><small>01 / EXPERIENCE</small><strong>Find what you need.<br/>Take the next step.</strong><em>Explore service →</em></div><aside><span/><span/><span/></aside></div><div className="lab-browser-cards"><i/><i/><i/></div></div></div>;
}

function RouteVisual() {
  const labels = ['REQUEST','CHECK','APPROVE','UPDATE'];
  return <div className="lab-route lab-route-workflow"><div className="lab-route-rail" aria-hidden="true"><span className="lab-route-packet"/></div><div className="lab-route-nodes">{labels.map((label,i)=><div className="lab-route-node" key={label}><small>0{i+1}</small><strong>{label}</strong><span>{['New enquiry','Required fields','Human decision','Outcome logged'][i]}</span></div>)}</div><div className="lab-route-branch"><span>NEEDS REVIEW</span><i/>RETURN TO OWNER</div><div className="lab-route-footer">TRIGGER → DECISION → ACTION</div></div>;
}

function CloudVisual() {
  return <div className="lab-cloud-map"><div className="lab-cloud-center"><span className="lab-cloud-symbol">☁</span><strong>APPLICATION</strong><small>DEPLOYED SERVICE</small></div><div className="lab-cloud-connection lab-cloud-connection-one"><i/></div><div className="lab-cloud-connection lab-cloud-connection-two"><i/></div><div className="lab-cloud-connection lab-cloud-connection-three"><i/></div><div className="lab-cloud-connection lab-cloud-connection-four"><i/></div><div className="lab-cloud-satellite satellite-one"><small>01 / BUILD</small><strong>Change</strong></div><div className="lab-cloud-satellite satellite-two"><small>02 / RELEASE</small><strong>Environment</strong></div><div className="lab-cloud-satellite satellite-three"><small>03 / OBSERVE</small><strong>Logs & health</strong></div><div className="lab-cloud-satellite satellite-four"><small>04 / RECOVER</small><strong>Backup plan</strong></div></div>;
}

function ApiVisual() {
  const [view, setView] = useState('request');
  return <div className="lab-api"><div className="lab-api-apps"><div><small>SOURCE</small><strong>BOOKING APP</strong></div><div><small>DESTINATION</small><strong>CRM RECORD</strong></div></div><div className="lab-api-wire"><span>POST /booking</span><i/></div><div className="lab-api-gate"><span>AUTH</span><span>VALIDATE</span><span>MAP FIELDS</span></div><div className="lab-api-wire lab-api-wire-return"><span>200 / accepted</span><i/></div><div className="lab-api-status"><div className="lab-control" role="group" aria-label="Inspect API result"><button type="button" aria-pressed={view==='request'} onClick={()=>setView('request')}>Request</button><button type="button" aria-pressed={view==='error'} onClick={()=>setView('error')}>Error path</button></div><p>{view==='request'?'Validated fields reach the destination; the source receives an acknowledgement.':'A rejected or missing field is logged and returned for correction or retry.'}</p></div></div>;
}

function AgentVisual() {
  return <div className="lab-agent"><div className="lab-agent-head"><span className="lab-live"/>BOOKING ASSISTANT <small>SCOPED EXAMPLE</small></div><div className="lab-messages"><p className="lab-message lab-message-user">Can I book a consultation?</p><p className="lab-message lab-message-bot">I can help with that. Which day works for you?</p><p className="lab-message lab-message-user">Thursday afternoon.</p><p className="lab-message lab-message-bot">I’ll pass your preferred time to the team for confirmation.</p></div><div className="lab-agent-handoff"><span>AGENT</span><i/><span>TEAM REVIEW</span><i/><span>CONFIRMATION</span></div></div>;
}

function VisionVisual() {
  const [scanned, setScanned] = useState(false);
  return <div className="lab-vision"><div className="lab-vision-image" data-scanned={scanned}><div className="lab-vision-shape shape-one"/><div className="lab-vision-shape shape-two"/><div className="lab-vision-shape shape-three"/><span className="lab-vision-sweep"/><div className="lab-vision-box box-one">REGION 01</div><div className="lab-vision-box box-two">REGION 02</div></div><div className="lab-vision-bottom"><p>{scanned?'Illustrative regions marked for human review.':'Sample visual input / no image uploaded.'}</p><button type="button" onClick={()=>setScanned(value=>!value)}>{scanned?'Reset review':'Run sample scan'}</button></div></div>;
}

function CrmVisual() {
  const [stage, setStage] = useState(0);
  const stages = ['ENQUIRY','ASSIGNED','FOLLOW-UP'];
  return <div className="lab-crm"><div className="lab-crm-top"><span>RECORD / EXAMPLE</span><span>OWNER VISIBLE</span></div><div className="lab-crm-stages">{stages.map((label,i)=><button type="button" key={label} aria-pressed={stage===i} onClick={()=>setStage(i)}><small>0{i+1}</small>{label}{stage===i&&<span className="lab-crm-record">Customer request <b>→</b></span>}</button>)}</div><div className="lab-crm-status">{['New request captured with its source.','The right person owns the next action.','Reminder and outcome stay with the record.'][stage]}</div></div>;
}

function TransformVisual() {
  const [connected, setConnected] = useState(true);
  return <div className="lab-transform"><div className="lab-control" role="group" aria-label="Compare process states"><button type="button" aria-pressed={!connected} onClick={()=>setConnected(false)}>Before</button><button type="button" aria-pressed={connected} onClick={()=>setConnected(true)}>Connected flow</button></div><div className={`lab-transform-flow ${connected?'is-connected':''}`}>{(connected?['REQUEST','SHARED RECORD','OWNER','NEXT ACTION']:['EMAIL','SPREADSHEET','FOLLOW-UP?','STATUS?']).map((label,i)=><div key={`${connected}-${label}`}><small>0{i+1}</small><strong>{label}</strong></div>)}</div><p>{connected?'A request moves through one visible, owned journey.':'Information is copied between tools; ownership and status are unclear.'}</p></div>;
}

const visualBySlug = {
  'web-development': WebVisual,
  'cloud-infrastructure': CloudVisual,
  'ai-agents-chatbots': AgentVisual,
  'computer-vision': VisionVisual,
  'crm-erp-systems': CrmVisual,
  'workflow-automation': RouteVisual,
  'api-integrations': ApiVisual,
  'digital-transformation': TransformVisual,
};

function LabHeading({ title, id }) {
  const words = title.split(' ');
  return <h2 className="h2 lab-heading" id={id}>{words.map((word, index) => <span key={`${word}-${index}`}><span className="lab-heading-fragment"><span className="lab-heading-word">{word}</span></span>{index < words.length - 1 ? ' ' : null}</span>)}</h2>;
}

export function ServiceLab({ service }) {
  const layoutRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: layoutRef, offset: ['start 85%', 'end 25%'] });
  const visualShift = useTransform(scrollYProgress, [0, 1], [-18, 26]);
  const reducedMotion = useReducedMotion();
  const data = serviceLabData[service.slug];
  if (!data) return null;
  const Visual = visualBySlug[service.slug];
  const contact = `/contact?service=${encodeURIComponent(service.title)}`;
  const visual = <Reveal className="lab-visual"><div className="lab-visual-top"><span>INTERACTIVE / {service.title.toUpperCase()}</span><span className="lab-live">LIVE VIEW</span></div><Visual/><p className="lab-visual-note">{data.note}</p></Reveal>;
  return <section className={`inner-section wrap lab-section lab-${service.visual}`} aria-labelledby={`lab-${service.slug}`}>
    <Reveal className="lab-intro"><p className="eyebrow"><span className="dot"/>{data.eyebrow}</p><LabHeading title={data.title} id={`lab-${service.slug}`}/><p>{data.intro}</p><a className="inner-text-link" href={contact}>{data.cta} <span aria-hidden="true">→</span></a></Reveal>
    <div className="lab-layout" ref={layoutRef}><motion.div className="lab-visual-motion" style={reducedMotion ? undefined : { y: visualShift }}>{visual}</motion.div><ServicePractice details={data.details} service={service}/></div>
  </section>;
}

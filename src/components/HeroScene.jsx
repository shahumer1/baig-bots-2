import { useEffect, useRef, useState } from 'react';
import { innerIndustries, innerServices } from './innerData.js';
import { industryEditorial } from './innerEditorial.js';
import { RobotWorkstation } from './RobotWorkstation.jsx';
import { motion } from 'motion/react';
import { Preview } from './ServiceExperience.jsx';
import { legacyExperience } from './serviceExperienceData.js';

const heroTabs = {
  web:['React app','WordPress site','Node.js API'],
  vision:['Input','Analyse','Review'],
  crm:['Enquiry','Qualified','Follow-up'],
  workflow:['Trigger','Decision','Action'],
  api:['Request','Validate','Response'],
  transform:['Current work','Connected tools','Next step'],
};

function useMovingSelection(count, delay = 3400) {
  const [selection, setSelection] = useState({ active: 0, cycle: 0 });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timer = window.setTimeout(() => {
      setSelection(current => ({ active: (current.active + 1) % count, cycle: current.cycle + 1 }));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [count, delay, selection.cycle]);
  const choose = (index) => setSelection(current => ({ active: index, cycle: current.cycle + 1 }));
  return [selection.active, choose];
}

function SceneFrame({ label, note, children, className = '' }) {
  return <div className={`inner-hero-scene ${className}`}>
    <div className="inner-scene-head"><span className="inner-scene-led"/><span>{label}</span><span className="inner-scene-note">{note}</span></div>
    {children}
  </div>;
}

function StageTabs({ tabs, active, setActive }) {
  return <div className="inner-scene-tabs" role="group" aria-label="Explore visual stages">{tabs.map((tab,index)=><button type="button" key={tab} aria-pressed={active===index} onClick={()=>setActive(index)}>{tab}</button>)}</div>;
}

function WebPreview({ active }) {
  if (active === 1) return <div className="inner-browser-preview inner-browser-preview-cms" key="wordpress">
    <div className="inner-browser-overline">CONTENT / EDITOR</div>
    <div className="inner-browser-title">Publish and update pages</div>
    <div className="inner-cms-editor"><span>Page title</span><b>Services and updates</b><i/><i/><i/></div>
    <div className="inner-browser-action">WordPress / CMS</div>
  </div>;
  if (active === 2) return <div className="inner-browser-preview inner-browser-preview-api" key="node">
    <div className="inner-browser-overline">SERVER / RESPONSE</div>
    <div className="inner-browser-title">Connect an application</div>
    <div className="inner-api-console"><span>GET /api/records</span><code>{'{ "status": "ok" }'}</code><code>{'{ "data": [...] }'}</code></div>
    <div className="inner-browser-action">Node.js / API</div>
  </div>;
  return <div className="inner-browser-preview inner-browser-preview-app" key="react">
    <div className="inner-browser-overline">INTERFACE / COMPONENTS</div>
    <div className="inner-browser-title">Interactive application</div>
    <div className="inner-app-layout"><span>Overview <b>→</b></span><div><i/><i/><i/></div></div>
    <div className="inner-browser-action">React + JavaScript</div>
  </div>;
}

const appointmentMessages = [
  { role: 'user', text: "Hi, I'd like to book an appointment." },
  { role: 'assistant', text: 'Of course. Which day works for you?' },
  { role: 'user', text: 'Tomorrow afternoon.' },
  { role: 'assistant', text: 'I can offer 3:00 PM or 4:30 PM. Which works better?' },
  { role: 'user', text: '3:00 PM, please.' },
  { role: 'assistant', text: 'Great. What name should I use for the booking?' },
  { role: 'user', text: "It's Alex." },
  { role: 'assistant', text: "You're booked for tomorrow at 3:00 PM, Alex. See you then!", confirmed: true },
];

function AgentsScene() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [typing, setTyping] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const messagesRef = useRef(null);
  const scrollFrameRef = useRef(null);

  useEffect(() => {
    if (visibleCount === appointmentMessages.length) {
      const fade = window.setTimeout(() => setRestarting(true), 2600);
      const restart = window.setTimeout(() => {
        if (messagesRef.current) messagesRef.current.scrollTop = 0;
        setVisibleCount(1);
        setRestarting(false);
      }, 3200);
      return () => { window.clearTimeout(fade); window.clearTimeout(restart); };
    }
    const nextIsAssistant = appointmentMessages[visibleCount].role === 'assistant';
    const typingTimer = nextIsAssistant ? window.setTimeout(() => setTyping(true), 350) : null;
    const nextMessage = window.setTimeout(() => {
      setTyping(false);
      setVisibleCount(count => count + 1);
    }, nextIsAssistant ? 1600 : 1150);
    return () => {
      if (typingTimer) window.clearTimeout(typingTimer);
      window.clearTimeout(nextMessage);
    };
  }, [visibleCount]);

  useEffect(() => {
    const pane = messagesRef.current;
    if (!pane) return;
    if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    if (visibleCount === 1 && !typing) {
      pane.scrollTop = 0;
      return;
    }
    const start = pane.scrollTop;
    const destination = Math.max(0, pane.scrollHeight - pane.clientHeight);
    if (destination <= start) return;
    const startedAt = window.performance.now();
    const duration = 650;
    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      pane.scrollTop = start + (destination - start) * ease;
      if (progress < 1) scrollFrameRef.current = window.requestAnimationFrame(step);
    };
    scrollFrameRef.current = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(scrollFrameRef.current);
  }, [visibleCount, typing]);

  return <SceneFrame label="AI AGENT / BOOKING DEMO" note="SAMPLE CONVERSATION" className="inner-scene-agents">
    <div className="inner-agent-chat" aria-label="Illustrative appointment booking conversation">
      <div className="inner-agent-chat-header"><div><strong>Appointment assistant</strong><span>Here to help you book</span></div><span className="inner-agent-online"><i/> ONLINE</span></div>
      <div className={`inner-agent-messages${restarting ? ' restarting' : ''}`} ref={messagesRef} aria-live="off">
        {appointmentMessages.slice(0, visibleCount).map((message, index) => <div className={`inner-chat-message ${message.role}${message.confirmed ? ' confirmed' : ''}`} key={index}>
          <span className="inner-chat-author">{message.role === 'user' ? 'YOU' : 'ASSISTANT'}</span>
          <p>{message.text}</p>
          {message.confirmed && <span className="inner-chat-booked">✓ APPOINTMENT BOOKED</span>}
        </div>)}
        {typing && <div className="inner-chat-typing" aria-label="Assistant is typing"><span>Assistant is typing</span><i/><i/><i/></div>}
      </div>
    </div>
  </SceneFrame>;
}

const cloudNodes = [
  { label: 'USER', x: 18, y: 38, width: 88, points: [[106, 54], [146, 54], [146, 148], [193, 148]], direction: 'in', delay: '-0.3s' },
  { label: 'WEB APP', x: 182, y: 18, width: 96, points: [[230, 50], [230, 123]], direction: 'in', delay: '-1.8s' },
  { label: 'CRM', x: 352, y: 44, width: 86, points: [[352, 60], [318, 60], [318, 136], [285, 136]], direction: 'out', delay: '-2.6s' },
  { label: 'API', x: 366, y: 158, width: 78, points: [[366, 174], [315, 174]], direction: 'in', delay: '-1s' },
  { label: 'DATABASE', x: 344, y: 278, width: 100, points: [[344, 294], [319, 294], [319, 236], [283, 236], [283, 210]], direction: 'out', delay: '-3.1s' },
  { label: 'SERVER', x: 183, y: 302, width: 94, points: [[230, 302], [230, 209]], direction: 'in', delay: '-2.2s' },
  { label: 'MONITOR', x: 20, y: 267, width: 100, points: [[120, 283], [153, 283], [153, 226], [193, 226], [193, 207]], direction: 'out', delay: '-0.8s' },
];

function CloudScene() {
  return <SceneFrame label="CLOUD / DATA FLOW" note="CONNECTED SYSTEMS" className="inner-scene-cloud">
    <div className="inner-cloud-map">
      <svg viewBox="0 0 460 350" role="img" aria-label="Data moving between users, applications, CRM, API, database, server, monitoring, and a central cloud">
        <circle className="inner-cloud-halo" cx="240" cy="169" r="72"/>
        {cloudNodes.map((node) => {
          const route = (points) => points.map(([x, y], index) => `${index ? 'L' : 'M'} ${x} ${y}`).join(' ');
          const motion = route(node.direction === 'out' ? [...node.points].reverse() : node.points);
          return <g className="inner-cloud-connection" key={node.label}>
            <path className="inner-cloud-route" d={route(node.points)}/>
            <circle className={`inner-cloud-data-packet ${node.direction}`} r="4.5">
              <animateMotion path={motion} dur="3.4s" begin={node.delay} repeatCount="indefinite" calcMode="linear"/>
            </circle>
            <g className="inner-cloud-node-visual">
              <polygon className="inner-cloud-node" points={`${node.x},${node.y} ${node.x + node.width - 9},${node.y} ${node.x + node.width},${node.y + 9} ${node.x + node.width},${node.y + 32} ${node.x + 9},${node.y + 32} ${node.x},${node.y + 23}`}/>
              <path className="inner-cloud-node-gloss" d={`M ${node.x + 2} ${node.y + 21} V ${node.y + 2} H ${node.x + node.width - 12}`}/>
              <circle className="inner-cloud-node-led" cx={node.x + 11} cy={node.y + 16} r="2.5"/>
              <text className="inner-cloud-node-label" x={node.x + node.width / 2 + 5} y={node.y + 20} textAnchor="middle">{node.label}</text>
            </g>
          </g>;
        })}
        <path className="inner-cloud-core" d="M194 211 C174 211 160 195 160 177 C160 158 175 144 194 144 C199 124 216 110 239 110 C260 110 275 123 281 143 C302 141 319 157 319 177 C319 196 303 211 283 211 Z"/>
        <text className="inner-cloud-core-title" x="240" y="169" textAnchor="middle">CLOUD</text>
        <text className="inner-cloud-core-subtitle" x="240" y="188" textAnchor="middle">DATA HUB</text>
      </svg>
    </div>
  </SceneFrame>;
}

function ServiceScene({ kind }) {
  const tabs=heroTabs[kind] || heroTabs.workflow;
  const [active,setActive]=useMovingSelection(tabs.length, kind === 'web' ? 2000 : 3400);
  return <SceneFrame label={`${kind.toUpperCase()} / INTERACTIVE VIEW`} note="AUTO / SELECT A STAGE" className={`inner-scene-${kind}`}>
    {kind==='web' && <div className="inner-browser">
      <div className="inner-browser-bar"><i/><i/><i/><span>baigbots / {['app','site','api'][active]}</span></div>
      <div className="inner-browser-body"><div className="inner-browser-nav"><b>{['APP','CMS','API'][active]}</b><span>{['Dashboard','Pages','Routes'][active]}</span><span>{['Components','Content','Requests'][active]}</span><span>{['Connect','Publish','Response'][active]}</span></div><WebPreview active={active}/></div>
    </div>}
    {kind==='vision' && <div className="inner-vision-layout"><div className="inner-vision-scan"><span className="inner-vision-object a"/><span className="inner-vision-object b"/><span className="inner-vision-target"/><span className="inner-vision-sweep"/><span className="inner-vision-readout">{tabs[active].toUpperCase()} / IN PROGRESS</span></div><div className="inner-vision-side"><b>{tabs[active]}</b><span>Visual input</span><span>Defined task</span><span>Human review</span></div></div>}
    {kind==='crm' && <div className="inner-crm-layout">{tabs.map((tab,index)=><div className={`inner-crm-lane ${active===index?'selected':''}`} key={tab}><span>{tab}</span><div className="inner-crm-record"><i/><i/><i/></div><div className="inner-crm-record small"><i/><i/></div></div>)}<div className="inner-crm-route" aria-hidden="true"><span/></div></div>}
    {kind==='workflow' && <div className="inner-workflow-layout">{tabs.map((tab,index)=><div className={`inner-workflow-node ${active===index?'selected':''}`} key={tab}><span>{String(index+1).padStart(2,'0')}</span><b>{tab}</b><small>{['New event','Check rules','Update system'][index]}</small><i className="inner-workflow-signal" aria-hidden="true"/></div>)}</div>}
    {kind==='api' && <div className="inner-api-layout"><div className="inner-api-end">SOURCE<small>application</small></div><div className="inner-api-packet"><div className="inner-api-wire" aria-hidden="true"><span className="request"/><span className="response"/></div><code key={active}>{['POST /request','check → map','200 / response'][active]}</code></div><div className="inner-api-end">DESTINATION<small>system</small></div></div>}
    {kind==='transform' && <div className="inner-transform-layout"><div className="inner-transform-before"><span>MANUAL</span><i/><i/><i/></div><div className="inner-transform-arrow" aria-hidden="true"><i/>→</div><div key={active} className="inner-transform-after"><span>{tabs[active]}</span><div><b>Record</b><b>Flow</b><b>Team</b></div></div></div>}
    <StageTabs tabs={tabs} active={active} setActive={setActive}/>
  </SceneFrame>;
}

function LegacyServiceScene({ service }) {
  const experience = legacyExperience[service.slug];
  const [active] = useMovingSelection(experience.areas.length, 3300);
  const [area, lead, , steps] = experience.areas[active];
  return <div className="legacy-hero-scene" aria-label={`Animated ${service.title} service preview`}>
    <motion.div key={`${service.slug}-${active}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
      <Preview kind={experience.kind} steps={steps} title={service.title} caption={`0${active+1} / ${area.toUpperCase()}`}/>
      <div className="legacy-hero-description"><span className="inner-kicker">SERVICE IN MOTION / 0{active+1}</span><strong>{lead}</strong></div>
    </motion.div>
  </div>;
}

function ServicesScene() {
  const [active,setActive]=useMovingSelection(innerServices.length, 2000);
  return <SceneFrame label="SERVICE DIRECTORY" note="AUTO / EXPLORE A CAPABILITY" className="inner-scene-directory"><div className="inner-directory-layout"><div className="inner-directory-list">{innerServices.map((item,index)=><button type="button" key={item.slug} aria-pressed={active===index} onClick={()=>setActive(index)}><span>{String(index+1).padStart(2,'0')}</span>{item.title}</button>)}</div><div key={active} className="inner-directory-feature"><span>SELECTED SERVICE</span><strong>{innerServices[active].title}</strong><p>{innerServices[active].intro}</p><a href={`/services/${innerServices[active].slug}`}>View service →</a></div></div></SceneFrame>;
}

function IndustriesScene() {
  const [active,setActive]=useMovingSelection(innerIndustries.length, 2000);
  return <SceneFrame label="INDUSTRY DIRECTORY" note="AUTO / CHOOSE A WORKFLOW" className="inner-scene-directory"><div className="inner-directory-layout"><div className="inner-directory-list">{innerIndustries.map((item,index)=><button type="button" key={item.slug} aria-pressed={active===index} onClick={()=>setActive(index)}><span>{String(index+1).padStart(2,'0')}</span>{item.title}</button>)}</div><div key={active} className="inner-directory-feature"><span>INDUSTRY FOCUS</span><strong>{innerIndustries[active].title}</strong><p>{innerIndustries[active].intro}</p><a href={`/industries/${innerIndustries[active].slug}`}>View industry →</a></div></div></SceneFrame>;
}

function IndustryScene({ industry }) {
  const stages=industryEditorial[industry.slug]?.workflow || ['Enquiry','Team action','Follow-up'];
  const [active,setActive]=useMovingSelection(stages.length);
  return <SceneFrame label={`${industry.title.toUpperCase()} / WORKFLOW`} note="AUTO / SELECT A STAGE" className={`inner-scene-industry inner-scene-industry-${industry.slug}`}><div className="inner-industry-scene-flow">{stages.map((stage,index)=><button type="button" key={stage} className={active===index?'selected':''} onClick={()=>setActive(index)} aria-pressed={active===index}><span>{String(index+1).padStart(2,'0')}</span><b>{stage}</b></button>)}</div><p className="inner-industry-scene-caption">{industry.intro}</p></SceneFrame>;
}

function OtherScene() {
  const names=['React','n8n','OpenAI','GoHighLevel','HubSpot','Airtable','Slack'];
  const [active,setActive]=useMovingSelection(names.length, 2700);
  return <SceneFrame label="CONNECTED TOOLKIT" note="AUTO / EXPLORE THE PLATFORMS" className="inner-scene-other"><div className="inner-other-scene-grid">{names.map((name,index)=><button type="button" key={name} aria-pressed={active===index} onClick={()=>setActive(index)}>{name}</button>)}</div><div key={active} className="inner-other-scene-caption">{names[active]} <span>→</span> build around the workflow</div></SceneFrame>;
}

function ContactScene() {
  return <SceneFrame label="PROJECT ENQUIRY" note="A SIMPLE START" className="inner-scene-contact"><div className="inner-contact-scene-list"><div><span>01</span><b>Choose a direction</b><i/></div><div><span>02</span><b>Describe the work</b><i/></div><div><span>03</span><b>Review the next step</b><i/></div></div><a href="#contact">Open quick enquiry →</a></SceneFrame>;
}

function NotFoundScene() {
  return <SceneFrame label="ROUTE NOT FOUND" note="FIND YOUR WAY" className="inner-scene-not-found"><div className="inner-not-found-code">404<span>/</span></div><div className="inner-not-found-links"><a href="/services">All services →</a><a href="/industries">Industries →</a><a href="/contact">Contact Us →</a></div></SceneFrame>;
}

export function HeroScene({ kind, industry, legacyService }) {
  if (kind==='robot') return <RobotWorkstation/>;
  if (legacyService && legacyExperience[legacyService.slug]) return <LegacyServiceScene service={legacyService}/>;
  if (kind==='cloud') return <CloudScene/>;
  if (kind==='agents') return <AgentsScene/>;
  if (kind==='services') return <ServicesScene/>;
  if (kind==='industries') return <IndustriesScene/>;
  if (kind==='industry' && industry) return <IndustryScene industry={industry}/>;
  if (kind==='other') return <OtherScene/>;
  if (kind==='contact') return <ContactScene/>;
  if (kind==='not-found') return <NotFoundScene/>;
  return <ServiceScene kind={kind || 'workflow'}/>;
}

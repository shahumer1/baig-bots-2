import { innerServices } from '../components/innerData.js';
import { Reveal } from '../components/Reveal.jsx';
import { serviceEditorial } from '../components/innerEditorial.js';
import { CustomSoftwareExperience } from '../components/CustomSoftwareExperience.jsx';
import { ServiceExperience } from '../components/ServiceExperience.jsx';
import { ServiceGrowth } from '../components/ServiceGrowth.jsx';
import { ServiceLab } from '../components/ServiceLab.jsx';
import { TechIcon, TechLabel } from '../components/TechIcon.jsx';
import { ProjectSteps } from '../components/ProjectSteps.jsx';
import { ServiceShowcase } from '../components/ServiceShowcase.jsx';
import { PageIntro, ServiceSectionLink, ServiceTile } from '../components/InnerPageParts.jsx';
import './service-detail-motion.css';

export function ServiceDetail({ service }) {
  const isNew = !!service.visual;
  const title = service.title;
  const intro = service.intro || service.description;
  const scene = service.slug === 'custom-software-saas' ? 'robot' : isNew ? service.visual : service.slug.includes('ai') ? 'agents' : service.slug.includes('cloud') ? 'cloud' : service.slug.includes('api') ? 'api' : service.slug.includes('crm') ? 'crm' : service.slug.includes('web') ? 'web' : 'workflow';
  const editorial = serviceEditorial[service.slug];
  const related = innerServices.filter(item=>item.slug!==service.slug).slice(0,3);
  const projectSteps = editorial?.approach || [
    `Review the current work and define the goal for ${title.toLowerCase()}.`,
    service.points?.[0] ? `Scope ${service.points[0].toLowerCase()} with the people and systems involved.` : `Agree on the deliverables, constraints and practical first release.`,
    `Build or configure the solution, test the important paths and agree on the handover.`,
  ];
  return <main id="top" className="inner-page service-detail-page"><PageIntro scene={scene} legacyService={!isNew && scene !== 'robot' ? service : undefined} eyebrow="Services / explore" title={title} description={intro}>{isNew && <div className="inner-hero-tools"><span>TECH / PLATFORMS</span>{service.stack.slice(0,4).map(tool=><b key={tool}><TechLabel name={tool}/></b>)}</div>}<a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(title)}`}><span>Discuss this service</span></a></PageIntro>
    {editorial && <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>What this service covers</p><h2 className="h2" data-split="">Built for a real job, not a template.</h2></Reveal><Reveal><p>{editorial.summary}</p><ServiceSectionLink service={service} label={`Discuss your ${title.toLowerCase()} needs`}/></Reveal></section>}
    {editorial && <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Types of work</p><h2 className="h2" data-split="">What we can build and connect.</h2></div><div className="inner-editorial-grid">{editorial.types.map(([heading,body],index)=><Reveal key={heading} className="inner-editorial-card"><span className="inner-kicker">{String(index+1).padStart(2,'0')} / OUTPUT</span><h3>{heading}</h3><p>{body}</p></Reveal>)}</div><ServiceSectionLink service={service} label="Explore a solution for your team"/></section>}
    {isNew ? <ServiceLab service={service}/> : service.slug === 'custom-software-saas' ? <CustomSoftwareExperience /> : <ServiceExperience service={service} editorial={editorial} />}
    {editorial && <section className="inner-section wrap inner-stack-section"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Technology in context</p><h2 className="h2" data-split="">Tools selected for the work.</h2><p className="inner-help">The final stack depends on your existing systems, content needs and scope.</p></div><div className="inner-stack-grid">{editorial.stackNotes.map(([name,note])=><Reveal key={name} className="inner-stack-note"><h3><TechIcon name={name}/>{name}</h3><p>{note}</p></Reveal>)}</div><ServiceSectionLink service={service} label="Discuss the right technology"/></section>}
    <ProjectSteps eyebrow="How a project starts" title="A clear path from idea to working flow." steps={projectSteps} service={service}/>
    <ServiceShowcase service={service}/>
    <ServiceGrowth service={service} />
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Keep exploring</p><h2 className="h2" data-split="">Related services.</h2></div><div className="inner-card-grid inner-related-grid">{related.map((item,index)=><ServiceTile key={item.slug} service={item} index={index}/>)}</div><ServiceSectionLink service={service} label="Talk about a connected project"/></section>
    {isNew && <section className="inner-section wrap service-final-section"><Reveal><div><p className="eyebrow"><span className="dot"/>Let's scope your project</p><h2 className="h2" data-split="">Tell us what needs to work better.</h2><p>Share the people, systems and task involved. We can map a practical next step for your {title.toLowerCase()} project.</p></div><a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(title)}`}><span>Start a {title.toLowerCase()} project</span></a></Reveal></section>}
  </main>;
}


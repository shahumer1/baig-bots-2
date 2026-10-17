import { useState } from 'react';
import { allServices as legacyServices } from './serviceData.js';
import { innerIndustries, innerServices, innerServicePath, projectReferences, serviceIndustryExamples } from './innerData.js';
import { Reveal } from './Reveal.jsx';
import { HeroScene } from './HeroScene.jsx';
import { CircuitLines } from './CircuitLines.jsx';
import { industryEditorial, serviceEditorial } from './innerEditorial.js';
import { CustomSoftwareExperience } from './CustomSoftwareExperience.jsx';
import { ServiceExperience } from './ServiceExperience.jsx';
import { ServiceGrowth } from './ServiceGrowth.jsx';
import { ServiceLab } from './ServiceLab.jsx';
import { TechIcon, TechLabel } from './TechIcon.jsx';
import { ProjectSteps } from './ProjectSteps.jsx';
import { CasePattern } from './CasePattern.jsx';
import { IndustryGrowth } from './IndustryGrowth.jsx';
import { IndustryBenefits } from './IndustryBenefits.jsx';
import { IndustryShowcase } from './IndustryShowcase.jsx';
import { HealthcarePracticeTabs } from './HealthcarePracticeTabs.jsx';
import { RealEstateOpportunityTabs } from './RealEstateOpportunityTabs.jsx';
import { FinanceOpportunityTabs } from './FinanceOpportunityTabs.jsx';
import { industryBenefits } from './industryBenefitsData.js';

function ServiceSectionLink({ service, label }) {
  return <a className="inner-text-link service-section-link" href={`/contact?service=${encodeURIComponent(service.title)}`}>{label} <span aria-hidden="true">→</span></a>;
}

function PageIntro({ eyebrow, title, description, scene = 'services', industry, legacyService, children }) {
  return <header className="inner-intro wrap">
    <CircuitLines variant="inner" />
    <div className="inner-intro-copy"><p className="eyebrow"><span className="dot" />{eyebrow}</p><h1 className="h-display">{title}</h1><p className="lead">{description}</p>{children}</div>
    <HeroScene kind={scene} industry={industry} legacyService={legacyService}/>
  </header>;
}

function ServiceTile({ service, index }) {
  return <Reveal className="inner-tile"><article className="inner-service-card">
    <div className="inner-tile-top"><span>{String(index + 1).padStart(2,'0')} / SERVICE</span><span aria-hidden="true">→</span></div>
    <div className="inner-card-symbol" data-kind={service.visual} aria-hidden="true">{({web:'{ }',cloud:'☁',agents:'✳',vision:'◎',crm:'▦',workflow:'◇',api:'⇄',transform:'→'})[service.visual] || '◇'}</div>
    <h2><a href={innerServicePath(service)}>{service.title}</a></h2><p>{service.intro}</p>
    <div className="inner-card-foot"><span>{service.visualSteps?.join(' → ') || 'Explore capability'}</span><a href={innerServicePath(service)} aria-label={`Explore ${service.title}`}>Explore <span aria-hidden="true">→</span></a></div>
  </article></Reveal>;
}

export function ServicesIndex({ category = 'all' }) {
  if (category === 'other') return <OtherPage />;
  return <main id="top" className="inner-page"><PageIntro scene="services" eyebrow="All services" title="Services built around your business." description="Explore web development, cloud infrastructure, AI, connected systems and automation. Select a service to see the work behind it."><a className="inner-text-link" href="#service-grid">Explore the services <span aria-hidden="true">→</span></a></PageIntro>
    <section id="service-grid" className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>01 / Capabilities</p><h2 className="h2" data-split="">Choose a starting point.</h2></div><div className="inner-card-grid">{innerServices.map((service,index)=><ServiceTile key={service.slug} service={service} index={index}/>)}</div></section>
    <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>How the work fits together</p><h2 className="h2" data-split="">One useful flow may cross several services.</h2></Reveal><Reveal><p>A web portal may need a CRM connection. An AI agent may need a booking API and a human handover. An automation may start in a form and finish in a team notification. We scope the actual journey first, then choose the services and platforms it needs.</p></Reveal></section>
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Examples of delivery</p><h2 className="h2" data-split="">From an interface to an operating workflow.</h2></div><div className="inner-editorial-grid"><Reveal className="inner-editorial-card"><span className="inner-kicker">PRODUCT</span><h3>Websites and applications</h3><p>Responsive sites, content-managed pages, dashboards and portals with the interactions people need to complete a task.</p></Reveal><Reveal className="inner-editorial-card"><span className="inner-kicker">CONNECTION</span><h3>Systems that share context</h3><p>APIs, webhooks and CRM or ERP links that move relevant information between the tools a team already uses.</p></Reveal><Reveal className="inner-editorial-card"><span className="inner-kicker">AUTOMATION</span><h3>Repeatable work with a clear owner</h3><p>Triggers, approvals, notifications and exceptions designed so people can see what happened and what comes next.</p></Reveal><Reveal className="inner-editorial-card"><span className="inner-kicker">AI</span><h3>Scoped assistance</h3><p>Conversational or visual workflows with defined information, review steps and a way to hand work back to a person.</p></Reveal></div></section>
    <section className="inner-section wrap"><Reveal className="inner-feature-band"><div><p className="eyebrow"><span className="dot"/>Connected delivery</p><h2 className="h2" data-split="">From a single integration to a joined-up workflow.</h2></div><a className="btn btn-primary" href="/services/other"><span>Explore platforms and use cases →</span></a></Reveal></section>
  </main>;
}

function OtherPage() {
  const [selected, setSelected] = useState('Platforms');
  const stack = [...new Set(innerServices.flatMap(service => service.stack))];
  const useCaseLinks = {
    CareClinic: ['/industries/healthcare#healthcare-practices', 'View healthcare workflow'],
    EstatePro: ['/industries/real-estate#real-estate-opportunities', 'View real estate workflow'],
    Prospectly: ['/industries/sales-lead-generation#example-workflow', 'View sales workflow'],
    'Odoo Sales AI Assistant': ['/services/ai-agents-chatbots', 'Explore AI agents'],
    'Obsidian Mail Bridge': ['/services/workflow-automation', 'Explore workflow automation'],
    'Hermes AI SDR': ['/services/ai-agents-chatbots', 'Explore AI agents'],
    'AI Video Generator': ['/services/video-digital-content', 'Explore video services'],
    'GoHighLevel Booking API': ['/services/api-integrations', 'Explore API integrations'],
    'Cash Flow Portal': ['/industries/finance-investment#finance-opportunities', 'View finance workflow'],
    'CRM implementations': ['/services/crm-erp-systems', 'Explore CRM & ERP systems'],
    'AI Voice Agents': ['/services/ai-agents-chatbots', 'Explore AI voice agents'],
    'Business workflow automation': ['/services/workflow-automation', 'Explore workflow automation'],
  };
  return <main id="top" className="inner-page"><PageIntro scene="other" eyebrow="Other / connected capabilities" title="The tools behind the work." description="Explore the platforms, integrations and use cases that can connect to a broader delivery plan." />
    <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>Choosing a platform</p><h2 className="h2" data-split="">Start with the process, then the tool.</h2></Reveal><Reveal><p>React and Node.js may suit a custom application, while WordPress may suit a site that a content team edits often. Tools such as n8n, Zapier or Power Automate can connect repeatable steps. CRM and workspace platforms bring their own records and permissions. The right combination depends on the existing systems and who will maintain the result.</p></Reveal></section>
    <section className="inner-section wrap"><div className="inner-tabs" role="group" aria-label="Explore capabilities">{['Platforms','Use cases','More services'].map(tab=><button type="button" key={tab} onClick={()=>setSelected(tab)} aria-pressed={selected===tab}>{tab}</button>)}</div>
      {selected==='Platforms' && <Reveal className="inner-platform-board"><div className="inner-platform-core">BAIG <b>BOTS</b><small>CONNECT / BUILD / AUTOMATE</small></div><div className="inner-platform-list">{stack.map((name,index)=><span key={name} style={{'--i':index}}><TechLabel name={name}/></span>)}</div></Reveal>}
      {selected==='Use cases' && <div className="inner-reference-grid">{projectReferences.map(([name,detail])=>{const [href,label]=useCaseLinks[name]; return <Reveal key={name} className="inner-reference inner-use-case-card"><span className="inner-kicker">PROJECT / USE CASE</span><h2>{name}</h2><p>{detail}</p><a className="btn btn-primary inner-reference-cta" href={href}><span>{label} →</span></a></Reveal>;})}</div>}
      {selected==='More services' && <div className="inner-reference-grid">{legacyServices.filter(item=>!innerServices.some(service=>service.title===item.title)).map(item=><Reveal key={item.slug} className="inner-reference"><span className="inner-kicker">ADDITIONAL SERVICE</span><h2>{item.title}</h2><p>{item.description}</p><a href={`/services/${item.slug}`}>Explore →</a></Reveal>)}</div>}
    </section>
    <ProjectSteps eyebrow="What gets decided first" title="A stack with a reason behind it." steps={['Which task or customer journey should the system support?','Which existing tools hold the data and who owns each handover?','What needs a custom interface, and what can be configured or connected?']}/>
  </main>;
}

export function ServiceDetail({ service }) {
  const isNew = !!service.visual;
  const title = service.title;
  const intro = service.intro || service.description;
  const scene = service.slug === 'custom-software-saas' ? 'robot' : isNew ? service.visual : service.slug.includes('ai') ? 'agents' : service.slug.includes('cloud') ? 'cloud' : service.slug.includes('api') ? 'api' : service.slug.includes('crm') ? 'crm' : service.slug.includes('web') ? 'web' : 'workflow';
  const editorial = serviceEditorial[service.slug];
  const related = innerServices.filter(item=>item.slug!==service.slug).slice(0,3);
  const exampleIndustry = innerIndustries.find(item=>item.slug===serviceIndustryExamples[service.slug]);
  const exampleWorkflow = exampleIndustry && industryEditorial[exampleIndustry.slug]?.workflow;
  const projectSteps = editorial?.approach || [
    `Review the current work and define the goal for ${title.toLowerCase()}.`,
    service.points?.[0] ? `Scope ${service.points[0].toLowerCase()} with the people and systems involved.` : `Agree on the deliverables, constraints and practical first release.`,
    `Build or configure the solution, test the important paths and agree on the handover.`,
  ];
  return <main id="top" className="inner-page"><PageIntro scene={scene} legacyService={!isNew && scene !== 'robot' ? service : undefined} eyebrow="Services / explore" title={title} description={intro}>{isNew && <div className="inner-hero-tools"><span>TECH / PLATFORMS</span>{service.stack.slice(0,4).map(tool=><b key={tool}><TechLabel name={tool}/></b>)}</div>}<a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(title)}`}><span>Discuss this service →</span></a></PageIntro>
    {editorial && <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>What this service covers</p><h2 className="h2" data-split="">Built for a real job, not a template.</h2></Reveal><Reveal><p>{editorial.summary}</p><ServiceSectionLink service={service} label={`Discuss your ${title.toLowerCase()} needs`}/></Reveal></section>}
    {editorial && <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Types of work</p><h2 className="h2" data-split="">What we can build and connect.</h2></div><div className="inner-editorial-grid">{editorial.types.map(([heading,body],index)=><Reveal key={heading} className="inner-editorial-card"><span className="inner-kicker">{String(index+1).padStart(2,'0')} / OUTPUT</span><h3>{heading}</h3><p>{body}</p></Reveal>)}</div><ServiceSectionLink service={service} label="Explore a solution for your team"/></section>}
    {isNew ? <ServiceLab service={service}/> : service.slug === 'custom-software-saas' ? <CustomSoftwareExperience /> : <ServiceExperience service={service} editorial={editorial} />}
    {editorial && <section className="inner-section wrap inner-stack-section"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Technology in context</p><h2 className="h2" data-split="">Tools selected for the work.</h2><p className="inner-help">The final stack depends on your existing systems, content needs and scope.</p></div><div className="inner-stack-grid">{editorial.stackNotes.map(([name,note])=><Reveal key={name} className="inner-stack-note"><h3><TechIcon name={name}/>{name}</h3><p>{note}</p></Reveal>)}</div><ServiceSectionLink service={service} label="Discuss the right technology"/></section>}
    <ProjectSteps eyebrow="How a project starts" title="A clear path from idea to working flow." steps={projectSteps} service={service}/>
    {exampleIndustry && <section className="inner-section wrap"><Reveal><a className="inner-case" href={`/industries/${exampleIndustry.slug}#example-workflow`} aria-label={`Explore ${exampleIndustry.title} industry example`}><CasePattern/><div><p className="eyebrow"><span className="dot"/>Industry example / {exampleIndustry.title}</p><h2 className="h2">{exampleIndustry.title}</h2><p>{exampleIndustry.intro}</p>{exampleWorkflow && <span className="inner-case-flow"><b>INDUSTRY WORKFLOW</b>{exampleWorkflow.join(' → ')}</span>}<span className="inner-case-cta">Explore industry example →</span></div><div className="inner-case-mark" aria-hidden="true">→</div></a></Reveal></section>}
    <ServiceGrowth service={service} />
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Keep exploring</p><h2 className="h2" data-split="">Related services.</h2></div><div className="inner-card-grid inner-related-grid">{related.map((item,index)=><ServiceTile key={item.slug} service={item} index={index}/>)}</div><ServiceSectionLink service={service} label="Talk about a connected project"/></section>
    {isNew && <section className="inner-section wrap service-final-section"><Reveal><div><p className="eyebrow"><span className="dot"/>Let's scope your project</p><h2 className="h2" data-split="">Tell us what needs to work better.</h2><p>Share the people, systems and task involved. We can map a practical next step for your {title.toLowerCase()} project.</p></div><a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(title)}`}><span>Start a {title.toLowerCase()} project →</span></a></Reveal></section>}
  </main>;
}

export function IndustriesPage() {
  return <main id="top" className="inner-page"><PageIntro scene="industries" eyebrow="Industries" title="Workflows shaped by the people who use them." description="Explore how connected software, AI and automation can support the practical work in each industry." />
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Industry paths</p><h2 className="h2">Where the work happens.</h2></div><div className="inner-industry-grid">{innerIndustries.map((industry,index)=><Reveal key={industry.slug} className="inner-industry-card"><span className="inner-kicker">{String(index+1).padStart(2,'0')} / INDUSTRY</span><h2><a href={`/industries/${industry.slug}`}>{industry.title}</a></h2><p>{industry.intro}</p><div className="inner-industry-line" aria-hidden="true"><i/><i/><i/></div><a href={`/industries/${industry.slug}`}>Explore industry →</a></Reveal>)}</div></section>
    <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>Across industries</p><h2 className="h2">The systems change. The questions stay practical.</h2></Reveal><Reveal><p>Where does a request begin? Which record carries it forward? Who needs to review a decision, and what happens when a step fails? These questions shape an integration or automation more than an industry label alone. The pages above show workflows and project references relevant to each field.</p></Reveal></section>
  </main>;
}

export function IndustryDetail({ industry }) {
  const services=industry.services.map(slug=>innerServices.find(item=>item.slug===slug)).filter(Boolean);
  const detail = industryEditorial[industry.slug];
  const benefitCopy = industryBenefits[industry.slug];
  return <main id="top" className="inner-page"><PageIntro scene="industry" industry={industry} eyebrow="Industries / explore" title={industry.title} description={benefitCopy?.hero || industry.intro}><a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(industry.title)}`}><span>Talk about your workflow →</span></a></PageIntro>
    <IndustryBenefits industry={industry}/>
    <IndustryShowcase industry={industry}/>
    <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>The work behind the page</p><h2 className="h2">{benefitCopy?.editorialHeading || 'Make each handover clearer.'}</h2></Reveal><Reveal><p>{detail?.body}</p></Reveal></section>
    <ProjectSteps id="example-workflow" eyebrow="Example workflow" title={benefitCopy?.workflowTitle || 'From first request to next action.'} steps={detail?.workflow || []} industry={industry}/>
    {industry.slug === 'healthcare' && <HealthcarePracticeTabs/>}
    {industry.slug === 'real-estate' && <RealEstateOpportunityTabs/>}
    {industry.slug === 'finance-investment' && <FinanceOpportunityTabs/>}
    <IndustryGrowth industry={industry}/>
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Relevant services</p><h2 className="h2">Explore the capabilities.</h2></div><div className="inner-card-grid inner-related-grid">{services.map((item,index)=><ServiceTile key={item.slug} service={item} index={index}/>)}</div></section>
  </main>;
}

export function ContactLanding() { return <main id="top" className="inner-page inner-contact-landing"><PageIntro scene="contact" eyebrow="Contact Us" title="Tell us what you want to connect, build or automate." description="Choose a service below, or use the quick enquiry form. Your description can be brief; we can clarify the details together."/><section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Choose a direction</p><h2 className="h2">Start with the work you need done.</h2><p className="inner-help">A service selection adds context to the form below. If your project spans several areas, describe the whole workflow instead.</p></div><div className="inner-contact-options">{innerServices.map(item=><a key={item.slug} href={`/contact?service=${encodeURIComponent(item.title)}`}>{item.title}<span aria-hidden="true">→</span></a>)}</div></section></main>; }
export function NotFoundPage() { return <main id="top" className="inner-page"><PageIntro scene="not-found" eyebrow="Page not found" title="This page isn't here." description="Use the navigation to find a service or industry."/><div className="wrap inner-not-found"><a className="btn btn-primary" href="/"><span>Back to Home</span></a></div></main>; }

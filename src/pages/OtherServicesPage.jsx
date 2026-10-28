import { useState } from 'react';
import { allServices as legacyServices } from '../components/serviceData.js';
import { innerServices, projectReferences } from '../components/innerData.js';
import { Reveal } from '../components/Reveal.jsx';
import { TechLabel } from '../components/TechIcon.jsx';
import { ProjectSteps } from '../components/ProjectSteps.jsx';
import { PageIntro } from '../components/InnerPageParts.jsx';

export function OtherPage() {
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
      {selected==='Use cases' && <div className="inner-reference-grid">{projectReferences.map(([name,detail])=>{const [href,label]=useCaseLinks[name]; return <Reveal key={name} className="inner-reference inner-use-case-card"><span className="inner-kicker">PROJECT / USE CASE</span><h2>{name}</h2><p>{detail}</p><a className="btn btn-primary inner-reference-cta" href={href}><span>{label}</span></a></Reveal>;})}</div>}
      {selected==='More services' && <div className="inner-reference-grid">{legacyServices.filter(item=>!innerServices.some(service=>service.title===item.title)).map(item=><Reveal key={item.slug} className="inner-reference"><span className="inner-kicker">ADDITIONAL SERVICE</span><h2>{item.title}</h2><p>{item.description}</p><a href={`/services/${item.slug}`}>Explore →</a></Reveal>)}</div>}
    </section>
    <ProjectSteps eyebrow="What gets decided first" title="A stack with a reason behind it." steps={['Which task or customer journey should the system support?','Which existing tools hold the data and who owns each handover?','What needs a custom interface, and what can be configured or connected?']}/>
  </main>;
}


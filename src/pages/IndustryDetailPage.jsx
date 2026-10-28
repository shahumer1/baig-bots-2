import { innerServices } from '../components/innerData.js';
import { industryEditorial } from '../components/innerEditorial.js';
import { Reveal } from '../components/Reveal.jsx';
import { ProjectSteps } from '../components/ProjectSteps.jsx';
import { IndustryGrowth } from '../components/IndustryGrowth.jsx';
import { IndustryBenefits } from '../components/IndustryBenefits.jsx';
import { IndustryShowcase } from '../components/IndustryShowcase.jsx';
import { HealthcarePracticeTabs } from '../components/HealthcarePracticeTabs.jsx';
import { RealEstateOpportunityTabs } from '../components/RealEstateOpportunityTabs.jsx';
import { FinanceOpportunityTabs } from '../components/FinanceOpportunityTabs.jsx';
import { industryBenefits } from '../components/industryBenefitsData.js';
import { PageIntro, ServiceTile } from '../components/InnerPageParts.jsx';

export function IndustryDetail({ industry }) {
  const services=industry.services.map(slug=>innerServices.find(item=>item.slug===slug)).filter(Boolean);
  const detail = industryEditorial[industry.slug];
  const benefitCopy = industryBenefits[industry.slug];
  return <main id="top" className="inner-page"><PageIntro scene="industry" industry={industry} eyebrow="Industries / explore" title={industry.title} description={benefitCopy?.hero || industry.intro}><a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(industry.title)}`}><span>Talk about your workflow</span></a></PageIntro>
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


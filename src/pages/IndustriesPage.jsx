import { innerIndustries } from '../components/innerData.js';
import { Reveal } from '../components/Reveal.jsx';
import { PageIntro } from '../components/InnerPageParts.jsx';

export function IndustriesPage() {
  return <main id="top" className="inner-page"><PageIntro scene="industries" eyebrow="Industries" title="Workflows shaped by the people who use them." description="Explore how connected software, AI and automation can support the practical work in each industry." />
    <section className="inner-section wrap"><div className="inner-section-head"><p className="eyebrow"><span className="dot"/>Industry paths</p><h2 className="h2">Where the work happens.</h2></div><div className="inner-industry-grid">{innerIndustries.map((industry,index)=><Reveal key={industry.slug} className="inner-industry-card"><span className="inner-kicker">{String(index+1).padStart(2,'0')} / INDUSTRY</span><h2><a href={`/industries/${industry.slug}`}>{industry.title}</a></h2><p>{industry.intro}</p><div className="inner-industry-line" aria-hidden="true"><i/><i/><i/></div><a href={`/industries/${industry.slug}`}>Explore industry →</a></Reveal>)}</div></section>
    <section className="inner-section wrap inner-editorial-lead"><Reveal><p className="eyebrow"><span className="dot"/>Across industries</p><h2 className="h2">The systems change. The questions stay practical.</h2></Reveal><Reveal><p>Where does a request begin? Which record carries it forward? Who needs to review a decision, and what happens when a step fails? These questions shape an integration or automation more than an industry label alone. The pages above show workflows and project references relevant to each field.</p></Reveal></section>
  </main>;
}


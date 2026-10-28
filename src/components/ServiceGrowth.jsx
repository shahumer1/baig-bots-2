import { Reveal } from './Reveal.jsx';
import { serviceGrowthData } from './serviceGrowthData.js';

export function GrowthPanel({ label, headline, introduction, opportunities, contact }) {
  return <section className="inner-section wrap growth-section" aria-labelledby="growth-heading">
    <Reveal className="growth-panel">
      <div className="growth-head"><div><p className="growth-kicker"><span className="growth-kicker-dot"/>BUSINESS VALUE / {label.toUpperCase()}</p><h2 id="growth-heading" data-split="">{headline}</h2></div><p>{introduction}</p></div>
      <div className="growth-track" aria-label={`Ways ${label} can support your business`}>
        {opportunities.map(([title, description], index) => <div className="growth-item" key={title} style={{'--growth-delay':`${.3 + index * .22}s`,'--growth-node-delay':`${index * .45}s`}}><span className="growth-node" aria-hidden="true"/><article className="growth-stage"><span className="growth-stage-label">POSSIBILITY / 0{index + 1}</span><h3>{title}</h3><p>{description}</p></article></div>)}
      </div>
      <div className="growth-foot"><p>The right approach depends on your current systems, customers and goals. Let's map the opportunity to your actual workflow.</p><a className="btn btn-inverse" href={contact}><span>Explore this for your business</span></a></div>
    </Reveal>
  </section>;
}

export function ServiceGrowth({ service }) {
  const [headline, introduction, opportunities] = serviceGrowthData[service.slug];
  return <GrowthPanel label={service.title} headline={headline} introduction={introduction} opportunities={opportunities} contact={`/contact?service=${encodeURIComponent(service.title)}`}/>;
}

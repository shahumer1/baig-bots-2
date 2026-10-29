import { innerServices } from '../components/innerData.js';
import { Reveal } from '../components/Reveal.jsx';
import { PageIntro, ServiceTile } from '../components/InnerPageParts.jsx';
import { ServiceChapters } from '../components/ServiceChapters.jsx';

export function ServicesIndex() {
  return <main id="top" className="inner-page services-index-page"><PageIntro scene="services" eyebrow="All services" title="Services built around your business." description="Explore web development, cloud infrastructure, AI, connected systems and automation. Select a service to see the work behind it."><a className="inner-text-link" href="#service-grid">Explore the services <span aria-hidden="true">→</span></a></PageIntro>
    <section id="service-grid" className="inner-section wrap"><Reveal className="inner-section-head services-heading-reveal"><p className="eyebrow"><span className="dot"/>01 / Capabilities</p><h2 className="h2" data-split="">Choose a starting point.</h2></Reveal><div className="inner-card-grid">{innerServices.map((service,index)=><ServiceTile key={service.slug} service={service} index={index}/>)}</div></section>
    <ServiceChapters />
    <section className="inner-section wrap"><Reveal className="inner-feature-band services-final-reveal"><div><p className="eyebrow"><span className="dot"/>Connected delivery</p><h2 className="h2" data-split="">From a single integration to a joined-up workflow.</h2></div><a className="btn btn-primary" href="/services/other"><span>Explore platforms and use cases</span></a></Reveal></section>
  </main>;
}


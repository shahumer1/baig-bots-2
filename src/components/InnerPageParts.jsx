import { innerServicePath } from './innerData.js';
import { Reveal } from './Reveal.jsx';
import { HeroScene } from './HeroScene.jsx';
import { CircuitLines } from './CircuitLines.jsx';

export function ServiceSectionLink({ service, label }) {
  return <a className="inner-text-link service-section-link" href={`/contact?service=${encodeURIComponent(service.title)}`}>{label} <span aria-hidden="true">→</span></a>;
}

export function PageIntro({ eyebrow, title, description, scene = 'services', industry, legacyService, children }) {
  return <header className="inner-intro wrap">
    <CircuitLines variant="inner" />
    <div className="inner-intro-copy"><p className="eyebrow"><span className="dot" />{eyebrow}</p><h1 className="h-display">{title}</h1><p className="lead">{description}</p>{children}</div>
    <HeroScene kind={scene} industry={industry} legacyService={legacyService}/>
  </header>;
}

export function ServiceTile({ service, index }) {
  return <Reveal className="inner-tile"><article className="inner-service-card">
    <div className="inner-tile-top"><span>{String(index + 1).padStart(2,'0')} / SERVICE</span><span aria-hidden="true">→</span></div>
    <div className="inner-card-symbol" data-kind={service.visual} aria-hidden="true">{({web:'{ }',cloud:'☁',agents:'✳',vision:'◎',crm:'▦',workflow:'◇',api:'⇄',transform:'→'})[service.visual] || '◇'}</div>
    <h2><a href={innerServicePath(service)}>{service.title}</a></h2><p>{service.intro}</p>
    <div className="inner-card-foot"><span>{service.visualSteps?.join(' → ') || 'Explore capability'}</span><a href={innerServicePath(service)} aria-label={`Explore ${service.title}`}>Explore <span aria-hidden="true">→</span></a></div>
  </article></Reveal>;
}


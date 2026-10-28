const services = [
  { label: 'AI Solutions', x: 12.5, y: 27, exitX: -160, exitY: -130, spin: -65 },
  { label: 'Business Automation', x: 37.5, y: 27, exitX: -60, exitY: -150, spin: 72 },
  { label: 'Custom Software', x: 62.5, y: 27, exitX: 80, exitY: -145, spin: 54 },
  { label: 'APIs & Integrations', x: 87.5, y: 27, exitX: 170, exitY: -125, spin: -68 },
  { label: 'Fintech & Payments', x: 12.5, y: 73, exitX: -165, exitY: 130, spin: -72 },
  { label: 'Data & BI', x: 37.5, y: 73, exitX: -70, exitY: 155, spin: 60 },
  { label: 'Cloud & Managed IT', x: 62.5, y: 73, exitX: 90, exitY: 150, spin: 70 },
  { label: 'Enterprise Support', x: 87.5, y: 73, exitX: 170, exitY: 125, spin: -75 },
];

export function HeroServiceCloud() {
  return <div className="hero-service-cloud" aria-hidden="true">
    <svg className="hero-service-links" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path className="hero-service-spine" d="M12.5 27H87.5 M12.5 73H87.5 M12.5 27V73 M37.5 27V73 M62.5 27V73 M87.5 27V73" />
      {services.map((service) => <circle key={service.label} cx={service.x} cy={service.y} r=".38" />)}
    </svg>
    <span className="hero-service-watermark blg"><i className="lg-s"/><i className="lg-ss"/><i className="lg-r"/><i className="lg-rs"/><i className="lg-sh"/></span>
    {services.map((service, index) => <div className="hero-service-card" key={service.label} style={{
      '--x': `${service.x}%`, '--y': `${service.y}%`,
      '--mobile-x': `${index % 2 === 0 ? 25 : 75}%`, '--mobile-y': `${12.5 + Math.floor(index / 2) * 25}%`,
      '--exit-x': `${service.exitX}px`,
      '--exit-y': `${service.exitY}px`, '--spin': `${service.spin}deg`, '--float-delay': `${index * -.41}s`, '--card-order': index,
    }}><div className="hero-service-card-inner"><span>{String(index + 1).padStart(2, '0')} <i /></span><strong>{service.label}</strong><small>CAPABILITY</small></div></div>)}
  </div>;
}

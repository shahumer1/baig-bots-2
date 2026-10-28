import { innerIndustries } from './innerData.js';

const positions = [
  { x: 12.5, y: 27, exitX: -160, exitY: -130, spin: -65 },
  { x: 37.5, y: 27, exitX: -60, exitY: -150, spin: 72 },
  { x: 62.5, y: 27, exitX: 80, exitY: -145, spin: 54 },
  { x: 87.5, y: 27, exitX: 170, exitY: -125, spin: -68 },
  { x: 25, y: 73, exitX: -110, exitY: 130, spin: -72 },
  { x: 50, y: 73, exitX: 0, exitY: 155, spin: 60 },
  { x: 75, y: 73, exitX: 110, exitY: 150, spin: 70 },
];
const industries = innerIndustries.map((industry, index) => ({ ...industry, ...positions[index] }));

export function HeroServiceCloud() {
  return <div className="hero-service-cloud">
    <div className="hero-industry-heading">
      <span>INDUSTRIES / BUILT AROUND YOU</span>
      <h2>We specialize in <em>your world.</em></h2>
    </div>
    <svg className="hero-service-links" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path className="hero-service-spine" d="M12.5 27H87.5 M25 73H75 M12.5 27L25 73 M37.5 27L25 73 M37.5 27L50 73 M62.5 27L50 73 M62.5 27L75 73 M87.5 27L75 73" />
      {industries.map((industry) => <circle key={industry.slug} cx={industry.x} cy={industry.y} r=".38" />)}
    </svg>
    {industries.map((industry, index) => <div className="hero-service-card" key={industry.slug} style={{
      '--x': `${industry.x}%`, '--y': `${industry.y}%`,
      '--mobile-x': `${index === 6 ? 50 : index % 2 === 0 ? 25 : 75}%`, '--mobile-y': `${12.5 + Math.floor(index / 2) * 25}%`,
      '--exit-x': `${industry.exitX}px`,
      '--exit-y': `${industry.exitY}px`, '--spin': `${industry.spin}deg`, '--float-delay': `${index * -.41}s`, '--card-order': index,
    }}><div className="hero-service-card-inner"><span>{String(index + 1).padStart(2, '0')} <i /></span><strong>{industry.title}</strong><small>INDUSTRY</small></div></div>)}
  </div>;
}

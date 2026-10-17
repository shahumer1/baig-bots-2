export function CasePattern() {
  const paths = [
    'M -30 46 H 180 L 238 104 H 520 L 580 44 H 1050',
    'M -60 235 H 290 L 345 176 H 690 L 750 245 H 1120',
    'M 1080 55 H 910 L 850 114 H 655 L 610 160 H 320 L 275 220 H -30',
  ];
  return <svg className="inner-case-pattern" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
    {paths.map((path, index) => <g key={path}>
      <path className="case-pattern-base" d={path}/>
      <circle className="case-pattern-packet" r="4"><animateMotion dur={`${9 + index * 2}s`} begin={`${index * -2}s`} repeatCount="indefinite" path={path}/></circle>
    </g>)}
    <circle className="case-pattern-node" cx="238" cy="104" r="7"/>
    <circle className="case-pattern-node" cx="750" cy="245" r="7"/>
    <circle className="case-pattern-node" cx="610" cy="160" r="7"/>
  </svg>;
}

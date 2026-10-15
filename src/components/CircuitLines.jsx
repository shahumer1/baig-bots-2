const homePaths = [
  'M-10 52H160L200 92H400',
  'M-10 300H34L70 336V560',
  'M-10 790H150L190 750H340',
  'M1450 120H1290L1250 160H1130L1100 190V270',
  'M1450 430H1360L1320 470V620L1280 660H1160',
  'M1450 760H1330L1300 730H1200',
  'M760 -10V30L800 70H940',
  'M820 830V780L860 740H1000',
];

const homeNodes = [
  [400, 92], [70, 560], [340, 750], [1100, 270],
  [1160, 660], [1200, 730], [940, 70], [1000, 740],
];

export function CircuitLines({ variant = 'home' }) {
  const movingPaths = [0, 1, 3, 4, 6];
  return <svg className={variant === 'inner' ? 'inner-circuit' : 'hero-circuit'} viewBox="0 0 1440 820" preserveAspectRatio={variant === 'inner' ? 'xMidYMin slice' : 'xMidYMid slice'} aria-hidden="true" focusable="false">
    {homePaths.map((path, index) => <path className="base" d={path} key={`base-${index}`} />)}
    {homeNodes.map(([x, y], index) => <circle className="node" cx={x} cy={y} r="5" key={`node-${index}`} />)}
    {variant === 'inner'
      ? movingPaths.map((index, order) => <rect className="packet" x="-10" y="-1.5" width="20" height="3" rx="1.5" key={`packet-${index}`}>
        <animateMotion path={homePaths[index]} dur={`${5 + order * 0.9}s`} begin={`${-order * 0.9}s`} repeatCount="indefinite" rotate="auto" />
      </rect>)
      : movingPaths.map((index) => <path className="pulse" pathLength="100" d={homePaths[index]} key={`pulse-${index}`} />)}
  </svg>;
}

import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
const Globe = lazy(() => import('./lightswind/globe.tsx'));

const travelMarkers = [
  { location: [33.69, 73.06], size: 0.032 },
  { location: [25.2, 55.27], size: 0.026 },
  { location: [51.5, -0.12], size: 0.026 },
  { location: [1.35, 103.82], size: 0.026 },
  { location: [40.71, -74.01], size: 0.026 },
];
const travelArcs = [
  { from: [33.69, 73.06], to: [25.2, 55.27] },
  { from: [25.2, 55.27], to: [51.5, -0.12] },
  { from: [51.5, -0.12], to: [40.71, -74.01] },
  { from: [33.69, 73.06], to: [1.35, 103.82] },
];

const heroStory = {
  healthcare: [
    ['Patient enquiry', 'A patient finds a service and asks for an appointment.'],
    ['Booking and reminder', 'The request moves to a suitable time and an update.'],
    ['Care-team follow-up', 'Staff can see what still needs a person to respond.'],
  ],
  'real-estate': [
    ['Property enquiry', 'Interest stays connected to the property that prompted it.'],
    ['CRM record', 'The contact and viewing request share one context.'],
    ['Viewing follow-up', 'The next conversation remains visible to the agent.'],
  ],
  'sales-lead-generation': [
    ['Lead arrives', 'An enquiry brings its source and useful details with it.'],
    ['Enrich and qualify', 'Available context is prepared for a salesperson to review.'],
    ['Owner follows up', 'The next conversation has a clear owner.'],
  ],
  'finance-investment': [
    ['Data source', 'Each view starts with an identified record source.'],
    ['Review and validate', 'Information moves through the agreed checks.'],
    ['Portal view', 'Approved information is presented in a usable view.'],
  ],
  travel: [
    ['Trip enquiry', 'The destination, dates and needs arrive together.'],
    ['Booking detail', 'The team can work from the latest trip information.'],
    ['Customer update', 'A change reaches the traveller with context.'],
  ],
  'apparel-manufacturing': [
    ['Request or order', 'The order begins with the details teams need.'],
    ['Team handover', 'The next owner can see the specification and action.'],
    ['Status update', 'Progress stays visible across the order.'],
  ],
  'staffing-hr': [
    ['Candidate enquiry', 'An application enters a shared candidate record.'],
    ['Review and approval', 'People assess the information and make the decision.'],
    ['Team follow-up', 'Interview and response steps stay coordinated.'],
  ],
};

function HealthcareArt({ active }) {
  return <div className="ih-art ih-healthcare" data-active={active} aria-hidden="true">
    <div className="ih-health-intake"><small>PATIENT ENQUIRY</small><b>Appointment request</b><i/><i/></div>
    <div className="ih-health-calendar"><small>AVAILABLE SLOT</small><div><span/><span/><span/><span/><span/><span/></div><strong>BOOKING</strong></div>
    <div className="ih-health-message"><small>FOLLOW-UP</small><b>Reminder ready</b><span>✓</span></div>
    <div className="ih-health-rail"><i/></div>
  </div>;
}

function PropertyArt({ active }) {
  return <div className="ih-art ih-property" data-active={active} aria-hidden="true">
    <svg className="ih-property-route" viewBox="0 0 500 237" preserveAspectRatio="none">
      <path className="ih-property-route-base" d="M220 148 H235 V91 H250 M355 117 V161" />
      <path className="ih-property-route-flow" d="M220 148 H235 V91 H250 M355 117 V161" pathLength="100" />
      <circle className="ih-property-packet" r="4"><animateMotion dur="4.8s" repeatCount="indefinite" path="M220 148 H235 V91 H250" /></circle>
      <circle className="ih-property-packet ih-property-packet-second" r="3"><animateMotion dur="4.8s" repeatCount="indefinite" path="M355 117 V161" /></circle>
    </svg>
    <div className="ih-property-listing"><div className="ih-property-photo"><span>PROPERTY LISTING</span></div><div className="ih-property-listing-info"><small>DISCOVER A PROPERTY</small><b>Enquire or book a viewing</b><i/></div></div>
    <div className="ih-property-enquiry"><small>NEW INTEREST</small><b>Viewing requested</b><i/></div>
    <div className="ih-property-viewing"><span>VIEWING</span><strong>CONFIRM → FOLLOW UP</strong></div>
  </div>;
}

function SalesArt({ active }) {
  return <div className="ih-art ih-sales" data-active={active} aria-hidden="true">
    <div className="ih-sales-lead"><small>NEW ENQUIRY</small><b>Lead captured</b><i/><i/></div>
    <div className="ih-sales-filter"><span>CONTEXT</span><div><i/><i/><i/></div><strong>QUALIFY</strong></div>
    <div className="ih-sales-owner"><small>OWNER</small><span className="ih-sales-avatar"/><b>Next conversation</b></div>
    <div className="ih-sales-track"><i/></div>
  </div>;
}

function FinanceArt({ active }) {
  return <div className="ih-art ih-finance" data-active={active} aria-hidden="true">
    <div className="ih-finance-source"><small>SOURCE RECORD</small><svg className="ih-finance-dollar" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"/><path d="M24 9v30M32 16c-2-3-5-4-8-4-5 0-8 3-8 7 0 5 4 6 8 7s8 2 8 7c0 4-3 7-8 7-4 0-7-2-9-5"/></svg><i/><i/><i/></div>
    <div className="ih-finance-check"><span>✓</span><b>REVIEW</b><small>VALIDATE</small></div>
    <div className="ih-finance-portal"><small>GROWTH VIEW</small><svg className="ih-finance-graph" viewBox="0 0 150 70" preserveAspectRatio="none"><path className="ih-finance-grid" d="M5 17H145M5 39H145M5 61H145"/><path className="ih-finance-growth-halo" d="M8 57L34 49L59 52L84 34L108 38L142 12"/><path className="ih-finance-growth-line" d="M8 57L34 49L59 52L84 34L108 38L142 12" pathLength="100"/><circle className="ih-finance-growth-dot" cx="142" cy="12" r="4"/></svg><b>ILLUSTRATIVE TREND</b></div>
    <div className="ih-finance-track"><i/></div>
  </div>;
}

function TravelArt() {
  const [darkTheme, setDarkTheme] = useState(() => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const observer = new MutationObserver(() => setDarkTheme(document.documentElement.dataset.theme === 'dark'));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return <div className="ih-art ih-travel" aria-label="Rotating travel globe">
    <div className="ih-travel-globe-wrap"><div className="ih-travel-globe-fallback"/><Suspense fallback={null}><Globe className="ih-travel-globe" theta={0.19} dark={darkTheme ? 0.25 : 0.1} scale={1.08} diffuse={1.2} mapSamples={21000} mapBrightness={10} baseColor={darkTheme ? '#9d626a' : '#b48186'} markerColor={darkTheme ? '#ff737c' : '#a90f1c'} glowColor={darkTheme ? '#511d24' : '#f4e3e5'} markers={travelMarkers} arcs={travelArcs} arcColor={darkTheme ? '#ff737c' : '#a90f1c'} animateArcPackets enableZoom={false} autoRotateSpeed={0.0022}/></Suspense></div>
  </div>;
}

function ApparelArt({ active }) {
  return <div className="ih-art ih-apparel" data-active={active} aria-hidden="true">
    <div className="ih-apparel-order"><small>ORDER BRIEF</small><i/><i/><b>SPECIFICATION</b></div>
    <div className="ih-apparel-station"><small>TEAM HANDOVER</small><div><span/><span/><span/></div><b>IN PROGRESS</b></div>
    <div className="ih-apparel-status"><small>STATUS</small><span>READY FOR UPDATE</span></div>
    <div className="ih-apparel-conveyor"><i/></div>
  </div>;
}

function StaffingArt({ active }) {
  return <div className="ih-art ih-staffing" data-active={active} aria-hidden="true">
    <div className="ih-staffing-applicants"><span/><span/><span/><small>APPLICATIONS</small></div>
    <div className="ih-staffing-review"><small>HUMAN REVIEW</small><i/><i/><b>DECISION</b></div>
    <div className="ih-staffing-interview"><small>INTERVIEW</small><div><i/><i/><i/></div><b>FOLLOW-UP</b></div>
    <div className="ih-staffing-route"><i/></div>
  </div>;
}

const artwork = {
  healthcare: HealthcareArt,
  'real-estate': PropertyArt,
  'sales-lead-generation': SalesArt,
  'finance-investment': FinanceArt,
  travel: TravelArt,
  'apparel-manufacturing': ApparelArt,
  'staffing-hr': StaffingArt,
};

export function IndustryHeroScene({ industry, active, onSelect }) {
  const story = heroStory[industry.slug] || [];
  const reducedMotion = useReducedMotion();
  const Artwork = artwork[industry.slug];
  if (!Artwork) return null;
  if (industry.slug === 'travel') return <div className="ih-scene ih-scene-travel"><div className="ih-visual"><Artwork/></div></div>;
  return <div className={`ih-scene ih-scene-${industry.slug}`}>
    <div className="ih-visual">
      {industry.heroImage ? <img className="ih-client-image" src={industry.heroImage} alt={industry.heroImageAlt || `${industry.title} work`}/> : <Artwork active={active}/>}
    </div>
    <div className="ih-story" aria-live="off"><span className="ih-story-number">0{active + 1} / 03</span>
      <AnimatePresence mode={industry.slug === 'real-estate' ? 'sync' : 'wait'} initial={false}><motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : .45, ease: [.22, 1, .36, 1] }}><strong>{story[active]?.[0]}</strong><p>{story[active]?.[1]}</p></motion.div></AnimatePresence>
    </div>
    <div className="ih-controls" role="group" aria-label={`${industry.title} workflow stages`}>{story.map(([label], index) => <button type="button" key={label} aria-pressed={active === index} onClick={() => onSelect(index)}><span>0{index + 1}</span>{label}</button>)}</div>
  </div>;
}

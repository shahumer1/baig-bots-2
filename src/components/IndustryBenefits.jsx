import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal.jsx';
import { industryBenefits } from './industryBenefitsData.js';

function IndustryGraphic({ slug }) {
  if (slug === 'healthcare') return <div className="ib-graphic ib-graphic-healthcare" aria-hidden="true">
    <div className="ib-health-symbol">+</div><div className="ib-health-card"><small>PATIENT REQUEST</small><i/><i/><i/></div>
    <svg viewBox="0 0 300 70"><path d="M0 38 H77 L94 38 L107 15 L124 57 L139 31 L154 38 H300"/></svg>
    <div className="ib-health-reminder">BOOKING <span>→</span> REMINDER</div>
  </div>;
  if (slug === 'real-estate') return <div className="ib-graphic ib-graphic-property" aria-hidden="true">
    <svg className="ib-property-route" viewBox="0 0 600 300" preserveAspectRatio="none">
      <path className="ib-property-route-base" d="M294 177 H329 V111 H350 M460 157 V205"/>
      <path className="ib-property-route-signal" d="M294 177 H329 V111 H350 M460 157 V205" pathLength="100"/>
    </svg>
    <div className="ib-property-listing"><div className="ib-property-photo"><span>PROPERTY LISTING</span></div><div className="ib-property-listing-info"><small>LISTING ENQUIRY</small><b>Interest linked to the property</b><i/></div></div>
    <div className="ib-property-viewing"><small>VIEWING REQUEST</small><b>Preferred time received</b><span>Agent to confirm</span></div>
    <div className="ib-property-followup"><small>NEXT ACTION</small><b>Follow-up reminder</b></div>
  </div>;
  if (slug === 'sales-lead-generation') return <div className="ib-graphic ib-graphic-sales" aria-hidden="true">
    <div className="ib-sales-funnel"><span>NEW INTEREST</span><span>USEFUL CONTEXT</span><span>RIGHT OWNER</span></div>
    <div className="ib-sales-signal"><i/> NEXT CONVERSATION</div>
  </div>;
  if (slug === 'finance-investment') return <div className="ib-graphic ib-graphic-finance" aria-hidden="true">
    <div className="ib-finance-ledger"><small>RECORD / REVIEW</small><i/><i/><i/></div>
    <div className="ib-finance-chart"><span/><span/><span/><span/><span/></div><div className="ib-finance-label">APPROVED VIEW</div>
  </div>;
  if (slug === 'travel') return <div className="ib-graphic ib-graphic-travel" aria-hidden="true">
    <svg viewBox="0 0 340 160"><path d="M32 115 H90 Q116 115 116 82 V57 H230 Q252 57 252 84 V115 H306"/><circle cx="32" cy="115" r="8"/><circle cx="306" cy="115" r="8"/></svg>
    <div className="ib-travel-ticket"><small>TRIP BRIEF</small><b>DESTINATION</b><i/></div><div className="ib-travel-update">BOOKING UPDATE <span>→</span></div>
  </div>;
  if (slug === 'apparel-manufacturing') return <div className="ib-graphic ib-graphic-apparel" aria-hidden="true">
    <div className="ib-apparel-rail"><i/></div><div className="ib-apparel-boxes"><div><span>01</span> ORDER</div><div><span>02</span> HANDOVER</div><div><span>03</span> STATUS</div></div>
    <div className="ib-apparel-label">ONE SHARED RECORD</div>
  </div>;
  return <div className="ib-graphic ib-graphic-staffing" aria-hidden="true">
    <div className="ib-people"><span/><span/><span/></div><div className="ib-staffing-path"><i/></div>
    <div className="ib-staffing-review"><small>HUMAN REVIEW</small><i/><i/></div><div className="ib-staffing-label">CANDIDATE JOURNEY</div>
  </div>;
}

export function IndustryBenefits({ industry }) {
  const content = industryBenefits[industry.slug];
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [selection, setSelection] = useState({ active: 0, cycle: 0 });
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView || reducedMotion || !content) return;
    const timer = window.setTimeout(() => setSelection(current => ({ active: (current.active + 1) % content.benefits.length, cycle: current.cycle + 1 })), 4300);
    return () => window.clearTimeout(timer);
  }, [content, inView, reducedMotion, selection.cycle]);
  if (!content) return null;
  const active = selection.active;
  const [title, body, tag] = content.benefits[active];
  const choose = index => setSelection(current => ({ active: index, cycle: current.cycle + 1 }));
  return <section ref={ref} className={`inner-section wrap industry-benefits industry-benefits-${industry.slug}`} aria-labelledby={`industry-benefits-${industry.slug}`}>
    <Reveal className="industry-benefits-intro"><p className="eyebrow"><span className="dot"/>Why it works for you / {industry.title}</p><h2 id={`industry-benefits-${industry.slug}`} className="h2">{content.heading}</h2><p>{content.intro}</p></Reveal>
    <div className="industry-benefits-layout">
      <div className="industry-benefits-list" role="group" aria-label={`${industry.title} business benefits`}>
        {content.benefits.map(([benefitTitle, description, label], index) => <button type="button" key={benefitTitle} className="industry-benefit-option" aria-pressed={active === index} onClick={() => choose(index)}>
          <span className="industry-benefit-index">{String(index + 1).padStart(2, '0')} / {label}</span><strong>{benefitTitle}</strong><span className="industry-benefit-short">{description}</span>
        </button>)}
      </div>
      <div className="industry-benefits-display">
        {industry.benefitImage ? <img className="industry-benefits-image" src={industry.benefitImage} alt={industry.benefitImageAlt || `${industry.title} work`}/> : <IndustryGraphic slug={industry.slug}/>}
        <div className="industry-benefits-diagram" aria-hidden="true">{content.diagram.map((stage, index) => <span key={stage}><i/>{stage}{index < content.diagram.length - 1 && <b>→</b>}</span>)}</div>
        <div className="industry-benefits-display-copy"><span className="industry-benefits-live"><i/> IN FOCUS / {tag}</span>
          <AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0 : .35 }}><h3>{title}</h3><p>{body}</p></motion.div></AnimatePresence>
          <div className="industry-benefits-progress" aria-hidden="true">{content.benefits.map((_, index) => <span key={index} className={index === active ? 'is-active' : ''}/>)}</div>
        </div>
      </div>
    </div>
    <div className="industry-benefits-foot"><span>{content.businessNote}</span><a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(industry.title)}`}><span>Discuss your {industry.title.toLowerCase()} project</span></a></div>
  </section>;
}

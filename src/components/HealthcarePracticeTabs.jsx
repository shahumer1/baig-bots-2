import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal.jsx';

const practices = [
  {
    name: 'Dental clinics', short: 'DENTAL', headline: 'Turn treatment interest into a booked chair.',
    context: 'A treatment enquiry can arrive by form, call or message. If it waits in a separate inbox, the team may miss the moment to respond.',
    friction: ['Missed new-patient enquiries', 'No-shows and late cancellations'],
    support: [
      ['Capture the right request', 'Service pages and enquiry forms can collect the treatment interest, contact details and preferred time.'],
      ['Protect appointment time', 'Confirmations, reminders and rescheduling requests can help staff act on open slots.'],
      ['Bring patients back', 'Approved recall and follow-up messages can help the team stay in touch after a visit.'],
    ],
    journey: ['ENQUIRY', 'BOOKING', 'RECALL'],
  },
  {
    name: 'Chiropractic practices', short: 'CHIROPRACTIC', headline: 'Make the next visit easy to arrange.',
    context: 'New clients need a clear way to ask for an initial appointment, while existing clients often need help managing a series of visits.',
    friction: ['Unanswered initial consultation requests', 'Reschedules spread across calls and messages'],
    support: [
      ['Welcome new enquiries', 'An intake form can gather contact details and appointment preferences before staff respond.'],
      ['Coordinate recurring visits', 'A shared schedule can keep upcoming sessions and requested changes visible.'],
      ['Reduce forgotten visits', 'Confirmation and reminder messages can give clients a clear way to contact the practice if plans change.'],
    ],
    journey: ['INTAKE', 'VISIT', 'NEXT SESSION'],
  },
  {
    name: 'Physiotherapy clinics', short: 'PHYSIOTHERAPY', headline: 'Keep the appointment journey connected.',
    context: 'Referrals, first bookings and follow-up sessions can involve several handovers. A clear record helps the front desk know what is next.',
    friction: ['Referral enquiries without a clear owner', 'Follow-up sessions that are hard to coordinate'],
    support: [
      ['Organise incoming requests', 'Referral and self-booking enquiries can enter one administrative queue for staff review.'],
      ['Plan a series of sessions', 'Scheduling views can make future appointment requests and changes easier to coordinate.'],
      ['Keep clients informed', 'Timely confirmations and reminders can help people prepare for the next agreed visit.'],
    ],
    journey: ['REFERRAL', 'SCHEDULE', 'FOLLOW-UP'],
  },
  {
    name: 'Primary care clinics', short: 'PRIMARY CARE', headline: 'Give reception a clearer working view.',
    context: 'Routine appointment requests, changes and general questions can arrive from many channels. Staff need to see the request and its status in one place.',
    friction: ['Calls and online requests in separate queues', 'Patients unsure whether a booking is confirmed'],
    support: [
      ['Collect complete requests', 'A simple booking path can capture the requested service and contact preference for the care team.'],
      ['Show what needs attention', 'A dashboard can distinguish new requests, confirmed appointments and changes awaiting staff action.'],
      ['Send clear updates', 'Clinic-approved confirmation and reminder messages can reduce uncertainty before a visit.'],
    ],
    journey: ['REQUEST', 'STAFF REVIEW', 'UPDATE'],
  },
  {
    name: 'Dermatology & aesthetics', short: 'DERMATOLOGY', headline: 'Respond to consultation interest with context.',
    context: 'People often explore a service before they are ready to book. Clear pages and timely responses can help the team continue that conversation.',
    friction: ['Service enquiries with too little detail', 'Consultation requests left waiting'],
    support: [
      ['Explain the next step', 'Focused pages can describe available consultations and guide visitors to the right enquiry.'],
      ['Prepare the conversation', 'A form can collect the service of interest and preferred contact method for staff review.'],
      ['Follow up thoughtfully', 'The team can track unanswered requests and send approved appointment updates.'],
    ],
    journey: ['DISCOVER', 'CONSULTATION', 'FOLLOW-UP'],
  },
  {
    name: 'Optometry practices', short: 'OPTOMETRY', headline: 'Keep eye-care bookings in view.',
    context: 'Exam enquiries, changes to appointments and eyewear collection updates are easier to manage when staff can see the next action.',
    friction: ['Missed exam booking enquiries', 'Pickup or follow-up updates lost in messages'],
    support: [
      ['Make exams easy to request', 'A clear booking path can collect the visit type and preferred time.'],
      ['Protect appointment time', 'Reminders and rescheduling requests can help staff respond when a patient cannot attend.'],
      ['Connect the follow-up', 'Administrative updates for eyewear collection or future visits can stay with the customer record.'],
    ],
    journey: ['EXAM REQUEST', 'VISIT', 'UPDATE'],
  },
];

export function IndustryOpportunityTabs({ id, label, heading, intro, items, focusLabel, tabListLabel, contactBase }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const selected = items[active];
  const onKeyDown = event => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : direction ? (active + direction + items.length) % items.length : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };
  return <section id={id} className="inner-section wrap healthcare-practices industry-opportunity-tabs" aria-labelledby={`${id}-title`}>
    <Reveal className="healthcare-practices-heading"><div><p className="eyebrow"><span className="dot"/>{label}</p><h2 id={`${id}-title`} className="h2">{heading}</h2></div><p>{intro}</p></Reveal>
    <div className="healthcare-practices-layout">
      <div className="healthcare-practices-tabs" style={{ '--opportunity-count': items.length }} role="tablist" aria-label={tabListLabel} onKeyDown={onKeyDown}>
        {items.map((item, index) => <button key={item.name} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><i aria-hidden="true">→</i></button>)}
      </div>
      <div id={`${id}-panel`} className="healthcare-practices-panel" role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className="healthcare-practices-panel-top"><span><i/>{focusLabel} / {selected.short}</span><span>{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={selected.name} className="healthcare-practices-content" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0 : .32 }}>
          <h3>{selected.headline}</h3><p className="healthcare-practices-context">{selected.context}</p>
          <div className="healthcare-practices-friction"><span>WHERE OPPORTUNITY GETS LOST</span>{selected.friction.map(item => <p key={item}><i aria-hidden="true"/> {item}</p>)}</div>
          <div className="healthcare-practices-support"><span>HOW WE CAN HELP</span>{selected.support.map(([title, body], index) => <div key={title}><b>{String(index + 1).padStart(2, '0')}</b><div><strong>{title}</strong><p>{body}</p></div></div>)}</div>
          <div className="healthcare-practices-journey" aria-label="Example business journey">{selected.journey.map((step, index) => <span key={step}><i/>{step}{index < selected.journey.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div>
          <a className="btn btn-primary" href={`/contact?service=${encodeURIComponent(contactBase + ' — ' + selected.name)}`}><span>Discuss this workflow →</span></a>
        </motion.div></AnimatePresence>
      </div>
    </div>
  </section>;
}

export function HealthcarePracticeTabs() {
  return <IndustryOpportunityTabs id="healthcare-practices" label="Who we help / Healthcare" heading="Built around the way your practice runs." intro="Different practices lose time at different points. Choose a care setting to see how clearer enquiries, scheduling and follow-up could support its business." items={practices} focusLabel="PRACTICE FOCUS" tabListLabel="Healthcare practice types" contactBase="Healthcare"/>;
}

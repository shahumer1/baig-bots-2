import { useEffect, useState } from 'react';
import { Reveal } from './Reveal.jsx';

// These are interface references, not live customer records or performance claims.
const showcases = {
  healthcare: {
    heading: 'See the booking journey take shape.',
    intro: 'A patient request, an available appointment and the follow-up belong in one clear journey. These interface concepts show how that work can be organised for a care team.',
    images: [
      { src: '/assets/clinic.png', label: 'Booking and schedule', alt: 'CareClinic interface concept showing an appointment form, calendar, doctor schedule and reminders', caption: 'The booking form, calendar and reminders stay visible together.' },
      { src: '/assets/clinic-2.png', label: 'Automation overview', alt: 'HealthFlow interface concept showing booking, records, confirmations and follow-up steps', caption: 'An overview of the steps from patient intake to confirmation and follow-up.' },
    ],
  },
  'sales-lead-generation': {
    heading: 'See the sales conversation and pipeline together.',
    intro: 'These supplied interface views show a sales assistant, lead enrichment and pipeline visibility around the next sales conversation.',
    images: [
      { src: '/assets/sales%20chatbot.png', label: 'Sales assistant', alt: 'Odoo Sales AI Assistant interface concept with opportunity summaries and a chat panel', caption: 'A sales assistant can bring opportunity context into the next conversation.' },
      { src: '/assets/prospectly_dashboard_mockup.png', label: 'Lead enrichment', alt: 'Prospectly interface concept showing lead discovery, enrichment and review', caption: 'Lead discovery and enrichment can prepare context before a person follows up.' },
      { src: '/assets/Screenshot%202025-07-17%20221655.png', label: 'Lead pipeline', alt: 'GoHighLevel CRM dashboard showing opportunity status and pipeline navigation', caption: 'A pipeline view makes open opportunities and their next actions easier to inspect.' },
    ],
  },
  'finance-investment': {
    heading: 'See whether a request workflow ran.',
    intro: 'This supplied estimate-form dashboard shows execution and task activity. It illustrates how a team can inspect form-triggered work and spot exceptions that need follow-up.',
    images: [
      { src: '/assets/dashboard.png', label: 'Workflow activity', alt: 'Automation dashboard showing execution status and task usage for an attached estimate form', caption: 'Execution status and task activity help a team inspect whether a form-triggered workflow needs attention.' },
    ],
  },
  'real-estate': {
    heading: 'See listings, leads and viewings together.',
    intro: 'These EstatePro interface concepts show three connected views: available properties, scheduled showings and the customer record behind each conversation.',
    images: [
      { src: '/assets/realstate-1.png', label: 'Property listings', alt: 'EstatePro interface concept showing searchable property listings with enquiry and showing actions', caption: 'A property page can carry listing details into the next enquiry.' },
      { src: '/assets/realstate.png', label: 'Viewing schedule', alt: 'EstatePro interface concept showing agent viewing schedules, confirmations and reminder status', caption: 'The team can review viewing times, changes and reminder status in one place.' },
      { src: '/assets/realstate-3.png', label: 'Customer records', alt: 'EstatePro interface concept showing client records, property preferences and recent activity', caption: 'Client preferences and recent activity stay connected to the next follow-up.' },
    ],
  },
  travel: {
    heading: 'See the whole trip, from enquiry to booking.',
    intro: 'These SkyVoyage interface concepts connect traveller details, flight options and booking conversations so a travel team can keep the next step in view.',
    images: [
      { src: '/assets/travel.png', label: 'Travel overview', alt: 'SkyVoyage travel dashboard concept with client details, upcoming trips, flight records, destination map and booking form', caption: 'A shared overview brings client details, upcoming trips and flight records into one place.' },
      { src: '/assets/travel-2.png', label: 'Flight booking', alt: 'SkyVoyage flight booking concept with search results, AI booking chat, traveller details and booking summary', caption: 'Flight options, the booking conversation and traveller details stay connected through the enquiry.' },
    ],
  },
};

export function IndustryShowcase({ industry }) {
  const content = showcases[industry.slug];
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { setActive(0); setExpanded(false); }, [industry.slug]);
  useEffect(() => {
    if (!expanded) return undefined;
    const closeOnEscape = event => { if (event.key === 'Escape') setExpanded(false); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [expanded]);
  if (!content) return null;
  const image = content.images[active];
  return <section className="inner-section wrap industry-showcase" aria-labelledby={`industry-showcase-${industry.slug}`}>
    <Reveal className="industry-showcase-head"><div><p className="eyebrow"><span className="dot"/>A closer look / {industry.title}</p><h2 id={`industry-showcase-${industry.slug}`} className="h2">{content.heading}</h2></div><p>{content.intro}</p></Reveal>
    <Reveal className="industry-showcase-frame">
      <div className="industry-showcase-toolbar"><span><i/>INTERFACE CONCEPT / {String(active + 1).padStart(2, '0')}</span><span>{image.label}</span></div>
      <button type="button" className="industry-showcase-image-button" onClick={() => setExpanded(true)} aria-label={`View ${image.label} at full size`}><img src={image.src} alt={image.alt} loading="lazy" decoding="async"/><span>View full size →</span></button>
      <div className={`industry-showcase-foot${content.images.length === 1 ? ' is-single' : ''}`}>{content.images.length > 1 && <div className="industry-showcase-tabs" role="group" aria-label={`${industry.title} interface views`}>{content.images.map((item, index) => <button type="button" key={item.src} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}</div>}<p>{image.caption}</p></div>
    </Reveal>
    {expanded && <div className="industry-showcase-lightbox" role="dialog" aria-modal="true" aria-label={`${image.label} full size`} onClick={() => setExpanded(false)}><button type="button" className="industry-showcase-close" onClick={() => setExpanded(false)} aria-label="Close full size image">Close ×</button><img src={image.src} alt={image.alt} onClick={event => event.stopPropagation()}/></div>}
  </section>;
}

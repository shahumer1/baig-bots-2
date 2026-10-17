const industryScenes = {
  healthcare: [
    { kind: 'intake', title: 'PATIENT REQUEST', rows: ['Service needed', 'Preferred time', 'Contact details'], source: 'PATIENT', target: 'RECEPTION', signal: 'NEW ENQUIRY' },
    { kind: 'calendar', title: 'APPOINTMENT', rows: ['Time offered', 'Staff confirmation', 'Reminder queued'], source: 'REQUEST', target: 'PATIENT', signal: 'SLOT CONFIRMED' },
    { kind: 'queue', title: 'CARE TEAM QUEUE', rows: ['Question received', 'Owner assigned', 'Next action visible'], source: 'BOOKING', target: 'CARE TEAM', signal: 'FOLLOW-UP READY' },
  ],
  'real-estate': [
    { kind: 'property', title: 'PROPERTY INTEREST', rows: ['Listing linked', 'Contact request', 'Viewing preference'], source: 'LISTING', target: 'AGENT', signal: 'ENQUIRY' },
    { kind: 'records', title: 'CRM RECORD', rows: ['Property context', 'Contact history', 'Next action'], source: 'ENQUIRY', target: 'CRM', signal: 'RECORD UPDATED' },
    { kind: 'calendar', title: 'VIEWING FOLLOW-UP', rows: ['Viewing agreed', 'Agent notified', 'Follow-up visible'], source: 'VIEWING', target: 'AGENT', signal: 'NEXT STEP' },
  ],
  'sales-lead-generation': [
    { kind: 'intake', title: 'NEW LEAD', rows: ['Enquiry source', 'Contact details', 'Area of interest'], source: 'VISITOR', target: 'SALES', signal: 'LEAD CAPTURED' },
    { kind: 'records', title: 'LEAD CONTEXT', rows: ['Record reviewed', 'Useful details', 'Priority visible'], source: 'LEAD', target: 'REVIEW', signal: 'CONTEXT READY' },
    { kind: 'queue', title: 'SALES HANDOVER', rows: ['Owner assigned', 'Next conversation', 'Reminder visible'], source: 'REVIEW', target: 'OWNER', signal: 'FOLLOW-UP' },
  ],
  'finance-investment': [
    { kind: 'records', title: 'SOURCE RECORD', rows: ['Identified source', 'Current version', 'Access defined'], source: 'SYSTEM', target: 'REVIEW', signal: 'SOURCE KNOWN' },
    { kind: 'review', title: 'VALIDATION', rows: ['Fields checked', 'Exception flagged', 'Approval recorded'], source: 'DATA', target: 'REVIEWER', signal: 'CHECK COMPLETE' },
    { kind: 'dashboard', title: 'PORTAL VIEW', rows: ['Approved values', 'Clear context', 'Permissioned view'], source: 'APPROVAL', target: 'PORTAL', signal: 'VIEW READY' },
  ],
  travel: [
    { kind: 'intake', title: 'TRIP BRIEF', rows: ['Destination', 'Dates and group', 'Preferences'], source: 'TRAVELLER', target: 'TEAM', signal: 'ENQUIRY' },
    { kind: 'route', title: 'BOOKING DETAIL', rows: ['Trip options', 'Agreed plan', 'Booking status'], source: 'BRIEF', target: 'ITINERARY', signal: 'PLAN UPDATED' },
    { kind: 'queue', title: 'CUSTOMER UPDATE', rows: ['Change noticed', 'Team action', 'Traveller informed'], source: 'BOOKING', target: 'TRAVELLER', signal: 'UPDATE SENT' },
  ],
  'apparel-manufacturing': [
    { kind: 'intake', title: 'ORDER BRIEF', rows: ['Request details', 'Specification', 'Due date'], source: 'CUSTOMER', target: 'OPERATIONS', signal: 'ORDER RECEIVED' },
    { kind: 'route', title: 'TEAM HANDOVER', rows: ['Owner assigned', 'Specification shared', 'Next station'], source: 'SALES', target: 'PRODUCTION', signal: 'HANDOVER' },
    { kind: 'dashboard', title: 'ORDER STATUS', rows: ['Current stage', 'Open action', 'Customer update'], source: 'PRODUCTION', target: 'CUSTOMER', signal: 'STATUS VISIBLE' },
  ],
  'staffing-hr': [
    { kind: 'intake', title: 'CANDIDATE RECORD', rows: ['Application received', 'Role linked', 'Details organised'], source: 'CANDIDATE', target: 'TEAM', signal: 'APPLICATION' },
    { kind: 'review', title: 'HUMAN REVIEW', rows: ['Information checked', 'Decision owner', 'Approval recorded'], source: 'RECORD', target: 'REVIEWER', signal: 'REVIEW' },
    { kind: 'calendar', title: 'TEAM FOLLOW-UP', rows: ['Interview action', 'Owner reminded', 'Response tracked'], source: 'DECISION', target: 'CANDIDATE', signal: 'NEXT STEP' },
  ],
};

const serviceKinds = ['intake', 'route', 'review'];

function serviceScene(service, active) {
  const area = service?.title?.toUpperCase() || 'PROJECT';
  const focus = service?.focus || service?.points || [];
  const labels = [
    ['Current process', 'People and systems', 'Desired outcome'],
    ['Key interaction', 'Connected data', 'Review point'],
    ['Working flow', 'Tested handover', 'Team ownership'],
  ];
  return {
    kind: serviceKinds[active] || 'review',
    title: active === 0 ? 'DISCOVER / ' + area : active === 1 ? 'DESIGN / ' + area : 'DELIVER / ' + area,
    rows: focus.length >= 3 ? [focus[active] || labels[active][0], labels[active][1], labels[active][2]] : labels[active],
    source: ['NEED', 'PLAN', 'BUILD'][active],
    target: ['SCOPE', 'PROTOTYPE', 'HANDOVER'][active],
    signal: ['DEFINE THE WORK', 'SHAPE THE FLOW', 'TEST THE PATH'][active],
  };
}

function SceneGlyph({ kind }) {
  if (kind === 'calendar') return <svg viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="31" rx="2"/><path d="M7 19h34M16 6v8M32 6v8"/><path d="m17 30 5 5 10-11"/></svg>;
  if (kind === 'property') return <svg viewBox="0 0 48 48"><path d="M7 41V20L24 7l17 13v21H7Z"/><path d="M20 41V29h8v12M13 23h6m10 0h6"/></svg>;
  if (kind === 'review') return <svg viewBox="0 0 48 48"><rect x="9" y="7" width="30" height="34" rx="2"/><path d="m15 18 3 3 5-6m3 4h7m-18 9 3 3 5-6m3 4h7"/></svg>;
  if (kind === 'dashboard') return <svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="32" rx="2"/><path d="M6 17h36M14 34V25m9 9V21m9 13v-6"/></svg>;
  if (kind === 'route') return <svg viewBox="0 0 48 48"><circle cx="9" cy="35" r="4"/><circle cx="39" cy="13" r="4"/><path d="M13 35h9V13h13m-13 11h11"/></svg>;
  if (kind === 'queue') return <svg viewBox="0 0 48 48"><rect x="7" y="9" width="34" height="30" rx="2"/><path d="M14 17h19M14 24h19M14 31h12"/><circle cx="34" cy="31" r="2"/></svg>;
  if (kind === 'records') return <svg viewBox="0 0 48 48"><path d="M12 7h21l5 5v29H12zM33 7v7h5M18 21h14M18 28h14M18 35h9"/></svg>;
  return <svg viewBox="0 0 48 48"><rect x="8" y="9" width="32" height="31" rx="2"/><path d="M15 17h18M15 24h18M15 31h12"/><circle cx="35" cy="33" r="6"/></svg>;
}

export function ProjectStepVisual({ industry, service, active }) {
  const scene = industryScenes[industry?.slug]?.[active] || serviceScene(service, active);
  if (industry?.slug === 'travel' && active === 1) return <div className="project-step-visual psv-travel-booking" aria-hidden="true">
    <div className="psv-travel-ticket">
      <div className="psv-travel-head"><span>TRIP PLAN / 02</span><span>ITINERARY IN REVIEW</span></div>
      <div className="psv-travel-route">
        <div className="psv-travel-city"><strong>JFK</strong><span>NEW YORK</span></div>
        <div className="psv-travel-flight"><span className="psv-travel-flight-line"/><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M28 15.4 18.5 12l-4.4-8.2-2.3.1 1.6 9.5-7.6-1.6-2.6-3-1.8.2 1.5 6.8-1.5 6.8 1.8.2 2.6-3 7.6-1.6-1.6 9.5 2.3.1 4.4-8.2 9.5-3.4c1.5-.5 1.5-1.3 0-1.8Z"/></svg><span className="psv-travel-flight-line"/></div>
        <div className="psv-travel-city"><strong>LHR</strong><span>LONDON</span></div>
      </div>
      <div className="psv-travel-divider"><i/><span>BOOKING DETAILS</span><i/></div>
      <div className="psv-travel-details">
        <div><span>01 / OPTIONS</span><strong>Routes compared</strong></div>
        <div><span>02 / PLAN</span><strong>Traveller choice saved</strong></div>
        <div><span>03 / STATUS</span><strong>Ready for review</strong></div>
      </div>
      <div className="psv-travel-foot"><span><i/> TRIP CONTEXT CONNECTED</span><span>PLAN UPDATED</span></div>
    </div>
  </div>;
  if (industry?.slug === 'apparel-manufacturing' && active === 1) return <div className="project-step-visual psv-apparel-handover" aria-hidden="true">
    <div className="psv-handover-board">
      <div className="psv-handover-head"><span>PRODUCTION HANDOVER / 02</span><span><i/> READY FOR TEAM</span></div>
      <div className="psv-handover-flow">
        <div className="psv-handover-stage"><small>01 / SALES</small><strong>Order brief</strong><span>Request received</span></div>
        <div className="psv-handover-link"><i/></div>
        <div className="psv-handover-stage is-current"><small>02 / PRODUCTION</small><strong>Work assigned</strong><span>Specification shared</span></div>
      </div>
      <div className="psv-handover-checks"><span><i/> Owner assigned</span><span><i/> Details attached</span><span><i/> Next station visible</span></div>
      <div className="psv-handover-foot"><span>ONE SHARED ORDER RECORD</span><span>HANDOVER COMPLETE</span></div>
    </div>
  </div>;
  return <div className={`project-step-visual psv-${scene.kind}`} aria-hidden="true">
    <div className="psv-network"><i/><i/><i/></div>
    <div className="psv-card">
      <div className="psv-card-head"><span className="psv-glyph"><SceneGlyph kind={scene.kind}/></span><span>WORKFLOW / 0{active + 1}</span><b/></div>
      <strong>{scene.title}</strong>
      {scene.kind === 'calendar' && <div className="psv-calendar"><i/><i/><i/><i/><i/><i/><i/></div>}
      {scene.kind === 'route' && <div className="psv-route"><i/><i/><i/></div>}
      <div className="psv-rows">{scene.rows.map((row, index) => <div key={row}><span>0{index + 1}</span><b>{row}</b><i/></div>)}</div>
      <div className="psv-card-foot"><span><i/> {scene.signal}</span><span>READY →</span></div>
    </div>
    <div className="psv-path"><span>{scene.source}</span><div><i/></div><span>{scene.target}</span></div>
  </div>;
}

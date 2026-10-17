import { GrowthPanel } from './ServiceGrowth.jsx';

const industryValue = {
  healthcare: [
    ['Capture the enquiry', 'A clear intake path keeps the requested service and contact details together.'],
    ['Coordinate the booking', 'Appointment changes and reminders can reach the people responsible for them.'],
    ['Support follow-up', 'The care team can see which administrative action is still open.'],
  ],
  'real-estate': [
    ['Connect people and property', 'An enquiry can stay linked to the property that prompted it.'],
    ['Plan the viewing', 'A shared record can hold the viewing request and its owner.'],
    ['Keep the next action visible', 'Follow-up stays attached to the contact and property history.'],
  ],
  'sales-lead-generation': [
    ['Collect useful context', 'Lead source and relevant details can arrive in one record.'],
    ['Prepare the handover', 'Qualification and enrichment help a salesperson decide what to review.'],
    ['Track the follow-up', 'Ownership and reminders make the next conversation visible.'],
  ],
  'finance-investment': [
    ['Know the source', 'A portal starts with defined records and where each value comes from.'],
    ['Review the data', 'Validation and access rules help people inspect information before it is shared.'],
    ['Present a usable view', 'A clear interface can turn approved information into a practical workflow.'],
  ],
  travel: [
    ['Capture the trip request', 'Dates, destination and traveller needs can be gathered in a consistent way.'],
    ['Keep booking details together', 'A connected record helps the team inspect the current request.'],
    ['Handle the change', 'Customer updates and exceptions can be routed to the right person.'],
  ],
  'apparel-manufacturing': [
    ['Record the request', 'Order or project details can start in a shared, structured record.'],
    ['Clarify ownership', 'A handover can show which team has the next action.'],
    ['Show current status', 'Updates can follow the work across commercial and operational teams.'],
  ],
  'staffing-hr': [
    ['Keep the application together', 'Candidate details and source can stay attached to a single record.'],
    ['Support review', 'Approval steps can show who needs to assess the next decision.'],
    ['Coordinate follow-up', 'Reminders and notes can help the team respond with the right context.'],
  ],
};

export function IndustryGrowth({ industry }) {
  const opportunities = industryValue[industry.slug];
  if (!opportunities) return null;
  return <GrowthPanel label={industry.title} headline={`A clearer path through ${industry.title.toLowerCase()} work.`} introduction={industry.intro} opportunities={opportunities} contact={`/contact?service=${encodeURIComponent(industry.title)}`}/>;
}

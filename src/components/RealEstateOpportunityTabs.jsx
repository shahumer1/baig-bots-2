import { IndustryOpportunityTabs } from './HealthcarePracticeTabs.jsx';

const opportunities = [
  {
    name: 'Missed enquiries', short: 'LEAD RESPONSE', headline: 'Give every property lead a clear owner.',
    context: 'A buyer or tenant may enquire from a listing, a form or a message. The team needs to know which property started the conversation and who will respond.',
    friction: ['Leads waiting in separate inboxes', 'Property context lost during handover'],
    support: [
      ['Capture the property', 'Keep the listing, contact details and enquiry source together in one record.'],
      ['Route to an agent', 'Assign new requests to a person and make unanswered enquiries visible.'],
      ['Prompt the next reply', 'A follow-up queue can remind the agent which conversations still need a response.'],
    ],
    journey: ['ENQUIRY', 'OWNER', 'REPLY'],
  },
  {
    name: 'Listing discovery', short: 'PROPERTY SEARCH', headline: 'Help visitors find a relevant property sooner.',
    context: 'People look for a location, budget and property type before contacting an agent. Clear listings can make that first enquiry more useful.',
    friction: ['Visitors leave without enquiring', 'Agents receive vague property requests'],
    support: [
      ['Make inventory clear', 'Searchable property pages can show the details that matter to a buyer or tenant.'],
      ['Collect preferences', 'An enquiry can carry the listing and search preferences into the CRM.'],
      ['Connect the next option', 'Agents can review suitable alternatives when the first property is unavailable.'],
    ],
    journey: ['SEARCH', 'LISTING', 'ENQUIRY'],
  },
  {
    name: 'Viewing bookings', short: 'SCHEDULING', headline: 'Keep showings and changes organised.',
    context: 'A viewing needs agreement between the client, property and agent. Changes are easier to manage when each party sees the latest confirmed time.',
    friction: ['Unconfirmed viewing requests', 'No-shows and last-minute changes'],
    support: [
      ['Request a suitable time', 'A listing can collect preferred viewing times without losing the property context.'],
      ['Confirm the details', 'The team can see which appointment still needs confirmation or a new slot.'],
      ['Send timely reminders', 'Approved reminders and rescheduling messages can help clients and agents prepare.'],
    ],
    journey: ['REQUEST', 'CONFIRM', 'REMIND'],
  },
  {
    name: 'Buyer follow-up', short: 'NEXT CONVERSATION', headline: 'Keep momentum after the viewing.',
    context: 'A promising viewing can go quiet if feedback, preferences and the next contact remain in someone’s notes or inbox.',
    friction: ['Warm buyers without a next step', 'Follow-up depends on memory'],
    support: [
      ['Record the outcome', 'Store viewing feedback and updated preferences with the buyer record.'],
      ['Set the next action', 'Give the agent a visible follow-up task and owner.'],
      ['Share relevant options', 'Use the buyer’s stated needs to prepare a thoughtful next conversation.'],
    ],
    journey: ['VIEWING', 'FEEDBACK', 'FOLLOW-UP'],
  },
  {
    name: 'Seller updates', short: 'LISTING PROGRESS', headline: 'Make listing activity easier to explain.',
    context: 'Sellers want to know whether their property is attracting interest and what the team is doing next.',
    friction: ['Updates scattered across calls', 'Feedback hard to summarise'],
    support: [
      ['Keep activity together', 'Group enquiries, viewings and agent notes around the listing.'],
      ['Prepare a clear update', 'A shared view can help agents review the latest activity before contacting the seller.'],
      ['Track open actions', 'Make price discussions, follow-up and requested changes visible to the team.'],
    ],
    journey: ['LISTING', 'ACTIVITY', 'UPDATE'],
  },
  {
    name: 'Rental handovers', short: 'LETTINGS', headline: 'Keep rental enquiries moving between people.',
    context: 'Tenant enquiries, viewings and applications often pass between agents and property managers. A shared record helps each person pick up the right next action.',
    friction: ['Tenant requests waiting for review', 'Application status unclear to the team'],
    support: [
      ['Organise incoming interest', 'Tie each request to the property and prospective tenant.'],
      ['Track the handover', 'Show who owns the viewing, application review and next response.'],
      ['Keep people informed', 'Approved updates can clarify where the request stands without promising an outcome.'],
    ],
    journey: ['ENQUIRY', 'REVIEW', 'UPDATE'],
  },
];

export function RealEstateOpportunityTabs() {
  return <IndustryOpportunityTabs id="real-estate-opportunities" label="Where we help / Real estate" heading="Keep every property conversation moving." intro="From first interest to a viewing and follow-up, see where connected records and timely communication can support your agents, buyers, sellers and tenants." items={opportunities} focusLabel="PROPERTY WORKFLOW" tabListLabel="Real estate workflow opportunities" contactBase="Real Estate"/>;
}

// Visual examples from the supplied assets. Copy describes the workflow shown,
// without claiming measured client results that are not documented on the site.
const clinic = '/assets/clinic.webp';
const clinicBookings = '/assets/clinic-2.webp';
const property = '/assets/realstate-1.webp';
const propertyRecords = '/assets/realstate-3.webp';
const propertySchedule = '/assets/realstate.webp';
const sales = '/assets/sales chatbot.webp';
const prospects = '/assets/prospectly_dashboard_mockup.png';
const finance = '/assets/dashboard.png';
const travel = '/assets/travel.webp';
const travelBookings = '/assets/travel-2.webp';
const messages = '/assets/email-front.png';

// Each entry: image, industry, heading, explanation, detail, destination.
export const serviceShowcases = {
  'web-development': [
    [property, 'Real estate', 'Make every property easier to explore', 'A searchable property experience helps buyers compare homes and send an enquiry with the listing already attached.', 'PROPERTY DISCOVERY', '/industries/real-estate'],
    [travel, 'Travel', 'Turn trip browsing into a clear enquiry', 'A travel website can present destinations, trip details and the next booking action in one easy journey.', 'TRIP EXPERIENCE', '/industries/travel'],
  ],
  'cloud-infrastructure': [
    [travelBookings, 'Travel', 'Keep the booking workspace available', 'A dependable application environment helps agents reach booking information when plans change and customers need an update.', 'APPLICATION AVAILABILITY', '/industries/travel'],
    [clinic, 'Healthcare', 'Give care teams a dependable workspace', 'Booking and patient administration screens need predictable access, release routines and a clear route for investigating issues.', 'RELIABLE OPERATIONS', '/industries/healthcare'],
  ],
  'ai-agents-chatbots': [
    [clinicBookings, 'Healthcare', 'Answer the first booking question', 'A scoped assistant can collect appointment preferences, answer common questions and pass the conversation to the practice team.', 'PATIENT INTAKE', '/industries/healthcare'],
    [sales, 'Sales', 'Give new leads a timely first response', 'An assistant can capture what a prospect needs and prepare the context for a salesperson to continue the conversation.', 'LEAD QUALIFICATION', '/industries/sales-lead-generation'],
  ],
  'computer-vision': [
    [property, 'Real estate', 'Make property images easier to review', 'A visual review workflow can help teams organise listing media, flag missing imagery and send uncertain results for human review.', 'IMAGE REVIEW', '/industries/real-estate'],
    [travel, 'Travel', 'Keep destination media organised', 'A defined image review step can help a content team check incoming trip imagery before it appears in customer-facing listings.', 'CONTENT REVIEW', '/industries/travel'],
  ],
  'crm-erp-systems': [
    [propertyRecords, 'Real estate', 'Keep the enquiry and property together', 'A shared record gives an agent the property, contact, viewing status and next follow-up in one place.', 'PROPERTY CRM', '/industries/real-estate'],
    [clinic, 'Healthcare', 'Keep patient enquiries visible', 'A practice workspace can show incoming enquiries, appointment stages and the staff member responsible for the next action.', 'PRACTICE RECORDS', '/industries/healthcare'],
  ],
  'workflow-automation': [
    [clinicBookings, 'Healthcare', 'Remind patients before a visit', 'When an appointment is booked or changed, a connected flow can prepare the right reminder and flag exceptions for the team.', 'BOOKING REMINDERS', '/industries/healthcare'],
    [propertySchedule, 'Real estate', 'Carry a viewing through to follow-up', 'A viewing request can create a task, notify its owner and keep the next customer update visible.', 'VIEWING FOLLOW-UP', '/industries/real-estate'],
  ],
  'api-integrations': [
    [travelBookings, 'Travel', 'Connect the trip and the booking record', 'An integration can pass selected enquiry and itinerary details between the customer experience and the agent workspace.', 'BOOKING DATA FLOW', '/industries/travel'],
    [clinicBookings, 'Healthcare', 'Pass booking details to the right place', 'A booking form and practice system can exchange the fields needed for confirmation and follow-up, with validation along the way.', 'APPOINTMENT CONNECTION', '/industries/healthcare'],
  ],
  'digital-transformation': [
    [clinic, 'Healthcare', 'See the whole appointment journey', 'Bring enquiries, appointments and team actions into a shared view so staff can see what is waiting and what comes next.', 'CONNECTED PRACTICE', '/industries/healthcare'],
    [propertyRecords, 'Real estate', 'Replace scattered viewing notes', 'Connected property and contact records make it easier to move from enquiry to viewing and follow-up without rebuilding context.', 'CONNECTED PROPERTY TEAM', '/industries/real-estate'],
  ],
  'ai-solutions-intelligent-agents': [
    [sales, 'Sales', 'Prepare a better first conversation', 'An agent can gather a prospect’s request, answer scoped questions and hand the useful context to a salesperson.', 'SALES ASSISTANT', '/industries/sales-lead-generation'],
    [clinicBookings, 'Healthcare', 'Help patients find the next step', 'A practice assistant can guide common appointment questions and direct cases needing judgement to the care team.', 'PATIENT ASSISTANT', '/industries/healthcare'],
  ],
  'business-process-automation': [
    [propertySchedule, 'Real estate', 'Move from viewing request to action', 'A new viewing request can prompt the right agent, create a follow-up task and keep the customer record current.', 'AUTOMATED HANDOVER', '/industries/real-estate'],
    [messages, 'Workflow automation', 'Keep routine updates moving', 'A defined event can trigger an email, approval or status update while exceptions remain visible to a person.', 'MESSAGE WORKFLOW', '/services/workflow-automation'],
  ],
  'custom-software-saas': [
    [clinic, 'Healthcare', 'Give a practice one working view', 'A custom portal can bring appointments, patient enquiries and daily team tasks into a focused workspace.', 'PRACTICE PORTAL', '/industries/healthcare'],
    [propertyRecords, 'Real estate', 'Build around the way agents work', 'A tailored application can keep properties, contacts, viewing stages and next actions together.', 'PROPERTY PLATFORM', '/industries/real-estate'],
  ],
  'apis-system-integrations': [
    [clinicBookings, 'Healthcare', 'Move an appointment without re-entry', 'A booking API can transfer the required details to another practice tool and return a clear confirmation state.', 'BOOKING INTEGRATION', '/industries/healthcare'],
    [travelBookings, 'Travel', 'Keep itinerary details in sync', 'Connected booking systems can pass trip updates to the agent view and customer communication flow.', 'TRAVEL INTEGRATION', '/industries/travel'],
  ],
  'fintech-payment-technology': [
    [finance, 'Finance', 'Make financial information easier to inspect', 'A finance dashboard can bring approved figures and their source into a clear view for the right team.', 'FINANCIAL VISIBILITY', '/industries/finance-investment'],
    [sales, 'Finance', 'See the signals behind a transaction flow', 'Operational reporting can make processing status and exceptions easier to review before the next action.', 'PAYMENT OPERATIONS', '/industries/finance-investment'],
  ],
  'data-engineering-bi': [
    [finance, 'Finance', 'Turn records into a useful view', 'Validated data can feed a dashboard where teams compare trends and drill into the figures behind them.', 'BUSINESS INTELLIGENCE', '/industries/finance-investment'],
    [prospects, 'Sales', 'See how the pipeline is moving', 'A reporting view can bring lead stages, activity and outstanding follow-ups into one place.', 'PIPELINE REPORTING', '/industries/sales-lead-generation'],
  ],
  'cloud-managed-it': [
    [clinic, 'Healthcare', 'Support the tools a practice relies on', 'Monitoring and release routines help a team identify issues in the appointment workspace before they interrupt daily work.', 'APPLICATION SUPPORT', '/industries/healthcare'],
    [travelBookings, 'Travel', 'Keep agents connected to bookings', 'Managed environments and diagnostics support the tools staff use to find bookings and respond to changes.', 'TRAVEL OPERATIONS', '/industries/travel'],
  ],
  'enterprise-support-consulting': [
    [finance, 'Finance', 'Investigate the numbers and the flow', 'Support work can trace a reporting or processing issue from its source record through the application view.', 'ISSUE INVESTIGATION', '/industries/finance-investment'],
    [propertyRecords, 'Real estate', 'Resolve workflow blockers with context', 'Reviewing the record, owner and handover path helps teams find where a property enquiry stopped moving.', 'PROCESS SUPPORT', '/industries/real-estate'],
  ],
  'web-mobile-development': [
    [travel, 'Travel', 'Let travellers explore and enquire', 'Responsive trip pages can make destinations easy to browse and let customers begin an enquiry on any screen.', 'TRAVEL EXPERIENCE', '/industries/travel'],
    [property, 'Real estate', 'Present the right home clearly', 'Property listings and mobile enquiry forms help visitors move from browsing to a useful conversation with an agent.', 'MOBILE PROPERTY SEARCH', '/industries/real-estate'],
  ],
  'crm-erp-solutions': [
    [propertyRecords, 'Real estate', 'Give every lead a next owner', 'A CRM can hold the property of interest, viewing request, contact history and follow-up task together.', 'LEAD MANAGEMENT', '/industries/real-estate'],
    [clinic, 'Healthcare', 'Follow the appointment journey', 'Shared practice records can help staff see which enquiries need a response and which appointments need confirmation.', 'PRACTICE WORKFLOW', '/industries/healthcare'],
  ],
  'ui-ux-product-design': [
    [travel, 'Travel', 'Make trip decisions feel simple', 'Clear hierarchy can help visitors compare destinations, understand the itinerary and find the booking action.', 'BOOKING JOURNEY', '/industries/travel'],
    [clinicBookings, 'Healthcare', 'Make appointment tasks easier', 'A focused interface can help staff scan a schedule, update a booking and find the next action quickly.', 'STAFF EXPERIENCE', '/industries/healthcare'],
  ],
  'branding-graphic-design': [
    [travel, 'Travel', 'Give each journey a clear identity', 'A consistent visual system can make destinations, itineraries and customer messages feel part of the same travel brand.', 'TRAVEL BRAND', '/industries/travel'],
    [property, 'Real estate', 'Present listings with consistency', 'A coherent visual language can make property cards, brochures and enquiry pages easier to recognise and navigate.', 'PROPERTY PRESENTATION', '/industries/real-estate'],
  ],
  'digital-marketing-seo': [
    [property, 'Real estate', 'Help relevant buyers find the listing', 'Search-friendly property pages and clear enquiry paths can connect local interest with the right agent.', 'PROPERTY DISCOVERY', '/industries/real-estate'],
    [clinicBookings, 'Healthcare', 'Connect search interest to booking', 'Clear service pages and a visible appointment path can help a visitor act when they are ready to contact a practice.', 'PATIENT JOURNEY', '/industries/healthcare'],
  ],
  'video-digital-content': [
    [travel, 'Travel', 'Show what a trip feels like', 'Destination visuals and concise content can give travellers context before they open the full itinerary.', 'DESTINATION CONTENT', '/industries/travel'],
    [property, 'Real estate', 'Tell the property story quickly', 'A clear sequence of listing imagery and short-form content can help a buyer understand a home before booking a viewing.', 'LISTING CONTENT', '/industries/real-estate'],
  ],
  'ai-extensions-emerging-tech': [
    [sales, 'Sales', 'Bring an assistant into an existing workflow', 'A scoped AI extension can summarise an incoming request and prepare it for a human follow-up.', 'CONNECTED AI', '/industries/sales-lead-generation'],
    [property, 'Real estate', 'Review visual inputs with a person in control', 'An image analysis step can flag listing media for review while the publishing decision stays with the team.', 'VISUAL REVIEW', '/industries/real-estate'],
  ],
  'dedicated-development-teams': [
    [clinic, 'Healthcare', 'Improve a live product in focused releases', 'A delivery team can work through practice portal changes, booking improvements and fixes in a visible sequence.', 'PRODUCT DELIVERY', '/industries/healthcare'],
    [travelBookings, 'Travel', 'Keep the booking product evolving', 'A dedicated team can deliver agent workspace improvements while testing the customer and operations journey together.', 'CONTINUOUS IMPROVEMENT', '/industries/travel'],
  ],
};

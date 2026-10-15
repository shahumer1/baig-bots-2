// Page copy describes possible work and relevant tools, not guaranteed outcomes.
export const serviceEditorial = {
  'web-development': {
    summary: 'We build responsive websites, dashboards and business applications around clear user journeys. A public site may need fast publishing and straightforward editing; an internal portal may need roles, forms and live data. The architecture follows the job instead of forcing both into the same template.',
    types: [
      ['Marketing and content sites','Editable pages, clear navigation, accessible layouts and content that works across screen sizes.'],
      ['Customer and staff portals','Sign-in flows, forms, dashboards and views that bring tasks and information into one place.'],
      ['Interactive web apps','React interfaces for products where users search, filter, submit, review and manage data.'],
      ['Connected websites','Forms and application features linked with a CRM, booking tool or other system through an API.'],
    ],
    stackNotes: [['React + JavaScript','Interactive interfaces, reusable components and client-side behaviour.'],['WordPress','Content-managed sites when an editing workflow is the priority.'],['Node.js','Server-side application logic and API endpoints when the scope calls for them.'],['APIs and webhooks','Connections to existing tools and business data.']],
    approach: ['Map the pages, users and actions before choosing the build approach.','Prototype the key screens and interactions so the flow is clear.','Build responsively, connect required systems and test the full journey.'],
  },
  'cloud-infrastructure': {
    summary: 'A web product needs an environment that can be deployed, observed and maintained. Cloud infrastructure work starts with the application, its data and access requirements, then defines how changes reach production and how the team can spot issues.',
    types: [['Application environments','Separate development, testing and production concerns so releases have a clear path.'],['Deployment workflows','Documented steps for building and releasing application changes.'],['Operational visibility','Logs, health signals and alerts that help teams investigate failures.'],['Integration readiness','Configuration and access for the APIs and services an application depends on.']],
    stackNotes: [['Application runtime','Chosen to match the software being deployed.'],['APIs and webhooks','Service-to-service communication and event delivery.'],['Google Workspace + Slack','Possible notification and operational handover channels where they fit.']],
    approach: ['Review the application, environments and dependencies.','Define deployment, access and configuration requirements.','Set up release and monitoring routines that the team can maintain.'],
  },
  'ai-agents-chatbots': {
    summary: 'An assistant should have a defined job, trusted information and a route to a person when it cannot help. We design conversations around real questions and actions: answering, collecting details, booking or passing work to a team.',
    types: [['Knowledge assistants','Answer questions from an approved information source, with a clear fallback.'],['Lead and intake agents','Collect the right details before routing a request to a person or CRM.'],['Voice conversations','Handle a scoped phone conversation and pass its outcome into a workflow.'],['Workflow copilots','Help staff find information and complete repeatable steps inside existing processes.']],
    stackNotes: [['OpenAI + Anthropic','Model options to evaluate against the task and information needs.'],['Retell AI + Twilio','Voice and telephony options for a scoped calling flow.'],['APIs and webhooks','Connect an agent to booking, CRM or team handover systems.']],
    approach: ['Define what the agent may answer or do, and when it must hand off.','Prepare the information, conversation paths and system connections.','Test common questions, unclear requests and handover cases before launch.'],
  },
  'computer-vision': {
    summary: 'Visual workflows turn an image or video input into something a person or system can review. The useful design starts with a specific visual task, an acceptable input and a review step—not a vague promise that a model will understand everything.',
    types: [['Image review flows','Upload, inspect and route images through a defined review process.'],['Visual detection','Identify the objects or regions relevant to a scoped use case.'],['Structured outputs','Turn reviewed visual findings into fields that another workflow can use.'],['Human review','Keep a clear way to inspect, correct and approve a visual result.']],
    stackNotes: [['OpenAI','A model option to evaluate for supported visual tasks.'],['JavaScript','Interface and workflow logic around upload and review.'],['APIs and webhooks','Pass approved results to another application.']],
    approach: ['Agree on the visual question and representative inputs.','Prototype the analysis and review experience.','Test edge cases, then connect the approved output to the next step.'],
  },
  'crm-erp-systems': {
    summary: 'A useful CRM or ERP setup mirrors the way a team actually receives, updates and hands over work. We focus on records, stages, ownership and the information that needs to move between sales, operations and customer service.',
    types: [['Lead and customer pipelines','Define stages, ownership and follow-up actions so records are easier to work with.'],['System configuration','Fields, views, forms and permissions aligned with the team’s process.'],['Data connections','Move relevant information between a CRM, ERP, forms and other applications.'],['Operational reporting','Views that make the status of records and work easier to inspect.']],
    stackNotes: [['GoHighLevel + Zoho CRM','CRM platforms for contact and workflow needs.'],['HubSpot','CRM and customer activity workflows.'],['monday.com + Airtable','Structured operational tracking where appropriate.'],['APIs and webhooks','Link records and events between systems.']],
    approach: ['Map the current record journey and handovers.','Set up stages, fields, views and connections.','Test the path from a new record through follow-up and reporting.'],
  },
  'workflow-automation': {
    summary: 'Automation works best when the trigger, decision and result are explicit. We turn repeatable tasks into flows that a team can understand: a form arrives, a record is checked, an approval is requested or an update is sent.',
    types: [['Approvals and notifications','Route a request to the right person and keep the next action visible.'],['Data synchronisation','Move relevant fields between tools when a record changes.'],['Scheduled routines','Run repeatable checks and updates on a defined schedule.'],['Exception handling','Flag incomplete inputs or failed steps for a person to review.']],
    stackNotes: [['n8n','Flexible workflow logic and system connections.'],['Make.com + Zapier','Event-based automation across supported apps.'],['Power Automate','Workflows within a Microsoft-oriented environment.'],['Slack + webhooks','Notifications and event handovers.']],
    approach: ['Write out the manual steps and identify the trigger.','Define decisions, data mapping and what happens when a step fails.','Build, test and document the flow for the people who will own it.'],
  },
  'api-integrations': {
    summary: 'An integration should make a specific handover reliable. We define what data moves, when it moves and what each system should do if a request is delayed, duplicated or rejected.',
    types: [['Application APIs','Connect a front end or internal tool to the data and actions it needs.'],['Webhooks and events','React to changes in one system and trigger the next step in another.'],['Booking and CRM links','Send enquiries, booking details or updates to the right destination.'],['Data mapping and validation','Translate fields and check inputs before they enter another system.']],
    stackNotes: [['REST APIs + webhooks','Common patterns for requests and event-driven updates.'],['GoHighLevel','Booking and CRM integration context.'],['Twilio','Communication events where required.'],['Google Workspace','Productivity workflows that may need connected data.']],
    approach: ['Map source, destination, fields and expected events.','Design authentication, validation and failure handling.','Test the full request and response path, including retries and duplicates.'],
  },
  'digital-transformation': {
    summary: 'Digital transformation begins with how work happens today. We look for disconnected records, repeated entry and handovers that depend on memory, then plan smaller changes that can be delivered and assessed in sequence.',
    types: [['Process discovery','Document the people, systems and decisions in a current workflow.'],['Connected operations','Link forms, records, notifications and task ownership.'],['Internal tools','Build a portal or dashboard where an existing tool cannot present the work clearly.'],['Incremental roadmap','Prioritise a practical first release and the next improvements.']],
    stackNotes: [['React','Custom interfaces when a workflow needs one.'],['n8n','Automation between systems.'],['monday.com + Airtable','Operational tracking where they suit the process.'],['Google Workspace','Documents and communication in existing team routines.']],
    approach: ['Map the current process and its friction points.','Choose a bounded first workflow and success criteria.','Connect the tools, train owners and review what to improve next.'],
  },
};

export const industryEditorial = {
  healthcare:{workflow:['Patient enquiry','Booking and reminder','Care-team follow-up'],body:'A patient booking is more than a calendar entry. Enquiries, appointment details, reminders and changes need to reach the right people without losing context. CareClinic is a reference for patient bookings and reminders; a new workflow would be scoped around the practice’s own tools and responsibilities.'},
  'real-estate':{workflow:['Property enquiry','CRM record','Viewing follow-up'],body:'Property teams need a clear path from a new enquiry to a viewing and its follow-up. EstatePro is a reference for property CRM and viewings. A connected process can keep the contact, property and next action together.'},
  'sales-lead-generation':{workflow:['Lead arrives','Enrich and qualify','Owner follows up'],body:'Sales work often spans forms, research, CRM records and outreach. Prospectly is a reference for lead enrichment, while Hermes AI SDR is an AI sales agent. The useful question is which information should be prepared before a human takes the next step.'},
  'finance-investment':{workflow:['Data source','Review and validate','Portal view'],body:'Financial workflows need clear data sources, validation and a usable view of the information. The Cash Flow Portal is a named project reference. New portal or integration work starts by defining the records, permissions and review process.'},
  travel:{workflow:['Trip enquiry','Booking detail','Customer update'],body:'Travel operations may involve an enquiry, booking information and multiple customer updates. A useful workflow keeps these steps connected while leaving room for a person to handle exceptions and changes.'},
  'apparel-manufacturing':{workflow:['Request or order','Team handover','Status update'],body:'Apparel and manufacturing work involves records moving between commercial and operational teams. A scoped automation can clarify ownership, reduce repeated entry and make the next handover visible.'},
  'staffing-hr':{workflow:['Candidate enquiry','Review and approval','Team follow-up'],body:'Staffing and HR teams work with candidate information, approvals and follow-up tasks. Connected records and reminders can help each person see what is waiting for them, while sensitive decisions stay with the team.'},
};

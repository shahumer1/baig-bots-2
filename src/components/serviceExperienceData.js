// Illustrative service flows and possible scope. These are not project claims or performance figures.
export const legacyExperience = {
  'ai-solutions-intelligent-agents': {
    kind: 'conversation',
    areas: [
      ['Customer and internal support assistants', 'Answer routine questions from approved information and pass unusual cases to a person.', 'The useful part of an assistant is a clear boundary: what it can answer, what details it should collect, and when a human should take over.', ['Question', 'Approved answer', 'Handover']],
      ['Knowledge search and document processing', 'Make relevant information easier to find and review.', 'A scoped search experience can look across selected knowledge sources. Document workflows can extract or organise information for a person to verify before it enters another system.', ['Source', 'Find or extract', 'Review']],
      ['Workflow copilots connected to your systems', 'Help a team complete a task inside its existing process.', 'A copilot can prepare context, suggest a next step and call a connected tool when permitted. Permissions, confirmation and a visible history matter as much as the model response.', ['Request', 'System context', 'Action']],
    ],
  },
  'business-process-automation': {
    kind: 'flow',
    areas: [
      ['Approvals, alerts and scheduled workflows', 'Turn repeatable requests into a traceable series of actions.', 'A form submission, scheduled check or system event can start a flow. Decisions route work to the right owner, and alerts show when something needs attention.', ['Trigger', 'Decision', 'Notify']],
      ['Cross-platform data synchronisation', 'Move the fields that matter between existing tools.', 'A sync should define the source of truth, field mapping and the conditions for an update. Failed or duplicate events need a clear review path.', ['Source record', 'Map fields', 'Destination']],
      ['Less manual work and clearer handovers', 'Give each step an owner and a visible outcome.', 'Automation can prepare the next task and pass context to a person instead of silently moving data. We design exceptions so the team knows what to fix.', ['Request', 'Automated step', 'Team owner']],
    ],
  },
  'apis-system-integrations': {
    kind: 'flow',
    areas: [
      ['REST, SOAP and webhook integrations', 'Connect systems through a defined request or event.', 'We map what each system sends and expects, then design authentication, responses and a way to inspect failed calls.', ['Source', 'API / webhook', 'Target']],
      ['Data validation and XML/XSD processing', 'Check and translate data before it enters another system.', 'Structured payloads need field rules, format checks and useful errors. Validation prevents a malformed update from becoming an unclear downstream problem.', ['Payload', 'Validate', 'Transform']],
      ['Secure connections between existing systems', 'Keep access and operational ownership clear.', 'An integration needs scoped credentials, sensible logging and an agreed retry or handover path when a service is unavailable.', ['Authenticate', 'Exchange', 'Monitor']],
    ],
  },
  'fintech-payment-technology': {
    kind: 'dashboard',
    areas: [
      ['Card issuing and acquiring workflows', 'Connect card events to the operational systems that need them.', 'Issuing and acquiring involve different parties and states. A scoped implementation maps the relevant transaction messages, checks and follow-up actions.', ['Card event', 'Validate', 'Record']],
      ['ATM/POS and billing integrations', 'Make transaction and billing handovers easier to trace.', 'Interfaces can pass transaction details into downstream billing or operational processes, with validation at the boundary and clear treatment of rejected messages.', ['Terminal', 'Transaction', 'Billing']],
      ['Clearing, settlement and reconciliation', 'Compare records and surface the items that need review.', 'Reconciliation work starts with the data sources, matching rules and exception handling. A useful view helps a team identify differences and follow them to resolution.', ['Import', 'Match', 'Exception']],
    ],
  },
  'data-engineering-bi': {
    kind: 'dashboard',
    areas: [
      ['Data pipelines, ETL and validation', 'Prepare reliable data before it reaches a report.', 'A pipeline can collect, transform and check records from selected sources. Validation rules and an inspectable error path make the output more useful.', ['Source', 'Transform', 'Validate']],
      ['Power BI and Tableau dashboards', 'Present the measures and filters a team actually uses.', 'Dashboard design starts with the question being answered, then aligns calculations, visual hierarchy and drill-down views with that decision.', ['Model', 'Measure', 'Explore']],
      ['Operational and financial reporting', 'Connect reports to their definitions and source records.', 'Reporting needs agreed terminology, refresh expectations and a way to investigate a figure. We shape the view around those practical requirements.', ['Records', 'Definitions', 'Report']],
    ],
  },
  'cloud-managed-it': {
    kind: 'flow',
    areas: [
      ['Deployment and hosting coordination', 'Give changes a clear path into a running environment.', 'Deployment work covers the application dependencies, configuration and release steps that the team needs to maintain.', ['Build', 'Deploy', 'Verify']],
      ['Environment maintenance and monitoring', 'Keep application environments understandable over time.', 'A useful setup makes access, configuration, logs and health signals visible enough to support routine changes and investigation.', ['Environment', 'Health', 'Alert']],
      ['Diagnostics and observability', 'Follow a problem from symptom to likely cause.', 'Logs, events and service checks can be organised around the user journey, helping teams see where a request slowed down or failed.', ['Signal', 'Trace', 'Investigate']],
    ],
  },
  'enterprise-support-consulting': {
    kind: 'board',
    areas: [
      ['Incident and root-cause analysis', 'Move from an observed issue to a documented explanation.', 'Support begins by capturing the symptom and impact, then tracing evidence through the affected systems before agreeing on a corrective action.', ['Report', 'Investigate', 'Resolve']],
      ['UAT/SIT and production support', 'Test handovers and behaviour across connected systems.', 'A test or production issue needs reproducible steps, an owner and a record of what changed. This keeps the next review grounded in evidence.', ['Reproduce', 'Test', 'Confirm']],
      ['Performance reviews and troubleshooting', 'Find the step that is slowing down the experience.', 'A review can look at application behaviour, dependencies and infrastructure signals, then prioritise practical fixes for the measured bottleneck.', ['Observe', 'Isolate', 'Improve']],
    ],
  },
  'web-mobile-development': {
    kind: 'interface',
    areas: [
      ['Corporate sites and eCommerce', 'Make the path from discovery to action clear on every screen.', 'Content structure, responsive layouts, product journeys and calls to action should serve the business goal while staying easy for visitors to use.', ['Discover', 'Explore', 'Act']],
      ['WordPress and Shopify builds', 'Choose an editing and commerce workflow the team can maintain.', 'Templates, content fields and storefront structure can be tailored around the people who publish content or manage products.', ['Content', 'Publish', 'Maintain']],
      ['Mobile apps and digital portals', 'Put common tasks within reach on smaller screens.', 'Mobile and portal experiences need focused navigation, usable forms, clear status and the right connection to business data.', ['Open', 'Complete task', 'Update']],
    ],
  },
  'crm-erp-solutions': {
    kind: 'board',
    areas: [
      ['CRM setup and lead workflows', 'Keep a lead, its owner and the next action together.', 'Stages, fields and views should match how the team qualifies, follows up and hands work over rather than adding unnecessary data entry.', ['Lead', 'Qualify', 'Follow up']],
      ['Customer records and integrations', 'Connect customer context across the tools in use.', 'Forms, communication tools and operational systems can update a record through mapped fields and defined ownership rules.', ['Capture', 'Sync', 'Review']],
      ['Data migration and extensions', 'Move useful records with checks and a clear cutover.', 'Migration requires source review, field mapping, validation and a plan for incomplete or duplicate entries. Extensions should support a specific workflow.', ['Map', 'Validate', 'Move']],
    ],
  },
  'ui-ux-product-design': {
    kind: 'canvas',
    areas: [
      ['Discovery and user journeys', 'Understand the task before drawing the screen.', 'A journey maps who starts the process, the choices they face and what a successful next step looks like. It exposes gaps before development.', ['Understand', 'Map', 'Prioritise']],
      ['Wireframes and prototypes', 'Test the shape of an experience early.', 'Wireframes clarify hierarchy and flow. A prototype makes key interactions tangible so the team can review assumptions before a full build.', ['Sketch', 'Prototype', 'Review']],
      ['Design systems', 'Make repeated interface decisions consistent.', 'Shared components, states and usage rules help screens feel coherent and make later changes easier to manage.', ['Pattern', 'Component', 'Reuse']],
    ],
  },
  'branding-graphic-design': {
    kind: 'canvas',
    areas: [
      ['Logos and identity', 'Create a recognisable visual foundation.', 'An identity combines mark, type, colour and usage choices. It should work in the places the business actually appears.', ['Concept', 'Identity', 'Apply']],
      ['Brand guidelines', 'Give a team clear rules for consistent use.', 'Guidelines can explain spacing, colour, typography and examples so new material stays connected to the same visual system.', ['Define', 'Document', 'Use']],
      ['Decks, brochures and collateral', 'Carry the identity into practical communication.', 'A pitch deck or brochure needs a readable information hierarchy as well as visual polish, shaped around its audience and purpose.', ['Message', 'Layout', 'Deliver']],
    ],
  },
  'digital-marketing-seo': {
    kind: 'dashboard',
    areas: [
      ['Technical and on-page SEO', 'Make pages easier to understand and navigate.', 'Site structure, metadata, internal links and page content should describe the offering clearly. Technical checks help reveal indexing or experience issues.', ['Audit', 'Improve', 'Review']],
      ['Campaigns and social content', 'Connect each message to an audience and action.', 'Campaign planning brings together the offer, channel, creative and landing experience, with a way to review what people actually do.', ['Audience', 'Message', 'Action']],
      ['Email and paid ads', 'Make follow-up and paid traffic part of a coherent journey.', 'Email sequences and ads work best when the destination, consent needs and next step are defined before launch.', ['Reach', 'Engage', 'Follow up']],
    ],
  },
  'video-digital-content': {
    kind: 'canvas',
    areas: [
      ['Short-form reels', 'Communicate one idea with a clear opening and finish.', 'Short video needs a focused message, readable framing and timing that works in the intended channel.', ['Concept', 'Edit', 'Publish']],
      ['Motion graphics', 'Use movement to explain a product, process or message.', 'Motion can guide attention between points or bring a brand system to life. The sequence should support comprehension, not distract from it.', ['Storyboard', 'Animate', 'Refine']],
      ['Promotional and marketing assets', 'Create visual material for a specific campaign or audience.', 'Assets can share a visual language across formats while adapting the layout and message to each placement.', ['Brief', 'Design', 'Adapt']],
    ],
  },
  'ai-extensions-emerging-tech': {
    kind: 'conversation',
    areas: [
      ['AI voice interfaces', 'Design a spoken flow around a defined task.', 'A voice experience needs prompts, confirmation of important details and a human route when a request falls outside its scope.', ['Caller', 'Voice flow', 'Handover']],
      ['Computer vision', 'Turn selected visual inputs into reviewable information.', 'Image or video analysis should answer a specific question, show the relevant output and allow a person to verify uncertain results.', ['Image', 'Analyse', 'Review']],
      ['Business-specific AI integrations', 'Place an AI step inside a useful business process.', 'The model output can help prepare or classify work, while permissions, validation and connected systems keep the result actionable.', ['Input', 'AI step', 'System action']],
    ],
  },
  'dedicated-development-teams': {
    kind: 'board',
    areas: [
      ['Project-based engineers', 'Add engineering capacity to a defined delivery goal.', 'A clear backlog, shared standards and regular reviews help a specialist contribute to the product alongside the existing team.', ['Scope', 'Build', 'Review']],
      ['Specialist resourcing', 'Bring in focused skills where the work needs them.', 'The useful setup defines ownership, access, handovers and how the specialist’s work will be reviewed and maintained.', ['Need', 'Match', 'Integrate']],
      ['Maintenance and improvement sprints', 'Keep existing software moving through small, visible changes.', 'A sprint can group fixes and enhancements into a prioritised set of work with testing and a documented outcome.', ['Prioritise', 'Improve', 'Release']],
    ],
  },
};

export const innerPreviewKinds = {
  'web-development': 'interface',
  'cloud-infrastructure': 'flow',
  'ai-agents-chatbots': 'conversation',
  'computer-vision': 'canvas',
  'crm-erp-systems': 'board',
  'workflow-automation': 'flow',
  'api-integrations': 'flow',
  'digital-transformation': 'board',
};

export const innerPreviewSteps = {
  'web-development': [['Content', 'Page', 'Visitor'], ['Sign in', 'Portal', 'Task'], ['Input', 'React app', 'Result']],
  'cloud-infrastructure': [['App', 'Environment', 'Release'], ['Change', 'Deploy', 'Verify'], ['Logs', 'Signal', 'Review']],
  'ai-agents-chatbots': [['Question', 'Knowledge', 'Answer'], ['Lead', 'Agent', 'Team'], ['Caller', 'Voice', 'Handover']],
  'computer-vision': [['Upload', 'Inspect', 'Review'], ['Image', 'Detect', 'Confirm'], ['Finding', 'Fields', 'Next step']],
  'crm-erp-systems': [['Lead', 'Stage', 'Owner'], ['Fields', 'Views', 'Team'], ['Source', 'Sync', 'CRM']],
  'workflow-automation': [['Request', 'Approval', 'Notify'], ['Record', 'Map', 'Update'], ['Schedule', 'Check', 'Action']],
  'api-integrations': [['App', 'API', 'Data'], ['Event', 'Webhook', 'Action'], ['Booking', 'Validate', 'CRM']],
  'digital-transformation': [['People', 'Process', 'Map'], ['Form', 'Record', 'Owner'], ['Need', 'Tool', 'Workflow']],
};

export const innerAreaNotes = {
  'web-development': [
    'We define the page hierarchy and editing needs before choosing a content system.',
    'Each role should see the forms, records and actions relevant to its work.',
    'The interaction is designed around the task, including loading, empty and error states.',
  ],
  'cloud-infrastructure': [
    'Configuration and access need to be clear across each environment.',
    'A release path should make it easy to verify what changed and where.',
    'Signals are most useful when they point to a service, request or user impact.',
  ],
  'ai-agents-chatbots': [
    'Approved content and escalation rules help the assistant stay within its role.',
    'The intake should collect only the details a team needs for the next action.',
    'A voice flow should confirm important details and handle interruptions gracefully.',
  ],
  'computer-vision': [
    'Input quality and the reviewer’s decision are part of the workflow design.',
    'Detection criteria should be tested against representative examples and edge cases.',
    'Fields should be inspectable before they trigger another system or report.',
  ],
  'crm-erp-systems': [
    'Stages and reminders follow the team’s actual lead journey.',
    'Permissions and views keep the right information available to each role.',
    'Mapping and validation help avoid duplicate or incomplete records.',
  ],
  'workflow-automation': [
    'A clear approval owner prevents requests from disappearing between steps.',
    'Update rules should state which tool owns each field and when a sync runs.',
    'Scheduled jobs need an outcome record and a path for failed checks.',
  ],
  'api-integrations': [
    'Endpoints need defined inputs, outputs, access and error responses.',
    'Event delivery should account for retries and duplicate messages.',
    'Booking and CRM fields are mapped before the handover is automated.',
  ],
  'digital-transformation': [
    'A process map makes repeated entry and unclear ownership visible.',
    'The connected flow should show who acts next when a record changes.',
    'A custom view is most useful when it removes friction from a frequent task.',
  ],
};

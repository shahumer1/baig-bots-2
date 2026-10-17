// Service descriptions are examples of scoped work, not claims about a specific client delivery.
export const serviceLabData = {
  'web-development': {
    eyebrow: 'The product on every screen', title: 'A useful website is a working system.',
    intro: 'A visitor may discover the business on a phone, return on a laptop and complete a task in a portal. We plan those journeys together, including the content, application logic and data behind each screen.',
    cta: 'Start a web project',
    details: [
      ['The right format', 'Business and content sites, e-commerce journeys, booking flows, dashboards and SaaS interfaces call for different page structures and editing tools. We choose the format around the task and the people maintaining it.'],
      ['Behind the interface', 'React and JavaScript can power interactive views. Node.js can handle server-side logic; databases, APIs and webhooks can connect records, payments or appointments where the scope requires them.'],
      ['Ready for real use', 'Responsive layouts, keyboard access, loading and error states are considered alongside performance, search visibility, security and a maintainable path for growth.'],
    ],
    note: 'Select a viewport to see how one journey adapts without losing its primary action.',
  },
  'cloud-infrastructure': {
    eyebrow: 'Infrastructure / operations', title: 'From release to reliable operation.',
    intro: 'Cloud work starts with the application and its dependencies. The goal is a deployment path the team understands, with clear environments, controlled access and signals that help diagnose issues.',
    cta: 'Plan my deployment',
    details: [
      ['Environments and releases', 'Development, testing and production need their own configuration and access rules. A documented release path makes it clear what was changed, verified and deployed.'],
      ['Capacity and visibility', 'We consider traffic, service dependencies, logs, health checks and alerts together. Scaling and troubleshooting should respond to the application’s actual behaviour.'],
      ['Continuity and upkeep', 'Backup and recovery plans, access review, patching and maintenance need defined owners. Their depth is agreed around the system and the business risk.'],
    ],
    note: 'The diagram follows an application change through an environment and into monitoring.',
  },
  'ai-agents-chatbots': {
    eyebrow: 'Conversation / handover', title: 'An agent with a job and a boundary.',
    intro: 'A useful assistant answers from trusted information, collects only the details needed for the next action and hands off when it reaches a limit. The conversation is designed around a business workflow, not just a model response.',
    cta: 'Build an AI agent',
    details: [
      ['Chat and voice', 'Customer support, lead qualification and appointment intake can use chat or a scoped voice flow. Retell AI and Twilio are options for the calling layer when they fit the project.'],
      ['Knowledge and action', 'Approved content or a retrieval-based knowledge source can ground answers. APIs and webhooks can pass a booking, lead or follow-up request into the appropriate system.'],
      ['Human control', 'We define fallback, consent, confirmation and escalation paths, then test ambiguous questions and interrupted conversations before deployment.'],
    ],
    note: 'Follow the example enquiry from question to confirmed human handover.',
  },
  'computer-vision': {
    eyebrow: 'Visual input / review', title: 'Give visual analysis a specific question.',
    intro: 'A visual workflow begins with representative images or video frames and a clear decision to support. Detection, classification or tracking is only useful when the result can be inspected and acted on.',
    cta: 'Discuss a vision project',
    details: [
      ['Inputs and criteria', 'For a scoped use case, define what objects, regions, conditions or changes matter. Image quality and real-world edge cases affect what can be reliably reviewed.'],
      ['Reviewable output', 'A proposed inspection or defect-detection flow can mark regions, classify a finding and keep uncertain results available for human verification.'],
      ['Connected next step', 'After review, structured findings may feed a dashboard, report or existing application through an API or webhook. The integration follows the decision, not the other way around.'],
    ],
    note: 'Use the scan control to reveal an illustrative detection and review state; no real image is analysed here.',
  },
  'crm-erp-systems': {
    eyebrow: 'Records / ownership', title: 'Make the next customer action visible.',
    intro: 'A CRM or ERP project is shaped around records and responsibilities: where a lead arrives, who owns a stage, which order or inventory fields matter and how the team sees the current status.',
    cta: 'Discuss business requirements',
    details: [
      ['Customer and sales flow', 'Contacts, leads, pipeline stages, reminders and follow-ups can be configured so each record has a clear owner and next action.'],
      ['Operational records', 'Inventory, orders and service information may need custom views, permissions or a connected ERP workflow. Access and data quality are part of the design.'],
      ['Management view', 'Dashboards and reports should answer practical questions about work in progress, with fields and definitions that match the team’s process.'],
    ],
    note: 'The illustrative record moves from enquiry to an owned next action.',
  },
  'workflow-automation': {
    eyebrow: 'Trigger / decision / action', title: 'Automate the handover, including exceptions.',
    intro: 'A flow should make the trigger, data, decision and outcome inspectable. We map the manual steps first, then decide which can be handled automatically and where a person still needs to approve or intervene.',
    cta: 'Automate my workflow',
    details: [
      ['Everyday repetition', 'Lead capture, follow-up emails, notifications, scheduled checks and approvals can be joined into a multi-step process using tools such as n8n, Make, Zapier or Power Automate.'],
      ['Data between tools', 'Field mapping and ownership matter when a record moves between a form, CRM, inbox and team workspace. A sync rule should avoid duplicate or conflicting updates.'],
      ['When a step fails', 'Validation, retry rules, outcome logs and a human review route make a flow maintainable after launch. A failed step should surface clearly to its owner.'],
    ],
    note: 'The route shows a request taking an approval branch before a record update.',
  },
  'api-integrations': {
    eyebrow: 'Request / response / event', title: 'Connections built around a reliable exchange.',
    intro: 'An integration has a source, a destination and a contract between them. We define fields, permissions, timing and failure behaviour before connecting a booking, CRM, payment or internal tool.',
    cta: 'Connect my systems',
    details: [
      ['Requests and events', 'REST APIs support direct requests and responses; webhooks can notify another application when something changes. The right pattern depends on the expected timing and source system.'],
      ['Data and access', 'Authentication, field mapping and validation protect the handover. Payment, CRM and database links need careful treatment of which data is sent and stored.'],
      ['Keep it observable', 'Test accepted and rejected requests, duplicate events, retries and missing fields. Logging and monitoring help the team maintain the connection as systems change.'],
    ],
    note: 'The illustrative packet shows a validated request and an acknowledgement.',
  },
  'digital-transformation': {
    eyebrow: 'Current state / next state', title: 'Change one useful workflow at a time.',
    intro: 'Transformation starts by finding repeated entry, disconnected information and handovers that rely on memory. A practical roadmap gives the team a manageable first change and a way to review what improved.',
    cta: 'Plan my transformation',
    details: [
      ['Understand the work', 'Map people, documents, records, decisions and delays before selecting new software. A process map separates the actual bottleneck from the tool used today.'],
      ['Connect and modernise', 'A form, application, CRM, automation or shared dashboard can replace repeated manual steps. Existing tools can be integrated where that is more sensible than rebuilding them.'],
      ['Adopt and improve', 'Plan access, ownership, training and a review cycle. Subsequent changes should follow observed use of the first workflow and the next operational priority.'],
    ],
    note: 'Switch between a fragmented manual flow and a connected, owned one.',
  },
};

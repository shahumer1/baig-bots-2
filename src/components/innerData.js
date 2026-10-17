export const innerServices = [
  { slug:'web-development', title:'Web Development', intro:'Web applications and portals shaped around the people and processes that use them.', focus:['Responsive interfaces','Customer and internal portals','Application integrations'], stack:['React','JavaScript','WordPress','Node.js','APIs and webhooks'], visual:'web', visualSteps:['Interface','Application logic','Connected data'], project:'Cash Flow Portal', projectDetail:'Cash flow portal.' },
  { slug:'cloud-infrastructure', title:'Cloud Infrastructure', intro:'Deployment and infrastructure work for applications that need dependable environments and clear operational visibility.', focus:['Deployment planning','Environment configuration','Monitoring and maintenance'], stack:['APIs and webhooks','Google Workspace','Slack'], visual:'cloud', visualSteps:['Application','Environment','Monitoring'], project:null },
  { slug:'ai-agents-chatbots', title:'AI Agents & Chatbots', intro:'Conversational agents that help teams handle questions, bookings and workflow handovers.', focus:['Support and knowledge assistants','AI voice agents','Human handover paths'], stack:['OpenAI','Anthropic','Retell AI','Twilio'], visual:'agents', visualSteps:['Incoming request','Agent response','Team handover'], project:'Hermes AI SDR', projectDetail:'An AI sales agent.' },
  { slug:'computer-vision', title:'Computer Vision', intro:'Visual analysis workflows that turn image or video inputs into structured signals for a defined task.', focus:['Visual input processing','Detection and review flows','Connections to business systems'], stack:['OpenAI','APIs and webhooks','JavaScript'], visual:'vision', visualSteps:['Visual input','Analysis','Review'], project:null },
  { slug:'crm-erp-systems', title:'CRM & ERP Systems', intro:'Customer and operational systems that keep records, handovers and follow-up work connected.', focus:['CRM configuration','ERP and CRM integrations','Lead and customer workflows'], stack:['GoHighLevel','Zoho CRM','HubSpot','monday.com','Airtable'], visual:'crm', visualSteps:['New record','Team action','Follow-up'], project:'EstatePro', projectDetail:'Property CRM and viewing workflows.' },
  { slug:'workflow-automation', title:'Workflow Automation', intro:'Automations for repeatable steps, approvals, notifications and data movement between tools.', focus:['Trigger and approval flows','Scheduled and event-driven actions','Cross-platform data sync'], stack:['n8n','Make.com','Zapier','Power Automate','Slack'], visual:'workflow', visualSteps:['Trigger','Decision','Action'], project:'Obsidian Mail Bridge', projectDetail:'Automated email workflows.' },
  { slug:'api-integrations', title:'API Integrations', intro:'Connect applications through APIs and webhooks so information moves through the right systems.', focus:['API and webhook connections','Data mapping and validation','Booking and CRM integrations'], stack:['APIs and webhooks','Twilio','GoHighLevel','Google Workspace'], visual:'api', visualSteps:['Source','API / webhook','Destination'], project:'GoHighLevel Booking API', projectDetail:'A booking API integration.' },
  { slug:'digital-transformation', title:'Digital Transformation', intro:'A practical path from manual processes to connected software and automation.', focus:['Process discovery','Prioritised delivery roadmap','Connected tools and team handovers'], stack:['React','n8n','monday.com','Airtable','Google Workspace'], visual:'transform', visualSteps:['Map the work','Connect the tools','Improve the flow'], project:'CareClinic', projectDetail:'Patient bookings and reminders.' },
];

export const innerIndustries = [
  {slug:'healthcare', title:'Healthcare', intro:'Booking, reminder and administrative workflows for care teams.', scenario:'CareClinic', detail:'Patient bookings and reminders.', services:['ai-agents-chatbots','workflow-automation','api-integrations']},
  {slug:'real-estate', title:'Real Estate', intro:'Property, lead and viewing workflows in a connected CRM.', scenario:'EstatePro', detail:'Property CRM and viewings.', services:['crm-erp-systems','workflow-automation','web-development']},
  {slug:'sales-lead-generation', title:'Sales & Lead Generation', intro:'Lead enrichment, outreach and booking handovers across sales tools.', scenario:'Prospectly', detail:'Lead enrichment.', services:['ai-agents-chatbots','crm-erp-systems','workflow-automation']},
  {slug:'finance-investment', title:'Finance & Investment', intro:'Portals and connected workflows for financial information and operational follow-up.', scenario:'Cash Flow Portal', detail:'Cash flow portal.', services:['web-development','api-integrations','workflow-automation']},
  {slug:'travel', title:'Travel', intro:'Booking enquiries, customer communication and tool integrations for travel operations.', services:['ai-agents-chatbots','api-integrations','workflow-automation']},
  {slug:'apparel-manufacturing', title:'Apparel & Manufacturing', intro:'Operational handovers, records and repeatable workflows across teams.', services:['crm-erp-systems','workflow-automation','digital-transformation']},
  {slug:'staffing-hr', title:'Staffing & HR', intro:'Candidate and team workflows with clearer records, reminders and approvals.', services:['crm-erp-systems','workflow-automation','ai-agents-chatbots']},
];

export const projectReferences = [
  ['CareClinic','Patient bookings and reminders'],['EstatePro','Property CRM and viewings'],['Prospectly','Lead enrichment'],
  ['Odoo Sales AI Assistant','Sales insights'],['Obsidian Mail Bridge','Automated emails'],['Hermes AI SDR','AI sales agent'],
  ['AI Video Generator','AI video generation'],['GoHighLevel Booking API','Booking API integration'],['Cash Flow Portal','Cash flow portal'],
  ['CRM implementations','CRM setup and workflows'],['AI Voice Agents','Voice agent workflows'],['Business workflow automation','Connected operational workflows'],
];
export const innerServicePath = (service) => `/services/${service.slug}`;
// Industry workflows provide concrete examples on service pages.
export const serviceIndustryExamples = {
  'web-development': 'finance-investment',
  'ai-agents-chatbots': 'sales-lead-generation',
  'crm-erp-systems': 'real-estate',
  'workflow-automation': 'apparel-manufacturing',
  'api-integrations': 'healthcare',
  'digital-transformation': 'healthcare',
};

export const coreServices = [
  { slug: 'ai-solutions-intelligent-agents', title: 'AI Solutions & Intelligent Agents', description: 'Chatbots and support assistants, conversational interfaces, knowledge-base search, workflow copilots and AI document processing.', points: ['Customer and internal support assistants', 'Knowledge search and document processing', 'Workflow copilots connected to your systems'] },
  { slug: 'business-process-automation', title: 'Business Process Automation', description: 'Power Automate and n8n flows for alerts, approvals, scheduled processes and cross-platform data sync.', points: ['Approvals, alerts and scheduled workflows', 'Cross-platform data synchronisation', 'Less manual work and clearer handovers'] },
  { slug: 'custom-software-saas', title: 'Custom Software & SaaS', description: 'Business applications, customer and admin portals, dashboards, scalable backends and bespoke SaaS products.', points: ['Customer and admin portals', 'Dashboards and business applications', 'Scalable APIs and SaaS platforms'] },
  { slug: 'apis-system-integrations', title: 'APIs & System Integrations', description: 'REST/SOAP interfaces, webhooks, XML/XSD processing, middleware, payment APIs and secure data exchange.', points: ['REST, SOAP and webhook integrations', 'Data validation and XML/XSD processing', 'Secure connections between existing systems'] },
  { slug: 'fintech-payment-technology', title: 'Fintech & Payment Technology', description: 'SmartVista services, card issuing and acquiring, ATM/POS transactions, billing, clearing, settlement and reconciliation.', points: ['Card issuing and acquiring workflows', 'ATM/POS and billing integrations', 'Clearing, settlement and reconciliation'] },
  { slug: 'data-engineering-bi', title: 'Data Engineering & BI', description: 'Oracle and MongoDB data work, ETL and validation, Power BI and Tableau dashboards, financial reporting.', points: ['Data pipelines, ETL and validation', 'Power BI and Tableau dashboards', 'Reliable operational and financial reporting'] },
  { slug: 'cloud-managed-it', title: 'Cloud & Managed IT', description: 'Deployment, hosting coordination, environment maintenance, server diagnostics and observability.', points: ['Deployment and hosting coordination', 'Environment maintenance and monitoring', 'Diagnostics and observability'] },
  { slug: 'enterprise-support-consulting', title: 'Enterprise Support & Consulting', description: 'Incident and root-cause analysis, UAT/SIT support, performance reviews and production troubleshooting.', points: ['Incident and root-cause analysis', 'UAT/SIT and production support', 'Performance reviews and troubleshooting'] },
];

export const otherServices = [
  { slug: 'web-mobile-development', title: 'Web & Mobile Development', description: 'Corporate sites, eCommerce, WordPress and Shopify, mobile apps and digital portals.' },
  { slug: 'crm-erp-solutions', title: 'CRM & ERP Solutions', description: 'CRM setup, lead and customer workflows, integrations, data migration and extensions.' },
  { slug: 'ui-ux-product-design', title: 'UI/UX & Product Design', description: 'Discovery, wireframes, prototypes, user journeys and design systems.' },
  { slug: 'branding-graphic-design', title: 'Branding & Graphic Design', description: 'Logos and identity, brand guidelines, pitch decks, brochures and collateral.' },
  { slug: 'digital-marketing-seo', title: 'Digital Marketing & SEO', description: 'Technical and on-page SEO, campaigns, social content, email and paid ads.' },
  { slug: 'video-digital-content', title: 'Video & Digital Content', description: 'Short-form reels, motion graphics, promotional assets and marketing creatives.' },
  { slug: 'ai-extensions-emerging-tech', title: 'AI Extensions & Emerging Tech', description: 'AI voice interfaces, computer vision and business-specific AI integrations.' },
  { slug: 'dedicated-development-teams', title: 'Dedicated Development Teams', description: 'Project-based engineers, specialist resourcing, maintenance and improvement sprints.' },
];

export const allServices = [...coreServices, ...otherServices];
export const servicePath = (service) => `/services/${service.slug}`;

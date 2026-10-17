import { IndustryOpportunityTabs } from './HealthcarePracticeTabs.jsx';

const opportunities = [
  {
    name: 'Cash flow view', short: 'VISIBILITY', headline: 'See the movement behind the balance.',
    context: 'A useful cash flow view brings approved incoming and outgoing records together so a team can understand what changed and which items need attention.',
    friction: ['Figures assembled from separate files', 'Changes difficult to trace back to a source'],
    support: [
      ['Define the records', 'Agree which sources and dates belong in the view before designing a dashboard.'],
      ['Show the movement', 'Present inflows, outflows and open items in a clear, permissioned interface.'],
      ['Keep the source visible', 'Let authorised staff review the record behind an amount or exception.'],
    ],
    journey: ['SOURCE', 'REVIEW', 'VIEW'],
  },
  {
    name: 'Record checks', short: 'VALIDATION', headline: 'Make exceptions easier to find and resolve.',
    context: 'When records arrive from different systems, the team needs agreed checks and a clear way to review missing or inconsistent information.',
    friction: ['Unmatched records buried in spreadsheets', 'Unclear owner for an exception'],
    support: [
      ['Agree the rules', 'Define the fields, sources and matching criteria with the people responsible for review.'],
      ['Surface exceptions', 'Separate records needing attention from those that passed the agreed checks.'],
      ['Track resolution', 'Keep the reviewer, decision and next action attached to the exception.'],
    ],
    journey: ['IMPORT', 'CHECK', 'RESOLVE'],
  },
  {
    name: 'Customer access', short: 'PORTAL', headline: 'Give customers a clear view of approved information.',
    context: 'A customer portal can reduce repeat requests when people can find the documents and status information they are authorised to see.',
    friction: ['Staff repeatedly assemble the same update', 'Sensitive details shared without a clear access rule'],
    support: [
      ['Set permissions', 'Decide which information each customer and staff role may see.'],
      ['Present the right context', 'Organise approved records, documents and status updates around the customer task.'],
      ['Provide a request path', 'Give customers a clear way to ask a question when information needs human review.'],
    ],
    journey: ['ACCESS', 'REVIEW', 'REQUEST'],
  },
  {
    name: 'Requests & approvals', short: 'OWNERSHIP', headline: 'Keep every decision with the right person.',
    context: 'Document requests, corrections and approvals move faster when the next owner can see the context and a clear action.',
    friction: ['Requests scattered across inboxes', 'Approval status hard to explain'],
    support: [
      ['Capture the request', 'Keep the customer, record and requested action together.'],
      ['Route for review', 'Send the work to the agreed owner with the information needed to decide.'],
      ['Record the outcome', 'Show what was approved, returned or still waiting for a person.'],
    ],
    journey: ['REQUEST', 'OWNER', 'DECISION'],
  },
  {
    name: 'Reporting & trends', short: 'PLANNING', headline: 'Turn reviewed data into a useful business view.',
    context: 'A trend is only helpful when the team agrees what each measure means. Clear reporting can make changes easier to inspect without presenting an illustrative chart as a real result.',
    friction: ['Different teams use different definitions', 'A chart offers no path back to its records'],
    support: [
      ['Define the measure', 'Agree the reporting period, source and calculation before drawing the view.'],
      ['Compare consistently', 'Show changes across periods using the same approved definitions.'],
      ['Investigate a change', 'Let authorised users move from a trend to the underlying records and open actions.'],
    ],
    journey: ['DEFINE', 'COMPARE', 'INVESTIGATE'],
  },
];

export function FinanceOpportunityTabs() {
  return <IndustryOpportunityTabs id="finance-opportunities" label="Where we help / Finance & Investment" heading="Make the numbers useful to the people responsible for them." intro="Choose a common finance workflow to see how clearer records, review and access can support customers and internal teams." items={opportunities} focusLabel="FINANCE WORKFLOW" tabListLabel="Finance and investment workflow opportunities" contactBase="Finance & Investment"/>;
}

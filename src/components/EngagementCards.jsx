const models = [
  {
    title: 'Fixed-scope project',
    bestFor: 'A clearly defined build with a known outcome',
    scope: 'Agreed up front, after discovery',
    deliverables: 'Working software, tests, documentation and handover',
  },
  {
    title: 'Discovery & prototyping',
    bestFor: 'Testing an idea before committing to a full build',
    scope: 'Short and time-boxed',
    deliverables: 'Requirements, architecture, a prototype and an estimate',
  },
  {
    title: 'Integrations & modernisation',
    bestFor: 'Connecting or upgrading systems you already run',
    scope: 'System by system',
    deliverables: 'APIs, data migration and UAT/SIT support',
  },
  {
    title: 'Retainer support',
    bestFor: 'Ongoing fixes, changes and production support',
    scope: 'A rolling monthly backlog',
    deliverables: 'Incident analysis, root-cause reports and improvements',
  },
  {
    title: 'Dedicated technical resources',
    bestFor: 'Extending your team for a longer stretch',
    scope: 'Directed by your team',
    deliverables: 'Engineers working inside your process and tools',
  },
];

export function EngagementCards() {
  return (
    <div className="eng-grid">
      {models.map((model, index) => (
        <article className="eng-card" key={model.title}>
          <div className="eng-card-head">
            <span className="eng-card-index">0{index + 1}</span>
            <h3>{model.title}</h3>
          </div>
          <dl className="eng-card-details">
            <div><dt>Best for</dt><dd>{model.bestFor}</dd></div>
            <div><dt>Scope</dt><dd>{model.scope}</dd></div>
            <div><dt>What you get</dt><dd>{model.deliverables}</dd></div>
          </dl>
          <button className="pick" type="button" data-pick={model.title} aria-label={`Choose ${model.title}`}>
            Choose
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </article>
      ))}
    </div>
  );
}

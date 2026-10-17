const iconKinds = [
  [/react/i, 'react'], [/javascript/i, 'javascript'], [/wordpress/i, 'wordpress'], [/node\.js/i, 'node'],
  [/n8n/i, 'workflow'], [/openai/i, 'openai'], [/anthropic/i, 'anthropic'], [/retell/i, 'voice'],
  [/twilio/i, 'twilio'], [/gohighlevel/i, 'crm'], [/zoho/i, 'zoho'], [/hubspot/i, 'hubspot'],
  [/monday/i, 'monday'], [/airtable/i, 'airtable'], [/make\.com/i, 'make'], [/zapier/i, 'zapier'],
  [/power automate/i, 'power'], [/google workspace/i, 'google'], [/slack/i, 'slack'],
  [/(api|webhook)/i, 'api'], [/runtime/i, 'runtime'],
];

function SingleIcon({ kind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'react') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><ellipse cx="16" cy="16" rx="13" ry="5.3"/><ellipse cx="16" cy="16" rx="13" ry="5.3" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.3" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none"/></svg>;
  if (kind === 'javascript') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="4" y="4" width="24" height="24" rx="2"/><path d="M14 12v8c0 3-2 4-5 2M19 21c1 2 5 2 5-1 0-2-2-2.5-4-3.5-2-1.5-1-4 2-4 1.5 0 2.5.6 3 1.6"/></svg>;
  if (kind === 'wordpress') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="16" r="13"/><path d="M6.5 12h4l4 12 3.3-9.5L15.8 12h3.4l4.2 12 3-10M9 9h12"/></svg>;
  if (kind === 'node') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 2.5 28 9.3v13.4L16 29.5 4 22.7V9.3zM11 22V10l10 12V10"/></svg>;
  if (kind === 'workflow' || kind === 'make') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="3" y="12" width="7" height="7" rx="1.5"/><rect x="22" y="4" width="7" height="7" rx="1.5"/><rect x="22" y="21" width="7" height="7" rx="1.5"/><path d="M10 15.5h5q3 0 3-4V8h4M18 15.5v6q0 3 4 3"/></svg>;
  if (kind === 'openai') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 3c4-2 8 1 8 5 4 1 6 5 4 9 2 4-1 8-5 8-1 4-5 6-9 4-4 2-8-1-8-5-4-1-6-5-4-9-2-4 1-8 5-8 1-4 5-6 9-4Z"/><path d="m10 11 8-4 7 4v9l-8 5-8-5v-9l7 4 8-4M9 20l7-4 7 4"/></svg>;
  if (kind === 'anthropic') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M5 26 14 5h4l9 21M9 18h14M25 6v7"/></svg>;
  if (kind === 'voice') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M4 16h3l3-7 4 14 4-17 4 20 3-10h3"/></svg>;
  if (kind === 'twilio') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="16" r="13"/>{[[11,11],[21,11],[11,21],[21,21]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="currentColor" stroke="none"/>)}</svg>;
  if (kind === 'zoho') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="3" y="3" width="12" height="12"/><rect x="17" y="3" width="12" height="12"/><rect x="3" y="17" width="12" height="12"/><rect x="17" y="17" width="12" height="12"/></svg>;
  if (kind === 'hubspot' || kind === 'crm') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="15" cy="16" r="5"/><circle cx="25" cy="5" r="2.5"/><circle cx="26" cy="24" r="2.5"/><circle cx="5" cy="8" r="2.5"/><path d="m19 12 4-5m-3 12 4 4M11 13 7 9"/></svg>;
  if (kind === 'monday') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m5 23 6-12M13 23l6-12M22 23l6-12" strokeWidth="4"/></svg>;
  if (kind === 'airtable') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m3 10 13-6 13 6-13 6zM3 14l11 5v9L3 23zM29 14l-11 5v9l11-5z"/></svg>;
  if (kind === 'zapier') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 3v26M3 16h26M7 7l18 18M25 7 7 25" strokeWidth="2.4"/><circle cx="16" cy="16" r="4" fill="var(--card)"/></svg>;
  if (kind === 'power') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M3 8h12l-5 8h12l-8 10H3l8-10H3zM18 5h11l-6 10h-8"/></svg>;
  if (kind === 'google') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M27 16a11 11 0 1 1-3-8M27 16h-11M27 16c0 7-5 11-11 11" strokeWidth="2.5"/></svg>;
  if (kind === 'slack') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M11 3v13M16 3v13M3 11h13M3 16h13M21 16v13M16 16v13M16 21h13M16 16h13" strokeWidth="3"/></svg>;
  if (kind === 'api') return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m11 8-7 8 7 8m10-16 7 8-7 8M18 5l-4 22"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="5" y="5" width="22" height="22" rx="2"/><path d="M10 16h12m-6-6v12"/></svg>;
}

export function TechIcon({ name }) {
  const parts = name.split(/\s*\+\s*/).slice(0, 2);
  const icons = parts.map((part, index) => {
    const kind = iconKinds.find(([matcher]) => matcher.test(part))?.[1] || 'runtime';
    return <span className={`tech-icon tech-icon-${kind}`} key={`${part}-${index}`} aria-hidden="true"><SingleIcon kind={kind}/></span>;
  });
  return icons.length > 1 ? <span className="tech-icon-pair" aria-hidden="true">{icons}</span> : icons[0];
}

export function TechLabel({ name }) {
  return <span className="tech-label"><TechIcon name={name}/><span>{name}</span></span>;
}

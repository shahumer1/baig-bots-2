import { useState } from 'react';
import { motion } from 'motion/react';

const drivers = [
  { key: 'booking', number: '01', title: 'AI booking agent', detail: 'Enquiries become bookings', percent: 20, start: 0 },
  { key: 'followup', number: '02', title: 'AI follow-ups', detail: 'Missed leads return', percent: 20, start: 20 },
  { key: 'qualify', number: '03', title: 'Lead qualification', detail: 'Sales speaks to ready buyers', percent: 15, start: 40 },
  { key: 'reminders', number: '04', title: 'No-show reminders', detail: 'Fewer missed appointments', percent: 10, start: 55 },
];
const totalGrowth = drivers.reduce((total, driver) => total + driver.percent, 0);

function DriverIcon({ kind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'booking') return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17M8 14h3l1.4 1.5L16 12" /></svg>;
  if (kind === 'followup') return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><path d="M20 11.5a8 8 0 1 1-2.4-5.7M20 4v5h-5" /><path d="M8.5 13h7M12 9.5v7" /></svg>;
  if (kind === 'qualify') return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><path d="m9.5 12 1.7 1.7 3.3-3.5" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}><path d="M6 16.5h12c-1.4-1.3-2-2.9-2-5V9a4 4 0 0 0-8 0v2.5c0 2.1-.6 3.7-2 5ZM10 19a2 2 0 0 0 4 0" /><path d="M18.5 5.5c1.1.9 1.8 2.1 2 3.5M5.5 5.5C4.4 6.4 3.7 7.6 3.5 9" /></svg>;
}

export function AutomationImpactChart() {
  const [active, setActive] = useState(null);

  return (
    <div className="impact-card">
      <div className="impact-heading">
        <span className="impact-kicker">Automation opportunity</span>
        <h3>Four ways automation can help you grow.</h3>
      </div>

      <div className="impact-content">
        <div className="impact-donut" role="img" aria-label="Illustrative growth opportunity: 20 percent from AI booking, 20 percent from follow-ups, 15 percent from lead qualification and 10 percent from reminders">
          <svg viewBox="0 0 240 240" aria-hidden="true">
            <circle className="impact-ring-depth" cx="120" cy="129" r="77" pathLength="100" />
            <circle className="impact-ring-track" cx="120" cy="120" r="77" pathLength="100" />
            {drivers.map((driver, index) => (
              <motion.circle key={driver.key} className={`impact-ring-segment ${driver.key}${active === driver.key ? ' is-active' : ''}`}
                cx="120" cy="120" r="77" pathLength="100" transform={`rotate(${-90 + driver.start * 3.6} 120 120)`}
                initial={{ strokeDasharray: '0 100' }}
                whileInView={{ strokeDasharray: `${driver.percent} ${100 - driver.percent}` }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.55, delay: index * 0.24, ease: 'easeOut' }} />
            ))}
          </svg>
          <div className="impact-donut-center">
            <strong>+{totalGrowth}%</strong>
            <span>example growth</span>
          </div>
        </div>

        <div className="impact-drivers">
          {drivers.map((driver) => (
            <button key={driver.key} className={`impact-driver ${driver.key}${active === driver.key ? ' is-active' : ''}`} type="button"
              aria-pressed={active === driver.key}
              aria-label={`${driver.title}: illustrative ${driver.percent} percent growth. ${driver.detail}`}
              onMouseEnter={() => setActive(driver.key)} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(driver.key)} onBlur={() => setActive(null)}
              onClick={() => setActive(active === driver.key ? null : driver.key)}>
              <span className="impact-driver-icon"><DriverIcon kind={driver.key} /></span>
              <span className="impact-driver-copy"><small>{driver.number}</small><strong>{driver.title}</strong></span>
              <b>+{driver.percent}%</b>
            </button>
          ))}
        </div>
      </div>
      <p className="impact-note">Illustrative example · Results depend on your business.</p>
    </div>
  );
}

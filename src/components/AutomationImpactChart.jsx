import { useState } from 'react';
import { motion } from 'motion/react';

// Example values illustrate the comparison; they are not measured customer results.
const metrics = [
  { key: 'time', label: 'Time back', potential: 68, current: 12, angle: -90 },
  { key: 'accuracy', label: 'Accuracy', potential: 92, current: 74, angle: 30 },
  { key: 'routine', label: 'Routine work', potential: 82, current: 16, angle: 150 },
];

const point = (angle, value) => {
  const radians = angle * Math.PI / 180;
  const radius = 105 * value / 100;
  return [200 + Math.cos(radians) * radius, 156 + Math.sin(radians) * radius];
};

const polygon = (values) => values.map((value, index) => point(metrics[index].angle, value).join(',')).join(' ');
const outline = (values) => `${values.map((value, index) => `${index ? 'L' : 'M'}${point(metrics[index].angle, value).join(' ')}`).join('')}Z`;

export function AutomationImpactChart() {
  const [active, setActive] = useState(null);
  const potential = metrics.map((metric) => metric.potential);
  const current = metrics.map((metric) => metric.current);
  const selected = metrics.find((metric) => metric.key === active);

  return (
    <div className="impact-card" data-tilt="">
      <div className="impact-heading">
        <span className="impact-kicker">Automation opportunity</span>
        <h3>Make more time for meaningful work.</h3>
        <p>See what repetitive work could give back to your team.</p>
      </div>

      <div className="impact-plot">
        <svg viewBox="0 0 400 265" role="img" aria-label="Illustrative comparison of automated and current workflows">
          {[25, 50, 75, 100].map((level) => (
            <polygon key={level} className="impact-ring" points={polygon(metrics.map(() => level))} />
          ))}
          {metrics.map((metric) => {
            const [x, y] = point(metric.angle, 100);
            return <line key={metric.key} className="impact-axis" x1="200" y1="156" x2={x} y2={y} />;
          })}
          <motion.path
            className="impact-shape current"
            d={outline(current)}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: 0.16 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <motion.path
            className="impact-shape potential"
            d={outline(potential)}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: 0.18 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ pathLength: { duration: 1.45, ease: 'easeInOut', delay: 0.2 }, fillOpacity: { duration: 0.6, delay: 1 } }}
          />
          {metrics.map((metric) => {
            const [x, y] = point(metric.angle, metric.potential);
            return <motion.circle key={metric.key} className={`impact-point ${active === metric.key ? 'active' : ''}`} cx={x} cy={y} r="4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.4, delay: 1.25 }} />;
          })}
        </svg>

        {metrics.map((metric) => (
          <button
            key={metric.key}
            className={`impact-metric ${metric.key}`}
            type="button"
            aria-label={`${metric.label}: automation potential ${metric.potential} percent, current process ${metric.current} percent`}
            onMouseEnter={() => setActive(metric.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(metric.key)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(metric.key)}
          >
            <strong>{metric.potential}% <small>/ {metric.current}%</small></strong>
            <span>{metric.label}</span>
          </button>
        ))}
        {selected && (
          <div className="impact-tooltip" role="status">
            <strong>{selected.label}</strong>
            <span>Potential {selected.potential}%</span>
            <span>Today {selected.current}%</span>
          </div>
        )}
      </div>

      <div className="impact-legend">
        <span><i className="potential" />With automation</span>
        <span><i className="current" />Today</span>
      </div>
      <p className="impact-note">Illustrative scenario · Actual impact depends on your workflow.</p>
    </div>
  );
}

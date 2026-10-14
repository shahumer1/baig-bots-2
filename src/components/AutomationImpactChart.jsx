import { useState } from 'react';
import { motion } from 'motion/react';

// Illustrative values, not measured customer results.
const metrics = [
  { key: 'time', label: 'Time back', ai: 68, without: 12 },
  { key: 'accuracy', label: 'Accuracy', ai: 92, without: 74 },
  { key: 'routine', label: 'Routine work', ai: 82, without: 16 },
];

const xPositions = [104, 243, 382];
const chartTop = 30;
const chartBottom = 210;
const chartY = (value) => chartBottom - (chartBottom - chartTop) * value / 100;
const sharedStart = { x: 58, y: chartY(metrics[0].without) };
const linePath = (series) => `M ${sharedStart.x} ${sharedStart.y} ${metrics.map((metric, index) =>
  `L ${xPositions[index]} ${chartY(metric[series])}`
).join(' ')}`;
const gridLevels = [0, 25, 50, 75, 100];
const lineVariants = (duration, delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1.08, opacity: 1, transition: { pathLength: { duration, delay, ease: 'easeInOut' }, opacity: { duration: 0.15, delay } } },
});

export function AutomationImpactChart() {
  const [active, setActive] = useState(null);
  const selected = metrics.find((metric) => metric.key === active);

  return (
    <div className="impact-card" data-tilt="">
      <div className="impact-heading">
        <span className="impact-kicker">Automation opportunity</span>
        <h3>Make more time for meaningful work.</h3>
        <p>See what repetitive work could give back to your team.</p>
      </div>

      <div className="impact-plot">
        <motion.svg
          viewBox="0 0 440 230"
          role="img"
          aria-label="Line chart starting both series at the same point, then comparing with AI automation and without automation for time back, accuracy, and routine work"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          {gridLevels.map((level) => (
            <g key={level} className="impact-grid-line">
              <line x1="48" x2="398" y1={chartY(level)} y2={chartY(level)} />
              <text x="40" y={chartY(level) + 4} textAnchor="end">{level}</text>
            </g>
          ))}
          {xPositions.map((x, index) => (
            <line key={metrics[index].key} className="impact-guide" x1={x} x2={x} y1={chartTop} y2={chartBottom} />
          ))}
          <motion.path className="impact-line without-halo" d={linePath('without')} variants={lineVariants(1.25)} />
          <motion.path
            className="impact-line without"
            d={linePath('without')}
            variants={lineVariants(1.25)}
          />
          <motion.path
            className="impact-line ai"
            d={linePath('ai')}
            variants={lineVariants(1.45, 0.15)}
          />
          <circle className="impact-dot without" cx={sharedStart.x} cy={sharedStart.y} r="4.5" />
          {metrics.map((metric, index) => (
            <g key={metric.key}>
              <motion.circle className="impact-dot without" cx={xPositions[index]} cy={chartY(metric.without)} r="4.5"
                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 1.25 + index * 0.07, duration: 0.25 } } }} />
              <motion.circle className="impact-dot ai" cx={xPositions[index]} cy={chartY(metric.ai)} r="5"
                variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 1.6 + index * 0.07, duration: 0.25 } } }} />
            </g>
          ))}
        </motion.svg>
        {selected && (
          <div className="impact-tooltip" role="status">
            <strong>{selected.label}</strong>
            <span>With AI automation {selected.ai}%</span>
            <span>Without automation {selected.without}%</span>
          </div>
        )}
      </div>

      <div className="impact-metrics">
        {metrics.map((metric) => (
          <button key={metric.key} className="impact-metric" type="button"
            aria-label={`${metric.label}: with AI automation ${metric.ai} percent, without automation ${metric.without} percent`}
            onMouseEnter={() => setActive(metric.key)} onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(metric.key)} onBlur={() => setActive(null)} onClick={() => setActive(metric.key)}>
            <span>{metric.label}</span>
            <strong>{metric.ai}% <small>/ {metric.without}%</small></strong>
          </button>
        ))}
      </div>
      <div className="impact-legend">
        <span><i className="ai" />With AI automation</span>
        <span><i className="without" />Without automation</span>
      </div>
      <p className="impact-note">Illustrative scenario · Actual impact depends on your workflow.</p>
    </div>
  );
}

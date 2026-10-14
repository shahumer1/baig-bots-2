import { motion } from 'motion/react';

const stages = ['Discover', 'Architect', 'Build', 'Test', 'Launch'];

export function ProcessGrowth() {
  return (
    <figure className="process-growth" aria-label="Project journey grows from Discover through Architect, Build, Test and Launch">
      <div className="process-growth-chart">
        <ol className="process-growth-bars">
          {stages.map((stage, index) => (
            <motion.li
              key={stage}
              className={`process-growth-bar process-growth-bar-${index + 1}`}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="process-growth-label">{stage}</span>
            </motion.li>
          ))}
        </ol>
        <motion.svg
          className="process-growth-arrow"
          viewBox="0 0 500 240"
          preserveAspectRatio="none"
          aria-hidden="true"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.path
            d="M 26 140 L 122 100 L 218 68 L 278 76 L 324 38 L 450 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.7, delay: 0.25, ease: 'easeInOut' } } }}
          />
          <motion.path
            d="M 450 10 L 420 6 M 450 10 L 427 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.3, delay: 1.9 } } }}
          />
        </motion.svg>
      </div>
    </figure>
  );
}

import { motion } from 'motion/react';

export function DrawCircleText({ children, targetWord }) {
  return (
    <div className="draw-circle-text" data-circle-word={targetWord}>
      <h2 className="h2" data-split="">{children}</h2>
      <svg viewBox="0 0 286 73" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <motion.path
          d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
          fill="none"
          stroke="var(--circle-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.25, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

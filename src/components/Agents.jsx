import { useEffect, useRef } from 'react';
import { AutomationImpactChart } from './AutomationImpactChart.jsx';
import { DrawCircleText } from './DrawCircleText.jsx';
export function Agents() {
  const flowRef = useRef(null);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const reply = flow.querySelector('[data-scr-text]');
    const bot = flow.querySelector('[data-m="b"]');
    const steps = Array.from(flow.querySelectorAll('[data-s]'));
    const fullReply = reply.textContent;
    const timers = new Set();
    let started = false;
    let inView = false;
    const later = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };
    const reset = () => {
      timers.forEach(window.clearTimeout);
      timers.clear();
      flow.dataset.phase = 'idle';
      reply.textContent = fullReply;
      steps.forEach((step) => step.classList.remove('is-done'));
    };
    const start = () => {
      if (started) return;
      started = true;
      bot.style.minHeight = `${bot.getBoundingClientRect().height}px`;
      flow.dataset.phase = 'request';
      later(() => { flow.dataset.phase = 'typing'; }, 750);
      later(() => {
        flow.dataset.phase = 'response';
        reply.textContent = '';
        let count = 0;
        const type = () => {
          count += 1;
          reply.textContent = fullReply.slice(0, count);
          if (count < fullReply.length) {
            later(type, /[,.;]/.test(fullReply[count - 1]) ? 150 : 25);
          } else {
            flow.dataset.phase = 'complete';
            steps.forEach((step, index) => later(() => step.classList.add('is-done'), 180 + index * 420));
            later(() => {
              if (!inView) return;
              started = false;
              reset();
              start();
            }, 180 + steps.length * 420 + 3800);
          }
        };
        type();
      }, 1650);
    };
    flow.dataset.phase = 'idle';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        inView = true;
        start();
      } else if (inView) {
        inView = false;
        started = false;
        reset();
      }
    }, { threshold: 0.12 });
    observer.observe(flow);
    return () => {
      observer.disconnect();
      reset();
      delete flow.dataset.phase;
      bot.style.removeProperty('min-height');
    };
  }, []);

  return <><section className="sec alt" id="agents">
  <div className="wrap agents-grid">
    <AutomationImpactChart />
    <div className="agents-copy">
      <p className="eyebrow"><span className="dot"></span>03 — AI &amp; automation</p>
      <DrawCircleText targetWord="busywork">Assistants and automations that take the busywork off your team.</DrawCircleText>
      <p className="lead muted">Built on Power Automate, n8n and custom AI, they read documents, sync records across systems, route approvals and hand over to a person the moment it matters.</p>
      <div className="flow" data-flow="" ref={flowRef}>
        <div className="flow-head"><span className="pdot"></span>Sample workflow · Supplier invoices</div>
        <div className="msg user" data-m="u">Process today's supplier invoices and flag any mismatches.</div>
        <div className="slot">
          <div className="typing" data-typing="" aria-hidden="true"><i></i><i></i><i></i></div>
          <div className="msg bot" data-m="b"><span data-scr-text="">On it. I'll read each invoice, match it to its purchase order and send exceptions for approval.</span></div>
        </div>
        <ul className="steps">
          <li data-s=""><span className="tick"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 3.5"></path></svg></span>Invoices collected from the shared inbox</li>
          <li data-s=""><span className="tick"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 3.5"></path></svg></span>Fields extracted and validated with AI</li>
          <li data-s=""><span className="tick"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 3.5"></path></svg></span>Matched to purchase orders over the ERP API</li>
          <li data-s=""><span className="tick"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 3.5"></path></svg></span>Exceptions routed to finance for approval</li>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* ESTIMATOR */}
</>;
}

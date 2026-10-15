import { AutomationImpactChart } from './AutomationImpactChart.jsx';
import { DrawCircleText } from './DrawCircleText.jsx';
export function Agents() {
  return <><section className="sec alt" id="agents">
  <div className="wrap agents-grid">
    <AutomationImpactChart />
    <div className="agents-copy">
      <p className="eyebrow"><span className="dot"></span>03 — AI &amp; automation</p>
      <DrawCircleText targetWord="busywork">Assistants and automations that take the busywork off your team.</DrawCircleText>
      <p className="lead muted">Built on Power Automate, n8n and custom AI, they read documents, sync records across systems, route approvals and hand over to a person the moment it matters.</p>
      <div className="flow" data-flow="">
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

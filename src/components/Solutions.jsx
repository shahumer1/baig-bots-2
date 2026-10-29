import { useEffect, useRef } from 'react';

export function Solutions() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const body = section?.querySelector('.uc-body');
    const left = section?.querySelector('.uc-panels');
    const right = section?.querySelector('.pipe');
    if (!body || !left || !right) return;

    let frame = 0;
    const render = () => {
      frame = 0;
      const start = window.innerHeight * .95;
      const end = window.innerHeight * .55;
      const distance = window.innerWidth < 768 ? 105 : 125;
      const updatePanel = (panel, direction) => {
        const top = panel.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, (start - top) / (start - end)));
        const eased = progress * progress * (3 - 2 * progress);
        panel.style.transform = `translate3d(${direction * distance * (1 - eased)}%, 0, 0)`;
        panel.style.opacity = String(.55 + eased * .45);
      };
      updatePanel(left, -1);
      updatePanel(right, 1);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(render); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    render();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
      left.style.removeProperty('transform');
      right.style.removeProperty('transform');
      left.style.removeProperty('opacity');
      right.style.removeProperty('opacity');
    };
  }, []);

  return <><section className="sec alt" id="solutions" data-uc="" ref={sectionRef}>
  <div className="wrap">
    <div className="sec-head">
      <p className="eyebrow"><span className="dot"></span>02 — Solutions</p>
      <h2 className="h2" data-split="">What that looks like inside a real business.</h2>
      <p className="lead muted">Five example solutions built from our service lines. Pick one to see the problem, what we would build and how the data flows.</p>
    </div>
    <div className="uc-tabs" role="tablist" aria-label="Example solutions">
      <button className="uc-tab" type="button" role="tab" id="uc-t1" aria-controls="uc-p1" aria-selected="true" tabIndex="0" data-uc-tab=""><span className="n">01</span><span className="tl-t">Payments &amp; settlement</span><i className="bar" aria-hidden="true"></i></button>
      <button className="uc-tab" type="button" role="tab" id="uc-t2" aria-controls="uc-p2" aria-selected="false" tabIndex="-1" data-uc-tab=""><span className="n">02</span><span className="tl-t">Finance operations</span><i className="bar" aria-hidden="true"></i></button>
      <button className="uc-tab" type="button" role="tab" id="uc-t3" aria-controls="uc-p3" aria-selected="false" tabIndex="-1" data-uc-tab=""><span className="n">03</span><span className="tl-t">Customer support</span><i className="bar" aria-hidden="true"></i></button>
      <button className="uc-tab" type="button" role="tab" id="uc-t4" aria-controls="uc-p4" aria-selected="false" tabIndex="-1" data-uc-tab=""><span className="n">04</span><span className="tl-t">Sales &amp; CRM</span><i className="bar" aria-hidden="true"></i></button>
      <button className="uc-tab" type="button" role="tab" id="uc-t5" aria-controls="uc-p5" aria-selected="false" tabIndex="-1" data-uc-tab=""><span className="n">05</span><span className="tl-t">Production support</span><i className="bar" aria-hidden="true"></i></button>
    </div>
    <div className="uc-body">
      <div className="uc-panels">
        <div className="hud uc-panel" role="tabpanel" id="uc-p1" aria-labelledby="uc-t1" data-uc-panel="" data-n1="Scheme & switch files" data-s1="Clearing, settlement, ATM/POS" data-n2="Validate & match" data-s2="XML/XSD checks, record matching" data-n3="Exceptions & reports" data-s3="Audit trail and dashboards">
          <span className="uc-k">Example 01 · Payments &amp; settlement</span>
          <h3>Settlement &amp; reconciliation autopilot</h3>
          <div className="uc-row"><span className="uc-l">The problem</span><p>Clearing and settlement files from schemes and switches are checked by hand, so mismatches surface days later.</p></div>
          <div className="uc-row"><span className="uc-l">What we build</span><p>Automated file intake with XML/XSD validation, matching against core and SmartVista records, and an exceptions queue with a full audit trail.</p></div>
          <ul className="tags"><li>SmartVista</li><li>Oracle SQL / PLSQL</li><li>XML / XSD</li><li>Power BI</li></ul>
          <a className="link-arrow" href="#contact" data-uc-plan="Settlement & reconciliation autopilot">Plan this with us
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
        <div className="hud uc-panel" role="tabpanel" id="uc-p2" aria-labelledby="uc-t2" data-uc-panel="" data-n1="Shared inbox" data-s1="Invoices in any format" data-n2="AI extract & match" data-s2="Fields, totals, PO lookup" data-n3="ERP + approvals" data-s3="Exceptions routed to finance" hidden>
          <span className="uc-k">Example 02 · Finance operations</span>
          <h3>Invoice-to-approval flow</h3>
          <div className="uc-row"><span className="uc-l">The problem</span><p>Invoices arrive by email in different formats and are keyed into the ERP by hand.</p></div>
          <div className="uc-row"><span className="uc-l">What we build</span><p>AI document extraction, purchase-order matching over the ERP API and Power Automate approvals, with exceptions routed to the right person.</p></div>
          <ul className="tags"><li>Power Automate</li><li>Dataverse</li><li>AI document processing</li><li>REST APIs</li></ul>
          <a className="link-arrow" href="#contact" data-uc-plan="Invoice-to-approval flow">Plan this with us
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
        <div className="hud uc-panel" role="tabpanel" id="uc-p3" aria-labelledby="uc-t3" data-uc-panel="" data-n1="Web chat & messaging" data-s1="Questions and order updates" data-n2="AI assistant" data-s2="Knowledge-base search, guardrails" data-n3="CRM & human handover" data-s3="Tickets created with context" hidden>
          <span className="uc-k">Example 03 · Customer support</span>
          <h3>AI support assistant</h3>
          <div className="uc-row"><span className="uc-l">The problem</span><p>Agents answer the same questions all day and customers wait for simple updates.</p></div>
          <div className="uc-row"><span className="uc-l">What we build</span><p>A chatbot grounded in your knowledge base and order data, with a clean handover to a person when a conversation needs one.</p></div>
          <ul className="tags"><li>AI assistant</li><li>Knowledge-base search</li><li>Webhooks</li><li>CRM</li></ul>
          <a className="link-arrow" href="#contact" data-uc-plan="AI support assistant">Plan this with us
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
        <div className="hud uc-panel" role="tabpanel" id="uc-p4" aria-labelledby="uc-t4" data-uc-panel="" data-n1="Forms & sheets" data-s1="Gravity Forms, Google Sheets" data-n2="n8n workflow" data-s2="De-duplicate, enrich, route" data-n3="CRM + QuickBooks" data-s3="Customers, invoices, follow-ups" hidden>
          <span className="uc-k">Example 04 · Sales &amp; CRM</span>
          <h3>Lead-to-ledger sync</h3>
          <div className="uc-row"><span className="uc-l">The problem</span><p>Leads from forms, sheets and email live in different places, and billing details are typed in twice.</p></div>
          <div className="uc-row"><span className="uc-l">What we build</span><p>n8n workflows that capture Gravity Forms leads, de-duplicate them in your CRM and create QuickBooks customers and invoices.</p></div>
          <ul className="tags"><li>Gravity Forms</li><li>Google Sheets</li><li>n8n</li><li>QuickBooks</li></ul>
          <a className="link-arrow" href="#contact" data-uc-plan="Lead-to-ledger sync">Plan this with us
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
        <div className="hud uc-panel" role="tabpanel" id="uc-p5" aria-labelledby="uc-t5" data-uc-panel="" data-n1="Logs & scheduled jobs" data-s1="Linux servers and containers" data-n2="Alert rules & triage" data-s2="Context, severity, owner" data-n3="RCA & dashboards" data-s3="Database evidence, trends" hidden>
          <span className="uc-k">Example 05 · Production support</span>
          <h3>Incident triage &amp; reporting</h3>
          <div className="uc-row"><span className="uc-l">The problem</span><p>Production issues are spotted by users first, and root causes take long to trace across logs and databases.</p></div>
          <div className="uc-row"><span className="uc-l">What we build</span><p>Log and job monitoring on Linux, alerts that arrive with context, and root-cause reports backed by database evidence.</p></div>
          <ul className="tags"><li>Linux</li><li>Scheduled jobs</li><li>Oracle SQL</li><li>Tableau</li></ul>
          <a className="link-arrow" href="#contact" data-uc-plan="Incident triage & reporting">Plan this with us
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
      </div>
      <div className="hud pipe" aria-hidden="true">
        <div className="hud-bar"><span className="led"></span>Data flow<span className="sp">example</span></div>
        <div className="pipe-body">
          <div className="pnode" data-pnode=""><span className="pi"><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M4 9L13 4L22 9V17L13 22L4 17Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path><path d="M4 9L13 14L22 9M13 14V22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"></path></svg></span><span className="pt"><span className="pk">01 · Input</span><b data-pn="">Scheme &amp; switch files</b><span className="ps" data-ps="">Clearing, settlement, ATM/POS</span></span><span className="pstat">IN</span></div>
          <i className="plink"></i>
          <div className="pnode" data-pnode=""><span className="pi"><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="7" y="7" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"></rect><path d="M10 3V7M16 3V7M10 19V23M16 19V23M3 10H7M3 16H7M19 10H23M19 16H23" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path><circle cx="13" cy="13" r="2" fill="currentColor"></circle></svg></span><span className="pt"><span className="pk">02 · Process</span><b data-pn="">Validate &amp; match</b><span className="ps" data-ps="">XML/XSD checks, record matching</span></span><span className="pstat">RUN</span></div>
          <i className="plink"></i>
          <div className="pnode" data-pnode=""><span className="pi"><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><rect x="3" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"></rect><path d="M7 16V12M11 16V9M15 16V11M19 16V7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path></svg></span><span className="pt"><span className="pk">03 · Output</span><b data-pn="">Exceptions &amp; reports</b><span className="ps" data-ps="">Audit trail and dashboards</span></span><span className="pstat">OUT</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* STATEMENT / PARALLAX */}
</>;
}

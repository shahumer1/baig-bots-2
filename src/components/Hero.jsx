import { CircuitLines } from './CircuitLines.jsx';

export function Hero() {
  return <><section className="hero" id="top" data-hero="">
  <CircuitLines />
  <div className="wrap hero-grid">
    <div className="hero-copy">
      <p className="eyebrow" data-hero="eyebrow"><span className="dot"></span>Software · Automation · AI solutions</p>
      <h1 className="h-display" data-hero-h1="">We build the systems that <em className="kin">think</em>, connect and scale.</h1>
      <p className="lead" data-hero="lead">Baig Bots delivers practical software, integration and automation services across enterprise applications, payment technology, data and modern digital experiences.</p>
      <div className="hero-act" data-hero="cta">
        {/* Previous input CTA kept for a future version.
         <form class="cmd" data-cmd="" aria-label="Tell us what you want to automate">
          <label class="cmd-in">
            <span class="cmd-pfx" aria-hidden="true">&gt;<i>_</i></span>
            <span class="sr">What do you want to build or automate?</span>
            <input type="text" name="idea" autocomplete="off" placeholder="Reconcile settlement files automatically" data-cmd-input="">
          </label>
          <button class="btn btn-primary" type="submit" data-magnet="" data-press=""><span>Start a project</span>
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
         </form>
         */}
        <div className="hero-cta-card">
          <div className="hero-cta-copy"><span>Have a project in mind?</span><strong>Let's make it work.</strong></div>
          <a className="btn btn-primary" href="#contact" data-magnet="" data-press=""><span>Start a project</span>
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
        </div>
        <div className="hero-ideas" data-ideas="">
        <div className="cmd-sugg" aria-label="Project ideas by service">
          <button className="cs-k" type="button" data-ideas-toggle="" aria-expanded="false" aria-controls="hero-ideas-panel">Explore ideas <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
          <div className="cmd-sugg-viewport" data-sugg-slider="" role="region" aria-label="Service ideas. Scroll horizontally to see more." tabIndex="0">
            <div className="cmd-sugg-track">
              <button type="button" title="AI Solutions & Intelligent Agents" data-sugg="Build an AI support assistant that answers customer questions">AI support assistant</button>
              <button type="button" title="Business Process Automation" data-sugg="Route supplier invoices for approval automatically">Invoice approvals</button>
              <button type="button" title="Custom Software & SaaS" data-sugg="Build a custom operations portal for our team">Operations portal</button>
              <button type="button" title="APIs & System Integrations" data-sugg="Sync form leads to our CRM and QuickBooks">CRM + QuickBooks sync</button>
              <button type="button" title="Fintech & Payment Technology" data-sugg="Reconcile payment settlement files automatically">Payment reconciliation</button>
              <button type="button" title="Data Engineering & BI" data-sugg="Create a live dashboard for sales and operations data">Live BI dashboard</button>
              <button type="button" title="Cloud & Managed IT" data-sugg="Migrate our systems to a managed cloud environment">Cloud migration</button>
              <button type="button" title="Enterprise Support & Consulting" data-sugg="Monitor our enterprise systems and alert us before jobs fail">System monitoring</button>
              <button type="button" title="Web & Mobile Development" data-sugg="Build a mobile app for our customers">Customer mobile app</button>
              <button type="button" title="CRM & ERP Solutions" data-sugg="Set up a CRM workflow to manage leads and follow-ups">CRM lead workflow</button>
              <button type="button" title="UI/UX & Product Design" data-sugg="Design and prototype a better product experience">Product prototype</button>
              <button type="button" title="Branding & Graphic Design" data-sugg="Create a brand identity and design guidelines">Brand identity</button>
              <button type="button" title="Digital Marketing & SEO" data-sugg="Improve our search visibility and plan an SEO campaign">SEO growth plan</button>
              <button type="button" title="Video & Digital Content" data-sugg="Produce a short explainer video for our product">Product explainer video</button>
              <button type="button" title="AI Extensions & Emerging Tech" data-sugg="Add an AI voice assistant to our customer service workflow">AI voice assistant</button>
              <button type="button" title="Dedicated Development Teams" data-sugg="Provide a dedicated development team for ongoing product work">Dedicated dev team</button>
            </div>
          </div>
        </div>
        <div className="ideas-panel" id="hero-ideas-panel" data-ideas-panel="" hidden>
          <span className="ideas-panel-title">Choose an idea</span>
          <div className="ideas-grid" data-ideas-grid=""></div>
        </div>
        </div>
        <a className="link-arrow cmd-explore" href="#services">Explore services
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
      </div>
    </div>
    <div className="hero-stage" data-stage="">
      <canvas className="gl" data-gl="" aria-hidden="true"></canvas>
      <div className="chip c1" data-depth="22"><span className="pdot"></span>AI agent · Call,Chat</div>
      <div className="chip c2" data-depth="-16"><span className="pdot"></span>Custom Software &amp; SaaS</div>
      <div className="chip c3" data-depth="30"><span className="pdot"></span>Workflow · automated</div>
      <div className="chip c4" data-depth="38"><span className="pdot"></span>APIs &amp; System Integrations</div>
    </div>
  </div>
  <a className="cue" href="#services" aria-label="Scroll to services"><span>Scroll</span><i></i></a>
</section>

{/* MARQUEE */}
</>;
}

import { ProcessGrowth } from './ProcessGrowth.jsx';
export function Process() {
  return <><section className="sec" id="process">
  <div className="wrap proc-grid">
    <div className="proc-side">
      <p className="eyebrow"><span className="dot"></span>06 — Process</p>
      <h2 className="h2" data-split="">A clear path from requirement to live system.</h2>
      <p className="lead muted">No black boxes. You see the plan, the progress and the test results at every stage.</p>
      <a className="btn btn-primary" href="#contact" data-magnet="" data-press=""><span>Talk to us</span>
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
      <ProcessGrowth />
    </div>
    <div className="tl" data-tl="">
      <i className="tl-prog" data-tl-prog=""></i>
      <div className="step" data-step="">
        <span className="n">01</span>
        <h3>Discover</h3>
        <p>We start from business requirements: goals, systems, data and bottlenecks, and agree what a good result looks like.</p>
        <ul className="tags"><li>Requirements</li><li>Audit</li><li>Roadmap</li></ul>
      </div>
      <div className="step" data-step="">
        <span className="n">02</span>
        <h3>Architect</h3>
        <p>A practical architecture covering security, licensing, infrastructure and operations, signed off before the build.</p>
        <ul className="tags"><li>Architecture</li><li>Prototype</li><li>Security</li></ul>
      </div>
      <div className="step" data-step="">
        <span className="n">03</span>
        <h3>Build &amp; integrate</h3>
        <p>Short cycles with working demos. Software, APIs, automation and AI come together around your existing platforms.</p>
        <ul className="tags"><li>Software</li><li>APIs</li><li>Automation</li><li>AI</li></ul>
      </div>
      <div className="step" data-step="">
        <span className="n">04</span>
        <h3>Test, launch &amp; support</h3>
        <p>UAT and SIT, a careful deployment, then monitoring and ongoing support, or a clean handover to your team.</p>
        <ul className="tags"><li>UAT / SIT</li><li>Deploy</li><li>Support</li></ul>
      </div>
    </div>
  </div>
</section>

{/* ENGAGE */}
</>;
}

import { innerServices, innerServicePath } from './innerData.js';

export function Footer({ inner = false }) {
  return <><footer className="foot on-dark dark">
  <div className="wrap">
    <div className="foot-grid">
      <div className="about">
        <a className="brand" href="/" aria-label="Baig Bots — home">
          <span className="blg" aria-hidden="true"><i className="lg-s"></i><i className="lg-ss"></i><i className="lg-r"></i><i className="lg-rs"></i><i className="lg-sh"></i></span>
          <span className="brand-txt"><b>Baig Bots</b><i>Digital Solutions</i></span>
        </a>
        <p>Software, automation and AI solutions, from enterprise integrations and payment technology to modern digital experiences.</p>
        <p className="foot-tag">People <b>+</b> Automation <b>+</b> A brighter tomorrow</p>
        <form className="news" data-news="" noValidate>
          <label className="news-l" htmlFor="news-email">Occasional notes on automation, integrations and AI</label>
          <div className="news-row"><input id="news-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" /><button type="submit" aria-label="Check email"><svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button></div>
          <span className="news-msg" data-news-msg="" aria-live="polite"></span>
        </form>
      </div>
      <div>
        <h4>Core services</h4>
        <ul>
          {inner ? innerServices.map((service) => <li key={service.slug}><a href={innerServicePath(service)}>{service.title}</a></li>) : <>
          <li><a href="/services/ai-solutions-intelligent-agents">AI Solutions &amp; Agents</a></li>
          <li><a href="/services/business-process-automation">Business Process Automation</a></li>
          <li><a href="/services/custom-software-saas">Custom Software &amp; SaaS</a></li>
          <li><a href="/services/apis-system-integrations">APIs &amp; Integrations</a></li>
          <li><a href="/services/fintech-payment-technology">Fintech &amp; Payments</a></li>
          <li><a href="/services/data-engineering-bi">Data &amp; BI</a></li>
          </>}
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/industries">Industries</a></li>
          <li><a href="/#agents">AI &amp; automation</a></li>
          <li><a href="/#estimate">Savings estimator</a></li>
          <li><a href="/#process">Process</a></li>
          <li><a href="/#engage">Ways to work</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul>
          <li>baigbots.com</li>
          <li><a href="mailto:contact@baigbots.com">contact@baigbots.com</a></li>
          <li>NASTP · Suite No. 217</li>
        </ul>
      </div>
    </div>
    <div className="foot-bottom">
      <span>© 2026 Baig Bots. All rights reserved.</span>
      <a className="totop" href="#top">Back to top <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17V4M5 9L10 4L15 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></a>
    </div>
  </div>
</footer>
</>;
}

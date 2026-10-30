import { allServices } from './serviceData.js';
import { innerIndustries, innerServices } from './innerData.js';

export function Contact({ standalone = false, inner = false }) {
  const problemOptions = inner ? [...new Map([...innerServices, ...innerIndustries, ...allServices].map((item) => [item.title, item])).values()] : allServices;
  return <><section className="sec cta dark" id="contact" data-cta="">
  <svg className="cta-circuit" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <path className="t" d="M-10 120H180L220 160H420"></path>
    <path className="t" d="M-10 560H140L180 520H380V460"></path>
    <path className="t" d="M1450 90H1260L1220 130H1040"></path>
    <path className="t" d="M1450 600H1300L1260 560H1100V500"></path>
    <path className="pulse" pathLength="100" d="M-10 120H180L220 160H420"></path>
    <path className="pulse" pathLength="100" d="M-10 560H140L180 520H380V460"></path>
    <path className="pulse" pathLength="100" d="M1450 90H1260L1220 130H1040"></path>
    <path className="pulse" pathLength="100" d="M1450 600H1300L1260 560H1100V500"></path>
    <circle className="n" cx="420" cy="160" r="5"></circle>
    <circle className="n" cx="380" cy="460" r="5"></circle>
    <circle className="n" cx="1040" cy="130" r="5"></circle>
    <circle className="n" cx="1100" cy="500" r="5"></circle>
  </svg>
  <div className="wrap">
    <p className="eyebrow"><span className="dot"></span>09 — Automate today, a smarter tomorrow</p>
    {standalone ? <h1 data-cta-h="">Let's build<br />what's next.</h1> : <h2 data-cta-h="">Let's build<br />what's next.</h2>}
    <div className="contact-grid">
      <div className="contact-forms">
        <form className="brief quick-brief" data-quick-brief="" aria-labelledby="quick-title">
          <i className="brief-edge" aria-hidden="true"></i>
          <div className="brief-top"><span className="led" aria-hidden="true"></span><span>Quick enquiry</span><span className="bt-step">One step</span></div>
          <div className="quick-body">
            <h3 id="quick-title">Tell us the problem. We'll take it from there.</h3>
            <p>Just the essentials to get started.</p>
            <div className="fld"><span className="lb" id="quick-problem-label">Problem / service / model</span><span className="ctl selw"><select name="problem" required aria-labelledby="quick-problem-label"><option value="">Choose a problem or service</option><option value="Not sure yet">Not sure yet</option>{problemOptions.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}</select><svg className="chev" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5L7 9L11 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg><i className="ul"></i></span></div>
            <div className="quick-contact-row">
              <label className="fld"><span className="lb">Email</span><span className="ctl"><input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /><i className="ul"></i></span></label>
              <label className="fld"><span className="lb">Phone number</span><span className="ctl"><input type="tel" name="phone" autoComplete="tel" placeholder="Your number" required /><i className="ul"></i></span></label>
            </div>
            <label className="fld"><span className="lb">Description</span><span className="ctl"><textarea name="description" rows="5" maxLength="1200" placeholder="A few lines about what's happening or what you need" required></textarea><i className="ul"></i></span></label>
            <p className="quick-status" data-quick-status="" role="status" aria-live="polite"></p>
            <button className="bbtn quick-submit" type="submit">Preview enquiry</button>
            <small className="quick-demo-note">Frontend preview only — nothing is sent yet.</small>
          </div>
        </form>
      {/* Project brief retained for later use.
       <form class="brief" data-brief="" novalidate="" aria-labelledby="brief-title">
        <i class="brief-edge" aria-hidden="true"></i>
        <div class="brief-top"><span class="led" aria-hidden="true"></span><span id="brief-title">Project brief</span><span class="bt-step" data-bstep-label="" aria-live="polite">Step 01 / 03</span></div>
        <ol class="brief-prog" data-bprog="" aria-hidden="true"><li class="on"><b>01</b>Scope</li><li><b>02</b>Details</li><li><b>03</b>Contact</li></ol>
        <p class="brief-note" data-bnote="" aria-live="polite"></p>
          <fieldset class="bstep is-on" data-bstep="">
          <legend>What do you need help with?</legend>
          <div class="bq">
            <span class="bql">Areas <i>pick one or more</i></span>
            <div class="chips">
              <label class="chip-t"><input type="checkbox" name="services" value="AI &amp; agents"><span>AI &amp; agents</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Process automation"><span>Process automation</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Custom software &amp; SaaS"><span>Custom software &amp; SaaS</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="APIs &amp; integrations"><span>APIs &amp; integrations</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Fintech &amp; payments"><span>Fintech &amp; payments</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Data &amp; BI"><span>Data &amp; BI</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Cloud &amp; managed IT"><span>Cloud &amp; managed IT</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Support &amp; consulting"><span>Support &amp; consulting</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Web &amp; mobile"><span>Web &amp; mobile</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Design &amp; branding"><span>Design &amp; branding</span></label>
              <label class="chip-t"><input type="checkbox" name="services" value="Marketing &amp; content"><span>Marketing &amp; content</span></label>
            </div>
            <span class="em" data-err="services" aria-live="polite"></span>
          </div>
          <div class="bq">
            <span class="bql">How would you like to work? <i>optional</i></span>
            <div class="opts">
              <label class="opt"><input type="radio" name="engagement" value="Fixed-scope project"><span><b>Fixed scope</b><i>A defined build</i></span></label>
              <label class="opt"><input type="radio" name="engagement" value="Discovery &amp; prototyping"><span><b>Discovery</b><i>Prototype first</i></span></label>
              <label class="opt"><input type="radio" name="engagement" value="Integrations &amp; modernisation"><span><b>Integration</b><i>Modernise systems</i></span></label>
              <label class="opt"><input type="radio" name="engagement" value="Retainer support"><span><b>Retainer</b><i>Ongoing support</i></span></label>
              <label class="opt"><input type="radio" name="engagement" value="Dedicated technical resources"><span><b>Dedicated team</b><i>Extend your team</i></span></label>
              <label class="opt"><input type="radio" name="engagement" value="Not sure yet"><span><b>Not sure yet</b><i>Help me choose</i></span></label>
            </div>
          </div>
        </fieldset>
          <fieldset class="bstep" data-bstep="">
          <legend>Tell us about the project</legend>
          <label class="fld"><span class="lb">Project details <i data-count-chars="">0 / 1200</i></span><span class="ctl"><textarea name="details" rows="5" placeholder="What do you want to build, automate or connect? Which systems are involved?"></textarea><i class="ul"></i></span><span class="em" aria-live="polite"></span></label>
          <div class="bq"><span class="bql">Timeline</span><div class="seg"><label><input type="radio" name="timeline" value="As soon as possible"><span>As soon as possible</span></label><label><input type="radio" name="timeline" value="1–3 months"><span>1–3 months</span></label><label><input type="radio" name="timeline" value="3–6 months"><span>3–6 months</span></label><label><input type="radio" name="timeline" value="Just exploring"><span>Just exploring</span></label></div></div>
          <div class="row2">
            <label class="fld"><span class="lb">Budget range <i>optional</i></span><span class="ctl selw"><select name="budget"><option>Not sure yet</option><option>Under $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k and above</option></select><svg class="chev" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5L7 9L11 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg><i class="ul"></i></span></label>
            <div class="fld"><span class="lb">Attachments <i>optional</i></span><label class="drop"><input type="file" name="files" multiple=""><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M13 17V5M8 10L13 5L18 10M5 17V21H21V17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="drop-t">Drop a spec or brief, or <u>browse</u></span><span class="drop-f" data-files="">PDF, DOCX, XLSX or images</span></label></div>
          </div>
        </fieldset>
          <fieldset class="bstep" data-bstep="">
          <legend>How do we reach you?</legend>
          <div class="row2">
            <label class="fld"><span class="lb">Full name <i>required</i></span><span class="ctl"><input type="text" name="name" autocomplete="name" placeholder="Your name"><i class="ul"></i></span><span class="em" aria-live="polite"></span></label>
            <label class="fld"><span class="lb">Work email <i>required</i></span><span class="ctl"><input type="email" name="email" autocomplete="email" placeholder="you@company.com"><i class="ul"></i></span><span class="em" aria-live="polite"></span></label>
            <label class="fld"><span class="lb">Company <i>optional</i></span><span class="ctl"><input type="text" name="company" autocomplete="organization" placeholder="Company name"><i class="ul"></i></span></label>
            <label class="fld"><span class="lb">Phone <i>optional</i></span><span class="ctl"><input type="tel" name="phone" autocomplete="tel" placeholder="Phone number"><i class="ul"></i></span></label>
          </div>
          <div class="bq"><span class="bql">Preferred contact</span><div class="seg"><label><input type="radio" name="contactpref" value="Email" checked=""><span>Email</span></label><label><input type="radio" name="contactpref" value="Phone call"><span>Phone call</span></label><label><input type="radio" name="contactpref" value="WhatsApp"><span>WhatsApp</span></label></div></div>
          <label class="cons"><input type="checkbox" name="consent"><span class="box" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5L5.5 10.5L11.5 3.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span>I agree that Baig Bots may contact me about this enquiry.</span></label>
          <span class="em" data-err="consent" aria-live="polite"></span>
        </fieldset>
          <div class="bnav">
          <button class="bbtn ghost" type="button" data-bback="">Back</button>
          <span class="bnav-sp"></span>
          <button class="bbtn" type="button" data-bnext="" data-press="">Next step
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
          <button class="bbtn" type="submit" data-bsubmit="" data-press="">Send brief
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
        </div>
          <div class="brief-send" data-bsend="" aria-hidden="true"><div class="bs-in"><span class="bs-t" data-bsend-t="">Packaging brief</span><span class="bs-bar"><i data-bsend-bar=""></i></span></div></div>
          <div class="brief-done" data-done="" aria-live="polite">
          <svg class="done-ic" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" pathLength="1"></circle><path d="M20 33L28 41L45 23" pathLength="1"></path></svg>
          <h3>Brief received</h3>
          <p>Thanks. We'll read it and reply with a plan and a clear next step.</p>
          <dl class="sum">
            <div><dt>Reference</dt><dd data-sum="ref">BB-2026-0000</dd></div>
            <div><dt>Areas</dt><dd data-sum="services">—</dd></div>
            <div><dt>Model</dt><dd data-sum="engagement">—</dd></div>
            <div><dt>Timeline</dt><dd data-sum="timeline">—</dd></div>
            <div><dt>Contact by</dt><dd data-sum="contactpref">—</dd></div>
          </dl>
          <button class="bbtn ghost" type="button" data-breset="">Start another brief</button>
        </div>
       </form>
       */}
      </div>
      <div className="contact-side">
        <ul className="contact-list">
          <li><span className="cl-k">Phone</span><a href="tel:+923446612249">+92 344 6612249</a></li>
        </ul>
        {/* Contact details block retained for later use.
         <p class="lead">Tell us what you want to build, automate or connect. We'll reply with a plan and a clear next step.</p>
         <ul class="contact-list">
          <li><span class="cl-k">Email</span><span>[YOUR EMAIL]</span></li>
          <li><span class="cl-k">Phone</span><span>+92 344 6612249</span></li>
          <li><span class="cl-k">Web</span><span>baigbots.com</span></li>
          <li><span class="cl-k">Office</span><span>NASTP · Suite No. 217</span></li>
         </ul>
         */}
        <div className="next">
          <span className="next-t">What happens next</span>
          <ol>
            <li><span className="k">01</span><span><b>We read your enquiry</b>We come back with any questions.</span></li>
            <li><span className="k">02</span><span><b>Discovery call</b>We map requirements, systems and constraints.</span></li>
            <li><span className="k">03</span><span><b>A clear plan</b>You get the architecture, scope and next step.</span></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FOOTER */}
</>;
}

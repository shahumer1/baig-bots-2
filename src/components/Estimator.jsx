export function Estimator() {
  return <><section className="sec" id="estimate">
  <div className="wrap">
    <div className="sec-head">
      <p className="eyebrow"><span className="dot"></span>04 — Savings estimator</p>
      <h2 className="h2" data-split="">See how many hours automation could give back.</h2>
      <p className="lead muted">Set the sliders for one manual process. The maths is written out underneath, so you can check every number.</p>
    </div>
    <div className="est-grid" data-est="">
      <div className="hud est-ctrl">
        <div className="hud-bar"><span className="led"></span>Inputs<span className="sp">one process</span></div>
        <div className="est-in">
          <fieldset className="proc"><legend className="rl">Which process?</legend><div className="segl"><label><input type="radio" name="proc" defaultValue="Invoices" /><span>Invoices</span></label><label><input type="radio" name="proc" defaultValue="Reconciliation" defaultChecked /><span>Reconciliation</span></label><label><input type="radio" name="proc" defaultValue="Data entry" /><span>Data entry</span></label><label><input type="radio" name="proc" defaultValue="Reporting" /><span>Reporting</span></label><label><input type="radio" name="proc" defaultValue="Support queries" /><span>Support queries</span></label></div></fieldset>
          <label className="rng"><span className="rng-top"><span className="rl">People doing this work</span><output data-o="people">3</output></span><input type="range" name="people" min="1" max="50" step="1" /><span className="rng-scale"><span>1</span><span>50</span></span></label>
          <label className="rng"><span className="rng-top"><span className="rl">Hours each, per week</span><output data-o="hours">6 h</output></span><input type="range" name="hours" min="1" max="40" step="1" /><span className="rng-scale"><span>1 h</span><span>40 h</span></span></label>
          <label className="rng"><span className="rng-top"><span className="rl">Share that could be automated</span><output data-o="share">60%</output></span><input type="range" name="share" min="10" max="90" step="5" /><span className="rng-scale"><span>10%</span><span>90%</span></span></label>
          <div className="rate">
            <label className="fl2"><span className="rl">Hourly cost per person</span><input className="inp" type="number" name="rate" min="0" step="0.5" inputMode="decimal" placeholder="15" /></label>
            <label className="fl2"><span className="rl">Currency</span><span className="selw"><select className="inp" name="currency"><option>USD</option><option>PKR</option><option>AED</option><option>SAR</option><option>GBP</option><option>EUR</option></select><svg className="chev" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5L7 9L11 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></label>
          </div>
        </div>
      </div>
      <div className="hud est-out">
        <div className="hud-bar"><span className="led"></span>Estimate<span className="sp">per year</span></div>
        <div className="est-top">
          <div className="gauge"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-tick" cx="60" cy="60" r="44" pathLength="100"></circle><circle className="g-val" data-ring="" cx="60" cy="60" r="52" pathLength="100"></circle></svg><span className="g-c"><b data-o="ring">60%</b><i>automated</i></span></div>
          <div className="kpis">
            <div className="kpi"><span className="kl">Hours back per year</span><span className="kv" data-k="hours">518</span></div>
            <div className="kpi-row"><div className="kpi"><span className="kl">Cost saved per year</span><span className="kv sm" data-k="cost">$7,776</span></div><div className="kpi"><span className="kl">Full-time staff freed</span><span className="kv sm" data-k="fte">0.27</span></div></div>
          </div>
        </div>
        <div className="bars">
          <div className="bar-r"><span className="bl">Today</span><span className="bt"><i data-bar="before"></i></span><span className="bv" data-bv="before">864 h</span></div>
          <div className="bar-r"><span className="bl">With automation</span><span className="bt"><i data-bar="after"></i></span><span className="bv" data-bv="after">346 h</span></div>
        </div>
        <div className="calc" aria-live="polite">
          <span className="calc-t">Worked example</span>
          <div className="cl"><span data-w="1">3 people × 6 h/week × 48 weeks</span><b data-wv="1">= 864 h/year</b></div>
          <div className="cl"><span data-w="2">864 h × 60% automatable</span><b data-wv="2">= 518 h saved</b></div>
          <div className="cl"><span data-w="3">518 h × $15/h</span><b data-wv="3">= $7,776/year</b></div>
          <div className="cl"><span data-w="4">518 h ÷ 1,920 h per full-time person</span><b data-wv="4">= 0.27 FTE</b></div>
        </div>
        <div className="est-foot"><p>Assumes 48 working weeks and a 40-hour week. This is an estimate only: we confirm real numbers during discovery.</p><button className="btn btn-primary btn-sm" type="button" data-est-send="" data-magnet="" data-press=""><span>Ask about this estimate</span>
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10H16M11 5L16 10L11 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button></div>
      </div>
    </div>
  </div>
</section>

{/* STACK */}
</>;
}

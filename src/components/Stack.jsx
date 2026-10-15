export function Stack() {
  return <><section className="sec stackx" id="stack">
  <div className="wrap">
    <div className="sec-head">
      <p className="eyebrow"><span className="dot"></span>05 — Technology</p>
      <h2 className="h2" data-split="">The tools and standards behind the work.</h2>
      <p className="lead">Selected technologies across automation, data and integration, plus the platforms your business already runs on.</p>
    </div>
    <div className="stack-grid">
      <div className="cats">
        <div className="hud cat" data-tilt=""><div className="cat-h"><span className="ck">A</span>Automation<span className="cc">03</span></div><ul><li><span>Power Automate</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Dataverse</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>n8n</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li></ul></div>
        <div className="hud cat" data-tilt=""><div className="cat-h"><span className="ck">B</span>Data<span className="cc">04</span></div><ul><li><span>Oracle SQL / PLSQL</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>MongoDB</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Power BI</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Tableau</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li></ul></div>
        <div className="hud cat" data-tilt=""><div className="cat-h"><span className="ck">C</span>Integration<span className="cc">04</span></div><ul><li><span>REST</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>SOAP</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>XML / XSD</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Webhooks</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li></ul></div>
        <div className="hud cat" data-tilt=""><div className="cat-h"><span className="ck">D</span>Platforms<span className="cc">05</span></div><ul><li><span>SmartVista</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>QuickBooks</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Gravity Forms</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Google Sheets</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li><li><span>Linux</span><i className="sig" aria-hidden="true"><b></b><b></b><b></b></i></li></ul></div>
      </div>
      <figure className="term" data-term="">
        <figcaption className="term-bar"><span className="tb-d"><i></i><i></i><i></i></span><span>bb-flow · invoice-sync</span><span className="sp">sample run</span></figcaption>
        <div className="term-body">
          <div className="tln cmdl" data-tline=""><span className="tp">$</span><span className="tc">bb-flow run invoice-sync --env=prod</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">connect</span><span className="tv">shared inbox</span><span className="ts ok">ok</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">fetch</span><span className="tv">12 new documents</span><span className="ts">0.4s</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">ai.extract</span><span className="tv">fields validated</span><span className="ts ok">12/12</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">erp.api</span><span className="tv">POST /po/match</span><span className="ts ok">200</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">approvals</span><span className="tv">exceptions routed to finance</span><span className="ts warn">2</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">powerbi</span><span className="tv">dataset refreshed</span><span className="ts ok">ok</span></div>
          <div className="tln done" data-tline=""><span className="tp">✓</span><span className="tk">done</span><span className="tv">run completed</span><span className="ts ok">3.1s</span></div>
          <div className="tln cmdl gap" data-tline=""><span className="tp">$</span><span className="tc">bb-flow run settlement-recon --date=today</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">fetch</span><span className="tv">scheme and switch files</span><span className="ts">3</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">validate</span><span className="tv">xml/xsd schema</span><span className="ts ok">ok</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">match</span><span className="tv">records against core</span><span className="ts ok">48,212</span></div>
          <div className="tln" data-tline=""><span className="tp">›</span><span className="tk">exceptions</span><span className="tv">queued for review</span><span className="ts warn">17</span></div>
          <div className="tln done" data-tline=""><span className="tp">✓</span><span className="tk">done</span><span className="tv">reconciliation report</span><span className="ts ok">ready</span></div>
          <div className="tln cmdl"><span className="tp">$</span><span className="caret" data-caret=""></span></div>
        </div>
        <div className="term-foot"><span>Illustrative output</span><span>not live data</span></div>
      </figure>
    </div>
  </div>
</section>

{/* PROCESS */}
</>;
}

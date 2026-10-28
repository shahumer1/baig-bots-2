import { useEffect, useId, useRef, useState } from 'react';

const TASK_OPTIONS = ['Invoices', 'Reconciliation', 'Data entry', 'Reporting', 'Support queries'];
const CURRENCY_OPTIONS = ['USD', 'PKR', 'AED', 'SAR', 'GBP', 'EUR'];

function EstimatorDropdown({ name, label, options, initialValue }) {
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const selectRef = useRef(null);
  const optionRefs = useRef([]);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    optionRefs.current[options.indexOf(value)]?.focus();
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open, options, value]);

  const choose = (next) => {
    setValue(next);
    setOpen(false);
    if (selectRef.current) {
      selectRef.current.value = next;
      selectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
    triggerRef.current?.focus();
  };

  const onOptionKeyDown = (event, index) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
      optionRefs.current[next]?.focus();
    }
  };

  return <div className={`est-select est-select-${name}`} ref={rootRef}>
    <select ref={selectRef} className="est-native-select" name={name} defaultValue={initialValue} tabIndex={-1} aria-hidden="true">
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
    <button ref={triggerRef} className="est-select-trigger" type="button" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape') setOpen(false);
    }}>
      <span>{value}</span>
      <svg className="est-select-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    {open && <div className="est-select-menu" id={listId} role="listbox" aria-label={label}>
      {options.map((option, index) => <button key={option} ref={(element) => { optionRefs.current[index] = element; }} className="est-select-option" type="button" role="option" aria-selected={value === option} onClick={() => choose(option)} onKeyDown={(event) => onOptionKeyDown(event, index)}>{option}</button>)}
    </div>}
  </div>;
}

export function Estimator() {
  return <section className="sec" id="estimate">
    <div className="wrap">
      <div className="sec-head">
        <p className="eyebrow"><span className="dot"></span>04 — Savings estimator</p>
        <h2 className="h2" data-split="">See how much time automation could save.</h2>
        <p className="lead muted">Choose a task and adjust the numbers. Your estimate updates instantly.</p>
      </div>
      <div className="hud est-grid" data-est="">
        <div className="hud-bar"><span className="led"></span>Your estimate<span className="sp">Updates live</span></div>

        <div className="est-out">
          <div className="est-rings" aria-label="Live automation estimate">
            <div className="est-metric" role="group" aria-label="Automatable work">
              <div className="est-metric-donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-val" data-ring="share" cx="60" cy="60" r="52" pathLength="100"></circle></svg><div className="est-metric-center"><strong data-o="ring">60%</strong><span>Automatable</span></div></div>
            </div>
            <div className="est-metric" role="group" aria-label="Hours back per year">
              <div className="est-metric-donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-val" data-ring="saved" cx="60" cy="60" r="52" pathLength="100"></circle></svg><div className="est-metric-center"><strong data-k="hours">518</strong><span>Hours back / year</span></div></div>
            </div>
            <div className="est-metric" role="group" aria-label="Cost saved per year">
              <div className="est-metric-donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-val" data-ring="cost" cx="60" cy="60" r="52" pathLength="100"></circle></svg><div className="est-metric-center"><strong data-k="cost">$7,776</strong><span>Cost saved / year</span></div></div>
            </div>
            <div className="est-metric" role="group" aria-label="Hours today">
              <div className="est-metric-donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-val" data-ring="today" cx="60" cy="60" r="52" pathLength="100"></circle></svg><div className="est-metric-center"><strong data-bv="before">864 h</strong><span>Today</span></div></div>
            </div>
            <div className="est-metric" role="group" aria-label="Hours after automation">
              <div className="est-metric-donut"><svg viewBox="0 0 120 120" aria-hidden="true"><circle className="g-track" cx="60" cy="60" r="52" pathLength="100"></circle><circle className="g-val" data-ring="after" cx="60" cy="60" r="52" pathLength="100"></circle></svg><div className="est-metric-center"><strong data-bv="after">346 h</strong><span>After automation</span></div></div>
            </div>
          </div>
        </div>

        <div className="est-ctrl">
          <p className="est-controls-title">Adjust your values</p>
          <div className="est-in">
            <div className="fl2 est-process"><span className="rl">What task should we automate?</span><EstimatorDropdown name="proc" label="What task should we automate?" options={TASK_OPTIONS} initialValue="Reconciliation" /></div>
            <label className="rng"><span className="rng-top"><span className="rl">People doing this task</span><output data-o="people">3</output></span><input type="range" name="people" min="1" max="50" step="1" /><span className="rng-scale"><span>1 person</span><span>50 people</span></span></label>
            <label className="rng"><span className="rng-top"><span className="rl">Hours per person each week</span><output data-o="hours">6 h</output></span><input type="range" name="hours" min="1" max="40" step="1" /><span className="rng-scale"><span>1 hour</span><span>40 hours</span></span></label>
            <label className="rng"><span className="rng-top"><span className="rl">How much could be automated?</span><output data-o="share">60%</output></span><input type="range" name="share" min="10" max="90" step="5" /><span className="rng-scale"><span>10%</span><span>90%</span></span></label>
            <div className="rate">
              <label className="fl2"><span className="rl">Hourly cost</span><input className="inp" type="number" name="rate" min="0" step="0.5" inputMode="decimal" placeholder="15" /></label>
              <div className="fl2"><span className="rl">Currency</span><EstimatorDropdown name="currency" label="Currency" options={CURRENCY_OPTIONS} initialValue="USD" /></div>
            </div>
          </div>
        </div>

        <details className="calc-details">
          <summary>How is this calculated?</summary>
          <div className="calc">
            <div className="cl"><span data-w="1">3 people × 6 h/week × 48 weeks</span><b data-wv="1">= 864 h/year</b></div>
            <div className="cl"><span data-w="2">864 h × 60% automatable</span><b data-wv="2">= 518 h saved</b></div>
            <div className="cl"><span data-w="3">518 h × $15/h</span><b data-wv="3">= $7,776/year</b></div>
            <div className="cl"><span data-w="4">518 h ÷ 1,920 h per full-time person</span><b data-wv="4">= 0.27 FTE</b></div>
            <div className="est-fte"><span>Full-time equivalent</span><strong data-k="fte">0.27</strong></div>
          </div>
        </details>
        <div className="est-foot"><p>Illustrative estimate based on 48 working weeks. We confirm real numbers during discovery.</p><button className="btn btn-primary btn-sm" type="button" data-est-send="" data-magnet="" data-press=""><span>Ask about this estimate</span></button></div>
      </div>
    </div>
  </section>;
}

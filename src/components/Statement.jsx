import { useEffect, useRef } from 'react';

const statementPlain = 'Every engagement starts with your business requirements, a practical architecture and ';
const statementAccent = 'clear, testable outcomes.';

function typedWords(value) {
  return value.split(/(\s+)/).map((part, index) => /\s/.test(part)
    ? part
    : <span className="stmt-type-word" key={index}>{Array.from(part, (letter, letterIndex) => <span className="stmt-type-char" key={letterIndex}>{letter}</span>)}</span>);
}

export function Statement() {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    const letters = Array.from(text.querySelectorAll('.stmt-type-char'));
    text.dataset.typingReady = '';
    let timer;
    let index = 0;
    const typeNext = () => {
      if (index) letters[index - 1].classList.remove('is-cursor');
      if (index >= letters.length) return;
      const letter = letters[index++];
      letter.classList.add('is-typed', 'is-cursor');
      timer = window.setTimeout(typeNext, /[,.;]/.test(letter.textContent) ? 160 : 33);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      typeNext();
    }, { threshold: 0.25 });
    observer.observe(text);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      delete text.dataset.typingReady;
      letters.forEach((letter) => letter.classList.remove('is-typed', 'is-cursor'));
    };
  }, []);

  return <><section className="sec stmt dark" data-stmt="">
  <div className="px" data-px="-5" aria-hidden="true">
    <svg className="l1" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="t" d="M0 150H300L340 190H640L680 150H1000L1040 190H1440"></path>
      <path className="t" d="M0 450H200L240 410H560L600 450H900"></path>
      <path className="t" d="M520 900V760L560 720H980L1020 760V900"></path>
      <path className="t" d="M1440 520H1180L1140 560H900"></path>
    </svg>
  </div>
  <div className="px" data-px="-14" aria-hidden="true">
    <svg className="l2" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="t" d="M120 0V120L160 160H420"></path>
      <path className="t" d="M1320 0V200L1280 240H1040"></path>
      <path className="t" d="M0 700H260L300 740H620"></path>
      <path className="t" d="M1440 780H1180L1140 740H980"></path>
      <path className="t" d="M700 300H840L880 340H1100"></path>
      <circle className="n" cx="420" cy="160" r="6"></circle>
      <circle className="n" cx="1040" cy="240" r="6"></circle>
      <circle className="n" cx="620" cy="740" r="6"></circle>
      <circle className="n" cx="980" cy="740" r="6"></circle>
      <circle className="n" cx="1100" cy="340" r="6"></circle>
    </svg>
  </div>
  <div className="px" data-px="-28" aria-hidden="true">
    <svg className="l3" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="t" d="M200 260H420L460 300H640"></path>
      <path className="t" d="M900 620H1100L1140 580H1320"></path>
      <path className="t" d="M60 520V640L100 680H300"></path>
      <circle className="n" cx="640" cy="300" r="5"></circle>
      <circle className="n" cx="1320" cy="580" r="5"></circle>
      <circle className="n" cx="300" cy="680" r="5"></circle>
    </svg>
  </div>
  <div className="wrap">
    <p className="eyebrow" style={{
          color: "var(--m300)",
          marginBottom: "28px"
        }}><span className="dot" style={{
            background: "var(--m300)"
          }}></span>Our approach</p>
    <p className="stmt-text" data-stmt-text="" ref={textRef} aria-label={statementPlain + statementAccent}><span aria-hidden="true">{typedWords(statementPlain)}</span><em aria-hidden="true">{typedWords(statementAccent)}</em></p>
    <div className="principles">
      <div className="principle" data-pr=""><span className="pn">A</span><h3>Integrity end to end</h3><p>We connect processes and platforms while keeping data integrity and operational traceability intact.</p></div>
      <div className="principle" data-pr=""><span className="pn">B</span><h3>Evidence, not guesswork</h3><p>Integration and payment issues are traced with logs, database evidence and reproducible tests.</p></div>
      <div className="principle" data-pr=""><span className="pn">C</span><h3>Findings in plain language</h3><p>Technical results become practical recommendations, clear tasks and stakeholder updates.</p></div>
      <div className="principle" data-pr=""><span className="pn">D</span><h3>A delivery model that flexes</h3><p>Fixed scope, retainer or a dedicated team. The model fits the work, not the other way round.</p></div>
    </div>
  </div>
</section>

{/* AGENTS */}
</>;
}

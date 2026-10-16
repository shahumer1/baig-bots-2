import { useEffect, useRef, useState } from 'react';

export function RobotWorkstation() {
  const sceneRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !('IntersectionObserver' in window)) {
      setIsActive(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsActive(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return <div ref={sceneRef} className={`inner-hero-scene inner-scene-workstation${isActive ? ' is-active' : ''}`}>
    <div className="inner-scene-head"><span className="inner-scene-led"/><span>CUSTOM SOFTWARE / AI AT WORK</span><span className="inner-scene-note">IDEA → PRODUCT</span></div>
    <div className="workstation-art" role="img" aria-label="Animated AI robot rising from a laptop screen, blinking and surrounded by chat icons">
      <svg viewBox="0 0 520 390" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="workstation-shell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffffff"/><stop offset=".46" stopColor="#e7e9ea"/><stop offset="1" stopColor="#9ca4a7"/></linearGradient>
          <linearGradient id="workstation-shell-side" x1="0" y1="0" x2="1" y2=".7"><stop stopColor="#889397"/><stop offset="1" stopColor="#dee2e3"/></linearGradient>
          <linearGradient id="workstation-visor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#50575c"/><stop offset=".36" stopColor="#1c2024"/><stop offset="1" stopColor="#07090b"/></linearGradient>
          <linearGradient id="workstation-screen" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--accent)"/><stop offset="1" stopColor="#28080d"/></linearGradient>
          <linearGradient id="workstation-tablet-edge" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f7f8f8"/><stop offset="1" stopColor="#91999d"/></linearGradient>
          <radialGradient id="workstation-aura"><stop stopColor="var(--ring)"/><stop offset="1" stopColor="transparent"/></radialGradient>
        </defs>

        <ellipse className="workstation-aura" cx="260" cy="230" rx="205" ry="155" fill="url(#workstation-aura)"/>
        <path className="workstation-circuit" d="M23 125h51l24 24h35M497 150h-49l-24 24h-30M35 260h49l26-26h21M485 257h-51l-25-25h-27"/>
        <circle className="workstation-circuit-dot" cx="23" cy="125" r="3"/><circle className="workstation-circuit-dot" cx="497" cy="150" r="3"/>

        <g className="workstation-chat-icon workstation-chat-icon-left">
          <path d="M49 73q0-16 17-16h35q16 0 16 16v13q0 16-16 16H82l-12 11-1-11h-3q-17 0-17-16Z"/>
          <circle cx="70" cy="80" r="3"/><circle cx="83" cy="80" r="3"/><circle cx="96" cy="80" r="3"/>
        </g>
        <g className="workstation-chat-icon workstation-chat-icon-right">
          <path d="M401 54q0-16 17-16h39q17 0 17 16v25q0 16-17 16h-12l-12 11-1-11h-14q-17 0-17-16Z"/>
          <path className="workstation-chat-line" d="M414 57h46m-46 10h46m-46 10h32"/>
        </g>
        <g className="workstation-chat-icon workstation-chat-icon-small">
          <path d="M431 176q0-12 13-12h22q13 0 13 12v9q0 12-13 12h-9l-9 8v-8h-4q-13 0-13-12Z"/>
          <circle cx="446" cy="181" r="2.4"/><circle cx="455" cy="181" r="2.4"/><circle cx="464" cy="181" r="2.4"/>
        </g>

        <ellipse className="workstation-platform-shadow" cx="260" cy="356" rx="202" ry="15"/>
        <ellipse className="workstation-platform-ring ring-one" cx="260" cy="335" rx="222" ry="31"/>
        <ellipse className="workstation-platform-ring ring-two" cx="260" cy="335" rx="193" ry="24"/>
        <path className="workstation-platform-back" d="M101 294h318l44 36H57Z"/>
        <path className="workstation-platform-screen" d="M119 300h282l36 24H83Z"/>
        <path className="workstation-platform-grid" d="M130 309h260m-240 7h220m-160-12-18 19m122-19 18 19"/>
        <ellipse className="workstation-platform-light" cx="260" cy="316" rx="95" ry="13"/>

        <g className="workstation-robot"><g className="workstation-robot-float">
          <g className="workstation-robot-arm workstation-robot-arm-left">
            <path className="workstation-arm-shadow" d="M216 229q-26-8-40 10l-33 8-19-28"/>
            <path className="workstation-arm-shell" d="M216 224q-26-8-39 10l-34 6-19-27"/>
            <circle className="workstation-joint" cx="177" cy="235" r="14"/><circle className="workstation-joint-center" cx="177" cy="235" r="6"/>
            <path className="workstation-palm" d="M112 192q9-7 19 0l4 22-11 10-14-8Z"/>
            <path className="workstation-fingers" d="m111 194-9-17m18 11-4-20m12 21 2-18m-21 28-14-7"/>
          </g>
          <g className="workstation-robot-arm workstation-robot-arm-right">
            <path className="workstation-arm-shadow" d="M306 229q26-8 40 10l33 8 19-28"/>
            <path className="workstation-arm-shell" d="M306 224q26-8 39 10l34 6 19-27"/>
            <circle className="workstation-joint" cx="345" cy="235" r="14"/><circle className="workstation-joint-center" cx="345" cy="235" r="6"/>
            <path className="workstation-palm" d="M410 192q-9-7-19 0l-4 22 11 10 14-8Z"/>
            <path className="workstation-fingers" d="m411 194 9-17m-18 11 4-20m-12 21-2-18m21 28 14-7"/>
          </g>

          <path className="workstation-neck-shadow" d="M220 183h81v36h-81Z"/>
          <path className="workstation-neck" d="M225 185h71v32h-71Z"/>
          <path className="workstation-neck-seam" d="M230 199h61m-58 9h56"/>
          <path className="workstation-body-shadow" d="M210 219q-15 3-17 22l-3 57q0 23 22 25h97q23-2 23-25l-3-57q-2-19-17-22Z"/>
          <path className="workstation-body" d="M211 214q-15 3-17 22l-3 57q0 23 22 25h94q23-2 23-25l-3-57q-2-19-17-22Z"/>
          <path className="workstation-body-shine" d="M208 226q-8 7-8 22v43"/>
          <path className="workstation-body-panel" d="M221 234h78l11 15-5 40h-89l-5-40Z"/>
          <path className="workstation-chest-slot" d="M244 250h32"/>
          <circle className="workstation-chest-led" cx="239" cy="294" r="2.5"/><circle className="workstation-chest-led" cx="260" cy="294" r="2.5"/><circle className="workstation-chest-led" cx="281" cy="294" r="2.5"/>
          <ellipse className="workstation-body-base" cx="260" cy="319" rx="47" ry="8"/>

          <path className="workstation-antenna" d="M220 100 207 59m107 41 13-41"/>
          <circle className="workstation-antenna-tip" cx="206" cy="56" r="5"/><circle className="workstation-antenna-tip" cx="328" cy="56" r="5"/>
          <ellipse className="workstation-ear-shadow" cx="171" cy="146" rx="18" ry="30"/><ellipse className="workstation-ear-shadow" cx="349" cy="146" rx="18" ry="30"/>
          <ellipse className="workstation-ear" cx="173" cy="145" rx="16" ry="28"/><ellipse className="workstation-ear" cx="347" cy="145" rx="16" ry="28"/>
          <ellipse className="workstation-ear-core" cx="173" cy="145" rx="7" ry="18"/><ellipse className="workstation-ear-core" cx="347" cy="145" rx="7" ry="18"/>
          <path className="workstation-head-shadow" d="M164 120q0-32 35-36h121q36 4 36 36v51q0 33-36 38H200q-36-5-36-38Z"/>
          <path className="workstation-head" d="M163 115q0-32 36-37h121q37 5 37 37v55q0 34-37 39H200q-37-5-37-39Z"/>
          <path className="workstation-head-shine" d="M178 114q2-18 24-22h111"/>
          <path className="workstation-visor" d="M183 117q0-17 20-19h114q20 2 20 19v50q0 18-20 20H203q-20-2-20-20Z"/>
          <path className="workstation-visor-gloss" d="M192 110q4-7 17-7h68l-61 79h-14q-11-1-11-16Z"/>
          <g className="workstation-eyes">
            <g className="workstation-eye"><circle className="workstation-eye-ring" cx="227" cy="145" r="17"/><circle className="workstation-eye-inner" cx="227" cy="145" r="7"/><circle className="workstation-eye-glint" cx="223" cy="141" r="2"/></g>
            <g className="workstation-eye"><circle className="workstation-eye-ring" cx="293" cy="145" r="17"/><circle className="workstation-eye-inner" cx="293" cy="145" r="7"/><circle className="workstation-eye-glint" cx="289" cy="141" r="2"/></g>
          </g>
          <path className="workstation-face-seam" d="M232 199h56"/>
        </g></g>

        <path className="workstation-platform-front" d="M57 330h406l-9 23H66Z"/>
        <path className="workstation-platform-lip" d="M69 338h382"/>
        <path className="workstation-platform-port" d="M119 343h48m183 0h38"/>
      </svg>
    </div>
  </div>;
}

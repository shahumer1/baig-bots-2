import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import * as Motion from 'motion';
import { applyTheme, getSavedTheme, saveTheme, themeColor } from './theme/theme.js';


export class BaigBotsSite {
  renderVals() { return {}; }

  componentDidMount() {
    this._disposed = false;
    this._cleanups = [];
    this._themeHooks = [];
    this.dark = false;
    this.ptr = { x: -9999, y: -9999, on: false };
    this._boot();
  }

  componentWillUnmount() {
    this._disposed = true;
    clearTimeout(this._bt);
    (this._cleanups || []).forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } });
    this._cleanups = [];
  }

  _boot() {

    try { this._init(); } catch (e) { console.error('[baig-bots] init failed', e); }
  }

  _safe(name, fn) {
    try { fn(); } catch (e) { console.error('[baig-bots] ' + name, e); }
  }

  _on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    this._cleanups.push(() => target.removeEventListener(type, fn, opts));
  }

  _findScroller(root) {
    let el = root.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 4) { return el; }
      el = el.parentElement;
    }
    return window;
  }

  _init() {
    const root = document.getElementById('bb');
    if (!root) { return; }
    this.root = root;
    const $ = (s, c) => (c || root).querySelector(s);
    const $$ = (s, c) => Array.from((c || root).querySelectorAll(s));
    const reduce = false;
    const fine = !!(window.matchMedia && window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches);
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin);
    this.scroller = this._findScroller(root);
    if (this.scroller !== window) { ScrollTrigger.defaults({ scroller: this.scroller }); }
    const ctx = { root, $, $$, reduce, fine };
    this.reduce = reduce;

    this._safe('theme', () => this._theme(ctx));
    this._safe('pointer', () => this._pointer(ctx));
    this._safe('nav', () => this._nav(ctx));
    this._safe('logo', () => this._logo(ctx));
    this._safe('progress', () => this._progress(ctx));
    this._safe('hero', () => this._hero(ctx));
    this._safe('three', () => this._hero3d(ctx));
    this._safe('headings', () => this._headings(ctx));
    this._safe('cards', () => this._cards(ctx));
    this._safe('statement', () => this._statement(ctx));
    this._safe('agents', () => this._agents(ctx));
    this._safe('process', () => this._process(ctx));
    this._safe('cta', () => this._cta(ctx));
    this._safe('micro', () => this._micro(ctx));
    this._safe('cmd', () => this._cmd(ctx));
    this._safe('stats', () => this._stats(ctx));
    this._safe('solutions', () => this._solutions(ctx));
    this._safe('estimator', () => this._estimator(ctx));
    // this._safe('stack', () => this._stack(ctx)); // Technology section is hidden on the home page.
    this._safe('engage', () => this._engage(ctx));
    this._safe('faq', () => this._faq(ctx));
    this._safe('quick', () => this._quick(ctx));
    this._safe('brief', () => this._brief(ctx));
    this._safe('news', () => this._news(ctx));

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(refresh); }
    this._on(window, 'load', refresh);
    this._cleanups.push(() => { ScrollTrigger.getAll().forEach((t) => t.kill()); });
  }

  /* ---------- manually selected theme ---------- */
  _theme({ $ }) {
    const toggle = $('[data-theme-toggle]');
    const update = (mode, persist = false) => {
      applyTheme(this.root, mode, (dark) => {
        this.dark = dark;
        this._themeHooks.forEach((fn) => { try { fn(dark); } catch (e) { console.error(e); } });
      });
      if (toggle) {
        toggle.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        toggle.setAttribute('aria-pressed', String(mode === 'dark'));
        toggle.title = mode === 'dark' ? 'Light theme' : 'Dark theme';
      }
      if (persist) { saveTheme(mode); }
    };
    update(getSavedTheme());
    if (toggle) { this._on(toggle, 'click', () => update(this.dark ? 'light' : 'dark', true)); }
  }

  /* ---------- pointer: cursor ring, flashlight grid, shared position ---------- */
  _pointer({ $, reduce }) {
    if (reduce) { return; }
    const ring = $('[data-cur-ring]');
    const dot = $('[data-cur-dot]');
    const rev = $('[data-reveal]');
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2' });
    let shown = false;
    const p = this.ptr;
    this._on(document, 'pointermove', (e) => {
      if (e.pointerType === 'touch') { return; }
      p.x = e.clientX;
      p.y = e.clientY;
      p.on = true;
      if (!shown) {
        shown = true;
        gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
        rev.style.opacity = '1';
      }
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      const t = e.target;
      const overSlider = !!(t && t.closest && t.closest('.marqs,[data-sugg-slider]'));
      rev.style.opacity = overSlider ? '0' : '1';
      if (!overSlider) {
        rev.style.setProperty('--cx', e.clientX + 'px');
        rev.style.setProperty('--cy', e.clientY + 'px');
      }
      if (t && t.closest) {
        ring.classList.toggle('hot', !!t.closest('a,button,[data-card],[data-stage],label,select,[role="tab"]'));
        ring.classList.toggle('txt', !!t.closest('input[type="text"],input[type="email"],input[type="tel"],input[type="number"],textarea'));
        rev.classList.toggle('on-dark', !!t.closest('.stmt,.cta,.marqs,.foot,.nav'));
      }
    });
    this._on(document.documentElement, 'pointerleave', () => {
      shown = false;
      p.on = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
      rev.style.opacity = '0';
    });
  }

  /* ---------- characters that react to the cursor ---------- */
  _proximity(getList, radius, setFn) {
    const tick = () => {
      const list = getList();
      const p = this.ptr;
      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        let k = 0;
        if (p.on) {
          const r = c.el.getBoundingClientRect();
          const d = Math.hypot(p.x - (r.left + r.width / 2), p.y - (r.top + r.height / 2));
          k = Math.max(0, 1 - d / radius);
        }
        c.k += (k - c.k) * 0.16;
        if (c.k < 0.003 && k === 0) {
          if (c.k !== 0) { c.k = 0; setFn(c, 0); }
          continue;
        }
        setFn(c, c.k);
      }
    };
    gsap.ticker.add(tick);
    this._cleanups.push(() => gsap.ticker.remove(tick));
  }

  /* ---------- navigation ---------- */
  _nav({ $, $$ }) {
    const nav = $('[data-nav]');
    const btn = $('[data-menu]');
    if (btn) {
      const closeMenu = () => {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      };
      this._on(btn, 'click', () => {
        const open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      $$('[data-panel] a').forEach((a) => this._on(a, 'click', closeMenu));
      this._on(document, 'pointerdown', (event) => {
        if (nav.classList.contains('open') && !nav.contains(event.target)) closeMenu();
      });
      this._on(document, 'keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu();
      });
    }
    ScrollTrigger.create({ start: 24, end: 'max', onUpdate: (self) => nav.classList.toggle('is-scrolled', self.scroll() > 24) });
    $$('[data-scr]').forEach((a) => {
      const txt = a.textContent;
      this._on(a, 'pointerenter', () => gsap.to(a, { duration: 0.55, scrambleText: { text: txt, chars: 'upperCase', speed: 0.9 }, overwrite: true }));
    });
  }

  /* ---------- logo: entrance, light sweep on hover, every few seconds and on theme change ---------- */
  _logo({ $$, reduce }) {
    const marks = $$('.blg');
    if (!marks.length || reduce) { return; }
    const sweep = (el, delay) => {
      const sh = el.querySelector('.lg-sh');
      if (!sh || gsap.isTweening(sh)) { return; }
      gsap.fromTo(sh, { backgroundPosition: '120% 0%', opacity: 1 }, { backgroundPosition: '-20% 0%', duration: 1.15, delay: delay || 0, ease: 'power2.inOut', onComplete: () => { gsap.set(sh, { opacity: 0 }); } });
    };
    gsap.from(marks[0], { scale: 0.55, opacity: 0, rotate: -8, duration: 1.1, ease: 'back.out(1.7)', delay: 0.1 });
    sweep(marks[0], 0.8);
    const iv = setInterval(() => sweep(marks[0], 0), 7000);
    this._cleanups.push(() => clearInterval(iv));
    marks.forEach((m) => {
      const br = m.closest('.brand');
      if (br) { this._on(br, 'pointerenter', () => sweep(m, 0)); }
    });
    this._themeHooks.push(() => { marks.forEach((m, i) => sweep(m, 0.2 + i * 0.1)); });
  }

  /* ---------- scroll progress (Motion) ---------- */
  _progress({ $ }) {
    const bar = $('[data-progress]');
    const opts = this.scroller !== window ? { container: this.scroller } : undefined;
    const stop = Motion.scroll((p) => { bar.style.transform = 'scaleX(' + p + ')'; }, opts);
    if (typeof stop === 'function') { this._cleanups.push(stop); }
  }

  /* ---------- shared circuit motion for the home and inner-page heroes ---------- */
  _animateCircuit(selector, { $$ }) {
    gsap.from($$(`${selector} .base`), { drawSVG: 0, duration: 2.2, ease: 'power2.inOut', stagger: 0.12, delay: 0.2 });
    gsap.from($$(`${selector} .node`), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)', stagger: 0.12, delay: 1.3 });
    gsap.fromTo($$(`${selector} .pulse`), { opacity: 0 }, { opacity: 0.9, duration: 0.6, delay: 2.2 });
    const pulses = $$(`${selector} .pulse`).map((path, index) =>
      gsap.fromTo(path, { strokeDashoffset: 0 }, { strokeDashoffset: -100, duration: 5 + index * 0.9, ease: 'none', repeat: -1, delay: 2 + index * 0.6 }));
    const circuit = this.root.querySelector(selector);
    if (circuit && pulses.length) {
      const observer = new IntersectionObserver(([entry]) => {
        pulses.forEach((tween) => entry.isIntersecting ? tween.resume() : tween.pause());
      });
      observer.observe(circuit);
      this._cleanups.push(() => { observer.disconnect(); pulses.forEach((tween) => tween.kill()); });
    }
  }

  /* ---------- hero: circuit draw, kinetic headline, entrance ---------- */
  _hero({ $, $$, reduce, fine }) {
    const h1 = $('[data-hero-h1]');
    if (!h1) { return; }
    this._heroChars = [];
    if (fine && !reduce) {
      this._proximity(() => this._heroChars, 150, (c, k) => { c.el.style.setProperty('--k', k.toFixed(3)); });
    }
    if (reduce) { return; }
    this._animateCircuit('.hero-circuit', { $$ });
    gsap.from('[data-hero="eyebrow"]', { y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
    gsap.from('[data-hero="lead"]', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.95 });
    gsap.from('[data-hero="cta"] > *', { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1, stagger: 0.1 });
    gsap.from('.hero-stage .chip', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(2)', delay: 1.4, stagger: 0.15 });
    gsap.delayedCall(2.4, () => h1.classList.add('is-ready'));

    let wave = null;
    SplitText.create(h1, {
      type: 'lines,words,chars',
      mask: 'lines',
      charsClass: 'ch',
      linesClass: 'ln',
      autoSplit: true,
      onSplit: (self) => {
        const kinChars = $$('.kin .ch', h1);
        const kin = $('.kin', h1);
        this._heroChars = self.chars.filter((el) => !el.closest('.kin')).map((el) => ({ el, k: 0 }));
        if (wave) { wave.kill(); wave = null; }
        if (kin && kinChars.length) {
          kin.style.display = 'inline-block';
          kin.style.width = '';
          gsap.set(kinChars, { '--w': 800, '--wd': 100 });
          kin.style.width = Math.ceil(kin.getBoundingClientRect().width) + 'px';
          gsap.set(kinChars, { '--w': 700, '--wd': 100 });
        }
        const intro = gsap.from(self.chars, { yPercent: 118, rotate: 5, opacity: 0, duration: 1.1, stagger: 0.02, ease: 'expo.out', delay: 0.3 });
        if (kinChars.length) {
          wave = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 2 });
          wave.to(kinChars, { '--w': 260, '--wd': 75, duration: 0.8, ease: 'sine.inOut', stagger: 0.1 })
              .to(kinChars, { '--w': 800, '--wd': 100, duration: 0.8, ease: 'sine.inOut', stagger: 0.1 }, '>-0.3')
              .to(kinChars, { '--w': 700, '--wd': 100, duration: 0.6, ease: 'sine.inOut', stagger: 0.06 }, '>-0.2');
        }
        return intro;
      }
    });
  }

  /* ---------- hero 3D: Three.js neural core, theme aware, click shockwave ---------- */
  _hero3d({ $, reduce }) {
    const stage = $('[data-stage]');
    const canvas = $('[data-gl]');
    if (!stage || !canvas) { return; }
    const hero = $('.hero');
    // The 3D scene belongs to the home page only. Keep Three.js out of every
    // service and industry route, and wait until the hero approaches the screen.
    const loadScene = () => import('three').then((T) => {
      if (!this._disposed && stage.isConnected) this._mountHero3d(stage, canvas, hero, reduce, T);
    }).catch(() => {
      if (!this._disposed && stage.isConnected) this._hero2d(stage, canvas, reduce);
    });
    if (!('IntersectionObserver' in window)) { loadScene(); return; }
    const loader = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      loader.disconnect();
      loadScene();
    }, { rootMargin: '250px' });
    loader.observe(stage);
    this._cleanups.push(() => loader.disconnect());
  }

  _mountHero3d(stage, canvas, hero, reduce, T) {
    let renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (e) {
      this._hero2d(stage, canvas, reduce);
      return;
    }
    renderer.setClearColor(themeColor('tone-000'), 0);
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(36, 1, 0.1, 100);
    const rig = new T.Group();
    const group = new T.Group();
    scene.add(rig);
    rig.add(group);
    scene.add(new T.AmbientLight(themeColor('scene-highlight'), 0.9));
    const key = new T.DirectionalLight(themeColor('scene-highlight'), 1.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new T.DirectionalLight(themeColor('scene-key'), 0.7);
    rim.position.set(-5, -2, -3);
    scene.add(rim);

    const edgeMat = new T.LineBasicMaterial({ color: themeColor('scene-edge') });
    const nodeMat = new T.MeshStandardMaterial({ color: themeColor('scene-node'), roughness: 0.4, metalness: 0.1 });
    const ringMat = new T.MeshBasicMaterial({ color: themeColor('scene-edge') });
    const satMat = new T.MeshStandardMaterial({ color: themeColor('scene-satellite'), roughness: 0.4 });
    const pMat = new T.MeshBasicMaterial({ color: themeColor('scene-satellite') });
    const coreMat = new T.MeshStandardMaterial({ color: themeColor('scene-node'), roughness: 0.35, metalness: 0.15, flatShading: true });
    const linkMat = new T.LineBasicMaterial({ color: themeColor('scene-node'), transparent: true, opacity: 0.22 });
    const shockMat = new T.MeshBasicMaterial({ color: themeColor('scene-node'), transparent: true, opacity: 0 });

    const latGeo = new T.IcosahedronGeometry(2.2, 1);
    const edgeGeo = new T.EdgesGeometry(latGeo);
    group.add(new T.LineSegments(edgeGeo, edgeMat));
    const pos = latGeo.attributes.position;
    const keyOf = (x, y, z) => x.toFixed(3) + '|' + y.toFixed(3) + '|' + z.toFixed(3);
    const seen = new Map();
    const nodes = [];
    for (let i = 0; i < pos.count; i++) {
      const v = new T.Vector3().fromBufferAttribute(pos, i);
      const k = keyOf(v.x, v.y, v.z);
      if (!seen.has(k)) { seen.set(k, nodes.length); nodes.push(v); }
    }
    const nodeMesh = new T.InstancedMesh(new T.SphereGeometry(0.085, 18, 18), nodeMat, nodes.length);
    const m4 = new T.Matrix4();
    const q = new T.Quaternion();
    nodes.forEach((v, i) => {
      const s = i % 5 === 0 ? 1.7 : 1;
      m4.compose(v, q, new T.Vector3(s, s, s));
      nodeMesh.setMatrixAt(i, m4);
    });
    group.add(nodeMesh);

    const ep = edgeGeo.attributes.position;
    const adj = nodes.map(() => []);
    for (let i = 0; i < ep.count; i += 2) {
      const a = seen.get(keyOf(ep.getX(i), ep.getY(i), ep.getZ(i)));
      const b = seen.get(keyOf(ep.getX(i + 1), ep.getY(i + 1), ep.getZ(i + 1)));
      if (a !== undefined && b !== undefined) { adj[a].push(b); adj[b].push(a); }
    }
    const packets = [];
    const pGeo = new T.SphereGeometry(0.06, 12, 12);
    for (let i = 0; i < 14; i++) {
      const mesh = new T.Mesh(pGeo, pMat);
      group.add(mesh);
      const a = Math.floor(Math.random() * nodes.length);
      const nb = adj[a].length ? adj[a] : [a];
      packets.push({ mesh, a, b: nb[Math.floor(Math.random() * nb.length)], t: Math.random(), sp: 0.35 + Math.random() * 0.5 });
    }

    const coreGeo = new T.IcosahedronGeometry(0.95, 1);
    const core = new T.Mesh(coreGeo, coreMat);
    core.add(new T.LineSegments(new T.EdgesGeometry(coreGeo), new T.LineBasicMaterial({ color: themeColor('scene-highlight'), transparent: true, opacity: 0.45 })));
    group.add(core);
    const linkPts = [];
    nodes.forEach((v, i) => { if (i % 3 === 0) { linkPts.push(0, 0, 0, v.x, v.y, v.z); } });
    const linkGeo = new T.BufferGeometry();
    linkGeo.setAttribute('position', new T.Float32BufferAttribute(linkPts, 3));
    group.add(new T.LineSegments(linkGeo, linkMat));

    const rings = [];
    [[2.8, [1.15, 0, 0.2], 0.5], [3.2, [0.4, 0.9, 0], -0.38], [3.6, [1.4, 0.3, 0.6], 0.27]].forEach((d) => {
      const tilt = new T.Group();
      tilt.rotation.set(d[1][0], d[1][1], d[1][2]);
      group.add(tilt);
      const spin = new T.Group();
      tilt.add(spin);
      spin.add(new T.Mesh(new T.TorusGeometry(d[0], 0.012, 8, 180), ringMat));
      const sat = new T.Mesh(new T.SphereGeometry(0.1, 16, 16), satMat);
      sat.position.set(d[0], 0, 0);
      spin.add(sat);
      rings.push({ spin, sp: d[2] });
    });

    const dotCv = document.createElement('canvas');
    dotCv.width = 64;
    dotCv.height = 64;
    const dctx = dotCv.getContext('2d');
    dctx.beginPath();
    dctx.arc(32, 32, 28, 0, Math.PI * 2);
    dctx.fillStyle = themeColor('scene-highlight');
    dctx.fill();
    const tex = new T.CanvasTexture(dotCv);
    const cloud = (n, rmin, rmax, size, color, op) => {
      const p = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const r = rmin + Math.random() * (rmax - rmin);
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        p[i * 3] = r * Math.sin(ph) * Math.cos(th);
        p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        p[i * 3 + 2] = r * Math.cos(ph);
      }
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.BufferAttribute(p, 3));
      return new T.Points(g, new T.PointsMaterial({ size, color, map: tex, transparent: true, opacity: op, depthWrite: false, sizeAttenuation: true }));
    };
    const dust = cloud(380, 4.4, 8.5, 0.07, themeColor('scene-dust'), 0.9);
    const sparks = cloud(46, 3.6, 6.5, 0.1, themeColor('scene-spark'), 0.95);
    scene.add(dust);
    scene.add(sparks);

    const shock = new T.Mesh(new T.TorusGeometry(1, 0.02, 8, 160), shockMat);
    shock.visible = false;
    scene.add(shock);
    let shockT = 1;
    let pulse = 0;

    const setTheme = (dark) => {
      const color = (name) => themeColor(`scene-${name}`);
      edgeMat.color.set(color('edge'));
      nodeMat.color.set(color('node'));
      ringMat.color.set(color('ring'));
      satMat.color.set(color('satellite'));
      pMat.color.set(color('packet'));
      dust.material.color.set(color('dust'));
      sparks.material.color.set(color('spark'));
      linkMat.color.set(color('link'));
      linkMat.opacity = Number(color('link-opacity'));
      coreMat.color.set(color('core'));
      shockMat.color.set(color('shock'));
      if (reduce) { renderer.render(scene, camera); }
    };
    setTheme(this.dark);
    this._themeHooks.push(setTheme);

    let baseZ = 10;
    const size = () => {
      const w = stage.clientWidth || 600;
      const h = stage.clientHeight || 520;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.matchMedia('(max-width: 767px)').matches ? 1.25 : 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseZ = w < 520 ? 15.5 : (w / h < 1 ? 14 : 12.8);
      camera.position.set(0, 0, baseZ);
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(() => { size(); if (reduce) { renderer.render(scene, camera); } });
    ro.observe(stage);

    const m = { x: 0, y: 0 };
    this._on(hero, 'pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      m.x = Math.max(-1.2, Math.min(1.2, ((e.clientX - r.left) / r.width - 0.5) * 2));
      m.y = Math.max(-1.2, Math.min(1.2, ((e.clientY - r.top) / r.height - 0.5) * 2));
    });
    this._on(hero, 'pointerleave', () => { m.x = 0; m.y = 0; });
    this._on(stage, 'pointerdown', () => { shockT = 0; pulse = 1; shock.visible = true; });

    let sp = 0;
    ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', scrub: true, onUpdate: (self) => { sp = self.progress; } });

    let visible = true;
    const chipQ = Array.from(stage.querySelectorAll('.chip')).map((c) => ({ d: parseFloat(c.getAttribute('data-depth')) || 0, x: gsap.quickTo(c, 'x', { duration: 0.8, ease: 'power3' }), y: gsap.quickTo(c, 'y', { duration: 0.8, ease: 'power3' }) }));
    const clock = new T.Clock();
    let spinY = 0;
    const frame = () => {
      if (!visible) { clock.getDelta(); return; }
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      pulse = Math.max(0, pulse - dt * 1.6);
      spinY += dt * (0.22 + pulse * 1.4);
      group.rotation.y += ((spinY + m.x * 0.7) - group.rotation.y) * 0.06;
      group.rotation.x += ((m.y * 0.35 + 0.15) - group.rotation.x) * 0.06;
      group.scale.setScalar(1 + pulse * 0.1);
      rig.position.y = -sp * 1.4;
      camera.position.z = baseZ + sp * 2.5;
      rings.forEach((r) => { r.spin.rotation.z += dt * r.sp * (2 + pulse * 6); });
      packets.forEach((p) => {
        p.t += dt * p.sp * (1 + pulse * 3);
        if (p.t >= 1) {
          p.t = 0;
          p.a = p.b;
          const nb = adj[p.a].length ? adj[p.a] : [p.a];
          p.b = nb[Math.floor(Math.random() * nb.length)];
        }
        p.mesh.position.lerpVectors(nodes[p.a], nodes[p.b], p.t);
      });
      if (shock.visible) {
        shockT += dt * 1.1;
        if (shockT >= 1) { shock.visible = false; }
        shock.scale.setScalar(0.6 + shockT * 6.5);
        shockMat.opacity = Math.max(0, 0.85 * (1 - shockT));
      }
      core.rotation.y = t * 0.4;
      core.rotation.x = t * 0.25;
      core.scale.setScalar(1 + Math.sin(t * 2.2) * 0.035 + pulse * 0.25);
      dust.rotation.y = t * 0.02;
      sparks.rotation.y = -t * 0.035;
      sparks.rotation.x = t * 0.015;
      chipQ.forEach((o) => { o.x(m.x * o.d); o.y(m.y * o.d); });
      renderer.render(scene, camera);
    };
    if (reduce) {
      group.rotation.set(0.2, 0.6, 0);
      renderer.render(scene, camera);
    } else {
      gsap.from(canvas, { opacity: 0, scale: 0.9, duration: 1.6, ease: 'power3.out', delay: 0.4 });
      gsap.ticker.add(frame);
    }
    const io = new IntersectionObserver(([entry]) => {
      const nextVisible = !!entry.isIntersecting && !document.hidden;
      if (nextVisible === visible) return;
      visible = nextVisible;
      if (reduce) return;
      if (visible) { clock.getDelta(); gsap.ticker.add(frame); }
      else gsap.ticker.remove(frame);
    });
    io.observe(stage);
    const onVisibility = () => {
      const nextVisible = !document.hidden && stage.getBoundingClientRect().bottom > 0 && stage.getBoundingClientRect().top < innerHeight;
      if (nextVisible === visible || reduce) return;
      visible = nextVisible;
      if (visible) { clock.getDelta(); gsap.ticker.add(frame); }
      else gsap.ticker.remove(frame);
    };
    document.addEventListener('visibilitychange', onVisibility);
    this._cleanups.push(() => {
      gsap.ticker.remove(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    });
  }

  /* Canvas fallback for browsers without a working WebGL context. */
  _hero2d(stage, canvas, reduce) {
    let ctx;
    try { ctx = canvas.getContext('2d'); } catch (e) { /* context unavailable */ }
    if (!ctx) { stage.classList.add('no-gl'); return; }
    let width = 0;
    let height = 0;
    let frameId = 0;
    let visible = true;
    let lastFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const points = Array.from({ length: 22 }, (_, i) => {
      const a = i * 2.39996;
      const z = 1 - 2 * (i + 0.5) / 22;
      const r = Math.sqrt(1 - z * z);
      return { x: Math.cos(a) * r, y: Math.sin(a) * r, z };
    });
    const resize = () => {
      width = stage.clientWidth || 600;
      height = stage.clientHeight || 520;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.3;
      const angle = (reduce ? 0.35 : time * 0.00022) + pointerX * 0.25;
      const pitch = 0.28 + pointerY * 0.2;
      const project = ({ x, y, z }) => {
        const rx = x * Math.cos(angle) - z * Math.sin(angle);
        const rz = x * Math.sin(angle) + z * Math.cos(angle);
        return { x: cx + rx * radius, y: cy + (y * Math.cos(pitch) - rz * Math.sin(pitch)) * radius, depth: rz };
      };
      const projected = points.map(project);
      const color = themeColor('scene-canvas-rgb');
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.35);
      halo.addColorStop(0, `rgba(${color},.16)`);
      halo.addColorStop(1, `rgba(${color},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      projected.forEach((a, i) => {
        projected.slice(i + 1).forEach((b) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > radius * 0.9) { return; }
          ctx.strokeStyle = `rgba(${color},${Math.max(0.06, 0.32 - distance / (radius * 4))})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
      });
      projected.forEach((p) => {
        ctx.fillStyle = `rgba(${color},${0.55 + (p.depth + 1) * 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 + (p.depth + 1) * 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 0.7);
      ctx.strokeStyle = `rgba(${color},.9)`;
      ctx.lineWidth = 2;
      for (const scale of [0.32, 0.44]) {
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
          const a = i * Math.PI / 3;
          const x = Math.cos(a) * radius * scale;
          const y = Math.sin(a) * radius * scale;
          if (i) { ctx.lineTo(x, y); } else { ctx.moveTo(x, y); }
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    const tick = (time) => {
      if (!visible || reduce) { frameId = 0; return; }
      if (time - lastFrame >= 1000 / 30) { draw(time); lastFrame = time; }
      frameId = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry.isIntersecting && !document.hidden;
      if (visible && !reduce && !frameId) frameId = requestAnimationFrame(tick);
      if (!visible && frameId) { cancelAnimationFrame(frameId); frameId = 0; }
    });
    io.observe(stage);
    this._on(stage, 'pointermove', (e) => {
      const box = stage.getBoundingClientRect();
      pointerX = (e.clientX - box.left) / (box.width || 1) * 2 - 1;
      pointerY = (e.clientY - box.top) / (box.height || 1) * 2 - 1;
    });
    this._on(stage, 'pointerleave', () => { pointerX = 0; pointerY = 0; });
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();
    if (!reduce) frameId = requestAnimationFrame(tick);
    this._cleanups.push(() => { cancelAnimationFrame(frameId); observer.disconnect(); io.disconnect(); });
  }

  /* ---------- section headings: masked line reveal, words hop on hover ---------- */
  _headings({ $$, reduce, fine }) {
    if (reduce) { return; }
    const compact = window.matchMedia('(max-width: 767px)').matches;
    $$('[data-split]').forEach((el) => {
      const circle = el.closest('[data-circle-word]');
      if (compact && !circle) {
        // Keep narrow headings in the document flow. Splitting and masking
        // every word can clip text when mobile fonts reflow during a scroll.
        const stop = Motion.inView(el, () => {
          Motion.animate(el, { opacity: [0.88, 1], transform: ['translateY(10px)', 'translateY(0px)'] }, { duration: 0.42, ease: [0.22, 1, 0.36, 1] });
        }, { amount: 0.1 });
        this._cleanups.push(stop);
        return;
      }
      let circleTarget = null;
      const positionCircle = () => {
        if (!circleTarget?.isConnected) { return; }
        let x = 0;
        let y = 0;
        let node = circleTarget;
        while (node && node !== circle) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent;
        }
        if (node !== circle) {
          const word = circleTarget.getBoundingClientRect();
          const heading = circle.getBoundingClientRect();
          x = word.left - heading.left;
          y = word.top - heading.top;
        }
        circle.style.setProperty('--circle-x', `${x}px`);
        circle.style.setProperty('--circle-y', `${y}px`);
        circle.style.setProperty('--circle-width', `${circleTarget.offsetWidth}px`);
        circle.style.setProperty('--circle-height', `${circleTarget.offsetHeight}px`);
        circle.classList.add('is-positioned');
      };
      if (circle) {
        this._on(window, 'resize', positionCircle);
        document.fonts?.ready.then(positionCircle);
      }
      SplitText.create(el, {
        type: 'lines,words',
        mask: 'lines',
        linesClass: 'ln',
        wordsClass: 'w-h',
        autoSplit: true,
        onSplit: (self) => {
          if (circle) {
            circleTarget = self.words.find((word) => word.textContent.trim().toLowerCase() === circle.dataset.circleWord);
            circle.classList.remove('is-positioned');
            positionCircle();
          }
          if (fine && !compact) {
            self.words.forEach((w) => {
              w.addEventListener('pointerenter', () => {
                if (!gsap.isTweening(w)) { gsap.fromTo(w, { y: 0 }, { y: -10, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }); }
              });
            });
          }
          return gsap.from(self.words, {
            yPercent: 115,
            duration: compact ? 0.55 : 1,
            stagger: compact ? 0.015 : 0.05,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: compact ? 'top 110%' : 'top 88%', toggleActions: 'play none none none' },
            onComplete: () => { $$('[class*="-mask"]', el).forEach((mk) => { mk.style.overflow = 'visible'; }); }
          });
        }
      });
    });
  }

  /* ---------- service cards: Motion entrance + spotlight + 3D tilt ---------- */
  _cards({ $$, fine, reduce }) {
    const { animate, inView } = Motion;
    const compact = window.matchMedia('(max-width: 767px)').matches;
    const wraps = $$('[data-cw]');
    if (!reduce) {
      wraps.forEach((w, i) => {
        if (compact) {
          // Moving the clipped card layer while Android Chrome scrolls can
          // leave its text and CTA painted at different positions.
          w.style.removeProperty('opacity');
          w.style.removeProperty('transform');
          const stop = inView(w, () => w.classList.add('is-visible'), { amount: 0, margin: '0px 0px 140px 0px' });
          this._cleanups.push(stop);
        } else {
          w.style.opacity = '0';
          w.style.transform = 'translateY(40px)';
          const stop = inView(w, () => {
            animate(w, { opacity: 1, transform: 'translateY(0px)' }, { duration: 0.85, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] });
          }, { amount: 0.15 });
          this._cleanups.push(stop);
        }
      });
    }
    if (!reduce) {
      const items = $$('[data-li]');
      if (items.length) {
        items.forEach((it) => { it.style.opacity = compact ? '0.65' : '0'; });
        inView(items[0].parentElement, () => {
          animate(items, { opacity: 1, transform: [`translateY(${compact ? 12 : 22}px)`, 'translateY(0px)'] }, { duration: compact ? 0.4 : 0.7, delay: Motion.stagger(compact ? 0.025 : 0.06), ease: [0.22, 1, 0.36, 1] });
        }, compact ? { amount: 0, margin: '0px 0px 140px 0px' } : { amount: 0.15 });
      }
    }
    $$('[data-card],[data-tilt],.flow,.hud').forEach((card) => {
      const tiltable = card.hasAttribute('data-card') || card.hasAttribute('data-tilt');
      const amt = card.hasAttribute('data-tilt') ? 6 : 9;
      let rx = null;
      let ry = null;
      if (tiltable && fine && !compact && !reduce) {
        gsap.set(card, { transformPerspective: 900 });
        rx = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
        ry = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
      }
      if (fine && !compact) this._on(card, 'pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        if (rx && fine && !reduce) { rx((px - 0.5) * amt); ry(-(py - 0.5) * amt); }
      });
      if (rx) { this._on(card, 'pointerleave', () => { rx(0); ry(0); }); }
      const title = card.querySelector('h3 a') || card.querySelector('h3');
      if (title && card.hasAttribute('data-card') && fine && !compact && !reduce) {
        const txt = title.textContent;
        this._on(card, 'pointerenter', () => gsap.to(title, { duration: 0.6, scrambleText: { text: txt, chars: 'lowerCase', speed: 1 }, overwrite: true }));
      }
    });
  }

  /* ---------- statement: parallax circuits (scroll + mouse) and scrubbed kinetic text ---------- */
  _statement({ $, $$, reduce, fine }) {
    const sec = $('[data-stmt]');
    const text = $('[data-stmt-text]');
    if (!sec || !text) { return; }
    if (reduce) { return; }
    const compact = window.matchMedia('(max-width: 767px)').matches;
    $$('[data-px]', sec).forEach((layer) => {
      gsap.to(layer, { yPercent: parseFloat(layer.getAttribute('data-px')), ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    if (fine) {
      const depths = [10, 22, 40];
      const qs = $$('[data-px] svg', sec).map((s, i) => ({ d: depths[i] || 20, x: gsap.quickTo(s, 'x', { duration: 1.1, ease: 'power3' }), y: gsap.quickTo(s, 'y', { duration: 1.1, ease: 'power3' }) }));
      this._on(sec, 'pointermove', (e) => {
        const r = sec.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        qs.forEach((o) => { o.x(-nx * o.d); o.y(-ny * o.d * 0.6); });
      });
      this._on(sec, 'pointerleave', () => qs.forEach((o) => { o.x(0); o.y(0); }));
    }
    SplitText.create(text, {
      type: 'words',
      wordsClass: 'w',
      autoSplit: true,
      onSplit: (self) => {
        const accent = self.words.filter((w) => w.closest('em'));
        const plain = self.words.filter((w) => !w.closest('em'));
        gsap.set(self.words, { color: themeColor('statement-soft') });
        const tl = gsap.timeline({ scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 } });
        tl.to(plain, { color: themeColor('scene-highlight'), stagger: 0.12, ease: 'none', duration: 1 }, 0)
          .to(accent, { color: themeColor('tone-ff4d5a'), stagger: 0.12, ease: 'none', duration: 1 }, plain.length * 0.12);
        return tl;
      }
    });
    const { animate, inView, stagger } = Motion;
    const prs = $$('[data-pr]', sec);
    prs.forEach((p) => { p.style.opacity = compact ? '0.7' : '0'; });
    inView(prs[0].parentElement, () => {
      animate(prs, { opacity: 1, transform: [`translateY(${compact ? 12 : 28}px)`, 'translateY(0px)'] }, { duration: compact ? 0.4 : 0.8, delay: stagger(compact ? 0.03 : 0.12), ease: [0.22, 1, 0.36, 1] });
    }, compact ? { amount: 0, margin: '0px 0px 140px 0px' } : { amount: 0.25 });
  }

  /* ---------- agents: scripted workflow ---------- */
  _agents({ $, $$, reduce }) {
    const flow = $('[data-flow]');
    if (!flow || reduce) { return; }
    const um = $('[data-m="u"]', flow);
    const bm = $('[data-m="b"]', flow);
    const ty = $('[data-typing]', flow);
    const txt = $('[data-scr-text]', flow);
    const steps = $$('[data-s]', flow);
    const ticks = steps.map((s) => s.querySelector('.tick path'));
    const full = txt.textContent;
    const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3.4, defaults: { ease: 'power3.out' } });
    tl.call(() => { txt.textContent = ''; }, null, 0)
      .set([um, bm, ty], { autoAlpha: 0, y: 14 }, 0)
      .set(steps, { opacity: 0.3 }, 0)
      .set(ticks, { drawSVG: '0% 0%' }, 0)
      .to(um, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.4)
      .to(ty, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.2)
      .to(ty, { autoAlpha: 0, duration: 0.2 }, 2.5)
      .set(bm, { autoAlpha: 1, y: 0 }, 2.5)
      .to(txt, { duration: 1.7, scrambleText: { text: full, chars: '01', speed: 0.6, revealDelay: 0.15 } }, 2.5);
    steps.forEach((s, i) => {
      tl.to(s, { opacity: 1, duration: 0.3 }, 4.5 + i * 0.75)
        .to(ticks[i], { drawSVG: '0% 100%', duration: 0.45 }, '<');
    });
    tl.pause(0.01);
    ScrollTrigger.create({ trigger: flow, start: 'top 90%', end: 'bottom 5%', onToggle: (self) => { if (self.isActive) { tl.play(); } else { tl.pause(); } } });
    this._cleanups.push(() => tl.kill());
  }

  /* ---------- process timeline ---------- */
  _process({ $, $$, reduce }) {
    const tl = $('[data-tl]');
    const prog = $('[data-tl-prog]');
    if (!tl || !prog) { return; }
    const compact = window.matchMedia('(max-width: 767px)').matches;
    const steps = $$('[data-step]');
    if (!reduce) {
      gsap.to(prog, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 62%', scrub: 0.4 } });
    } else {
      gsap.set(prog, { scaleY: 1 });
    }
    steps.forEach((s) => {
      ScrollTrigger.create({ trigger: s, start: 'top 68%', onEnter: () => s.classList.add('is-on'), onLeaveBack: () => s.classList.remove('is-on') });
    });
    if (reduce) { steps.forEach((s) => s.classList.add('is-on')); return; }
    const { animate, inView } = Motion;
    steps.forEach((s) => {
      s.style.opacity = compact ? '0.7' : '0';
      inView(s, () => { animate(s, { opacity: 1, transform: [`translateX(${compact ? 12 : 34}px)`, 'translateX(0px)'] }, { duration: compact ? 0.4 : 0.8, ease: [0.22, 1, 0.36, 1] }); }, compact ? { amount: 0, margin: '0px 0px 140px 0px' } : { amount: 0.3 });
    });
  }

  /* ---------- CTA: kinetic type that reacts to the pointer ---------- */
  _cta({ $, $$, reduce, fine }) {
    const sec = $('[data-cta]');
    const h = $('[data-cta-h]');
    const compact = window.matchMedia('(max-width: 767px)').matches;
    let chars = [];
    if (!reduce) SplitText.create(h, {
      type: 'chars,words',
      charsClass: 'ch',
      autoSplit: true,
      onSplit: (self) => {
        chars = self.chars.map((el) => ({ el, k: 0 }));
        if (reduce) { return null; }
        return gsap.from(self.chars, { yPercent: 70, opacity: 0, duration: compact ? 0.55 : 1, stagger: compact ? 0.012 : 0.03, ease: 'expo.out', scrollTrigger: { trigger: h, start: compact ? 'top 110%' : 'top 85%', toggleActions: 'play none none none' } });
      }
    });
    if (!reduce) {
      gsap.from($$('.cta-circuit .t'), { drawSVG: 0, duration: 2, ease: 'power2.inOut', stagger: 0.15, scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none none' } });
      gsap.from($$('.cta-circuit .n'), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)', stagger: 0.15, delay: 1.2, scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none none' } });
      const pulses = $$('.cta-circuit .pulse', sec);
      const pulseTweens = [];
      ScrollTrigger.create({
        trigger: sec,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive && !pulseTweens.length) {
            gsap.to(pulses, { opacity: 0.9, duration: 0.5, stagger: 0.12 });
            pulses.forEach((pulse, index) => {
              pulseTweens.push(gsap.fromTo(pulse, { strokeDashoffset: 0 }, {
                strokeDashoffset: -100,
                duration: 5 + index * 0.8,
                ease: 'none',
                repeat: -1,
                delay: index * 0.45,
              }));
            });
          } else pulseTweens.forEach((tween) => self.isActive ? tween.resume() : tween.pause());
        },
      });
      this._cleanups.push(() => pulseTweens.forEach((tween) => tween.kill()));
    }
    if (reduce || !fine) { return; }
    this._proximity(() => chars, 230, (c, k) => {
      c.el.style.setProperty('--w', (640 + 260 * k).toFixed(1));
      c.el.style.setProperty('--lift', (16 * k).toFixed(2));
    });
  }

  /* ---------- helpers shared by the forms ---------- */
  _scrollTo(el) {
    if (!el) { return; }
    try { el.scrollIntoView({ behavior: this.reduce ? 'auto' : 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); }
  }

  _toQuick(problem, description = '') {
    const form = this.root.querySelector('[data-quick-brief]');
    if (!form) { return; }
    const select = form.elements.problem;
    if (problem) {
      if (!Array.from(select.options).some((option) => option.value === problem)) {
        const option = document.createElement('option');
        option.value = problem;
        option.textContent = problem;
        select.add(option);
      }
    }
    select.value = problem || '';
    select.dispatchEvent(new window.Event('change', { bubbles: true }));
    form.elements.description.value = description;
    const status = form.querySelector('[data-quick-status]');
    if (status) { status.textContent = ''; }
    (this._quickProblemTrigger || select).focus({ preventScroll: true });
    this._scrollTo(form);
  }

  _quick({ $, $$ }) {
    const form = $('[data-quick-brief]');
    if (!form) { return; }
    const select = form.elements.problem;
    const status = $('[data-quick-status]', form);
    const links = $$('#services .card .more, #services .line-item');
    links.forEach((link) => {
      const title = link.closest('.card, .line-item')?.querySelector('h3, h4')?.textContent.trim();
      if (!title) { return; }
      if (!Array.from(select.options).some((option) => option.value === title)) {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        select.add(option);
      }
      this._on(link, 'click', (event) => {
        event.preventDefault();
        this._toQuick(title);
      });
    });
    const control = select.closest('.ctl');
    const trigger = document.createElement('button');
    const triggerText = document.createElement('span');
    const menu = document.createElement('div');
    trigger.type = 'button';
    trigger.className = 'quick-problem-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'quick-problem-options');
    trigger.setAttribute('aria-labelledby', 'quick-problem-label quick-problem-value');
    triggerText.id = 'quick-problem-value';
    trigger.appendChild(triggerText);
    menu.id = 'quick-problem-options';
    menu.className = 'quick-problem-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-labelledby', 'quick-problem-label');
    menu.hidden = true;
    select.classList.add('quick-problem-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    control.insertBefore(trigger, select.nextSibling);
    control.appendChild(menu);
    this._quickProblemTrigger = trigger;
    this._cleanups.push(() => { this._quickProblemTrigger = null; });
    const closeMenu = () => {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    };
    const syncProblem = () => {
      triggerText.textContent = select.selectedOptions[0]?.textContent || 'Choose a problem or service';
      trigger.setAttribute('aria-invalid', select.value ? 'false' : 'true');
    };
    const openMenu = (focusOption = false) => {
      menu.replaceChildren();
      Array.from(select.options).forEach((option) => {
        const item = document.createElement('div');
        item.className = 'quick-problem-option';
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', String(option.value === select.value));
        item.tabIndex = -1;
        item.textContent = option.textContent;
        item.dataset.value = option.value;
        menu.appendChild(item);
      });
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      const bounds = control.getBoundingClientRect();
      const below = window.innerHeight - bounds.bottom - 12;
      const above = bounds.top - 12;
      const openUp = below < 220 && above > below;
      menu.classList.toggle('open-up', openUp);
      menu.style.maxHeight = Math.max(100, Math.min(280, openUp ? above : below)) + 'px';
      if (focusOption) {
        const items = Array.from(menu.querySelectorAll('[role="option"]'));
        (items.find((item) => item.getAttribute('aria-selected') === 'true') || items[0])?.focus();
      }
    };
    syncProblem();
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService) {
      if (!Array.from(select.options).some((option) => option.value === requestedService)) {
        const option = document.createElement('option');
        option.value = requestedService;
        option.textContent = requestedService;
        select.add(option);
      }
      select.value = requestedService;
      syncProblem();
    }
    this._on(select, 'change', syncProblem);
    this._on(trigger, 'click', () => { if (menu.hidden) { openMenu(); } else { closeMenu(); } });
    this._on(trigger, 'keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); openMenu(true); }
      if (event.key === 'Escape') { closeMenu(); }
    });
    this._on(menu, 'click', (event) => {
      const item = event.target.closest('[role="option"]');
      if (!item) { return; }
      select.value = item.dataset.value;
      select.dispatchEvent(new window.Event('change', { bubbles: true }));
      closeMenu();
      trigger.focus();
    });
    this._on(menu, 'keydown', (event) => {
      const items = Array.from(menu.querySelectorAll('[role="option"]'));
      const index = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        items[(index + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length]?.focus();
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        items[event.key === 'Home' ? 0 : items.length - 1]?.focus();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        document.activeElement.click();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        trigger.focus();
      } else if (event.key === 'Tab') { closeMenu(); }
    });
    this._on(document, 'pointerdown', (event) => { if (!control.contains(event.target)) { closeMenu(); } });
    this._on(window, 'resize', closeMenu);
    this._on(window, 'scroll', closeMenu);
    $$('a[href="#contact"]').forEach((link) => this._on(link, 'click', (event) => {
      if (event.defaultPrevented) { return; }
      event.preventDefault();
      this._toQuick('');
    }));
    this._on(form, 'input', () => { status.textContent = ''; });
    this._on(form, 'change', () => { status.textContent = ''; });
    this._on(form, 'submit', (event) => {
      event.preventDefault();
      if (!select.value) {
        status.textContent = 'Choose a problem or service.';
        trigger.focus();
        openMenu();
        return;
      }
      if (!form.reportValidity()) { return; }
      status.textContent = 'Preview ready — this enquiry has not been sent.';
    });
  }

  /* ---------- hero idea slider: each idea opens the quick enquiry ---------- */
  _cmd({ $, $$, reduce }) {
    const ideas = $('[data-ideas]');
    const slider = $('[data-sugg-slider]');
    const panel = $('[data-ideas-panel]');
    const grid = $('[data-ideas-grid]');
    const toggle = $('[data-ideas-toggle]');
    if (!ideas || !slider || !panel || !grid || !toggle) { return; }
    $$('[data-sugg]', slider).forEach((button) => grid.appendChild(button.cloneNode(true)));
    const showAll = (open) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    };
    this._on(ideas, 'pointerenter', (event) => { if (event.pointerType === 'mouse') { showAll(true); } });
    this._on(ideas, 'pointerleave', (event) => { if (event.pointerType === 'mouse') { showAll(false); } });
    this._on(toggle, 'click', () => showAll(panel.hidden));
    this._on(ideas, 'focusout', (event) => { if (!ideas.contains(event.relatedTarget)) { showAll(false); } });
    this._on(ideas, 'keydown', (event) => {
      if (event.key === 'Escape') { showAll(false); toggle.focus(); }
    });
    this._on(document, 'pointerdown', (event) => { if (!ideas.contains(event.target)) { showAll(false); } });
    this._on(ideas, 'click', (event) => {
      const button = event.target.closest('[data-sugg]');
      if (!button) { return; }
      showAll(false);
      this._toQuick(button.getAttribute('title'), button.getAttribute('data-sugg'));
    });
    if (slider) {
      let direction = 1;
      let activePointer = null;
      let touchDrag = false;
      let dragging = false;
      let dragStartX = 0;
      let dragStartScroll = 0;
      let holdUntil = 0;
      let suppressClick = false;
      let clickTimer = 0;
      const release = (e) => {
        if (activePointer !== e.pointerId) { return; }
        if (dragging) {
          suppressClick = true;
          clearTimeout(clickTimer);
          clickTimer = setTimeout(() => { suppressClick = false; }, 0);
          if (slider.contains(document.activeElement)) { document.activeElement.blur(); }
        }
        activePointer = null;
        touchDrag = false;
        dragging = false;
        slider.classList.remove('is-dragging');
        if (suppressClick) { holdUntil = window.performance.now() + 300; }
      };
      this._on(slider, 'pointerdown', (e) => {
        if (e.button !== 0 && e.button !== undefined && e.pointerType !== 'touch') { return; }
        activePointer = e.pointerId;
        touchDrag = e.pointerType === 'touch';
        dragStartX = e.clientX;
        dragStartScroll = slider.scrollLeft;
      });
      this._on(slider, 'pointermove', (e) => {
        if (activePointer !== e.pointerId || touchDrag) { return; }
        const distance = e.clientX - dragStartX;
        if (!dragging && Math.abs(distance) > 5) {
          dragging = true;
          slider.classList.add('is-dragging');
          if (slider.setPointerCapture) { slider.setPointerCapture(e.pointerId); }
        }
        if (dragging) {
          e.preventDefault();
          slider.scrollLeft = dragStartScroll - distance;
        }
      });
      this._on(slider, 'pointerup', release);
      this._on(slider, 'pointercancel', release);
      this._on(slider, 'click', (e) => {
        if (!suppressClick) { return; }
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }, true);
      this._on(slider, 'keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') { return; }
        e.preventDefault();
        holdUntil = window.performance.now() + 500;
        const step = Math.min(220, Math.max(120, slider.clientWidth * 0.7));
        const left = slider.scrollLeft + (e.key === 'ArrowRight' ? step : -step);
        if (typeof slider.scrollTo === 'function') { slider.scrollTo({ left, behavior: 'smooth' }); }
        else { slider.scrollLeft = left; }
      });
      if (!reduce) {
        let frame = 0;
        let last = 0;
        const glide = (now) => {
          const elapsed = last ? Math.min(now - last, 64) : 0;
          last = now;
          const max = slider.scrollWidth - slider.clientWidth;
          if (elapsed && max > 2 && activePointer === null && now >= holdUntil && !document.hidden) {
            const next = slider.scrollLeft + direction * elapsed * 0.055;
            if (next >= max) { slider.scrollLeft = max; direction = -1; }
            else if (next <= 0) { slider.scrollLeft = 0; direction = 1; }
            else { slider.scrollLeft = next; }
          }
          frame = requestAnimationFrame(glide);
        };
        frame = requestAnimationFrame(glide);
        this._cleanups.push(() => { cancelAnimationFrame(frame); clearTimeout(clickTimer); });
      }
    }
  }

  /* ---------- capability cards: count and flip into view ---------- */
  _stats({ $$, reduce }) {
    const pad = (v) => (v < 10 ? '0' : '') + v;
    const compact = window.matchMedia('(max-width: 767px)').matches;
    const timelines = [];
    $$('[data-count]').forEach((el, i) => {
      const card = el.closest('.stat');
      const copy = card.querySelectorAll('.stat-l, .stat-s');
      const arrow = card.querySelector('.stat-go');
      const n = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reduce) { el.textContent = pad(n); return; }
      const o = { v: 0 };
      el.textContent = '00';
      const timeline = gsap.timeline({
        delay: compact ? 0 : i * 0.1,
        scrollTrigger: { trigger: card, start: compact ? 'top 120%' : 'top 75%', toggleActions: 'play none none none' }
      });
      timeline.fromTo(card,
        { y: compact ? 12 : 34, opacity: compact ? 0.8 : 0 },
        { y: 0, opacity: 1, duration: compact ? 0.4 : 0.75, ease: 'power3.out' },
        0
      ).to(o, {
        v: n,
        duration: compact ? 0.75 : 1.5,
        ease: 'power3.out',
        onUpdate: () => { el.textContent = pad(Math.round(o.v)); }
      }, 0.16).fromTo(el,
        { scale: compact ? 0.85 : 0.55, rotationX: compact ? 0 : -120, y: compact ? 8 : 24, opacity: compact ? 0.75 : 0, transformOrigin: '50% 50%' },
        { scale: 1, rotationX: 0, y: 0, opacity: 1, duration: compact ? 0.5 : 1.25, ease: 'back.out(1.5)' },
        0.14
      ).fromTo(copy,
        { y: compact ? 7 : 22, opacity: compact ? 0.8 : 0 },
        { y: 0, opacity: 1, duration: compact ? 0.4 : 0.8, stagger: compact ? 0.03 : 0.1, ease: 'power3.out' },
        compact ? 0.08 : 0.28
      ).fromTo(arrow,
        { y: compact ? 4 : 12, rotation: compact ? 0 : -45, opacity: compact ? 0.8 : 0 },
        { y: 0, rotation: 0, opacity: 1, duration: compact ? 0.4 : 0.7, ease: 'back.out(1.5)' },
        compact ? 0.1 : 0.38
      );
      timelines.push(timeline);
    });
    this._cleanups.push(() => timelines.forEach((timeline) => timeline.kill()));
  }

  /* ---------- solutions: tabs, autoplay, live pipeline ---------- */
  _solutions({ $, $$, reduce }) {
    const sec = $('[data-uc]');
    if (!sec) { return; }
    const tabs = $$('[data-uc-tab]', sec);
    const panels = $$('[data-uc-panel]', sec);
    const nodes = $$('[data-pnode]', sec);
    let cur = 0;
    let bar = null;
    let inview = false;
    const setNodes = (p, animate) => {
      nodes.forEach((nd, k) => {
        const nm = nd.querySelector('[data-pn]');
        const sb = nd.querySelector('[data-ps]');
        const nv = p.getAttribute('data-n' + (k + 1)) || '';
        const sv = p.getAttribute('data-s' + (k + 1)) || '';
        if (!animate || reduce) { nm.textContent = nv; sb.textContent = sv; return; }
        gsap.to(nm, { duration: 0.8, delay: k * 0.14, scrambleText: { text: nv, chars: 'upperCase', speed: 0.8 }, overwrite: true });
        gsap.to(sb, { duration: 0.7, delay: 0.1 + k * 0.14, scrambleText: { text: sv, chars: 'lowerCase', speed: 1 }, overwrite: true });
      });
    };
    const runBar = () => {
      if (bar) { bar.kill(); bar = null; }
      tabs.forEach((t) => { const b = t.querySelector('.bar'); if (b) { gsap.set(b, { scaleX: 0 }); } });
      const b = tabs[cur].querySelector('.bar');
      if (!b) { return; }
      if (reduce) { gsap.set(b, { scaleX: 1 }); return; }
      bar = gsap.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: 9, ease: 'none', paused: !inview, onComplete: () => show((cur + 1) % tabs.length, true) });
    };
    const show = (i, animate) => {
      cur = i;
      tabs.forEach((t, k) => {
        const on = k === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p, k) => {
        p.hidden = k !== i;
        if (k === i && animate && !reduce) {
          gsap.fromTo(p.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', overwrite: true });
        }
      });
      setNodes(panels[i], animate);
      runBar();
    };
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 70%',
      end: 'bottom 30%',
      onToggle: (self) => { inview = self.isActive; if (bar) { if (inview) { bar.play(); } else { bar.pause(); } } }
    });
    tabs.forEach((t, k) => {
      this._on(t, 'click', () => show(k, k !== cur));
      this._on(t, 'keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') { return; }
        e.preventDefault();
        const n = (k + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        show(n, true);
        tabs[n].focus();
      });
    });
    $$('[data-uc-plan]', sec).forEach((a) => this._on(a, 'click', (e) => {
      e.preventDefault();
      this._toQuick(a.getAttribute('data-uc-plan'));
    }));
    if (!reduce && nodes.length) {
      const hl = gsap.timeline({ repeat: -1 });
      nodes.forEach((nd) => {
        hl.call(() => { nodes.forEach((x) => x.classList.toggle('hot', x === nd)); }).to({}, { duration: 1.2 });
      });
      this._cleanups.push(() => hl.kill());
    }
    show(0, false);
  }

  /* ---------- savings estimator with a worked example ---------- */
  _estimator({ $, $$, reduce }) {
    const box = $('[data-est]');
    if (!box) { return; }
    const q = (s) => box.querySelector(s);
    const inp = { people: q('[name="people"]'), hours: q('[name="hours"]'), share: q('[name="share"]'), rate: q('[name="rate"]'), cur: q('[name="currency"]') };
    inp.people.value = '3';
    inp.hours.value = '6';
    inp.share.value = '60';
    inp.rate.value = '15';
    const WEEKS = 48;
    const FTE = 1920;
    const shown = { hours: 0, cost: 0, fte: 0 };
    const fmtN = (v) => Math.round(v).toLocaleString('en-US');
    const money = (v, c, dp) => {
      try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: c, maximumFractionDigits: dp, minimumFractionDigits: 0 }).format(v); } catch (e) { return c + ' ' + fmtN(v); }
    };
    const fill = (el) => {
      const mn = parseFloat(el.min) || 0;
      const mx = parseFloat(el.max) || 100;
      el.style.setProperty('--p', (((parseFloat(el.value) - mn) / (mx - mn)) * 100).toFixed(1) + '%');
    };
    const ring = q('[data-ring]');
    const after = q('[data-bar="after"]');
    const set = (sel, txt) => { const el = q(sel); if (el) { el.textContent = txt; } };
    const calc = (animate) => {
      const n = Math.max(1, Math.round(parseFloat(inp.people.value) || 1));
      const h = Math.max(0, parseFloat(inp.hours.value) || 0);
      const s = Math.max(0, Math.min(100, parseFloat(inp.share.value) || 0)) / 100;
      const r = Math.max(0, parseFloat(inp.rate.value) || 0);
      const c = inp.cur.value || 'USD';
      [inp.people, inp.hours, inp.share].forEach(fill);
      set('[data-o="people"]', String(n));
      set('[data-o="hours"]', h + ' h');
      set('[data-o="share"]', Math.round(s * 100) + '%');
      set('[data-o="ring"]', Math.round(s * 100) + '%');
      const total = n * h * WEEKS;
      const saved = total * s;
      const cost = saved * r;
      const fte = saved / FTE;
      set('[data-w="1"]', n + (n === 1 ? ' person' : ' people') + ' × ' + h + ' h/week × ' + WEEKS + ' weeks');
      set('[data-wv="1"]', '= ' + fmtN(total) + ' h/year');
      set('[data-w="2"]', fmtN(total) + ' h × ' + Math.round(s * 100) + '% automatable');
      set('[data-wv="2"]', '= ' + fmtN(saved) + ' h saved');
      set('[data-w="3"]', fmtN(saved) + ' h × ' + money(r, c, 2) + '/h');
      set('[data-wv="3"]', '= ' + money(cost, c, 0) + '/year');
      set('[data-w="4"]', fmtN(saved) + ' h ÷ ' + fmtN(FTE) + ' h per full-time person');
      set('[data-wv="4"]', '= ' + fte.toFixed(2) + ' FTE');
      set('[data-bv="before"]', fmtN(total) + ' h');
      set('[data-bv="after"]', fmtN(total - saved) + ' h');
      const kH = q('[data-k="hours"]');
      const kC = q('[data-k="cost"]');
      const kF = q('[data-k="fte"]');
      const paint = () => { kH.textContent = fmtN(shown.hours); kC.textContent = money(shown.cost, c, 0); kF.textContent = shown.fte.toFixed(2); };
      const d = reduce || !animate ? 0 : 0.7;
      if (d === 0) {
        shown.hours = saved; shown.cost = cost; shown.fte = fte; paint();
        if (ring) { gsap.set(ring, { strokeDashoffset: 100 - s * 100 }); }
        if (after) { gsap.set(after, { scaleX: 1 - s }); }
      } else {
        gsap.to(shown, { hours: saved, cost, fte, duration: d, ease: 'power3.out', overwrite: true, onUpdate: paint });
        if (ring) { gsap.to(ring, { strokeDashoffset: 100 - s * 100, duration: d, ease: 'power3.out', overwrite: true }); }
        if (after) { gsap.to(after, { scaleX: 1 - s, duration: d, ease: 'power3.out', overwrite: true }); }
      }
      const pr = box.querySelector('input[name="proc"]:checked');
      this._estimate = { n, h, s, r, c, total, saved, cost, fte, proc: pr ? pr.value : '' };
    };
    ['people', 'hours', 'share', 'rate', 'cur'].forEach((k) => {
      this._on(inp[k], 'input', () => calc(true));
      this._on(inp[k], 'change', () => calc(true));
    });
    $$('input[name="proc"]', box).forEach((el) => this._on(el, 'change', () => calc(true)));
    calc(false);
    if (!reduce) {
      ScrollTrigger.create({
        trigger: box,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          shown.hours = 0; shown.cost = 0; shown.fte = 0;
          if (ring) { gsap.set(ring, { strokeDashoffset: 100 }); }
          if (after) { gsap.set(after, { scaleX: 1 }); }
          calc(true);
        }
      });
    }
    const send = q('[data-est-send]');
    if (send) {
      this._on(send, 'click', () => {
        const e = this._estimate;
        const what = e.proc ? ' for ' + e.proc.toLowerCase() : '';
        this._toQuick('Business Process Automation', 'Savings estimate' + what + ': about ' + fmtN(e.saved) + ' h/year (' + money(e.cost, e.c, 0) + '/year), from ' + e.n + ' people × ' + e.h + ' h/week with ' + Math.round(e.s * 100) + '% automatable.');
      });
    }
  }

  /* ---------- stack: stepped terminal replay ---------- */
  _stack({ $, $$, reduce }) {
    const term = $('[data-term]');
    if (!term || reduce) { return; }
    const lines = $$('[data-tline]', term);
    const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4 });
    tl.set(lines, { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, 0);
    lines.forEach((ln, i) => {
      const n = Math.max(8, Math.round(ln.textContent.length * 0.9));
      const pause = ln.classList.contains('cmdl') ? (i === 0 ? 0.2 : 0.9) : 0.12;
      tl.set(ln, { opacity: 1 }, i === 0 ? pause : '+=' + pause)
        .to(ln, { clipPath: 'inset(0 0% 0 0)', duration: Math.min(0.45, n * 0.011), ease: 'steps(' + n + ')' });
      const st = ln.querySelector('.ts');
      if (st) { tl.fromTo(st, { opacity: 0.2 }, { opacity: 1, duration: 0.18, ease: 'steps(3)' }, '<0.25'); }
    });
    ScrollTrigger.create({ trigger: term, start: 'top 85%', end: 'bottom 10%', onToggle: (self) => { if (self.isActive) { tl.play(); } else { tl.pause(); } } });
    this._cleanups.push(() => tl.kill());
  }

  /* ---------- engagement table: pick a model straight into the quick enquiry ---------- */
  _engage({ $$ }) {
    $$('[data-pick]').forEach((b) => this._on(b, 'click', () => this._toQuick(b.getAttribute('data-pick'))));
  }

  /* ---------- FAQ accordion ---------- */
  _faq({ $$, reduce }) {
    $$('[data-faq]').forEach((it, i) => {
      const btn = it.querySelector('button');
      const ans = it.querySelector('.faq-a');
      const open = (on, instant) => {
        it.classList.toggle('open', on);
        btn.setAttribute('aria-expanded', on ? 'true' : 'false');
        ans.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (instant || reduce) { ans.style.height = on ? 'auto' : '0px'; return; }
        gsap.to(ans, { height: on ? 'auto' : 0, duration: 0.55, ease: 'power3.inOut', overwrite: true, onComplete: () => ScrollTrigger.refresh() });
      };
      open(i === 0, true);
      this._on(btn, 'click', () => open(!it.classList.contains('open'), false));
    });
  }

  /* ---------- project brief: three steps, validation, send animation ---------- */
  _brief({ $, $$, reduce, fine }) {
    const form = $('[data-brief]');
    if (!form) { return; }
    form.noValidate = true;
    form.classList.add('js');
    const steps = $$('[data-bstep]', form);
    const prog = $$('[data-bprog] li', form);
    const label = $('[data-bstep-label]', form);
    const back = $('[data-bback]', form);
    const next = $('[data-bnext]', form);
    const submit = $('[data-bsubmit]', form);
    const note = $('[data-bnote]', form);
    let cur = 0;
    const go = (i, animate) => {
      cur = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach((s, k) => s.classList.toggle('is-on', k === cur));
      prog.forEach((p, k) => { p.classList.toggle('on', k === cur); p.classList.toggle('done', k < cur); });
      label.textContent = 'Step 0' + (cur + 1) + ' / 0' + steps.length;
      back.disabled = cur === 0;
      next.hidden = cur === steps.length - 1;
      submit.hidden = cur !== steps.length - 1;
      if (animate && !reduce) {
        gsap.fromTo(steps[cur], { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' });
        gsap.fromTo(steps[cur].querySelectorAll('.bq, .fld, .row2, .cons'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.08, ease: 'power3.out' });
      }
    };
    const fieldErr = (el, msg) => {
      const w = el.closest('.fld');
      if (!w) { return; }
      w.classList.toggle('err', !!msg);
      const m = w.querySelector('.em');
      if (m) { m.textContent = msg || ''; }
      if (msg && !reduce) { gsap.fromTo(w, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }); }
    };
    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const validate = (i) => {
      let ok = true;
      let first = null;
      if (i === 0) {
        const any = form.querySelectorAll('input[name="services"]:checked').length > 0;
        $('[data-err="services"]', form).textContent = any ? '' : 'Pick at least one area so we can route your brief.';
        if (!any) { ok = false; first = form.querySelector('input[name="services"]'); }
      }
      if (i === 1) {
        const d = form.querySelector('[name="details"]');
        if (d.value.trim().length < 20) { fieldErr(d, 'A sentence or two helps: at least 20 characters.'); ok = false; first = d; } else { fieldErr(d, ''); }
      }
      if (i === 2) {
        const n = form.querySelector('[name="name"]');
        const e = form.querySelector('[name="email"]');
        const c = form.querySelector('[name="consent"]');
        if (!n.value.trim()) { fieldErr(n, 'Please add your name.'); ok = false; first = first || n; } else { fieldErr(n, ''); }
        if (!emailOk(e.value.trim())) { fieldErr(e, 'Please add a valid email address.'); ok = false; first = first || e; } else { fieldErr(e, ''); }
        $('[data-err="consent"]', form).textContent = c.checked ? '' : 'Please confirm we can contact you.';
        if (!c.checked) { ok = false; first = first || c; }
      }
      if (first) { try { first.focus({ preventScroll: true }); } catch (err) { first.focus(); } }
      return ok;
    };
    this._on(next, 'click', () => { if (validate(cur)) { go(cur + 1, true); } });
    this._on(back, 'click', () => go(cur - 1, true));
    this._on(form, 'input', (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('.fld.err')) { fieldErr(t, ''); }
    });
    this._on(form, 'change', (e) => {
      const t = e.target;
      if (t && t.name === 'services') { $('[data-err="services"]', form).textContent = ''; }
      if (t && t.name === 'consent' && t.checked) { $('[data-err="consent"]', form).textContent = ''; }
    });
    const ta = form.querySelector('[name="details"]');
    const cnt = $('[data-count-chars]', form);
    const MAX = 1200;
    const count = () => {
      if (ta.value.length > MAX) { ta.value = ta.value.slice(0, MAX); }
      cnt.textContent = ta.value.length + ' / ' + MAX;
    };
    this._on(ta, 'input', count);
    count();
    const file = form.querySelector('input[type="file"]');
    const fl = $('[data-files]', form);
    const drop = file ? file.closest('.drop') : null;
    const fileHint = fl ? fl.textContent : '';
    if (file && fl && drop) {
      this._on(file, 'change', () => {
        const names = Array.from(file.files || []).map((f) => f.name);
        fl.textContent = names.length ? names.length + (names.length === 1 ? ' file: ' : ' files: ') + names.join(', ') : fileHint;
      });
      ['dragenter', 'dragover'].forEach((t) => this._on(file, t, () => drop.classList.add('over')));
      ['dragleave', 'drop'].forEach((t) => this._on(file, t, () => drop.classList.remove('over')));
    }
    if (fine && !reduce) {
      this._on(form, 'pointermove', (e) => {
        const r = form.getBoundingClientRect();
        const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI + 90 - 306;
        form.style.setProperty('--ang', a.toFixed(1) + 'deg');
        form.classList.add('aim');
      });
      this._on(form, 'pointerleave', () => { form.classList.remove('aim'); });
    }
    const list = (name) => Array.from(form.querySelectorAll('input[name="' + name + '"]:checked')).map((x) => x.value);
    const sendBox = $('[data-bsend]', form);
    const sendBar = $('[data-bsend-bar]', form);
    const sendTxt = $('[data-bsend-t]', form);
    const finish = () => {
      const ref = 'BB-' + new Date().getFullYear() + '-' + Math.random().toString(16).slice(2, 6).toUpperCase();
      $('[data-sum="ref"]', form).textContent = ref;
      $('[data-sum="services"]', form).textContent = list('services').join(', ') || '—';
      $('[data-sum="engagement"]', form).textContent = list('engagement')[0] || '—';
      $('[data-sum="timeline"]', form).textContent = list('timeline')[0] || '—';
      $('[data-sum="contactpref"]', form).textContent = list('contactpref')[0] || '—';
      form.classList.add('done');
      label.textContent = 'Sent · ' + ref;
      if (!reduce) {
        const done = $('[data-done]', form);
        gsap.from(done.children, { y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' });
        gsap.fromTo(done.querySelectorAll('.done-ic circle, .done-ic path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, stagger: 0.25, ease: 'power2.inOut' });
      }
      this._scrollTo(form);
    };
    this._on(form, 'submit', (e) => {
      e.preventDefault();
      if (cur !== steps.length - 1) { if (validate(cur)) { go(cur + 1, true); } return; }
      if (!validate(cur)) { return; }
      if (reduce) { finish(); return; }
      sendBox.classList.add('on');
      sendTxt.textContent = 'Packaging brief';
      const tl = gsap.timeline({ onComplete: () => { sendBox.classList.remove('on'); finish(); } });
      tl.fromTo(sendBar, { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
        .to(sendTxt, { duration: 0.5, scrambleText: { text: 'Checking details', chars: 'upperCase', speed: 1 } }, 0.55)
        .to(sendTxt, { duration: 0.5, scrambleText: { text: 'Sending brief', chars: 'upperCase', speed: 1 } }, 1.1);
    });
    this._briefReset = () => {
      form.reset();
      form.classList.remove('done');
      $$('.fld.err', form).forEach((w) => { w.classList.remove('err'); const m = w.querySelector('.em'); if (m) { m.textContent = ''; } });
      $$('[data-err]', form).forEach((m) => { m.textContent = ''; });
      if (note) { note.textContent = ''; }
      if (fl) { fl.textContent = fileHint; }
      count();
      go(0, true);
    };
    this._on($('[data-breset]', form), 'click', () => this._briefReset());
    go(0, false);
  }

  /* ---------- footer newsletter ---------- */
  _news({ $, reduce }) {
    const f = $('[data-news]');
    if (!f) { return; }
    f.noValidate = true;
    const input = f.querySelector('input');
    const msg = $('[data-news-msg]', f);
    const btn = f.querySelector('button');
    this._on(f, 'submit', (e) => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      f.classList.toggle('err', !ok);
      f.classList.remove('ok');
      msg.textContent = ok ? 'Email looks valid. Newsletter signup is not available yet.' : 'Please enter a valid email address.';
      if (ok) {
        if (!reduce) { gsap.fromTo(btn.querySelector('svg'), { x: 0 }, { x: 40, duration: 0.35, ease: 'power2.in', yoyo: true, repeat: 1 }); }
      } else if (!reduce) {
        gsap.fromTo(f.querySelector('.news-row'), { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    });
  }

  /* ---------- microinteractions: magnetic, press, click ripple ---------- */
  _micro({ $$, fine, reduce }) {
    if (reduce) { return; }
    const { animate } = Motion;
    if (fine) {
      $$('[data-magnet]').forEach((el) => {
        const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
        const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
        this._on(el, 'pointermove', (e) => {
          const r = el.getBoundingClientRect();
          qx((e.clientX - (r.left + r.width / 2)) * 0.22);
          qy((e.clientY - (r.top + r.height / 2)) * 0.32);
        });
        this._on(el, 'pointerleave', () => { qx(0); qy(0); });
      });
    }
    $$('[data-press]').forEach((el) => {
      this._on(el, 'pointerdown', () => { animate(el, { scale: 0.94 }, { type: 'spring', stiffness: 600, damping: 22 }); });
      const up = () => { animate(el, { scale: 1 }, { type: 'spring', stiffness: 380, damping: 11 }); };
      this._on(el, 'pointerup', up);
      this._on(el, 'pointerleave', up);
    });
    $$('.btn,.bbtn,[data-card]').forEach((el) => {
      this._on(el, 'pointerdown', (e) => {
        const r = el.getBoundingClientRect();
        const s = Math.max(r.width, r.height) * 2;
        const sp = document.createElement('span');
        sp.className = 'rip';
        sp.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (e.clientX - r.left - s / 2) + 'px;top:' + (e.clientY - r.top - s / 2) + 'px';
        el.appendChild(sp);
        sp.addEventListener('animationend', () => sp.remove());
      });
    });
  }
}

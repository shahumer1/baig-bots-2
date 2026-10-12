import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const sections = ['GlobalEffects', 'Header', 'Hero', 'Marquees', 'Stats', 'Services', 'Solutions', 'Statement', 'Agents', 'Estimator', 'Stack', 'Process', 'Engage', 'Faq', 'Contact', 'Footer'];
const page = `<div id="bb">${sections.map((name) => fs.readFileSync(`src/components/markup/${name}.html`, 'utf8')).join('')}</div>`;
assert(!page.includes('sc-camel-'), 'export-only SVG attributes remain');
assert(!page.includes('data-theme-btn') && !page.includes('data-motion-btn'), 'obsolete nav controls remain');
const dom = new JSDOM(`<!doctype html><html><body>${page}</body></html>`, {
  url: 'http://localhost:5173/',
  pretendToBeVisual: true,
});
const { window } = dom;
Object.assign(globalThis, {
  window,
  document: window.document,
  HTMLElement: window.HTMLElement,
  SVGElement: window.SVGElement,
  Element: window.Element,
  Node: window.Node,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
});
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
let themeListener;
let darkPreference = false;
window.matchMedia = (query) => ({
  get matches() { return query.includes('prefers-color-scheme') ? darkPreference : query.includes('pointer: fine'); },
  addEventListener(type, listener) { if (query.includes('prefers-color-scheme') && type === 'change') themeListener = listener; },
  removeEventListener() {},
});
window.scrollTo = () => {};
window.Element.prototype.scrollIntoView = () => {};
window.HTMLCanvasElement.prototype.getContext = (kind) => kind === '2d'
  ? new Proxy({}, {
    get: (_, name) => name === 'createRadialGradient'
      ? () => ({ addColorStop() {} })
      : () => ({ width: 0 }),
    set: () => true,
  })
  : null;
window.ResizeObserver = globalThis.ResizeObserver = class { observe() {} disconnect() {} };
window.IntersectionObserver = globalThis.IntersectionObserver = class { observe() {} disconnect() {} };
const errors = [];
const originalError = console.error;
console.error = (...args) => { errors.push(args.map(String).join(' ')); originalError(...args); };
const { BaigBotsSite } = await import('./src/site.js');
const site = new BaigBotsSite();
site.componentDidMount();
assert(site.root, 'site did not mount');
assert.equal(site.root.getAttribute('data-theme'), 'light');
darkPreference = true;
themeListener();
assert.equal(site.root.getAttribute('data-theme'), 'dark', 'system theme change was not applied');
assert(window.document.querySelector('[data-gl]').width > 0, 'canvas fallback did not render');
const pointer = new window.Event('pointermove', { bubbles: true });
Object.assign(pointer, { clientX: 120, clientY: 80, pointerType: 'mouse' });
window.document.dispatchEvent(pointer);
assert.equal(site.ptr.x, 120, 'cursor effect did not receive pointer movement');
const suggestions = [...window.document.querySelectorAll('[data-sugg]')];
assert.equal(suggestions.length, 16, 'one idea is required for each service line');
suggestions[3].click();
assert.equal(window.document.querySelector('[data-cmd-input]').value, suggestions[3].getAttribute('data-sugg'));
const serviceLink = window.document.querySelector('#services .card .more');
serviceLink.click();
assert.equal(window.document.querySelector('[data-quick-brief] [name="problem"]').value, 'AI Solutions & Intelligent Agents', 'service click did not preselect the quick enquiry');
window.document.querySelector('#services .line-item').click();
assert.equal(window.document.querySelector('[data-quick-brief] [name="problem"]').value, 'Web & Mobile Development', 'service line click did not preselect the quick enquiry');
const slider = window.document.querySelector('[data-sugg-slider]');
Object.defineProperty(slider, 'clientWidth', { value: 320 });
Object.defineProperty(slider, 'scrollWidth', { value: 2000 });
const deadline = Date.now() + 5000;
while (slider.scrollLeft === 0 && Date.now() < deadline) {
  await new Promise((resolve) => setTimeout(resolve, 100));
}
assert(slider.scrollLeft > 0, 'the idea slider did not move continuously');
const beforeKey = slider.scrollLeft;
slider.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
assert(slider.scrollLeft > beforeKey, 'keyboard scrolling did not move the slider');
const pointerOnSlider = (type, x) => {
  const event = new window.Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, { clientX: x, pointerId: 1, pointerType: 'mouse', button: 0 });
  slider.dispatchEvent(event);
};
slider.scrollLeft = 300;
pointerOnSlider('pointerdown', 100);
pointerOnSlider('pointermove', 40);
assert(slider.scrollLeft >= 355, 'mouse dragging did not move the slider');
pointerOnSlider('pointerup', 40);
assert.deepEqual(errors.filter((x) => !x.includes('Error creating WebGL context')), []);
site.componentWillUnmount();
window.close();
console.log('Motion startup smoke test passed');
process.exit(0);

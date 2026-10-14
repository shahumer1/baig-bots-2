import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const sections = ['GlobalEffects', 'Header', 'Hero', 'Marquees', 'Stats', 'Services', 'Solutions', 'Statement', 'Agents', 'Estimator', 'Stack', 'Process', 'Engage', 'Faq', 'Contact', 'Footer'];
const page = `<div id="bb">${sections.map((name) => fs.readFileSync(`src/components/markup/${name}.html`, 'utf8')).join('')}</div>`;
assert(!page.includes('sc-camel-'), 'export-only SVG attributes remain');
assert(page.includes('data-theme-toggle') && !page.includes('data-motion-btn'), 'theme toggle should be present without a motion control');
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
// The engagement cards render through React; this fixture exercises their data-pick click contract.
const engagementPick = window.document.createElement('button');
engagementPick.dataset.pick = 'Retainer support';
window.document.querySelector('[data-engagement-cards]').append(engagementPick);
const { BaigBotsSite } = await import('./src/site.js');
const site = new BaigBotsSite();
site.componentDidMount();
assert(site.root, 'site did not mount');
assert.equal(site.root.getAttribute('data-theme'), 'light');
const themeToggle = window.document.querySelector('[data-theme-toggle]');
themeToggle.click();
assert.equal(site.root.getAttribute('data-theme'), 'dark', 'theme button did not enable dark mode');
assert.equal(window.document.documentElement.getAttribute('data-theme'), 'dark', 'document theme did not update');
assert.equal(window.localStorage.getItem('baig-bots-theme'), 'dark', 'theme choice was not saved');
darkPreference = true;
themeListener?.();
assert.equal(site.root.getAttribute('data-theme'), 'dark', 'system preference should not change the selected theme');
themeToggle.click();
assert.equal(site.root.getAttribute('data-theme'), 'light', 'theme button did not restore light mode');
assert(window.document.querySelector('[data-gl]').width > 0, 'canvas fallback did not render');
const pointer = new window.Event('pointermove', { bubbles: true });
Object.assign(pointer, { clientX: 120, clientY: 80, pointerType: 'mouse' });
window.document.dispatchEvent(pointer);
assert.equal(site.ptr.x, 120, 'cursor effect did not receive pointer movement');
const suggestions = [...window.document.querySelectorAll('[data-sugg-slider] [data-sugg]')];
assert.equal(suggestions.length, 16, 'one idea is required for each service line');
assert.equal(window.document.querySelector('[data-cmd]'), null, 'old input form should remain commented out');
const ideas = window.document.querySelector('[data-ideas]');
const ideasPanel = window.document.querySelector('[data-ideas-panel]');
assert.equal(ideasPanel.querySelectorAll('[data-sugg]').length, suggestions.length, 'hover panel should show every slider idea');
const hoverIdeas = (type) => {
  const event = new window.Event(type);
  Object.assign(event, { pointerType: 'mouse' });
  ideas.dispatchEvent(event);
};
hoverIdeas('pointerenter');
assert.equal(ideasPanel.hidden, false, 'hover should reveal all ideas');
hoverIdeas('pointerleave');
assert.equal(ideasPanel.hidden, true, 'leaving should restore the slider');
suggestions[3].click();
const quickForm = window.document.querySelector('[data-quick-brief]');
assert.equal(quickForm.elements.problem.value, suggestions[3].title, 'hero idea did not preselect its service');
assert.equal(quickForm.elements.description.value, suggestions[3].getAttribute('data-sugg'), 'hero idea did not fill the description');
window.document.querySelector('.hero-cta-card .btn').click();
assert.equal(quickForm.elements.problem.value, '', 'hero project link did not open a fresh quick enquiry');
const serviceLink = window.document.querySelector('#services .card .more');
serviceLink.click();
assert.equal(window.document.querySelector('[data-quick-brief] [name="problem"]').value, 'AI Solutions & Intelligent Agents', 'service click did not preselect the quick enquiry');
window.document.querySelector('#services .line-item').click();
assert.equal(window.document.querySelector('[data-quick-brief] [name="problem"]').value, 'Web & Mobile Development', 'service line click did not preselect the quick enquiry');
window.document.querySelector('[data-pick="Retainer support"]').click();
assert.equal(quickForm.elements.problem.value, 'Retainer support', 'engagement choice did not preselect the quick enquiry');
window.document.querySelector('[data-uc-plan="AI support assistant"]').click();
assert.equal(quickForm.elements.problem.value, 'AI support assistant', 'use case did not preselect the quick enquiry');
window.document.querySelector('[data-est-send]').click();
assert.equal(quickForm.elements.problem.value, 'Business Process Automation', 'estimator did not select its service');
assert.match(quickForm.elements.description.value, /Savings estimate/, 'estimator did not fill the description');
window.document.querySelector('[data-nav] a[href="#contact"]').click();
assert.equal(quickForm.elements.problem.value, '', 'general contact link kept an unrelated selection');
const slider = window.document.querySelector('[data-sugg-slider]');
Object.defineProperty(slider, 'clientWidth', { value: 320 });
Object.defineProperty(slider, 'scrollWidth', { value: 2000 });
const deadline = Date.now() + 5000;
while (slider.scrollLeft === 0 && Date.now() < deadline) {
  await new Promise((resolve) => setTimeout(resolve, 100));
}
assert(slider.scrollLeft > 0, 'the idea slider did not move continuously');
suggestions[0].focus();
suggestions[0].click();
const problemTrigger = quickForm.querySelector('.quick-problem-trigger');
const problemMenu = quickForm.querySelector('.quick-problem-menu');
assert.equal(window.document.activeElement, problemTrigger, 'choosing an idea should focus the quick enquiry');
problemTrigger.click();
assert.equal(problemTrigger.getAttribute('aria-expanded'), 'true', 'service dropdown did not open');
assert.equal(problemMenu.querySelectorAll('[role="option"]').length, quickForm.elements.problem.options.length, 'service dropdown missed an option');
problemMenu.querySelector('[data-value="Business Process Automation"]').click();
assert.equal(quickForm.elements.problem.value, 'Business Process Automation', 'service dropdown did not update the form');
assert.equal(problemMenu.hidden, true, 'service dropdown did not close after selection');
const afterChoice = slider.scrollLeft;
await new Promise((resolve) => setTimeout(resolve, 180));
assert(slider.scrollLeft > afterChoice, 'the idea slider stopped after an idea was chosen');
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

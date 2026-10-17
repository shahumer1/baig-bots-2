import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { allServices } from './src/components/serviceData.js';
import { innerIndustries, innerServices } from './src/components/innerData.js';
import { serviceGrowthData } from './src/components/serviceGrowthData.js';

const vite = await createServer({ configLoader: 'runner', optimizeDeps: { disabled: true }, server: { middlewareMode: true }, appType: 'custom' });
let page;
let Page;
let HeroScene;
let ServiceExperience;
let Header;
try {
  ({ Page } = await vite.ssrLoadModule('/src/components/Page.jsx'));
  ({ HeroScene } = await vite.ssrLoadModule('/src/components/HeroScene.jsx'));
  ({ ServiceExperience } = await vite.ssrLoadModule('/src/components/ServiceExperience.jsx'));
  ({ Header } = await vite.ssrLoadModule('/src/components/Header.jsx'));
  page = renderToStaticMarkup(React.createElement(Page));
} finally {
  await vite.close();
}
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
let reduceMotion = false;
window.matchMedia = (query) => ({
  get matches() { return query.includes('prefers-color-scheme') ? darkPreference : query.includes('prefers-reduced-motion') ? reduceMotion : query.includes('pointer: fine'); },
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
assert(window.document.querySelector('[data-pick="Retainer support"]'), 'React engagement cards did not render');
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
assert.equal(window.document.querySelector('[data-nav] a[href="/contact"]')?.textContent.trim(), 'Contact Us', 'contact page missing from navigation');
const desktopMenus = window.document.querySelectorAll('.links .nav-services');
assert.equal(desktopMenus[0].querySelectorAll('.nav-service-list a').length, 10, 'services menu should contain all eight core pages, All Services and Other');
assert.equal(desktopMenus[1].querySelectorAll('.nav-service-list a').length, innerIndustries.length + 1, 'industries menu should contain every industry and the overview');
assert.equal(window.document.querySelectorAll('.mobile-panel .nav-services-mobile').length, 2, 'mobile navigation should have both dropdowns');
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
const { createRoot } = await import('react-dom/client');
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const navHost = window.document.createElement('div');
window.document.body.append(navHost);
const navRoot = createRoot(navHost);
await React.act(async () => { navRoot.render(React.createElement(Header, { inner: true })); });
const navDropdowns = navHost.querySelectorAll('.nav-services');
navDropdowns[0].open = true;
navDropdowns[0].querySelector('summary').dispatchEvent(new window.Event('pointerdown', { bubbles: true }));
assert(navDropdowns[0].open, 'clicking inside a navbar dropdown should keep it open');
window.document.body.dispatchEvent(new window.Event('pointerdown', { bubbles: true }));
assert(!navDropdowns[0].open, 'clicking outside the navbar dropdown should close it');
navDropdowns[0].open = true;
navDropdowns[1].querySelector('summary').dispatchEvent(new window.Event('pointerdown', { bubbles: true }));
assert(!navDropdowns[0].open, 'opening another navbar dropdown should close the previous one');
navDropdowns[1].open = true;
window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert(!navDropdowns[1].open, 'Escape should close an open navbar dropdown');
await React.act(async () => { navRoot.unmount(); });
navHost.remove();
const sceneHost = window.document.createElement('div');
window.document.body.append(sceneHost);
const sceneRoot = createRoot(sceneHost);
reduceMotion = true;
await React.act(async () => { sceneRoot.render(React.createElement(HeroScene, { kind: 'services' })); });
const activeService = () => [...sceneHost.querySelectorAll('.inner-directory-list button')].findIndex((button) => button.getAttribute('aria-pressed') === 'true');
assert.equal(activeService(), 0, 'service hero should start on the first capability');
await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 2100)); });
assert.equal(activeService(), 1, 'service hero did not advance automatically');
await React.act(async () => { sceneHost.querySelectorAll('.inner-directory-list button')[4].click(); });
assert.equal(activeService(), 4, 'service hero did not respond to manual selection');
await React.act(async () => { sceneRoot.render(React.createElement(HeroScene, { kind: 'web' })); });
assert(sceneHost.textContent.includes('Interactive application'), 'web preview should start on the React view');
await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 2100)); });
assert(sceneHost.textContent.includes('Publish and update pages'), 'web preview did not advance to WordPress content');
await React.act(async () => { sceneHost.querySelectorAll('.inner-scene-tabs button')[2].click(); });
assert(sceneHost.textContent.includes('GET /api/records'), 'web preview did not show API content when selected');
await React.act(async () => { sceneRoot.render(React.createElement(HeroScene, { kind: 'agents' })); });
assert.equal(sceneHost.querySelectorAll('.inner-chat-message').length, 1, 'appointment conversation should start with one message');
assert.equal(sceneHost.querySelectorAll('.inner-scene-tabs').length, 0, 'appointment conversation should not show stage tabs');
const chatPane = sceneHost.querySelector('.inner-agent-messages');
Object.defineProperty(chatPane, 'clientHeight', { configurable: true, value: 100 });
Object.defineProperty(chatPane, 'scrollHeight', { configurable: true, value: 400 });
await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 450)); });
assert(sceneHost.querySelector('.inner-chat-typing'), 'assistant typing indicator did not appear');
await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 120)); });
assert(chatPane.scrollTop > 0 && chatPane.scrollTop < 300, 'appointment chat should scroll in steps, without jumping to the bottom');
await React.act(async () => { await new Promise((resolve) => setTimeout(resolve, 1250)); });
assert.equal(sceneHost.querySelectorAll('.inner-chat-message').length, 2, 'assistant reply did not arrive');
assert(!sceneHost.querySelector('.inner-chat-typing'), 'typing indicator stayed after the assistant replied');
await React.act(async () => { sceneRoot.unmount(); });
reduceMotion = false;
sceneHost.remove();
const experienceHost = window.document.createElement('div');
window.document.body.append(experienceHost);
const experienceRoot = createRoot(experienceHost);
const paymentService = allServices.find((service) => service.slug === 'fintech-payment-technology');
await React.act(async () => { experienceRoot.render(React.createElement(ServiceExperience, { service: paymentService })); });
assert(experienceHost.textContent.includes('Card issuing and acquiring workflows'), 'service detail did not show its first area');
await React.act(async () => { experienceHost.querySelectorAll('.sx-choice')[2].click(); });
assert(experienceHost.textContent.includes('Compare records and surface the items that need review.'), 'selecting a service area did not update the explanation');
assert(experienceHost.querySelector('.sx-choice[aria-pressed="true"]')?.textContent.includes('Clearing'), 'selected service area was not marked active');
await React.act(async () => { experienceRoot.unmount(); });
experienceHost.remove();
const routes = ['/', '/services', '/services/other', '/industries', '/contact', ...innerServices.map((service) => `/services/${service.slug}`), ...innerIndustries.map((industry) => `/industries/${industry.slug}`), ...allServices.map((service) => `/services/${service.slug}`)];
for (const route of routes) {
  window.history.replaceState({}, '', route);
  const html = renderToStaticMarkup(React.createElement(Page));
  const detailService = [...innerServices, ...allServices].find((service) => route === `/services/${service.slug}`);
  if (detailService) {
    assert(serviceGrowthData[detailService.slug]?.[2]?.length === 3, `${route} is missing service-specific business value copy`);
    assert(html.includes('growth-panel') && html.includes('growth-track'), `${route} is missing its animated business value section`);
    assert(html.includes('project-steps-scroll') && html.includes('inner-related-grid'), `${route} is missing shared scroll steps or compact related cards`);
    assert(!html.includes('data-quick-brief'), `${route} should link to Contact instead of showing a form`);
    assert(html.includes(`/contact?service=${encodeURIComponent(detailService.title)}`), `${route} CTA does not lead to Contact`);
    if (route === '/services/custom-software-saas') assert(html.includes('cs-explorer') && html.includes('Customer and admin portals'), 'Custom Software interactive section is missing');
    else if (innerServices.some((service) => service.slug === detailService.slug)) {
      assert(html.includes(`lab-${detailService.visual}`) && html.includes('lab-visual'), `${route} is missing its service-specific interactive visual`);
      assert(html.includes('service-final-section') && html.includes('service-section-link'), `${route} is missing its contextual or final CTA`);
    } else assert(html.includes('sx-explorer') && html.includes('sx-preview'), `${route} is missing its interactive service section`);
  } else assert(html.includes('data-quick-brief'), `${route} did not render the contact form`);
  assert(html.includes('<h1'), `${route} did not render its page heading`);
  if (route === '/') assert(!html.includes('class="inner-circuit"'), 'The home page must keep its original circuit');
  else {
    const circuit = html.match(/<svg class="inner-circuit"[\s\S]*?<\/svg>/)?.[0];
    assert(circuit, `${route} is missing the animated circuit background`);
    assert.equal((circuit.match(/class="base"/g) || []).length, 8, `${route} should use the home page circuit paths`);
    assert.equal((circuit.match(/class="packet"/g) || []).length, 5, `${route} should animate the home page circuit routes`);
  }
  if (route === '/services') assert.equal((html.match(/class="inner-service-card"/g) || []).length, innerServices.length, 'All Services must show the eight requested services');
  if (route === '/services/other') assert(html.includes('React') && html.includes('n8n'), 'Other page must show the platform view');
  if (innerServices.some((service) => route === `/services/${service.slug}`)) {
    assert(html.includes('inner-hero-scene'), `${route} is missing its service hero`);
    assert(html.includes('Types of work') && html.includes('Technology in context'), `${route} is missing detailed service content`);
    assert(html.includes('practice-timeline') && html.includes('practice-line-fill'), `${route} is missing the shared scroll timeline`);
    assert.equal((html.match(/class="practice-card"/g) || []).length, 3, `${route} should show three practice cards`);
    assert(html.includes('class="h2 lab-heading"') && html.includes('class="lab-visual-motion"'), `${route} is missing the stable heading or shared visual motion`);
    assert(html.includes('project-steps-scroll') && html.includes('project-step-visual') && html.includes('inner-related-grid'), `${route} is missing the illustrated steps or compact related cards`);
    assert(html.includes('tech-icon-') && html.includes('growth-panel'), `${route} is missing stack icons or the business-value panel`);
    const service = innerServices.find((item) => route === `/services/${item.slug}`);
    assert(html.includes(`inner-scene-${service.visual}`), `${route} has the wrong hero scene`);
    const motionElement = { web: 'inner-browser-preview-app', cloud: 'inner-cloud-data-packet', agents: 'inner-agent-chat', vision: 'inner-vision-sweep', crm: 'inner-crm-route', workflow: 'inner-workflow-signal', api: 'inner-api-wire', transform: 'inner-transform-arrow' }[service.visual];
    assert(html.includes(motionElement), `${route} is missing its service-specific motion element`);
    if (service.visual === 'cloud') {
      assert.equal((html.match(/class="inner-cloud-node"/g) || []).length, 7, 'Cloud map must show seven connected systems');
      assert(!html.includes('inner-scene-tabs'), 'Cloud map must not show stage tabs');
      const routes = [...html.matchAll(/class="inner-cloud-route" d="([^"]+)"/g)];
      assert.equal(routes.length, 7, 'Cloud map must show seven routes');
      for (const [, path] of routes) {
        const points = [...path.matchAll(/[ML] (\d+) (\d+)/g)].map(([, x, y]) => [Number(x), Number(y)]);
        assert(points.length > 1 && points.every(([x, y], index) => index === 0 || x === points[index - 1][0] || y === points[index - 1][1]), 'Cloud routes must use right-angle turns');
      }
    }
  }
  if (innerIndustries.some((industry) => route === `/industries/${industry.slug}`)) {
    const industry = innerIndustries.find((item) => route === `/industries/${item.slug}`);
    assert(html.includes(`inner-scene-industry-${industry.slug}`), `${route} is missing its industry hero`);
    assert(html.includes('project-steps-scroll') && html.includes('project-step-visual') && html.includes('growth-panel') && html.includes('inner-related-grid'), `${route} is missing its shared storytelling sections`);
    assert(!html.includes('id="project-reference"'), `${route} should not show the generic project-reference band`);
    if (industry.slug === 'healthcare') assert(html.includes('healthcare-practices'), 'healthcare should show practice tabs');
    else if (industry.slug === 'real-estate') assert(html.includes('real-estate-opportunities') && html.includes('Property listings'), 'real estate should show relevant images and opportunity tabs');
    else if (industry.slug === 'sales-lead-generation') assert(html.includes('sales%20chatbot.png'), 'sales should show the supplied sales assistant image');
    else if (industry.slug === 'finance-investment') assert(html.includes('finance-opportunities') && html.includes('dashboard.png'), 'finance should show workflow opportunities and the supplied dashboard');
  }
  if (route === '/services/web-development') assert(html.includes('WordPress') && html.includes('Node.js'), 'web development stack is incomplete');
  if (route === '/services') assert(!html.includes('inner-intro-graph'), 'the generic heading graph returned');
}
window.close();
console.log('Motion startup smoke test passed');
process.exit(0);

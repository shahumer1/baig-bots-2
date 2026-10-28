import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React from 'react';
import { createServer } from 'vite';

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost:5173/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(globalThis, {
  window,
  document: window.document,
  HTMLElement: window.HTMLElement,
  HTMLCanvasElement: window.HTMLCanvasElement,
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
});
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.ResizeObserver = globalThis.ResizeObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback(); } disconnect() {} };
window.IntersectionObserver = globalThis.IntersectionObserver = class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: true }]); } disconnect() {} };
window.HTMLElement.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, right: 550, bottom: 550, width: 550, height: 550 });
const strokes = [];
const moves = [];
let latestArc = 0;
const context = {
  setTransform() {}, clearRect() {}, beginPath() {}, moveTo(x, y) { moves.push([x, y]); }, lineTo() {}, fill() {},
  arc(_x, _y, radius) { latestArc = radius; },
  stroke() { strokes.push({ color: this.strokeStyle, radius: latestArc }); },
  createRadialGradient() { return { addColorStop() {} }; },
};
window.HTMLCanvasElement.prototype.getContext = () => context;

const vite = await createServer({ configLoader: 'runner', optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });
const { KineticGrid } = await vite.ssrLoadModule('/src/components/KineticGrid.jsx');
const { createRoot } = await import('react-dom/client');
const root = createRoot(window.document.getElementById('root'));
root.render(React.createElement('div', { className: 'home-story' }, React.createElement(KineticGrid)));
await new Promise((resolve) => setTimeout(resolve, 80));
assert(window.document.querySelector('.kinetic-grid canvas'), 'grid did not mount');
const baseline = strokes.length;
const baselineMoves = moves.length;
window.dispatchEvent(new window.MouseEvent('pointermove', { clientX: 275, clientY: 275, bubbles: true }));
window.dispatchEvent(new window.MouseEvent('pointerdown', { clientX: 275, clientY: 275, bubbles: true }));
const warped = () => moves.slice(baselineMoves).some(([x, y]) =>
  Math.abs(x / 55 - Math.round(x / 55)) > .02 || Math.abs(y / 55 - Math.round(y / 55)) > .02);
const rippled = () => strokes.slice(baseline).some((stroke) => stroke.radius > 10);
for (let attempt = 0; attempt < 15 && (!warped() || !rippled()); attempt++) {
  await new Promise((resolve) => setTimeout(resolve, 25));
}
assert(strokes.length > baseline, 'grid did not redraw after pointer movement with reduced motion enabled');
assert(warped(), 'grid points did not bend toward the pointer');
assert(rippled(), 'grid did not draw a click ripple');
root.unmount();
await vite.close();
window.close();
console.log('Kinetic grid pointer and ripple smoke test passed with reduced motion enabled');

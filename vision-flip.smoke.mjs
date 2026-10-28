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
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
});

let top = window.innerHeight;
window.HTMLElement.prototype.getBoundingClientRect = function () {
  return { top: this.classList?.contains('home-vision') ? top : 0, left: 0, right: 1200, bottom: top + 1200, width: 1200, height: 1200 };
};
window.IntersectionObserver = globalThis.IntersectionObserver = class { observe() {} disconnect() {} };
Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
  get() { return this.classList?.contains('home-vision') ? window.innerHeight * 2.1 : 0; },
});

const vite = await createServer({ configLoader: 'runner', optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });
const { HomeVision } = await vite.ssrLoadModule('/src/components/HomeVision.jsx');
const { createRoot } = await import('react-dom/client');
const root = createRoot(window.document.getElementById('root'));
root.render(React.createElement(HomeVision));
await new Promise((resolve) => setTimeout(resolve, 250));

const section = window.document.querySelector('.home-vision');
const first = section.querySelector('.vision-flip-strip');
const lastVisible = section.querySelectorAll('.vision-flip-strip')[19];
assert.equal(first.style.getPropertyValue('--strip-angle'), '0.00deg', 'rows should begin in the current theme');
assert.equal(section.style.getPropertyValue('--vision-copy-opacity'), '0.0000', 'text should wait for the flip');

top = -window.innerHeight * .55;
window.dispatchEvent(new window.Event('scroll'));
await new Promise((resolve) => setTimeout(resolve, 1300));
assert(Number.parseFloat(first.style.getPropertyValue('--strip-angle')) > 170, 'top rows did not begin the cascade');
assert(Number.parseFloat(lastVisible.style.getPropertyValue('--strip-angle')) < 170, 'rows should flip in sequence');
assert(Number(section.style.getPropertyValue('--vision-copy-opacity')) < .05, 'text revealed before the row flip finished');

top = -window.innerHeight * 1.2;
window.dispatchEvent(new window.Event('scroll'));
await new Promise((resolve) => setTimeout(resolve, 1300));
assert(Number.parseFloat(first.style.getPropertyValue('--strip-angle')) > 170, 'first row did not flip');
assert(Number.parseFloat(lastVisible.style.getPropertyValue('--strip-angle')) > 170, 'row cascade did not finish');
assert(Number(section.style.getPropertyValue('--vision-copy-opacity')) > .95, 'heading did not reveal after the flip');
assert([...section.querySelectorAll('.vision-fact')].every((fact) => Number(fact.style.getPropertyValue('--fact-opacity')) > .9), 'facts did not reveal');

top = window.innerHeight;
window.dispatchEvent(new window.Event('scroll'));
await new Promise((resolve) => setTimeout(resolve, 1300));
assert(Number.parseFloat(first.style.getPropertyValue('--strip-angle')) < 10, 'scrolling up did not reverse the flip');
assert(Number(section.style.getPropertyValue('--vision-copy-opacity')) < .05, 'text did not hide on reverse scroll');

root.unmount();
await vite.close();
window.close();
console.log('Key facts rows flip, reveal text, and reverse on scroll');

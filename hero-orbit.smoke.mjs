import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { createServer } from 'vite';

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost:5173/', pretendToBeVisual: true });
const { window } = dom;
Object.assign(globalThis, { window, document: window.document, HTMLElement: window.HTMLElement });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: false });
const intervals = [];
window.setInterval = (callback, delay) => { intervals.push({ callback, delay }); return intervals.length; };
window.clearInterval = () => {};
let resize;
window.ResizeObserver = globalThis.ResizeObserver = class {
  constructor(callback) { resize = callback; }
  observe() { resize(); }
  disconnect() {}
};
Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', { get() { return this.classList.contains('hero-opening-gallery') ? 700 : 1440; } });
Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', { get() { return this.classList.contains('hero-opening-gallery') ? 600 : 900; } });
let nextFrame = 0;
const frames = new Map();
const requestFrame = (callback) => { const id = ++nextFrame; frames.set(id, callback); return id; };
const cancelFrame = (id) => frames.delete(id);
window.requestAnimationFrame = globalThis.requestAnimationFrame = requestFrame;
window.cancelAnimationFrame = globalThis.cancelAnimationFrame = cancelFrame;

const vite = await createServer({ configLoader: 'runner', optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { Hero } = await vite.ssrLoadModule('/src/components/Hero.jsx');
  const root = createRoot(window.document.getElementById('root'));
  await act(async () => { root.render(React.createElement(Hero)); });
  const cards = [...window.document.querySelectorAll('.opening-glass-tile:not(.mobile-clone)')];
  assert.equal(cards.length, 6, 'all orbit cards should render');
  assert(window.document.querySelector('.opening-glass-tile.mobile-clone'), 'the mobile slider needs a seamless wrap card');
  assert.equal(cards[3].getAttribute('aria-pressed'), 'true', 'Automation should open first');
  const initialLeft = cards[3].style.left;
  const start = performance.now();
  const advance = async (elapsed) => {
    const callbacks = [...frames.values()];
    frames.clear();
    await act(async () => { callbacks.forEach((callback) => callback(start + elapsed)); });
  };
  await advance(2000);
  assert.equal(cards[3].style.left, initialLeft, 'the featured card should dwell before the orbit moves');
  assert.equal(cards[3].getAttribute('aria-pressed'), 'true', 'Automation should remain open during the dwell');
  await advance(3500);
  assert.equal(cards.filter((card) => card.getAttribute('aria-pressed') === 'true').length, 0, 'the card should close before travel');
  await advance(4900);
  assert.notEqual(cards[3].style.left, initialLeft, 'the orbit should travel smoothly after the break');
  await advance(6000);
  assert.equal(cards[2].getAttribute('aria-pressed'), 'true', 'the next card should open after travel');
  Object.defineProperty(window, 'innerWidth', { value: 390, configurable: true });
  const gallery = window.document.querySelector('.hero-opening-gallery');
  const scrolls = [];
  gallery.scrollTo = (options) => scrolls.push(options);
  const mobileTimer = intervals.find(({ delay }) => delay === 3400);
  assert(mobileTimer, 'mobile slider autoplay was not scheduled');
  await act(async () => { mobileTimer.callback(); });
  assert.equal(scrolls.length, 1, 'mobile slider did not advance automatically');
  assert.equal(scrolls[0].behavior, 'smooth', 'mobile slider should move smoothly');
  await act(async () => { root.unmount(); });
} finally {
  await vite.close();
  window.close();
}
console.log('Hero orbit auto rotation smoke test passed');

import { useEffect, useRef } from 'react';

const CELL = 55;
const INFLUENCE = 260;
const MAX_WARP = 24;

const clamp = (value) => Math.max(0, Math.min(1, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const rgba = (color, alpha) => `rgba(${color.map(Math.round).join(',')},${alpha})`;

export function KineticGrid({ sitewide = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const story = canvas?.closest('.home-story');
    const root = canvas?.closest('#bb') || story;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !host || !root || !context) return;

    const pointer = { x: -9999, y: -9999 };
    const target = { x: -9999, y: -9999 };
    const ripples = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let overStory = false;
    let homeStory = sitewide ? root?.querySelector('.home-story') : null;
    let last = window.performance.now();

    const resize = () => {
      const box = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = box.width;
      height = box.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(window.performance.now());
    };

    const position = (event) => {
      const box = host.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      return x >= 0 && y >= 0 && x <= box.width && y <= box.height ? { x, y } : null;
    };

    const onMove = (event) => {
      const next = position(event);
      if (!next) {
        pointer.x = target.x = -9999;
        pointer.y = target.y = -9999;
        return;
      }
      if (target.x < -1000) Object.assign(pointer, next);
      Object.assign(target, next);
    };

    const onDown = (event) => {
      const next = position(event);
      if (next) {
        if (ripples.length >= 6) ripples.shift();
        ripples.push({ ...next, born: window.performance.now() });
      }
    };

    const draw = (now) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const darkTheme = root.dataset.theme === 'dark';
      const scene = story || (overStory ? homeStory : null);
      const light = scene ? clamp(Number(scene.style.getPropertyValue('--scene-light')) || 0) : darkTheme ? 0 : 1;
      const base = darkTheme
        ? [lerp(255, 112, light), lerp(214, 44, light), lerp(225, 58, light)]
        : [lerp(125, 112, light), lerp(39, 44, light), lerp(52, 58, light)];
      const active = darkTheme
        ? [lerp(255, 168, light), lerp(103, 29, light), lerp(129, 48, light)]
        : [lerp(196, 168, light), lerp(45, 29, light), lerp(67, 48, light)];
      const spacing = Math.max(CELL, Math.sqrt(width * height / 950));
      const cols = Math.max(2, Math.ceil(width / spacing) + 1);
      const rows = Math.max(2, Math.ceil(height / spacing) + 1);
      const stepX = width / (cols - 1);
      const stepY = height / (rows - 1);
      const points = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        for (let col = 0; col < cols; col++) {
          const x = col * stepX;
          const y = row * stepY;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const edge = Math.min(1, col / 1.5, row / 1.5, (cols - 1 - col) / 1.5, (rows - 1 - row) / 1.5);
          const pinned = edge * edge;
          const proximity = clamp(1 - distance / INFLUENCE) * pinned;
          const warp = distance > 0 && distance < INFLUENCE
            ? proximity * proximity * MAX_WARP * Math.min(1, distance / 60)
            : 0;
          let displacedX = x - (dx / (distance || 1)) * warp;
          let displacedY = y - (dy / (distance || 1)) * warp;
          for (const ripple of ripples) {
            const rx = x - ripple.x;
            const ry = y - ripple.y;
            const radius = (now - ripple.born) * .4;
            const difference = Math.hypot(rx, ry) - radius;
            const strength = clamp(1 - Math.abs(difference) / 55) * clamp(1 - (now - ripple.born) / 900) * 18 * pinned;
            displacedX -= (rx / (Math.hypot(rx, ry) || 1)) * strength * Math.sign(difference);
            displacedY -= (ry / (Math.hypot(rx, ry) || 1)) * strength * Math.sign(difference);
          }
          points[row][col] = { x: displacedX, y: displacedY, proximity };
        }
      }

      const segment = (a, b) => {
        const strength = clamp((a.proximity + b.proximity) / 2);
        const color = base.map((channel, index) => lerp(channel, active[index], strength));
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = rgba(color, ((sitewide ? .24 : .14) + strength * .67).toFixed(3));
        context.lineWidth = .8 + strength * .7;
        context.stroke();
      };

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row][col];
          if (col < cols - 1) segment(point, points[row][col + 1]);
          if (row < rows - 1) segment(point, points[row + 1][col]);
          const strength = point.proximity;
          const color = base.map((channel, index) => lerp(channel, active[index], strength));
          if (strength > .35) {
            const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);
            glow.addColorStop(0, rgba(active, (strength * .32).toFixed(3)));
            glow.addColorStop(1, rgba(active, 0));
            context.fillStyle = glow;
            context.beginPath();
            context.arc(point.x, point.y, 10, 0, Math.PI * 2);
            context.fill();
          }
          context.fillStyle = rgba(color, ((sitewide ? .42 : .28) + strength * (sitewide ? .58 : .72)).toFixed(3));
          context.beginPath();
          context.arc(point.x, point.y, 1.65 + strength * 1.6, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (let index = ripples.length - 1; index >= 0; index--) {
        const ripple = ripples[index];
        const age = now - ripple.born;
        if (age > 900) { ripples.splice(index, 1); continue; }
        context.beginPath();
        context.arc(ripple.x, ripple.y, Math.max(0, age * .4), 0, Math.PI * 2);
        context.strokeStyle = rgba(active, ((1 - age / 900) * .68).toFixed(3));
        context.lineWidth = 2;
        context.shadowColor = rgba(active, .7);
        context.shadowBlur = 12;
        context.stroke();
        context.shadowBlur = 0;
      }
    };

    const animate = (now) => {
      const delta = Math.min(50, Math.max(0, now - last));
      last = now;
      const ease = 1 - Math.exp(-delta / 95);
      pointer.x = lerp(pointer.x, target.x, ease);
      pointer.y = lerp(pointer.y, target.y, ease);
      draw(now);
      frame = visible ? requestAnimationFrame(animate) : 0;
    };
    const start = () => { if (visible && !frame) { last = window.performance.now(); frame = requestAnimationFrame(animate); } };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else if (frame) { cancelAnimationFrame(frame); frame = 0; } });
    let storyObserver;
    let mutationObserver;
    const bindStory = () => {
      if (!sitewide || !root.classList.contains('home-page')) return;
      homeStory ||= root.querySelector('.home-story');
      if (!homeStory || storyObserver) return;
      storyObserver = new IntersectionObserver(([entry]) => {
        overStory = entry.isIntersecting;
        draw(window.performance.now());
      });
      storyObserver.observe(homeStory);
      mutationObserver?.disconnect();
    };
    const resizer = new ResizeObserver(resize);
    resizer.observe(host);
    observer.observe(host);
    bindStory();
    if (!homeStory && sitewide && root.classList.contains('home-page')) {
      mutationObserver = new window.MutationObserver(bindStory);
      mutationObserver.observe(root, { childList: true, subtree: true });
    }
    resize();
    start();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      storyObserver?.disconnect();
      mutationObserver?.disconnect();
      resizer.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [sitewide]);

  return <div className={sitewide ? 'kinetic-grid sitewide-grid' : 'kinetic-grid'} aria-hidden="true"><canvas ref={canvasRef} /></div>;
}

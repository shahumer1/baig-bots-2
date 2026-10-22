"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Utility function to convert a hex color string to a normalized RGB array [0-1, 0-1, 0-1]
const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0,
    g = 0,
    b = 0;

  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return [0.4, 0.65, 1];
  }

  return [r / 255, g / 255, b / 255];
};

export interface GlobeMarker {
  location: [number, number];
  size: number;
  color?: [number, number, number];
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
}

const EMPTY_MARKERS: GlobeMarker[] = [];
const EMPTY_ARCS: GlobeArc[] = [];

const interpolateRoute = (from: [number, number], to: [number, number], progress: number): [number, number] => {
  const toVector = ([latitude, longitude]: [number, number]) => {
    const lat = latitude * Math.PI / 180;
    const lon = longitude * Math.PI / 180;
    return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)];
  };
  const start = toVector(from);
  const end = toVector(to);
  const angle = Math.acos(Math.max(-1, Math.min(1, start[0] * end[0] + start[1] * end[1] + start[2] * end[2])));
  const denominator = Math.sin(angle);
  const startWeight = denominator < 0.0001 ? 1 - progress : Math.sin((1 - progress) * angle) / denominator;
  const endWeight = denominator < 0.0001 ? progress : Math.sin(progress * angle) / denominator;
  const x = start[0] * startWeight + end[0] * endWeight;
  const y = start[1] * startWeight + end[1] * endWeight;
  const z = start[2] * startWeight + end[2] * endWeight;
  return [Math.atan2(y, Math.hypot(x, z)) * 180 / Math.PI, Math.atan2(z, x) * 180 / Math.PI];
};

export interface GlobeProps {
  className?: string;
  theta?: number;
  phi?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  arcColor?: [number, number, number] | string;
  animateArcPackets?: boolean;
  
  /** Enable mouse wheel and pinch zoom */
  enableZoom?: boolean;
  /** Minimum zoom scale */
  minScale?: number;
  /** Maximum zoom scale */
  maxScale?: number;
  /** Zoom sensitivity multiplier */
  zoomSensitivity?: number;
  /** Enable auto rotation */
  autoRotate?: boolean;
  /** Auto rotation speed */
  autoRotateSpeed?: number;
}

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  phi = 0,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 24000,
  mapBrightness = 10,
  baseColor = "#ffffff",
  markerColor = "#ff3b30",
  glowColor = "#ffffff",
  markers = EMPTY_MARKERS,
  arcs = EMPTY_ARCS,
  arcColor = "#701018",
  animateArcPackets = false,
  enableZoom = true,
  minScale = 0.4,
  maxScale = 3.5,
  zoomSensitivity = 0.002,
  autoRotate = true,
  autoRotateSpeed = 0.003,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const failedRef = useRef(false);

  // Interaction refs
  const phiRef = useRef(phi);
  const thetaRef = useRef(theta);
  const targetScaleRef = useRef(scale);
  const currentScaleRef = useRef(scale);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  // Synchronize initial prop scale
  useEffect(() => {
    targetScaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frameId = 0;
    let lastFrame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    let lastWidth = 0;
    let lastHeight = 0;

    const stopGlobe = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
      globeRef.current?.destroy();
      globeRef.current = null;
    };

    const renderFrame = (time: number) => {
      if (!globeRef.current) return;
      const frameScale = Math.min((time - (lastFrame || time - 16.7)) / 16.7, 3);
      lastFrame = time;
      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.12;
      if (!isDragging.current && autoRotate) phiRef.current += autoRotateSpeed * frameScale;
      const animatedMarkers = animateArcPackets && !reducedMotion
        ? [
            ...markers.map((marker, index) => ({
              ...marker,
              size: marker.size * (0.94 + 0.06 * Math.sin(time / 650 + index * 1.3)),
            })),
            ...arcs.map((arc, index) => {
              const progress = (time / 6200 + index / arcs.length) % 1;
              return {
                location: interpolateRoute(arc.from, arc.to, progress),
                size: 0.018 * Math.sin(Math.PI * progress),
                color: resolvedArcColor,
              };
            }),
          ]
        : markers;
      globeRef.current.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: currentScaleRef.current,
        ...(animateArcPackets ? { markers: animatedMarkers } : {}),
      });
      frameId = window.requestAnimationFrame(renderFrame);
    };

    // Normalize color props
    const resolvedBaseColor: [number, number, number] =
      typeof baseColor === "string" ? hexToRgbNormalized(baseColor) : baseColor;

    const resolvedMarkerColor: [number, number, number] =
      typeof markerColor === "string" ? hexToRgbNormalized(markerColor) : markerColor;

    const resolvedGlowColor: [number, number, number] =
      typeof glowColor === "string" ? hexToRgbNormalized(glowColor) : glowColor;
    const resolvedArcColor: [number, number, number] =
      typeof arcColor === "string" ? hexToRgbNormalized(arcColor) : arcColor;

    const initGlobe = () => {
      if (failedRef.current) return;
      stopGlobe();

      const rect = canvas.getBoundingClientRect();
      const width = Math.max(100, Math.round(rect.width || 600));
      const height = Math.max(100, Math.round(rect.height || 500));
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2);
      lastWidth = width;
      lastHeight = height;

      try { globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: dark,
        scale: currentScaleRef.current,
        diffuse: diffuse,
        mapSamples: mobile ? Math.min(mapSamples, 11000) : mapSamples,
        mapBrightness: mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 1,
        offset: [0, 0],
        markers: markers,
        arcs: arcs,
        arcColor: resolvedArcColor,
        arcWidth: 0.4,
        arcHeight: 0.14,
        markerElevation: 0.025,
      });
      frameId = window.requestAnimationFrame(renderFrame);
      } catch {
        failedRef.current = true;
        canvas.style.visibility = "hidden";
      }
    };

    // --- Mouse Drag Interaction Handlers ---
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    // --- Mouse Wheel Zoom Interaction Handler ---
    const onWheel = (e: WheelEvent) => {
      if (!enableZoom) return;
      // Allow natural page scrolling; only intercept wheel when user is explicitly zooming with Ctrl/Cmd or dragging
      if (!e.ctrlKey && !e.metaKey && !isDragging.current) {
        return;
      }
      e.preventDefault();
      const zoomDelta = -e.deltaY * zoomSensitivity;
      const nextScale = targetScaleRef.current + zoomDelta;
      targetScaleRef.current = Math.max(minScale, Math.min(maxScale, nextScale));
    };

    // --- Touch Interaction (Drag + Pinch to Zoom) ---
    let touchDistance = 0;
    let initialTouchScale = 1;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastMouseX.current = e.touches[0].clientX;
        lastMouseY.current = e.touches[0].clientY;
      } else if (e.touches.length === 2 && enableZoom) {
        isDragging.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchDistance = Math.hypot(dx, dy);
        initialTouchScale = targetScaleRef.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging.current) {
        const deltaX = e.touches[0].clientX - lastMouseX.current;
        const deltaY = e.touches[0].clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.touches[0].clientX;
        lastMouseY.current = e.touches[0].clientY;
      } else if (e.touches.length === 2 && enableZoom && touchDistance > 0) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = dist / touchDistance;
        const nextScale = initialTouchScale * factor;
        targetScaleRef.current = Math.max(minScale, Math.min(maxScale, nextScale));
      }
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      touchDistance = 0;
    };

    let isVisible = true;
    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          ([entry]) => {
            const visible = entry && entry.isIntersecting;
            isVisible = visible;
            if (visible) {
              if (!globeRef.current) {
                initGlobe();
              }
            } else {
              stopGlobe();
            }
          },
          { rootMargin: "150px" }
        )
      : null;

    if (observer) {
      observer.observe(canvas);
    } else {
      initGlobe();
    }

    // Attach interaction listeners
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      if (isVisible && (Math.round(rect.width) !== lastWidth || Math.round(rect.height) !== lastHeight)) {
        initGlobe();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) {
        observer.disconnect();
      }
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
        canvas.removeEventListener("wheel", onWheel);
        canvas.removeEventListener("touchstart", onTouchStart);
        canvas.removeEventListener("touchmove", onTouchMove);
        canvas.removeEventListener("touchend", onTouchEnd);
      }
      stopGlobe();
    };
  }, [
    theta,
    dark,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    enableZoom,
    minScale,
    maxScale,
    zoomSensitivity,
    autoRotate,
    autoRotateSpeed,
    markers,
    arcs,
    arcColor,
    animateArcPackets,
  ]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default Globe;

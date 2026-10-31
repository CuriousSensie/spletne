"use client";

import { useEffect, useRef, type RefObject } from "react";

export const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/** Maps v from [a, b] to [0, 1], clamped. */
export const range = (v: number, a: number, b: number): number => clamp01((v - a) / (b - a));
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInCubic = (t: number): number => t * t * t;
export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutBack = (t: number): number => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/**
 * Calls `onProgress(p)` (0..1 through the element's pinned scroll range) once per
 * animation frame while scrolling. Callers write styles directly to refs so React
 * doesn't re-render every frame.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress: (p: number) => void): void {
  const cb = useRef(onProgress);
  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    let frame = 0;
    const run = (): void => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      cb.current(span > 0 ? clamp01(-r.top / span) : 0);
    };
    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}

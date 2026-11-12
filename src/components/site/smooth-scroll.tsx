"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Weighted scrolling: a very low lerp and a damped wheel give the page real inertia. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.04, wheelMultiplier: 0.42, touchMultiplier: 0.7, anchors: { offset: 0 } });
    return () => lenis.destroy();
  }, []);

  return null;
}

"use client";

import { useRef, useState } from "react";
import { BrowserFrame, NewSite, OldSite } from "./mini-sites";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <BrowserFrame url="northlinedental.si" className="aspect-[16/10] w-full max-w-3xl">
      <div
        ref={ref}
        className="absolute inset-0 cursor-ew-resize touch-none select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        <OldSite />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <NewSite />
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white">Before</span>
        <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white">After</span>
        <div className="absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" style={{ left: `${pos}%` }}>
          <button
            type="button"
            role="slider"
            aria-label="Compare before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
            }}
            className="absolute top-1/2 left-1/2 grid size-10 -translate-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-[#07172a] shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 16 16">
              <path d="M6 4L2 8l4 4M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </BrowserFrame>
  );
}

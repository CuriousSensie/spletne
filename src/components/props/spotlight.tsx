"use client";

import { useRef } from "react";

/** Cursor spotlight card + magnetic CTA. */
export function Spotlight() {
  const btn = useRef<HTMLAnchorElement>(null);

  return (
    <div
      className="group relative grid h-[26rem] w-full max-w-3xl place-items-center overflow-hidden rounded-xl bg-[#07172a] ring-1 ring-white/10"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
        const b = btn.current;
        if (!b) return;
        const br = b.getBoundingClientRect();
        const dx = e.clientX - (br.left + br.width / 2);
        const dy = e.clientY - (br.top + br.height / 2);
        const near = Math.hypot(dx, dy) < 160;
        b.style.transform = near ? `translate(${dx * 0.28}px, ${dy * 0.28}px)` : "";
      }}
      onPointerLeave={() => {
        if (btn.current) btn.current.style.transform = "";
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--sx) var(--sy), rgb(242 215 178 / 0.16), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: "radial-gradient(rgb(244 241 233 / 0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(220px circle at var(--sx) var(--sy), black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(220px circle at var(--sx) var(--sy), black, transparent 70%)",
        }}
      />
      <div className="relative grid justify-items-center gap-6 text-center text-[#f4f1e9]">
        <p className="max-w-[20ch] text-3xl font-medium tracking-[-0.04em] text-balance sm:text-4xl">Ready to see your website?</p>
        <a
          ref={btn}
          href="#"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-br from-[var(--midnight-ivory)] to-[var(--midnight-ivory-warm)] px-6 text-sm font-medium text-[#07172a] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgb(242_215_178/0.6)] transition-transform duration-300 ease-[var(--ease-smooth-out)]"
        >
          Show me my website
          <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

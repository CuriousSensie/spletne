"use client";

import { useRef, useState } from "react";
import { PROJECTS } from "./projects";
import { clamp01, easeInCubic, useScrollProgress } from "./scroll";
import { DesktopShot, PhoneShot } from "./shots";

const N = PROJECTS.length;

export function ConceptDeck() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useScrollProgress(section, (p) => {
    const s = clamp01(p) * (N - 1); // 0..N-1, last card stays
    PROJECTS.forEach((_, i) => {
      const el = cards.current[i];
      if (!el) return;
      const d = i - s; // >0 upcoming (behind), <0 leaving
      if (d >= 0) {
        const k = Math.min(d, 3);
        el.style.transform = `translate3d(0, ${k * 22}px, 0) scale(${1 - k * 0.055})`;
        el.style.filter = `brightness(${1 - k * 0.18})`;
        el.style.opacity = d > 3 ? "0" : "1";
      } else {
        const t = easeInCubic(clamp01(-d));
        el.style.transform = `translate3d(${t * -8}vw, ${t * -115}vh, 0) rotate(${t * -9}deg) scale(${1 + t * 0.04})`;
        el.style.filter = "none";
        el.style.opacity = "1";
      }
    });
    setActive(Math.min(N - 1, Math.round(s)));
  });

  return (
    <section ref={section} aria-label="Selected work" className="relative h-[460svh] bg-foam text-ink">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-4 pt-6 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">(03) Selected work</p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-ink/55 tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </p>
        </div>
        <div className="relative mx-auto mt-6 w-full max-w-[80rem] flex-1">
          {PROJECTS.map((pr, i) => (
            <article
              key={pr.name}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="absolute inset-0 origin-top overflow-hidden rounded-[1.75rem] text-foam shadow-[0_40px_80px_-40px_rgb(4_16_30/0.7)] will-change-transform"
              style={{ zIndex: N - i, background: `radial-gradient(circle at 85% 15%, color-mix(in oklab, ${pr.color} 82%, white), ${pr.color} 60%)` }}
            >
              <div className="hero-noise absolute inset-0" />
              <div className="relative grid h-full grid-rows-[auto_1fr] gap-5 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:grid-rows-1 md:gap-10 lg:p-12">
                <div className="flex flex-col justify-between gap-4">
                  <div className="grid gap-3">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-foam/60 uppercase">{pr.tag}</p>
                    <h3 className="text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] font-light tracking-[-0.05em]">{pr.name}</h3>
                  </div>
                  <p className="text-xl font-light tracking-[-0.02em] sm:text-3xl">
                    <em className="font-serif font-normal">{pr.result}</em>
                  </p>
                </div>
                <div className="relative min-h-0">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="aspect-[16/10] w-full max-h-full">
                      <DesktopShot theme={pr.theme} url={pr.url} />
                    </div>
                  </div>
                  <PhoneShot theme={pr.theme} className="absolute -right-1 -bottom-2 w-[24%] max-w-36 rotate-[4deg] sm:right-2" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { Caption } from "./caption";
import { PROJECTS } from "./projects";
import { easeOutBack, easeOutCubic, lerp, range, useScrollProgress } from "./scroll";
import { DesktopShot } from "./shots";

/** Final resting slot per frame: positions are responsive Tailwind classes; JS only animates the approach. */
const SLOTS = [
  "left-[4%] top-[18%] w-[80%] rotate-[-3deg] md:left-[5%] md:top-[10%] md:w-[38%] md:rotate-[-2.5deg]",
  "left-[16%] top-[30%] w-[80%] rotate-[2.5deg] md:left-[56%] md:top-[6%] md:w-[34%] md:rotate-[2deg]",
  "left-[6%] top-[42%] w-[80%] rotate-[-1.5deg] md:left-[12%] md:top-[46%] md:w-[30%] md:rotate-[1.5deg]",
  "left-[14%] top-[54%] w-[80%] rotate-[2deg] md:left-[48%] md:top-[40%] md:w-[36%] md:rotate-[-1.5deg]",
] as const;

/** Where each frame starts, in viewport units, plus extra spin. */
const FROM = [
  { x: -115, y: -35, r: -26 },
  { x: 115, y: -55, r: 22 },
  { x: -95, y: 115, r: 18 },
  { x: 105, y: 105, r: -20 },
] as const;

const WINDOW = 0.2;

export function ConceptLand() {
  const section = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useScrollProgress(section, (p) => {
    let landed = 0;
    PROJECTS.forEach((_, i) => {
      const el = frames.current[i];
      if (!el) return;
      const raw = range(p, 0.04 + i * WINDOW, 0.04 + i * WINDOW + WINDOW);
      const t = easeOutBack(raw);
      const f = FROM[i];
      const inv = 1 - t;
      el.style.transform = `translate3d(${f.x * inv}vw, ${f.y * inv}vh, 0) rotate(${f.r * inv}deg) scale(${lerp(1.3, 1, easeOutCubic(raw))})`;
      el.style.filter = raw < 1 ? `blur(${(1 - easeOutCubic(raw)) * 10}px)` : "none";
      el.style.opacity = String(Math.min(1, raw * 5));
      if (raw > 0.55) landed = i;
    });
    setActive(landed);
  });

  return (
    <section ref={section} aria-label="Selected work" className="relative h-[500svh] bg-ink text-foam">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[96rem] justify-between px-5 pt-6 sm:px-8 lg:px-12">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">(03) Selected work</p>
        </div>
        <div className="absolute inset-0 mx-auto max-w-[96rem]">
          {PROJECTS.map((pr, i) => (
            <div
              key={pr.name}
              ref={(el) => {
                frames.current[i] = el;
              }}
              className={`absolute aspect-[16/10] opacity-0 will-change-transform ${SLOTS[i]}`}
              style={{ zIndex: i + 1 }}
            >
              <DesktopShot theme={pr.theme} url={pr.url} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-ink via-ink/80 to-transparent pt-24">
          <div className="mx-auto max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
            <Caption project={PROJECTS[active]} index={active} total={PROJECTS.length} />
          </div>
        </div>
      </div>
    </section>
  );
}

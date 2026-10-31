"use client";

import { useRef, useState } from "react";
import { Caption } from "./caption";
import { PROJECTS } from "./projects";
import { easeInCubic, easeOutBack, easeOutCubic, range, useScrollProgress } from "./scroll";
import { DesktopShot, PhoneShot } from "./shots";

const N = PROJECTS.length;

/** Pieces of each composition: resting position (Tailwind) + entry vector (vw/vh/deg). */
const PIECES = [
  { key: "desktop", pos: "left-1/2 top-[42%] w-[88%] -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[54%]", from: { x: 0, y: 120, r: 6 } },
  { key: "phone", pos: "right-[5%] top-[50%] w-[30%] md:right-[16%] md:top-[38%] md:w-[13%]", from: { x: 120, y: 30, r: 22 } },
  { key: "swatch", pos: "left-[5%] top-[13%] md:left-[13%] md:top-[18%]", from: { x: -120, y: -50, r: -18 } },
  { key: "type", pos: "right-[5%] top-[13%] md:right-[17%] md:top-[14%]", from: { x: 40, y: -120, r: 12 } },
  { key: "result", pos: "left-[5%] top-[66%] md:left-[16%] md:top-[70%]", from: { x: -110, y: 90, r: -10 } },
] as const;

export function ConceptAssemble() {
  const section = useRef<HTMLElement>(null);
  const pieces = useRef<(HTMLDivElement | null)[][]>(PROJECTS.map(() => []));
  const [active, setActive] = useState(0);

  useScrollProgress(section, (p) => {
    const s = p * N;
    PROJECTS.forEach((_, k) => {
      const u = s - k; // local 0..1 for project k
      const last = k === N - 1;
      PIECES.forEach((piece, j) => {
        const el = pieces.current[k][j];
        if (!el) return;
        if (u < -0.02 || (!last && u > 1.02)) {
          el.style.visibility = "hidden";
          return;
        }
        el.style.visibility = "visible";
        const enterRaw = range(u, 0.02 + j * 0.05, 0.34 + j * 0.05);
        const exitRaw = last ? 0 : range(u, 0.8, 1);
        const e = easeOutBack(enterRaw);
        const x = easeInCubic(exitRaw);
        const f = piece.from;
        const inv = 1 - e;
        el.style.transform = `translate3d(${f.x * inv - x * 10}vw, ${f.y * inv - x * 110}vh, 0) rotate(${f.r * inv - x * 8}deg) scale(${1 - x * 0.1})`;
        el.style.opacity = String(Math.min(1, enterRaw * 4) * (1 - exitRaw * 0.6));
        el.style.filter = enterRaw < 1 || exitRaw > 0 ? `blur(${(1 - easeOutCubic(enterRaw)) * 8 + exitRaw * 6}px)` : "none";
      });
    });
    setActive(Math.min(N - 1, Math.max(0, Math.floor(s + 0.1))));
  });

  const bg = PROJECTS[active].color;

  return (
    <section ref={section} aria-label="Selected work" className="relative bg-ink text-foam" style={{ height: `${N * 130}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden transition-colors duration-700" style={{ backgroundColor: bg }}>
        <div className="hero-noise pointer-events-none absolute inset-0" />
        <p className="absolute top-6 left-5 z-20 font-mono text-[11px] tracking-[0.18em] text-mist uppercase sm:left-8 lg:left-12">(03) Selected work</p>
        {PROJECTS.map((pr, k) =>
          PIECES.map((piece, j) => (
            <div
              key={`${pr.name}-${piece.key}`}
              ref={(el) => {
                pieces.current[k][j] = el;
              }}
              className={`invisible absolute will-change-transform ${piece.pos}`}
              style={{ zIndex: j === 0 ? 1 : 2 }}
            >
              {piece.key === "desktop" && (
                <div className="aspect-[16/10] w-full">
                  <DesktopShot theme={pr.theme} url={pr.url} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]" />
                </div>
              )}
              {piece.key === "phone" && <PhoneShot theme={pr.theme} className="w-full rotate-[5deg]" />}
              {piece.key === "swatch" && (
                <div className="flex gap-1.5 rounded-2xl bg-white/90 p-2.5 shadow-xl">
                  {pr.swatches.map((c) => (
                    <span key={c} className="size-7 rounded-lg ring-1 ring-black/10 sm:size-9" style={{ background: c }} />
                  ))}
                </div>
              )}
              {piece.key === "type" && (
                <div className="rounded-2xl bg-white/90 px-4 py-3 text-ink shadow-xl">
                  <p className="text-4xl leading-none font-light tracking-[-0.05em] sm:text-5xl">
                    Aa <em className="font-serif font-normal">Aa</em>
                  </p>
                </div>
              )}
              {piece.key === "result" && (
                <div className="rounded-full bg-foam px-4 py-2 text-sm font-medium text-ink shadow-xl">{pr.result}</div>
              )}
            </div>
          )),
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/50 to-transparent pt-20">
          <div className="mx-auto max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
            <Caption project={PROJECTS[active]} index={active} total={N} />
          </div>
        </div>
      </div>
    </section>
  );
}

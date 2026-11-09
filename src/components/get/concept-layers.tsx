"use client";

import { useRef, useState, type ReactNode } from "react";
import { NewSite } from "@/components/props/mini-sites";
import { clamp01, easeInOutCubic, range, useScrollProgress } from "@/components/work/scroll";

/**
 * Concept B: the site, taken apart.
 * One finished homepage tilts into an isometric view and separates into the layers you get,
 * foundation up. Scrolling walks through them; the active layer lifts and is named.
 */

interface Layer {
  name: string;
  line: string;
  face: ReactNode;
}

const LAYERS: readonly Layer[] = [
  {
    name: "Domain & hosting",
    line: "Registered in your name. You hold the keys.",
    face: (
      <div className="flex size-full flex-col justify-between bg-[#0a1e33] p-[6%] font-mono text-foam">
        <span className="text-[clamp(8px,1.1vw,12px)] tracking-[0.16em] text-mist uppercase">Owner · Northline Dental d.o.o.</span>
        <span className="text-[clamp(14px,2.6vw,30px)] tracking-[-0.02em]">northlinedental.si</span>
        <span className="flex gap-4 text-[clamp(7px,0.9vw,10px)] tracking-[0.14em] text-foam/60 uppercase">
          <span>● SSL active</span>
          <span>● Hosting · EU</span>
          <span>● Backups daily</span>
        </span>
      </div>
    ),
  },
  {
    name: "Code",
    line: "Hand-built, fast, and handed over in full.",
    face: (
      <div className="grid size-full content-start gap-[3%] bg-[#04101e] p-[6%] font-mono text-[clamp(7px,1vw,12px)] leading-relaxed">
        {[
          ["#7fe0b0", "<header>", "#b8c9d8", ' class="site"'],
          ["#f2d7b2", "  <h1>", "#eef3f6", "Gentle care, booked in seconds."],
          ["#7fe0b0", "  <a", "#b8c9d8", ' href="/book">Book a visit</a>'],
          ["#7fe0b0", "</header>", "#b8c9d8", ""],
          ["#f2d7b2", "<script", "#b8c9d8", ' type="application/ld+json">'],
          ["#b8c9d8", '  { "@type": "Dentist",', "#b8c9d8", ""],
        ].map(([c1, t1, c2, t2], i) => (
          <span key={i} className="truncate">
            <span style={{ color: c1 }}>{t1}</span>
            <span style={{ color: c2 }}>{t2}</span>
          </span>
        ))}
      </div>
    ),
  },
  {
    name: "Structure",
    line: "Built the way Google reads, so people nearby find you.",
    face: (
      <div className="grid size-full grid-rows-[auto_1fr_auto] gap-[3%] bg-white p-[5%] font-mono text-[clamp(7px,0.9vw,10px)] tracking-[0.12em] text-[#1f4f75] uppercase">
        <span className="rounded border border-dashed border-current px-2 py-1.5">nav</span>
        <span className="grid grid-cols-[3fr_2fr] gap-[3%]">
          <span className="grid content-start gap-2 rounded border border-dashed border-current p-2">
            h1
            <span className="h-2 w-4/5 rounded-full bg-current opacity-20" />
            <span className="h-2 w-3/5 rounded-full bg-current opacity-20" />
          </span>
          <span className="rounded border border-dashed border-current p-2">img · alt</span>
        </span>
        <span className="grid grid-cols-3 gap-[3%]">
          {["h2", "h2", "h2"].map((h, i) => (
            <span key={i} className="rounded border border-dashed border-current px-2 py-1.5">
              {h}
            </span>
          ))}
        </span>
      </div>
    ),
  },
  {
    name: "Words",
    line: "Written with you, from how your customers talk.",
    face: (
      <div className="grid size-full content-center gap-[4%] bg-[#f4efe6] p-[8%] text-[#07172a]">
        <span className="text-[clamp(14px,2.6vw,30px)] leading-[1.05] font-light tracking-[-0.03em]">Gentle care, booked in seconds.</span>
        <span className="text-[clamp(8px,1.1vw,13px)] text-[#07172a]/60">Family dentistry in the heart of Ljubljana.</span>
        <span className="font-serif text-[clamp(9px,1.2vw,14px)] text-[#b4442f] italic line-through decoration-1 opacity-70">Leading provider of innovative dental solutions</span>
      </div>
    ),
  },
  {
    name: "Design",
    line: "Made for your business. Not a template.",
    face: <NewSite theme="dental" />,
  },
];

const N = LAYERS.length;

export function ConceptLayers() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(N - 1);

  useScrollProgress(section, (p) => {
    const tilt = easeInOutCubic(range(p, 0.02, 0.22));
    const spread = easeInOutCubic(range(p, 0.12, 0.32));
    // Walk the layers top (design) to bottom (domain).
    const walk = range(p, 0.3, 0.95) * N;
    const focus = Math.min(N - 1, Math.floor(walk));
    const current = N - 1 - focus;
    if (stage.current) stage.current.style.transform = `rotateX(${tilt * 58}deg) rotateZ(${tilt * -38}deg) scale(${1 - tilt * 0.18})`;
    layers.current.forEach((el, i) => {
      if (!el) return;
      const lift = p > 0.3 && i === current ? 1 : 0;
      el.style.transform = `translateZ(${i * spread * 70 + lift * 26}px)`;
      el.style.opacity = String(p > 0.3 ? (i === current ? 1 : clamp01(0.35 + (i > current ? 0.1 : 0.25))) : 1);
    });
    setActive(p > 0.3 ? current : -1);
  });

  return (
    <section ref={section} className="relative h-[460svh] bg-ink text-foam">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[96rem] px-5 pt-8 sm:px-8 sm:pt-12 lg:px-12">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">(05) What you get</p>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(1.85rem,4.6vw,3.6rem)] leading-[1.02] font-light tracking-[-0.045em]">
            Every layer is <em className="font-serif font-normal">yours.</em>
          </h2>
        </div>

        <div className="relative mx-auto grid w-full max-w-[96rem] flex-1 items-center gap-6 px-5 sm:px-8 md:grid-cols-12 lg:px-12">
          <div className="grid place-items-center [perspective:2200px] md:col-span-8">
            <div ref={stage} className="relative aspect-[16/10] w-[min(78vw,46rem,calc((100svh-18rem)*1.6))] [transform-style:preserve-3d]">
              {LAYERS.map((l, i) => (
                <div
                  key={l.name}
                  ref={(el) => {
                    layers.current[i] = el;
                  }}
                  className="absolute inset-0 overflow-hidden rounded-lg shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-foam/15 transition-opacity duration-300"
                >
                  {l.face}
                </div>
              ))}
            </div>
          </div>

          <ol className="grid gap-1 pb-8 md:col-span-4 md:pb-0">
            {[...LAYERS].reverse().map((l, ri) => {
              const i = N - 1 - ri;
              const on = active === i;
              return (
                <li key={l.name} className={`border-t border-foam/12 py-3 transition-colors duration-300 ${on ? "text-foam" : "text-foam/35"} ${active >= 0 && !on ? "max-md:hidden" : ""}`}>
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tracking-[0.14em] tabular-nums">{String(ri + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(1.2rem,2vw,1.6rem)] font-light tracking-[-0.03em]">{l.name}</span>
                  </p>
                  <p className={`grid pl-8 text-[15px] text-foam/60 transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <span className="overflow-hidden">{l.line}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, type ReactNode } from "react";
import { MobileSite } from "@/components/props/mini-sites";
import { easeInOutCubic, range, useScrollProgress } from "@/components/work/scroll";

/**
 * Concept D: the handover kit.
 * Everything you get, as objects tossed on a desk. Scrolling tidies them into a neat flat-lay
 * (knolling), then each object gets its caption.
 */

interface Item {
  label: string;
  note: string;
  /** Scattered start: offset in % of the item's cell, rotation in deg. */
  from: { x: number; y: number; r: number };
  object: ReactNode;
}

const ITEMS: readonly Item[] = [
  {
    label: "Your domain",
    note: "Registered in your name.",
    from: { x: 90, y: 60, r: -32 },
    object: (
      <div className="relative w-[78%] rounded-2xl bg-[#f2d7b2] px-5 pt-9 pb-5 text-ink shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)]">
        <span className="absolute top-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-deep ring-2 ring-ink/20" />
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-60">Key · domain</p>
        <p className="mt-1 text-[clamp(13px,1.5vw,18px)] tracking-[-0.02em]">northlinedental.si</p>
      </div>
    ),
  },
  {
    label: "The site",
    note: "On every screen, tested on real phones.",
    from: { x: 20, y: 110, r: 24 },
    object: (
      <div className="aspect-[9/19] w-[42%] overflow-hidden rounded-[1.2rem] shadow-[0_20px_40px_-15px_rgb(0_0_0/0.7)] ring-[5px] ring-[#0b0f14]">
        <MobileSite theme="dental" />
      </div>
    ),
  },
  {
    label: "The code",
    note: "Handed over in full. Yours to keep.",
    from: { x: -80, y: 70, r: 18 },
    object: (
      <div className="grid w-[78%] gap-1.5 rounded-xl bg-[#04101e] p-4 font-mono text-[clamp(8px,0.9vw,11px)] shadow-[0_20px_40px_-15px_rgb(0_0_0/0.7)] ring-1 ring-foam/10">
        <span className="text-[#7fe0b0]">&lt;main&gt;</span>
        <span className="pl-3 text-foam/80">&lt;h1&gt;Gentle care…&lt;/h1&gt;</span>
        <span className="pl-3 text-mist/70">&lt;a href=&quot;/book&quot;&gt;</span>
        <span className="text-[#7fe0b0]">&lt;/main&gt;</span>
      </div>
    ),
  },
  {
    label: "A handover guide",
    note: "How to change text and photos yourself.",
    from: { x: 70, y: -90, r: -20 },
    object: (
      <div className="aspect-[3/4] w-[46%] rounded-r-lg rounded-l-sm bg-foam p-3 text-ink shadow-[inset_6px_0_0_rgb(4_16_30/0.12),0_20px_40px_-15px_rgb(0_0_0/0.6)]">
        <p className="font-mono text-[8px] tracking-[0.16em] uppercase opacity-50">Guide</p>
        <p className="mt-2 font-serif text-[clamp(14px,1.6vw,20px)] leading-[1.05] italic">Your site, explained.</p>
      </div>
    ),
  },
  {
    label: "30 days of changes",
    note: "After launch, on the Studio plan.",
    from: { x: -40, y: -120, r: 36 },
    object: (
      <div className="relative flex w-[82%] items-stretch rounded-lg bg-mist text-ink shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)]">
        <div className="flex-1 p-4">
          <p className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-60">Admit · changes</p>
          <p className="mt-1 text-[clamp(18px,2.2vw,28px)] leading-none font-light tracking-[-0.04em]">30 days</p>
        </div>
        <div className="grid w-[28%] place-items-center border-l-2 border-dashed border-ink/25 font-mono text-[9px] tracking-[0.14em] uppercase [writing-mode:vertical-rl]">No. 001</div>
      </div>
    ),
  },
  {
    label: "The receipt",
    note: "Paid at launch, only if you love it.",
    from: { x: -100, y: -40, r: -14 },
    object: (
      <div className="w-[56%] bg-white px-4 pt-4 pb-6 font-mono text-[clamp(8px,0.9vw,11px)] text-ink shadow-[0_20px_40px_-15px_rgb(0_0_0/0.6)] [mask-image:linear-gradient(black_calc(100%-8px),transparent_calc(100%-8px)),radial-gradient(circle_at_6px_100%,transparent_5px,black_5.5px)] [mask-size:100%_100%,12px_8px] [mask-position:0_0,0_100%] [mask-repeat:no-repeat,repeat-x]">
        <p className="tracking-[0.16em] uppercase opacity-60">Spletne</p>
        <p className="mt-3 flex justify-between">
          <span>Preview</span>
          <span>€0</span>
        </p>
        <p className="flex justify-between">
          <span>Revisions</span>
          <span>€0</span>
        </p>
        <p className="mt-2 flex justify-between border-t border-dashed border-ink/30 pt-2 font-medium">
          <span>Due today</span>
          <span>€0.00</span>
        </p>
      </div>
    ),
  },
];

export function ConceptKit() {
  const section = useRef<HTMLElement>(null);
  const objects = useRef<(HTMLDivElement | null)[]>([]);
  const captions = useRef<(HTMLDivElement | null)[]>([]);

  useScrollProgress(section, (p) => {
    ITEMS.forEach((it, i) => {
      // Each object tidies itself a little after the previous one.
      const t = easeInOutCubic(range(p, 0.05 + i * 0.06, 0.45 + i * 0.06));
      const o = objects.current[i];
      if (o) o.style.transform = `translate3d(${(1 - t) * it.from.x}%, ${(1 - t) * it.from.y}%, 0) rotate(${(1 - t) * it.from.r}deg)`;
      const c = captions.current[i];
      if (c) {
        const s = range(p, 0.78 + i * 0.02, 0.86 + i * 0.02);
        c.style.opacity = String(s);
        c.style.transform = `translateY(${(1 - s) * 8}px)`;
      }
    });
  });

  return (
    <section ref={section} className="relative h-[320svh] bg-deep text-foam">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* Desk surface: faint cutting-mat grid. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(to right, #eef3f6 1px, transparent 1px), linear-gradient(to bottom, #eef3f6 1px, transparent 1px)", backgroundSize: "3rem 3rem" }}
        />
        <div className="relative mx-auto w-full max-w-[96rem] px-5 pt-8 sm:px-8 sm:pt-12 lg:px-12">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">(05) What you get</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4.6vw,3.6rem)] leading-[1.02] font-light tracking-[-0.045em]">
            Everything we hand <em className="font-serif font-normal">over.</em>
          </h2>
        </div>

        <ul className="relative mx-auto grid w-full max-w-[80rem] flex-1 grid-cols-2 grid-rows-3 gap-x-4 gap-y-2 px-5 py-6 sm:px-8 md:grid-cols-3 md:grid-rows-2 md:gap-x-10 md:py-10 lg:px-12">
          {ITEMS.map((it, i) => (
            <li key={it.label} className="relative grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3">
              <div
                ref={(el) => {
                  objects.current[i] = el;
                }}
                className="grid min-h-0 place-items-center will-change-transform"
              >
                {it.object}
              </div>
              <div
                ref={(el) => {
                  captions.current[i] = el;
                }}
                className="grid gap-0.5 border-t border-foam/15 pt-2 opacity-0"
              >
                <p className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-mist tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(0.95rem,1.4vw,1.15rem)] font-light tracking-[-0.02em]">{it.label}</span>
                </p>
                <p className="hidden text-[13px] text-foam/55 sm:block">{it.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

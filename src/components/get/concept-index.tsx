"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CopyEdit, DirectLine, ScoreRing, SearchSnippet } from "./proofs";
import { MobileSite } from "@/components/props/mini-sites";

/**
 * Concept C: an editorial index.
 * Six large lines, one per thing you get. Hover (or, on touch, scroll a line to the centre) and a
 * small live proof follows the cursor: the score, the search result, the rewrite, the reply.
 */

interface Entry {
  title: ReactNode;
  plain: string;
  line: string;
  proof: (run: boolean) => ReactNode;
}

function KeyTag() {
  return (
    <div className="grid gap-3 rounded-2xl bg-[#f4efe6] p-5 text-[#07172a]">
      <span className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-60">Registrant</span>
      <span className="text-xl font-light tracking-[-0.02em]">Northline Dental d.o.o.</span>
      <span className="h-px bg-current opacity-15" />
      <span className="flex justify-between font-mono text-[11px] tracking-[0.08em]">
        <span>northlinedental.si</span>
        <span className="opacity-60">Yours</span>
      </span>
    </div>
  );
}

const ENTRIES: readonly Entry[] = [
  {
    title: <>A design that&apos;s <em className="font-serif font-normal">yours</em></>,
    plain: "A design that's yours",
    line: "Made for your business, not adapted from a template.",
    proof: () => (
      <div className="mx-auto aspect-[9/19] w-40 overflow-hidden rounded-[1.4rem] ring-4 ring-[#0b0f14]">
        <MobileSite theme="salon" />
      </div>
    ),
  },
  {
    title: <>Words that <em className="font-serif font-normal">sound like you</em></>,
    plain: "Words that sound like you",
    line: "Written with you. No filler, no AI slop.",
    proof: (run) => <CopyEdit run={run} />,
  },
  { title: <>Opens in under a <em className="font-serif font-normal">second</em></>, plain: "Opens in under a second", line: "Tested on real phones, on mobile data.", proof: (run) => <ScoreRing run={run} /> },
  { title: <>Found <em className="font-serif font-normal">nearby</em></>, plain: "Found nearby", line: "Set up for local search and your Google profile.", proof: (run) => <SearchSnippet run={run} /> },
  { title: <>Owned by <em className="font-serif font-normal">you</em></>, plain: "Owned by you", line: "Domain, hosting and code, in your name.", proof: () => <KeyTag /> },
  { title: <>One person, <em className="font-serif font-normal">start to finish</em></>, plain: "One person, start to finish", line: "You talk to the designer, not a ticket queue.", proof: (run) => <DirectLine run={run} /> },
];

export function ConceptIndex() {
  const [active, setActive] = useState<number | null>(null);
  const [hoverable, setHoverable] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const target = useRef({ x: 0, y: 0 });

  // Cursor-following preview with a little lag (desktop only).
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = (): void => setHoverable(mq.matches);
    const id = requestAnimationFrame(sync);
    mq.addEventListener("change", sync);
    let raf = 0;
    const pos = { x: 0, y: 0 };
    const tick = (): void => {
      pos.x += (target.current.x - pos.x) * 0.16;
      pos.y += (target.current.y - pos.y) * 0.16;
      if (card.current) card.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${(target.current.x - pos.x) * 0.04}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
    };
  }, []);

  // Touch: the row crossing the middle of the screen is the active one.
  useEffect(() => {
    if (hoverable) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [hoverable]);

  return (
    <section
      className="relative bg-foam text-ink"
      onPointerMove={(e) => {
        target.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="grid gap-4">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">(05) What you get</p>
            <h2 className="text-[clamp(1.85rem,4.6vw,3.6rem)] leading-[1.02] font-light tracking-[-0.045em]">
              Six things, <em className="font-serif font-normal">every time.</em>
            </h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink/45 uppercase">On either plan</p>
        </div>

        <ol className="mt-14 border-t border-ink/12" onPointerLeave={() => hoverable && setActive(null)}>
          {ENTRIES.map((en, i) => {
            const on = active === i;
            const dim = active !== null && !on;
            return (
              <li
                key={en.plain}
                data-i={i}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                onPointerEnter={() => hoverable && setActive(i)}
                className="border-b border-ink/12"
              >
                <div className="grid items-baseline gap-x-8 gap-y-2 py-5 sm:py-7 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,22rem)]">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-ink/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3
                    className={`text-[clamp(1.9rem,5.6vw,5rem)] leading-[0.98] font-light tracking-[-0.05em] transition-[opacity,translate] duration-500 ease-[var(--ease-smooth-out)] ${
                      dim ? "opacity-25" : "opacity-100"
                    } ${on ? "md:translate-x-4" : ""}`}
                  >
                    {en.title}
                  </h3>
                  <p className={`text-[15px] leading-snug text-ink/60 transition-opacity duration-500 ${on || active === null ? "opacity-100" : "opacity-40"}`}>{en.line}</p>
                </div>
                {/* Touch: the proof opens inline under the active line. */}
                {!hoverable && (
                  <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="mb-6 rounded-[1.5rem] bg-ink p-5 text-foam">{en.proof(on)}</div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {hoverable && (
        <div
          ref={card}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 w-[22rem] rounded-[1.5rem] bg-ink p-5 text-foam shadow-[0_40px_80px_-30px_rgb(4_16_30/0.7)] transition-[opacity,scale] duration-300 ${
            active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {ENTRIES.map((en, i) => (
            <div key={en.plain} className={active === i ? "block" : "hidden"}>
              {en.proof(active === i)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useRef } from "react";
import { range, useScrollProgress } from "@/components/work/scroll";

/**
 * Concept A: the guarantee, as a signed letter.
 * Scrolling writes the letter word by word; margin notes pin what you get to the sentence that promises it;
 * the signature draws itself and a "Due today €0.00" stamp lands last.
 */

const PARAGRAPHS: readonly { text: string; note?: string }[] = [
  { text: "Before you pay anything, you’ll have a working website in your hands. Click through it, show it to your team, open it on your phone." },
  { text: "If you love it, everything is yours: the design, the words we write together, the domain, the hosting and the code.", note: "Design · Copy · Domain · Hosting · Code" },
  { text: "It will open in under a second on any phone, and it’ll be set up so people nearby find you on Google.", note: "Speed · Search" },
  { text: "And if you don’t love it, you owe us nothing. Not a deposit, not an hour.", note: "€0 risk" },
];

const WORDS = PARAGRAPHS.map((p) => p.text.split(" "));
const TOTAL = WORDS.reduce((n, w) => n + w.length, 0);

export function ConceptLetter() {
  const section = useRef<HTMLElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const notes = useRef<(HTMLElement | null)[]>([]);
  const sig = useRef<SVGPathElement>(null);
  const stamp = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    const write = range(p, 0.05, 0.7) * TOTAL;
    words.current.forEach((w, i) => {
      w.style.opacity = String(0.14 + 0.86 * Math.min(1, Math.max(0, write - i)));
    });
    let start = 0;
    WORDS.forEach((w, i) => {
      const n = notes.current[i];
      if (n) {
        const on = write > start + w.length * 0.6;
        n.style.opacity = on ? "1" : "0";
        n.style.transform = on ? "none" : "translateX(-8px)";
      }
      start += w.length;
    });
    if (sig.current) sig.current.style.strokeDashoffset = String(1 - range(p, 0.72, 0.86));
    const s = range(p, 0.86, 0.93);
    if (stamp.current) {
      stamp.current.style.opacity = String(s > 0 ? 1 : 0);
      stamp.current.style.transform = `rotate(-9deg) scale(${1.6 - 0.6 * s})`;
    }
  });

  let k = 0;
  return (
    <section ref={section} className="relative h-[320svh] bg-foam text-ink">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[96rem] gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
          <div className="grid content-start gap-4 lg:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">(05) What you get</p>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.02] font-light tracking-[-0.045em]">
              In <em className="font-serif font-normal">writing.</em>
            </h2>
          </div>

          <div className="relative lg:col-span-6">
            <article className="relative rotate-[-0.6deg] rounded-sm bg-[#fffdf8] px-6 py-8 shadow-[0_1px_0_rgb(0_0_0/0.04),0_30px_60px_-30px_rgb(4_16_30/0.35)] ring-1 ring-ink/[0.06] sm:px-12 sm:py-12">
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink/45 uppercase">Ljubljana · a promise</p>
              <p className="mt-6 font-serif text-[clamp(1.25rem,2vw,1.6rem)] italic">Dear business owner,</p>
              <div className="mt-4 grid gap-4 text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.55] font-light tracking-[-0.01em]">
                {WORDS.map((ws, pi) => (
                  <p key={pi}>
                    {ws.map((w) => {
                      const idx = k++;
                      return (
                        <span
                          key={idx}
                          ref={(el) => {
                            if (el) words.current[idx] = el;
                          }}
                          className="transition-opacity duration-150"
                          style={{ opacity: 0.14 }}
                        >
                          {w}{" "}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-serif text-[clamp(1.1rem,1.6vw,1.35rem)] italic">Yours,</p>
              <svg viewBox="0 0 240 70" className="mt-1 h-14 w-48 text-ink" aria-label="Signed, Spletne">
                <path
                  ref={sig}
                  pathLength={1}
                  d="M8 48c10-26 18-38 22-34s-8 34-10 40c6-14 22-20 26-10s-12 16-16 10c10-2 20-10 26-18 3 10-4 16 2 16s12-12 16-18c-6 4-10 14-4 16s14-12 18-16c-2 8-12 34-14 40 4-14 12-30 20-30s2 16-6 14c8 0 14-8 18-12 0 6 0 10 6 8s10-18 14-30c-2 10-6 26-4 30 4-6 12-14 18-12-6 2-10 8-6 10s10-4 14-8c-4 2-6 8-2 10 8 2 30-6 60-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1"
                  style={{ strokeDashoffset: 1 }}
                />
              </svg>
              <p className="font-mono text-[10px] tracking-[0.16em] text-ink/45 uppercase">Spletne studio</p>

              <div
                ref={stamp}
                aria-label="Due today: 0 euro"
                className="absolute right-5 bottom-8 grid place-items-center rounded-md border-2 border-[#b4442f] px-4 py-2 text-center font-mono text-[#b4442f] uppercase opacity-0 mix-blend-multiply sm:right-10 sm:bottom-12"
              >
                <span className="text-[9px] tracking-[0.2em]">Due today</span>
                <span className="text-xl tracking-[0.04em]">€0.00</span>
              </div>
            </article>
          </div>

          {/* Margin notes: what you get, tied to the sentence that promises it. */}
          <ol className="hidden content-center gap-10 lg:col-span-3 lg:grid">
            {PARAGRAPHS.map((pg, i) =>
              pg.note ? (
                <li
                  key={i}
                  ref={(el) => {
                    notes.current[i] = el;
                  }}
                  className="flex items-start gap-3 opacity-0 transition-[opacity,transform] duration-500"
                >
                  <span className="mt-2 h-px w-8 bg-ink/40" />
                  <span className="font-mono text-[11px] leading-relaxed tracking-[0.14em] text-ink/70 uppercase">{pg.note}</span>
                </li>
              ) : (
                <li key={i} aria-hidden="true" />
              ),
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}

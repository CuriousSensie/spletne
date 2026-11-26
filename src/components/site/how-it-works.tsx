"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { ASSEMBLE, CONTOURS, LIFTOFF, PACKETS, TAPS } from "@/components/shaders/library";
import { PALETTES, type Palette } from "@/components/shaders/palettes";
import { home } from "@/content/home";
import { EmTitle } from "./em-title";
import { ScrollCue } from "./scroll-cue";

/** Copy lives in content/home.ts; each step adds its background graphic. */
const VISUALS: readonly { frag: string; palette: Palette }[] = [
  { frag: PACKETS, palette: PALETTES.ocean },
  { frag: ASSEMBLE, palette: PALETTES.ocean },
  { frag: LIFTOFF, palette: PALETTES.launch },
  { frag: TAPS, palette: PALETTES.ocean },
];
const t = home.howItWorks;
const STEPS = t.steps.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0"), ...VISUALS[i] }));

const COUNT = STEPS.length;
const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? clamp01(-r.top / span) : 0;
      stickyRef.current?.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(COUNT - 1, Math.floor(p * COUNT)));
    };
    const onScroll = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /** Clicking a card scrolls to the start of its slice of the pinned range. */
  const goTo = useCallback((i: number): void => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    window.scrollTo({ top: window.scrollY + r.top + span * (i === 0 ? 0 : i / COUNT + 0.02), behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-title" className="relative h-[210svh] bg-foam text-ink">
      <div ref={stickyRef} className="sticky top-0 isolate flex h-svh flex-col overflow-hidden [--p:0]">
        <div className="mx-auto flex h-full w-full max-w-[96rem] flex-col justify-center gap-6 px-5 pt-8 pb-20 sm:gap-10 sm:px-8 lg:px-12">
          <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div className="grid gap-3">
              <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">{t.label}</p>
              <h2 id="process-title" className="max-w-[18ch] text-[clamp(1.7rem,5vw,3.5rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance">
                <EmTitle title={t.title} />
              </h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink/55 uppercase tabular-nums" aria-live="polite">
              {t.stepWord} {active + 1} / {COUNT}
            </p>
          </header>

          <ol ref={rowRef} className="flex h-[min(68svh,40rem)] flex-col gap-2 md:h-[min(58svh,34rem)] md:flex-row md:gap-3">
            {STEPS.map((s, i) => {
              const on = i === active;
              const reached = i <= active;
              const fill = `clamp(0, calc(var(--p) * ${COUNT} - ${i}), 1)`;
              return (
                <li
                  key={s.n}
                  className="relative flex min-h-14 min-w-0 flex-col pl-7 transition-[flex-grow] duration-700 ease-[var(--ease-smooth-out)] md:pt-7 md:pl-0"
                  style={{ flexGrow: on ? 3.4 : 1, flexBasis: 0 }}
                >
                  {/* Timeline rail: vertical on mobile, horizontal on md+. Each card owns its segment so the rail tracks resizing cards. */}
                  <span aria-hidden="true" className="absolute top-0 bottom-[-0.5rem] left-[7px] w-px bg-ink/15 md:right-[-0.75rem] md:bottom-auto md:left-0 md:h-px md:w-auto">
                    <span className="absolute inset-0 origin-top bg-ink md:origin-left max-md:[transform:scaleY(var(--fill))] md:[transform:scaleX(var(--fill))]" style={{ "--fill": fill } as React.CSSProperties} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute top-4 left-0 size-[15px] rounded-full border transition-all duration-500 md:-top-[7px] ${
                      reached ? "border-ink bg-ink" : "border-ink/30 bg-foam"
                    } ${on ? "shadow-[0_0_0_5px_rgb(4_16_30/0.12)]" : ""}`}
                  />

                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={on ? "step" : undefined}
                    className={`group relative flex min-h-0 flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl text-left ring-1 transition-[background-color,color,box-shadow] duration-500 outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      on ? "bg-ink text-foam shadow-[0_30px_60px_-30px_rgb(4_16_30/0.6)] ring-transparent" : "bg-white text-ink ring-ink/10 hover:ring-ink/30"
                    }`}
                  >
                    {/* Both layers stay mounted and cross-fade; inactive canvases pause on their last frame. */}
                    <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ease-[var(--ease-smooth-out)] ${on ? "opacity-0" : "opacity-[0.18]"}`}>
                      <ShaderCanvas frag={CONTOURS} palette={PALETTES.lines} speed={0.25} scale={1} anchor={rowRef} syncTime active={!on} />
                    </span>
                    <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ease-[var(--ease-smooth-out)] ${on ? "opacity-[0.14]" : "opacity-0"}`}>
                      <ShaderCanvas frag={s.frag} palette={s.palette} speed={1} scale={1} active={on} />
                    </span>
                    <span className="relative flex h-full flex-col justify-between gap-3 p-4 sm:p-5 lg:p-6">
                      <span className={`hidden items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase md:flex ${on ? "text-mist" : "text-ink/50"}`}>
                        <span>{s.n}</span>
                        <span className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>{s.meta}</span>
                      </span>
                      <span className="mt-auto grid gap-2">
                        <span
                          className={`font-light tracking-[-0.035em] text-balance transition-[font-size] duration-500 ${
                            on ? "text-[clamp(1.35rem,2.6vw,2.2rem)] leading-[1.02]" : "text-[17px] leading-tight md:text-xl"
                          }`}
                        >
                          <span className={`mr-2 font-mono text-[11px] tracking-[0.16em] md:hidden ${on ? "text-mist" : "text-ink/50"}`}>{s.n}</span>
                          {s.title}
                        </span>
                        <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-smooth-out)] ${on ? "grid-rows-[1fr] opacity-100 delay-150" : "grid-rows-[0fr] opacity-0"}`}>
                          <span className="overflow-hidden">
                            <span className="block max-w-[56ch] pt-1 text-[13.5px] leading-snug text-foam/85 sm:text-[15px] lg:text-base lg:leading-relaxed">{s.body}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Jumps past the pinned steps; Lenis rolls it to exactly where the next section starts. */}
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[96rem] px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12">
          <ScrollCue href="#pricing" label={home.common.scroll} className="text-ink/55 hover:text-ink" />
        </div>
      </div>
    </section>
  );
}

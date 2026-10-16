"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MATERIALS = ["Logo", "Photos", "Menu", "Hours", "Reviews", "Services"] as const;

const STEPS = [
  "Brand and photos from your materials",
  "Services, hours and contact details",
  "Reviews and what sets you apart",
] as const;

const BRIEF_POINTS = [
  "Clear services and pricing ranges.",
  "One-tap call and booking on mobile.",
  "Fast, accessible, and yours to keep.",
] as const;

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

function Arrow() {
  return (
    <svg aria-hidden="true" className="size-[18px] text-[#07172a]/60 lg:hidden" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 16 16">
      <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:block" aria-hidden="true">
      <svg className="h-3 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0 5H100" fill="none" stroke="#07172a26" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <g className="flow-line" data-active={active}>
          <path className="flow-trace" d="M0 5H100" fill="none" stroke="#07172a" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}

export function Process() {
  const [phase, setPhase] = useState<Phase>(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const clear = useCallback((): void => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const play = useCallback((): void => {
    clear();
    setPlaying(true);
    setPhase(1);
    const at = (ms: number, p: Phase): void => {
      timers.current.push(window.setTimeout(() => setPhase(p), ms));
    };
    at(900, 2);
    at(2000, 3);
    at(3400, 4);
    timers.current.push(
      window.setTimeout(() => {
        setPhase(5);
        setPlaying(false);
      }, 5200),
    );
  }, [clear]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) setPhase(5);
        else play();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [play, clear]);

  const stepsVisible = phase >= 2 ? Math.min(phase - 1, 3) : 0;
  const done = phase >= 5;
  const building = phase >= 3 && !done;

  return (
    <section id="midnight-process" className="bg-[#f4efe6] py-20 text-[#07172a] lg:py-[100px]" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <h2 id="process-title" className="max-w-[52ch] text-[1.125rem]/6 font-medium tracking-tight text-balance sm:text-[1.625rem]/8">
            From a few details to a live preview.{" "}
            <span className="text-[#07172a]/48">
              Send what you have, and we handle design, copy and build, then show you the result.
            </span>
          </h2>
          <div className="shrink-0 pt-0.5">
            <button
              type="button"
              disabled={playing}
              onClick={play}
              className="inline-flex cursor-pointer items-center gap-[7px] rounded-sm py-[7px] text-[11px] text-[#07172a]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07172a] enabled:hover:text-[#07172a] disabled:cursor-default disabled:opacity-35 motion-reduce:hidden"
            >
              <svg aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.07M2.5 2.5v3h3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Replay the flow
            </button>
          </div>
        </div>

        <div
          ref={sectionRef}
          className="mx-auto mt-12 grid max-w-[430px] grid-cols-1 items-center justify-items-stretch gap-4 lg:mt-20 lg:max-w-none lg:grid-cols-[226px_0.4fr_1.55fr_0.65fr_1.55fr] lg:gap-0 lg:pt-[30px]"
        >
          <div className="text-center lg:self-start lg:text-left">
            <p className="mb-5 text-xs/[18px] text-[#07172a]/60">What you send us</p>
            <div className="grid grid-cols-3 justify-center gap-x-6 gap-y-[18px] lg:justify-start lg:gap-x-[38px]">
              {MATERIALS.map((m, i) => (
                <div
                  key={m}
                  className="flow-tool flex flex-col items-center gap-[9px] text-[10px] text-[#07172a]/70 lg:gap-[7px] lg:text-[9px]"
                  data-active={phase >= 1 && phase <= 2 && i < 2 + phase * 2}
                >
                  <div className="flow-tile relative grid size-16 place-items-center rounded-xl bg-[#fcfaf6] shadow-[inset_0_1px_#fff,0_3px_10px_#07172a05] lg:size-[50px]">
                    <span className="text-[13px] font-medium text-[#07172a]/70">{m[0]}</span>
                  </div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid place-items-center lg:mt-[38px] lg:self-start">
            <Arrow />
            <Connector active={phase >= 1 && phase < 5} />
          </div>

          <article className="overflow-hidden rounded-[15px] border border-[#07172a]/[0.04] bg-[#fafbfa]/80 shadow-[0_14px_36px_#07172a09,0_1px_3px_#07172a05]">
            <div className="flex items-center gap-2 border-b border-[#07172a]/[0.04] px-[18px] py-[13px] text-xs">
              <span className="size-3.5 rounded-[4px] border border-[#07172a]/30" />
              <span>Your request</span>
            </div>
            <div className="p-5">
              <p className="ml-auto w-fit max-w-[240px] rounded-[10px_10px_3px] bg-[#07172a] px-3.5 py-3 text-xs/[1.55] text-[#f4f1e9]">
                We’d love a new website for Northline Dental.
              </p>
              <ul className="mt-[25px] grid gap-[11px] text-[11px] text-[#07172a]/65" aria-label="What we gather">
                {STEPS.map((s, i) => (
                  <li key={s} className="flow-item flex min-h-5 items-center gap-2" data-visible={i < stepsVisible}>
                    <span className="grid size-[17px] shrink-0 place-items-center rounded-full bg-[#07172a]/[0.03]">
                      <svg aria-hidden="true" className="size-2.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                        <path d="M3.5 8.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#07172a]/[0.04] px-[18px] py-3 text-[10px] text-[#07172a]/45">
              {done ? "Preview ready · Free to review" : "Collecting details"}
            </div>
          </article>

          <div className="grid place-items-center gap-3 px-3 text-center text-[11px] text-[#07172a]/70 lg:px-3">
            <span className="hidden lg:block">Build preview</span>
            <Arrow />
            <Connector active={building} />
          </div>

          <div className="relative grid items-center">
            <article
              className="col-start-1 row-start-1 h-[292px] overflow-hidden rounded-[15px] border border-white/15 bg-[linear-gradient(135deg,#07172a,#10263d_60%,#1c2a3f)] text-[#f4f1e9] shadow-[0_14px_36px_#07172a09,0_1px_3px_#07172a05] transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]"
              style={{ opacity: done ? 1 : 0 }}
              aria-hidden={!done}
            >
              <div className="flex h-[46px] items-center gap-2 border-b border-white/[0.08] px-[18px] text-xs text-[#f4f1e9]/75">
                <span className="size-3.5 rounded-[4px] border border-white/40" />
                <span>Bespoke</span>
              </div>
              <div className="flex h-[204px] flex-col px-6 py-5">
                <p className="text-[10px] text-[#f4f1e9]/55">Northline Dental · Preview</p>
                <h3 className="mt-2.5 text-[22px]/[1.3] font-medium tracking-[-0.035em]">Your preview is ready</h3>
                <div className="mt-4">
                  <p className="flex items-center gap-1.5 text-xs">What’s inside</p>
                  <ul className="mt-[9px] list-outside list-disc pl-4 text-[11px]/[1.8] text-[#f4f1e9]/70">
                    {BRIEF_POINTS.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex h-10 items-center border-t border-white/[0.08] px-[18px] text-[10px] text-[#f4f1e9]/65">
                Review complete · No obligation
              </div>
            </article>
            <div
              className="col-start-1 row-start-1 h-[292px] overflow-hidden rounded-[15px] border border-[#07172a]/[0.05] bg-white/20 text-[#07172a]/45 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]"
              style={{ opacity: done ? 0 : 1 }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 border-b border-[#07172a]/[0.03] px-[18px] py-[13px] text-xs">
                <span className="size-3.5 rounded-[4px] border border-[#07172a]/25" />
                <span>Bespoke</span>
              </div>
              <div className="px-6 py-[30px]">
                <span className="mb-[22px] block h-1.5 w-[42%] rounded bg-[#07172a]/[0.04]" />
                <span className="mb-3 block h-2.5 w-[76%] rounded bg-[#07172a]/[0.04]" />
                <span className="mb-3 block h-2.5 w-[56%] rounded bg-[#07172a]/[0.04]" />
                <p className="mt-8 text-[11px]">{building ? "Building your preview" : "Waiting for your details"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

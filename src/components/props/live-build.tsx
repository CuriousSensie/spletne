"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserFrame } from "./mini-sites";

const URL = "northlinedental.si";

/** URL types in, a progress bar runs, then sections assemble with a staggered spring. */
export function LiveBuild() {
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const run = useCallback((): void => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped(0);
    setStage(0);
    for (let i = 1; i <= URL.length; i++) timers.current.push(window.setTimeout(() => setTyped(i), i * 55));
    const t0 = URL.length * 55 + 200;
    [1, 2, 3, 4, 5].forEach((s, i) => timers.current.push(window.setTimeout(() => setStage(s), t0 + i * 380)));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        run();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    const pending = timers.current;
    return () => {
      io.disconnect();
      pending.forEach(clearTimeout);
    };
  }, [run]);

  const show = (s: number): string => `build-in ${stage >= s ? "is-in" : ""}`;

  return (
    <div ref={ref} className="grid w-full max-w-3xl gap-3">
      <BrowserFrame url={`${URL.slice(0, typed)}${typed < URL.length ? "▍" : ""}`} className="aspect-[16/10] w-full">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-white/5">
          <div className="h-full bg-[var(--midnight-ivory-warm)] transition-[width] duration-[1800ms] ease-out" style={{ width: stage >= 1 ? "100%" : "0%", opacity: stage >= 5 ? 0 : 1 }} />
        </div>
        <div className="absolute inset-0 overflow-hidden bg-[#f4efe6] p-[4%] text-[#07172a]">
          <div className={`${show(1)} flex items-center justify-between`}>
            <span className="text-sm font-semibold">Northline Dental</span>
            <span className="rounded-full bg-[#07172a] px-3 py-1 text-xs text-[#f4f1e9]">Book a visit</span>
          </div>
          <div className="mt-[5%] grid grid-cols-[1.1fr_1fr] gap-[4%]">
            <div className={`${show(2)} grid content-center gap-3`}>
              <p className="text-[clamp(1.25rem,3.6vw,2.6rem)] leading-[1.02] font-medium tracking-[-0.04em]">Gentle care, booked in seconds.</p>
              <p className="text-xs text-[#07172a]/55">Family dentistry in the heart of Ljubljana.</p>
            </div>
            <div className={`${show(3)} relative aspect-[4/3] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#d8b5a4,transparent_55%),linear-gradient(135deg,#b8c9d8,#63485a)]`}>
              <span className="absolute bottom-2 left-2 rounded-lg bg-white/85 px-2 py-1 text-[10px] font-medium">Next slot · Today 14:30</span>
            </div>
          </div>
          <div className="mt-[5%] grid grid-cols-3 gap-[2%]">
            {["Check-ups", "Whitening", "Emergency"].map((s, i) => (
              <div key={s} className={`${show(4)} rounded-lg bg-[#07172a]/[0.06] p-3 text-xs`} style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="font-medium">{s}</p>
                <p className="text-[#07172a]/55">From €40</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${show(5)} absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-[#07172a] px-3 py-1.5 text-[11px] text-[#f4f1e9] shadow-lg`}>
          <span className="size-1.5 rounded-full bg-[#0cce6b]" /> Preview live
        </div>
      </BrowserFrame>
      <button type="button" onClick={run} className="justify-self-start text-xs text-current/60 underline underline-offset-4 hover:text-current">
        Replay
      </button>
    </div>
  );
}

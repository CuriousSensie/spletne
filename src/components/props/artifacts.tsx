"use client";

import { useEffect, useRef, useState } from "react";

/** Deterministic QR-like grid (decorative, not scannable). */
function FakeQr() {
  let seed = 7;
  const rnd = (): number => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const N = 21;
  const finder = (x: number, y: number): boolean =>
    [[0, 0], [N - 7, 0], [0, N - 7]].some(([fx, fy]) => {
      const dx = x - fx;
      const dy = y - fy;
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false;
      return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
    });
  const inFinderZone = (x: number, y: number): boolean =>
    (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const on = inFinderZone(x, y) ? finder(x, y) : rnd() > 0.52;
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} />);
    }
  return (
    <svg viewBox={`0 0 ${N} ${N}`} className="size-full" fill="#07172a" aria-hidden="true">
      {cells}
    </svg>
  );
}

function ScoreRing({ value }: { value: number }) {
  const C = 2 * Math.PI * 26;
  return (
    <div className="relative grid size-24 place-items-center">
      <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#0cce6b" strokeOpacity="0.15" strokeWidth="5" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#0cce6b" strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)} />
      </svg>
      <span className="text-2xl font-semibold text-[#0a8f4c] tabular-nums">{value}</span>
    </div>
  );
}

const CARD = "absolute rounded-2xl bg-white/90 p-4 text-[#07172a] shadow-[0_24px_50px_-18px_rgb(7_23_42/0.45)] ring-1 ring-black/5 backdrop-blur transition-transform duration-300 ease-out";

export function Artifacts() {
  const ref = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number): void => {
        const t = Math.min(1, (now - start) / 1600);
        setScore(Math.round(100 * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const depth = (d: number): React.CSSProperties => ({
    transform: `translate(calc(var(--mx, 0) * ${d}px), calc(var(--my, 0) * ${d}px))`,
  });

  return (
    <div
      ref={ref}
      className="relative h-[30rem] w-full max-w-3xl"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
        e.currentTarget.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
      }}
    >
      <div className={`${CARD} top-6 left-[4%] w-64 -rotate-3`} style={depth(-30)}>
        <p className="text-[11px] text-[#07172a]/50">Message · 09:14</p>
        <p className="mt-2 text-sm/5 font-medium">“Honestly, our site looks like it’s from 2012.”</p>
      </div>
      <div className={`${CARD} top-16 right-[6%] w-52 rotate-2`} style={depth(24)}>
        <div className="aspect-square rounded-lg bg-white p-2 ring-1 ring-black/5">
          <FakeQr />
        </div>
        <p className="mt-3 text-[11px] text-[#07172a]/50">Your preview</p>
        <p className="truncate text-sm font-medium">preview.spletne.com/northline</p>
      </div>
      <div className={`${CARD} bottom-10 left-[10%] flex items-center gap-4`} style={depth(40)}>
        <ScoreRing value={score} />
        <div>
          <p className="text-sm font-medium">Performance</p>
          <p className="text-[11px] text-[#07172a]/50">Lighthouse · mobile</p>
        </div>
      </div>
      <div className={`${CARD} right-[22%] bottom-6 w-56 -rotate-2`} style={depth(-18)}>
        <p className="text-5xl font-medium tracking-[-0.04em]">Aa</p>
        <p className="mt-1 text-[11px] text-[#07172a]/50">Public Sans · 500</p>
        <div className="mt-3 flex gap-1.5">
          {["#07172a", "#f4efe6", "#d8b5a4", "#63485a", "#ef7447"].map((c) => (
            <span key={c} className="size-7 rounded-full ring-1 ring-black/10" style={{ background: c }} />
          ))}
        </div>
      </div>
      <div className={`${CARD} top-[42%] left-[42%] -translate-x-1/2 px-3 py-2`} style={depth(12)}>
        <p className="flex items-center gap-2 text-xs font-medium">
          <span className="size-2 animate-pulse rounded-full bg-[#ef7447]" /> Preview ready
        </p>
      </div>
    </div>
  );
}

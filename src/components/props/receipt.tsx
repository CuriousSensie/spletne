"use client";

import { useState } from "react";

const LINES = [
  ["Design & copy", "included"],
  ["Mobile-first build", "included"],
  ["Live preview link", "included"],
  ["Revisions", "included"],
] as const;

export function Receipt() {
  const [run, setRun] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setRun((r) => r + 1)}
      aria-label="Replay receipt animation"
      className="group relative cursor-pointer outline-none"
    >
      <div key={run} className="receipt-print relative w-72 bg-[#fffdf8] px-6 pt-6 pb-24 text-left font-mono text-[12px] text-[#07172a] shadow-[0_30px_60px_-20px_rgb(7_23_42/0.45)] [mask-image:radial-gradient(circle_at_6px_100%,transparent_5px,black_5.5px)] [mask-size:12px_100%] [mask-repeat:repeat-x]">
        <p className="text-center text-[13px] font-semibold tracking-[0.2em]">BESPOKE STUDIO</p>
        <p className="mt-1 text-center text-[10px] text-[#07172a]/50">Preview order #0417 · Ljubljana</p>
        <div className="my-4 border-t border-dashed border-[#07172a]/25" />
        {LINES.map(([k, v]) => (
          <p key={k} className="flex justify-between py-0.5">
            <span>{k}</span>
            <span className="text-[#07172a]/50">{v}</span>
          </p>
        ))}
        <div className="my-4 border-t border-dashed border-[#07172a]/25" />
        <p className="flex justify-between text-[14px] font-semibold">
          <span>Due today</span>
          <span>€0.00</span>
        </p>
        <p className="mt-1 text-[10px] text-[#07172a]/50">Pay only if you launch.</p>
        <div className="receipt-stamp pointer-events-none absolute right-5 bottom-5 rotate-[-14deg] rounded-md border-[3px] border-[#c4472a] px-3 py-1 text-center font-sans text-[15px] leading-tight font-bold tracking-wider text-[#c4472a] mix-blend-multiply">
          NO RISK
          <span className="block text-[9px] tracking-[0.2em]">PREVIEW · FREE</span>
        </div>
      </div>
    </button>
  );
}

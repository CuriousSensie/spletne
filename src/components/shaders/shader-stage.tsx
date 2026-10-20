"use client";

import { useState } from "react";
import { ShaderCanvas } from "./shader-canvas";
import { PALETTES, type PaletteKey } from "./palettes";

interface ShaderStageProps {
  index: number;
  name: string;
  note: string;
  frag: string;
  defaultPalette: PaletteKey;
  scale?: number;
}

const KEYS = Object.keys(PALETTES) as PaletteKey[];

export function ShaderStage({ index, name, note, frag, defaultPalette, scale }: ShaderStageProps) {
  const [palette, setPalette] = useState<PaletteKey>(defaultPalette);
  const [speed, setSpeed] = useState(1);
  const light = palette === "paper";
  const p = PALETTES[palette];

  return (
    <section
      id={`shader-${index}`}
      className="relative isolate flex min-h-[78svh] flex-col justify-between overflow-hidden"
      style={{ background: `radial-gradient(circle at 30% 30%, ${p[1]}, ${p[0]} 70%)`, color: light ? "#07172a" : "#f4f1e9" }}
    >
      <ShaderCanvas frag={frag} palette={p} speed={speed} scale={scale} className="-z-10" />
      <div className="mx-auto flex w-full max-w-[88rem] flex-wrap items-start justify-between gap-6 px-5 pt-8 sm:px-8 lg:px-10">
        <div className="pointer-events-none">
          <p className="font-mono text-xs opacity-60">{String(index).padStart(2, "0")}</p>
          <h2 className="mt-1 text-xl font-medium tracking-tight">{name}</h2>
          <p className="mt-1 max-w-[46ch] text-sm/6 opacity-70">{note}</p>
        </div>
        <div className={`flex flex-wrap items-center gap-3 rounded-full p-1 pl-4 text-xs backdrop-blur-md ${light ? "bg-white/50 ring-1 ring-black/10" : "bg-black/25 ring-1 ring-white/12"}`}>
          <label className="flex items-center gap-2">
            Speed
            <input type="range" min={0} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-20 accent-current" />
          </label>
          <div className="flex gap-1">
            {KEYS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setPalette(k)}
                aria-pressed={k === palette}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 capitalize transition-colors ${k === palette ? (light ? "bg-[#07172a] text-[#f4efe6]" : "bg-[#f4f1e9] text-[#07172a]") : "opacity-70 hover:opacity-100"}`}
              >
                <span className="flex">
                  {PALETTES[k].map((c) => (
                    <span key={c} className="-ml-1 size-2.5 rounded-full ring-1 ring-black/20 first:ml-0" style={{ background: c }} />
                  ))}
                </span>
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none mx-auto grid w-full max-w-[88rem] gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:px-10">
        <p className="max-w-[16ch] text-4xl font-medium tracking-[-0.04em] text-balance sm:text-6xl lg:col-span-7">See your new website first</p>
        <p className="max-w-[40ch] self-end text-lg/6 opacity-75 lg:col-span-4 lg:col-start-9">Move the pointer. Click anywhere to send a ripple.</p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { MobileSite, type ThemeKey } from "./mini-sites";

const PHONES: readonly { theme: ThemeKey; rot: number; x: string; z: number }[] = [
  { theme: "bistro", rot: -14, x: "-62%", z: -60 },
  { theme: "salon", rot: 14, x: "62%", z: -60 },
  { theme: "dental", rot: 0, x: "0%", z: 40 },
];

function Phone({ theme }: { theme: ThemeKey }) {
  return (
    <div className="relative aspect-[9/19] w-44 rounded-[2rem] bg-[#0b0f14] p-1.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6),inset_0_0_0_1px_rgb(255_255_255/0.12)] sm:w-52">
      <div className="relative size-full overflow-hidden rounded-[1.6rem]">
        <MobileSite theme={theme} />
      </div>
      <span className="absolute top-3 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

export function PhoneFan() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative grid h-[30rem] w-full place-items-center [perspective:1200px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current?.style.setProperty("--ry", `${x * 18}deg`);
        ref.current?.style.setProperty("--rx", `${-y * 12}deg`);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--ry", "0deg");
        ref.current?.style.setProperty("--rx", "0deg");
      }}
    >
      <div
        className="relative grid place-items-center transition-transform duration-500 ease-[var(--ease-smooth-out)] [transform-style:preserve-3d]"
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
      >
        {PHONES.map((p) => (
          <div
            key={p.theme}
            className="col-start-1 row-start-1"
            style={{ transform: `translateX(${p.x}) translateZ(${p.z}px) rotate(${p.rot}deg)` }}
          >
            <Phone theme={p.theme} />
          </div>
        ))}
      </div>
    </div>
  );
}

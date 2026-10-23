"use client";

import { useState } from "react";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: "100%", radius: "0.75rem" },
  { id: "tablet", label: "Tablet", width: "62%", radius: "1.4rem" },
  { id: "phone", label: "Phone", width: "34%", radius: "2rem" },
] as const;

type DeviceId = (typeof DEVICES)[number]["id"];

/** Real container-query reflow: the same site re-lays out as the frame resizes. */
function ReflowSite() {
  return (
    <div className="@container size-full overflow-hidden bg-[#f4efe6] text-[#07172a]">
      <div className="flex h-full flex-col gap-4 p-4 @lg:p-6">
        <nav className="flex items-center justify-between text-xs">
          <span className="font-semibold">Northline Dental</span>
          <span className="hidden gap-4 text-[#07172a]/55 @md:flex">
            <span>Services</span>
            <span>Team</span>
            <span>Contact</span>
          </span>
          <span className="rounded-full bg-[#07172a] px-3 py-1 text-[#f4f1e9]">Book</span>
        </nav>
        <div className="grid flex-1 content-start gap-4 @lg:grid-cols-2 @lg:items-center">
          <div className="grid gap-2">
            <p className="text-2xl leading-[1.02] font-medium tracking-[-0.04em] text-balance @lg:text-4xl">
              Gentle care, booked in seconds.
            </p>
            <p className="text-xs text-[#07172a]/55">Family dentistry in the heart of Ljubljana.</p>
          </div>
          <div className="relative h-28 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#d8b5a4,transparent_55%),linear-gradient(135deg,#b8c9d8,#63485a)] @lg:h-44">
            <span className="absolute bottom-2 left-2 rounded-lg bg-white/85 px-2 py-1 text-[10px] font-medium">Next slot · 14:30</span>
          </div>
        </div>
        <div className="grid gap-2 @md:grid-cols-3">
          {["Check-ups", "Whitening", "Emergency"].map((s) => (
            <div key={s} className="rounded-lg bg-[#07172a]/[0.06] p-2.5 text-xs">
              <p className="font-medium">{s}</p>
              <p className="text-[#07172a]/55">From €40</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DeviceMorph() {
  const [device, setDevice] = useState<DeviceId>("desktop");
  const d = DEVICES.find((x) => x.id === device) ?? DEVICES[0];

  return (
    <div className="grid w-full max-w-3xl justify-items-center gap-5">
      <div role="tablist" aria-label="Device" className="flex gap-1 rounded-full bg-black/25 p-1 text-xs ring-1 ring-white/10">
        {DEVICES.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={device === x.id}
            onClick={() => setDevice(x.id)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 transition-colors ${device === x.id ? "bg-[#f4f1e9] text-[#07172a]" : "text-white/70 hover:text-white"}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="grid h-[26rem] w-full place-items-center">
        <div
          className="h-full overflow-hidden bg-[#0b0f14] p-1.5 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition-all duration-700 ease-[var(--ease-smooth-out)]"
          style={{ width: d.width, minWidth: "13rem", borderRadius: d.radius }}
        >
          <div className="size-full overflow-hidden transition-[border-radius] duration-700" style={{ borderRadius: `calc(${d.radius} - 0.3rem)` }}>
            <ReflowSite />
          </div>
        </div>
      </div>
    </div>
  );
}

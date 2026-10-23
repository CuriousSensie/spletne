"use client";

import { useState } from "react";

const LINES = [
  "M20 20H380", // nav rule
  "M20 46H140",
  "M300 34H360",
  "M20 80H190",
  "M20 100H170",
  "M20 120H120",
  "M20 150H90",
  "M100 150H160",
];

const BOXES = [
  { x: 210, y: 70, w: 170, h: 110 },
  { x: 20, y: 200, w: 112, h: 44 },
  { x: 144, y: 200, w: 112, h: 44 },
  { x: 268, y: 200, w: 112, h: 44 },
];

/** Wireframe draws itself on a blueprint grid, then the finished design fades in over it. */
export function Blueprint() {
  const [run, setRun] = useState(0);

  return (
    <div className="grid w-full max-w-3xl gap-3">
      <div
        key={run}
        className="relative aspect-[400/260] overflow-hidden rounded-xl bg-[#0d2a4a] shadow-[0_30px_80px_-20px_rgb(7_23_42/0.55)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255/0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255/0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <svg className="absolute inset-0 size-full" viewBox="0 0 400 260" fill="none">
          {LINES.map((d, i) => (
            <path key={d} d={d} pathLength={1} className="bp-draw" stroke="#9cc4ec" strokeWidth={1.2} style={{ animationDelay: `${i * 90}ms` }} />
          ))}
          {BOXES.map((b, i) => (
            <rect
              key={i}
              {...{ x: b.x, y: b.y, width: b.w, height: b.h }}
              rx={6}
              pathLength={1}
              className="bp-draw"
              stroke="#9cc4ec"
              strokeWidth={1.2}
              style={{ animationDelay: `${600 + i * 120}ms` }}
            />
          ))}
          <g className="bp-dims" fill="#9cc4ec" fontSize="7" fontFamily="ui-monospace, monospace">
            <text x="210" y="64">hero · 170×110</text>
            <text x="20" y="194">card · 112×44</text>
            <text x="300" y="14">cta</text>
          </g>
        </svg>
        <svg className="bp-fill absolute inset-0 size-full" viewBox="0 0 400 260">
          <defs>
            <linearGradient id="bp-hero" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#d8b5a4" />
              <stop offset="1" stopColor="#63485a" />
            </linearGradient>
          </defs>
          <rect width="400" height="260" fill="#f4efe6" />
          <text x="20" y="49" fontSize="11" fontWeight="600" fill="#07172a">Northline Dental</text>
          <rect x="300" y="28" width="60" height="14" rx="7" fill="#07172a" />
          <text x="330" y="38" fontSize="6.5" fill="#f4f1e9" textAnchor="middle">Book a visit</text>
          <text x="20" y="92" fontSize="19" fontWeight="500" letterSpacing="-0.8" fill="#07172a">Gentle care,</text>
          <text x="20" y="114" fontSize="19" fontWeight="500" letterSpacing="-0.8" fill="#07172a">booked in seconds.</text>
          <text x="20" y="132" fontSize="7" fill="#07172a" opacity="0.55">Family dentistry in Ljubljana.</text>
          <rect x="20" y="143" width="70" height="16" rx="8" fill="#07172a" />
          <text x="55" y="153.5" fontSize="6.5" fill="#f4f1e9" textAnchor="middle">Book a visit</text>
          <rect x="100" y="143" width="60" height="16" rx="8" fill="none" stroke="#07172a" strokeOpacity="0.3" />
          <text x="130" y="153.5" fontSize="6.5" fill="#07172a" textAnchor="middle">Call us</text>
          <rect x="210" y="70" width="170" height="110" rx="6" fill="url(#bp-hero)" />
          {[20, 144, 268].map((x, i) => (
            <g key={x}>
              <rect x={x} y="200" width="112" height="44" rx="6" fill="#07172a" fillOpacity="0.06" />
              <text x={x + 10} y="218" fontSize="8" fontWeight="500" fill="#07172a">{["Check-ups", "Whitening", "Emergency"][i]}</text>
              <text x={x + 10} y="232" fontSize="6.5" fill="#07172a" opacity="0.55">From €40</text>
            </g>
          ))}
        </svg>
      </div>
      <button type="button" onClick={() => setRun((r) => r + 1)} className="justify-self-start text-xs text-current/60 underline underline-offset-4 hover:text-current">
        Replay
      </button>
    </div>
  );
}

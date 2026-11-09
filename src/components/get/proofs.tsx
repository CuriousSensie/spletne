"use client";

import { useCountUp } from "@/components/site/hooks";

/** Lighthouse-style score ring that fills and counts to 100 on view. */
export function ScoreRing({ run }: { run: boolean }) {
  const score = useCountUp(100, run, 1800);
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-32 shrink-0 sm:size-36">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(238 243 246 / 0.08)" strokeWidth="6" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#7fe0b0" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-4xl font-light tracking-[-0.05em] text-[#7fe0b0] tabular-nums" aria-label="Score 100 out of 100">
          {Math.round(score)}
        </span>
      </div>
      <dl className="grid gap-1.5 font-mono text-[11px] tracking-[0.08em] text-foam/55 uppercase">
        {(["Performance", "Accessibility", "Best practices", "SEO"] as const).map((k) => (
          <div key={k} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#7fe0b0]" />
            <dt>{k}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A Google result with the client's site sitting first. */
export function SearchSnippet({ run }: { run: boolean }) {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-white p-4 text-[#202124] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-5">
      <div className="flex h-9 items-center gap-2 rounded-full px-4 text-[13px] text-[#5f6368] ring-1 ring-[#dfe1e5]">
        <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
        <span className="truncate">trattoria ljubljana old town</span>
      </div>
      <div className={`mt-4 rounded-xl p-3 transition-[background-color,box-shadow] delay-500 duration-700 ${run ? "bg-[#f1f6fb] ring-1 ring-[#1f4f75]/15" : ""}`}>
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-[#04101e] font-serif text-[12px] text-white italic">O</span>
          <div className="leading-tight">
            <p className="text-[12px]">Osteria Lipa</p>
            <p className="text-[11px] text-[#4d5156]">osterialipa.si › rezervacije</p>
          </div>
        </div>
        <p className="mt-1.5 text-[16px] leading-snug text-[#1a0dab]">Osteria Lipa | Trattoria in Ljubljana&apos;s old town</p>
        <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-[#4d5156]">
          <span className="text-[#e7a33e]">★★★★★</span> 4.9 · Fresh pasta by the river. Open until 23:00. Book a table online in under a minute.
        </p>
      </div>
      <div className="mt-3 grid gap-2 px-3 opacity-50">
        <span className="h-2 w-2/3 rounded-full bg-[#dfe1e5]" />
        <span className="h-2 w-5/6 rounded-full bg-[#eceff1]" />
      </div>
    </div>
  );
}

/** Generic agency copy struck out and replaced with something specific. */
export function CopyEdit({ run }: { run: boolean }) {
  return (
    <div aria-hidden="true" className="grid gap-3 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-snug font-light tracking-[-0.02em]">
      <p className="text-foam/40">
        {/* Background-drawn strike so it follows every wrapped line. */}
        <span
          className={`bg-[linear-gradient(#ff8a7a,#ff8a7a)] bg-[position:0_58%] bg-no-repeat transition-[background-size] delay-300 duration-1000 ease-[var(--ease-smooth-out)] ${run ? "bg-[length:100%_1px]" : "bg-[length:0%_1px]"}`}
        >
          Elevate your dining experience with our innovative culinary solutions.
        </span>
      </p>
      <p className={`transition-[opacity,translate] delay-1000 duration-700 ease-[var(--ease-smooth-out)] ${run ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
        Fresh pasta, made every morning. Ten tables by the river.{" "}
        <em className="font-serif font-normal">Book before 6.</em>
      </p>
    </div>
  );
}

/** The person you deal with, start to finish. */
export function DirectLine({ run }: { run: boolean }) {
  return (
    <div aria-hidden="true" className="grid gap-2 text-[14px]">
      <div className={`w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-foam/10 px-4 py-2.5 text-foam/80 transition-[opacity,translate] duration-500 ${run ? "opacity-100" : "translate-y-2 opacity-0"}`}>
        Can we swap the hero photo for the terrace one?
      </div>
      <div className={`ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-foam px-4 py-2.5 text-ink transition-[opacity,translate] delay-700 duration-500 ${run ? "opacity-100" : "translate-y-2 opacity-0"}`}>
        Done. Refresh your preview.
      </div>
      <p className={`ml-auto font-mono text-[10px] tracking-[0.14em] text-foam/40 uppercase transition-opacity delay-1000 duration-500 ${run ? "opacity-100" : "opacity-0"}`}>
        Replied in 12 min
      </p>
    </div>
  );
}


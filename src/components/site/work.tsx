"use client";

import { useEffect, useRef } from "react";
import { PROJECTS, type Project } from "@/components/work/projects";
import { clamp01, easeInOutCubic, easeOutCubic, range } from "@/components/work/scroll";
import { DesktopShot, PhoneShot } from "@/components/work/shots";

const N = PROJECTS.length;
/** Hold the first and last case at each end of the pinned range. */
const DWELL = 0.06;

interface Parts {
  panel: HTMLElement | null;
  shot: HTMLElement | null;
  phone: HTMLElement | null;
  copy: HTMLElement | null;
  dim: HTMLElement | null;
  lines: HTMLElement | null;
}

/**
 * Writes one case's entrance at amount `a` (0 hidden → 1 settled) and its exit depth `b`
 * (how far the next case has covered it).
 */
function paint(parts: Parts, a: number, b: number): void {
  const { panel, shot, phone, copy, dim, lines } = parts;
  if (!panel) return;
  const e = easeInOutCubic(a);
  const late = easeOutCubic(range(a, 0.25, 1)); // content lands after the panel
  const later = easeOutCubic(range(a, 0.45, 1));

  // Rises from the bottom edge like a sheet on a plan table; grid lines show while it moves.
  const clip = `inset(${(1 - e) * 100}% 0 0 0)`;
  const shotT = `translate3d(0, ${(1 - late) * 18}%, 0)`;
  const phoneT = `translate3d(0, ${(1 - later) * 90}%, 0) rotate(3deg)`;
  const copyT = `translate3d(0, ${(1 - late) * 40}px, 0)`;
  if (lines) lines.style.opacity = String(Math.min(1, 4 * a * (1 - a)) * 0.9 + 0.1);

  // Covered by the next case: recede slightly.
  const depth = easeInOutCubic(b);
  panel.style.clipPath = clip;
  panel.style.transform = `scale(${1 - depth * 0.06})`;
  panel.style.visibility = a <= 0 || b >= 1 ? "hidden" : "visible";
  if (dim) dim.style.opacity = String(depth * 0.55);
  if (shot) shot.style.transform = shotT;
  if (phone) phone.style.transform = phoneT;
  if (copy) {
    copy.style.transform = copyT;
    copy.style.opacity = String(0.2 + 0.8 * late);
  }
}

function Case({ pr, i }: { pr: Project; i: number }) {
  const { bg, fg, accent } = pr.panel;
  return (
    <li
      data-part="panel"
      className="absolute inset-0 origin-center overflow-hidden will-change-transform"
      style={{ zIndex: i + 1, background: bg, color: fg, visibility: i === 0 ? "visible" : "hidden" }}
      aria-roledescription="case"
      aria-label={`${pr.name}, case ${i + 1} of ${N}`}
    >
      <span
        data-part="lines"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.1,
          backgroundImage: `linear-gradient(to right, ${fg}1f 1px, transparent 1px), linear-gradient(to bottom, ${fg}1f 1px, transparent 1px)`,
          backgroundSize: "calc(100% / 12) 6rem",
        }}
      />

      <article className="relative mx-auto flex h-full max-w-[96rem] flex-col gap-5 px-5 pt-6 pb-6 sm:px-8 sm:pt-8 md:grid md:grid-cols-12 md:grid-rows-[auto_minmax(0,1fr)] md:gap-x-10 md:gap-y-8 md:pb-10 lg:px-12">
        {/* Case-file bar */}
        <header className="flex items-center gap-4 border-b pb-3 font-mono text-[10px] tracking-[0.16em] uppercase sm:text-[11px] md:col-span-12" style={{ borderColor: `${fg}26` }}>
          <span className="tabular-nums">
            ({String(i + 1).padStart(2, "0")}/{String(N).padStart(2, "0")})
          </span>
          <span className="truncate opacity-60">{pr.tag}</span>
          <span className="ml-auto hidden opacity-60 sm:inline">{pr.url}</span>
        </header>

        <div
          data-part="copy"
          className="flex flex-col gap-5 will-change-transform md:col-span-5 md:justify-between"
        >
          <div className="grid gap-4">
            <h3 className="text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.92] font-light tracking-[-0.055em] text-balance">{pr.name}</h3>
            <p className="max-w-[26ch] font-serif text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.15] italic opacity-80">{pr.brief}</p>
          </div>

          <div className="hidden gap-6 md:grid">
            {/* The client's palette, as delivered. */}
            <div className="grid gap-2">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-50">Palette</p>
              <ul className="flex gap-2">
                {pr.swatches.map((c) => (
                  <li key={c} className="grid gap-1.5">
                    <span className="block h-10 w-14 rounded-md" style={{ background: c, boxShadow: `inset 0 0 0 1px ${fg}1a` }} />
                    <span className="font-mono text-[9px] tracking-[0.08em] uppercase opacity-55">{c.slice(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Metric pr={pr} />
          </div>
        </div>

        {/* Shots, sized by container query so the 16:10 frame always fits. */}
        <div className="relative min-h-0 flex-1 [container-type:size] md:col-span-7">
          <div className="absolute inset-0 grid place-items-center md:place-items-end">
            <div data-part="shot" className="relative aspect-[16/10] w-[min(100cqw,160cqh)] will-change-transform">
              <DesktopShot theme={pr.theme} url={pr.url} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)]" />
              {/* Phone hangs off the shot's corner, over the least important part of the page. */}
              <div className="absolute -right-[2%] -bottom-[8%] w-[26%] md:-right-[3%] md:-bottom-[7%] md:w-[15%]">
                <div data-part="phone" className="will-change-transform">
                  <PhoneShot theme={pr.theme} className="w-full" />
                </div>
              </div>
            </div>
          </div>
          <span aria-hidden="true" className="absolute -top-2 right-0 hidden size-2 rounded-full md:block" style={{ background: accent }} />
        </div>

        <div className="md:hidden">
          <Metric pr={pr} />
        </div>
      </article>

      <span
        data-part="dim"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />
    </li>
  );
}

/** The result as a receipt line, the same device as the pricing breakdown. */
function Metric({ pr }: { pr: Project }) {
  return (
    <p className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-60">{pr.metric.label}</span>
      <span aria-hidden="true" className="mb-1 h-px flex-1 border-b border-dotted border-current opacity-30" />
      <span className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none font-light tracking-[-0.05em] tabular-nums" style={{ color: pr.panel.accent }}>
        {pr.metric.value}
      </span>
    </p>
  );
}

export function Work() {
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pin.current;
    if (!root) return;
    const q = (li: Element, part: string): HTMLElement | null => li.querySelector<HTMLElement>(`[data-part="${part}"]`);
    const parts: Parts[] = Array.from(root.querySelectorAll<HTMLElement>('[data-part="panel"]'), (li) => ({
      panel: li,
      shot: q(li, "shot"),
      phone: q(li, "phone"),
      copy: q(li, "copy"),
      dim: q(li, "dim"),
      lines: q(li, "lines"),
    }));
    let frame = 0;
    const run = (): void => {
      frame = 0;
      const el = pin.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height - vh;
      const p = span > 0 ? clamp01(-r.top / span) : 0;
      const u = range(p, DWELL, 1 - DWELL) * (N - 1);
      // The first case enters as the pinned stage scrolls up into view; the rest as `u` passes them.
      const amounts = PROJECTS.map((_, i) => (i === 0 ? clamp01(1 - r.top / vh) : clamp01(u - (i - 1))));
      PROJECTS.forEach((_, i) => paint(parts[i], amounts[i], amounts[i + 1] ?? 0));
    };
    const schedule = (): void => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-ink text-foam">
      <div className="mx-auto grid max-w-[96rem] gap-6 px-5 pt-20 pb-12 sm:px-8 sm:pt-28 md:grid-cols-12 md:items-end lg:px-12 lg:pt-36">
        <div className="grid gap-6 md:col-span-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">(03) Selected work</p>
          <h2 id="work-title" className="text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.92] font-light tracking-[-0.055em]">
            Every client gets <em className="font-serif font-normal tracking-[-0.02em]">their own</em> look.
          </h2>
        </div>
        <p className="max-w-[30ch] text-[16px] leading-snug text-foam/60 md:col-span-4">No templates, ever. Here’s what that looked like for four local businesses.</p>
      </div>

      <div ref={pin} id="work-cases" className="relative h-[440svh]">
        <ol className="sticky top-0 h-svh overflow-hidden bg-ink">
          {PROJECTS.map((pr, i) => (
            <Case key={pr.name} pr={pr} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

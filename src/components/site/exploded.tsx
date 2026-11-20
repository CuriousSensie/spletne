"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { THEMES } from "@/components/props/mini-sites";
import { home } from "@/content/home";
import { clamp01, easeInOutCubic, range } from "@/components/work/scroll";

/**
 * (05) What you get: the finished site, taken apart.
 * The page is decomposed into real layers that sit exactly on top of each other: words over design
 * reads as the finished site. Scrolling tilts the stack, separates it, pulls each layer out in turn,
 * then puts it back together flat.
 */

/** The demo practice, in Slovenian. Colours come from the shared dental theme. */
const t = {
  ...THEMES.dental,
  name: "Zobna ambulanta Bor",
  headline: "Nežna oskrba, termin v nekaj sekundah.",
  sub: "Družinsko zobozdravstvo v središču Ljubljane.",
  cta: "Naročite se",
  slot: "Prosti termin · Danes 14:30",
  services: ["Pregledi", "Beljenje", "Nujna pomoč"],
  price: "Od 40 €",
} as const;
const C = home.whatYouGet;
const BLUE = "#7fb4e0";

type Mode = "words" | "design" | "structure";

/** One region of the page; renders the same box in every mode so layers align perfectly. */
function Region({ mode, tag, className = "", style, children }: { mode: Mode; tag?: string; className?: string; style?: CSSProperties; children?: React.ReactNode }) {
  const base: CSSProperties =
    mode === "words"
      ? { ...style, background: "transparent", borderColor: "transparent", boxShadow: "none" }
      : mode === "design"
        ? { ...style, color: "transparent" }
        : { ...style, background: "rgb(127 180 224 / 0.1)", color: "transparent", border: `1.5px dashed ${BLUE}`, boxShadow: "none" };
  return (
    <span className={`relative ${className}`} style={base}>
      {children}
      {mode === "structure" && tag && (
        <span className="absolute -top-[1.1cqw] left-[1cqw] bg-[#0a1e33] px-[0.6cqw] font-mono text-[1.3cqw] leading-none tracking-[0.1em] uppercase" style={{ color: BLUE }}>
          {tag}
        </span>
      )}
    </span>
  );
}

/** The demo practice's homepage, rendered as one layer of itself. Mirrors NewSite's layout. */
function SiteLayer({ mode }: { mode: Mode }) {
  const pageBg = mode === "design" ? t.bg : mode === "structure" ? "rgb(10 30 51 / 0.72)" : "transparent";
  const fg = mode === "words" ? "var(--w-fg)" : "transparent";
  const muted = mode === "words" ? "var(--w-muted)" : "transparent";
  return (
    <div className="@container size-full overflow-hidden" style={{ background: pageBg, color: fg }}>
      <div className="flex h-full flex-col gap-[3cqw] p-[4cqw]">
        <Region mode={mode} tag="nav" className="flex items-center justify-between">
          <span className="text-[3.2cqw] font-semibold tracking-tight">{t.name}</span>
          <span className="flex items-center gap-[3cqw] text-[2.2cqw]" style={{ color: muted }}>
            <span>Storitve</span>
            <span>Ekipa</span>
            <Region mode={mode} tag="a" className="rounded-full px-[2.4cqw] py-[1cqw] font-medium" style={{ background: t.accent, color: mode === "words" ? t.accentFg : "transparent" }}>
              {t.cta}
            </Region>
          </span>
        </Region>
        <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] items-center gap-[3cqw]">
          <div className="grid gap-[1.8cqw]">
            <Region mode={mode} tag="h1" className="block text-[5cqw] leading-[1.02] font-medium tracking-[-0.04em]">
              {t.headline}
            </Region>
            <Region mode={mode} tag="p" className="block text-[2.4cqw]" style={{ color: muted }}>
              {t.sub}
            </Region>
            <div className="mt-[1cqw] flex gap-[1.6cqw] text-[2.2cqw] font-medium">
              <Region mode={mode} tag="a" className="rounded-full px-[3cqw] py-[1.4cqw]" style={{ background: t.accent, color: mode === "words" ? t.accentFg : "transparent" }}>
                {t.cta}
              </Region>
              <Region mode={mode} className="rounded-full border px-[3cqw] py-[1.4cqw]" style={{ borderColor: t.muted }}>
                Pokličite nas
              </Region>
            </div>
          </div>
          <Region mode={mode} tag="img · alt" className="block h-full overflow-hidden rounded-[2cqw]" style={{ background: mode === "design" ? t.hero : undefined }}>
            <Region
              mode={mode}
              className="absolute bottom-[2.4cqw] left-[2.4cqw] rounded-[1.4cqw] px-[2.2cqw] py-[1.4cqw] text-[2cqw] font-medium"
              style={{ background: "rgb(255 255 255 / 0.82)", color: mode === "words" ? "#07172a" : "transparent" }}
            >
              {t.slot}
            </Region>
          </Region>
        </div>
        <div className="grid grid-cols-3 gap-[2cqw]">
          {t.services.map((s) => (
            <Region key={s} mode={mode} tag="h2" className="block rounded-[1.6cqw] p-[2cqw]" style={{ background: "rgb(127 127 127 / 0.1)" }}>
              <span className="block text-[2.2cqw] font-medium">{s}</span>
              <span className="mt-[0.6cqw] block text-[1.8cqw]" style={{ color: muted }}>
                {t.price}
              </span>
            </Region>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeLayer() {
  const lines: readonly (readonly [string, string])[] = [
    ["#7fe0b0", '<nav aria-label="Glavni meni">'],
    ["#eef3f6", '  <a href="/narocanje">Naročite se</a>'],
    ["#7fe0b0", "<main>"],
    ["#f2d7b2", "  <h1>Nežna oskrba, termin v nekaj sekundah.</h1>"],
    ["#b8c9d8", '  <img alt="Naša ambulanta v Ljubljani" …>'],
    ["#7fe0b0", "</main>"],
    ["#f2d7b2", '<script type="application/ld+json">'],
    ["#b8c9d8", '  { "@type": "Dentist", "areaServed": "Ljubljana" }'],
  ];
  return (
    <div className="@container grid size-full content-center gap-[1.2cqw] bg-[#04101e]/95 p-[5cqw] font-mono text-[2.1cqw] leading-relaxed">
      {lines.map(([c, l], i) => (
        <span key={i} className="truncate" style={{ color: c }}>
          <span className="mr-[3cqw] text-foam/25 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          {l}
        </span>
      ))}
    </div>
  );
}

function PlateLayer() {
  return (
    <div className="@container flex size-full flex-col justify-between bg-[linear-gradient(145deg,#0f2f4a,#0a1e33_60%)] p-[5cqw] font-mono text-foam">
      <span className="text-[1.8cqw] tracking-[0.18em] text-mist uppercase">Imetnik · Zobna ambulanta Bor d.o.o.</span>
      <span className="text-[6.5cqw] leading-none tracking-[-0.03em]">zobnabor.si</span>
      <span className="flex flex-wrap gap-x-[4cqw] gap-y-[1cqw] text-[1.7cqw] tracking-[0.16em] text-foam/60 uppercase">
        <span>
          <span className="text-[#7fe0b0]">●</span> SSL
        </span>
        <span>
          <span className="text-[#7fe0b0]">●</span> Gostovanje v EU
        </span>
        <span>
          <span className="text-[#7fe0b0]">●</span> Dnevne varnostne kopije
        </span>
      </span>
    </div>
  );
}

interface Layer {
  name: string;
  line: string;
  /** Opaque plates get a shade when inactive; see-through ones fade instead. */
  solid: boolean;
}

/** Bottom → top. */
const LAYERS: readonly Layer[] = [
  { ...C.layers.domain, solid: true },
  { ...C.layers.code, solid: true },
  { ...C.layers.structure, solid: false },
  { ...C.layers.design, solid: true },
  { ...C.layers.words, solid: false },
];
const N = LAYERS.length;

// Choreography (progress through the pinned range).
const TILT = [0.04, 0.16] as const;
const SPREAD = [0.1, 0.24] as const;
const WALK = [0.26, 0.84] as const;
const CLOSE = [0.86, 0.97] as const;

export function Exploded() {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const floor = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let frame = 0;
    const run = (): void => {
      frame = 0;
      const el = pin.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? clamp01(-r.top / span) : 0;
      const w = stage.current?.offsetWidth ?? 800;

      const close = easeInOutCubic(range(p, ...CLOSE));
      const tilt = easeInOutCubic(range(p, ...TILT)) * (1 - close);
      const spread = easeInOutCubic(range(p, ...SPREAD)) * (1 - close);
      const gate = easeInOutCubic(range(p, WALK[0] - 0.02, WALK[0] + 0.04)) * (1 - easeInOutCubic(range(p, WALK[1] - 0.02, WALK[1] + 0.02)));
      const walk = range(p, ...WALK) * N; // 0..N, top layer first
      const gap = w * 0.18;

      if (stage.current) {
        stage.current.style.transform = `translateY(${spread * 9}%) rotateX(${tilt * 54}deg) rotateZ(${tilt * -34}deg) scale(${1 - tilt * 0.26})`;
      }
      if (floor.current) floor.current.style.opacity = String(tilt * 0.9);

      let current = -1;
      for (let i = 0; i < N; i++) {
        const c = N - 1 - i + 0.5; // centre of this layer's step in `walk`
        const d = Math.abs(walk - c);
        const pull = easeInOutCubic(clamp01(1.5 - 2 * d)) * gate;
        if (pull > 0.5) current = i;
        const z = (i - (N - 1) / 2) * gap * spread + pull * gap * 0.5;
        const el = layers.current[i];
        if (el) el.style.transform = `translate3d(${pull * 24}%, ${pull * 6}%, ${z}px)`;
        const dimmed = (1 - pull) * gate;
        if (LAYERS[i].solid) {
          const sh = shades.current[i];
          if (sh) sh.style.opacity = String(dimmed * 0.35);
        } else if (el) {
          el.style.opacity = String(1 - dimmed * 0.45);
        }
        const bar = bars.current[i];
        if (bar) bar.style.transform = `scaleX(${clamp01(walk - (N - 1 - i))})`;
      }
      const words = layers.current[N - 1];
      if (words) {
        const lift = Math.round(spread * 100);
        words.style.setProperty("--w-fg", `color-mix(in oklab, ${t.fg}, #eef3f6 ${lift}%)`);
        words.style.setProperty("--w-muted", `color-mix(in oklab, ${t.muted}, rgb(238 243 246 / 0.7) ${lift}%)`);
      }
      setActive(current);
      setClosed(p >= CLOSE[1] - 0.02);
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

  const shown = active >= 0 ? LAYERS[active] : null;

  return (
    <div ref={pin} className="relative h-[255svh]">

      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-[96rem] items-end justify-between gap-6 px-5 pt-8 sm:px-8 sm:pt-12 lg:px-12">
          <div className="grid gap-4">
            <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{C.label}</p>
            <h2 id="get-title" className="text-[clamp(1.85rem,4.6vw,3.6rem)] leading-[1.02] font-light tracking-[-0.045em]">
              {C.title.before}
              <em className="font-serif font-normal tracking-[-0.01em]">{C.title.em}</em>
            </h2>
          </div>
          <p className="hidden pb-1 font-mono text-[11px] tracking-[0.16em] text-foam/50 uppercase tabular-nums sm:block" aria-hidden="true">
            {active >= 0 ? `${C.states.layerWord} ${String(N - active).padStart(2, "0")} / ${String(N).padStart(2, "0")}` : closed ? C.states.assembled : C.states.finished}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[96rem] flex-1 grid-rows-[minmax(0,1fr)_auto] items-center gap-4 px-5 pb-6 sm:px-8 md:grid-cols-12 md:grid-rows-1 md:gap-8 md:pb-0 lg:px-12">
          {/* Stage */}
          <div className="grid h-full min-h-0 place-items-center [perspective:2400px] md:col-span-8">
            <div
              ref={stage}
              className="relative aspect-[16/10] w-[min(88vw,48rem,calc((100svh-17rem)*1.6))] [transform-style:preserve-3d] md:w-[min(56vw,50rem,calc((100svh-12rem)*1.6))]"
            >
              <div
                ref={floor}
                aria-hidden="true"
                className="absolute inset-[6%] rounded-[50%] bg-black opacity-0 blur-3xl"
                style={{ transform: "translateZ(-260px)" }}
              />
              {LAYERS.map((l, i) => (
                <div
                  key={l.name}
                  ref={(el) => {
                    layers.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
                >
                  <div
                    className={`absolute inset-0 overflow-hidden rounded-[0.6rem] ${
                      l.solid ? "shadow-[0_30px_60px_-20px_rgb(0_0_0/0.65)] ring-1 ring-foam/15" : "ring-1 ring-foam/10"
                    }`}
                  >
                    {i === 0 && <PlateLayer />}
                    {i === 1 && <CodeLayer />}
                    {i === 2 && <SiteLayer mode="structure" />}
                    {i === 3 && <SiteLayer mode="design" />}
                    {i === 4 && <SiteLayer mode="words" />}
                    {l.solid && (
                      <div
                        ref={(el) => {
                          shades.current[i] = el;
                        }}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-ink opacity-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="md:col-span-4">
            <ol className="hidden md:grid">
              {[...LAYERS].reverse().map((l, ri) => {
                const i = N - 1 - ri;
                const on = active === i;
                return (
                  <li key={l.name} className="relative border-t border-foam/12 py-4">
                    <span
                      ref={(el) => {
                        bars.current[i] = el;
                      }}
                      aria-hidden="true"
                      className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-foam"
                    />
                    <p className={`flex items-baseline gap-4 transition-colors duration-500 ${on ? "text-foam" : "text-foam/40"}`}>
                      <span className="font-mono text-[11px] tracking-[0.14em] tabular-nums">{String(ri + 1).padStart(2, "0")}</span>
                      <span className="text-[clamp(1.25rem,1.9vw,1.7rem)] font-light tracking-[-0.03em]">{l.name}</span>
                    </p>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-smooth-out)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <p className="overflow-hidden pt-2 pl-9 text-[15px] leading-snug text-foam/60">{l.line}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p
              className={`mt-8 hidden font-serif text-[clamp(1.4rem,2.2vw,2rem)] leading-tight italic transition-opacity duration-700 md:block ${closed ? "opacity-100" : "opacity-0"}`}
            >
              {C.states.closing}
            </p>

            {/* Mobile: just the active layer. */}
            <div className="grid min-h-[5.5rem] content-start gap-1 border-t border-foam/12 pt-3 md:hidden" aria-live="polite">
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.14em] text-mist tabular-nums">
                  {shown ? `${String(N - active).padStart(2, "0")} / ${String(N).padStart(2, "0")}` : ""}
                </span>
                <span className="text-xl font-light tracking-[-0.03em]">{shown ? shown.name : closed ? C.states.closing : C.states.finished}</span>
              </p>
              <p className="text-[15px] leading-snug text-foam/60">{shown ? shown.line : closed ? "" : C.states.hint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

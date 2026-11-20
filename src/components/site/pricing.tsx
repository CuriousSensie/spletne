"use client";

import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { LIFTOFF } from "@/components/shaders/library";
import { PALETTES } from "@/components/shaders/palettes";
import { home } from "@/content/home";
import { useCountUp, useInViewOnce } from "./hooks";
import { EmTitle } from "./em-title";

const t = home.pricing;
const euro = (n: number): string => new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(Math.round(n));

/** One of the two possible prices. The keep-it price is the dark, emphasised tile. */
function Price({ amount, label, note, dark, run }: { amount: number; label: string; note: string; dark: boolean; run: boolean }) {
  const shown = useCountUp(amount, run);
  return (
    <div className={`relative isolate grid content-between gap-6 overflow-hidden rounded-[1.5rem] p-6 ring-1 sm:p-7 ${dark ? "bg-ink text-foam ring-foam/10" : "bg-white text-ink ring-ink/10"}`}>
      {dark && (
        <span aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.16]">
          <ShaderCanvas frag={LIFTOFF} palette={PALETTES.launch} speed={0.5} scale={0.75} />
        </span>
      )}
      <p className={`font-mono text-[11px] tracking-[0.16em] uppercase ${dark ? "text-mist" : "text-ink/55"}`}>{label}</p>
      <div className="grid gap-2">
        <p className="flex items-start gap-1" aria-label={`${euro(amount)} euro`}>
          <span className="mt-[0.3em] text-xl font-light">€</span>
          <span aria-hidden="true" className="text-[clamp(3.2rem,7vw,5rem)] leading-[0.85] font-light tracking-[-0.06em] tabular-nums">
            {euro(shown)}
          </span>
        </p>
        <p className={`text-[14px] leading-snug ${dark ? "text-foam/65" : "text-ink/60"}`}>{note}</p>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" className="mt-1 size-4 shrink-0 text-ink/45" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
      <path d="M3.5 8.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-4 bg-foam text-ink">
      <div className="mx-auto grid max-w-[96rem] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-16 lg:px-12 lg:py-36">
        <div ref={ref} className="grid content-start gap-6 lg:col-span-5 lg:sticky lg:top-12 lg:self-start">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">{t.label}</p>
          <h2 id="pricing-title" className="max-w-[14ch] text-[clamp(1.85rem,5.4vw,4rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance">
            <EmTitle title={t.title} />
          </h2>
          <p className="max-w-[36ch] text-[16px] leading-snug text-ink/60">{t.sub}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.prices.map((p, i) => (
              <Price key={p.label} {...p} dark={i === t.prices.length - 1} run={inView} />
            ))}
          </div>

          <a
            href="#start"
            className="group mt-2 inline-flex h-12 items-center justify-between gap-3 self-start justify-self-start rounded-full bg-ink pr-2 pl-5 text-sm font-medium text-foam transition-transform active:scale-[0.98]"
          >
            {t.cta}
            <span className="grid size-8 place-items-center rounded-full bg-foam text-ink transition-transform duration-300 group-hover:translate-x-0.5">
              <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">{t.includesLabel}</p>
          <ol className="mt-5 border-t border-ink/12">
            {t.includes.map((it, i) => (
              <li
                key={it.title}
                className={`grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-x-3 border-b border-ink/12 py-6 transition-[opacity,translate] duration-700 ease-[var(--ease-smooth-out)] sm:py-7 ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <span className="pt-1.5 font-mono text-[11px] tracking-[0.12em] text-ink/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-1.5">
                  <h3 className="text-[clamp(1.15rem,1.8vw,1.45rem)] leading-tight font-light tracking-[-0.025em]">{it.title}</h3>
                  <p className="max-w-[52ch] text-[15px] leading-snug text-ink/60">{it.text}</p>
                </div>
                <Check />
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-[60ch] pl-[3.25rem] text-[14px] leading-snug text-ink/55">{t.extras}</p>
        </div>
      </div>
    </section>
  );
}

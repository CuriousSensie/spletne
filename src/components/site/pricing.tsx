"use client";

import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { CONTOURS, LIFTOFF } from "@/components/shaders/library";
import { PALETTES } from "@/components/shaders/palettes";
import { CONTACT_EMAIL } from "./contact";
import { useCountUp, useInViewOnce } from "./hooks";

interface Plan {
  id: string;
  name: string;
  /** Who it's for, in a few words. */
  forWhom: string;
  /** Fixed price in euro, or null when it's quoted per project. */
  price: number | null;
  /** Small line under the price. */
  terms: string;
  features: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

const PLANS: readonly Plan[] = [
  {
    id: "essential",
    name: "Essential",
    forWhom: "A clean, fast site for a small business.",
    price: 150,
    terms: "€0 until you say yes",
    features: ["Up to 5 pages", "We write the words", "Looks right on every phone", "Set up to show on Google"],
    cta: { label: "Get my free preview", href: "#start" },
  },
  {
    id: "studio",
    name: "Studio",
    forWhom: "For bookings, online orders and bigger sites.",
    price: null,
    terms: "Quoted to your project",
    features: ["Everything in Essential", "Bookings or online orders", "Slovenian and English", "30 days of changes after launch"],
    cta: { label: "Talk to us", href: `mailto:${CONTACT_EMAIL}?subject=Studio%20plan` },
    featured: true,
  },
];

const euro = (n: number): string => new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 }).format(Math.round(n));

function PlanCard({ plan, inView }: { plan: Plan; inView: boolean }) {
  const dark = !!plan.featured;
  const shown = useCountUp(plan.price ?? 0, inView);

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`group relative isolate flex flex-col overflow-hidden rounded-[1.75rem] p-7 ring-1 sm:p-10 ${
        dark ? "order-first bg-ink text-foam shadow-[0_40px_80px_-40px_rgb(4_16_30/0.7)] ring-foam/10 md:order-none" : "bg-white text-ink ring-ink/10"
      }`}
    >
      <span aria-hidden="true" className={`absolute inset-0 -z-10 ${dark ? "opacity-40" : "opacity-50"}`}>
        {dark ? (
          <ShaderCanvas frag={LIFTOFF} palette={PALETTES.launch} speed={0.6} scale={0.75} />
        ) : (
          <ShaderCanvas frag={CONTOURS} palette={PALETTES.lines} speed={0.2} scale={0.75} />
        )}
      </span>
      {dark && <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink/55 via-ink/85 to-ink" />}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), ${dark ? "rgb(184 201 216 / 0.14)" : "rgb(31 79 117 / 0.07)"}, transparent 65%)`,
        }}
      />

      <header className="flex items-baseline justify-between gap-4">
        <h3 id={`plan-${plan.id}`} className="font-mono text-[11px] tracking-[0.18em] uppercase">
          {plan.name}
        </h3>
        {dark && <span className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">Recommended</span>}
      </header>
      <p className="mt-6 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05] font-light tracking-[-0.035em]">{plan.forWhom}</p>

      {plan.price !== null ? (
        <p className="mt-10 flex items-start gap-1" aria-label={`${euro(plan.price)} euro`}>
          <span className="mt-[0.35em] text-2xl font-light">€</span>
          <span className="text-[clamp(3.5rem,10vw,5.5rem)] leading-[0.85] font-light tracking-[-0.06em] tabular-nums" aria-hidden="true">
            {euro(shown)}
          </span>
        </p>
      ) : (
        <p className="mt-10 font-serif text-[clamp(3.2rem,8.5vw,5rem)] leading-[0.85] tracking-[-0.03em] italic">Let&apos;s talk</p>
      )}
      <p className={`mt-3 font-mono text-[11px] tracking-[0.14em] uppercase ${dark ? "text-mist" : "text-ink/50"}`}>{plan.terms}</p>

      <ul className={`mt-8 mb-10 grid border-t ${dark ? "border-foam/12" : "border-ink/10"}`}>
        {plan.features.map((f, i) => (
          <li
            key={f}
            className={`border-b py-3 text-[15px] transition-[opacity,translate] duration-500 ease-[var(--ease-smooth-out)] ${dark ? "border-foam/12" : "border-ink/10"} ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            }`}
            style={{ transitionDelay: `${300 + i * 70}ms` }}
          >
            {f}
          </li>
        ))}
      </ul>

      <a
        href={plan.cta.href}
        className={`group/cta mt-auto inline-flex h-12 items-center justify-between gap-3 self-stretch rounded-full pr-2 pl-5 text-sm font-medium transition-transform active:scale-[0.98] sm:self-start ${
          dark ? "bg-foam text-ink" : "bg-ink text-foam"
        }`}
      >
        {plan.cta.label}
        <span className={`grid size-8 place-items-center rounded-full transition-transform duration-300 group-hover/cta:translate-x-0.5 ${dark ? "bg-ink text-foam" : "bg-foam text-ink"}`}>
          <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </article>
  );
}

export function Pricing() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.25);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-4 bg-foam text-ink">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-x-12 lg:px-12 lg:py-36">
        <div className="grid content-start gap-6 lg:col-span-4 lg:sticky lg:top-12 lg:self-start">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink/55 uppercase">(04) Pricing</p>
          <h2 id="pricing-title" className="max-w-[12ch] text-[clamp(1.85rem,5.4vw,4rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance">
            No deposit. You pay when you <em className="font-serif font-normal tracking-[-0.01em]">love</em> it.
          </h2>
        </div>

        <div className="grid gap-6 lg:col-span-8">
          <div ref={ref} className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {PLANS.map((p) => (
              <PlanCard key={p.id} plan={p} inView={inView} />
            ))}
          </div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink/50 uppercase">No contracts · No monthly fee to us · Domain and code in your name</p>
        </div>
      </div>
    </section>
  );
}

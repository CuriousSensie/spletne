"use client";

import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { STREAKS } from "@/components/shaders/library";
import { PALETTES } from "@/components/shaders/palettes";
import { home } from "@/content/home";
import { useInquiry } from "./inquiry-context";
import { SiteFooter } from "./site-footer";
import { EmTitle } from "./em-title";
import { H2 } from "./styles";

const t = home.start;
const f = home.inquiry.fields;

/** Last section of the home page: two quick fields, then the full inquiry opens as a popup with them filled in. */
export function FinalCta() {
  const { open } = useInquiry();

  return (
    <section id="start" aria-labelledby="start-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-foam">
      {/* Bookends the hero: same streaks, faded in from the section above. */}
      <ShaderCanvas frag={STREAKS} palette={PALETTES.ocean} speed={0.7} scale={0.6} className="-z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-ink via-ink/40 to-ink/90" />

      <div className="mx-auto grid w-full max-w-[96rem] flex-1 content-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-x-12 lg:px-12">
        <div className="grid content-end gap-6 lg:col-span-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{t.label}</p>
          <h2 id="start-title" className={`max-w-[14ch] ${H2}`}>
            <EmTitle title={t.title} emClassName="font-serif font-normal tracking-[-0.02em]" />
          </h2>
        </div>
        <div className="grid content-end gap-6 lg:col-span-6 lg:pb-3">
          <p className="max-w-[40ch] text-[16px] leading-snug text-foam/70 sm:text-[17px]">{t.body}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              open({ site: String(fd.get("site") ?? "").trim(), email: String(fd.get("email") ?? "").trim() });
            }}
            className="grid gap-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <QuickField name="site" label={f.site.label} type="text" autoComplete="url" placeholder={f.site.placeholder} />
              <QuickField name="email" label={f.email.label} type="email" autoComplete="email" placeholder={f.email.placeholder} />
            </div>
            <div className="mt-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] tracking-[0.14em] text-foam/45 uppercase">{t.teaser.due}</p>
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-foam pr-2 pl-6 text-[15px] font-medium text-ink transition-transform active:scale-[0.98]"
              >
                {t.teaser.next}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <SiteFooter />
    </section>
  );
}

function QuickField({ name, label, type, autoComplete, placeholder }: { name: string; label: string; type: string; autoComplete: string; placeholder: string }) {
  return (
    <label className="group grid gap-1 rounded-2xl bg-foam/[0.06] px-4 pt-3 pb-2.5 ring-1 ring-foam/12 transition-colors focus-within:bg-foam/[0.09] focus-within:ring-foam/40">
      <span className="font-mono text-[10px] tracking-[0.16em] text-mist/80 uppercase">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} placeholder={placeholder} className="w-full bg-transparent text-[17px] text-foam outline-none placeholder:text-foam/30" />
    </label>
  );
}

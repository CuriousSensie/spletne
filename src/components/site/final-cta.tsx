import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { STREAKS } from "@/components/shaders/library";
import { PALETTES } from "@/components/shaders/palettes";
import { CONTACT_EMAIL } from "./contact";
import { home } from "@/content/home";
import { StartForm } from "./start-form";
import { Wordmark } from "./wordmark";

const t = home.start;

export function FinalCta() {
  return (
    <section id="start" aria-labelledby="start-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-foam">
      {/* Bookends the hero: same streaks, faded in from the section above. */}
      <ShaderCanvas frag={STREAKS} palette={PALETTES.ocean} speed={0.7} scale={0.6} className="-z-20" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-ink via-ink/40 to-ink/90" />

      <div className="mx-auto grid w-full max-w-[96rem] flex-1 content-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
        <div className="grid content-end gap-6 lg:col-span-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{t.label}</p>
          <h2 id="start-title" className="max-w-[11ch] text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] font-light tracking-[-0.055em]">
            {t.title.before}
            <em className="font-serif font-normal tracking-[-0.02em]">{t.title.em}</em>
          </h2>
        </div>
        <div className="grid content-end gap-6 lg:col-span-6 lg:pb-3">
          <p className="max-w-[40ch] text-[16px] leading-snug text-foam/70 sm:text-[17px]">
            {t.body}
          </p>
          <StartForm />
        </div>
      </div>

      <footer className="mx-auto w-full max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-t border-foam/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-4">
            <Wordmark />
            <span className="font-mono text-[11px] tracking-[0.14em] text-foam/45 uppercase">{home.footer.city}</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] text-foam/55 uppercase">
            {home.footer.links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foam">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-6 flex flex-col gap-2 font-mono text-[11px] tracking-[0.12em] text-foam/40 sm:flex-row sm:justify-between">
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-foam">
            {CONTACT_EMAIL}
          </a>
          <p>{home.footer.copyright}</p>
        </div>
      </footer>
    </section>
  );
}

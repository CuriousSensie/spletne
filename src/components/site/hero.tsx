import { ShaderCanvas } from "@/components/shaders/shader-canvas";
import { STREAKS } from "@/components/shaders/library";
import { PALETTES } from "@/components/shaders/palettes";
import { Wordmark } from "./wordmark";

const NAV = [
  { href: "#what-we-do", label: "What we do" },
  { href: "#process", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Hero() {
  return (
    <section
     
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-[radial-gradient(ellipse_at_30%_40%,#0f2f4a,#04101e_70%)] text-foam [height:100svh]"
    >
      <ShaderCanvas frag={STREAKS} palette={PALETTES.ocean} speed={0.9} scale={0.6} className="-z-20" />
      {/* Legibility: darken the bottom where the copy sits. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink/80 via-ink/15 to-ink/30" />

      <header className="mx-auto flex w-full max-w-[96rem] items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 font-mono text-[11px] tracking-[0.14em] text-foam/70 uppercase md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foam">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#start"
          className="rounded-full border border-foam/25 px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase backdrop-blur-sm transition-colors hover:border-foam/60 hover:bg-foam/10"
        >
          Free preview
        </a>
      </header>

      <div className="mx-auto grid w-full max-w-[96rem] flex-1 content-center gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-center md:gap-8 lg:px-12">
        <div className="md:col-span-7">
          <p className="rise-in font-mono text-[11px] tracking-[0.18em] text-mist uppercase">Web studio · Ljubljana</p>
          <h1
            id="hero-title"
            className="rise-in mt-4 max-w-[11ch] text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-light tracking-[-0.055em] [animation-delay:120ms]"
          >
            See your new website{" "}
            <em className="font-serif font-normal tracking-[-0.02em]">first.</em>
          </h1>
          <a
            href="#start"
            className="rise-in group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-foam pr-2 pl-5 text-sm font-medium text-ink transition-transform [animation-delay:380ms] active:scale-[0.98] sm:mt-10"
          >
            Show me my new site
            <span className="grid size-8 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
              <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        {/* Slanted subheading over its own reflection. */}
        <div className="rise-in [animation-delay:260ms] md:col-span-5 md:justify-self-end">
          <div className="-rotate-[6deg] md:-rotate-[8deg] md:[transform-origin:left_bottom]">
            <p className="max-w-[20ch] font-serif text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.02] text-foam italic">
              Built before you pay. Paid only if you love it.
            </p>
            <p
              aria-hidden="true"
              className="mt-1 max-w-[20ch] -scale-y-100 font-serif text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.02] text-foam/45 italic select-none [mask-image:linear-gradient(to_top,black,transparent_75%)] blur-[0.5px]"
            >
              Built before you pay. Paid only if you love it.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between px-5 pb-6 font-mono text-[11px] tracking-[0.14em] text-foam/55 uppercase sm:px-8 sm:pb-8 lg:px-12">
        <a href="#what-we-do" className="flex items-center gap-3 hover:text-foam" aria-label="Scroll to what we do">
          <span className="relative block h-9 w-px overflow-hidden bg-foam/15">
            <span className="scroll-cue absolute inset-0 bg-foam" />
          </span>
          <span className="hidden sm:inline">Scroll</span>
        </a>
      </div>
    </section>
  );
}

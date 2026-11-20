import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export function Hero() {
  return (
    <section className="relative min-h-[90svh] overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(205,189,168,0.58),transparent_34%),linear-gradient(135deg,#18202a_0%,#07172a_54%,#12151b_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="ambient-drift absolute -inset-[10%] bg-[radial-gradient(ellipse_at_70%_60%,rgba(239,116,71,0.2),transparent_45%),radial-gradient(ellipse_at_30%_80%,rgba(116,140,178,0.22),transparent_50%)] blur-2xl" />
      </div>
      <div className="hero-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(3,11,21,0.28),transparent_34%),radial-gradient(ellipse_at_82%_50%,rgba(3,11,21,0.22),transparent_30%),linear-gradient(180deg,rgba(3,11,21,0.04)_0%,rgba(3,11,21,0.1)_100%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid min-h-[90svh] w-full max-w-[88rem] grid-cols-1 content-center gap-6 px-5 py-32 sm:px-8 md:py-40 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="flex min-w-0 items-start gap-3 sm:items-center lg:col-span-6">
          <Link
            aria-label="Spletne home"
            href="/"
            className="shrink-0 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[7px] border border-white/20 bg-white/[0.06] text-[#f4f1e9] sm:size-10">
              <LogoMark className="size-5" />
            </span>
          </Link>
          <div className="min-w-0">
            <h1
              id="hero-title"
              className="hero-text-reveal max-w-[20ch] min-w-0 text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl"
            >
              See your new website first
            </h1>
          </div>
        </div>
        <div className="hero-text-reveal hero-text-reveal--support min-w-0 pl-12 sm:pl-13 lg:col-span-5 lg:col-start-8 lg:self-center lg:pl-0">
          <p className="max-w-[48ch] text-lg/6 text-pretty lg:max-w-[60ch]">
            <span className="font-medium text-[#f4f1e9] sm:block">Spletne is a boutique web studio.</span>{" "}
            <span className="font-medium text-balance text-[#f4f1e9]/52 sm:block">
              Pay only if you love what we built.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

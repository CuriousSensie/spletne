"use client";

import { useState } from "react";

interface Feature {
  id: string;
  title: string;
  body: string;
}

const FEATURES: readonly Feature[] = [
  {
    id: "preview",
    title: "Preview before you pay",
    body: "We build a working version of your site first. Click through it on your own phone before any invoice exists.",
  },
  {
    id: "fixed-price",
    title: "One fixed price to launch",
    body: "If you love it, we launch for a price agreed up front. No hourly surprises and no subscription.",
  },
  {
    id: "ownership",
    title: "You own everything",
    body: "Your domain, your hosting, your code. Leave whenever you like and take it all with you.",
  },
  {
    id: "mobile",
    title: "Built for phones first",
    body: "Most clients find you on mobile. Every page is designed there first and scaled up from it.",
  },
];

const BAR = "h-2 rounded-full bg-white/20";

export function Features() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="how-it-works"
      className="scroll-mt-12 bg-[#faf7f1] py-24 text-[#07172a] md:py-36"
      aria-labelledby="features-title"
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <h2
          id="features-title"
          className="max-w-[40ch] text-[1.125rem]/6 font-medium tracking-tight text-balance sm:text-[1.625rem]/8 lg:max-w-[50%]"
        >
          Design, build, and launch with one studio.{" "}
          <span className="text-[#07172a]/52">
            See the work, give feedback, and approve it only when it feels right.
          </span>
        </h2>
        <div className="mt-16 sm:mt-20">
          <div className="grid gap-6 sm:gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="order-2 lg:col-span-7">
              <div className="relative h-[27.5rem] text-[#f4f1e9] sm:h-[29.25rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_30px_80px_rgb(7_23_42/32%)] ring-1 ring-white/10"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(205,189,168,0.5),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(100,92,140,0.55),transparent_50%),linear-gradient(135deg,#18202a,#07172a_55%,#12151b)]" />
                  <div className="hero-noise absolute inset-0 opacity-45" />
                  <div className="absolute inset-0 bg-linear-to-b from-[rgb(2_7_12/28%)] to-[rgb(2_7_12/56%)]" />
                  <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_24%)] bg-black/72 backdrop-blur-2xl" />
                </div>
                <div className="absolute inset-x-0 top-0 flex h-11 items-center gap-2 px-4">
                  <span className="size-4 rounded-[5px] border border-white/40" />
                  <p className="text-xs text-white/68">Northline Dental · Preview</p>
                </div>
                <div className="absolute inset-x-0 top-11 bottom-14 overflow-hidden px-6 py-4">
                  <div className="mx-auto grid h-full max-w-md grid-rows-[auto_1fr] gap-4 rounded-lg bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                      <span className={`${BAR} w-16`} />
                      <span className="flex gap-2">
                        <span className={`${BAR} w-8`} />
                        <span className={`${BAR} w-8`} />
                      </span>
                    </div>
                    <div className="grid content-start gap-3">
                      <span className="h-4 w-3/4 rounded-full bg-white/70" />
                      <span className="h-4 w-1/2 rounded-full bg-white/70" />
                      <span className={`${BAR} mt-2 w-5/6`} />
                      <span className={`${BAR} w-2/3`} />
                      <span className="mt-3 h-8 w-32 rounded-full bg-[var(--midnight-ivory)]" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <span className="h-16 rounded-md bg-white/10" />
                        <span className="h-16 rounded-md bg-white/10" />
                        <span className="h-16 rounded-md bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-3 flex justify-center">
                  <span className="inline-flex h-8 items-center gap-1 rounded-full bg-black/45 px-3 text-[11px] text-white/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-[5px]">
                    <span className="text-white/46 max-sm:hidden">Status:</span>
                    Ready to review
                  </span>
                </div>
              </div>
            </div>

            <ol className="order-1 grid gap-1 lg:col-span-5" aria-label="Spletne features">
              {FEATURES.map((f, i) => {
                const isOpen = i === open;
                return (
                  <li key={f.id} className="t-acc relative pl-6" data-open={isOpen}>
                    <span aria-hidden="true" className="absolute inset-y-1 left-0 w-0.5 overflow-hidden rounded-full bg-[#07172a]/10">
                      {isOpen && (
                        <span
                          key={open}
                          className="story-progress block size-full bg-[#07172a]"
                          style={{ animationDuration: "8s" }}
                          onAnimationEnd={() => setOpen((o) => (o + 1) % FEATURES.length)}
                        />
                      )}
                    </span>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`story-${f.id}`}
                      onClick={() => setOpen(i)}
                      className={`w-full cursor-pointer rounded-sm py-3 text-left text-xl tracking-tight text-balance transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07172a] motion-reduce:transition-none sm:text-2xl ${
                        isOpen ? "text-[#07172a]" : "text-[#07172a]/40 hover:text-[#07172a]/70"
                      }`}
                    >
                      {f.title}
                    </button>
                    <div id={`story-${f.id}`} className="t-acc-panel" aria-hidden={!isOpen} inert={!isOpen}>
                      <div className="t-acc-panel-inner">
                        <p className="max-w-[44ch] pb-4 text-base/6 text-pretty text-[#07172a]/72 sm:text-sm/[1.5]">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

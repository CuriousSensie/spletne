import { home } from "@/content/home";
import { CompareSlider } from "./compare-slider";

const t = home.whatWeDo;

/** Block 2: one screen tall at desktop sizes, like the hero. */
export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="what-title" className="relative flex min-h-svh scroll-mt-4 flex-col justify-center bg-foam text-ink">
      <div className="mx-auto grid w-full max-w-[96rem] gap-8 px-5 py-16 sm:gap-10 sm:px-8 lg:px-12 lg:pt-20 lg:pb-12">
        <div className="grid justify-items-center gap-3 text-center">
          <h2
            id="what-title"
            lang={t.title.lang}
            className="text-[clamp(1.85rem,4.4vw,4rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance lg:whitespace-nowrap"
          >
            {t.title.text}
          </h2>
          <p className="max-w-[52ch] text-[16px] leading-snug text-ink/60 sm:text-[17px]">{t.sub}</p>
        </div>
        <CompareSlider />
      </div>
    </section>
  );
}

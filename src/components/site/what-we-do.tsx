import { CompareSlider } from "./compare-slider";

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="what-title" className="relative scroll-mt-4 bg-foam text-ink">
      <div className="mx-auto grid w-full max-w-[96rem] gap-12 px-5 py-20 sm:gap-16 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <h2
          id="what-title"
          className="mx-auto max-w-[22ch] text-center text-[clamp(1.85rem,5.4vw,4rem)] leading-[1.02] font-light tracking-[-0.045em] text-balance"
        >
          Got an old website? Or, does your website look like AI slop? We redesign, reevamp and rebuild it{" "}
          <em className="font-serif font-normal tracking-[-0.01em]">before</em> you pay a thing.
        </h2>
        <CompareSlider />
      </div>
    </section>
  );
}

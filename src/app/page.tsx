import { BackToTop } from "@/components/site/back-to-top";
import { FinalCta } from "@/components/site/final-cta";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { PreviewAccess } from "@/components/site/preview-access";
import { Pricing } from "@/components/site/pricing";
import { WhatWeDo } from "@/components/site/what-we-do";

/** Conversion-focused: hero, what we do, how it works, pricing, private preview, inquiry. Details live on /vec. */
export default function HomePage() {
  return (
    <main className="isolate overflow-x-clip bg-ink text-foam">
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <Pricing />
      <PreviewAccess />
      <FinalCta />
      <SmoothScroll />
      <BackToTop />
    </main>
  );
}

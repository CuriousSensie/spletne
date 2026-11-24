import { BackToTop } from "@/components/site/back-to-top";
import { Details } from "@/components/site/details";
import { FinalCta } from "@/components/site/final-cta";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { PreviewAccess } from "@/components/site/preview-access";
import { Pricing } from "@/components/site/pricing";
import { WhatWeDo } from "@/components/site/what-we-do";

export default function HomePage() {
  return (
    <main className="isolate overflow-x-clip bg-ink text-foam">
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <PreviewAccess />
      <Pricing />
      <Details />
      <FinalCta />
      <SmoothScroll />
      <BackToTop />
    </main>
  );
}

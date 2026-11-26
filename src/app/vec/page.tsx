import type { Metadata } from "next";
import { BackToTop } from "@/components/site/back-to-top";
import { Exploded } from "@/components/site/exploded";
import { Faq } from "@/components/site/faq";
import { MoreCta } from "@/components/site/more-cta";
import { PageHeader } from "@/components/site/page-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";

export const metadata: Metadata = {
  title: "Kaj dobite in pogosta vprašanja · Spletne",
  description: "Kaj vključuje nova spletna stran, kako poteka sodelovanje in odgovori na najpogostejša vprašanja.",
  alternates: { canonical: "/vec" },
};

/** Inner page: the detail that doesn't belong on the home page. */
export default function MorePage() {
  return (
    <main className="isolate overflow-x-clip bg-ink text-foam">
      <PageHeader id="top" />
      <section id="what-you-get" aria-labelledby="get-title" className="relative">
        <Exploded />
      </section>
      <Faq />
      <MoreCta />
      <SiteFooter />
      <SmoothScroll />
      <BackToTop />
    </main>
  );
}

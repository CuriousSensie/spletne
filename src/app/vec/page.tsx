import type { Metadata } from "next";
import { BackToTop } from "@/components/site/back-to-top";
import { Exploded } from "@/components/site/exploded";
import { Faq } from "@/components/site/faq";
import { MoreCta } from "@/components/site/more-cta";
import { PageHeader } from "@/components/site/page-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";

export const metadata: Metadata = {
  title: "Pogosta vprašanja in kaj dobite · Spletne",
  description: "Odgovori na najpogostejša vprašanja ter kaj vključuje nova spletna stran.",
  alternates: { canonical: "/vec" },
};

/** Inner page: the detail that doesn't belong on the home page. */
export default function MorePage() {
  return (
    <main className="isolate overflow-x-clip bg-ink text-foam">
      <PageHeader id="top" />
      <Faq />
      <section id="what-you-get" aria-labelledby="get-title" className="relative">
        <Exploded />
      </section>
      <MoreCta />
      <SiteFooter />
      <SmoothScroll />
      <BackToTop />
    </main>
  );
}

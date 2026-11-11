"use client";

import { useId, useState } from "react";
import { Exploded } from "./exploded";

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

interface Faq {
  q: string;
  a: string;
}

/** PLACEHOLDER: confirm turnaround times and hosting costs before launch. */
const FAQS: readonly Faq[] = [
  {
    q: "What do I get for free?",
    a: "A working version of your new site, built from your current one. Open it on your phone, click around, show it to your team. No card, no deposit.",
  },
  {
    q: "What if I don’t love it?",
    a: "Then you pay nothing and that’s the end of it. No invoice, no follow-up calls. If we missed the mark, tell us why and we’ll have another go.",
  },
  {
    q: "Why build it for free?",
    a: "Because showing beats explaining. Most owners can’t picture a new site until they’re holding it. Once they are, most of them say yes.",
  },
  {
    q: "What do you need from me?",
    a: "The link to your current website. We take your text, photos and services from there. If you have a logo or newer photos, send them along.",
  },
  {
    q: "How long does it take?",
    a: "Your preview is ready in 3 to 5 working days. Say yes and the site is live within a week.",
  },
  {
    q: "What does it cost after launch?",
    a: "Just your domain and hosting, usually a few euros a month, paid straight to the provider in your name. Nothing goes to us.",
  },
  {
    q: "Do I own it?",
    a: "Yes. The domain, the hosting and the code are all in your name. If you ever leave, everything goes with you.",
  },
  {
    q: "Can I change things later?",
    a: "Yes. Small edits are quick and cheap. You can also edit it yourself or hire someone else. We won’t mind.",
  },
];

function FaqItem({ item, open, onToggle, index }: { item: Faq; open: boolean; onToggle: () => void; index: number }) {
  const id = useId();
  return (
    <li className="border-b border-foam/12">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="group flex w-full items-baseline gap-4 py-5 text-left outline-none focus-visible:bg-foam/[0.04] sm:gap-6 sm:py-6"
        >
          <span className="w-6 shrink-0 font-mono text-[11px] tracking-[0.12em] text-foam/35 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className={`flex-1 text-[clamp(1.1rem,2vw,1.45rem)] leading-tight font-light tracking-[-0.025em] transition-colors ${open ? "text-foam" : "text-foam/75 group-hover:text-foam"}`}>
            {item.q}
          </span>
          <span aria-hidden="true" className={`relative grid size-8 shrink-0 place-items-center self-center rounded-full ring-1 transition-colors ${open ? "bg-foam text-ink ring-foam" : "text-foam ring-foam/20 group-hover:ring-foam/50"}`}>
            <span className="absolute h-px w-3 bg-current" />
            <span className={`absolute h-3 w-px bg-current transition-transform duration-300 ${open ? "scale-y-0" : ""}`} />
          </span>
        </button>
      </h4>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-smooth-out)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="max-w-[58ch] pr-12 pb-6 pl-10 text-[16px] leading-relaxed text-foam/65 sm:pl-12">{item.a}</p>
        </div>
      </div>
    </li>
  );
}

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}).replace(/</g, "\\u003c");

/* ------------------------------------------------------------------ */

export function Details() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="what-you-get" aria-labelledby="get-title" className="relative bg-ink text-foam">
      <Exploded />

      <div className="mx-auto max-w-[96rem] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12 lg:pb-36">
        <div id="faq" className="grid scroll-mt-8 gap-10 border-t border-foam/12 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="grid content-start gap-5 lg:col-span-4 lg:sticky lg:top-12 lg:self-start">
            <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">Questions</p>
            <h3 className="text-[clamp(1.7rem,4vw,3rem)] leading-[1.02] font-light tracking-[-0.045em]">
              Asked and <em className="font-serif font-normal tracking-[-0.01em]">answered.</em>
            </h3>
            <p className="max-w-[32ch] text-[15px] leading-snug text-foam/60">
              Still unsure?{" "}
              <a href="#start" className="text-foam underline decoration-foam/30 underline-offset-4 transition-colors hover:decoration-foam">
                Just ask.
              </a>
            </p>
          </div>
          <ul className="border-t border-foam/12 lg:col-span-8">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} item={f} index={i} open={open === i} onToggle={() => setOpen((o) => (o === i ? null : i))} />
            ))}
          </ul>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </section>
  );
}

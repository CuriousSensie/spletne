"use client";

import { useState } from "react";
import { Chevron } from "@/components/chevron";

interface FaqItem {
  q: string;
  a: string;
}

const ITEMS: readonly FaqItem[] = [
  {
    q: "What does the free preview include?",
    a: "A working version of your homepage and key pages, built from your brand, photos and services. You can click through it on your phone before deciding anything.",
  },
  {
    q: "What if I don’t like it?",
    a: "Then you owe nothing. There is no deposit, no cancellation fee and no follow-up pressure. We’d rather hear what missed the mark so we can try once more.",
  },
  {
    q: "How much does launching cost?",
    a: "A fixed price, agreed before you see the preview and confirmed after. It covers final polish, setup and going live. There is no subscription.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. You own the domain, the hosting account and the code. If you ever want to move on, we hand everything over.",
  },
  {
    q: "How long does a preview take?",
    a: "Usually a few working days from when we receive your details. We take on a limited number of projects each month so each one gets proper attention.",
  },
  {
    q: "Can you update the site later?",
    a: "Of course. Small changes are quick to book, and you are always free to edit the site yourself or hire anyone else.",
  },
  {
    q: "How do I get started?",
    a: "Leave your email below and tell us a little about your business. We’ll reply with a short list of what we need to begin.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-[#07172a]/5 bg-[#faf7f1] py-32 text-[#07172a] md:py-40" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="max-w-[18ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="t-acc border-t border-[#07172a]/5 first:border-t-0" data-open={isOpen}>
                  <h3>
                    <button
                      id={`faq-trigger-${i}`}
                      type="button"
                      aria-controls={`faq-panel-${i}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={`flex w-full min-w-0 cursor-pointer items-center justify-between gap-6 rounded-sm text-left text-base font-medium text-balance outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07172a] ${
                        isOpen ? "pb-5" : "min-h-16 py-5"
                      }`}
                    >
                      <span className="min-w-0">{item.q}</span>
                      <Chevron />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    className="t-acc-panel"
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <div className="t-acc-panel-inner">
                      <p className="max-w-[70ch] pr-8 pb-6 text-base/6 text-pretty text-[#07172a]/72 sm:pr-12 sm:text-sm/[1.6]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";

interface UseCase {
  id: string;
  label: string;
  title: string;
  quote: string;
  body: string;
}

const USE_CASES: readonly UseCase[] = [
  {
    id: "restaurants",
    label: "Restaurants",
    title: "Fill more tables",
    quote: "“Can guests see the menu and book from their phone?”",
    body: "A mobile-first menu, opening hours and one-tap booking, previewed before you commit.",
  },
  {
    id: "clinics",
    label: "Clinics",
    title: "Earn trust at first glance",
    quote: "“Will new patients know we’re the right fit?”",
    body: "Clear services, team profiles and appointment requests that feel as calm as your practice.",
  },
  {
    id: "law",
    label: "Law firms",
    title: "Look as established as you are",
    quote: "“Does our website match the work we do?”",
    body: "Considered typography and plain-spoken copy that signals expertise without the jargon.",
  },
  {
    id: "salons",
    label: "Salons",
    title: "Let your work do the talking",
    quote: "“Can clients see our style before they book?”",
    body: "Image-led galleries, service pricing ranges and instant booking built into every page.",
  },
  {
    id: "studios",
    label: "Studios",
    title: "Show the craft, keep it simple",
    quote: "“Is it easy to see what we make and how to hire us?”",
    body: "A focused portfolio with a single, obvious next step for every visitor.",
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = USE_CASES[active];

  const onKeyDown = (e: React.KeyboardEvent, index: number): void => {
    const last = USE_CASES.length - 1;
    let next = index;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#07172a] py-24 text-[#f4f1e9] md:py-32"
      aria-labelledby="use-cases-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 -inset-y-40 bg-[radial-gradient(circle_at_80%_20%,rgba(205,189,168,0.35),transparent_40%),radial-gradient(circle_at_15%_85%,rgba(100,92,140,0.4),transparent_50%),linear-gradient(160deg,#18202a,#07172a_60%,#12151b)]" />
      </div>
      <div className="hero-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[#07172a]/45" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <h2
          id="use-cases-title"
          className="max-w-[40ch] text-[1.125rem]/6 font-medium tracking-tight text-balance sm:text-[1.625rem]/8 lg:max-w-[50%]"
        >
          <span>See it before it counts. </span>
          <span className="text-[#f4f1e9]/62 sm:text-[#f4f1e9]/56">
            Whatever your business, we start with a preview built around you.
          </span>
        </h2>
        <div className="mt-14 sm:mt-16">
          <div
            role="tablist"
            aria-label="Businesses we work with"
            className="relative z-10 mb-3 grid grid-cols-3 gap-1 sm:-mb-2 sm:flex sm:gap-0 sm:pb-2"
          >
            {USE_CASES.map((uc, i) => {
              const selected = i === active;
              return (
                <button
                  key={uc.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`use-case-tab-${uc.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="use-case-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`use-case-tab relative min-h-11 shrink-0 cursor-pointer rounded-lg px-2 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current motion-reduce:transition-none sm:rounded-b-none sm:px-5 sm:text-sm ${
                    selected ? "z-10 text-[#07172a]" : "text-[#f4f1e9]/78 hover:text-[#f4f1e9]"
                  }`}
                >
                  {selected && (
                    <span
                      className="use-case-tab-surface absolute inset-0 rounded-lg bg-[var(--midnight-paper)] sm:-bottom-2 sm:rounded-b-none"
                      data-first={i === 0}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{uc.label}</span>
                </button>
              );
            })}
          </div>
          <div
            id="use-case-panel"
            role="tabpanel"
            aria-labelledby={`use-case-tab-${current.id}`}
            className="rounded-lg bg-[var(--midnight-paper)] text-[#07172a]"
          >
            <div
              key={current.id}
              className="panel-in grid min-h-[25rem] content-start gap-8 p-6 sm:min-h-0 sm:p-8 lg:min-h-[16rem] lg:grid-cols-12 lg:content-normal lg:items-center lg:gap-8 lg:px-12 lg:py-10"
            >
              <h3 className="max-w-[16ch] text-3xl/[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl/[1.02] lg:col-span-5">
                {current.title}
              </h3>
              <div className="grid gap-2 lg:col-span-6 lg:col-start-7">
                <blockquote className="text-xl/7 font-medium tracking-tight text-pretty">{current.quote}</blockquote>
                <p className="max-w-[54ch] text-base/6 text-pretty text-[#07172a]/72">{current.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

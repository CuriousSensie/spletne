"use client";

import { useEffect, useRef, useState } from "react";

const COPY =
  "We build a working preview of your website before you pay a cent. If you love it, we launch it for a fixed price. If you don’t, you owe nothing.";

const WORDS = COPY.split(" ");
const TOTAL_CHARS = COPY.replace(/ /g, "").length;

const clamp = (n: number, min = 0, max = 1): number => Math.min(max, Math.max(min, n));

/** Maps v from [a, b] to [0, 1]. */
const range = (v: number, a: number, b: number): number => clamp((v - a) / (b - a));

const BRIEFS = [
  { title: "Menu & booking", accent: "3" },
  { title: "Mobile first", accent: "1" },
  { title: "Clear next step", accent: "2" },
] as const;

export function Manifesto() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(TOTAL_CHARS);
  const [fragments, setFragments] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = (): void => {
      frame = 0;
      const el = scrollRef.current;
      if (!el || reduced.matches) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (rect.height - window.innerHeight));
      setLit(Math.round(range(p, 0.02, 0.5) * TOTAL_CHARS));
      setFragments(p < 0.08 ? 0 : p < 0.2 ? 1 : p < 0.32 ? 2 : p < 0.55 ? 3 : 0);
      exitRef.current?.style.setProperty("--manifesto-exit", String(range(p, 0.55, 0.75)));
      const demo = demoRef.current;
      if (demo) {
        const reveal = range(p, 0.6, 0.92);
        demo.style.setProperty("--demo-reveal", String(reveal));
        demo.style.visibility = reveal > 0 ? "visible" : "hidden";
      }
    };

    const onScroll = (): void => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (reduced.matches) {
      if (demoRef.current) demoRef.current.style.visibility = "visible";
    } else {
      frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  let charIndex = 0;

  return (
    <section
      id="conversation-intro"
      aria-label="How Bespoke works"
      className="bg-[var(--midnight-paper)] py-16 text-[#07172a] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-10">
        <div ref={scrollRef} className="manifesto-scroll">
          <div className="manifesto-sticky">
            <div ref={exitRef} className="manifesto-content">
              <h2 className="manifesto-copy" aria-label={COPY}>
                <span aria-hidden="true">
                  {WORDS.map((word, w) => (
                    <span key={w}>
                      <span className="manifesto-word">
                        {word.split("").map((char, c) => {
                          const on = charIndex++ < lit;
                          return (
                            <span key={c} className="manifesto-char" data-lit={on}>
                              {char}
                            </span>
                          );
                        })}
                      </span>{" "}
                    </span>
                  ))}
                </span>
              </h2>

              <div
                aria-hidden="true"
                className={`manifesto-fragment manifesto-vignette manifesto-question-wrap ${fragments >= 1 ? "is-visible" : ""}`}
              >
                <div className="manifesto-vignette-body">
                  <p className="t-digit-group text-[0.9375rem] font-medium tracking-tight whitespace-nowrap text-[#07172a]">
                    {fragments >= 1 && (
                      <>
                        <span className="t-digit">Is</span>
                        <span className="t-digit">our</span>
                        <span className="t-digit">site</span>
                        <span className="t-digit" data-stagger="1">costing</span>
                        <span className="t-digit" data-stagger="2">us clients?</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="manifesto-vignette-footer">
                  <p className="manifesto-vignette-speaker">You</p>
                  <p>Local business · Redesign</p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className={`manifesto-fragment manifesto-vignette manifesto-working-wrap ${fragments >= 2 ? "is-visible" : ""}`}
              >
                <div className="manifesto-vignette-body">
                  <p className="text-[0.9375rem] leading-[1.2] font-medium tracking-tight">
                    <span className="t-shimmer [--shimmer-base:rgb(7_23_42/82%)]" data-text="Building your preview">
                      <span className="text-[#07172a] opacity-[0.84]">Building your</span>{" "}
                      <span className="text-[#07172a]/42">preview</span>
                    </span>
                  </p>
                </div>
                <div className="manifesto-vignette-footer">
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="size-2 rounded-full bg-[var(--midnight-orange)]" />
                    <p className="manifesto-vignette-speaker">Bespoke</p>
                  </div>
                  <p>Preview · Day 3</p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className={`manifesto-fragment manifesto-briefs-wrap ${fragments >= 3 ? "is-visible" : ""}`}
              >
                <ol className="flex gap-[0.55rem] py-4">
                  {BRIEFS.map((b) => (
                    <li key={b.title}>
                      <article className="brief-rail-card text-[#f4f1e9]" data-accent={b.accent}>
                        <span className="brief-grain" />
                        <div className="brief-card-copy">
                          <h3 className="max-w-[18ch] font-medium tracking-tight text-balance">{b.title}</h3>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div ref={demoRef} className="manifesto-demo" style={{ visibility: "hidden" }}>
              <div className="manifesto-demo-surface">
                <div className="overflow-hidden bg-[#101c29] px-1 pb-1 text-[#f4f1e9] sm:px-1.5 sm:pb-1.5">
                  <div className="relative flex h-13 items-center justify-between gap-4 px-3 sm:h-13.5 sm:px-4">
                    <div className="flex items-center gap-3">
                      <span className="size-[18px] rounded-[5px] border border-white/30" />
                      <span className="hidden text-sm font-medium tracking-tight sm:inline">Bespoke</span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs leading-none text-white/45">
                      Sample preview · About 2 minutes
                    </div>
                    <div aria-hidden="true" className="flex items-center gap-4 text-white/30">
                      <span className="size-2.5 rounded-full bg-current" />
                      <span className="size-2.5 rounded-full bg-current" />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg ring-1 ring-white/10">
                    <div className="relative min-h-[var(--demo-height)] overflow-hidden bg-[#07172a] text-[#f4f1e9]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(205,189,168,0.5),transparent_40%),radial-gradient(circle_at_75%_75%,rgba(100,92,140,0.5),transparent_50%),linear-gradient(135deg,#18202a,#07172a_55%,#12151b)]" />
                      <div className="hero-noise pointer-events-none absolute inset-0 opacity-45" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_14%,rgba(3,9,16,0.12)_60%,rgba(3,9,16,0.38)_100%)]" />
                      <div className="relative z-10 grid min-h-[var(--demo-height)] place-items-center px-5 py-12 text-center sm:px-8 sm:py-16">
                        <div className="grid place-items-center gap-5">
                          <p className="max-w-[22ch] text-3xl/[1.1] font-medium tracking-tight text-balance sm:text-5xl">
                            Walk through a finished preview
                          </p>
                          <p className="max-w-[48ch] text-base/7 text-pretty text-white/70 sm:text-lg/7">
                            A neighbourhood restaurant has an outdated menu and no way to book online. We rebuild
                            the site, then hand over a live preview to click through before any invoice.
                          </p>
                          <div className="mt-3">
                            <a
                              href="#waitlist"
                              className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/45 bg-linear-to-br from-[var(--midnight-ivory)] to-[var(--midnight-ivory-warm)] px-4 text-sm font-medium text-[#20252b] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                            >
                              <svg aria-hidden="true" className="size-3.5" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4 2.5v11l9-5.5z" />
                              </svg>
                              View sample
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

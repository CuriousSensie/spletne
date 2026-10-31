"use client";

import { useEffect, useRef, useState } from "react";
import { Caption } from "./caption";
import { PROJECTS } from "./projects";
import { useScrollProgress } from "./scroll";
import { DesktopShot } from "./shots";

export function ConceptRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const marquee = useRef<HTMLParagraphElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const geo = useRef({ max: 0, centers: [] as number[] });
  const [active, setActive] = useState(0);

  // Cache layout so the scroll handler never reads layout.
  useEffect(() => {
    const measure = (): void => {
      const t = track.current;
      if (!t) return;
      geo.current.max = Math.max(0, t.scrollWidth - window.innerWidth);
      geo.current.centers = items.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useScrollProgress(section, (p) => {
    const { max, centers } = geo.current;
    const x = -p * max;
    if (track.current) track.current.style.transform = `translate3d(${x}px, 0, 0)`;
    if (marquee.current) marquee.current.style.transform = `translate3d(${-20 + p * 35}%, 0, 0)`;
    const vw = window.innerWidth;
    let best = 0;
    let bestD = Infinity;
    items.current.forEach((el, i) => {
      if (!el) return;
      const d = (centers[i] + x - vw / 2) / vw; // -1..1 roughly
      const a = Math.min(Math.abs(d), 1.2);
      el.style.transform = `perspective(1400px) rotateY(${-d * 26}deg) scale(${1 - a * 0.16})`;
      el.style.opacity = String(1 - a * 0.45);
      if (Math.abs(d) < bestD) {
        bestD = Math.abs(d);
        best = i;
      }
    });
    setActive(best);
  });

  return (
    <section ref={section} aria-label="Selected work" className="relative h-[420svh] bg-ink text-foam">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <p
          ref={marquee}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-serif text-[28vw] leading-none whitespace-nowrap text-transparent italic [-webkit-text-stroke:1px_rgb(184_201_216/0.18)]"
        >
          Selected work — Selected work —
        </p>
        <p className="absolute top-6 left-5 font-mono text-[11px] tracking-[0.18em] text-mist uppercase sm:left-8 lg:left-12">(03) Selected work</p>
        <div ref={track} className="relative flex w-max items-center gap-[6vw] px-[11vw] will-change-transform">
          {PROJECTS.map((pr, i) => (
            <div
              key={pr.name}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="aspect-[16/10] w-[78vw] max-w-[60rem] will-change-transform md:w-[62vw]"
            >
              <DesktopShot theme={pr.theme} url={pr.url} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[96rem] px-5 pb-8 sm:px-8 lg:px-12 lg:pb-12">
          <Caption project={PROJECTS[active]} index={active} total={PROJECTS.length} />
        </div>
      </div>
    </section>
  );
}

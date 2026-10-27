"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserFrame, MobileSite, NewSite, OldSite } from "@/components/props/mini-sites";

/** Callouts on the redesigned site; each shows once the slider reveals its x position. */
const PINS = [
  { x: 86, y: 14, label: "Book in one tap" },
  { x: 74, y: 70, label: "Today’s free slots" },
  { x: 28, y: 88, label: "Prices up front" },
] as const;

/** The redesign sweeps in from the left: 20% → 80% revealed. */
const START = 20;
const END = 80;
const SWEEP_MS = 3200;
/** Wait until most of the slider is on screen and scrolling has settled. */
const START_DELAY_MS = 450;

function Stage({
  pos,
  setPos,
  onInteract,
  before,
  after,
  pins = false,
}: {
  pos: number;
  setPos: (p: number) => void;
  onInteract: () => void;
  before: React.ReactNode;
  after: React.ReactNode;
  pins?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; dragging: boolean; id: number } | null>(null);

  const toPos = (clientX: number): number => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return pos;
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 cursor-ew-resize touch-pan-y select-none"
      onPointerDown={(e) => {
        onInteract();
        const mouse = e.pointerType === "mouse";
        gesture.current = { x: e.clientX, y: e.clientY, dragging: mouse, id: e.pointerId };
        if (mouse) {
          e.currentTarget.setPointerCapture(e.pointerId);
          setPos(toPos(e.clientX));
        }
      }}
      onPointerMove={(e) => {
        const g = gesture.current;
        if (!g || g.id !== e.pointerId) return;
        if (!g.dragging) {
          // Touch: only take over once the gesture is clearly horizontal, so vertical scrolling still works.
          const dx = Math.abs(e.clientX - g.x);
          const dy = Math.abs(e.clientY - g.y);
          if (dx > 6 && dx > dy) {
            g.dragging = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          } else if (dy > 10) {
            gesture.current = null;
            return;
          } else return;
        }
        setPos(toPos(e.clientX));
      }}
      onPointerUp={(e) => {
        const g = gesture.current;
        // A tap (no drag) jumps the divider to that point.
        if (g && !g.dragging && Math.abs(e.clientX - g.x) < 6) setPos(toPos(e.clientX));
        gesture.current = null;
      }}
      onPointerCancel={() => (gesture.current = null)}
    >
      <div className="absolute inset-0">{before}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {after}
      </div>

      {pins &&
        PINS.map((p) => (
          <span
            key={p.label}
            aria-hidden="true"
            className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-ink/85 py-1 pr-2.5 pl-1.5 font-mono text-[10px] tracking-wide whitespace-nowrap text-foam uppercase shadow-lg backdrop-blur transition-all duration-500 ease-[var(--ease-smooth-out)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.x < pos - 4 ? 1 : 0,
              scale: p.x < pos - 4 ? "1" : "0.85",
            }}
          >
            <span className="size-1.5 rounded-full bg-[#3ddc97]" />
            {p.label}
          </span>
        ))}

      <span
        className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur transition-opacity"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        After
      </span>
      <span
        className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur transition-opacity"
        style={{ opacity: pos < 88 ? 1 : 0 }}
      >
        Before
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_12px_rgb(255_255_255/0.5)]" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-12 w-8 -translate-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-[0_8px_24px_rgb(0_0_0/0.35)] ring-1 ring-black/10 backdrop-blur">
          <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
            <path d="M6 4.5L2.5 8 6 11.5M10 4.5L13.5 8 10 11.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[9/19] w-[min(74vw,300px)] rounded-[2.6rem] bg-[#0b0f14] p-2 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7),inset_0_0_0_1px_rgb(255_255_255/0.12)]">
      <div className="relative size-full overflow-hidden rounded-[2.1rem] bg-white">{children}</div>
      <span className="pointer-events-none absolute top-4 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
    </div>
  );
}

/** The dated desktop site as a phone renders it: zoomed out, unreadable, not responsive. */
function OldOnPhone() {
  return (
    <div className="flex size-full flex-col bg-white pt-10">
      <div className="aspect-[16/11] w-full">
        <OldSite />
      </div>
      <div className="flex-1 bg-[repeating-linear-gradient(45deg,#d4d0c8_0_2px,#c9c5bd_2px_4px)]" />
    </div>
  );
}

export function CompareSlider() {
  const [pos, setPos] = useState(START);
  const wrap = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const raf = useRef(0);
  const delay = useRef(0);

  const stopHint = useCallback((): void => {
    interacted.current = true;
    window.clearTimeout(delay.current);
    cancelAnimationFrame(raf.current);
  }, []);

  // Once in view, the redesign sweeps across the old site. Any interaction cancels it.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || interacted.current) return;
        io.disconnect();
        const ease = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        let start = 0;
        const tick = (now: number): void => {
          if (interacted.current) return;
          start ||= now;
          const t = Math.min(1, (now - start) / SWEEP_MS);
          setPos(START + (END - START) * ease(t));
          if (t < 1) raf.current = requestAnimationFrame(tick);
        };
        delay.current = window.setTimeout(() => (raf.current = requestAnimationFrame(tick)), START_DELAY_MS);
      },
      { threshold: 0.75 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(delay.current);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Stable elements: the sweep updates `pos` every frame, and these must not re-render with it.
  const frames = useMemo(
    () => ({
      phoneBefore: <OldOnPhone />,
      phoneAfter: <MobileSite theme="dental" />,
      before: <OldSite />,
      after: <NewSite theme="dental" />,
    }),
    [],
  );

  return (
    <div ref={wrap} className="mx-auto w-full max-w-[min(72rem,calc((100svh-6rem)*1.6))]">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare the old and new website"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% of the redesign shown`}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 20 : 5;
          const map: Record<string, number> = { ArrowLeft: pos - step, ArrowRight: pos + step, Home: 0, End: 100 };
          if (!(e.key in map)) return;
          e.preventDefault();
          stopHint();
          setPos(Math.min(100, Math.max(0, map[e.key])));
        }}
        className="rounded-[2.6rem] outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-foam md:rounded-xl"
      >
        {/* Mobile: phone frame. */}
        <div className="md:hidden">
          <Phone>
            <Stage pos={pos} setPos={setPos} onInteract={stopHint} before={frames.phoneBefore} after={frames.phoneAfter} />
          </Phone>
        </div>
        {/* Tablet and up: browser frame with callouts. */}
        <div className="hidden md:block">
          <BrowserFrame url="northlinedental.si" className="aspect-[16/10] w-full">
            <Stage pos={pos} setPos={setPos} onInteract={stopHint} before={frames.before} after={frames.after} pins />
          </BrowserFrame>
        </div>
      </div>

    </div>
  );
}

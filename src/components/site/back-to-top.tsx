"use client";

import { useEffect, useState } from "react";

/** Floating "back to top" button, shown once the visitor is a screen past the hero. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // A plain anchor so Lenis (anchors: true) animates the scroll and it still works without JS.
    <a
      href="#top"
      // Lenis scrolls without moving focus; hand it to the top so it isn't left on a now-hidden link.
      onClick={() => document.getElementById("top")?.focus({ preventScroll: true })}
      aria-label="Na vrh strani"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-4 z-50 grid size-12 place-items-center rounded-full bg-foam text-ink shadow-lg shadow-ink/30 ring-1 ring-ink/10 transition-[opacity,translate] duration-300 hover:bg-white motion-reduce:transition-none active:scale-95 sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
        <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

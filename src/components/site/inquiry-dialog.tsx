"use client";

import { useEffect, useRef } from "react";
import { home } from "@/content/home";
import { InquiryForm } from "./inquiry-form";
import type { InquiryPrefill } from "./inquiry-context";

const t = home.inquiry;

/**
 * Native modal dialog: focus trap, Esc and focus return come from the browser.
 * The form only exists while open, so every opening starts clean.
 */
export function InquiryDialog({ open, prefill, onClose }: { open: boolean; prefill: InquiryPrefill; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      // Esc and form-less closes fire `close`; keep React state in sync.
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="inquiry-title"
      // Lenis must not hijack wheel/touch scrolling inside the dialog.
      data-lenis-prevent
      className="m-auto max-h-[min(92svh,56rem)] w-[min(94vw,40rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-deep p-0 text-foam shadow-2xl ring-1 ring-foam/10 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="grid gap-6 p-6 sm:p-9">
          <header className="flex items-start justify-between gap-6">
            <div className="grid gap-2">
              <h2 id="inquiry-title" className="text-[clamp(1.5rem,3vw,2rem)] leading-tight font-light tracking-[-0.035em]">
                {t.title}
              </h2>
              <p className="text-[15px] leading-snug text-foam/60">{t.intro}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="grid size-9 shrink-0 place-items-center rounded-full text-foam ring-1 ring-foam/20 transition-colors hover:ring-foam/60"
            >
              <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <InquiryForm prefill={prefill} onDone={onClose} />
        </div>
      )}
    </dialog>
  );
}

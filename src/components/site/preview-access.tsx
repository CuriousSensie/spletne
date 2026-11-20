"use client";

import { useActionState, useRef, useState } from "react";
import { openPreview, type OpenPreviewState } from "@/app/actions/open-preview";
import { home } from "@/content/home";
import { EmTitle } from "./em-title";

const t = home.previewAccess;
const LENGTH = 6;
const INITIAL: OpenPreviewState = { status: "idle" };
const clean = (v: string): string =>
  v
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, LENGTH);

/**
 * Six visual cells over one real input: typing, paste, autofill and screen readers all work on a normal field,
 * while the cells show progress.
 */
function CodeField({ value, onChange, invalid }: { value: string; onChange: (v: string) => void; invalid: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative" onClick={() => input.current?.focus()}>
      <div aria-hidden="true" className="grid grid-cols-6 gap-2">
        {Array.from({ length: LENGTH }, (_, i) => {
          const ch = value[i] ?? "";
          const current = focused && i === Math.min(value.length, LENGTH - 1);
          return (
            <span
              key={i}
              className={`grid aspect-[4/5] place-items-center rounded-xl font-mono text-[clamp(1.3rem,3vw,1.9rem)] text-foam ring-1 transition-[box-shadow,background-color] duration-200 ${
                invalid ? "ring-[#ff8a7a]/70" : current ? "bg-foam/[0.08] ring-foam/60" : ch ? "bg-foam/[0.06] ring-foam/20" : "bg-foam/[0.03] ring-foam/12"
              }`}
            >
              {ch || <span className="text-foam/20">·</span>}
            </span>
          );
        })}
      </div>
      <input
        ref={input}
        name="code"
        value={value}
        onChange={(e) => onChange(clean(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={t.card.inputLabel}
        aria-invalid={invalid}
        autoComplete="one-time-code"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={LENGTH + 4}
        className="absolute inset-0 size-full cursor-text bg-transparent text-transparent caret-transparent outline-none selection:bg-transparent"
      />
    </div>
  );
}

export function PreviewAccess() {
  const [state, action, pending] = useActionState(openPreview, INITIAL);
  const [code, setCode] = useState("");
  const error = state.status === "error" ? state.message : null;

  return (
    <section id="preview" aria-labelledby="preview-title" className="relative bg-ink text-foam">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:py-36 lg:grid-cols-12 lg:gap-x-16 lg:px-12">
        <div className="grid content-center gap-6 lg:col-span-6">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{t.label}</p>
          <h2 id="preview-title" className="max-w-[13ch] text-[clamp(2rem,5.6vw,4.4rem)] leading-[1.0] font-light tracking-[-0.05em]">
            <EmTitle title={t.title} />
          </h2>
          {t.body.map((p) => (
            <p key={p} className="max-w-[48ch] text-[16px] leading-relaxed text-foam/65">
              {p}
            </p>
          ))}
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={t.primary.href}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-foam pr-2 pl-5 text-sm font-medium text-ink transition-transform active:scale-[0.98]"
            >
              {t.primary.label}
              <span className="grid size-8 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
                <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href={t.secondary.href} className="inline-flex h-12 items-center rounded-full px-5 text-sm font-medium ring-1 ring-foam/25 transition-colors hover:ring-foam/60">
              {t.secondary.label}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form action={action} noValidate className="grid gap-6 rounded-[1.75rem] bg-deep p-6 ring-1 ring-foam/10 sm:p-9">
            <div className="grid gap-3">
              <p className="font-mono text-[11px] tracking-[0.18em] text-mist uppercase">{t.card.eyebrow}</p>
              <h3 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight font-light tracking-[-0.035em]">{t.card.title}</h3>
              <p className="text-[15px] leading-snug text-foam/60">{t.card.text}</p>
            </div>

            <CodeField value={code} onChange={setCode} invalid={!!error} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite" className="min-h-5 text-[14px] leading-snug text-[#ff8a7a]">
                {error}
              </p>
              <button
                type="submit"
                disabled={pending || code.length < LENGTH}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-foam px-6 text-sm font-medium text-ink transition-[transform,opacity] active:scale-[0.98] disabled:opacity-40"
              >
                {pending ? t.card.checking : t.card.button}
              </button>
            </div>

            <p className="border-t border-foam/10 pt-5 text-[14px] leading-snug text-foam/50">{t.card.note}</p>
          </form>
        </div>
      </div>
    </section>
  );
}

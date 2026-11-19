"use client";

import { useActionState } from "react";
import { requestPreview, type PreviewState } from "@/app/actions/request-preview";
import { home } from "@/content/home";

const f = home.start.form;

const INITIAL: PreviewState = { status: "idle" };

function Field({ name, label, type, placeholder, autoComplete, defaultValue, invalid, inputMode }: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  defaultValue: string;
  invalid: boolean;
  inputMode?: "url" | "email";
}) {
  return (
    <label className={`group grid gap-1 rounded-2xl bg-foam/[0.06] px-4 pt-3 pb-2.5 ring-1 transition-colors focus-within:bg-foam/[0.09] ${invalid ? "ring-[#ff8a7a]/70" : "ring-foam/12 focus-within:ring-foam/40"}`}>
      <span className="font-mono text-[10px] tracking-[0.16em] text-mist/80 uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={invalid}
        className="w-full bg-transparent text-[17px] text-foam outline-none placeholder:text-foam/30"
      />
    </label>
  );
}

export function StartForm() {
  const [state, action, pending] = useActionState(requestPreview, INITIAL);

  if (state.status === "ok") {
    return (
      <div role="status" className="grid gap-3 rounded-[1.75rem] bg-foam/[0.06] p-6 ring-1 ring-foam/12 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#7fe0b0] uppercase">{f.okEyebrow}</p>
        <p className="text-2xl leading-tight font-light tracking-[-0.03em]">
          {f.ok.before}
          <span className="font-serif italic">{state.email}</span>
          {f.ok.after}
        </p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : { site: "", email: "" };
  const errField = state.status === "error" ? state.field : undefined;

  return (
    <form action={action} noValidate className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field name="site" label={f.site.label} type="text" autoComplete="url" placeholder={f.site.placeholder} defaultValue={values.site} invalid={errField === "site"} />
        <Field name="email" label={f.email.label} type="email" inputMode="email" autoComplete="email" placeholder={f.email.placeholder} defaultValue={values.email} invalid={errField === "email"} />
      </div>
      {/* Honeypot, hidden from people and assistive tech. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="mt-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={`text-[14px] ${state.status === "error" ? "text-[#ff8a7a]" : "font-mono text-[11px] tracking-[0.14em] text-foam/45 uppercase"}`}>
          {state.status === "error" ? state.message : f.due}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-foam pr-2 pl-6 text-[15px] font-medium text-ink transition-[transform,opacity] active:scale-[0.98] disabled:opacity-70"
        >
          {pending ? f.sending : f.submit}
          <span className="grid size-10 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
            <svg aria-hidden="true" className={`size-4 ${pending ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

"use client";

import { useId, useRef, useState, useTransition } from "react";
import { requestPreview, type InquiryField } from "@/app/actions/request-preview";
import { home } from "@/content/home";
import { EMAIL_RE, FILE_ACCEPT, MIN_WORDS, checkFiles, countWords, formatBytes, isPhone, type FileProblem } from "@/lib/inquiry";
import type { InquiryPrefill } from "./inquiry-context";

const t = home.inquiry;
const f = t.fields;

const FILE_MSG: Record<FileProblem, string> = {
  count: t.errors.filesCount,
  size: t.errors.filesSize,
  total: t.errors.filesTotal,
  type: t.errors.filesType,
};

type Result = { status: "idle" } | { status: "ok"; email: string } | { status: "error"; message: string; field?: InquiryField };

const box = (invalid: boolean): string =>
  `group grid gap-1 rounded-2xl bg-foam/[0.06] px-4 pt-3 pb-2.5 ring-1 transition-colors focus-within:bg-foam/[0.09] ${
    invalid ? "ring-[#ff8a7a]/70" : "ring-foam/12 focus-within:ring-foam/40"
  }`;
const labelCls = "font-mono text-[10px] tracking-[0.16em] text-mist/80 uppercase";
const inputCls = "w-full bg-transparent text-[17px] text-foam outline-none placeholder:text-foam/30";

function Field({ label, optional, invalid, children }: { label: string; optional?: string; invalid: boolean; children: React.ReactNode }) {
  return (
    <label className={box(invalid)}>
      <span className={labelCls}>
        {label}
        {optional ? <span className="ml-2 text-mist/50 normal-case">{optional}</span> : null}
      </span>
      {children}
    </label>
  );
}

export function InquiryForm({ prefill, onDone }: { prefill: InquiryPrefill; onDone: () => void }) {
  const [result, setResult] = useState<Result>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [words, setWords] = useState(0);
  const [dragging, setDragging] = useState(false);
  const picker = useRef<HTMLInputElement>(null);
  const hintId = useId();

  const errField = result.status === "error" ? result.field : undefined;

  function addFiles(picked: File[]): void {
    const next = [...files];
    for (const p of picked) if (!next.some((x) => x.name === p.name && x.size === p.size)) next.push(p);
    const problem = checkFiles(next);
    if (problem) {
      setFileError(FILE_MSG[problem]);
      return;
    }
    setFileError(null);
    setFiles(next);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (pending) return;
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const details = String(fd.get("details") ?? "");

    // Instant feedback; the server repeats every check.
    if (!EMAIL_RE.test(email)) return setResult({ status: "error", field: "email", message: t.errors.email });
    if (phone && !isPhone(phone)) return setResult({ status: "error", field: "phone", message: t.errors.phone });
    if (countWords(details) < MIN_WORDS) return setResult({ status: "error", field: "details", message: t.errors.details });

    for (const file of files) fd.append("files", file);
    startTransition(async () => {
      try {
        setResult(await requestPreview(fd));
      } catch (err) {
        console.error("[inquiry] submit failed", err);
        setResult({ status: "error", message: t.errors.server });
      }
    });
  }

  if (result.status === "ok") {
    return (
      <div role="status" className="grid gap-5 rounded-[1.5rem] bg-foam/[0.06] p-6 ring-1 ring-foam/12 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#7fe0b0] uppercase">{t.okEyebrow}</p>
        <p className="text-2xl leading-tight font-light tracking-[-0.03em]">
          {t.ok.before}
          <span className="font-serif italic">{result.email}</span>
          {t.ok.after}
        </p>
        <button type="button" onClick={onDone} className="h-11 justify-self-start rounded-full px-5 text-sm font-medium ring-1 ring-foam/25 transition-colors hover:ring-foam/60">
          {t.close}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <Field label={f.site.label} invalid={errField === "site"}>
        <input name="site" type="text" required autoComplete="url" placeholder={f.site.placeholder} defaultValue={prefill.site ?? ""} aria-invalid={errField === "site"} className={inputCls} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={f.email.label} invalid={errField === "email"}>
          <input name="email" type="email" required inputMode="email" autoComplete="email" placeholder={f.email.placeholder} defaultValue={prefill.email ?? ""} aria-invalid={errField === "email"} className={inputCls} />
        </Field>
        <Field label={f.phone.label} optional={f.phone.optional} invalid={errField === "phone"}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={f.phone.placeholder} aria-invalid={errField === "phone"} className={inputCls} />
        </Field>
      </div>
      <Field label={f.details.label} invalid={errField === "details"}>
        <textarea
          name="details"
          required
          rows={5}
          placeholder={f.details.placeholder}
          onChange={(e) => setWords(countWords(e.target.value))}
          aria-invalid={errField === "details"}
          className={`${inputCls} resize-y`}
        />
        <span className={`justify-self-end font-mono text-[11px] tracking-[0.12em] tabular-nums ${words >= MIN_WORDS ? "text-[#7fe0b0]" : "text-foam/45"}`}>
          {f.details.count(words, MIN_WORDS)}
        </span>
      </Field>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(Array.from(e.dataTransfer.files));
        }}
        className={`grid gap-3 rounded-2xl border border-dashed px-4 py-4 transition-colors ${
          dragging ? "border-foam/60 bg-foam/[0.09]" : errField === "files" || fileError ? "border-[#ff8a7a]/70" : "border-foam/20 bg-foam/[0.03]"
        }`}
      >
        <div className="grid gap-1">
          <span className={labelCls}>
            {f.files.label}
            <span className="ml-2 text-mist/50 normal-case">{f.files.optional}</span>
          </span>
          <p id={hintId} className="text-[14px] leading-snug text-foam/55">
            {f.files.drop}
            <button type="button" onClick={() => picker.current?.click()} className="text-foam underline decoration-foam/30 underline-offset-4 transition-colors hover:decoration-foam">
              {f.files.browse}
            </button>
            . {f.files.hint}
          </p>
        </div>
        <input
          ref={picker}
          type="file"
          multiple
          accept={FILE_ACCEPT}
          aria-describedby={hintId}
          aria-label={f.files.label}
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
          className="sr-only"
        />
        {files.length > 0 && (
          <ul className="grid gap-2">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-xl bg-foam/[0.06] px-3 py-2 text-[14px]">
                <span className="min-w-0 truncate">{file.name}</span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-foam/45 tabular-nums">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFiles((cur) => cur.filter((x) => x !== file));
                      setFileError(null);
                    }}
                    aria-label={`${f.files.remove}: ${file.name}`}
                    className="grid size-6 place-items-center rounded-full ring-1 ring-foam/20 transition-colors hover:ring-foam/60"
                  >
                    <svg aria-hidden="true" className="size-2.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 16 16">
                      <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="text-[14px] text-[#ff8a7a]">{fileError}</p>}
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="mt-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={`text-[14px] ${result.status === "error" ? "text-[#ff8a7a]" : "font-mono text-[11px] tracking-[0.14em] text-foam/45 uppercase"}`}>
          {result.status === "error" ? result.message : t.due}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-foam pr-2 pl-6 text-[15px] font-medium text-ink transition-[transform,opacity] active:scale-[0.98] disabled:opacity-70"
        >
          {pending ? t.sending : t.submit}
          <span className="grid size-10 place-items-center rounded-full bg-ink text-foam transition-transform duration-300 group-hover:translate-x-0.5">
            <svg aria-hidden="true" className={`size-4 ${pending ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      <p className="text-[13px] leading-snug text-foam/45">
        {t.consent.before}
        <a href={t.consent.href} className="text-foam/70 underline decoration-foam/30 underline-offset-4 transition-colors hover:text-foam hover:decoration-foam">
          {t.consent.link}
        </a>
      </p>
    </form>
  );
}

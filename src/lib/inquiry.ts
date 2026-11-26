/** Rules for the inquiry form, shared by the browser (instant feedback) and the server action (authoritative). */

/** Details are optional; the cap keeps requests short. */
export const MAX_DETAILS_CHARS = 1000;

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 10 * 1024 * 1024;

/** Logos, images and documents. Anything else is rejected. */
export const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif", "svg", "pdf", "doc", "docx"] as const;
export const FILE_ACCEPT = ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()/.-]{6,20}$/;

export const isPhone = (v: string): boolean => PHONE_RE.test(v) && (v.match(/\d/g)?.length ?? 0) >= 6;

export type FileProblem = "count" | "size" | "total" | "type";

const extensionOf = (name: string): string => name.slice(name.lastIndexOf(".") + 1).toLowerCase();

/** Returns the first problem with a set of files, or null when they are acceptable. */
export function checkFiles(files: readonly { name: string; size: number }[]): FileProblem | null {
  if (files.length > MAX_FILES) return "count";
  let total = 0;
  for (const f of files) {
    if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(extensionOf(f.name))) return "type";
    if (f.size > MAX_FILE_BYTES) return "size";
    total += f.size;
  }
  return total > MAX_TOTAL_BYTES ? "total" : null;
}

export const formatBytes = (n: number): string => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`);

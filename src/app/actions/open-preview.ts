"use server";

import { home } from "@/content/home";

export type OpenPreviewState = { status: "idle" } | { status: "error"; message: string };

/** Unambiguous alphabet (no 0/O, 1/I/L) so codes survive being read from an email or a phone call. */
const CODE_RE = /^[A-HJKMNP-Z2-9]{6}$/;

const MESSAGES = home.previewAccess.errors;

/**
 * Opens a client's private preview by access code.
 *
 * Landing-only for now: no previews are stored yet, so every well-formed code is reported as not found.
 * When the preview backend lands, this is where to:
 *  - rate-limit by IP (x-forwarded-for on Vercel), ~3 attempts per hour, before touching the store;
 *  - look the code up by hash (never store codes in plain text);
 *  - set a short-lived signed cookie and redirect to the private preview page
 *    (with "Buy now" → notify us + manual invoice, and "Delete permanently" → remove preview and all records).
 */
export async function openPreview(_prev: OpenPreviewState, formData: FormData): Promise<OpenPreviewState> {
  const code = String(formData.get("code") ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  if (!CODE_RE.test(code)) return { status: "error", message: MESSAGES.format };
  return { status: "error", message: MESSAGES.notFound };
}

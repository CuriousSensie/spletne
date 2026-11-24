"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { home } from "@/content/home";

export type OpenPreviewState = { status: "idle" } | { status: "error"; message: string };

/** Unambiguous alphabet (no 0/O, 1/I/L) so codes survive being read from an email or a phone call. */
const CODE_RE = /^[A-HJKMNP-Z2-9]{6}$/;

const MESSAGES = home.previewAccess.errors;
const TIMEOUT_MS = 8000;

const fail = (message: string): OpenPreviewState => ({ status: "error", message });

async function clientIp(): Promise<string> {
  const h = await headers();
  // On Vercel these headers are set by the platform and can't be spoofed by the visitor.
  return h.get("x-real-ip")?.trim() ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

/**
 * Opens a client's private preview by access code.
 *
 * The admin app (CONTROL_PLANE_URL) owns the codes: it stores only keyed hashes,
 * rate-limits guesses per IP, and answers with the preview's host. Misses always
 * look the same, so a visitor can't tell "wrong code" from "expired code".
 * The preview itself is still behind its own password.
 */
export async function openPreview(_prev: OpenPreviewState, formData: FormData): Promise<OpenPreviewState> {
  const code = String(formData.get("code") ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  if (!CODE_RE.test(code)) return fail(MESSAGES.format);

  const base = process.env.CONTROL_PLANE_URL;
  const key = process.env.MARKETING_API_KEY;
  if (!base || !key) {
    console.error("[preview] CONTROL_PLANE_URL / MARKETING_API_KEY are not configured");
    return fail(MESSAGES.unavailable);
  }

  let res: Response;
  try {
    res = await fetch(`${base.replace(/\/$/, "")}/api/preview-code/resolve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ code, ip: await clientIp() }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[preview] control plane unreachable", error);
    return fail(MESSAGES.unavailable);
  }

  if (res.status === 429) return fail(MESSAGES.tooMany);
  if (res.status === 404) return fail(MESSAGES.notFound);
  if (!res.ok) {
    console.error("[preview] resolve failed", res.status);
    return fail(MESSAGES.unavailable);
  }

  const data = (await res.json()) as { found?: boolean; host?: string };
  const root = process.env.PREVIEW_ROOT_DOMAIN ?? "spletne.com";
  // Never redirect anywhere but a preview under our own domain, whatever the API says.
  if (!data.found || !data.host || !data.host.endsWith(`.${root}`) || !/^[a-z0-9.:-]+$/.test(data.host)) {
    return fail(MESSAGES.notFound);
  }
  // redirect() throws by design, so it stays outside any try/catch.
  redirect(`${process.env.PREVIEW_SCHEME ?? "https"}://${data.host}`);
}

"use server";

import { home } from "@/content/home";
import { mailConfig, missingMailEnv, sendMail } from "@/lib/mailer";

export type PreviewFields = { site: string; email: string };

export type PreviewState =
  | { status: "idle" }
  | { status: "ok"; email: string }
  | { status: "error"; message: string; field?: keyof PreviewFields; values: PreviewFields };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MSG = home.start.form.errors;

/** Accepts "yourbusiness.si", "www.x.com" or a full URL; returns a normalised https URL, or null if it isn't one. */
function asUrl(raw: string): string | null {
  if (/\s/.test(raw)) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes(".") ? url.toString() : null;
  } catch {
    // Not a URL: the caller treats the input as a business name instead.
    return null;
  }
}

/** Emails the lead to LEAD_INBOX over SMTP. Without mail config: logs in development, fails loudly in production. */
async function deliverLead(siteOrName: string, isUrl: boolean, email: string): Promise<void> {
  const missing = missingMailEnv();
  if (missing.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[request-preview] mail not configured (missing %s); lead:", missing.join(", "), { siteOrName, email });
      return;
    }
    throw new Error(`Lead delivery is not configured; missing ${missing.join(", ")}`);
  }
  const label = isUrl ? new URL(siteOrName).hostname : siteOrName;
  await sendMail({
    to: mailConfig().inbox,
    replyTo: email,
    subject: `Preview request: ${label}`,
    text: [`${isUrl ? "Website" : "Business"}: ${siteOrName}`, `Email: ${email}`, "", "Reply to this email to answer the client directly."].join("\n"),
  });
}

export async function requestPreview(_prev: PreviewState, formData: FormData): Promise<PreviewState> {
  const rawSite = String(formData.get("site") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const values = { site: rawSite, email };

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (String(formData.get("company") ?? "") !== "") return { status: "ok", email };

  // A website, or just a business name when they don't have one.
  const url = asUrl(rawSite);
  const name = rawSite.replace(/[\r\n]+/g, " ");
  if (!url && (name.length < 2 || name.length > 120)) return { status: "error", field: "site", message: MSG.site, values };
  if (!EMAIL_RE.test(email) || email.length > 254) return { status: "error", field: "email", message: MSG.email, values };

  try {
    await deliverLead(url ?? name, !!url, email);
  } catch (err) {
    console.error("[request-preview] delivery failed", err);
    return { status: "error", message: MSG.server, values };
  }
  return { status: "ok", email };
}

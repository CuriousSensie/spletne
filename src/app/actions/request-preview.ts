"use server";

export type PreviewFields = { site: string; email: string };

export type PreviewState =
  | { status: "idle" }
  | { status: "ok"; email: string }
  | { status: "error"; message: string; field?: keyof PreviewFields; values: PreviewFields };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts "yourbusiness.si", "www.x.com" or a full URL; returns a normalised https URL or null. */
function normaliseSite(raw: string): string | null {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes(".") ? url.toString() : null;
  } catch {
    // An unparseable URL is a validation failure, reported to the user by the caller.
    return null;
  }
}

/**
 * Sends the lead through Resend's HTTP API when configured
 * (RESEND_API_KEY, LEAD_FROM on a verified domain, LEAD_INBOX).
 * Without config: logs in development, fails loudly in production.
 */
async function deliverLead(site: string, email: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM;
  const to = process.env.LEAD_INBOX;

  if (!key || !from || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[request-preview] email delivery not configured; lead:", { site, email });
      return;
    }
    throw new Error("Lead delivery is not configured (RESEND_API_KEY, LEAD_FROM, LEAD_INBOX).");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Preview request: ${new URL(site).hostname}`,
      text: `Website: ${site}\nEmail: ${email}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

export async function requestPreview(_prev: PreviewState, formData: FormData): Promise<PreviewState> {
  const rawSite = String(formData.get("site") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const values = { site: rawSite, email };

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (String(formData.get("company") ?? "") !== "") return { status: "ok", email };

  const site = normaliseSite(rawSite);
  if (!site) return { status: "error", field: "site", message: "That doesn’t look like a web address. Try something like yourbusiness.si", values };
  if (!EMAIL_RE.test(email) || email.length > 254) return { status: "error", field: "email", message: "That email looks off. Mind checking it?", values };

  try {
    await deliverLead(site, email);
  } catch (err) {
    console.error("[request-preview] delivery failed", err);
    return { status: "error", message: "Something broke on our end. Please try again in a minute.", values };
  }
  return { status: "ok", email };
}

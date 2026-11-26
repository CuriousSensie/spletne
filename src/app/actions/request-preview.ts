"use server";

import { home } from "@/content/home";
import { EMAIL_RE, MAX_DETAILS_CHARS, MIN_WORDS, checkFiles, countWords, isPhone, type FileProblem } from "@/lib/inquiry";
import { mailConfig, missingMailEnv, sendMail } from "@/lib/mailer";

export type InquiryField = "site" | "email" | "phone" | "details" | "files";

export type InquiryState =
  | { status: "ok"; email: string }
  | { status: "error"; message: string; field?: InquiryField };

const MSG = home.inquiry.errors;

const FILE_MSG: Record<FileProblem, string> = {
  count: MSG.filesCount,
  size: MSG.filesSize,
  total: MSG.filesTotal,
  type: MSG.filesType,
};

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

/** Keeps attachment names safe for mail headers and file systems. */
function safeName(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}._ -]/gu, "_").replace(/^\.+/, "").slice(0, 100);
  return cleaned || "priloga";
}

type Lead = {
  siteOrName: string;
  isUrl: boolean;
  email: string;
  phone: string;
  details: string;
  files: { filename: string; content: Buffer }[];
};

/** Emails the lead to LEAD_INBOX over SMTP. Without mail config: logs in development, fails loudly in production. */
async function deliverLead(lead: Lead): Promise<void> {
  const missing = missingMailEnv();
  if (missing.length) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[request-preview] mail not configured (missing %s); lead:", missing.join(", "), {
        ...lead,
        files: lead.files.map((f) => `${f.filename} (${f.content.length} B)`),
      });
      return;
    }
    throw new Error(`Lead delivery is not configured; missing ${missing.join(", ")}`);
  }
  const label = lead.isUrl ? new URL(lead.siteOrName).hostname : lead.siteOrName;
  await sendMail({
    to: mailConfig().inbox,
    replyTo: lead.email,
    subject: `Preview request: ${label}`,
    text: [
      `${lead.isUrl ? "Website" : "Business"}: ${lead.siteOrName}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || "-"}`,
      `Attachments: ${lead.files.length ? lead.files.map((f) => f.filename).join(", ") : "none"}`,
      "",
      "Details:",
      lead.details,
      "",
      "Reply to this email to answer the client directly.",
    ].join("\n"),
    attachments: lead.files,
  });
}

export async function requestPreview(formData: FormData): Promise<InquiryState> {
  const rawSite = String(formData.get("site") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (String(formData.get("company") ?? "") !== "") return { status: "ok", email };

  // A website, or just a business name when they don't have one.
  const url = asUrl(rawSite);
  const name = rawSite.replace(/[\r\n]+/g, " ");
  if (!url && (name.length < 2 || name.length > 120)) return { status: "error", field: "site", message: MSG.site };
  if (!EMAIL_RE.test(email) || email.length > 254) return { status: "error", field: "email", message: MSG.email };
  if (phone && !isPhone(phone)) return { status: "error", field: "phone", message: MSG.phone };
  if (countWords(details) < MIN_WORDS) return { status: "error", field: "details", message: MSG.details };
  if (details.length > MAX_DETAILS_CHARS) return { status: "error", field: "details", message: MSG.detailsLong };
  const problem = checkFiles(files);
  if (problem) return { status: "error", field: "files", message: FILE_MSG[problem] };

  try {
    const attachments = await Promise.all(
      files.map(async (f) => ({ filename: safeName(f.name), content: Buffer.from(await f.arrayBuffer()) })),
    );
    await deliverLead({ siteOrName: url ?? name, isUrl: !!url, email, phone, details, files: attachments });
  } catch (err) {
    console.error("[request-preview] delivery failed", err);
    return { status: "error", message: MSG.server };
  }
  return { status: "ok", email };
}

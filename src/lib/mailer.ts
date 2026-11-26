import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP mail for server code only (imported from server actions).
 *
 * Env:
 *   SMTP_HOST, SMTP_PORT (default 465), SMTP_SECURE ("true" for 465, "false" for 587 STARTTLS; defaults from port),
 *   SMTP_USER, SMTP_PASS, LEAD_FROM (sender, usually SMTP_USER), LEAD_INBOX (where leads go).
 * Gmail: smtp.gmail.com:465 with an app password (needs 2-step verification). Zoho EU: smtp.zoho.eu:465.
 */

export interface MailConfig {
  from: string;
  inbox: string;
}

const REQUIRED = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "LEAD_FROM", "LEAD_INBOX"] as const;

/** Names of required variables that are unset; empty means mail is configured. */
export function missingMailEnv(): string[] {
  return REQUIRED.filter((k) => !process.env[k]);
}

let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!Number.isInteger(port) || port <= 0) throw new Error(`SMTP_PORT is not a valid port: ${process.env.SMTP_PORT}`);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return cached;
}

export function mailConfig(): MailConfig {
  const missing = missingMailEnv();
  if (missing.length) throw new Error(`Mail is not configured; missing ${missing.join(", ")}`);
  return { from: process.env.LEAD_FROM as string, inbox: process.env.LEAD_INBOX as string };
}

/** Sends one plain-text email, optionally with attachments. Throws on any SMTP failure so callers can report it. */
export async function sendMail(msg: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}): Promise<void> {
  const { from } = mailConfig();
  const info = await transporter().sendMail({ from, ...msg });
  if (info.rejected.length) throw new Error(`SMTP rejected: ${info.rejected.join(", ")}`);
}

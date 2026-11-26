import { Resend } from "resend";

/**
 * Transactional mail via Resend, for server code only (imported from server actions).
 *
 * Env:
 *   RESEND_API_KEY, LEAD_FROM (sender on a domain verified in Resend, e.g. "Spletne <info@spletne.com>"),
 *   LEAD_INBOX (where leads go).
 */

export interface MailConfig {
  from: string;
  inbox: string;
}

const REQUIRED = ["RESEND_API_KEY", "LEAD_FROM", "LEAD_INBOX"] as const;

/** Names of required variables that are unset; empty means mail is configured. */
export function missingMailEnv(): string[] {
  return REQUIRED.filter((k) => !process.env[k]);
}

let cached: Resend | null = null;

function client(): Resend {
  cached ??= new Resend(process.env.RESEND_API_KEY);
  return cached;
}

export function mailConfig(): MailConfig {
  const missing = missingMailEnv();
  if (missing.length) throw new Error(`Mail is not configured; missing ${missing.join(", ")}`);
  return { from: process.env.LEAD_FROM as string, inbox: process.env.LEAD_INBOX as string };
}

/** Sends one plain-text email, optionally with attachments. Throws on any Resend error so callers can report it. */
export async function sendMail(msg: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}): Promise<void> {
  const { from } = mailConfig();
  const { error } = await client().emails.send({
    from,
    to: msg.to,
    subject: msg.subject,
    text: msg.text,
    replyTo: msg.replyTo,
    attachments: msg.attachments?.length ? msg.attachments : undefined,
  });
  if (error) throw new Error(`Resend rejected the email: ${error.name}: ${error.message}`);
}

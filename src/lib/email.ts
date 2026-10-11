import type { Lead } from "@/types";
import { isSendfableConfigured } from "@/lib/sendfable-client";

interface EmailConfig {
  resendApiKey?: string;
  sendgridApiKey?: string;
  fromEmail?: string;
  leadsToEmail?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom?: string;
}

export type DeliveryResult = {
  sent: boolean;
  recipientConfigured: boolean;
  provider?: string;
  messageId?: string;
  /** Provider accepted the message; not confirmed inbox receipt. */
  accepted?: boolean;
  error?: string;
};

function getEmailConfig(): EmailConfig {
  const smtpPortRaw = process.env.SMTP_PORT?.trim();
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    leadsToEmail: process.env.LEADS_TO_EMAIL,
    smtpHost: process.env.SMTP_HOST?.trim(),
    smtpPort: smtpPortRaw ? Number(smtpPortRaw) : undefined,
    smtpUser: process.env.SMTP_USER?.trim(),
    smtpPass: process.env.SMTP_PASS?.trim() || process.env.SMTP_PASSWORD?.trim(),
    smtpFrom: process.env.SMTP_FROM?.trim() || process.env.FROM_EMAIL?.trim(),
  };
}

function ownerNotifyRecipient(): string | undefined {
  return (
    process.env.CONTACT_EMAIL?.trim() ||
    process.env.LEADS_TO_EMAIL?.trim() ||
    undefined
  );
}

function formatLeadEmail(lead: Lead): { subject: string; text: string; html: string } {
  const subject = `[Boating Chicago] New lead: ${lead.eventType} — ${lead.name}`;
  const lines = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Date", lead.date],
    ["Group Size", lead.groupSize],
    ["Budget", lead.budget || "Not specified"],
    ["Event Type", lead.eventType],
    ["Preferred Area", lead.preferredArea || "No preference"],
    ["Need Captain", lead.needCaptain || "Not specified"],
    ["Notes", lead.notes || "None"],
    ["Source", lead.source],
    ["Submitted", lead.createdAt],
    ["Lead ID", lead.id],
  ];

  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <h2>New contact / legacy lead notification</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      ${lines.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">${k}</td><td style="padding:4px 0;">${v}</td></tr>`).join("")}
    </table>
  `;

  return { subject, text, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaSendfableMail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}): Promise<DeliveryResult> {
  if (!isSendfableConfigured()) {
    return { sent: false, recipientConfigured: true, error: "SendFable not configured" };
  }

  const root = (process.env.SENDFABLE_API_URL?.trim() || "https://sendfable.com").replace(
    /\/$/,
    ""
  );
  const secret = process.env.SENDFABLE_API_SECRET?.trim();
  if (!secret) {
    return { sent: false, recipientConfigured: true, error: "SendFable secret missing" };
  }

  try {
    const res = await fetch(`${root}/api/v1/mail/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: input.to,
        replyTo: input.replyTo,
        subject: input.subject,
        text: input.text,
        html: input.html,
        fromName: input.fromName || "Boating Chicago",
        kind: "owner_notify",
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      accepted?: boolean;
      messageId?: string;
      error?: string;
      provider?: string;
    };
    if (!res.ok || !json.accepted) {
      console.error("[email] SendFable mail/send failed:", res.status);
      return {
        sent: false,
        recipientConfigured: true,
        provider: "sendfable",
        error: json.error || `SendFable HTTP ${res.status}`,
      };
    }
    return {
      sent: true,
      recipientConfigured: true,
      accepted: true,
      provider: json.provider || "sendfable",
      messageId: json.messageId,
    };
  } catch (err) {
    console.error(
      "[email] SendFable mail/send error:",
      err instanceof Error ? err.message : "error"
    );
    return {
      sent: false,
      recipientConfigured: true,
      provider: "sendfable",
      error: err instanceof Error ? err.message : "SendFable request failed",
    };
  }
}

async function sendViaResend(
  config: EmailConfig,
  to: string,
  subject: string,
  text: string,
  html: string,
  replyTo?: string
): Promise<DeliveryResult> {
  if (!config.resendApiKey || !config.fromEmail) {
    return { sent: false, recipientConfigured: true, error: "Resend incomplete" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [to],
        reply_to: replyTo || undefined,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      console.error("[email] Resend failed:", res.status);
      return {
        sent: false,
        recipientConfigured: true,
        provider: "resend",
        error: json.message || `Resend HTTP ${res.status}`,
      };
    }
    return {
      sent: true,
      recipientConfigured: true,
      accepted: true,
      provider: "resend",
      messageId: json.id,
    };
  } catch (err) {
    console.error("[email] Resend error:", err instanceof Error ? err.message : "error");
    return {
      sent: false,
      recipientConfigured: true,
      provider: "resend",
      error: err instanceof Error ? err.message : "Resend error",
    };
  }
}

async function sendViaSendGrid(
  config: EmailConfig,
  to: string,
  subject: string,
  text: string,
  html: string,
  replyTo?: string
): Promise<DeliveryResult> {
  if (!config.sendgridApiKey || !config.fromEmail) {
    return { sent: false, recipientConfigured: true, error: "SendGrid incomplete" };
  }

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: config.fromEmail },
        reply_to: replyTo ? { email: replyTo } : undefined,
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email] SendGrid failed:", res.status);
      return {
        sent: false,
        recipientConfigured: true,
        provider: "sendgrid",
        error: err.slice(0, 200) || `SendGrid HTTP ${res.status}`,
      };
    }
    return {
      sent: true,
      recipientConfigured: true,
      accepted: true,
      provider: "sendgrid",
      messageId: res.headers.get("x-message-id") || undefined,
    };
  } catch (err) {
    console.error("[email] SendGrid error:", err instanceof Error ? err.message : "error");
    return {
      sent: false,
      recipientConfigured: true,
      provider: "sendgrid",
      error: err instanceof Error ? err.message : "SendGrid error",
    };
  }
}

/**
 * Hostinger / generic SMTP via Node net + TLS (no nodemailer dependency).
 * Supports SMTP_HOST=smtp.hostinger.com with port 465 (implicit TLS) or 587 (STARTTLS).
 */
async function sendViaSmtp(
  config: EmailConfig,
  to: string,
  subject: string,
  text: string,
  html: string,
  replyTo?: string
): Promise<DeliveryResult> {
  if (
    !config.smtpHost ||
    !config.smtpUser ||
    !config.smtpPass ||
    !config.smtpFrom
  ) {
    return { sent: false, recipientConfigured: true, error: "SMTP incomplete" };
  }

  const port = config.smtpPort && Number.isFinite(config.smtpPort) ? config.smtpPort : 465;

  try {
    const { sendSmtpMail } = await import("@/lib/smtp-client");
    const result = await sendSmtpMail({
      host: config.smtpHost,
      port,
      user: config.smtpUser,
      pass: config.smtpPass,
      from: config.smtpFrom,
      to,
      replyTo,
      subject,
      text,
      html,
    });
    if (!result.ok) {
      console.error("[email] SMTP failed");
      return {
        sent: false,
        recipientConfigured: true,
        provider: "smtp",
        error: result.error || "SMTP send failed",
      };
    }
    return {
      sent: true,
      recipientConfigured: true,
      accepted: true,
      provider: "smtp",
      messageId: result.messageId,
    };
  } catch (err) {
    console.error("[email] SMTP error:", err instanceof Error ? err.message : "error");
    return {
      sent: false,
      recipientConfigured: true,
      provider: "smtp",
      error: err instanceof Error ? err.message : "SMTP error",
    };
  }
}

async function deliverOwnerEmail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}): Promise<DeliveryResult> {
  const config = getEmailConfig();

  // Prefer established SendFable SES transactional path (integration API).
  if (isSendfableConfigured()) {
    const sf = await sendViaSendfableMail(input);
    if (sf.sent) return sf;
  }

  if (config.resendApiKey) {
    const r = await sendViaResend(
      config,
      input.to,
      input.subject,
      input.text,
      input.html,
      input.replyTo
    );
    if (r.sent) return r;
  }

  if (config.sendgridApiKey) {
    const r = await sendViaSendGrid(
      config,
      input.to,
      input.subject,
      input.text,
      input.html,
      input.replyTo
    );
    if (r.sent) return r;
  }

  if (config.smtpHost && config.smtpUser && config.smtpPass) {
    const r = await sendViaSmtp(
      config,
      input.to,
      input.subject,
      input.text,
      input.html,
      input.replyTo
    );
    if (r.sent) return r;
  }

  console.log("[email] No functioning email provider accepted the message");
  return {
    sent: false,
    recipientConfigured: true,
    error: "No functioning email provider",
  };
}

export async function sendLeadNotification(lead: Lead): Promise<boolean> {
  const config = getEmailConfig();

  if (!config.leadsToEmail) {
    console.log("[leads] LEADS_TO_EMAIL not set — lead logged server-side:", lead.id);
    return false;
  }

  const { subject, text, html } = formatLeadEmail(lead);
  const result = await deliverOwnerEmail({
    to: config.leadsToEmail,
    subject,
    text,
    html,
    replyTo: lead.email,
    fromName: "Boating Chicago",
  });
  return result.sent;
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Whether the visitor opted into the Chicago Boating Brief (consent only — not SendFable payload). */
  briefOptIn?: boolean;
}): Promise<DeliveryResult> {
  const to = ownerNotifyRecipient();

  if (!to) {
    console.log("[contact] No CONTACT_EMAIL/LEADS_TO_EMAIL — logged only:", {
      name: input.name,
      email: input.email,
      subject: input.subject,
    });
    return { sent: false, recipientConfigured: false, error: "No recipient configured" };
  }

  const briefLine = input.briefOptIn
    ? "Chicago Boating Brief opt-in: YES (email-only enrollment requested)"
    : "Chicago Boating Brief opt-in: no";

  const subject = `[Boating Chicago] Contact: ${input.subject} — ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    briefLine,
    `Message:`,
    input.message,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");
  const html = `
    <h2>New contact form message</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p><strong>Brief opt-in:</strong> ${input.briefOptIn ? "YES" : "no"}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(input.message)}</pre>
  `;

  const result = await deliverOwnerEmail({
    to,
    subject,
    text,
    html,
    replyTo: input.email,
    fromName: "Boating Chicago",
  });

  if (!result.sent) {
    console.log("[contact] Email not sent (missing or failed provider)");
  }
  return result;
}

export async function sendNewsletterNotification(
  email: string,
  source: string
): Promise<boolean> {
  const config = getEmailConfig();
  const to = config.leadsToEmail;
  if (!to) {
    console.log("[newsletter] Owner notification skipped — email provider/env incomplete");
    return false;
  }

  const subject = `[Boating Chicago] New newsletter signup`;
  const text = `Source: ${source}\nTime: ${new Date().toISOString()}\n(Email omitted from logs; included in message body for the owner inbox only.)\nEmail: ${email}`;
  const html = `<p><strong>Source:</strong> ${escapeHtml(source)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>`;

  const result = await deliverOwnerEmail({
    to,
    subject,
    text,
    html,
    fromName: "Boating Chicago",
  });
  return result.sent;
}

export function hasAnyEmailProviderConfigured(): boolean {
  const config = getEmailConfig();
  return Boolean(
    isSendfableConfigured() ||
      config.resendApiKey ||
      config.sendgridApiKey ||
      (config.smtpHost && config.smtpUser && config.smtpPass)
  );
}

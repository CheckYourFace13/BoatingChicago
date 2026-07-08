import type { Lead } from "@/types";

interface EmailConfig {
  resendApiKey?: string;
  sendgridApiKey?: string;
  fromEmail?: string;
  leadsToEmail?: string;
}

function getEmailConfig(): EmailConfig {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL,
    leadsToEmail: process.env.LEADS_TO_EMAIL,
  };
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
    <h2>New Find a Boat Lead</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      ${lines.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">${k}</td><td style="padding:4px 0;">${v}</td></tr>`).join("")}
    </table>
  `;

  return { subject, text, html };
}

async function sendViaResend(
  config: EmailConfig,
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  if (!config.resendApiKey || !config.fromEmail) return false;

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
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email] Resend failed:", res.status, err);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Resend error:", err);
    return false;
  }
}

async function sendViaSendGrid(
  config: EmailConfig,
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<boolean> {
  if (!config.sendgridApiKey || !config.fromEmail) return false;

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
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email] SendGrid failed:", res.status, err);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] SendGrid error:", err);
    return false;
  }
}

export async function sendLeadNotification(lead: Lead): Promise<boolean> {
  const config = getEmailConfig();

  if (!config.leadsToEmail) {
    console.log("[leads] LEADS_TO_EMAIL not set — lead logged server-side:", lead.id);
    return false;
  }

  const { subject, text, html } = formatLeadEmail(lead);

  if (config.resendApiKey) {
    const sent = await sendViaResend(config, config.leadsToEmail, subject, text, html);
    if (sent) return true;
  }

  if (config.sendgridApiKey) {
    const sent = await sendViaSendGrid(config, config.leadsToEmail, subject, text, html);
    if (sent) return true;
  }

  console.log("[leads] Email not sent (missing or failed provider) — lead logged:", lead.id, {
    name: lead.name,
    email: lead.email,
    source: lead.source,
  });
  return false;
}

export async function sendNewsletterNotification(
  email: string,
  source: string
): Promise<boolean> {
  const config = getEmailConfig();

  if (!config.leadsToEmail || !config.fromEmail) {
    console.log("[newsletter] Notification skipped — env not configured:", email, source);
    return false;
  }

  const subject = `[Boating Chicago] New newsletter signup`;
  const text = `Email: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`;
  const html = `<p><strong>Email:</strong> ${email}</p><p><strong>Source:</strong> ${source}</p>`;

  if (config.resendApiKey) {
    return sendViaResend(config, config.leadsToEmail, subject, text, html);
  }
  if (config.sendgridApiKey) {
    return sendViaSendGrid(config, config.leadsToEmail, subject, text, html);
  }

  return false;
}

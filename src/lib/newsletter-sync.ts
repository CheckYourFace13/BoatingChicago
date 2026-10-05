import type { NewsletterSignup } from "@/types";

/**
 * Optional ESP sync for Brief signups.
 * Not configured in production today — keep ready for Mailchimp/ConvertKit
 * without making signup depend on them.
 */
export async function syncNewsletterSignup(signup: NewsletterSignup): Promise<void> {
  const mailchimpKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
  const convertkitKey = process.env.CONVERTKIT_API_KEY;
  const convertkitFormId = process.env.CONVERTKIT_FORM_ID;

  if (mailchimpKey && mailchimpListId) {
    try {
      const datacenter = mailchimpKey.split("-").pop();
      const res = await fetch(
        `https://${datacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `apikey ${mailchimpKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: signup.email,
            status: "subscribed",
            tags: [signup.source],
          }),
          signal: AbortSignal.timeout(8_000),
        }
      );
      if (!res.ok) {
        console.error("[newsletter] Mailchimp sync failed:", res.status);
      }
    } catch (err) {
      console.error(
        "[newsletter] Mailchimp error:",
        err instanceof Error ? err.message : "error"
      );
    }
    return;
  }

  if (convertkitKey && convertkitFormId) {
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${convertkitFormId}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: convertkitKey,
            email: signup.email,
            tags: [signup.source],
          }),
          signal: AbortSignal.timeout(8_000),
        }
      );
      if (!res.ok) {
        console.error("[newsletter] ConvertKit sync failed:", res.status);
      }
    } catch (err) {
      console.error(
        "[newsletter] ConvertKit error:",
        err instanceof Error ? err.message : "error"
      );
    }
  }
}

/** True when an ESP is configured for list sync (not the same as outbound campaign sending). */
export function hasNewsletterEspConfigured(): boolean {
  return Boolean(
    (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) ||
      (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID)
  );
}

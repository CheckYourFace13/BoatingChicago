import type { NewsletterSignup } from "@/types";

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
        }
      );
      if (!res.ok) {
        console.error("[newsletter] Mailchimp sync failed:", await res.text());
      }
    } catch (err) {
      console.error("[newsletter] Mailchimp error:", err);
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
        }
      );
      if (!res.ok) {
        console.error("[newsletter] ConvertKit sync failed:", await res.text());
      }
    } catch (err) {
      console.error("[newsletter] ConvertKit error:", err);
    }
  }
}

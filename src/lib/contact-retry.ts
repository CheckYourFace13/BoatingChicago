/**
 * Retry durable contact owner-notify delivery.
 * Safe to call from Brief cron — does not touch campaign automation.
 */

import { sendContactNotification } from "@/lib/email";
import {
  listContactMessagesForRetry,
  markContactAccepted,
  markContactFailed,
  type ContactMessageRecord,
} from "@/lib/contact-store";

export async function retryFailedContactDeliveries(limit = 25): Promise<{
  attempted: number;
  accepted: number;
  failed: number;
}> {
  const rows = await listContactMessagesForRetry(limit);
  let accepted = 0;
  let failed = 0;

  for (const row of rows) {
    const result = await deliverStoredContact(row);
    if (result) accepted += 1;
    else failed += 1;
  }

  return { attempted: rows.length, accepted, failed };
}

async function deliverStoredContact(row: ContactMessageRecord): Promise<boolean> {
  const delivery = await sendContactNotification({
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    briefOptIn: row.briefOptIn,
  }).catch((err) => ({
    sent: false as const,
    recipientConfigured: true,
    error: err instanceof Error ? err.message : "retry failed",
  }));

  if (delivery.sent) {
    await markContactAccepted({
      id: row.id,
      provider: delivery.provider || "unknown",
      providerMessageId: delivery.messageId || null,
    });
    return true;
  }

  const attempts = row.attemptCount + 1;
  await markContactFailed({
    id: row.id,
    error: delivery.error || "provider rejected",
    dead: attempts >= 8,
  });
  return false;
}

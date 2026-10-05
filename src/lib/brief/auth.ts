/**
 * Owner / cron auth for Brief automation endpoints.
 * Uses BRIEF_OWNER_SECRET, NEWSLETTER_EXPORT_SECRET, or INDEXNOW_SUBMIT_SECRET.
 */

export function briefOwnerAuthorized(request: Request): boolean {
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!bearer) return false;
  const secrets = [
    process.env.BRIEF_OWNER_SECRET?.trim(),
    process.env.NEWSLETTER_EXPORT_SECRET?.trim(),
    process.env.INDEXNOW_SUBMIT_SECRET?.trim(),
  ].filter(Boolean) as string[];
  return secrets.includes(bearer);
}

export function briefCronAuthorized(request: Request): boolean {
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const cron =
    process.env.BRIEF_CRON_SECRET?.trim() ||
    process.env.BRIEF_OWNER_SECRET?.trim() ||
    process.env.INDEXNOW_SUBMIT_SECRET?.trim();
  if (!bearer || !cron) return false;
  return bearer === cron;
}

export function briefWebhookAuthorized(request: Request): boolean {
  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const secrets = [
    process.env.SENDFABLE_WEBHOOK_SECRET?.trim(),
    process.env.SENDFABLE_API_SECRET?.trim(),
  ].filter(Boolean) as string[];
  if (!bearer || !secrets.length) return false;
  return secrets.includes(bearer);
}

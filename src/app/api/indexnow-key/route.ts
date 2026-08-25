/**
 * Backup IndexNow key endpoint (plain text).
 * next.config rewrites the public key URL here if needed.
 */
export async function GET() {
  return new Response("525facfab7354dd3a4f44e32baa456a1", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

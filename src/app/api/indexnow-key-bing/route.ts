/** Backup route for Bing wizard IndexNow key (rewrites target). */
export async function GET() {
  return new Response("b15999c350fe447ebc343419265f09b5", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

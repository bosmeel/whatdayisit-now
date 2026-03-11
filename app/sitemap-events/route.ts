import { NextResponse } from "next/server";
import { EVENTS } from "@/lib/events";

export async function GET() {
  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  const urls = Object.keys(EVENTS).map(
    (slug) => `${baseUrl}/days-until/${slug}`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
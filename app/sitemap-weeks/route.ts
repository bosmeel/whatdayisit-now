import { NextResponse } from "next/server";

export async function GET() {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  const urls: string[] = [];

  for (let year = 2020; year <= 2035; year++) {

    urls.push(`${baseUrl}/week-number/${year}`);

    for (let week = 1; week <= 53; week++) {
      urls.push(`${baseUrl}/week-number/${year}/${week}`);
    }

  }

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
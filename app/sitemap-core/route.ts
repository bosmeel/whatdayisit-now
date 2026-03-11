import { NextResponse } from "next/server";

export async function GET() {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();
  const currentYear = new Date().getFullYear();

  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/days-until`,
    `${baseUrl}/days-between`,
    `${baseUrl}/days-since`,
    `${baseUrl}/weeks-between`,
    `${baseUrl}/months-between`,
    `${baseUrl}/years-between`,
    `${baseUrl}/date-duration`,
    `${baseUrl}/age-calculator`,
    `${baseUrl}/born-on`,
    `${baseUrl}/what-happened-on`,
    `${baseUrl}/how-many-days-left-in/${currentYear}`,
    `${baseUrl}/how-many-weeks-left-in/${currentYear}`
  ];

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
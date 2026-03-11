import { NextResponse } from "next/server";
import { EVENTS } from "@/lib/events";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import { DATE_PAIRS_SEO } from "@/lib/data/datePairsSeo";
import { generateMonthDayPairs } from "@/lib/data/datePairs.generated";

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 29 },
  { name: "march", days: 31 },
  { name: "april", days: 30 },
  { name: "may", days: 31 },
  { name: "june", days: 30 },
  { name: "july", days: 31 },
  { name: "august", days: 31 },
  { name: "september", days: 30 },
  { name: "october", days: 31 },
  { name: "november", days: 30 },
  { name: "december", days: 31 },
];

export async function GET() {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();
  const currentYear = new Date().getFullYear();

  const urls: string[] = [];

  const staticRoutes = [
    "",
    "/days-until",
    "/days-between",
    "/born-on",
    "/what-happened-on",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  staticRoutes.forEach((route) => {
    urls.push(`${baseUrl}${route}`);
  });

  Object.keys(EVENTS).forEach((slug) => {
    urls.push(`${baseUrl}/days-until/${slug}`);
  });

  const generatedPairs = generateMonthDayPairs();

  [...DATE_PAIRS, ...DATE_PAIRS_SEO, ...generatedPairs].forEach((pair) => {
    urls.push(`${baseUrl}/days-between/${pair.slug}`);
  });

  months.forEach((m) => {
    for (let d = 1; d <= m.days; d++) {

      urls.push(`${baseUrl}/born-on/${m.name}-${d}`);
      urls.push(`${baseUrl}/what-happened-on/${m.name}-${d}`);
      urls.push(`${baseUrl}/days-until-date/${m.name}-${d}`);

    }
  });

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
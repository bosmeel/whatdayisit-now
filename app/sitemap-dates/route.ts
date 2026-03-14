import { NextResponse } from "next/server";
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

/* Year comparison pages */

function generateYearPairs() {

  const pairs: string[] = [];

  const currentYear = new Date().getFullYear();

  for (let start = currentYear - 20; start <= currentYear + 10; start++) {
    pairs.push(`${start}-and-${start + 1}`);
  }

  return pairs;
}

export async function GET() {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  const urls = new Set<string>();

  const currentYear = new Date().getFullYear();

  /* Core date tools */

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
    urls.add(`${baseUrl}${route}`);
  });

  /* Days between pairs */

  const generatedPairs = generateMonthDayPairs();

  [...DATE_PAIRS, ...DATE_PAIRS_SEO, ...generatedPairs].forEach((pair) => {
    urls.add(`${baseUrl}/days-between/${pair.slug}`);
  });

  /* Year comparison pages */

  const yearPairs = generateYearPairs();

  yearPairs.forEach((pair) => {
    urls.add(`${baseUrl}/days-between-years/${pair}`);
  });

  /* Month-day pages */

  months.forEach((m) => {

    for (let d = 1; d <= m.days; d++) {

      urls.add(`${baseUrl}/born-on/${m.name}-${d}`);
      urls.add(`${baseUrl}/what-happened-on/${m.name}-${d}`);
      urls.add(`${baseUrl}/days-until-date/${m.name}-${d}`);

    }

  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls]
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
export const dynamic = "force-dynamic";

import Link from "next/link";
import { getDaysLeftInMonth } from "@/lib/calculations";

export async function generateMetadata(
  { params }: { params: Promise<{ year: string; month: string }> }
) {
  const { year, month } = await params;
  const numericYear = Number(year);
  const numericMonth = Number(month);

  const monthName = new Date(numericYear, numericMonth - 1).toLocaleString(
    "en-US",
    { month: "long" }
  );

  const baseUrl = "https://whatdayisit.now";
  const fullUrl = `${baseUrl}/how-many-days-left-in-month/${numericYear}/${numericMonth}`;

  return {
    title: `How many days are left in ${monthName} ${numericYear}?`,
    description: `See how many days remain in ${monthName} ${numericYear}. Updated automatically.`,

    alternates: {
      canonical: fullUrl,
    },

    openGraph: {
      title: `How many days are left in ${monthName} ${numericYear}?`,
      description: `Live counter for remaining days in ${monthName} ${numericYear}.`,
      url: fullUrl,
      type: "website",
    },
  };
}

export default async function DaysLeftInMonthPage(
  { params }: { params: Promise<{ year: string; month: string }> }
) {
  const { year, month } = await params;

  const numericYear = Number(year);
  const numericMonth = Number(month);

  if (
    Number.isNaN(numericYear) ||
    Number.isNaN(numericMonth) ||
    numericYear < 1900 ||
    numericYear > 2100 ||
    numericMonth < 1 ||
    numericMonth > 12
  ) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Invalid date.</p>
      </main>
    );
  }

  const daysLeft = getDaysLeftInMonth(numericYear, numericMonth);

  const monthName = new Date(numericYear, numericMonth - 1).toLocaleString(
    "en-US",
    { month: "long" }
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many days are left in ${monthName} ${numericYear}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${daysLeft} days left in ${monthName} ${numericYear}.`,
        },
      },
      {
        "@type": "Question",
        name: `Does this number update automatically?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. The remaining days in ${monthName} ${numericYear} are calculated daily.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://whatdayisit.now",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${numericYear}`,
        item: `https://whatdayisit.now/how-many-days-left-in/${numericYear}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${monthName}`,
        item: `https://whatdayisit.now/how-many-days-left-in-month/${numericYear}/${numericMonth}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <Link
            href={`/how-many-days-left-in/${numericYear}`}
            className="underline"
          >
            {numericYear}
          </Link>
          {" > "}
          <span>{monthName}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days are left in {monthName} {numericYear}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days left in {monthName} {numericYear}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            This page automatically calculates how many days remain
            in {monthName} {numericYear}.
          </p>

          <p>
            Useful for planning deadlines, vacations, or monthly goals.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={`/how-many-days-left-in/${numericYear}`}
            className="underline"
          >
            View full year overview
          </Link>
        </div>
      </div>
    </main>
  );
}
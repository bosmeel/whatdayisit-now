import Link from "next/link";
import DateCalculatorsLink from "@/components/DateCalculatorsLink";
import RelatedDateTools from "@/components/RelatedDateTools";

export const metadata = {
  title: "How many days are in a year? (365 or 366) – Quick explanation",
  description:
    "A standard year has 365 days. A leap year has 366 days. Learn the rule and check related live counters.",
  alternates: {
    canonical: "/how-many-days-in-a-year",
  },
  openGraph: {
    title: "How many days are in a year?",
    description:
      "Standard years have 365 days. Leap years have 366. See the rule and related tools.",
    url: "/how-many-days-in-a-year",
    type: "website",
  },
};

export default function HowManyDaysInAYearPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many days are in a year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most years have 365 days. Leap years have 366 days.",
        },
      },
      {
        "@type": "Question",
        name: "What is a leap year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A leap year adds an extra day (February 29) to keep the calendar aligned with Earth’s orbit around the Sun.",
        },
      },
      {
        "@type": "Question",
        name: "How do you know if a year is a leap year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A year is a leap year if it’s divisible by 4, except years divisible by 100—those must also be divisible by 400.",
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
        name: "How many days in a year",
        item: "https://whatdayisit.now/how-many-days-in-a-year",
      },
    ],
  };

  const currentYear = new Date().getFullYear();

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
          <Link href="/" className="underline">
            Home
          </Link>
          {" > "}
          <span>How many days in a year</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days are in a year?
        </h1>

        <p className="text-xl mb-6">
          A standard year has <strong>365</strong> days. A leap year has{" "}
          <strong>366</strong> days.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <h2>Standard year: 365 days</h2>
          <p>
            In the Gregorian calendar, most years contain 365 days across 12
            months. This is the “normal” year length used for everyday dates and
            scheduling.
          </p>

          <h2>Leap year: 366 days</h2>
          <p>
            Every so often, one extra day is added to the calendar:{" "}
            <strong>February 29</strong>. That creates a leap year with 366 days.
            This keeps the calendar aligned with Earth’s orbit.
          </p>

          <h2>Leap year rule</h2>
          <ul>
            <li>If the year is divisible by 4 → leap year</li>
            <li>
              If the year is divisible by 100 → not a leap year (exception)
            </li>
            <li>
              If the year is divisible by 400 → leap year (exception to the
              exception)
            </li>
          </ul>

          <h2>Related live tools</h2>
          <ul>
            <li>
              <Link className="underline" href={`/how-many-days-left-in/${currentYear}`}>
                Days left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href={`/how-many-weeks-left-in/${currentYear}`}>
                Weeks left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href="/day-of-year">
                Day of year (live)
              </Link>
            </li>
            <li>
              <Link className="underline" href="/week-number">
                Week number (live)
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <RelatedDateTools />

      <DateCalculatorsLink />
    </main>
  );
}
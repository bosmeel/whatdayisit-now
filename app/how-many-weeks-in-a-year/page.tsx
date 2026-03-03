import Link from "next/link";

export const metadata = {
  title: "How many weeks are in a year? (52 or 53 explained)",
  description:
    "A year usually has 52 weeks, but sometimes 53. Learn why this happens and how week numbers work.",
  alternates: {
    canonical: "/how-many-weeks-in-a-year",
  },
  openGraph: {
    title: "How many weeks are in a year?",
    description:
      "Most years have 52 weeks. Some have 53 depending on ISO week rules.",
    url: "/how-many-weeks-in-a-year",
    type: "website",
  },
};

export default function HowManyWeeksInAYearPage() {
  const currentYear = new Date().getFullYear();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many weeks are in a year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most years have 52 weeks. Some years have 53 weeks depending on the calendar alignment.",
        },
      },
      {
        "@type": "Question",
        name: "Why do some years have 53 weeks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A year can have 53 weeks if January 1 falls on a Thursday, or if it is a leap year starting on Wednesday under ISO week rules.",
        },
      },
      {
        "@type": "Question",
        name: "How many days are in 52 weeks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "52 weeks equal 364 days, which is one day short of a standard 365-day year.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">
            Home
          </Link>
          {" > "}
          <span>How many weeks in a year</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many weeks are in a year?
        </h1>

        <p className="text-xl mb-6">
          A year usually contains <strong>52 weeks</strong>, but sometimes{" "}
          <strong>53 weeks</strong>.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <h2>Standard calculation</h2>
          <p>
            A standard year has 365 days. When divided by 7 days per week,
            this equals 52 weeks plus 1 extra day.
          </p>

          <p>
            A leap year has 366 days, which equals 52 weeks plus 2 extra days.
          </p>

          <h2>Why some years have 53 weeks</h2>
          <p>
            Under ISO week numbering, a year can contain 53 weeks depending on
            which weekday January 1 falls on and whether it is a leap year.
          </p>

          <h2>Related live tools</h2>
          <ul>
            <li>
              <Link className="underline" href={`/how-many-weeks-left-in/${currentYear}`}>
                Weeks left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href={`/how-many-days-left-in/${currentYear}`}>
                Days left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href="/week-number">
                Current week number
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
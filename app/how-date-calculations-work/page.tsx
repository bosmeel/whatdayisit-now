import Link from "next/link";

export const metadata = {
  title: "How date calculations work (days, weeks, leap years explained)",
  description:
    "Learn how date calculations work, including day counts, leap years, ISO week numbers and countdown logic.",
  alternates: {
    canonical: "/how-date-calculations-work",
  },
  openGraph: {
    title: "How date calculations work",
    description:
      "Explanation of how days, weeks, leap years and countdown calculations are determined.",
    url: "/how-date-calculations-work",
    type: "website",
  },
};

export default function HowDateCalculationsWorkPage() {
  const currentYear = new Date().getFullYear();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How are days between two dates calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The difference is calculated by subtracting one date timestamp from another and dividing by the number of milliseconds in a day.",
        },
      },
      {
        "@type": "Question",
        name: "Why do leap years affect date calculations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leap years add one extra day (February 29), which changes total day counts and affects long-term calculations.",
        },
      },
      {
        "@type": "Question",
        name: "How are week numbers calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Week numbers typically follow the ISO-8601 standard where weeks start on Monday and week 1 contains January 4.",
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
          <span>How date calculations work</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How date calculations work
        </h1>

        <p className="text-xl mb-6">
          Date calculations are based on precise time measurements,
          calendar rules and standardized systems like ISO-8601.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <h2>Counting days between dates</h2>
          <p>
            Computers store dates as timestamps — the number of milliseconds
            since January 1, 1970 (Unix epoch). By subtracting two timestamps,
            we get the exact difference in time.
          </p>

          <p>
            To convert that value into days, the result is divided by
            86,400,000 milliseconds (24 × 60 × 60 × 1000).
          </p>

          <h2>Leap years and calendar adjustments</h2>
          <p>
            Because Earth’s orbit takes approximately 365.2422 days,
            leap years are introduced to prevent seasonal drift.
            This affects long-term date differences.
          </p>

          <h2>Weeks and ISO standards</h2>
          <p>
            Week numbering typically follows ISO-8601. Weeks begin on Monday,
            and week 1 is defined as the week containing January 4.
          </p>

          <h2>Countdown calculations</h2>
          <p>
            A countdown calculates the difference between the current date
            and a future target date. If the target date has already passed
            in the current year, the calculation moves to the next year.
          </p>

          <h2>Related tools</h2>
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
              <Link className="underline" href="/days-until">
                Event countdowns
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
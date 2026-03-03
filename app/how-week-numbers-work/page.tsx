import Link from "next/link";

export const metadata = {
  title: "How do week numbers work? (ISO week explanation)",
  description:
    "Learn how ISO week numbers work, why some years have 53 weeks, and how week numbering is calculated.",
  alternates: {
    canonical: "/how-week-numbers-work",
  },
  openGraph: {
    title: "How do week numbers work?",
    description:
      "Explanation of ISO week numbering and 52 vs 53 week years.",
    url: "/how-week-numbers-work",
    type: "website",
  },
};

export default function HowWeekNumbersWorkPage() {
  const currentYear = new Date().getFullYear();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ISO week number?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ISO week numbers divide the year into weeks starting on Monday. Week 1 is the week containing the first Thursday of the year.",
        },
      },
      {
        "@type": "Question",
        name: "Why do some years have 53 weeks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A year has 53 ISO weeks if January 1 falls on a Thursday, or if it is a leap year that starts on a Wednesday.",
        },
      },
      {
        "@type": "Question",
        name: "When does week 1 start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Week 1 starts on the Monday of the week that contains January 4.",
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
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>How week numbers work</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How do week numbers work?
        </h1>

        <p className="text-xl mb-6">
          Week numbers follow the <strong>ISO-8601 standard</strong> in most countries.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <h2>ISO week system</h2>
          <p>
            The ISO system divides the year into weeks that start on Monday.
            Each week is assigned a number from 1 to 52 — and sometimes 53.
          </p>

          <h2>How week 1 is defined</h2>
          <p>
            Week 1 is the week that contains January 4. This ensures that
            the first week always has at least four days in the new year.
          </p>

          <h2>Why some years have 53 weeks</h2>
          <p>
            Because 52 weeks equal 364 days, most years have extra days.
            Depending on how those extra days align, a 53rd week can occur.
          </p>

          <h2>Related live tools</h2>
          <ul>
            <li>
              <Link className="underline" href="/week-number">
                Current week number
              </Link>
            </li>
            <li>
              <Link className="underline" href={`/how-many-weeks-left-in/${currentYear}`}>
                Weeks left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href="/how-many-weeks-in-a-year">
                How many weeks in a year
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
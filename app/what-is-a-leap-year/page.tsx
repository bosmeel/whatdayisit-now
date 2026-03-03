import Link from "next/link";

export const metadata = {
  title: "What is a leap year? Why February 29 exists",
  description:
    "A leap year has 366 days instead of 365. Learn why February 29 exists and how leap years are calculated.",
  alternates: {
    canonical: "/what-is-a-leap-year",
  },
  openGraph: {
    title: "What is a leap year?",
    description:
      "Leap years add February 29 to keep the calendar aligned with Earth's orbit.",
    url: "/what-is-a-leap-year",
    type: "website",
  },
};

export default function WhatIsLeapYearPage() {
  const currentYear = new Date().getFullYear();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a leap year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A leap year is a year with 366 days instead of 365. It includes February 29.",
        },
      },
      {
        "@type": "Question",
        name: "Why do we need leap years?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Leap years keep our calendar aligned with Earth's orbit around the Sun, which takes about 365.2422 days.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate a leap year?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A year is a leap year if it is divisible by 4, except years divisible by 100 unless they are also divisible by 400.",
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
          <span>What is a leap year</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          What is a leap year?
        </h1>

        <p className="text-xl mb-6">
          A leap year has <strong>366 days</strong> instead of 365. 
          The extra day is added to February as <strong>February 29</strong>.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <h2>Why leap years exist</h2>
          <p>
            Earth takes approximately 365.2422 days to orbit the Sun. 
            Because our calendar only counts whole days, that fractional time 
            would slowly shift seasons over centuries.
          </p>

          <p>
            Adding an extra day every four years keeps the calendar aligned 
            with astronomical reality.
          </p>

          <h2>The leap year rule</h2>
          <ul>
            <li>Divisible by 4 → leap year</li>
            <li>Divisible by 100 → not leap year</li>
            <li>Divisible by 400 → leap year</li>
          </ul>

          <h2>Related tools</h2>
          <ul>
            <li>
              <Link className="underline" href={`/how-many-days-left-in/${currentYear}`}>
                Days left in {currentYear}
              </Link>
            </li>
            <li>
              <Link className="underline" href="/how-many-days-in-a-year">
                How many days in a year
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
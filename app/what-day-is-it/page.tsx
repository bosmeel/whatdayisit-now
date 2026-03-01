import Link from "next/link";

export const metadata = {
  title: "What day is it today?",
  description:
    "Find out what day it is today instantly. See today’s date, week number, day of year and more.",
};

export default function WhatDayIsItPage() {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What day is it today?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Today is ${dayName}, ${fullDate}.`
      }
    },
    {
      "@type": "Question",
      "name": "How is the current day calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The current day is calculated automatically based on your device's system time."
      }
    },
    {
      "@type": "Question",
      "name": "Why would I need to know what day it is?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowing the current day helps with scheduling, planning, reporting, and staying organized."
      }
    }
  ]
};
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-semibold mb-4">
          What day is it today?
        </h1>

        <p className="text-xl mb-6">
          Today is <strong>{dayName}</strong>, {fullDate}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            If you’re wondering what day it is today, you’re not alone.
            Whether you’re planning your week, scheduling meetings, or just
            keeping track of time, knowing the current day quickly can be
            surprisingly useful.
          </p>

          <p>
            This page shows today’s exact day and full date automatically,
            based on your device’s current time. You can also check related
            information like the week number, day of year, and how many days
            are left this year.
          </p>

          <p>
            Want more details? Visit the{" "}
            <Link href="/" className="underline">
              main dashboard
            </Link>{" "}
            for full date statistics.
          </p>
        </div>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
      </div>
    </main>
  );
}
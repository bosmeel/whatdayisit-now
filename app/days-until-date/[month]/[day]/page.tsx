export const dynamic = "force-dynamic";

import Link from "next/link";
import DateCalculatorsLink from "@/components/DateCalculatorsLink"

function getDaysUntil(month: number, day: number) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const target = new Date(currentYear, month - 1, day);

  if (target.getTime() < now.getTime()) {
    target.setFullYear(currentYear + 1);
  }

  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function DaysUntilDatePage(
  { params }: { params: Promise<{ month: string; day: string }> }
) {
  const { month, day } = await params;

  const numericMonth = Number(month);
  const numericDay = Number(day);

  if (
    Number.isNaN(numericMonth) ||
    Number.isNaN(numericDay) ||
    numericMonth < 1 ||
    numericMonth > 12 ||
    numericDay < 1 ||
    numericDay > 31
  ) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Invalid date.</p>
      </main>
    );
  }

  const now = new Date();
  const monthName = new Date(
    now.getFullYear(),
    numericMonth - 1,
    numericDay
  ).toLocaleString("en-US", { month: "long" });

  const daysLeft = getDaysUntil(numericMonth, numericDay);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many days until ${monthName} ${numericDay}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${daysLeft} days until ${monthName} ${numericDay}.`,
        },
      },
      {
        "@type": "Question",
        name: "Does this update automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The countdown automatically updates every day.",
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
          <Link href="/days-until" className="underline">Days until</Link>
          {" > "}
          <span>{monthName} {numericDay}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {monthName} {numericDay}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days until {monthName} {numericDay}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            This page shows the number of days remaining until
            {` ${monthName} ${numericDay}.`} The calculation automatically
            updates every day and always counts forward to the next occurrence.
          </p>

          <p>
            These generic date countdowns are useful for planning travel,
            scheduling events, preparing deadlines, or tracking personal
            milestones.
          </p>
        </div>

      </div>
      <DateCalculatorsLink />
    </main>
  );
}
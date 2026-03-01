import Link from "next/link";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ event: string; year: string }> }
) {
  const { event, year } = await params;
  const numericYear = Number(year);
  const eventData = EVENTS[event];

  if (!eventData || Number.isNaN(numericYear)) return {};

  return {
    title: `How many days until ${eventData.name} ${numericYear}?`,
    description: `Live countdown showing how many days are left until ${eventData.name} ${numericYear}.`,
    alternates: {
      canonical: `/days-until/${event}/${numericYear}`,
    },
  };
}

function getDaysUntil(year: number, month: number, day: number) {
  const now = new Date();
  const target = new Date(year, month - 1, day);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function DaysUntilYearPage(
  { params }: { params: Promise<{ event: string; year: string }> }
) {
  const { event, year } = await params;
  const numericYear = Number(year);
  const eventData = EVENTS[event];

  if (!eventData || Number.isNaN(numericYear)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Invalid event or year.</p>
      </main>
    );
  }

  const daysLeft = getDaysUntil(
    numericYear,
    eventData.month,
    eventData.day
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${eventData.name} ${numericYear}`,
    startDate: `${numericYear}-${String(eventData.month).padStart(2, "0")}-${String(eventData.day).padStart(2, "0")}`,
    eventStatus: "https://schema.org/EventScheduled",
    description: `Countdown to ${eventData.name} ${numericYear}`,
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <Link href="/days-until" className="underline">Days Until</Link>
          {" > "}
          <Link href={`/days-until/${event}`} className="underline">
            {eventData.name}
          </Link>
          {" > "}
          <span>{numericYear}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {eventData.name} {numericYear}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days until {eventData.name} {numericYear}.
        </p>

      </div>
    </main>
  );
}
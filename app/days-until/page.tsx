import Link from "next/link";
import { EVENTS } from "@/lib/events";

export const metadata = {
  title: "Days Until Calculator – All Countdown Events",
  description:
    "Browse all popular countdowns. See how many days until Christmas, Halloween, New Year and dozens of other events.",
  alternates: { canonical: "/days-until" },
};

export default function DaysUntilIndex() {
  const sortedEvents = Object.entries(EVENTS).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6">
          Days Until – Popular Countdowns
        </h1>

        <p className="text-neutral-600 mb-8">
          Select an event to see how many days are left.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedEvents.map(([slug, event]) => (
            <Link
              key={slug}
              href={`/days-until/${slug}`}
              className="border rounded-lg p-4 hover:bg-neutral-50 transition"
            >
              <p className="font-medium text-blue-600">
                Days until {event.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
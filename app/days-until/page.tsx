import Link from "next/link";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Days Until Calculator – Countdown to Popular Events",
  description:
    "Live countdown tools showing how many days remain until major holidays and events.",
};

export default function DaysUntilHub() {
  const events = Object.entries(EVENTS);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-semibold mb-6">
          Days Until – Event Countdowns
        </h1>

        <p className="mb-8 text-neutral-700">
          Track how many days remain until popular holidays and important dates.
        </p>

        <ul className="space-y-3 text-blue-600">
          {events.map(([slug, config]) => (
            <li key={slug}>
              <Link href={`/days-until/${slug}`} className="underline">
                How many days until {config.name}?
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  );
}
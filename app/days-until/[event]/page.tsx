import Link from "next/link";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

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

export default async function DaysUntilPage(
  { params }: { params: Promise<{ event: string }> }
) {
  const { event } = await params;

  const eventData = EVENTS[event];
  if (!eventData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Event not found.</p>
      </main>
    );
  }

  const daysLeft = getDaysUntil(eventData.month, eventData.day);
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <Link href="/days-until" className="underline">Days until</Link>
          {" > "}
          <span>{eventData.name}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {eventData.name}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days until {eventData.name}.
        </p>

        {/* Expanded year links */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Other years</h2>

          <div className="flex flex-wrap gap-3 text-sm text-blue-600">
            {Array.from({ length: 6 }).map((_, i) => {
              const year = currentYear + i;
              return (
                <Link
                  key={year}
                  href={`/days-until/${event}/${year}`}
                  className="underline"
                >
                  {year}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">
            Popular countdowns
          </h2>

          <ul className="space-y-2 text-blue-600">
            <li><Link href="/days-until/christmas">Days until Christmas</Link></li>
            <li><Link href="/days-until/new-year">Days until New Year</Link></li>
            <li><Link href="/days-until/halloween">Days until Halloween</Link></li>
            <li><Link href="/days-until/thanksgiving">Days until Thanksgiving</Link></li>
            <li><Link href="/days-until/valentines-day">Days until Valentine's Day</Link></li>
          </ul>
        </div>

        <div className="mt-10 prose max-w-none text-neutral-700">
          <h2>About this countdown</h2>

          <p>
            This countdown shows how many days remain until the selected event.
            The calculation automatically adjusts each year and always counts
            forward to the next upcoming date.
          </p>

          <p>
            Many people use countdowns to plan holidays, prepare celebrations,
            schedule travel, organize shopping, or simply track important
            milestones throughout the year.
          </p>

          <p>
            As the date approaches, the remaining number of days updates daily,
            making this page a reliable reference for planning and anticipation.
          </p>
        </div>
      </div>
    </main>
  );
}
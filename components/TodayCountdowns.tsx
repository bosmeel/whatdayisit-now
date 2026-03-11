"use client";

import Link from "next/link";
import { EVENTS } from "@/lib/events";

function getDaysUntil(month: number, day: number) {
  const now = new Date();
  const year = now.getFullYear();

  let target = new Date(year, month - 1, day);

  if (target < now) {
    target = new Date(year + 1, month - 1, day);
  }

  const diff = target.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function TodayCountdowns() {

  const featured = [
    "christmas",
    "new-year",
    "halloween",
    "valentines-day",
  ];

  return (
    <section className="container">

      <h2>Upcoming Events</h2>

      <p>
        See how many days remain until the next major holidays and events.
      </p>

      <div className="tool-grid">

        {featured.map((slug) => {

          const event = EVENTS[slug];

          if (!event) return null;

          const days = getDaysUntil(event.month, event.day);

          return (
            <Link
              key={slug}
              href={`/days-until/${slug}`}
              className="tool-card"
            >

              <strong>
                {event.name}
              </strong>

              <div>
                {days} days remaining
              </div>

            </Link>
          );

        })}

      </div>

    </section>
  );
}
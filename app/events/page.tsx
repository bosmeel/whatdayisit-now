import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteLinks from "@/components/SiteLinks";

export const metadata: Metadata = {
  title: "Historical Events and Date Countdowns",
  description:
    "Explore historical events by date and countdowns to upcoming holidays and major events.",
  alternates: {
    canonical: "https://whatdayisit.now/events",
  },
  openGraph: {
    title: "Historical Events and Date Countdowns",
    description:
      "Browse historical events that happened on this day and countdowns to upcoming events.",
    url: "https://whatdayisit.now/events",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },
};

const popularCountdowns = [
  { name: "Christmas", slug: "christmas" },
  { name: "New Year", slug: "new-year" },
  { name: "Halloween", slug: "halloween" },
  { name: "Valentine's Day", slug: "valentines-day" },
  { name: "Thanksgiving", slug: "thanksgiving" },
];

export default function Page() {
  return (
    <main className="container">

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Events" }
        ]}
      />

      <h1>Events and Historical Dates</h1>

      <p>
        Explore historical events that happened on specific dates and
        countdowns to upcoming holidays and major events.
      </p>

      {/* Countdown tools */}

      <section style={{ marginTop: 40 }}>

        <h2>Popular Event Countdowns</h2>

        <p>
          See how many days remain until major holidays and events.
        </p>

        <div className="tool-grid">

          {popularCountdowns.map((event) => (

            <Link
              key={event.slug}
              href={`/days-until/${event.slug}`}
              className="tool-card"
            >

              <strong>Days Until {event.name}</strong>

              <div>
                Countdown to {event.name}
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Historical events */}

      <section style={{ marginTop: 50 }}>

        <h2>Historical Events by Date</h2>

        <p>
          Discover important historical events that happened on specific
          dates throughout the year.
        </p>

        <div className="tool-grid">

          <Link
            href="/what-happened-on"
            className="tool-card"
          >
            <strong>Browse Historical Events</strong>

            <div>
              Explore events for every day of the year
            </div>

          </Link>

        </div>

      </section>

      {/* Info section */}

      <section style={{ marginTop: 50 }}>

        <h2>Why Explore Historical Dates?</h2>

        <p>
          Many people search for historical events that happened on a
          particular day. These pages provide timelines of important
          discoveries, political events, and cultural milestones
          throughout history.
        </p>

        <p>
          You can also explore countdowns to future holidays and events,
          helping you plan celebrations and track upcoming milestones.
        </p>

      </section>
<SiteLinks />

    </main>
  );
}
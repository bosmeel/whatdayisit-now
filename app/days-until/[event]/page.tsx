import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/events";

type Props = {
  params: Promise<{ event: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event } = await params;
  const data = EVENTS[event];

  if (!data) {
    return {};
  }

  return {
    title: `Days Until ${data.name}`,
    description: `Countdown to ${data.name}. See how many days are left until ${data.name}.`,
    alternates: {
      canonical: `https://whatdayisit.now/days-until/${event}`,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { event } = await params;
  const data = EVENTS[event];

  if (!data) {
    notFound();
  }

  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  let eventDate = new Date(
    today.getFullYear(),
    data.month - 1,
    data.day
  );

  if (eventDate < today) {
    eventDate = new Date(
      today.getFullYear() + 1,
      data.month - 1,
      data.day
    );
  }

  const diff =
    Date.UTC(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    ) -
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  const days = Math.ceil(diff / 86400000);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      <p className="mb-8 text-sm">
        <Link href="/days-until" className="underline">
          ← Back to all countdowns
        </Link>
      </p>

      <p className="text-sm text-neutral-500 mb-2">
        Countdown to
      </p>

      <h1 className="text-2xl font-semibold mb-6">
        {data.name}
      </h1>

      <div className="result-box">
        <div className="result-number">
          {days}
        </div>

        <div className="result-label">
          days remaining
        </div>
      </div>

      <p className="seo-hidden">
        {days} days until {data.name} on {eventDate.toDateString()}.
      </p>

      <p className="text-sm text-neutral-500 mt-4">
        Date: {eventDate.toDateString()}
      </p>

    </main>
  );
}
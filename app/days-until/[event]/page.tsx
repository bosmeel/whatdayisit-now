import type { Metadata } from "next";
import { EVENTS } from "@/lib/events";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ event: string }>;
};

export function generateStaticParams() {
  return Object.keys(EVENTS).map((event) => ({
    event,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event } = await params;

  const data = EVENTS[event];

  if (!data) return {};

  return {
    title: `Days Until ${data.name}`,
    description: `Countdown to ${data.name}. See how many days are left.`,
    alternates: {
      canonical: `https://whatdayisit.now/days-until/${event}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { event } = await params;

  const data = EVENTS[event];

  if (!data) notFound();

  const now = new Date();
  const year = now.getFullYear();

  let eventDate = new Date(year, data.month - 1, data.day);

  if (eventDate < now) {
    eventDate = new Date(year + 1, data.month - 1, data.day);
  }

  const diff = eventDate.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Days Until {data.name}
      </h1>

      <p className="text-xl mb-6">
        {days} days until {data.name}.
      </p>

      <p>
        Date: {eventDate.toDateString()}
      </p>

    </main>
  );
}
export const dynamic = "force-dynamic";

import Link from "next/link";
import { EVENTS } from "@/lib/events";
import { getDaysUntil } from "@/lib/calculations";

export async function generateMetadata(
  { params }: { params: Promise<{ event: string }> }
) {
  const { event } = await params;
  const config = EVENTS[event];

  if (!config) return { title: "Event not found" };

  const baseUrl = "https://whatdayisit.now";
  const fullUrl = `${baseUrl}/days-until/${event}`;

  const now = new Date();
  const currentYear = now.getFullYear();
  const targetDate = new Date(currentYear, config.month - 1, config.day);

  const displayDate = targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const daysLeft = getDaysUntil(config.month, config.day);

  return {
    title: `How many days until ${config.name}?`,
    description: `Live countdown showing how many days remain until ${config.name}.`,
    alternates: { canonical: fullUrl },
    openGraph: {
      title: `How many days until ${config.name}?`,
      description: `Live countdown until ${config.name}.`,
      url: fullUrl,
      type: "website",
    },
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `How many days until ${config.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `There are ${daysLeft} days until ${config.name}.`,
              },
            },
            {
              "@type": "Question",
              name: `When is ${config.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${config.name} takes place on ${displayDate}.`,
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://whatdayisit.now",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Days until",
              item: "https://whatdayisit.now/days-until",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: config.name,
              item: fullUrl,
            },
          ],
        },
      ]),
    },
  };
}

export default async function DaysUntilEventPage(
  { params }: { params: Promise<{ event: string }> }
) {
  const { event } = await params;
  const config = EVENTS[event];

  if (!config) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Event not found.</p>
      </main>
    );
  }

  const daysLeft = getDaysUntil(config.month, config.day);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <Link href="/days-until" className="underline">Days until</Link>
          {" > "}
          <span>{config.name}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {config.name}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days until {config.name}.
        </p>
<div className="mt-12 border-t pt-6">
  <h2 className="text-lg font-semibold mb-3">
    Popular countdowns
  </h2>

  <ul className="space-y-2 text-blue-600">
    {Object.entries(EVENTS)
      .filter(([key]) => key !== event)
      .slice(0, 8)
      .map(([key, value]) => (
        <li key={key}>
          <Link href={`/days-until/${key}`} className="underline">
            Days until {value.name}
          </Link>
        </li>
      ))}
  </ul>
</div>
      </div>
    </main>
  );
}
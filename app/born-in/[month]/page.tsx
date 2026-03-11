import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 29 },
  { name: "march", days: 31 },
  { name: "april", days: 30 },
  { name: "may", days: 31 },
  { name: "june", days: 30 },
  { name: "july", days: 31 },
  { name: "august", days: 31 },
  { name: "september", days: 30 },
  { name: "october", days: 31 },
  { name: "november", days: 30 },
  { name: "december", days: 31 },
];

type Props = {
  params: Promise<{ month: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { month } = await params;

  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1);

  return {
    title: `Famous People Born in ${monthName}`,
    description: `Browse famous birthdays and notable people born in ${monthName}.`,
    alternates: {
      canonical: `https://whatdayisit.now/born-in/${month}`,
    },
  };
}

export default async function Page({ params }: Props) {

  const { month } = await params;

  const monthData = months.find((m) => m.name === month);

  if (!monthData) return notFound();

  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1);

  const dates = [];

  for (let d = 1; d <= monthData.days; d++) {
    dates.push(`${month}-${d}`);
  }

  return (

    <main className="container">

      <h1>Famous People Born in {monthName}</h1>

      <p>
        Explore famous birthdays and notable people born in {monthName}.
        Each date links to a detailed page with famous people,
        historical events and birthday facts.
      </p>

      <div className="tool-grid">

        {dates.map((d) => {

          const day = d.split("-")[1];

          return (

            <Link
              key={d}
              href={`/born-on/${d}`}
              className="tool-card"
            >

              {monthName} {day} birthdays

            </Link>

          );

        })}

      </div>

      <section style={{ marginTop: 40 }}>

        <h2>Birthdays in {monthName}</h2>

        <p>
          Thousands of notable people were born in {monthName}.
          These pages allow you to browse birthdays by exact date
          and discover famous individuals who share the same
          birthday.
        </p>

      </section>

    </main>

  );
}
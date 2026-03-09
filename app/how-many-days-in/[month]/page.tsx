import { notFound } from "next/navigation";

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 28 },
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

export async function generateMetadata({ params }: Props) {
  const { month } = await params;

  const monthData = months.find((m) => m.name === month);

  if (!monthData) return {};

  const name =
    month.charAt(0).toUpperCase() + month.slice(1);

  return {
    title: `How many days are in ${name}?`,
    description: `Find out how many days are in ${name}.`,
  };
}

export default async function Page({ params }: Props) {

  const { month } = await params;

  const monthData = months.find((m) => m.name === month);

  if (!monthData) notFound();

  const name =
    month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <main className="container">

      <h1>How Many Days Are in {name}?</h1>

      <p>
        {name} has <strong>{monthData.days}</strong> days.
      </p>

    </main>
  );
}
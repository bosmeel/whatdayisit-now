export const dynamic = "force-dynamic";
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
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: Props) {

  const { date } = await params;

  if (!date) return {};

  const [month, day] = date.split("-");

  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1);

  return {
    title: `Days Until ${monthName} ${day}`,
    description: `See how many days remain until ${monthName} ${day}.`,
  };
}

export default async function Page({ params }: Props) {

  const { date } = await params;

  if (!date) return notFound();

  const [monthSlug, dayStr] = date.split("-");

  const monthIndex = months.findIndex(
    (m) => m.name === monthSlug
  );

  if (monthIndex === -1) return notFound();

  const day = parseInt(dayStr);

  if (Number.isNaN(day)) return notFound();

  const now = new Date();
  const year = now.getFullYear();

  let target = new Date(year, monthIndex, day);

  if (target < now) {
    target = new Date(year + 1, monthIndex, day);
  }

  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  const monthName =
    monthSlug.charAt(0).toUpperCase() + monthSlug.slice(1);

  return (
    <main className="container">
      <h1>Days Until {monthName} {day}</h1>

      <p>
        There are <strong>{days}</strong> days until {monthName} {day}.
      </p>
    </main>
  );
}
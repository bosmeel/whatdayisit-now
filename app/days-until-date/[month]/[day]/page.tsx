import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    month: string;
    day: string;
  }>;
};

const MONTHS = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

function daysUntil(monthIndex: number, day: number) {
  const now = new Date();
  const year = now.getFullYear();

  const today = new Date(year, now.getMonth(), now.getDate(), 12, 0, 0, 0);
  let target = new Date(year, monthIndex, day, 12, 0, 0, 0);

  if (target.getTime() < today.getTime()) {
    target = new Date(year + 1, monthIndex, day, 12, 0, 0, 0);
  }

  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export async function generateStaticParams() {
  const params: { month: string; day: string }[] = [];

  for (let m = 0; m < 12; m++) {
    const maxDay = new Date(2025, m + 1, 0).getDate();
    for (let d = 1; d <= maxDay; d++) {
      params.push({ month: MONTHS[m], day: String(d) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { month, day } = await params;

  const m = MONTHS.indexOf((month || "").toLowerCase());
  const d = parseInt(String(day), 10);

  if (m === -1 || Number.isNaN(d)) {
    return { title: "Days Until Date" };
  }

  const title = `How many days until ${month} ${d}?`;
  const description = `Countdown showing how many days remain until ${month} ${d}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://whatdayisit.now/days-until-date/${month}/${d}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { month, day } = await params;

  const m = MONTHS.indexOf((month || "").toLowerCase());
  const d = parseInt(String(day), 10);

  if (m === -1 || Number.isNaN(d)) notFound();

  const maxDay = new Date(2025, m + 1, 0).getDate();
  if (d < 1 || d > maxDay) notFound();

  const remaining = daysUntil(m, d);
  const label = `${month.charAt(0).toUpperCase() + month.slice(1)} ${d}`;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>How many days until {label}?</h1>

      <p>
        There are <strong>{remaining}</strong> days until {label}.
      </p>

      <p>Use this countdown to track upcoming dates and events.</p>
    </main>
  );
}
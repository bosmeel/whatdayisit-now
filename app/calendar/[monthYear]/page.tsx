import { notFound } from "next/navigation";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

type Props = {
  params: Promise<{ monthYear: string }>;
};

export function generateStaticParams() {

  const params: { monthYear: string }[] = [];

  for (let year = 2020; year <= 2035; year++) {

    months.forEach((m) => {

      params.push({
        monthYear: `${m}-${year}`,
      });

    });

  }

  return params;
}

export async function generateMetadata({ params }: Props) {

  const { monthYear } = await params;

  const [monthSlug, year] = monthYear.split("-");

  const monthName =
    monthSlug.charAt(0).toUpperCase() + monthSlug.slice(1);

  return {
    title: `${monthName} ${year} Calendar`,
    description: `Calendar for ${monthName} ${year}. View all days and plan events.`,
  };
}

export default async function Page({ params }: Props) {

  const { monthYear } = await params;

  const [monthSlug, yearStr] = monthYear.split("-");

  const year = Number(yearStr);

  if (!months.includes(monthSlug) || Number.isNaN(year)) {
    notFound();
  }

  const monthIndex = months.indexOf(monthSlug);

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const monthName =
    monthSlug.charAt(0).toUpperCase() + monthSlug.slice(1);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        {monthName} {year} Calendar
      </h1>

      <div className="grid grid-cols-7 gap-2">

        {Array.from({ length: daysInMonth }).map((_, i) => {

          const day = i + 1;

          return (
            <div
              key={day}
              className="rounded border p-3 text-center"
            >
              {day}
            </div>
          );

        })}

      </div>

    </main>
  );
}
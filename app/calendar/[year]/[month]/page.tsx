import { notFound } from "next/navigation";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

type Props = {
  params: Promise<{ year: string; month: string }>;
};

export function generateStaticParams() {

  const params: { year: string; month: string }[] = [];

  for (let year = 2020; year <= 2035; year++) {

    months.forEach((m) => {
      params.push({
        year: year.toString(),
        month: m,
      });
    });

  }

  return params;
}

export async function generateMetadata({ params }: Props) {

  const { year, month } = await params;

  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1);

  return {
    title: `${monthName} ${year} Calendar`,
    description: `Calendar for ${monthName} ${year}.`,
  };
}

export default async function Page({ params }: Props) {

  const { year, month } = await params;

  const parsedYear = Number(year);

  if (!months.includes(month) || Number.isNaN(parsedYear)) {
    notFound();
  }

  const monthIndex = months.indexOf(month);

  const daysInMonth = new Date(parsedYear, monthIndex + 1, 0).getDate();

  const monthName =
    month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <main className="container">

      <h1>{monthName} {parsedYear} Calendar</h1>

      <div className="grid grid-cols-7 gap-2">

        {Array.from({ length: daysInMonth }).map((_, i) => {

          const day = i + 1;

          return (
            <div key={day} className="border p-3 text-center">
              {day}
            </div>
          );

        })}

      </div>

    </main>
  );
}
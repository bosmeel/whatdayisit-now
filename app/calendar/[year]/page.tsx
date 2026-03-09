import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export default async function CalendarYearPage({ params }: Props) {

  const { year } = await params;
  const parsedYear = Number(year);

  if (!Number.isInteger(parsedYear) || parsedYear < 1 || parsedYear > 9999) {
    notFound();
  }

  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">

      <h1 className="text-3xl font-bold mb-4">
        {parsedYear} Calendar
      </h1>

      <p className="mb-8">
        Browse all months of the {parsedYear} calendar.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">

        {months.map((month) => {

          const monthLabel =
            month.charAt(0).toUpperCase() + month.slice(1);

          return (

            <Link
              key={month}
              href={`/calendar/${parsedYear}/${month}`}
              className="rounded-xl border p-4 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <strong>{monthLabel}</strong>
              <div>{parsedYear}</div>
            </Link>

          );

        })}

      </div>

    </main>
  );
}
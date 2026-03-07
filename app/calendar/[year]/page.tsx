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

  return (
    <div>
      <h1>Calendar {parsedYear}</h1>

      <p>
        This calendar for {parsedYear} shows all months of the year and can be
        used to track birthdays, events and important dates.
      </p>

      <div className="today-grid">
        {Array.from({ length: 12 }).map((_, index) => {
          const monthName = new Date(parsedYear, index, 1).toLocaleDateString(
            "en-US",
            { month: "long" }
          );

          return (
            <div key={monthName} className="today-card">
              <strong>{monthName}</strong>
              <div>{parsedYear}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
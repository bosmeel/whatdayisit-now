import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string; week: string }>;
};

export function generateStaticParams() {

  const params = [];

  for (let year = 2020; year <= 2035; year++) {

    for (let week = 1; week <= 53; week++) {

      params.push({
        year: year.toString(),
        week: week.toString(),
      });

    }

  }

  return params;
}

export default async function Page({ params }: Props) {

  const { year, week } = await params;

  const y = Number(year);
  const w = Number(week);

  if (!Number.isInteger(y) || !Number.isInteger(w) || w < 1 || w > 53) {
    notFound();
  }

  return (
    <main className="container">

      <h1>Week {w} of {y}</h1>

      <p>
        ISO week {w} of {y}.
      </p>

    </main>
  );
}
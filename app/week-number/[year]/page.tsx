import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ year: string }>;
};

export function generateStaticParams() {

  const years = [];

  for (let y = 2020; y <= 2035; y++) {
    years.push({ year: y.toString() });
  }

  return years;
}

export default async function Page({ params }: Props) {

  const { year } = await params;

  const parsedYear = Number(year);

  if (!Number.isInteger(parsedYear)) {
    notFound();
  }

  return (
    <main className="container">

      <h1>Week Numbers {parsedYear}</h1>

      <p>
        See all ISO week numbers for {parsedYear}.
      </p>

      <div className="grid grid-cols-4 gap-3">

        {Array.from({ length: 53 }).map((_, i) => {

          const week = i + 1;

          return (
            <Link
              key={week}
              href={`/week-number/${parsedYear}/${week}`}
              className="border p-3 text-center"
            >
              Week {week}
            </Link>
          );

        })}

      </div>

    </main>
  );
}
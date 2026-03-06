import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ month: string }>;
};

export default async function Page({ params }: Props) {

  const { month } = await params;

  if (!month) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold mb-6">
        Days Until {month}
      </h1>

      <p>
        Countdown pages for the month of {month}.
      </p>

    </main>
  );
}
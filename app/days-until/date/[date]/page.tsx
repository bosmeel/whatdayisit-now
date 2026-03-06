import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ date: string }>;
};

export default async function Page({ params }: Props) {

  const { date } = await params;

  if (!date) notFound();

  const target = new Date(date);

  if (isNaN(target.getTime())) {
    notFound();
  }

  const now = new Date();

  const diff = target.getTime() - now.getTime();

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-semibold mb-6">
        Days Until {target.toDateString()}
      </h1>

      <p className="text-xl">
        {days} days remaining
      </p>

    </main>
  );
}
import Link from "next/link";

export const metadata = {
  title: "How many days until New Year?",
  description:
    "Live countdown showing exactly how many days remain until New Year's Day.",
};

export default function Page() {

  const today = new Date();
  const year = today.getFullYear();

  let newYear = new Date(`${year + 1}-01-01`);

  const diff = Math.ceil(
    (newYear.getTime() - today.getTime()) / 86400000
  );

  return (
    <main className="max-w-2xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-6">
        How many days until New Year?
      </h1>

      <p className="text-3xl font-semibold mb-6">
        {diff} days
      </p>

      <p className="text-neutral-600 mb-8">
        New Year's Day is celebrated every year on January 1. This live
        countdown shows exactly how many days remain until the next
        New Year celebration.
      </p>

      <div className="border-t pt-6 mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Related countdowns
        </h2>

        <ul className="space-y-2 text-indigo-600">
          <li>
            <Link href="/days-until/new-year">
              Days until New Year countdown
            </Link>
          </li>
          <li>
            <Link href="/how-many-days-until-christmas">
              How many days until Christmas
            </Link>
          </li>
          <li>
            <Link href="/how-many-days-until-halloween">
              How many days until Halloween
            </Link>
          </li>
        </ul>

      </div>

    </main>
  );
}
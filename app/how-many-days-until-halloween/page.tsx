import Link from "next/link";

export const metadata = {
  title: "How many days until Halloween?",
  description:
    "Live countdown showing exactly how many days remain until Halloween.",
};

export default function Page() {
  const today = new Date();
  const year = today.getFullYear();

  let halloween = new Date(`${year}-10-31`);

  if (today > halloween) {
    halloween = new Date(`${year + 1}-10-31`);
  }

  const diff = Math.ceil(
    (halloween.getTime() - today.getTime()) / 86400000
  );

  return (
    <main className="max-w-2xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-6">
        How many days until Halloween?
      </h1>

      <p className="text-3xl font-semibold mb-6">
        {diff} days
      </p>

      <p className="text-neutral-600 mb-8">
        Halloween is celebrated every year on October 31. This live
        countdown shows exactly how many days remain until the next
        Halloween celebration.
      </p>

      <div className="border-t pt-6 mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Related countdowns
        </h2>

        <ul className="space-y-2 text-indigo-600">
          <li>
            <Link href="/days-until/halloween">
              Days until Halloween countdown
            </Link>
          </li>
          <li>
            <Link href="/how-many-days-until-christmas">
              How many days until Christmas
            </Link>
          </li>
          <li>
            <Link href="/how-many-days-until-new-year">
              How many days until New Year
            </Link>
          </li>
        </ul>

      </div>

    </main>
  );
}
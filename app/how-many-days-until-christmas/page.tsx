import Link from "next/link";

export const metadata = {
title: "How many days until Christmas?",
description: "Live countdown showing exactly how many days until Christmas.",
};

export default function Page() {

const today = new Date();
const year = today.getFullYear();

const christmas = new Date(`${year}-12-25`);

if (today > christmas) {
christmas.setFullYear(year + 1);
}

const diff =
Math.ceil((christmas.getTime() - today.getTime()) / 86400000);

return (
<div className="max-w-2xl mx-auto py-12">

<h1 className="text-4xl font-bold mb-6">
How many days until Christmas?
</h1>

<p className="text-2xl font-semibold mb-6">
{diff} days
</p>

<p className="mb-8 text-neutral-600">
Christmas is celebrated every year on December 25.
This live countdown shows the exact number of days remaining.
</p>

<Link
href="/days-until/christmas"
className="text-indigo-600 underline"
>
See detailed Christmas countdown
</Link>

</div>
);
}
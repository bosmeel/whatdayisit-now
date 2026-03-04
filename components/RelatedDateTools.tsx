import Link from "next/link";

export default function RelatedDateTools() {
  const tools = [
    { title: "Days Between Dates", url: "/days-between" },
    { title: "Days Until Date", url: "/days-until" },
    { title: "Days Since Date", url: "/days-since" },
    { title: "Weeks Between Dates", url: "/weeks-between" },
    { title: "Months Between Dates", url: "/months-between" },
    { title: "Years Between Dates", url: "/years-between" },
    { title: "Business Days Between", url: "/business-days-between" },
    { title: "Age Calculator", url: "/age-calculator" },
    { title: "Day of Year", url: "/day-of-year" },
    { title: "Days Left in Year", url: "/days-left-in-year" },
    { title: "How Many Days in a Year", url: "/how-many-days-in-a-year" },
  ];

  return (
    <section className="mt-10 border-t pt-6">
      <h2 className="text-lg font-semibold mb-3">Related date tools</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-blue-600">
        {tools.map((tool) => (
          <li key={tool.url}>
            <Link href={tool.url} className="hover:underline">
              {tool.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

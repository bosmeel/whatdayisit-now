import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const calculators: NavItem[] = [
  { href: "/days-between", label: "Days between dates" },
  { href: "/days-until", label: "Days until date" },
  { href: "/days-since", label: "Days since date" },
  { href: "/date-calculators", label: "All date calculators" },
];

const tools: NavItem[] = [
  { href: "/week-number", label: "Week number" },
  { href: "/day-of-year", label: "Day of year" },
  { href: "/days-left-in-year", label: "Days left in year" },
  { href: "/year-progress", label: "Year progress" },
  { href: "/days-until-weekend", label: "Days until weekend" },
];

const browse: NavItem[] = [
  { href: "/born-on", label: "Birthdays by date" },
  { href: "/what-happened-on", label: "Historical events by date" },
];

export default function ToolsNav() {

  // tijdelijk uitgeschakeld voor homepage interface fix
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    return null;
  }

  return (
    <nav className="mt-12 border-t border-neutral-200 pt-6">

      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
        Date calculators
      </p>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-6">
        {calculators.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
        Browse dates
      </p>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-6">
        {browse.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
        Today tools
      </p>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {tools.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  );
}
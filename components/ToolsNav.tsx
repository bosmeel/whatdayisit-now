import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const items: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/week-number", label: "Week number" },
  { href: "/day-of-year", label: "Day of year" },
  { href: "/days-left-in-year", label: "Days left in year" },
  { href: "/year-progress", label: "Year progress" },
  { href: "/days-until-weekend", label: "Days until weekend" },
];

export default function ToolsNav() {
  return (
    <nav className="mt-12 border-t border-neutral-200 pt-6">
      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">
        Tools
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {items.map((item) => (
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
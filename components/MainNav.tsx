import Link from "next/link";

const items = [
  { href: "/", label: "Today" },
  { href: "/date-calculators", label: "Calculators" },
  { href: "/birthday-tools", label: "Birthdays" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
];

export default function MainNav() {
  return (
    <nav className="main-nav">

      <ul>

        {items.map((item) => (

          <li key={item.href}>
            <Link href={item.href}>
              {item.label}
            </Link>
          </li>

        ))}

      </ul>

    </nav>
  );
}
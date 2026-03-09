import Link from "next/link";

type Item = {
  name: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav className="breadcrumbs">

      {items.map((item, i) => (
        <span key={i}>

          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}

          {i < items.length - 1 && " / "}

        </span>
      ))}

    </nav>
  );
}
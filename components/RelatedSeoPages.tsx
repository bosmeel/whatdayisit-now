import Link from "next/link";

type Item = {
  slug: string;
  label: string;
};

type Props = {
  items: Item[];
  basePath: string;
  current: string;
  title?: string;
};

export default function RelatedSeoPages({
  items,
  basePath,
  current,
  title = "Related pages",
}: Props) {

  const filtered = items
    .filter((i) => i.slug !== current)
    .slice(0, 8);

  if (filtered.length === 0) return null;

  return (

    <section style={{ marginTop: 40 }}>

      <h2>{title}</h2>

      <ul style={{ lineHeight: 1.9 }}>

        {filtered.map((item) => (

          <li key={item.slug}>
            <Link href={`${basePath}/${item.slug}`}>
              {item.label}
            </Link>
          </li>

        ))}

      </ul>

    </section>

  );
}
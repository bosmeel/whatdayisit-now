import Link from "next/link";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

export default function InternalDateLinks() {

  const links = [];

  for(let m=0;m<months.length;m++){

    for(let d=1;d<=3;d++){

      links.push({
        slug:`${months[m]}-${d}`,
        label:`${months[m].charAt(0).toUpperCase()+months[m].slice(1)} ${d}`
      });

    }

  }

  return(

    <section style={{marginTop:60}}>

      <h2>Browse Date Countdowns</h2>

      <div className="tool-grid">

        {links.map((l)=>(
          <Link
            key={l.slug}
            href={`/days-until-date/${l.slug}`}
            className="tool-card"
          >

            <strong>{l.label}</strong>

            <div>See countdown</div>

          </Link>
        ))}

      </div>

    </section>

  );

}
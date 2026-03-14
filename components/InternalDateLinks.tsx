import Link from "next/link";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

function generateDateLinks(){

  const links:{slug:string,label:string}[] = [];

  for(let m=0;m<months.length;m++){

    for(let d=1;d<=3;d++){

      const name = months[m];

      links.push({
        slug:`${name}-${d}`,
        label:`${name.charAt(0).toUpperCase()+name.slice(1)} ${d}`
      });

    }

  }

  return links;
}

function generateYearLinks(){

  const currentYear = new Date().getFullYear();
  const links:{slug:string,label:string}[] = [];

  for(let y=currentYear-3;y<=currentYear+3;y++){

    links.push({
      slug:`${y}-and-${y+1}`,
      label:`${y} and ${y+1}`
    });

  }

  return links;
}

export default function InternalDateLinks(){

  const dateLinks = generateDateLinks();
  const yearLinks = generateYearLinks();

  return(

    <section style={{marginTop:60}}>

      <h2>Browse Date Countdowns</h2>

      <div className="tool-grid">

        {dateLinks.map((l)=>(
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

      <h2 style={{marginTop:40}}>Year Comparisons</h2>

      <div className="tool-grid">

        {yearLinks.map((l)=>(
          <Link
            key={l.slug}
            href={`/days-between-years/${l.slug}`}
            className="tool-card"
          >
            <strong>{l.label}</strong>
            <div>Days between these years</div>
          </Link>
        ))}

      </div>

    </section>

  );

}
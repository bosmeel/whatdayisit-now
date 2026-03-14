import Link from "next/link";

const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

function capitalize(s:string){
  return s.charAt(0).toUpperCase()+s.slice(1);
}

export default function InternalDateLinks() {

  const links = [];

  for(let m=0;m<months.length;m++){

    for(let d=1;d<=3;d++){

      links.push({
        slug:`${months[m]}-${d}`,
        label:`${capitalize(months[m])} ${d}`
      });

    }

  }

  return(

    <section style={{marginTop:60}}>

      <h2>Explore More Date Tools</h2>

      <div className="tool-grid">

        {links.map((l)=>(

          <Link
            key={`until-${l.slug}`}
            href={`/days-until-date/${l.slug}`}
            className="tool-card"
          >
            <strong>{l.label}</strong>
            <div>Days until this date</div>
          </Link>

        ))}

        {links.map((l)=>(

          <Link
            key={`born-${l.slug}`}
            href={`/born-on/${l.slug}`}
            className="tool-card"
          >
            <strong>Born on {l.label}</strong>
            <div>See weekday of birth</div>
          </Link>

        ))}

        {links.map((l)=>(

          <Link
            key={`history-${l.slug}`}
            href={`/what-happened-on/${l.slug}`}
            className="tool-card"
          >
            <strong>History on {l.label}</strong>
            <div>Important events on this day</div>
          </Link>

        ))}

      </div>

    </section>

  );

}
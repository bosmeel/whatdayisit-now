import Link from "next/link";
import { notFound } from "next/navigation";
import { generateDatePages } from "@/lib/data/datePages";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    date: string;
  }>;
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function parseSlug(slug:string){

  const parts=slug.split("-");

  if(parts.length!==3)return null;

  const monthName=parts[0];
  const day=parseInt(parts[1]);
  const year=parseInt(parts[2]);

  const monthIndex=MONTHS
    .map(m=>m.toLowerCase())
    .indexOf(monthName);

  if(monthIndex===-1)return null;

  const date=new Date(year,monthIndex,day);

  if(isNaN(date.getTime()))return null;

  return date;
}

function dayName(date:Date){
  return date.toLocaleDateString("en-US",{weekday:"long"});
}

export async function generateMetadata({params}:Props){

  const {date}=await params;

  const parsed=parseSlug(date);

  if(!parsed){
    return {title:"What Day Is It"};
  }

  const weekday=dayName(parsed);

  const label=`${MONTHS[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`;

  return{
    title:`What day is ${label}?`,
    description:`${label} falls on a ${weekday}.`,
    alternates:{
      canonical:`https://whatdayisit.now/what-day-is/${date}`
    }
  };

}

export default async function Page({params}:Props){

  const {date}=await params;

  const parsed=parseSlug(date);

  if(!parsed)notFound();

  const weekday=dayName(parsed);

  const label=`${MONTHS[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`;

  const prev=new Date(parsed);
  prev.setDate(prev.getDate()-1);

  const next=new Date(parsed);
  next.setDate(next.getDate()+1);

  const prevSlug=`${MONTHS[prev.getMonth()].toLowerCase()}-${prev.getDate()}-${prev.getFullYear()}`;
  const nextSlug=`${MONTHS[next.getMonth()].toLowerCase()}-${next.getDate()}-${next.getFullYear()}`;

  return(

    <main style={{maxWidth:900,margin:"40px auto",padding:20}}>

      <h1>What day is {label}?</h1>

      <p>
        {label} falls on a <strong>{weekday}</strong>.
      </p>

      <hr style={{margin:"30px 0"}}/>

      <h2>Nearby dates</h2>

      <ul>
        <li>
          <Link href={`/what-day-is/${prevSlug}`}>
            What day was {MONTHS[prev.getMonth()]} {prev.getDate()}, {prev.getFullYear()}?
          </Link>
        </li>

        <li>
          <Link href={`/what-day-is/${nextSlug}`}>
            What day is {MONTHS[next.getMonth()]} {next.getDate()}, {next.getFullYear()}?
          </Link>
        </li>
      </ul>

    </main>

  );

}
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InternalDateLinks from "@/components/InternalDateLinks";

type Props = {
  params: Promise<{ pair: string }>;
};

function parsePair(slug: string) {

  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;

  const start = parseInt(parts[0]);
  const end = parseInt(parts[1]);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (start >= end) return null;

  return { start, end };
}

function calculateDays(startYear:number,endYear:number){

  const start = new Date(startYear,0,1);
  const end = new Date(endYear,0,1);

  const diff = end.getTime() - start.getTime();

  return Math.round(diff / 86400000);
}

/* STATIC GENERATION */

export function generateStaticParams(){

  const pairs = [];

  for(let y=1990;y<=2035;y++){
    pairs.push({pair:`${y}-and-${y+1}`});
  }

  return pairs;
}

export async function generateMetadata({params}:Props):Promise<Metadata>{

  const {pair} = await params;

  const parsed = parsePair(pair);
  if(!parsed) return {};

  return {
    title:`Days Between ${parsed.start} and ${parsed.end}`,
    description:`There are ${calculateDays(parsed.start,parsed.end)} days between January 1 ${parsed.start} and January 1 ${parsed.end}.`,
    alternates:{
      canonical:`https://whatdayisit.now/days-between-years/${pair}`
    }
  };
}

export default async function Page({params}:Props){

  const {pair} = await params;

  const parsed = parsePair(pair);
  if(!parsed) return notFound();

  const days = calculateDays(parsed.start,parsed.end);

  return(

    <main className="container">

      <h1>Days Between {parsed.start} and {parsed.end}</h1>

      <div className="result-box">

        <div className="result-number">
          {days}
        </div>

        <div className="result-label">
          days
        </div>

      </div>

      <p style={{marginTop:20}}>
        There are <strong>{days}</strong> days between January 1 {parsed.start}
        and January 1 {parsed.end}.
      </p>

      <p>
        This calculation includes leap years and counts the exact number of
        calendar days between the beginning of both years.
      </p>

      <InternalDateLinks />

    </main>

  );
}
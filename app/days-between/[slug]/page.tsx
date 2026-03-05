import { redirect } from "next/navigation";

const months: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function parseSlug(slug: string) {

  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const [a,b] = parts;

  const [m1,d1] = a.split("-");
  const [m2,d2] = b.split("-");

  const month1 = months[m1];
  const month2 = months[m2];

  if(month1 === undefined || month2 === undefined) return null;

  const year = new Date().getFullYear();

  const start = `${year}-${String(month1).padStart(2,"0")}-${String(d1).padStart(2,"0")}`;
  const end = `${year}-${String(month2).padStart(2,"0")}-${String(d2).padStart(2,"0")}`;

  return {start,end};
}

export default function Page({params}:{params:{slug:string}}){

  const parsed = parseSlug(params.slug);

  if(!parsed){

    redirect("/days-between");

  }

  redirect(`/days-between?start=${parsed.start}&end=${parsed.end}`);

}
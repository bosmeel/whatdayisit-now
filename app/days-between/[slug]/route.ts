import { NextRequest, NextResponse } from "next/server";

const months: Record<string, number> = {
  january:1,february:2,march:3,april:4,may:5,june:6,
  july:7,august:8,september:9,october:10,november:11,december:12,
  jan:1,feb:2,mar:3,apr:4,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {

  try {

    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.redirect(new URL("/days-between", request.url));
    }

    const parts = slug.toLowerCase().split("-and-");

    if (parts.length !== 2) {
      return NextResponse.redirect(new URL("/days-between", request.url));
    }

    const [left, right] = parts;

    const [m1, d1] = left.split("-");
    const [m2, d2] = right.split("-");

    const month1 = months[m1];
    const month2 = months[m2];

    const day1 = Number(d1);
    const day2 = Number(d2);

    if (!month1 || !month2 || !day1 || !day2) {
      return NextResponse.redirect(new URL("/days-between", request.url));
    }

    const year = new Date().getFullYear();

    const start =
      `${year}-${String(month1).padStart(2,"0")}-${String(day1).padStart(2,"0")}`;

    const end =
      `${year}-${String(month2).padStart(2,"0")}-${String(day2).padStart(2,"0")}`;

    return NextResponse.redirect(
      new URL(`/days-between?start=${start}&end=${end}`, request.url)
    );

  } catch {

    return NextResponse.redirect(new URL("/days-between", request.url));

  }

}
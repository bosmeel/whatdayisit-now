import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Wednesday",
  description:
    "Discover what it means to be born on a Wednesday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-wednesday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Wednesday" />;
}
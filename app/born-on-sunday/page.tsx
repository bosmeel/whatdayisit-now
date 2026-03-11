import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Sunday",
  description:
    "Discover what it means to be born on a Sunday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-sunday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Sunday" />;
}
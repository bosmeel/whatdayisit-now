import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Thursday",
  description:
    "Discover what it means to be born on a Thursday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-thursday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Thursday" />;
}
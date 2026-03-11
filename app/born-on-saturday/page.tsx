import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Saturday",
  description:
    "Discover what it means to be born on a Saturday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-saturday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Saturday" />;
}
import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Friday",
  description:
    "Discover what it means to be born on a Friday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-friday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Friday" />;
}
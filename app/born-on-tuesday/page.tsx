import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Tuesday",
  description:
    "Discover what it means to be born on a Tuesday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-tuesday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Tuesday" />;
}
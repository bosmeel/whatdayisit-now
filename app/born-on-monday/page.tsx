import type { Metadata } from "next";
import BornOnWeekday from "@/components/BornOnWeekday";

export const metadata: Metadata = {
  title: "Born on Monday",
  description:
    "Discover what it means to be born on a Monday and explore birthdays by date.",
  alternates: {
    canonical: "https://whatdayisit.now/born-on-monday",
  },
};

export default function Page() {
  return <BornOnWeekday weekday="Monday" />;
}
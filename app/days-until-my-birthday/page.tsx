import type { Metadata } from "next";
import BirthdayClient from "./Client";

export const metadata: Metadata = {
  title: "Days Until My Birthday",
  description:
    "Enter your birthdate to see how many days until your next birthday and your age in multiple formats.",
  alternates: {
    canonical: "https://whatdayisit.now/days-until-my-birthday",
  },
};

export default function Page() {
  return <BirthdayClient />;
}
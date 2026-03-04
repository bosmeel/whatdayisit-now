import type { Metadata } from "next";
import TodayDashboard from "../components/TodayDashboard";

export const metadata: Metadata = {
  title: "What day is it today? Live date dashboard",
  description:
    "Live date dashboard showing today's date, week number, day of year, year progress and countdown tools.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <TodayDashboard />;
}
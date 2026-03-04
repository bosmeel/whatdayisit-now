import type { Metadata } from "next";
import TodayDashboard from "../components/TodayDashboard";

export const metadata: Metadata = {
title: "What day is it today? | Live date dashboard",
description:
"See today's date, day of week, week number, day of year, year progress and useful date calculators.",

openGraph: {
title: "What day is it today?",
description:
"Live dashboard showing today's date, week number, day of year and year progress.",
url: "https://whatdayisit.now",
siteName: "WhatDayIsIt.now",
type: "website",
},

alternates: {
canonical: "https://whatdayisit.now",
},
};

export default function Home() {
return <TodayDashboard />;
}
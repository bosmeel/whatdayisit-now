import { Suspense } from "react";
import DaysBetweenClient from "./DaysBetweenClient";

export default function Page() {
  return (
    <Suspense>
      <DaysBetweenClient />
    </Suspense>
  );
}
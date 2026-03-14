"use client";

import { usePathname } from "next/navigation";
import StickyTimeBar from "@/components/StickyTimeBar";

export default function StickyWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <StickyTimeBar />;
}

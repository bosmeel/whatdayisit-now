import { generateMonthDayPairs } from "./datePairs.generated";

export type DatePairKind = "md-md" | "year-year";
export type MonthDay = { month: number; day: number };

export type DatePair =
  | {
      kind: "md-md";
      slug: string;
      start: MonthDay;
      end: MonthDay;
      label: string;
      priority?: number;
    }
  | {
      kind: "year-year";
      slug: string;
      startYear: number;
      endYear: number;
      label: string;
      priority?: number;
    };

const generated: DatePair[] = generateMonthDayPairs().map((p) => ({
  kind: "md-md" as const,
  slug: p.slug,
  start: p.start,
  end: p.end,
  label: p.label,
  priority: p.priority,
}));

const yearPairs: DatePair[] = [
  {
    kind: "year-year",
    slug: "2024-and-2025",
    startYear: 2024,
    endYear: 2025,
    label: "2024 and 2025",
    priority: 9,
  },
  {
    kind: "year-year",
    slug: "2025-and-2026",
    startYear: 2025,
    endYear: 2026,
    label: "2025 and 2026",
    priority: 9,
  },
];

export const DATE_PAIRS: DatePair[] = [...yearPairs, ...generated];

export function getDatePairBySlug(slug: string): DatePair | undefined {
  return DATE_PAIRS.find((p) => p.slug === slug);
}
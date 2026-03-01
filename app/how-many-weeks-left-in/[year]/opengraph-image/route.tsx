import { ImageResponse } from "next/og";

export const runtime = "edge";

function getWeeksLeftInYear(year: number): string {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (year < currentYear) return "0.00";

  const endOfYear = new Date(year, 11, 31, 23, 59, 59);

  if (year > currentYear) {
    const startOfYear = new Date(year, 0, 1);
    const diffMs = endOfYear.getTime() - startOfYear.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return (diffDays / 7).toFixed(2);
  }

  const diffMs = endOfYear.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return (diffDays / 7).toFixed(2);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ year: string }> }
) {
  const { year } = await context.params;
  const numericYear = Number(year);
  const weeksLeft = getWeeksLeftInYear(numericYear);

  return new ImageResponse(
  (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span style={{ fontSize: 60, marginBottom: 20 }}>
        Weeks left in {numericYear}
      </span>

      <span style={{ fontSize: 140, fontWeight: 700 }}>
        {weeksLeft}
      </span>
    </div>
  ),
  {
    width: 1200,
    height: 630,
  }
);
}
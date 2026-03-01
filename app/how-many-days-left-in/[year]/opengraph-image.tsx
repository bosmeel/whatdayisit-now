import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image(
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const numericYear = Number(year);

  const now = new Date();
  const endOfYear = new Date(numericYear, 11, 31);
  const diff = Math.ceil(
    (endOfYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 600,
            }}
          >
            Days left in {numericYear}
          </span>

          <span
            style={{
              fontSize: 120,
              fontWeight: 700,
              marginTop: 20,
            }}
          >
            {diff}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
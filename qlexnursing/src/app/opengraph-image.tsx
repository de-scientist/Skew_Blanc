import { ImageResponse } from "next/og";

export const alt = "QLexNursing — NCLEX-RN & RN Nursing Exam Prep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            Q
          </div>
          QLexNursing
        </div>
        <div style={{ marginTop: 40, fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          Practice smarter.
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          Prepare with confidence.
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#a5b4fc" }}>
          NCLEX-RN &amp; RN Nursing exam preparation
        </div>
      </div>
    ),
    size
  );
}

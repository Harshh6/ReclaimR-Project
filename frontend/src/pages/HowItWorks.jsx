import { useState } from "react";

const steps = [
  { num: "01", title: "REPORT", desc: "Report an item you lost or found on campus." },
  { num: "02", title: "DISCOVER", desc: "Browse through reported lost and found items." },
  { num: "03", title: "MATCH", desc: "Lost and found reports get compared and matched." },
  { num: "04", title: "RECLAIM", desc: "The rightful owner recovers their item." },
];

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <div className="page container">
      <h1
        className="section-title"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
      >
        How ReclaimR Works
      </h1>
      <div className="grid grid-4">
        {steps.map((s) => (
          <div
            key={s.num}
            className="card step-card"
            onMouseEnter={() => setHoveredStep(s.num)}
            onMouseLeave={() => setHoveredStep(null)}
            style={{
              transform: hoveredStep === s.num ? "translateY(-6px)" : "translateY(0)",
              boxShadow: hoveredStep === s.num ? "0 8px 20px rgba(0, 0, 0, 0.12)" : undefined,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div className="step-num">{s.num}</div>
            <h3 style={{ color: "#2563eb" }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

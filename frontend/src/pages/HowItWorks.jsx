const steps = [
  { num: "01", title: "REPORT", desc: "Report an item you lost or found on campus." },
  { num: "02", title: "DISCOVER", desc: "Browse through reported lost and found items." },
  { num: "03", title: "MATCH", desc: "Lost and found reports get compared and matched." },
  { num: "04", title: "RECLAIM", desc: "The rightful owner recovers their item." },
];

export default function HowItWorks() {
  return (
    <div className="page container">
      <h1 className="section-title">How ReclaimR Works</h1>
      <div className="grid grid-4">
        {steps.map((s) => (
          <div key={s.num} className="card step-card">
            <div className="step-num">{s.num}</div>
            <h3>{s.title}</h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

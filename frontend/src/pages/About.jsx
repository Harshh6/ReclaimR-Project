import { founders, mentor } from "../data/mockData";

const problems = [
  { title: "Scattered Information", desc: "Lost and found information is often spread across different places." },
  { title: "Difficult to Track", desc: "Students may not know where to report or search for an item." },
  { title: "Delayed Communication", desc: "Finding the right person can take unnecessary time." },
  { title: "Items Get Overlooked", desc: "Without a centralized system, reported items can easily be missed." },
];

export default function About() {
  return (
    <div className="page container">
      <div className="center-page">
        <h1>About ReclaimR</h1>
        <p style={{ maxWidth: 600, margin: "12px auto", color: "var(--text-muted)" }}>
          ReclaimR is a student-driven project dedicated to improving lost-and-found management on university and college campuses.
        </p>
        <p style={{ fontWeight: 700, marginTop: 8 }}>Found by Students, For Students.</p>
      </div>

      <section style={{ margin: "56px 0" }}>
        <h2 className="section-title">Problems With Traditional Lost & Found</h2>
        <div className="grid grid-4">
          {problems.map((p) => (
            <div key={p.title} className="card">
              <h4>{p.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: "56px 0" }}>
        <h2 className="section-title">Founding Members</h2>
        <div className="grid grid-4">
          {founders.map((f) => (
            <div key={f.name} className="card founder-card">
              <div className="profile-circle-lg">[ PROFILE IMAGE ]</div>
              <h4>{f.name}</h4>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{f.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">Under the Guidance Of</h2>
        <div className="card mentor-card" style={{ maxWidth: 320, margin: "0 auto" }}>
          <div className="profile-circle-lg">[ PROFILE IMAGE ]</div>
          <h4>{mentor.name}</h4>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{mentor.role}</p>
        </div>
      </section>
    </div>
  );
}

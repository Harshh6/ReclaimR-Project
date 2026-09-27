import { useState } from "react";
import { founders, mentor } from "../data/mockData";

const problems = [
  { title: "Scattered Information", desc: "Lost and found information is often spread across different places." },
  { title: "Difficult to Track", desc: "Students may not know where to report or search for an item." },
  { title: "Delayed Communication", desc: "Finding the right person can take unnecessary time." },
  { title: "Items Get Overlooked", desc: "Without a centralized system, reported items can easily be missed." },
];

export default function About() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hoveredProblem, setHoveredProblem] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isTaglineHovered, setIsTaglineHovered] = useState(false);

  return (
    <div className="page container">
      <div className="center-page">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          About
          <img
            src="/logo.png"
            alt="ReclaimR"
            style={{ width: "min(190px, 45vw)", height: "auto", display: "block" }}
          />
        </h1>
        <p style={{ maxWidth: 600, margin: "12px auto", color: "var(--text-muted)" }}>
          ReclaimR is a student-driven project dedicated to improving lost-and-found management on university and college campuses.
        </p>
        <p
          onMouseEnter={() => setIsTaglineHovered(true)}
          onMouseLeave={() => setIsTaglineHovered(false)}
          style={{
            display: "inline-block",
            marginTop: 18,
            color: "#1a1a1a",
            fontSize: 21,
            fontStyle: "italic",
            fontWeight: 800,
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            textShadow: "0 1px 1px rgba(229, 72, 77, 0.12)",
            textTransform: "uppercase",
            transform: isTaglineHovered ? "scale(1.67)" : "scale(1)",
            transformOrigin: "center",
            transition: "transform 0.25s ease",
          }}
        >
          Found by <span style={{ color: "var(--red-accent)" }}>Students</span>, For <span style={{ color: "var(--red-accent)" }}>Students</span>.
        </p>
      </div>

      <section style={{ margin: "56px 0" }}>
        <h2
          className="section-title"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
        >
          Problems With Traditional Lost & Found
        </h2>
        <div className="grid grid-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="card"
              onMouseEnter={() => setHoveredProblem(p.title)}
              onMouseLeave={() => setHoveredProblem(null)}
              style={{
                transform: hoveredProblem === p.title ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredProblem === p.title ? "0 8px 20px rgba(0, 0, 0, 0.12)" : undefined,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <h4 style={{ color: "#d9787c" }}>{p.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: "56px 0" }}>
        <h2
          className="section-title"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
        >
          Founding Members
        </h2>
        <div className="grid grid-4">
          {founders.map((f) => (
            <div
              key={f.name}
              className="card founder-card"
              onMouseEnter={() => setHoveredMember(f.name)}
              onMouseLeave={() => setHoveredMember(null)}
              onClick={() => f.image && setSelectedPhoto({ src: f.image, name: f.name, role: f.role })}
              style={{
                transform: hoveredMember === f.name ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredMember === f.name ? "0 8px 20px rgba(0, 0, 0, 0.12)" : undefined,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: f.image ? "pointer" : "default",
              }}
            >
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  className="profile-circle-lg"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              ) : (
                <div className="profile-circle-lg">[ PROFILE IMAGE ]</div>
              )}
              <h4>{f.name}</h4>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{f.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2
          className="section-title"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
        >
          Under the Guidance Of
        </h2>
        <div
          className="card mentor-card"
          onMouseEnter={() => setHoveredMember("mentor")}
          onMouseLeave={() => setHoveredMember(null)}
          onClick={() => setSelectedPhoto({ src: "/sheetal-maam.png", name: mentor.name, role: mentor.role })}
          style={{
            maxWidth: 320,
            margin: "0 auto",
            transform: hoveredMember === "mentor" ? "translateY(-6px)" : "translateY(0)",
            boxShadow: hoveredMember === "mentor" ? "0 8px 20px rgba(0, 0, 0, 0.12)" : undefined,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
          }}
        >
          <img
            src="/sheetal-maam.png"
            alt={mentor.name}
            className="profile-circle-lg"
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
          <h4>{mentor.name}</h4>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{mentor.role}</p>
        </div>
      </section>

      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="selected-person-name"
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <button
            type="button"
            aria-label="Close photo preview"
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              border: "none",
              background: "transparent",
              color: "#ffffff",
              fontSize: "32px",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(100%, 520px)",
              padding: "28px",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.name}
              style={{
                width: "min(100%, 420px)",
                maxHeight: "65vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
            <h2 id="selected-person-name" style={{ marginTop: "20px" }}>
              {selectedPhoto.name}
            </h2>
            <p style={{ marginTop: "8px", color: "var(--text-muted)" }}>
              {selectedPhoto.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

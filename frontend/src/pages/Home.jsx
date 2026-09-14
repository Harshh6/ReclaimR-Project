import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { lostItems, foundItems } from "../data/mockData";

export default function Home() {
  const navigate = useNavigate();
  const recent = [...lostItems, ...foundItems].slice(0, 4);

  return (
    <div className="page container">
      <div className="center-page">

        {/* Hero */}
        <h1 className="hero-title">
          <span>Welcome to</span>
          <img
            src="/Logo.png"
            alt="ReclaimR"
            className="hero-logo"
          />
        </h1>

        <p className="hero-subtitle">
          Report, discover and reclaim lost items on campus.
        </p>

        <div className="hero-actions">
          <button
            className="hero-btn lost"
            onClick={() => navigate("/report-lost")}
          >
            Lost Something
          </button>

          <button
            className="hero-btn found"
            onClick={() => navigate("/report-found")}
          >
            Found Something
          </button>
        </div>
      </div>

      {/* Campus Section */}
      <section className="campus-section">
        <h2 className="section-title">
          CAMPUS WE'RE OPERATING
        </h2>

        <div
          className="image-placeholder"
          style={{
            height: 100,
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          [ UNIVERSITY LOGO ]
        </div>
      </section>

      {/* Recently Lost & Found */}
      <section className="recent-section">
        <h2 className="section-title">
          Recently Lost & Found
        </h2>

        <div className="grid grid-4">
          {recent.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
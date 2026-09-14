import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { lostItems, foundItems } from "../data/mockData";

export default function Home() {
  const navigate = useNavigate();

  const recent = [...lostItems, ...foundItems].slice(0, 4);

  return (
    <div className="page center-page">

      <div className="container">

        {/* HERO LOGO */}
        <div className="hero-title">
          <img
            src="/logo.png"
            alt="ReclaimR"
            className="hero-logo"
          />
        </div>


        {/* SUBTITLE */}
        <p className="hero-subtitle">
          Lost something on campus? Found something that isn't yours?
          <br />
          ReclaimR helps you reconnect with what matters.
        </p>


        {/* LOST / FOUND BUTTONS */}
        <div className="hero-actions">

          <button
            type="button"
            className="hero-btn lost"
            onClick={() => navigate("/report-lost")}
          >
            Lost Something
          </button>

          <button
            type="button"
            className="hero-btn found"
            onClick={() => navigate("/report-found")}
          >
            Found Something
          </button>

        </div>


        {/* CAMPUS */}
        <section className="campus-section">

          <h2 className="section-title">
            CAMPUS WE'RE OPERATING
          </h2>

          <div className="campus-logo-box">
            <img
              src="/bharati-logo.png"
              alt="Bharati Vidyapeeth Logo"
              className="campus-logo"
            />
          </div>

        </section>


        {/* RECENT ITEMS */}
        <section className="recent-section">

          <h2 className="section-title">
            Recent Items
          </h2>

          <div className="grid grid-4">
            {recent.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

        </section>

      </div>

    </div>
  );
}
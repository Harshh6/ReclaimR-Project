import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { lostItems, foundItems } from "../data/mockData";

export default function Home() {
  const navigate = useNavigate();
  const [showCookieWindow, setShowCookieWindow] = useState(
    () => (
      localStorage.getItem("reclaimr-cookie-login-pending") === "true" &&
      !localStorage.getItem("reclaimr-cookie-consent-v2")
    )
  );
  const [isRejectHovered, setIsRejectHovered] = useState(false);

  const handleCookieChoice = (choice) => {
    localStorage.setItem("reclaimr-cookie-consent-v2", choice);
    localStorage.removeItem("reclaimr-cookie-login-pending");
    setShowCookieWindow(false);
  };

  const recent = [...lostItems, ...foundItems].slice(0, 4);

  return (
    <>
      <div
        className="page center-page"
        style={{
          filter: showCookieWindow ? "blur(8px)" : "none",
          pointerEvents: showCookieWindow ? "none" : "auto",
          userSelect: showCookieWindow ? "none" : "auto",
        }}
      >

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

      {showCookieWindow && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-window-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              width: "min(100%, 440px)",
              padding: "32px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "#ffffff",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.16)",
              textAlign: "center",
            }}
          >
            <h2 id="cookie-window-title" style={{ marginBottom: "24px" }}>
              This website uses cookies to ensure you get the best experience
            </h2>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => handleCookieChoice("accepted")}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: "8px",
                  background: "var(--green-accent)",
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                Accept all cookies
              </button>

              <button
                type="button"
                onClick={() => handleCookieChoice("rejected")}
                onMouseEnter={() => setIsRejectHovered(true)}
                onMouseLeave={() => setIsRejectHovered(false)}
                style={{
                  padding: "12px 18px",
                  border: `1px solid ${isRejectHovered ? "var(--red-accent)" : "var(--border)"}`,
                  borderRadius: "8px",
                  background: isRejectHovered ? "var(--red-soft)" : "#ffffff",
                  color: "#1a1a1a",
                  fontWeight: 700,
                }}
              >
                Reject all cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
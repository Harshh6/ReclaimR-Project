import { useState } from "react";
import ItemCard from "../components/ItemCard";
import { lostItems, foundItems, CATEGORIES } from "../data/mockData";

export default function LostFound() {
  const [filter, setFilter] = useState("All");
  const all = [...lostItems, ...foundItems];
  const filtered = filter === "All" ? all : all.filter((i) => i.status === filter);

  return (
    <div className="page container">
      <h1
        className="section-title"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, letterSpacing: "0.02em" }}
      >
        Lost & Found Items
      </h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
        {["All", "Lost", "Found"].map((f) => (
          <button key={f} className={`btn ${filter === f ? "btn-primary" : "btn-outline"}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="grid grid-3">
        {filtered.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}

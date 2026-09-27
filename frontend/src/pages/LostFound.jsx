import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { getAllItems } from "../services/itemService";

export default function LostFound() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllItems();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load lost and found items.");
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const filtered =
    filter === "All"
      ? items
      : items.filter((item) => item.status === filter);

  return (
    <div className="page container">
      <h1 className="section-title">Lost & Found Items</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {["All", "Lost", "Found"].map((f) => (
          <button
            key={f}
            className={`btn ${
              filter === f ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="center-page">
          <p>Loading items...</p>
        </div>
      )}

      {error && (
        <div className="center-page">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="center-page">
          <p>No items found.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
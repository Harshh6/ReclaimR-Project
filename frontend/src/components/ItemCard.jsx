import { useNavigate } from "react-router-dom";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const isLost = item.status === "Lost";
  return (
    <div className="card item-card" onClick={() => navigate(`/lost-found/${item.id}`)}>
      <div className="image-placeholder item-img">[ ITEM IMAGE ]</div>
      <span className={`badge ${isLost ? "badge-lost" : "badge-found"}`}>{item.status}</span>
      <h3 style={{ margin: "10px 0 4px" }}>{item.itemName}</h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.category}</p>
      <p style={{ fontSize: 14, margin: "8px 0" }}>{item.description}</p>
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.location} · {item.date}</p>
    </div>
  );
}

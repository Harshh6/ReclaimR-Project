import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItemById } from "../services/itemService";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => { getItemById(id).then(setItem); }, [id]);

  if (!item) return <div className="page container center-page"><p>Item not found.</p></div>;

  const isLost = item.status === "Lost";

  return (
    <div className="page container">
      <Link to="/lost-found" style={{ color: "var(--text-muted)" }}>&larr; Back</Link>
      <div className="card" style={{ maxWidth: 640, margin: "24px auto" }}>
        <div className="image-placeholder" style={{ height: 220, marginBottom: 20 }}>[ ITEM IMAGE ]</div>
        <span className={`badge ${isLost ? "badge-lost" : "badge-found"}`}>{item.status}</span>
        <h2 style={{ margin: "12px 0" }}>{item.itemName}</h2>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Date/Time:</strong> {item.date} {item.time && `· ${item.time}`}</p>
        <p><strong>Identifying Details:</strong> {item.identifyingDetails}</p>
        {item.keptAt && <p><strong>Currently Kept At:</strong> {item.keptAt}</p>}
        <p><strong>Contact:</strong> {item.contact}</p>
      </div>
    </div>
  );
}

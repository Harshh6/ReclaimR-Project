import { adminStats } from "../../data/mockData";

export default function AdminAnalytics() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Analytics</h1>
      <div className="card">
        <p>Lost vs Found ratio: {adminStats.lostItems} : {adminStats.foundItems}</p>
        <p style={{ marginTop: 10 }}>Pending Claims: {adminStats.pendingClaims}</p>
        <p style={{ marginTop: 10, color: "var(--text-muted)" }}>(Simple placeholder — connect real charts later.)</p>
      </div>
    </div>
  );
}

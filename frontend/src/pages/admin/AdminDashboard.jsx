import StatCard from "../../components/StatCard";
import { adminStats } from "../../data/mockData";

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Dashboard</h1>
      <div className="grid grid-4">
        <StatCard label="Lost Items" value={adminStats.lostItems} />
        <StatCard label="Found Items" value={adminStats.foundItems} />
        <StatCard label="Pending Claims" value={adminStats.pendingClaims} />
        <StatCard label="Recovered Items" value={adminStats.recoveredItems} />
      </div>
      <div className="grid grid-4" style={{ marginTop: 20 }}>
        <StatCard label="Total Users" value={adminStats.totalUsers} />
      </div>
    </div>
  );
}

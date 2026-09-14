import { adminStats } from "../../data/mockData";
import StatCard from "../../components/StatCard";

export default function AdminReports() {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Reports</h1>
      <div className="grid grid-4">
        <StatCard label="Total Lost Reported" value={adminStats.lostItems} />
        <StatCard label="Total Found Reported" value={adminStats.foundItems} />
        <StatCard label="Total Recovered" value={adminStats.recoveredItems} />
        <StatCard label="Recovery Rate" value="60%" />
      </div>
    </div>
  );
}

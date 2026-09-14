import AdminTable from "./AdminTable";
import { activityLogs } from "../../data/mockData";

const cols = [{ key: "action", label: "Action" }, { key: "date", label: "Date" }];

export default function AdminActivityLogs() {
  return <AdminTable title="Activity Logs" columns={cols} rows={activityLogs} />;
}

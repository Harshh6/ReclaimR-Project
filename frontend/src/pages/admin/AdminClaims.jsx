import AdminTable from "./AdminTable";
import { adminClaims } from "../../data/mockData";

const cols = [
  { key: "itemName", label: "Item Name" }, { key: "claimedBy", label: "Claimed By" },
  { key: "date", label: "Date" }, { key: "status", label: "Status" },
];

export default function AdminClaims() {
  return <AdminTable title="Claims" columns={cols} rows={adminClaims} />;
}

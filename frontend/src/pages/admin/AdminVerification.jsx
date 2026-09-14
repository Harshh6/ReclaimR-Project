import AdminTable from "./AdminTable";
import { adminClaims } from "../../data/mockData";

const cols = [
  { key: "itemName", label: "Item Name" }, { key: "claimedBy", label: "Claimed By" }, { key: "status", label: "Status" },
];

export default function AdminVerification() {
  const pending = adminClaims.filter((c) => c.status === "Pending");
  return <AdminTable title="Verification" columns={cols} rows={pending} />;
}

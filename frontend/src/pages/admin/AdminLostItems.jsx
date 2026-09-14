import AdminTable from "./AdminTable";
import { lostItems } from "../../data/mockData";

const cols = [
  { key: "itemName", label: "Item Name" }, { key: "category", label: "Category" },
  { key: "location", label: "Location" }, { key: "date", label: "Date" }, { key: "status", label: "Status" },
];

export default function AdminLostItems() {
  return <AdminTable title="Lost Items" columns={cols} rows={lostItems} />;
}

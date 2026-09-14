import AdminTable from "./AdminTable";
import { foundItems } from "../../data/mockData";

const cols = [
  { key: "itemName", label: "Item Name" }, { key: "category", label: "Category" },
  { key: "location", label: "Location" }, { key: "date", label: "Date" }, { key: "status", label: "Status" },
];

export default function AdminFoundItems() {
  return <AdminTable title="Found Items" columns={cols} rows={foundItems} />;
}

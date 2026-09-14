import AdminTable from "./AdminTable";
import { recoveredItems } from "../../data/mockData";

const cols = [
  { key: "itemName", label: "Item Name" }, { key: "recoveredBy", label: "Recovered By" }, { key: "date", label: "Date" },
];

export default function AdminRecoveredItems() {
  return <AdminTable title="Recovered Items" columns={cols} rows={recoveredItems} />;
}

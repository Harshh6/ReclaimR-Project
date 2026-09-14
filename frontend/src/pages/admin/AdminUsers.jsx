import AdminTable from "./AdminTable";
import { adminUsers } from "../../data/mockData";

const cols = [
  { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "phone", label: "Phone" },
];

export default function AdminUsers() {
  return <AdminTable title="Users" columns={cols} rows={adminUsers} />;
}

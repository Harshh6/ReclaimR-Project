import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/lost-items", label: "Lost Items" },
  { to: "/admin/found-items", label: "Found Items" },
  { to: "/admin/claims", label: "Claims" },
  { to: "/admin/verification", label: "Verification" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/recovered-items", label: "Recovered Items" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/activity-logs", label: "Activity Logs" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">ReclaimR Admin</div>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({isActive}) => isActive ? "active" : ""}>
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}

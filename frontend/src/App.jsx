import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import LostFound from "./pages/LostFound";
import ItemDetails from "./pages/ItemDetails";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLostItems from "./pages/admin/AdminLostItems";
import AdminFoundItems from "./pages/admin/AdminFoundItems";
import AdminClaims from "./pages/admin/AdminClaims";
import AdminVerification from "./pages/admin/AdminVerification";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminRecoveredItems from "./pages/admin/AdminRecoveredItems";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminActivityLogs from "./pages/admin/AdminActivityLogs";
import AdminSettings from "./pages/admin/AdminSettings";

function withUserLayout(el) { return <UserLayout>{el}</UserLayout>; }
function withAdminLayout(el) { return <AdminLayout>{el}</AdminLayout>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={withUserLayout(<Home />)} />
      <Route path="/lost-found" element={withUserLayout(<LostFound />)} />
      <Route path="/lost-found/:id" element={withUserLayout(<ItemDetails />)} />
      <Route path="/how-it-works" element={withUserLayout(<HowItWorks />)} />
      <Route path="/about" element={withUserLayout(<About />)} />
      <Route path="/help" element={withUserLayout(<Help />)} />
      <Route path="/profile" element={withUserLayout(<Profile />)} />
      <Route path="/report-lost" element={<ReportLost />} />
      <Route path="/report-found" element={<ReportFound />} />

      <Route path="/admin" element={withAdminLayout(<AdminDashboard />)} />
      <Route path="/admin/lost-items" element={withAdminLayout(<AdminLostItems />)} />
      <Route path="/admin/found-items" element={withAdminLayout(<AdminFoundItems />)} />
      <Route path="/admin/claims" element={withAdminLayout(<AdminClaims />)} />
      <Route path="/admin/verification" element={withAdminLayout(<AdminVerification />)} />
      <Route path="/admin/users" element={withAdminLayout(<AdminUsers />)} />
      <Route path="/admin/reports" element={withAdminLayout(<AdminReports />)} />
      <Route path="/admin/recovered-items" element={withAdminLayout(<AdminRecoveredItems />)} />
      <Route path="/admin/analytics" element={withAdminLayout(<AdminAnalytics />)} />
      <Route path="/admin/activity-logs" element={withAdminLayout(<AdminActivityLogs />)} />
      <Route path="/admin/settings" element={withAdminLayout(<AdminSettings />)} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

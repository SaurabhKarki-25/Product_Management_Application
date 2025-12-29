import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Dynamic Page Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </div>
    </div>
  );
}

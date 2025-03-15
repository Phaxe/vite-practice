import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This renders the active page */}
      </div>
    </div>
  );
}

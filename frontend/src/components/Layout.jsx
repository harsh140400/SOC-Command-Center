import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cyberbg text-white relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="scanlines" />

      <Navbar onGoDashboard={() => navigate("/app/dashboard")} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

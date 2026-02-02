import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/app/dashboard", label: "📡 Dashboard" },
  { to: "/app/upload", label: "📤 Upload Logs" },
  { to: "/app/logs", label: "📜 Log Viewer" },
  { to: "/app/alerts", label: "🚨 Alerts" },
  { to: "/app/incidents", label: "🧩 Incidents" },
  { to: "/app/cases", label: "🗂 Cases" },
  { to: "/app/reports", label: "📄 Reports" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 pt-20 p-4 border-r border-cyberborder bg-cyberpanel/60">
      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

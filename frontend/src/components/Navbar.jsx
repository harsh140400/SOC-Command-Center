import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("soc_user");
  const role = localStorage.getItem("soc_role");

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-cyberpanel/80 backdrop-blur border-b border-cyberborder z-50 flex items-center justify-between px-6">
      <div className="flex flex-col">
        <div className="font-black tracking-[3px] text-sm text-neon3 drop-shadow">
          ● SOC COMMAND CENTER
        </div>
        <div className="text-xs text-muted">Cyberpunk Neon Interface</div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted">
          👤 {user} ({role})
        </span>

        <button
          onClick={() => navigate("/app/dashboard")}
          className="btn-neon"
        >
          Dashboard
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="btn-danger"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

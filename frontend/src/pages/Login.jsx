import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const data = await loginApi(username, password);

      localStorage.setItem("soc_token", data.access_token);
      localStorage.setItem("soc_user", data.username);
      localStorage.setItem("soc_role", data.role);

      navigate("/app/dashboard");
    } catch (error) {
      setErr("Invalid credentials or backend not running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cyberbg">
      <div className="scanlines" />


      <div className="w-full max-w-md p-8 panel-glow">
        <h1 className="mb-2 text-2xl font-black tracking-wider">
          🔐 SOC ACCESS TERMINAL
        </h1>
        <p className="mb-6 text-sm text-muted">
          Enter credentials to access the Command Center
        </p>

        {err && (
          <div className="p-3 mb-4 text-sm border border-danger/40 bg-danger/10 text-danger rounded-xl">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-xs text-muted">Username</label>
          <input
            className="input-neon"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-xs text-muted">Password</label>
          <input
            className="input-neon"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full mt-3 btn-neon" disabled={loading}>
            {loading ? "Connecting..." : "🚀 Enter SOC"}
          </button>
        </form>

        <div className="mt-4 text-xs text-muted">
          Default: <b>admin</b> / <b>admin123</b>
        </div>
      </div>
    </div>
  );
}

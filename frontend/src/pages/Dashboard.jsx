import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import { autoIngest } from "../api/logs";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const s = await getDashboardStats();
    setStats(s);
  };

  useEffect(() => {
    load();
  }, []);

  const runAutoIngest = async () => {
    setMsg("⚡ Auto ingest running...");
    try {
      const res = await autoIngest();
      setMsg(`✅ Auto ingest done: events=${res.events_added}, alerts=${res.alerts_added}`);
      await load();
    } catch {
      setMsg("❌ Auto ingest failed. Check backend logs folder.");
    }
  };

  if (!stats) return <Loader text="Loading dashboard stats..." />;

  const chartData = {
    labels: ["Open Alerts", "Critical Alerts", "Total Alerts"],
    datasets: [
      {
        label: "SOC Stats",
        data: [stats.open_alerts, stats.critical_alerts, stats.total_alerts]
      }
    ]
  };

  return (
    <div>
      <h2 className="page-title">📡 Live SOC Dashboard</h2>

      {msg && (
        <div className="panel-glow p-4 mb-4 text-sm text-muted">
          {msg}
        </div>
      )}

      <div className="grid-cards">
        <StatCard label="Total Events" value={stats.total_events} />
        <StatCard label="Total Alerts" value={stats.total_alerts} />
        <StatCard label="Open Alerts" value={stats.open_alerts} />
        <StatCard label="Critical Alerts" value={stats.critical_alerts} danger />
      </div>

      <div className="panel-glow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold tracking-wider">⚡ Live Scan Controls</h3>
          <button onClick={runAutoIngest} className="btn-neon">
            Auto Ingest Logs
          </button>
        </div>

        <div className="scanner-box">
          <div className="scanner-bar" />
          <p className="text-muted text-sm mt-3">
            Monitoring threat surface... scanning signal spikes...
          </p>
        </div>
      </div>

      <div className="panel-glow p-6 mt-6">
        <h3 className="font-bold tracking-wider mb-4">📊 Alerts Analytics</h3>
        <div className="max-w-sm">
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
}

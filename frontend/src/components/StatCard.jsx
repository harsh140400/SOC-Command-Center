import React from "react";

export default function StatCard({ label, value, danger }) {
  return (
    <div className={`card-glow ${danger ? "card-danger" : ""}`}>
      <div className="text-muted text-xs">{label}</div>
      <div className="text-3xl font-black mt-1">{value}</div>
      <div className="pulse-bar" />
    </div>
  );
}

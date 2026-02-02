import React from "react";

/**
 * NeonBadge
 * Usage:
 * <NeonBadge type="severity" value="CRITICAL" />
 * <NeonBadge type="status" value="OPEN" />
 */
export default function NeonBadge({ type = "severity", value = "" }) {
  const v = (value || "").toString().toUpperCase();

  if (type === "severity") {
    if (v === "LOW") return <span className="badge badge-low">LOW</span>;
    if (v === "MEDIUM") return <span className="badge badge-medium">MEDIUM</span>;
    if (v === "HIGH") return <span className="badge badge-high">HIGH</span>;
    if (v === "CRITICAL") return <span className="badge badge-critical">CRITICAL</span>;
    return <span className="badge">{v}</span>;
  }

  // status colors
  let cls = "badge";
  if (v === "OPEN") cls = "badge badge-critical";
  else if (v === "INVESTIGATING") cls = "badge badge-high";
  else if (v === "RESOLVED") cls = "badge badge-low";
  else if (v === "FALSE_POSITIVE") cls = "badge badge-medium";
  else if (v === "IN_PROGRESS") cls = "badge badge-high";
  else if (v === "CLOSED") cls = "badge badge-low";

  return <span className={cls}>{v}</span>;
}

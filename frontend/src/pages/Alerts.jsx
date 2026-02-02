import React, { useEffect, useState } from "react";
import { getAlerts } from "../api/alerts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import NeonTable from "../components/NeonTable";
import NeonBadge from "../components/NeonBadge";

export default function Alerts() {
  const [alerts, setAlerts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const a = await getAlerts(200);
      // map fields for table
      const rows = a.map((x) => ({
        id: x.id,
        rule_name: x.rule_name,
        severity: x.severity,
        status: x.status
      }));
      setAlerts({ raw: a, rows });
    };
    load();
  }, []);

  if (!alerts) return <Loader text="Loading alerts..." />;

  const columns = [
    { key: "id", label: "ID", className: "w-[80px]" },
    { key: "rule_name", label: "Rule" },
    { key: "severity", label: "Severity", className: "w-[140px]" },
    { key: "status", label: "Status", className: "w-[160px]" }
  ];

  // Render with badges
  const badgeRows = alerts.rows.map((r) => ({
    ...r,
    severity: <NeonBadge type="severity" value={r.severity} />,
    status: <NeonBadge type="status" value={r.status} />
  }));

  return (
    <div>
      <h2 className="page-title">🚨 Alerts</h2>

      <NeonTable
        columns={columns}
        rows={badgeRows}
        rowKey="id"
        onRowClick={(row) => navigate(`/app/alerts/${row.id}`)}
      />
    </div>
  );
}

import React from "react";

export default function Reports() {
  return (
    <div>
      <h2 className="page-title">📄 SOC Reports</h2>

      <div className="panel-glow p-6">
        <h3 className="font-bold tracking-wider mb-2">
          ✅ Report Engine (Next Upgrade)
        </h3>
        <p className="text-muted text-sm">
          Future upgrades will add:
          <br />✅ PDF Export
          <br />✅ Daily SOC Summary
          <br />✅ Incident Investigation Reports
        </p>

        <div className="scanner-box mt-4">
          <div className="scanner-bar" />
          <p className="text-muted text-sm mt-3">
            Initializing report modules...
          </p>
        </div>
      </div>
    </div>
  );
}

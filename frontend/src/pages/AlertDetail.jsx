import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlertById, updateAlert } from "../api/alerts";
import Loader from "../components/Loader";

export default function AlertDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [status, setStatus] = useState("OPEN");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const a = await getAlertById(id);
      setAlert(a);
      setStatus(a.status);
      setNotes(a.analyst_notes || "");
    };
    load();
  }, [id]);

  const save = async () => {
    setMsg("Saving...");
    try {
      const updated = await updateAlert(id, { status, analyst_notes: notes });
      setAlert(updated);
      setMsg("✅ Saved!");
    } catch {
      setMsg("❌ Save failed.");
    }
  };

  if (!alert) return <Loader text="Loading alert..." />;

  return (
    <div>
      <h2 className="page-title">🚨 Alert #{alert.id}</h2>

      <div className="panel-glow p-6">
        <p className="text-sm"><b>Rule:</b> {alert.rule_name}</p>
        <p className="text-sm"><b>Description:</b> {alert.description}</p>
        <p className="text-sm"><b>Severity:</b> {alert.severity}</p>
        <p className="text-sm"><b>Status:</b> {alert.status}</p>
        <p className="text-sm"><b>Source IP:</b> {alert.source_ip}</p>
        <p className="text-sm"><b>Target User:</b> {alert.target_user}</p>

        <div className="mt-4">
          <h3 className="font-bold tracking-wider mb-2">Evidence</h3>
          <pre className="evidence-box">{alert.evidence || "No evidence"}</pre>
        </div>

        <div className="mt-4">
          <label className="text-muted text-xs">Status</label>
          <select
            className="input-neon"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>OPEN</option>
            <option>INVESTIGATING</option>
            <option>RESOLVED</option>
            <option>FALSE_POSITIVE</option>
          </select>

          <label className="text-muted text-xs mt-3 block">Analyst Notes</label>
          <textarea
            className="input-neon"
            rows="5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="btn-neon mt-4 w-full" onClick={save}>
            ✅ Save Update
          </button>

          {msg && <div className="text-muted text-sm mt-3">{msg}</div>}
        </div>
      </div>
    </div>
  );
}

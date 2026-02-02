import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIncidentById, updateIncident } from "../api/incidents";
import Loader from "../components/Loader";

export default function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [status, setStatus] = useState("OPEN");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const i = await getIncidentById(id);
      setIncident(i);
      setStatus(i.status);
      setNotes(i.analyst_notes || "");
    };
    load();
  }, [id]);

  const save = async () => {
    setMsg("Saving...");
    try {
      const updated = await updateIncident(id, { status, analyst_notes: notes });
      setIncident(updated);
      setMsg("✅ Saved!");
    } catch {
      setMsg("❌ Save failed.");
    }
  };

  if (!incident) return <Loader text="Loading incident..." />;

  return (
    <div>
      <h2 className="page-title">🧩 Incident #{incident.id}</h2>

      <div className="panel-glow p-6">
        <p className="text-sm"><b>Title:</b> {incident.title}</p>
        <p className="text-sm"><b>Description:</b> {incident.description}</p>
        <p className="text-sm"><b>Severity:</b> {incident.severity}</p>
        <p className="text-sm"><b>Status:</b> {incident.status}</p>

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

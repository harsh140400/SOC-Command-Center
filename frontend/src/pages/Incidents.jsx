import React, { useEffect, useState } from "react";
import { createIncident, getIncidents } from "../api/incidents";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Incidents() {
  const [incidents, setIncidents] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("MEDIUM");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const load = async () => {
    const i = await getIncidents(200);
    setIncidents(i);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    setMsg("Creating...");
    try {
      await createIncident({ title, description, severity });
      setTitle("");
      setDescription("");
      setSeverity("MEDIUM");
      setMsg("✅ Incident created!");
      await load();
    } catch {
      setMsg("❌ Failed to create incident.");
    }
  };

  if (!incidents) return <Loader text="Loading incidents..." />;

  return (
    <div>
      <h2 className="page-title">🧩 Incidents</h2>

      <div className="panel-glow p-6 mb-6">
        <h3 className="font-bold tracking-wider mb-3">➕ Create Incident</h3>

        <input
          className="input-neon"
          placeholder="Incident Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input-neon mt-3"
          rows="4"
          placeholder="Incident Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="input-neon mt-3"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
          <option>CRITICAL</option>
        </select>

        <button className="btn-neon mt-4 w-full" onClick={submit}>
          🚀 Create Incident
        </button>

        {msg && <div className="text-muted text-sm mt-3">{msg}</div>}
      </div>

      <div className="panel-glow p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted border-b border-cyberborder">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Severity</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-b border-cyberborder/50">
                <td className="p-2">#{i.id}</td>
                <td className="p-2">{i.title}</td>
                <td className="p-2">
                  <span className={`badge badge-${i.severity.toLowerCase()}`}>
                    {i.severity}
                  </span>
                </td>
                <td className="p-2 text-muted">{i.status}</td>
                <td className="p-2">
                  <button
                    className="btn-neon"
                    onClick={() => navigate(`/app/incidents/${i.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

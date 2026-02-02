import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCaseById, updateCase } from "../api/cases";
import Loader from "../components/Loader";

export default function CaseDetail() {
  const { id } = useParams();
  const [socCase, setSocCase] = useState(null);
  const [status, setStatus] = useState("OPEN");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      const c = await getCaseById(id);
      setSocCase(c);
      setStatus(c.status);
    };
    load();
  }, [id]);

  const save = async () => {
    setMsg("Saving...");
    try {
      const updated = await updateCase(id, { status });
      setSocCase(updated);
      setMsg("✅ Saved!");
    } catch {
      setMsg("❌ Save failed.");
    }
  };

  if (!socCase) return <Loader text="Loading case..." />;

  return (
    <div>
      <h2 className="page-title">🗂 Case #{socCase.id}</h2>

      <div className="panel-glow p-6">
        <p className="text-sm"><b>Name:</b> {socCase.name}</p>
        <p className="text-sm"><b>Summary:</b> {socCase.summary}</p>
        <p className="text-sm"><b>Tags:</b> {socCase.tags}</p>
        <p className="text-sm"><b>Status:</b> {socCase.status}</p>

        <div className="mt-4">
          <label className="text-muted text-xs">Update Status</label>
          <select
            className="input-neon"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>OPEN</option>
            <option>IN_PROGRESS</option>
            <option>CLOSED</option>
          </select>

          <button className="btn-neon mt-4 w-full" onClick={save}>
            ✅ Save Update
          </button>

          {msg && <div className="text-muted text-sm mt-3">{msg}</div>}
        </div>
      </div>
    </div>
  );
}

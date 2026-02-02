import React, { useEffect, useState } from "react";
import { createCase, getCases } from "../api/cases";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Cases() {
  const [cases, setCases] = useState(null);
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const load = async () => {
    const c = await getCases(200);
    setCases(c);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    setMsg("Creating...");
    try {
      await createCase({ name, summary, tags });
      setName("");
      setSummary("");
      setTags("");
      setMsg("✅ Case created!");
      await load();
    } catch {
      setMsg("❌ Failed to create case.");
    }
  };

  if (!cases) return <Loader text="Loading cases..." />;

  return (
    <div>
      <h2 className="page-title">🗂 Cases</h2>

      <div className="panel-glow p-6 mb-6">
        <h3 className="font-bold tracking-wider mb-3">➕ Create Case</h3>

        <input
          className="input-neon"
          placeholder="Case Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="input-neon mt-3"
          rows="4"
          placeholder="Case Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          className="input-neon mt-3"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button className="btn-neon mt-4 w-full" onClick={submit}>
          🚀 Create Case
        </button>

        {msg && <div className="text-muted text-sm mt-3">{msg}</div>}
      </div>

      <div className="panel-glow p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted border-b border-cyberborder">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Tags</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b border-cyberborder/50">
                <td className="p-2">#{c.id}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2 text-muted">{c.status}</td>
                <td className="p-2 text-muted">{c.tags}</td>
                <td className="p-2">
                  <button
                    className="btn-neon"
                    onClick={() => navigate(`/app/cases/${c.id}`)}
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

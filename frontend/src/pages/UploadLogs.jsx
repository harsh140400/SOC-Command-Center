import React, { useState } from "react";
import { uploadLogs } from "../api/logs";

export default function UploadLogs() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const onUpload = async () => {
    if (!file) {
      setMsg("❌ Select a .txt log file first");
      return;
    }

    setMsg("Uploading...");
    try {
      const res = await uploadLogs(file);
      setMsg(`✅ Uploaded: events=${res.events_added}, alerts=${res.alerts_added}`);
    } catch {
      setMsg("❌ Upload failed. Make sure backend is running.");
    }
  };

  return (
    <div>
      <h2 className="page-title">📤 Upload Windows Logs</h2>

      <div className="panel-glow p-6">
        <p className="text-muted text-sm mb-4">
          Upload <b>.txt</b> logs in supported Windows format.
        </p>

        <input
          type="file"
          accept=".txt"
          className="input-neon"
          onChange={(e) => setFile(e.target.files?.[0])}
        />

        <button className="btn-neon mt-4 w-full" onClick={onUpload}>
          ⚡ Upload & Process
        </button>

        {msg && (
          <div className="mt-4 text-muted text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

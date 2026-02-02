import React, { useEffect, useState } from "react";
import { getEvents } from "../api/logs";
import Loader from "../components/Loader";

export default function LogViewer() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const load = async () => {
      const e = await getEvents(200);
      setEvents(e);
    };
    load();
  }, []);

  if (!events) return <Loader text="Loading events..." />;

  return (
    <div>
      <h2 className="page-title">📜 Log Viewer</h2>

      <div className="panel-glow p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted border-b border-cyberborder">
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">IP</th>
              <th className="p-2 text-left">Severity</th>
              <th className="p-2 text-left">Raw</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-cyberborder/50">
                <td className="p-2">{e.event_time}</td>
                <td className="p-2">{e.event_type}</td>
                <td className="p-2">{e.username}</td>
                <td className="p-2">{e.ip_address}</td>
                <td className="p-2">
                  <span className={`badge badge-${e.severity.toLowerCase()}`}>
                    {e.severity}
                  </span>
                </td>
                <td className="p-2 text-muted max-w-[350px] truncate">
                  {e.raw_line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

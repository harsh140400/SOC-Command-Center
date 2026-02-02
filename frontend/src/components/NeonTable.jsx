import React from "react";

/**
 * NeonTable (Cyberpunk UI)
 * Generic reusable table with neon borders + clean spacing
 *
 * Props:
 * - columns: [{ key: "id", label: "ID", className?: "" }]
 * - rows: array of objects
 * - onRowClick?: (row)=>void
 * - rowKey?: string (default: "id")
 */
export default function NeonTable({
  columns = [],
  rows = [],
  onRowClick = null,
  rowKey = "id"
}) {
  return (
    <div className="panel-glow p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b border-cyberborder">
            {columns.map((c) => (
              <th key={c.key} className={`p-2 text-left ${c.className || ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-muted text-center"
              >
                No data found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row[rowKey]}
                className={`border-b border-cyberborder/50 ${
                  onRowClick ? "cursor-pointer hover:bg-white/5" : ""
                }`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((c) => (
                  <td
                    key={`${row[rowKey]}-${c.key}`}
                    className={`p-2 ${c.className || ""}`}
                  >
                    {row[c.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

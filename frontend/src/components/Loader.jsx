import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="panel-glow p-6 text-center">
      <div className="scanner-bar mb-3" />
      <p className="text-muted text-sm">{text}</p>
    </div>
  );
}

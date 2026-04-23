"use client";

import { useState } from "react";

export default function MapSidebar({
  mode,
  setMode,
}: {
  mode: "normal" | "traffic";
  setMode: (m: "normal" | "traffic") => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        zIndex: 9999,
        background: "#111",
        color: "white",
        borderRadius: 12,

        // 🔥 FIX QUAN TRỌNG
        height: 120, // cố định height → không nhảy layout
        width: open ? 180 : 56,

        transition: "width 0.25s ease",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
        padding: 10,
      }}
    >
      {/* BUTTON 1 */}
      <button onClick={() => setMode("normal")}>
        🗺 <span style={{ opacity: open ? 1 : 0, transition: "0.2s" }}>
          Normal Map
        </span>
      </button>

      {/* BUTTON 2 */}
      <button onClick={() => setMode("traffic")}>
        🚦 <span style={{ opacity: open ? 1 : 0, transition: "0.2s" }}>
          Traffic Map
        </span>
      </button>

      {/* STATUS */}
      <div
        style={{
          fontSize: 12,
          opacity: open ? 0.6 : 0,
          transition: "0.2s",
        }}
      >
        Mode: {mode}
      </div>
    </div>
  );
}
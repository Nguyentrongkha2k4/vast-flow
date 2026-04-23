"use client";

import { useMapMode } from "@/hooks/useMapMode";

export default function MapToolbar() {
  const { mode, setMode } = useMapMode();

  return (
    <div style={{ position: "absolute", zIndex: 999, top: 10, left: 10 }}>
      <button onClick={() => setMode("normal")}>
        🗺 Normal Map
      </button>

      <button onClick={() => setMode("traffic")}>
        🚦 Traffic Map
      </button>

      <div>Current: {mode}</div>
    </div>
  );
}
"use client";

import { useState } from "react";

type MapMode = "normal" | "traffic";

export function useMapState() {
  const [mode, setMode] = useState<MapMode>("normal");

  // 🔥 overlay heatmap
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  // 🔥 forecast slider (0 → 60 min, step 5)
  const [forecastTime, setForecastTime] = useState(0);

  // 🔥 selected camera
  const [selectedCamera, setSelectedCamera] = useState<any>(null);

  return {
    // base map
    mode,
    setMode,

    // overlay
    heatmapEnabled,
    setHeatmapEnabled,

    // forecast
    forecastTime,
    setForecastTime,

    // camera
    selectedCamera,
    setSelectedCamera,
  };
}
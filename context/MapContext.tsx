"use client";

import { createContext, useContext, useState } from "react";

type MapMode = "normal" | "traffic";

type MapContextType = {
  mode: MapMode;
  setMode: (m: MapMode) => void;

  selectedCamera: any;
  setSelectedCamera: (c: any) => void;

  heatmapEnabled: boolean;
  setHeatmapEnabled: (v: boolean) => void;

  // 🔥 ADD THIS
  forecastTime: number;
  setForecastTime: (v: number) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: any) {
  const [mode, setMode] = useState<MapMode>("normal");
  const [selectedCamera, setSelectedCamera] = useState<any>(null);

  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  // 🔥 ADD THIS
  const [forecastTime, setForecastTime] = useState(0);

  return (
    <MapContext.Provider
      value={{
        mode,
        setMode,

        selectedCamera,
        setSelectedCamera,

        heatmapEnabled,
        setHeatmapEnabled,

        // 🔥 EXPORT
        forecastTime,
        setForecastTime,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMapContext must be used inside MapProvider");
  return ctx;
}
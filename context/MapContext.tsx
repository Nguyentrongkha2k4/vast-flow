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

  forecastTime: number;
  setForecastTime: (v: number) => void;

  // CAMERA LAYER
  showCameras: boolean;
  setShowCameras: (v: boolean) => void;

  // EVENT LAYER
  showEvents: boolean;
  setShowEvents: (v: boolean) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: any) {
  const [mode, setMode] = useState<MapMode>("normal");

  const [selectedCamera, setSelectedCamera] = useState<any>(null);

  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  const [forecastTime, setForecastTime] = useState(0);

  // CAMERA
  const [showCameras, setShowCameras] = useState(true);

  // EVENT
  const [showEvents, setShowEvents] = useState(true);

  return (
    <MapContext.Provider
      value={{
        mode,
        setMode,

        selectedCamera,
        setSelectedCamera,

        heatmapEnabled,
        setHeatmapEnabled,

        forecastTime,
        setForecastTime,

        // CAMERA
        showCameras,
        setShowCameras,

        // EVENT
        showEvents,
        setShowEvents,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error(
      "useMapContext must be used inside MapProvider"
    );
  }

  return ctx;
}
"use client";

import { createContext, useContext, useState } from "react";

type MapMode = "normal" | "traffic";

type MapContextType = {
  mode: MapMode;
  setMode: (m: MapMode) => void;

  selectedCamera: any;
  setSelectedCamera: (c: any) => void;
};

const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: any) {
  const [mode, setMode] = useState<MapMode>("normal");

  // ✅ phải nằm trong Provider
  const [selectedCamera, setSelectedCamera] = useState<any>(null);

  return (
    <MapContext.Provider
      value={{
        mode,
        setMode,
        selectedCamera,
        setSelectedCamera,
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
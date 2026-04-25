"use client";

import { MapProvider } from "@/context/MapContext";
import MapContent from "./MapContent";

export default function MapClient() {
  return (
    <MapProvider>
      <MapContent />
    </MapProvider>
  );
}
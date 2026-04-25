"use client";

import MapSidebar from "../controls/MapSidebar";
import dynamic from "next/dynamic";
import { useMapContext } from "@/context/MapContext";
import CameraInsightPanel from "../overlays/CameraInsightPanel";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function MapContent() {
  const { selectedCamera, setSelectedCamera } = useMapContext();

  return (
    <>
      <MapSidebar />
      <MapView />

      {/* 🎯 PANEL */}
      {selectedCamera && (
        <CameraInsightPanel
          data={selectedCamera}
          onClose={() => setSelectedCamera(null)}
        />
      )}
    </>
  );
}
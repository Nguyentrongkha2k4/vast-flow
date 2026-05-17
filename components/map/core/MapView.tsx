"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useMapContext } from "@/context/MapContext";
import CameraLayer from "../layers/CameraLayer";
import HeatmapLayer from "../layers/HeatmapLayer";
import EventLayer from "../layers/EventLayer";

export default function MapView() {
  const { mode, heatmapEnabled, forecastTime } = useMapContext();

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        minZoom={12}
        maxZoom={25}
        maxBounds={[
          [10.3, 106.3],
          [11.1, 107.0],
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
      >
        {/* ================= BASE MAP ================= */}
        {mode === "normal" ? (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        ) : (
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        )}

        {/* ================= CAMERA LAYER ================= */}
        <CameraLayer />

        {/* ================= EVENT LAYER ================= */}
        {/* <EventLayer /> */}

        {/* ================= HEATMAP LAYER ================= */}
        {heatmapEnabled && (
          <HeatmapLayer forecastTime={forecastTime} />
        )}
      </MapContainer>
    </div>
  );
}
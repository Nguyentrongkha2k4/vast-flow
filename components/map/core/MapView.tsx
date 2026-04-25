"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useMapContext } from "@/context/MapContext";
import CameraLayer from "../layers/CameraLayer";

export default function MapView() {
  const { mode } = useMapContext(); // 🔥 dùng context

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
        {mode === "normal" ? (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        )}

        <CameraLayer />
      </MapContainer>
    </div>
  );
}
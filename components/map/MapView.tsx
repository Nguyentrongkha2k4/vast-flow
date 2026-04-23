"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useMapMode } from "@/hooks/useMapMode";
import CameraLayer from "./layers/CameraLayer";

export default function MapView({
  mode,
}: {
  mode: "normal" | "traffic";
}) {
//   const { mode } = useMapMode();

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        minZoom={12}   // 🚫 không zoom OUT xa hơn mức này
        maxZoom={25}   // 🚫 không zoom IN quá gần
        maxBounds={[
            [10.3, 106.3], // SW (Nam Tây)
            [11.1, 107.0], // NE (Bắc Đông)
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
      >
        {/* 🗺️ BASE MAP */}
        {mode === "normal" ? (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="OSM"
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="Traffic"
          />
        )}

        {/* CAMERA ALWAYS ON */}
        <CameraLayer />
      </MapContainer>
    </div>
  );
}
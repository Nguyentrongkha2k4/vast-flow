"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map() {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[10.762622, 106.660172]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        <Marker position={[10.762622, 106.660172]}>
          <Popup>HCM City</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
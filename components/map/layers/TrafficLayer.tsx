"use client";

import { Circle } from "react-leaflet";

export default function TrafficLayer() {
  return (
    <>
      {/* ví dụ demo congestion */}
      <Circle
        center={[10.762622, 106.660172]}
        radius={500}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.3,
        }}
      />
    </>
  );
}
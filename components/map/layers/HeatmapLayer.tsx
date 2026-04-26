"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { useCameras } from "@/hooks/useCameraData";

type Props = {
  forecastTime: number;
};

export default function HeatmapLayer({ forecastTime }: Props) {
  const map = useMap();
  const { cameras = [] } = useCameras();

  useEffect(() => {
    if (!map || cameras.length === 0) return;

    const timeIndex = Math.min(
      11,
      Math.max(0, Math.floor(forecastTime / 5))
    );

    const heatData = cameras
      .filter((cam: any) => cam.lat && cam.lng)
      .map((cam: any) => {
        // 🔥 FIX HERE (IMPORTANT)
        const congestion =
          cam.traffic?.forecast?.[timeIndex]?.congestion ??
          cam.traffic?.congestion ??
          0;

        return [
          cam.lat,
          cam.lng,
          congestion / 100,
        ] as [number, number, number];
      })
      .filter((d) => !isNaN(d[2])); // 🔥 tránh NaN crash

    console.log("🔥 heatData:", heatData);

    if (heatData.length === 0) return;

    const layer = (L as any).heatLayer(heatData, {
      radius: 30,
      blur: 20,
      maxZoom: 17,
      gradient: {
        0.2: "#2ecc71",
        0.5: "#f1c40f",
        0.8: "#e67e22",
        1.0: "#e74c3c",
      },
    });

    layer.addTo(map);

    return () => {
      layer.remove();
    };
  }, [map, cameras, forecastTime]);

  return null;
}
"use client";

import { useEffect, useState } from "react";
import { getTrafficByCameraId } from "@/services/api/traffic.service";
import { getTrafficForecastByCameraId } from "@/services/api/traffic.service";
import type { TrafficData, TrafficForecastPoint } from "@/types/traffic";

type Mode = "current" | "forecast";

export function useCameraTraffic(cameraId: string) {
  const [mode, setMode] = useState<Mode>("current");
  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState<TrafficData | null>(null);
  const [forecast, setForecast] = useState<TrafficForecastPoint[]>([]);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState(0);

  useEffect(() => {
    let alive = true;

    const fetch = async () => {
      setLoading(true);

      const [cur, fore] = await Promise.all([
        getTrafficByCameraId(cameraId),
        getTrafficForecastByCameraId(cameraId),
      ]);

      if (!alive) return;

      setCurrent(cur);
      setForecast(fore?.points || []);
      setLoading(false);
    };

    fetch();

    return () => {
      alive = false;
    };
  }, [cameraId]);

  return {
    mode,
    setMode,

    loading,

    current,
    forecast,

    selectedForecastIndex,
    setSelectedForecastIndex,
  };
}
"use client";

import { useEffect, useState } from "react";
import type { TrafficForecastPoint } from "@/types/traffic";
import { getTrafficForecastByCameraId } from "@/services/api/traffic.service";

export function useTrafficForecast(cameraId: string) {
  const [forecast, setForecast] = useState<TrafficForecastPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isActive = true;

    const fetchForecast = async () => {
      setLoading(true);

      try {
        const res = await getTrafficForecastByCameraId(cameraId);

        if (isActive) {
          setForecast(res?.points || []);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchForecast();

    return () => {
      isActive = false;
    };
  }, [cameraId]);

  return { forecast, loading };
}
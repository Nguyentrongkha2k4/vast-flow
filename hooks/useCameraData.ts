"use client";

import { useEffect, useState } from "react";
import { Camera } from "@/types/camera";
import { fetchCameras, getCameras } from "@/services/api/camera.service";
import { getFullTrafficByCameraId, getTrafficByCameraId } from "@/services/api/traffic.service";

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const baseCameras = await fetchCameras();

      // 🔥 enrich camera with traffic
      const enriched = await Promise.all(
        baseCameras.map(async (cam) => {
          const traffic = await getFullTrafficByCameraId(cam.id);
          // const test = await getCameras();
          // console.log("test", test);
          return {
            ...cam,
            traffic,
          };
        })
      );

      setCameras(enriched);
      setLoading(false);
    };

    load();
  }, []);

  return { cameras, loading };
}
"use client";

import { useEffect, useState } from "react";
import { Camera } from "@/types/camera";
import { fetchCameras } from "@/services/api/camera.service";

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCameras().then((data) => {
      setCameras(data);
      setLoading(false);
    });
  }, []);

  return { cameras, loading };
}
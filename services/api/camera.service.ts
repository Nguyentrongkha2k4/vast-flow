import { parseCameras } from "@/lib/data/parseCameras";
import { Camera } from "@/types/camera";
import { fetchAPI } from "@/services/httpHandler";

export async function fetchCameras(): Promise<Camera[]> {
  const res = await fetch("/data/cameras.csv");
  const csv = await res.text();

  return parseCameras(csv);
}

export async function getCameras() {
  return fetchAPI<{
    camera_id: string;
    lat: number;
    long: number;
  }[]>("/cameras");
}
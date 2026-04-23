import { parseCameras } from "@/lib/data/parseCameras";
import { Camera } from "@/types/camera";

export async function fetchCameras(): Promise<Camera[]> {
  const res = await fetch("/data/cameras.csv");
  const csv = await res.text();

  return parseCameras(csv);
}
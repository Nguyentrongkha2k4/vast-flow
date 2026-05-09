import { TrafficForecast } from "@/types/traffic";
import { fetchAPI } from "../httpHandler";
import { mapTrafficForecast } from "../util/mappingForcast";

export async function getLatestPredictions(): Promise<TrafficForecast[]> {
  const data = await fetchAPI<{
    camera_id: string;
    last_input_slot: string;
    counts: number[];
    speeds: number[];
  }[]>("/predictions/latest");

  return data.map(mapTrafficForecast);
}

export async function getLatestPredictionByCamera(cameraId: string) {
  return fetchAPI<{
    camera_id: string;
    last_input_slot: string;
    counts: number[];
    speeds: number[];
  }>(`/predictions/${cameraId}/latest`);
}
export async function getPredictionsByCamera(cameraId: string) {
  return fetchAPI<{
    camera_id: string;
    last_input_slot: string;
    counts: number[];
    speeds: number[];
  }[]>(`/predictions/${cameraId}`);
}

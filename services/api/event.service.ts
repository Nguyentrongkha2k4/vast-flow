import { TrafficApiResponse } from "@/types/response/event";
import { fetchAPI } from "../httpHandler";

export async function getLatestEvents() {
  return fetchAPI<TrafficApiResponse[]>("/events/latest");
}
export async function getLatestEventByCamera(cameraId: string) {
  return fetchAPI<TrafficApiResponse>(`/events/${cameraId}/latest`);
}
import { fetchAPI } from "../httpHandler";

export async function getLatestEvents() {
  return fetchAPI<Event[]>("/events/latest");
}
export async function getLatestEventByCamera(cameraId: string) {
  return fetchAPI<Event>(`/events/${cameraId}/latest`);
}
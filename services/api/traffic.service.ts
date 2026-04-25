
import type { TrafficData } from "@/types/traffic";

const random = () => Math.floor(Math.random() * 100);

export async function getTrafficByCameraId(
  cameraId: string
): Promise<TrafficData> {
  // giả lập delay API
  await new Promise((res) => setTimeout(res, 300));

  return {
    avgSpeed: 20 + (random() % 40),
    vehicleCount: 50 + random(),
    congestion: random(),
    trend: Array.from({ length: 8 }, () => 10 + Math.random() * 40),
    weather: ["sunny", "rain", "cloudy"][
      Math.floor(Math.random() * 3)
    ] as TrafficData["weather"],
  };
}
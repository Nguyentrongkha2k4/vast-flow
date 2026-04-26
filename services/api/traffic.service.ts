
import type { TrafficData, TrafficForecast, TrafficForecastPoint} from "@/types/traffic";

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
    forecast: []
  };
}

export const getTrafficForecastByCameraId = async (
  cameraId: string
): Promise<TrafficForecast> => {
  await new Promise((res) => setTimeout(res, 300));

  const random = () => Math.floor(Math.random() * 100);

  // 🔥 generate 12 points = 60 phút (5 phút / step)
  const generateForecastPoints = (): TrafficForecastPoint[] => {
    return Array.from({ length: 12 }, (_, i) => {
      const base = random();

      return {
        timeOffset: (i + 1) * 5,
        avgSpeed: 20 + Math.floor(Math.random() * 40),
        vehicleCount: 50 + random(),

        // mô phỏng tăng nhẹ theo thời gian
        congestion: Math.min(100, base + i * 4),
      };
    });
  };
  
  return {
    cameraId,
    points: generateForecastPoints(),
  };
};


export async function getFullTrafficByCameraId(cameraId: string) {
  const [current, forecast] = await Promise.all([
    getTrafficByCameraId(cameraId),
    getTrafficForecastByCameraId(cameraId),
  ]);

  return {
    ...current,
    forecast: forecast.points,
  };
}
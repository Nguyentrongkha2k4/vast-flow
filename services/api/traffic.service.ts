
import type { TrafficData, TrafficForecast, TrafficForecastPoint} from "@/types/traffic";
import { getLatestEventByCamera } from "./event.service";
import calculateCongestion from "../util/calculateCongrestion";
import { getPredictionsByCamera } from "./prediction.service";

const random = () => Math.floor(Math.random() * 100);
const round = (num: number) => Number(Number(num).toFixed(1));
export async function getTrafficByCameraId(
  cameraId: string
): Promise<TrafficData> {
  // giả lập delay API
  // await new Promise((res) => setTimeout(res, 300));
  try{
    
    const data = await getLatestEventByCamera(cameraId);
    console.log("Event data for camera", cameraId, data);
    return {
      avgSpeed: round(data.speed_avg_kmh),
      vehicleCount: data.vehicles_count,
      congestion: calculateCongestion(data.vehicles_count, data.speed_avg_kmh),
      // congestion: 0,
      trend: data.speed_series.map((item) => item.speed),
      weather: ["sunny", "rain", "cloudy"][
        Math.floor(Math.random() * 3)
      ] as TrafficData["weather"],
      forecast: []
    };
  }catch(e){
    console.error("Error fetching traffic data for camera", cameraId, e);
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
}

export const getTrafficForecastByCameraId = async (
  cameraId: string
): Promise<TrafficForecast> => {

  try{
    const data = await getPredictionsByCamera(cameraId);
    console.log("Prediction data for camera", cameraId, data);
    return data;
  }catch(e){
    console.error("Error fetching traffic forecast for camera", cameraId, e);
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
  }
};


export async function getFullTrafficByCameraId(cameraId: string) {
  const [current, forecast] = await Promise.all([
    getTrafficByCameraId(cameraId),
    getTrafficForecastByCameraId(cameraId),
  ]);
  console.log("Current traffic:", current);
  console.log("Forecast traffic:", forecast);
  return {
    ...current,
    forecast: forecast.points,
  };
}
import { TrafficForecast, TrafficForecastPoint } from "@/types/traffic";
import calculateCongestion from "./calculateCongrestion";

export function mapTrafficForecast(apiData: any): TrafficForecast {
  const { camera_id, counts, speeds } = apiData;

  const points: TrafficForecastPoint[] = [];

  const step = 5; // mỗi slot = 5 phút

  for (let i = 0; i < Math.max(counts.length, speeds.length); i++) {
    const vehicleCount = counts[i] ?? 0;
    const avgSpeed = speeds[i] ?? 0;

    // Congestion đơn giản (bạn có thể thay logic khác)
    const congestion = calculateCongestion(avgSpeed, vehicleCount);

    points.push({
      timeOffset: (i + 1) * step,
      avgSpeed,
      vehicleCount,
      congestion
    });
  }

  return {
    cameraId: camera_id,
    points
  };
}
export interface TrafficForecastPoint {
  timeOffset: number; // 5 → 60 phút
  avgSpeed: number;
  vehicleCount: number;
  congestion: number;
}

export interface TrafficForecast {
  cameraId: string;
  points: TrafficForecastPoint[];
}
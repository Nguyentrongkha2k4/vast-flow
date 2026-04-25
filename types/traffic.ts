export interface TrafficData {
  avgSpeed: number;
  vehicleCount: number;
  congestion: number;
  trend: number[];
  weather: "sunny" | "rain" | "cloudy";
};
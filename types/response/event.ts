export interface SpeedSeriesItem {
  time: string;
  speed: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;

  temp: number;
  feels_like: number;

  temp_min: number;
  temp_max: number;

  pressure: number;
  humidity: number;

  sea_level: number;
  grnd_level: number;

  wind_speed: number;
  wind_deg: number;

  clouds_all: number;
}

export interface TrafficApiResponse {
  camera_id: string;

  slot: string;
  generated_at: string;

  duration_sec: number;

  vehicles_count: number;

  speed_count: number;
  speed_avg_kmh: number;
  speed_min_kmh: number;
  speed_max_kmh: number;

  speed_series: SpeedSeriesItem[];

  weather: WeatherData;
}
export type CameraStatus = "UP" | "DOWN";

export interface Camera {
  id: string;
  snapshotUrl: string;
  videoUrl?: string | null;
  type: string;
  district?: string;

  lat: number;
  lng: number;

  status: CameraStatus;
  ptz: boolean;
}
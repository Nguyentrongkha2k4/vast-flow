import { Camera } from "@/types/camera";

export function parseCameras(csv: string): Camera[] {
  const lines = csv.trim().split("\n");
  const [, ...rows] = lines;

  return rows.map((row) => {
    const [
      id,
      snapshotUrl,
      type,
      district,
      lng,
      lat,
      status,
      ptz,
      videoUrl,
    ] = row.split(",");

    return {
      id,
      snapshotUrl,
      type,
      district: district || undefined,
      lng: Number(lng),
      lat: Number(lat),
      status: status as "UP" | "DOWN",
      ptz: ptz === "True",
      videoUrl: videoUrl || null,
    };
  });
}
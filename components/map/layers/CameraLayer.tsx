"use client";

import { Marker } from "react-leaflet";
import { useCameras } from "@/hooks/useCameraData";
import { cameraUpIcon, cameraDownIcon } from "@/lib/map/cameraIcon";
import { useMapContext } from "@/context/MapContext";

export default function CameraLayer() {
  const { cameras } = useCameras();
  const { setSelectedCamera, showCameras } = useMapContext();

  if (!showCameras) return null;
  
  return (
    <>
      {cameras.map((cam) => (
        <Marker
          key={cam.id}
          position={[cam.lat, cam.lng]}
          icon={cam.status === "UP" ? cameraUpIcon : cameraDownIcon}
          eventHandlers={{
            click: () => setSelectedCamera(cam),
          }}
        />
      ))}
    </>
  );
}
"use client";

import { Marker, Popup } from "react-leaflet";
import { useCameras } from "@/hooks/useCameraData";
import { cameraUpIcon, cameraDownIcon } from "@/lib/map/cameraIcon";

export default function CameraLayer() {
  const { cameras } = useCameras();

  return (
    <>
      {cameras.map((cam) => (
        <Marker key={cam.id} position={[cam.lat, cam.lng]} icon={cam.status === "UP" ? cameraUpIcon : cameraDownIcon}>
          <Popup>
            <div style={{ width: 200 }}>
              <img
                src={cam.snapshotUrl}
                alt="camera"
                style={{ width: "100%" }}
              />

              <div>
                <b>{cam.id}</b>
              </div>

              <div>Status: {cam.status}</div>
              <div>PTZ: {cam.ptz ? "YES" : "NO"}</div>

              {cam.videoUrl && (
                <a href={cam.videoUrl} target="_blank">
                  Live stream
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import { getTrafficByCameraId } from "@/services/api/traffic.service";
import type { Camera } from "@/types/camera";

type Props = {
  data: Camera;
  onClose: () => void;
};

export default function CameraInsightPanel({ data, onClose }: Props) {
  const [traffic, setTraffic] = useState({
    avgSpeed: 0,
    vehicleCount: 0,
    congestion: 0,
    trend: [] as number[],
    weather: "sunny",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTraffic = async () => {
      setLoading(true);

      const res = await getTrafficByCameraId(data.id);

      if (isMounted) {
        setTraffic(res);
        setLoading(false);
      }
    };

    fetchTraffic();

    return () => {
      isMounted = false; // tránh overwrite khi unmount
    };
  }, [data.id]);

  const getColor = () => {
    if (traffic.congestion > 70) return "#ff4d4f";
    if (traffic.congestion > 40) return "#faad14";
    return "#52c41a";
  };

  const getStatusText = () => {
    if (traffic.congestion > 70) return "HEAVY";
    if (traffic.congestion > 40) return "MODERATE";
    return "SMOOTH";
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: 320,
        background: "#111",
        color: "white",
        borderRadius: 16,
        padding: 16,
        zIndex: 9999,
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading && (
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
            Loading traffic data...
          </div>
        )}
        <b>📍 Camera</b>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      {/* SNAPSHOT */}
      <img
        src={data.snapshotUrl}
        alt="camera"
        style={{
          width: "100%",
          borderRadius: 10,
          marginTop: 10,
        }}
      />

      {/* INFO */}
      <div style={{ marginTop: 10 }}>
        <div>
          <b>ID:</b> {data.id}
        </div>
        <div>Status: {data.status}</div>
        <div>PTZ: {data.ptz ? "YES" : "NO"}</div>
      </div>

      {/* TRAFFIC */}
      <div style={{ marginTop: 12 }}>
        🚦 Traffic:
        <span style={{ color: getColor(), marginLeft: 6 }}>
          {getStatusText()}
        </span>
      </div>

      <div style={{ marginTop: 6 }}>
        ⚡ Speed: {traffic.avgSpeed} km/h
      </div>
      <div>🚗 Vehicles: {traffic.vehicleCount}</div>
      <div>🌦 Weather: {traffic.weather}</div>

      {/* MINI CHART */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Last 5 min</div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 50,
            marginTop: 6,
          }}
        >
          {traffic.trend.map((v, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: v,
                background: "#1890ff",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* PROGRESS */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12 }}>Congestion</div>
        <div
          style={{
            height: 6,
            background: "#333",
            borderRadius: 4,
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${traffic.congestion}%`,
              height: "100%",
              background: getColor(),
              borderRadius: 4,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* VIDEO */}
      {data.videoUrl && (
        <a
          href={data.videoUrl}
          target="_blank"
          style={{
            display: "block",
            marginTop: 12,
            color: "#40a9ff",
            textDecoration: "none",
          }}
        >
          ▶ Live stream
        </a>
      )}
    </div>
  );
}
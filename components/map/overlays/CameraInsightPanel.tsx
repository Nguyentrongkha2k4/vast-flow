"use client";

import { useEffect, useState } from "react";
import { getFullTrafficByCameraId } from "@/services/api/traffic.service";
import type { Camera } from "@/types/camera";

type Props = {
  data: Camera;
  onClose: () => void;
};

type ForecastPoint = {
  timeOffset: number;
  avgSpeed: number;
  vehicleCount: number;
  congestion: number;
};

export default function CameraInsightPanel({ data, onClose }: Props) {
  const [traffic, setTraffic] = useState({
    avgSpeed: 0,
    vehicleCount: 0,
    congestion: 0,
    trend: [] as number[],
    weather: "sunny",
    forecast: [] as ForecastPoint[],
  });

  const [mode, setMode] = useState<"current" | "forecast">("current");

  // 👉 TIME SLOT (source of truth)
  const [selectedTime, setSelectedTime] = useState(5);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTraffic = async () => {
      setLoading(true);

      const res = await getFullTrafficByCameraId(data.id);

      if (isMounted) {
        setTraffic({
          ...res,
          forecast: res.forecast ?? [],
        });
        setLoading(false);
      }
    };

    fetchTraffic();

    return () => {
      isMounted = false;
    };
  }, [data.id]);

  const getColor = (value?: number) => {
    const c = value ?? traffic.congestion;

    if (c > 70) return "#ff4d4f";
    if (c > 40) return "#faad14";
    return "#52c41a";
  };

  const getStatusText = () => {
    if (traffic.congestion > 70) return "HEAVY";
    if (traffic.congestion > 40) return "MODERATE";
    return "SMOOTH";
  };

  // 🔥 map time → index
  const forecastIndex = selectedTime / 5 - 1;
  const forecastPoint = traffic.forecast?.[forecastIndex];

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
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading && (
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            Loading...
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

      {/* MODE */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button
          onClick={() => setMode("current")}
          style={{
            flex: 1,
            padding: 6,
            background: mode === "current" ? "#1890ff" : "#333",
            border: "none",
            color: "white",
            borderRadius: 6,
          }}
        >
          Current
        </button>

        <button
          onClick={() => setMode("forecast")}
          style={{
            flex: 1,
            padding: 6,
            background: mode === "forecast" ? "#1890ff" : "#333",
            border: "none",
            color: "white",
            borderRadius: 6,
          }}
        >
          Forecast
        </button>
      </div>

      {/* INFO */}
      <div style={{ marginTop: 10 }}>
        <div><b>ID:</b> {data.id}</div>
        <div>Status: {data.status}</div>
        <div>PTZ: {data.ptz ? "YES" : "NO"}</div>
      </div>

      {/* ================= CURRENT ================= */}
      {mode === "current" && (
        <>
          <div style={{ marginTop: 12 }}>
            🚦 Traffic:
            <span style={{ color: getColor(), marginLeft: 6 }}>
              {getStatusText()}
            </span>
          </div>

          <div>⚡ Speed: {traffic.avgSpeed} km/h</div>
          <div>🚗 Vehicles: {traffic.vehicleCount}</div>
          <div>🌦 Weather: {traffic.weather}</div>

          {/* CHART */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Last 5 min</div>

            <div style={{
              display: "flex",
              gap: 4,
              alignItems: "flex-end",
              height: 50,
              marginTop: 6,
            }}>
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
            <div style={{
              height: 6,
              background: "#333",
              borderRadius: 4,
            }}>
              <div
                style={{
                  width: `${traffic.congestion}%`,
                  height: "100%",
                  background: getColor(),
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* ================= FORECAST ================= */}
      {mode === "forecast" && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Forecast timeline (0 → 60 min)
          </div>

          {/* SLIDER */}
          <input
            type="range"
            min={5}
            max={60}
            step={5}
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            style={{
              width: "100%",
              marginTop: 10,
            }}
          />

          <div style={{ fontSize: 12, marginTop: 6 }}>
            ⏱ Selected: {selectedTime} min
          </div>

          {/* BAR */}
          <div style={{
            display: "flex",
            gap: 4,
            alignItems: "flex-end",
            height: 70,
            marginTop: 10,
          }}>
            {traffic.forecast.map((f, i) => (
              <div
                key={i}
                onClick={() => setSelectedTime(f.timeOffset)}
                style={{
                  width: 10,
                  height: f.congestion,
                  background:
                    f.timeOffset === selectedTime
                      ? "#ff4d4f"
                      : "#1890ff",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* DETAIL */}
          <div style={{ marginTop: 10, fontSize: 12 }}>
            {forecastPoint ? (
              <>
                ⏱ +{forecastPoint.timeOffset} min<br />
                ⚡ Speed: {forecastPoint.avgSpeed} km/h<br />
                🚗 Vehicles: {forecastPoint.vehicleCount}<br />
                🚦 Congestion: {forecastPoint.congestion}%
              </>
            ) : (
              <div style={{ opacity: 0.6 }}>
                No forecast data
              </div>
            )}
          </div>
        </div>
      )}

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
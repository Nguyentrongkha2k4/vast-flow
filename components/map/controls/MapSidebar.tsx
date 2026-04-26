"use client";

import { useState } from "react";
import { useMapContext } from "@/context/MapContext";
import { Map, TrafficCone, Flame, Clock } from "lucide-react";

export default function MapSidebar() {
  const [open, setOpen] = useState(false);

  const {
    mode,
    setMode,
    heatmapEnabled,
    setHeatmapEnabled,
    forecastTime,
    setForecastTime,
  } = useMapContext();

  const Item = ({
    active,
    icon,
    label,
    onClick,
  }: {
    active: boolean;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
        transition-all duration-200
        ${
          active
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      <div className="w-5 h-5">{icon}</div>

      <span
        className={`
          whitespace-nowrap text-sm font-medium
          transition-all duration-200
          ${
            open
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2"
          }
        `}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`
        absolute bottom-6 left-6 z-[9999]
        bg-neutral-900/90 backdrop-blur-md
        border border-white/10
        rounded-2xl shadow-xl
        
        flex flex-col justify-between
        p-2
        
        transition-all duration-300
        ${open ? "w-52 h-[260px]" : "w-14 h-[150px]"}
      `}
    >
      {/* NORMAL MAP */}
      <Item
        active={mode === "normal"}
        icon={<Map size={18} />}
        label="Normal Map"
        onClick={() => setMode("normal")}
      />

      {/* TRAFFIC MAP */}
      <Item
        active={mode === "traffic"}
        icon={<TrafficCone size={18} />}
        label="Traffic Map"
        onClick={() => setMode("traffic")}
      />

      {/* HEATMAP */}
      <Item
        active={heatmapEnabled}
        icon={<Flame size={18} />}
        label="Heatmap"
        onClick={() => setHeatmapEnabled(!heatmapEnabled)}
      />

      {/* SLIDER (ONLY WHEN HEATMAP ON) */}
      {heatmapEnabled && (
        <div className="mt-2 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Clock size={14} />
            Forecast: {forecastTime} min
          </div>

          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={forecastTime}
            onChange={(e) =>
              setForecastTime(Number(e.target.value))
            }
            className="w-full accent-red-500"
          />
        </div>
      )}

      {/* DIVIDER */}
      <div
        className={`
          h-px bg-white/10 my-2
          transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* STATUS */}
      <div
        className={`
          text-xs text-gray-400 px-2
          transition-all duration-200
          ${open ? "opacity-100" : "opacity-0"}
        `}
      >
        Mode: <span className="text-white">{mode}</span>
        <br />
        Heatmap:{" "}
        <span className="text-white">
          {heatmapEnabled ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
}
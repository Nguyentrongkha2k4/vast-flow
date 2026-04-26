"use client";

import { useState } from "react";
import { useMapContext } from "@/context/MapContext";
import {
  Map,
  TrafficCone,
  Flame,
  Clock,
  Camera,
} from "lucide-react";

export default function MapSidebar() {
  const [open, setOpen] = useState(false);

  const {
    mode,
    setMode,
    heatmapEnabled,
    setHeatmapEnabled,
    forecastTime,
    setForecastTime,
    showCameras,
    setShowCameras,
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
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200
        ${
          active
            ? "bg-white/15 text-white"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <div className="w-5 h-5">{icon}</div>

      <span
        className={`text-sm font-medium transition-all duration-200
          ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
        `}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`
        absolute bottom-6 left-6 z-[9999]
        bg-neutral-900/90 backdrop-blur-xl
        border border-white/10
        rounded-2xl shadow-2xl

        flex flex-col
        h-80

        opacity-90 hover:opacity-100
        p-2
        transition-all duration-300
        ${open ? "w-56" : "w-14"}
      `}
    >
      {/* ================= MAP MODE ================= */}
      <div className="space-y-1">
        <Item
          active={mode === "normal"}
          icon={<Map size={18} />}
          label="Normal"
          onClick={() => setMode("normal")}
        />

        <Item
          active={mode === "traffic"}
          icon={<TrafficCone size={18} />}
          label="Traffic"
          onClick={() => setMode("traffic")}
        />
      </div>

      <div className="my-2 h-px bg-white/10" />

      {/* ================= LAYERS ================= */}
      <div className="space-y-1">
        <Item
          active={showCameras}
          icon={<Camera size={18} />}
          label="Cameras"
          onClick={() => setShowCameras(!showCameras)}
        />

        <Item
          active={heatmapEnabled}
          icon={<Flame size={18} />}
          label="Heatmap"
          onClick={() => setHeatmapEnabled(!heatmapEnabled)}
        />
      </div>

      {/* ================= FORECAST ================= */}
      {heatmapEnabled && open && (
        <div className="mt-3 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Clock size={14} />
            <span>Forecast: {forecastTime} min</span>
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
            className="w-full accent-red-500 cursor-pointer"
          />

          {/* tick labels */}
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>0</span>
            <span>30</span>
            <span>60</span>
          </div>
        </div>
      )}
    </div>
  );
}
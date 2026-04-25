"use client";

import { useState } from "react";
import { useMapContext } from "@/context/MapContext";
import { Map, TrafficCone } from "lucide-react";

export default function MapSidebar() {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useMapContext();

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
        ${active 
          ? "bg-white/10 text-white" 
          : "text-gray-400 hover:text-white hover:bg-white/5"}
      `}
    >
      <div className="w-5 h-5">{icon}</div>

      <span
        className={`
          whitespace-nowrap text-sm font-medium
          transition-all duration-200
          ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
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
        h-[140px]  
        
        transition-all duration-300
        ${open ? "w-48" : "w-14"}
      `}
    >
      {/* NORMAL */}
      <Item
        active={mode === "normal"}
        icon={<Map size={18} />}
        label="Normal Map"
        onClick={() => setMode("normal")}
      />

      {/* TRAFFIC */}
      <Item
        active={mode === "traffic"}
        icon={<TrafficCone size={18} />}
        label="Traffic Map"
        onClick={() => setMode("traffic")}
      />

      {/* Divider */}
      <div
        className={`
          h-px bg-white/10 my-1
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
      </div>
    </div>
  );
}
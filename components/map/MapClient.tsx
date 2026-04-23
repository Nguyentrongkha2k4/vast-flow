"use client";

import dynamic from "next/dynamic";
import MapToolbar from "./MapToolbar";
import { useState } from "react";
import MapSidebar from "./MapSidebar";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapClient() {
  
  const [mode, setMode] = useState<"normal" | "traffic">("normal");

  return (
    <>
      <MapSidebar mode={mode} setMode={setMode} />
      <MapView mode={mode} />
    </>
  );
  
}
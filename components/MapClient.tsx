"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div style={{ height: "100vh" }}>Loading map...</div>,
});

export default function MapClient() {
  return <Map />;
}
"use client";

import { useState } from "react";

export function useMapMode() {
  const [mode, setMode] = useState<"normal" | "traffic">("normal");

  return {
    mode,
    setMode,
  };
}
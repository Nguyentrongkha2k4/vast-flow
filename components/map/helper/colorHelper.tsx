import L from "leaflet";

export function getColorIcon(congestion?: number) {
  let color = "#52c41a";

  if (!congestion) color = "#52c41a";
  else if (congestion > 70) color = "#ff4d4f";
  else if (congestion > 40) color = "#faad14";

  return L.divIcon({
    className: "traffic-icon",
    html: `<div style="
      width:10px;
      height:10px;
      border-radius:50%;
      background:${color};
    "></div>`,
  });
}
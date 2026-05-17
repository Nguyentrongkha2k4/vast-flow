import L from "leaflet";

const baseIcon = {
  iconSize: [28, 28] as [number, number],
  iconAnchor: [14, 28] as [number, number],
  popupAnchor: [0, -28] as [number, number],
};

export const accidentIcon = new L.Icon({
  iconUrl: "/icons/accident.png",
  ...baseIcon,
});

export const jamIcon = new L.Icon({
  iconUrl: "/icons/jam.png",
  ...baseIcon,
});

export const floodIcon = new L.Icon({
  iconUrl: "/icons/flood.png",
  ...baseIcon,
});

export const defaultEventIcon = new L.Icon({
  iconUrl: "/icons/event.png",
  ...baseIcon,
});
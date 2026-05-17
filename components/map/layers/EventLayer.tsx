"use client";

import { Marker, Popup } from "react-leaflet";

import { useEvents } from "@/hooks/useEventsData";

import { useMapContext } from "@/context/MapContext";

import {
  accidentIcon,
  jamIcon,
  floodIcon,
  defaultEventIcon,
} from "@/lib/map/eventIcons";

export default function EventLayer() {
  const { events } = useEvents();

  const { showEvents } = useMapContext();

  if (!showEvents) return null;

  return (
    <>
      {events.map((event) => (
        <Marker
          key={event.article_id}
          position={[event.lat, event.long]}
          icon={getEventIcon(event.event)}
        >
          <Popup>
            <div
              style={{
                minWidth: 220,
              }}
            >
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {event.event}
              </h3>

              <p>
                {event.address.line}
              </p>

              <p>
                {event.address.commune},{" "}
                {event.address.province}
              </p>

              <p
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  opacity: 0.7,
                }}
              >
                {new Date(event.time).toLocaleString()}
              </p>

              <a
                href={event.article_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#2563eb",
                  marginTop: 8,
                  display: "inline-block",
                }}
              >
                View Article
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function getEventIcon(event: string) {
  const e = event.toLowerCase();

  if (
    e.includes("accident") ||
    e.includes("crash") ||
    e.includes("tai nạn")
  ) {
    return accidentIcon;
  }

  if (
    e.includes("kẹt xe") ||
    e.includes("traffic") ||
    e.includes("jam")
  ) {
    return jamIcon;
  }

  if (
    e.includes("flood") ||
    e.includes("ngập")
  ) {
    return floodIcon;
  }

  return defaultEventIcon;
}
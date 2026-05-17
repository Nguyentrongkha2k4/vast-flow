"use client";

import { useEffect, useState } from "react";

export interface TrafficEvent {
  event: string;

  address: {
    province: string;
    commune: string;
    line: string;
  };

  lat: number;
  long: number;

  time: string;

  article_id: string;
  article_url: string;
}

export function useEvents() {
  const [events, setEvents] = useState<TrafficEvent[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://your-api/events"
        );

        const data = await res.json();

        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }
async function load_fake() {
  const data = [
    {
      event: "TRAFFIC_JAM",
      address: {
        province: "Ho Chi Minh",
        commune: "District 1",
        line: "Nguyen Hue Street",
      },
      lat: 10.7758,
      long: 106.7039,
      time: new Date().toISOString(),
      article_id: "ev1",
      article_url: "https://example.com/event/1",
    },
    {
      event: "ACCIDENT",
      address: {
        province: "Ho Chi Minh",
        commune: "District 3",
        line: "Vo Van Tan Street",
      },
      lat: 10.7798,
      long: 106.6872,
      time: new Date().toISOString(),
      article_id: "ev2",
      article_url: "https://example.com/event/2",
    },
    {
      event: "FLOOD",
      address: {
        province: "Ho Chi Minh",
        commune: "Binh Thanh District",
        line: "Dien Bien Phu Street",
      },
      lat: 10.8015,
      long: 106.7143,
      time: new Date().toISOString(),
      article_id: "ev3",
      article_url: "https://example.com/event/3",
    },
    {
      event: "ROADWORK",
      address: {
        province: "Ho Chi Minh",
        commune: "District 5",
        line: "Tran Hung Dao Street",
      },
      lat: 10.7540,
      long: 106.6679,
      time: new Date().toISOString(),
      article_id: "ev4",
      article_url: "https://example.com/event/4",
    },
  ];

  setEvents(data);
}
    load_fake();

    // refresh mỗi 30s
    const interval = setInterval(load, 30000);

    return () => clearInterval(interval);
  }, []);

  return { events };
}
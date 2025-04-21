"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import MapView from "../components/Map";
import { OPENWEATHER_API_KEY, DEFAULT_CITY } from "./config";

export default function Home() {
  const [screen, setScreen] = useState<"clock" | "weather" | "map">("clock");

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (screen === "clock") setScreen("weather");
      else if (screen === "weather") setScreen("map");
    },
    onSwipedRight: () => {
      if (screen === "map") setScreen("weather");
      else if (screen === "weather") setScreen("clock");
    },
    trackMouse: true,
  });

  return (
    <main
      {...handlers}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 select-none"
    >
      {screen === "clock" && <Clock />}
      {screen === "weather" && <Weather city={DEFAULT_CITY} apiKey={OPENWEATHER_API_KEY} />}
      {screen === "map" && <MapView lat={47.1528} lon={6.9969} />}
    </main>
  );
}

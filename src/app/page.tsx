"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Clock from "../components/Clock";
import Weather from "../components/Weather";
import { OPENWEATHER_API_KEY, DEFAULT_CITY } from "./config";

export default function Home() {
  const [screen, setScreen] = useState<"clock" | "weather">("clock");

  const handlers = useSwipeable({
    onSwipedLeft: () => setScreen("weather"),
    onSwipedRight: () => setScreen("clock"),
    trackMouse: true,
  });

  return (
    <main
      {...handlers}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 select-none"
    >
      {screen === "clock" ? (
        <Clock />
      ) : (
        <Weather city={DEFAULT_CITY} apiKey={OPENWEATHER_API_KEY} />
      )}
    </main>
  );
}

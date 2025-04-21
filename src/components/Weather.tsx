import React, { useEffect, useState } from "react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

interface WeatherProps {
  city: string;
  apiKey: string;
}

export default function Weather({ city, apiKey }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=47.1528&lon=6.9969&appid=645eb9cc14627a78886c102bdb42e298`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération de la météo");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) return <div className="p-8">Chargement...</div>;
  if (error) return <div className="p-8 text-red-500">Erreur : {error}</div>;
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-gradient-to-br from-sky-400 to-blue-600 text-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center">
        <span className="text-2xl font-bold mb-2">{weather.name}</span>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="mb-2"
        />
        <span className="text-4xl font-bold">{Math.round(weather.main.temp - 273.15)}°C</span>
        <span className="capitalize mt-2">{weather.weather[0].description}</span>
        <span className="mt-2 text-sm">Humidité : {weather.main.humidity}%</span>
      </div>
    </div>
  );
}

import React from "react";

interface MapProps {
  lat: number;
  lon: number;
}

const MapView: React.FC<MapProps> = ({ lat, lon }) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01}%2C${lat-0.01}%2C${lon+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full">
      <div className="bg-gradient-to-br from-green-200 to-blue-300 rounded-2xl shadow-xl px-4 py-4 flex flex-col items-center w-[360px] h-[360px]">
        <iframe
          title="Carte OpenStreetMap"
          src={mapUrl}
          width="320"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
        <span className="mt-2 text-sm text-gray-700">Lat: {lat} | Lon: {lon}</span>
      </div>
    </div>
  );
};

export default MapView;

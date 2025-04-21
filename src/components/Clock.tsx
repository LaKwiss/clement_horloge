import React, { useEffect, useState } from "react";

function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}

export default function Clock() {
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Don't render date until mounted on client to avoid hydration mismatch
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center">
        <span className="text-5xl font-bold tracking-widest">
          {pad(now.getHours())}:{pad(now.getMinutes())}
          <span className="text-2xl align-top">:{pad(now.getSeconds())}</span>
        </span>
        <span className="mt-2 text-lg font-light tracking-widest">
          {mounted ? now.toLocaleDateString("fr-CH").replace(/\./g, "/") : ""}
        </span>
      </div>
    </div>
  );
}

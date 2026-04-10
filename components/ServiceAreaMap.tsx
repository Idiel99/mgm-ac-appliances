"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PINS: { name: string; lat: number; lng: number }[] = [
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Miami Beach", lat: 25.7907, lng: -80.1300 },
  { name: "Hialeah", lat: 25.8576, lng: -80.2781 },
  { name: "Miami Gardens", lat: 25.9420, lng: -80.2456 },
  { name: "Aventura", lat: 25.9565, lng: -80.1392 },
  { name: "Coral Gables", lat: 25.7215, lng: -80.2684 },
  { name: "Doral", lat: 25.8195, lng: -80.3553 },
  { name: "Kendall", lat: 25.6795, lng: -80.3171 },
  { name: "Homestead", lat: 25.4687, lng: -80.4776 },
  { name: "Florida Keys", lat: 24.5551, lng: -81.7800 },
  { name: "Fort Lauderdale", lat: 26.1224, lng: -80.1373 },
  { name: "Hollywood", lat: 26.0112, lng: -80.1495 },
  { name: "Boca Raton", lat: 26.3587, lng: -80.0831 },
  { name: "West Palm Beach", lat: 26.7153, lng: -80.0534 },
  { name: "Naples", lat: 26.1420, lng: -81.7948 },
  { name: "Fort Myers", lat: 26.6406, lng: -81.8723 },
];

function createPinIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 28px; height: 28px;
      background: #0ea5e9;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "><div style="
      width: 8px; height: 8px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    "></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

export default function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([26.0, -80.8], 7);

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    const icon = createPinIcon();

    PINS.forEach(({ name, lat, lng }) => {
      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: var(--font-outfit), sans-serif; font-weight: 700; font-size: 14px; color: #0f172a;">${name}</div>
           <div style="font-size: 12px; color: #64748b; margin-top: 2px;">MGM A/C Appliances</div>`,
          { closeButton: false, className: "mgm-popup" }
        );
    });

    const bounds = L.latLngBounds(PINS.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-[400px] md:h-[500px] rounded-2xl z-0" />
      <style jsx global>{`
        .mgm-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .mgm-popup .leaflet-popup-tip {
          box-shadow: none;
        }
      `}</style>
    </>
  );
}

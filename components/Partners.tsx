"use client";

import { useEffect, useState } from "react";

const FALLBACK_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Crect width='80' height='40' rx='4' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='%239ca3af'%3ENo Logo%3C/text%3E%3C/svg%3E";

function extractDriveFileId(link: string): string | null {
  const match = link.match(/\/d\/(.*?)\//);
  return match ? match[1] : null;
}

function getProxiedImageUrl(link: string): string {
  if (!link) return FALLBACK_LOGO;
  const fileId = extractDriveFileId(link);
  const driveUrl = fileId
    ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
    : link;
  return `/api/proxy-image?url=${encodeURIComponent(driveUrl)}&disposition=inline`;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<{ logo: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1AFLLBXt2K6IbA5dXCdtke_dd_6S0Jo0lRxbOdh9ZWL4/gviz/tq?tqx=out:json&gid=1144311292"
    )
      .then((res) => res.text())
      .then((data) => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows.map((row: any) => {
          const link = row.c[0]?.v || "";
          return { logo: getProxiedImageUrl(link) };
        });
        setPartners(rows);
      })
      .catch((err) => console.error("Failed to load partners:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center justify-center px-6 py-3 border-2 border-black rounded-full bg-white">
            <span
              className="text-lg sm:text-xl lg:text-3xl text-center"
              style={{ fontFamily: "Calsans, sans-serif" }}
            >
              Partners
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-28 rounded-2xl border bg-white px-6 py-4 animate-pulse"
                >
                  <div className="w-full h-12 bg-gray-200 rounded-lg" />
                </div>
              ))
            : partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-28 rounded-2xl border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 px-6 py-4"
                >
                  <img
                    src={partner.logo}
                    className="max-h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_LOGO;
                    }}
                    alt={`Partner ${index + 1}`}
                  />
                </div>
              ))}
        </div>

      </div>
    </section>
  );
}
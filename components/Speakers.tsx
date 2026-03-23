"use client";

import { useEffect, useMemo, useState } from "react";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23e5e7eb'/%3E%3Ccircle cx='200' cy='160' r='70' fill='%239ca3af'/%3E%3Cellipse cx='200' cy='340' rx='110' ry='80' fill='%239ca3af'/%3E%3C/svg%3E";

function getProxiedImageUrl(link: string): string {
  if (!link) return FALLBACK_IMAGE;
  const match = link.match(/\/d\/(.*?)\//);
  const driveUrl = match
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
    : link;
  return `/api/proxy-image?url=${encodeURIComponent(driveUrl)}&disposition=inline`;
}

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1AFLLBXt2K6IbA5dXCdtke_dd_6S0Jo0lRxbOdh9ZWL4/gviz/tq?tqx=out:json&gid=0"
    )
      .then((res) => res.text())
      .then((data) => {
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows.map((row: any) => {
          const link = row.c[2]?.v || "";
          return {
            name: row.c[0]?.v || "",
            role: row.c[1]?.v || "",
            image: getProxiedImageUrl(link),
          };
        });
        setSpeakers(rows);
      })
      .catch((err) => console.error("Failed to load speakers:", err))
      .finally(() => setLoading(false));
  }, []);

  const icons = [
    "/assets/images/ele1.png",
    "/assets/images/ele2.png",
    "/assets/images/ele3.png",
    "/assets/images/ele4.png",
  ];

  const speakerIcons = useMemo(() => {
    return speakers.map((_, i) => icons[i % icons.length]);
  }, [speakers]);

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10 lg:mb-16 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Title */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mt-3 inline-flex items-center justify-center px-5 py-2.5 border-2 border-black rounded-full bg-white">
              <span
                className="text-lg sm:text-xl lg:text-3xl"
                style={{ fontFamily: "Calsans, sans-serif" }}
              >
                Scaleup Speakers
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-2xl text-gray-600">
            ScaleUp 2026 brings diverse experts, leaders, innovators empowering entrepreneurs with global insights.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl overflow-hidden aspect-square bg-gray-200 animate-pulse"
                >
                  <div className="absolute bottom-2 left-2 right-2 h-16 bg-gray-300 rounded-xl" />
                </div>
              ))
            : speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer transition-transform duration-300 lg:hover:scale-[1.03]"
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 lg:group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/90 backdrop-blur-sm rounded-xl px-3 py-4 sm:py-3 flex items-start gap-3">

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base sm:text-base lg:text-lg leading-tight break-words">
                        {speaker.name}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-sm lg:text-base leading-snug break-words mt-1">
                        {speaker.role}
                      </p>
                    </div>

                    {/* Icon */}
                    <img
                      src={speakerIcons[index]}
                      alt="icon"
                      className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 object-contain"
                    />

                  </div>
                </div>
              ))}

        </div>

      </div>
    </section>
  );
}
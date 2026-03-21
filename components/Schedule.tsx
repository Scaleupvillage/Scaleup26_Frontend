"use client";

import React from "react";

const scheduleData = [
  {
    startTime: "6:55 PM",
    endTime: "7:40 PM",
    type: "Panel Discussion",
    title: "Young Founders, Big Dreams",
    posterImg: "/assets/images/Schedule/poster.png",
    speakers: [
      { name: "Muhammed Aadil", role: "Founder", img: "/assets/images/Schedule/avatar1.png" },
      { name: "Ansar M P", role: "CEO", img: "/assets/images/Schedule/avatar1.png" },
    ],
  },
  {
    startTime: "7:45 PM",
    endTime: "8:15 PM",
    type: "Panel Discussion",
    title: "Scaling Startups",
    posterImg: "/assets/images/Schedule/poster.png",
    speakers: [
      { name: "Aadil", role: "Founder", img: "/assets/images/Schedule/avatar1.png" },
    ],
  },
  {
    startTime: "8:20 PM",
    endTime: "9:00 PM",
    type: "Panel Discussion",
    title: "Future of AI",
    posterImg: "/assets/images/Schedule/poster.png",
    speakers: [
      { name: "Irfan", role: "Founder", img: "/assets/images/Schedule/avatar1.png" },
    ],
  },
  {
    startTime: "9:05 PM",
    endTime: "9:45 PM",
    type: "Panel Discussion",
    title: "Investor Talk",
    posterImg: "/assets/images/Schedule/poster.png",
    speakers: [
      { name: "Aadil", role: "Founder", img: "/assets/images/Schedule/avatar1.png" },
    ],
  },
];

const typeConfig: Record<string, { badge: string; icon: string }> = {
  "Panel Discussion": {
    badge: "bg-[#E8F2FF] text-[#4285F4]",
    icon: "/assets/images/Schedule/icon.png",
  },
};

function ScheduleCard({ item }: { item: (typeof scheduleData)[0] }) {
  const cfg = typeConfig[item.type];

  return (
    <div className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm w-full">

      {/* Poster */}
      <div className="hidden sm:block w-[90px] flex-shrink-0">
        <img src={item.posterImg} className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Content */}
      <div className="flex-1">

        {/* Top */}
        <div className="flex justify-between items-center mb-2">
          <div className={`px-2 py-1 rounded-full text-[10px] flex items-center gap-1 ${cfg.badge}`}>
            <img src={cfg.icon} className="w-3 h-3" />
            {item.type}
          </div>

          <div className="bg-black text-white px-2 py-1 rounded-full text-[10px]">
            {item.startTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold mb-2 leading-tight">
          {item.title}
        </h3>

        {/* Speakers */}
        <div className="flex gap-2">
          {item.speakers.map((s, i) => (
            <div key={i} className="text-center w-[50px]">
              <div className="bg-blue-500 rounded-lg h-[50px] relative mb-1">
                <img
                  src={s.img}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[110%] object-contain"
                />
              </div>
              <p className="text-[9px] font-medium">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] py-10 px-4">

      <div className="relative max-w-6xl mx-auto">

        {/* DESKTOP CENTER LINE */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 -translate-x-1/2"></div>

        {/* MOBILE LEFT LINE */}
        <div className="md:hidden absolute left-4 top-0 h-full w-[2px] bg-gray-300"></div>

        <div className="flex flex-col gap-10">

          {scheduleData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-center">

                {/* DOT */}
                <div className="absolute md:left-1/2 left-4 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 z-10"></div>

                {/* DESKTOP LEFT */}
                <div className={`hidden md:flex w-1/2 ${isLeft ? "pr-8 justify-end" : ""}`}>
                  {isLeft && <ScheduleCard item={item} />}
                </div>

                {/* DESKTOP RIGHT */}
                <div className={`hidden md:flex w-1/2 ${!isLeft ? "pl-8 justify-start" : ""}`}>
                  {!isLeft && <ScheduleCard item={item} />}
                </div>

                {/* MOBILE STACKED */}
                <div className="md:hidden w-full pl-10">
                  <ScheduleCard item={item} />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
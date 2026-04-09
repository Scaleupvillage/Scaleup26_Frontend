"use client";

import Marquee from "react-fast-marquee";
import React from "react";

export default function DepositMarquee() {
  return (
    <div className="px-2 md:px-0 py-5">
      <div
        className="w-full  p-2 flex items-center "
        style={{ backgroundColor: "#00D28A", color: "var(--color-black)" }}
      >
        {/* Fixed "button" on the left */}

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden">
          <Marquee gradient={false} speed={50} direction="left">
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <span className="ml-1 underline font-semibold text-[#4028c8]">
                Thank you for visiting
              </span>
            </span>
            &nbsp; &nbsp;
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <span className="ml-1 underline font-semibold text-[#4028c8]">
                Thank you for visiting
              </span>
            </span>
            &nbsp; &nbsp;
            <span>
              Registration Started for{" "}
              <span className="">ScaleUp Conclave 2026 – The AI Summit</span>.{" "}
              <span className="ml-1 underline font-semibold text-[#4028c8]">
                Thank you for visiting
              </span>
            </span>
            &nbsp; &nbsp;
          </Marquee>
        </div>
      </div>
    </div>
  );
}

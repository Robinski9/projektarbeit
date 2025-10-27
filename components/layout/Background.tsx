"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CenterIcons } from "./CenterIcons";
import type { PageName } from "@/components/types";
import { generateLines, Line } from "@/components/GenerateLines";
import { useTheme } from "next-themes";

export default function Background() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const pageMap: Record<string, PageName> = {
    "/": "Home",
    "/FFMIRechner": "FFMIRechner",
    "/Kontakt": "Kontakt",
    "/Steroide": "Steroide",
  };

  const page: PageName = pageMap[pathname] || "Home";
  const CenterIcon = CenterIcons[page];

  // Theme- & Seitenabhängige Farben
  const colorMap: Record<PageName, { light: string; dark: string }> = {
    Home: { light: "rgba(0,0,0,0.8)", dark: "rgba(255,255,255,0.9)" },
    FFMIRechner: { light: "rgba(0,120,255,0.8)", dark: "rgba(100,180,255,1)" },
    Kontakt: { light: "rgba(255,140,0,0.8)", dark: "rgba(255,200,100,1)" },
    Steroide: { light: "rgba(255,0,80,0.8)", dark: "rgba(255,100,200,1)" },
  };

 const strokeColor = colorMap[page][theme === "dark" ? "dark" : "light"];

  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const regenerate = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setSize({ w, h });
    setLines(generateLines(w, h));
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => regenerate());
    window.addEventListener("resize", regenerate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", regenerate);
    };
  }, [page]);

  const centerSize = Math.min(size.w, size.h) * 0.08;
  const strokeWidth = Math.max(1, Math.min(size.w, size.h) * 0.0015);
  const offsetX = -40;
  const offsetY = -40;

  return (
    <svg
      width={size.w}
      height={size.h}
      className="absolute inset-0"
      style={{ filter: "blur(0.5px)" }}
    >
      <defs>
        {/* Glow für Linien */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radialer animierter Farbverlauf */}
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4">
            <animate
              attributeName="stop-opacity"
              values="0.4;0.8;0.4"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0">
            <animate
              attributeName="r"
              values="40%;60%;40%"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
        </radialGradient>
      </defs>

      {/* Hintergrund mit radialem Verlauf */}
      <rect
        width="100%"
        height="100%"
        fill="url(#gradient)"
        filter="blur(120px)"
        opacity="0.8"
      />

      {/* Icon in der Mitte */}
      <g
        transform={`translate(${size.w / 2}, ${size.h / 2})
                    scale(${centerSize / 40})
                    translate(${offsetX}, ${offsetY})`}
      >
        <CenterIcon />
      </g>

      {/* Linien */}
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#glow)"
        />
      ))}
    </svg>
  );
}

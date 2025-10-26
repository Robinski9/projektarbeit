"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState(0); // 0 = sun, 1 = moon
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Wrap in setTimeout to avoid synchronous state updates
    setTimeout(() => {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = saved === "dark" || (!saved && prefersDark);

      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      setPosition(isDark ? 1 : 0);
      setMounted(true);
    }, 0);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setPosition(isDark ? 1 : 0);
    }, 150); // duration matches CSS transition
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="relative w-20 h-10 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer overflow-hidden flex items-center justify-between px-2"
    >
      {/* Emojis */}
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none z-20">☀️</span>
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm pointer-events-none z-20">🌙</span>

      {/* Moving capsule */}
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white dark:bg-black rounded-full z-10 transition-all duration-150`}
        style={{
          left: position === 0 ? "2px" : "calc(100% - 2px - 2rem)",
          width: animating ? "3.5rem" : "2rem",
          height: "2rem",
          transitionTimingFunction: "ease-in-out",
        }}
      />
    </button>
  );
}
